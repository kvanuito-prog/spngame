const SUPABASE_URL = 'https://bcbgtmlvdcparfnbacfs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjYmd0bWx2ZGNwYXJmbmJhY2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDY5ODQsImV4cCI6MjEwNjU4Mjk4NH0.PurOua05g6nD9SiBdrm4MCoXHcPfys77Cs4xTtElGJg';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let currentProfile = null;
let cases = [];
let itemsMap = {};

const $ = (id) => document.getElementById(id);
const balanceEl = $('balance');
const loginBtn = $('login-btn');
const logoutBtn = $('logout-btn');
const avatarEl = $('avatar');
const casesList = $('cases-list');
const inventoryList = $('inventory-list');
const castlesOverlay = $('castles-overlay');

// ---- КАРТА ЗАМКОВ ----
async function loadCastles() {
  const { data, error } = await sb.from('castles').select('*, owner:profiles(username)');
  if (error) { console.error('castles error', error); return; }
  castlesOverlay.innerHTML = '';
  (data || []).forEach(c => {
    const pin = document.createElement('div');
    pin.className = 'castle-pin' + (c.owner_id ? ' owned' : '');
    pin.style.left = c.pos_x + '%';
    pin.style.top = c.pos_y + '%';
    const ownerName = c.owner?.username || '—';
    pin.textContent = `Владелец: ${ownerName}`;
    pin.onclick = () => openCastleModal(c);
    castlesOverlay.appendChild(pin);
  });
}

function openCastleModal(c) {
  const ownerName = c.owner?.username || 'Никто не владеет';
  $('castle-modal-body').innerHTML = `
    <h2>${c.name}</h2>
    <div class="c-owner-line">Владелец: <b>${ownerName}</b></div>
  `;
  $('castle-modal').style.display = 'flex';
}

$('close-castle-modal').onclick = () => { $('castle-modal').style.display = 'none'; };

// ---- АВТОРИЗАЦИЯ ----
loginBtn.onclick = () => {
  sb.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
};

logoutBtn.onclick = async () => { await sb.auth.signOut(); };

sb.auth.onAuthStateChange(async (_event, session) => {
  if (session?.user) {
    currentUser = session.user;
    await loadProfile();
    showLoggedIn();
    await loadAll();
  } else {
    currentUser = null; currentProfile = null;
    showLoggedOut();
  }
});

function showLoggedIn() {
  loginBtn.style.display = 'none';
  $('user-info').style.display = 'flex';
  balanceEl.style.display = 'inline';
  avatarEl.src = currentUser.user_metadata?.avatar_url || '';
  balanceEl.textContent = (currentProfile?.balance ?? 0) + ' 💰';
}
function showLoggedOut() {
  loginBtn.style.display = 'inline-block';
  $('user-info').style.display = 'none';
  balanceEl.style.display = 'none';
  casesList.innerHTML = '<p style="color:#8b90a8">Войди, чтобы увидеть кейсы.</p>';
}

async function loadProfile() {
  const { data } = await sb.from('profiles').select('*').eq('id', currentUser.id).single();
  currentProfile = data;
}

async function loadAll() {
  const { data: caseData } = await sb.from('cases').select('*').eq('is_active', true);
  cases = caseData || [];

  const { data: itemData } = await sb.from('items').select('*');
  itemsMap = {};
  (itemData || []).forEach(it => itemsMap[it.id] = it);

  renderCases();
  await loadInventory();
}

function renderCases() {
  casesList.innerHTML = '';
  if (!cases.length) {
    casesList.innerHTML = '<p style="color:#8b90a8">Кейсов пока нет.</p>';
    return;
  }
  cases.forEach(c => {
    const card = document.createElement('div');
    card.className = 'case-card';
    card.innerHTML = `
      <h3>${c.name}</h3>
      <div class="price">${c.price} 💰</div>
      <button class="btn btn-primary">Открыть</button>
    `;
    card.querySelector('button').onclick = () => openCase(c);
    casesList.appendChild(card);
  });
}

