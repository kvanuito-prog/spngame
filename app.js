const SUPABASE_URL = 'https://bcbgtmlvdcparfnbacfs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjYmd0bWx2ZGNwYXJmbmJhY2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDY5ODQsImV4cCI6MjEwNjU4Mjk4NH0.PurOua05g6nD9SiBdrm4MCoXHcPfys77Cs4xTtElGJg';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let currentProfile = null;

const $ = (id) => document.getElementById(id);
const loginBtn = $('login-btn');
const logoutBtn = $('logout-btn');
const avatarEl = $('avatar');
const balanceEl = $('balance');

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
  } else {
    currentUser = null; currentProfile = null;
    showLoggedOut();
  }
});

function showLoggedIn() {
  loginBtn.style.display = 'none';
  $('user-info').style.display = 'flex';
  $('main-tabs').style.display = 'flex'; 
  balanceEl.style.display = 'none'; 
  
  avatarEl.src = currentUser.user_metadata?.avatar_url || '';
  
  renderCabinet();
  
  // Всегда показываем кабинет, скрываем бункер при входе
  $('bunker-section').style.display = 'none';
  $('cabinet-section').style.display = 'block';
}

function showLoggedOut() {
  loginBtn.style.display = 'inline-block';
  $('user-info').style.display = 'none';
  $('main-tabs').style.display = 'none';
  balanceEl.style.display = 'none';
  
  $('cabinet-section').style.display = 'none';
  $('bunker-section').style.display = 'none';
}

async function loadProfile() {
  const { data, error } = await sb.from('profiles').select('*').eq('id', currentUser.id).single();
  if (error) {
    console.error('Ошибка загрузки профиля:', error.message);
  }
  currentProfile = data;
}

function renderCabinet() {
  if (!currentProfile) return;

  $('cabinet-avatar').src = currentUser.user_metadata?.avatar_url || 'https://via.placeholder.com/150';
  $('cabinet-name').textContent = currentUser.user_metadata?.full_name || 'Безымянный командир';
  
  $('cabinet-rank').textContent = currentProfile.rank || 'Рядовой';
  $('cabinet-level').textContent = currentProfile.level || '1';
  $('cabinet-credits').textContent = `${currentProfile.credits || 0} 💰`;
  $('cabinet-silo-name').textContent = currentProfile.silo_name || 'Не назначен';
  
  if (currentProfile.lat && currentProfile.lng) {
    $('cabinet-coords').textContent = `Ш: ${currentProfile.lat.toFixed(2)} | Д: ${currentProfile.lng.toFixed(2)}`;
  } else {
    $('cabinet-coords').textContent = 'Ш: -- | Д: --';
  }
}

// ---- ЛОГИКА ПЕРЕХОДА В БУНКЕР ----
$('go-to-bunker').onclick = () => {
  // Скрываем вкладки и кабинет
  $('main-tabs').style.display = 'none';
  $('cabinet-section').style.display = 'none';
  
  // Показываем бункер
  $('bunker-section').style.display = 'block';
  
  // Обновляем данные в бункере
  if (currentProfile) {
    $('bunker-credits').textContent = `${currentProfile.credits || 0} 💰`;
  }
};

$('btn-exit-bunker').onclick = () => {
  // Скрываем бункер
  $('bunker-section').style.display = 'none';
  
  // Возвращаем вкладки и кабинет
  $('main-tabs').style.display = 'flex';
  $('cabinet-section').style.display = 'block';
};

$('btn-launch-missile').onclick = () => {
  alert('СИСТЕМА ЗАБЛОКИРОВАНА: Ракета не собрана в цеху.');
};