async function loadInventory() {
  const { data } = await sb.from('inventory')
    .select('id, obtained_at, item_id, items(*)')
    .eq('user_id', currentUser.id)
    .order('obtained_at', { ascending: false });

  inventoryList.innerHTML = '';
  if (!data || data.length === 0) {
    inventoryList.innerHTML = '<p style="color:#8b90a8">Пока пусто. Открой первый кейс!</p>';
    return;
  }
  data.forEach(row => {
    const it = row.items;
    if (!it) return;
    const el = document.createElement('div');
    el.className = `item-card rarity-${it.rarity}`;
    el.innerHTML = `
      <div style="font-size:40px">🎁</div>
      <div class="item-name">${it.name}</div>
      <div class="item-rarity" style="color:var(--${it.rarity})">${it.rarity}</div>
    `;
    inventoryList.appendChild(el);
  });
}

async function openCase(c) {
  if ((currentProfile?.balance ?? 0) < c.price) {
    alert('Недостаточно монет');
    return;
  }

  const { data: itemId, error } = await sb.rpc('open_case', { p_case_id: c.id });
  if (error) { alert('Ошибка: ' + error.message); return; }

  const wonItem = itemsMap[itemId];
  await loadProfile();
  balanceEl.textContent = currentProfile.balance + ' 💰';

  const { data: caseItems } = await sb.from('case_items').select('item_id, chance').eq('case_id', c.id);
  const pool = caseItems.map(ci => ({
    item: itemsMap[ci.item_id],
    chance: ci.chance
  }));

  const strip = $('roulette-strip');
  strip.innerHTML = '';
  const WIN_INDEX = 45;
  for (let i = 0; i < 55; i++) {
    const entry = i === WIN_INDEX
      ? { item: wonItem }
      : pool[Math.floor(Math.random() * pool.length)];
    const el = document.createElement('div');
    el.className = `roulette-item rarity-${entry.item.rarity}`;
    el.textContent = entry.item.name;
    strip.appendChild(el);
  }

  $('case-result').textContent = '';
  $('case-modal').style.display = 'flex';
  strip.style.transition = 'none';
  strip.style.transform = 'translateX(0)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const itemEl = strip.children[WIN_INDEX];
      const offset = itemEl.offsetLeft + itemEl.offsetWidth / 2 - window.innerWidth / 2;
      strip.style.transition = 'transform 6s cubic-bezier(.15,.85,.25,1)';
      strip.style.transform = `translateX(${-offset}px)`;
    });
  });

  setTimeout(async () => {
    $('case-result').innerHTML = `Выпало: <b style="color:var(--${wonItem.rarity})">${wonItem.name}</b>`;
    await loadInventory();
  }, 6200);
}

$('close-modal').onclick = () => { $('case-modal').style.display = 'none'; };

$('promo-btn').onclick = async () => {
  const code = $('promo-input').value.trim();
  if (!code) return;
  const { data, error } = await sb.rpc('redeem_promo', { p_code: code });
  const msg = $('promo-msg');
  if (error) { msg.style.color = '#f87171'; msg.textContent = 'Ошибка: ' + error.message; return; }
  msg.style.color = '#4ade80';
  msg.textContent = `+${data} монет!`;
  await loadProfile();
  balanceEl.textContent = currentProfile.balance + ' 💰';
  $('promo-input').value = '';
};

document.querySelectorAll('.tab').forEach(t => {
  t.onclick = () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const tab = t.dataset.tab;
    $('map-section').style.display = tab === 'map' ? 'block' : 'none';
    $('cases-section').style.display = tab === 'cases' ? 'block' : 'none';
    $('inventory-section').style.display = tab === 'inventory' ? 'block' : 'none';
    $('promo-section').style.display = tab === 'promo' ? 'block' : 'none';
  };
});

loadCastles();
