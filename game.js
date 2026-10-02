// ============ ВЕРСИЯ ============
var GAME_VERSION = '1.07';
(function showVersion() {
  function set() {
    var el = document.getElementById('versionBadge');
    if (el) el.textContent = 'v' + GAME_VERSION;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', set);
  else set();
})();

// ============ ЧАСТИЦЫ ФОНА ============
(function initParticles() {
  var canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [], W, H;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  var COUNT = Math.min(40, Math.floor(window.innerWidth / 40));
  for (var i = 0; i < COUNT; i++) {
    particles.push({ x: Math.random() * W, y: Math.random() * H, r: 0.6 + Math.random() * 1.6, vx: (Math.random() - 0.5) * 0.25, vy: -0.15 - Math.random() * 0.35, a: 0.2 + Math.random() * 0.5, hue: Math.random() < 0.5 ? 160 : 220 });
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + p.hue + ', 80%, 70%, ' + p.a + ')';
      ctx.shadowColor = 'hsla(' + p.hue + ', 80%, 60%, 1)'; ctx.shadowBlur = 8;
      ctx.fill(); ctx.shadowBlur = 0;
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

// ============ ИСКРЫ ============
var fxCanvas = document.getElementById('fx-canvas');
var fxCtx = fxCanvas ? fxCanvas.getContext('2d') : null;
var fxParticles = [], fxRunning = false;
function fxResize() { if (!fxCanvas) return; fxCanvas.width = window.innerWidth; fxCanvas.height = window.innerHeight; }
if (fxCanvas) { fxResize(); window.addEventListener('resize', fxResize); }
function spawnSparks(x, y, count, color, speed) {
  if (!fxCanvas) return;
  for (var i = 0; i < count; i++) {
    var ang = Math.random() * Math.PI * 2;
    var spd = (speed || 4) * (0.5 + Math.random() * 1.5);
    fxParticles.push({ x: x, y: y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd - 1, life: 1, maxLife: 0.6 + Math.random() * 0.5, r: 1.5 + Math.random() * 2.5, color: color || '#fbbf24' });
  }
  if (!fxRunning) { fxRunning = true; fxLoop(); }
}
function fxLoop() {
  fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
  for (var i = fxParticles.length - 1; i >= 0; i--) {
    var p = fxParticles[i];
    p.x += p.vx; p.y += p.vy; p.vy += 0.25; p.vx *= 0.98;
    p.life -= 0.02;
    if (p.life <= 0) { fxParticles.splice(i, 1); continue; }
    fxCtx.globalAlpha = p.life;
    fxCtx.fillStyle = p.color;
    fxCtx.shadowColor = p.color; fxCtx.shadowBlur = 12;
    fxCtx.beginPath(); fxCtx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2); fxCtx.fill();
  }
  fxCtx.globalAlpha = 1; fxCtx.shadowBlur = 0;
  if (fxParticles.length > 0) requestAnimationFrame(fxLoop);
  else { fxRunning = false; fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height); }
}
function spawnShockwave(x, y, color) {
  var el = document.createElement('div');
  el.className = 'shockwave';
  el.style.left = x + 'px'; el.style.top = y + 'px';
  el.style.color = color || '#fbbf24';
  document.body.appendChild(el);
  setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 750);
}
function shakeScreen(strong) {
  var app = document.getElementById('app');
  if (!app) return;
  var cls = strong ? 'shake-screen-strong' : 'shake-screen';
  app.classList.remove('shake-screen', 'shake-screen-strong');
  void app.offsetWidth;
  app.classList.add(cls);
  setTimeout(function() { app.classList.remove(cls); }, 600);
}
function shakeCard(n) {
  var card = document.getElementById('p' + n); if (!card) return;
  card.classList.remove('shake', 'hit-flash'); void card.offsetWidth;
  card.classList.add('shake', 'hit-flash');
  setTimeout(function() { card.classList.remove('shake', 'hit-flash'); }, 500);
}
function flashHpBar(n) {
  var bar = document.querySelector('#p' + n + ' .hp-bar');
  var val = document.getElementById('hpVal' + n);
  if (bar) { bar.classList.remove('flash'); void bar.offsetWidth; bar.classList.add('flash'); setTimeout(function() { bar.classList.remove('flash'); }, 400); }
  if (val) { val.classList.remove('bump'); void val.offsetWidth; val.classList.add('bump'); setTimeout(function() { val.classList.remove('bump'); }, 400); }
}
function showFloatingDamage(n, value, type) {
  var card = document.getElementById('p' + n); if (!card) return;
  var rect = card.getBoundingClientRect();
  var el = document.createElement('div');
  el.className = 'float-dmg' + (type ? ' ' + type : '');
  el.textContent = (type === 'heal' ? '+' : '−') + value;
  el.style.left = (rect.left + rect.width / 2) + 'px';
  el.style.top = (rect.top + rect.height * 0.75) + 'px';
  document.body.appendChild(el);
  setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 1100);
}

// ============ КЛАССЫ ============
var CLASSES = {
  assassin:  { icon: '🗡', short: 'Ассасин',  label: '🗡 Ассасин',  css: 'assassin',  desc: 'Дубль → реролл ×1.9.' },
  barbarian: { icon: '⚔', short: 'Варвар',   label: '⚔ Варвар',   css: 'barbarian', desc: 'Дубль → стан. След. удар −20%.' },
  vampire:   { icon: '🧛', short: 'Вампир',   label: '🧛 Вампир',   css: 'vampire',   desc: 'Дубль → укус: урон + хил.' },
  joker:     { icon: '🎲', short: 'Джокер',   label: '🎲 Джокер',   css: 'joker',     desc: 'HP-триггер → ×2.5 или ×3.5.' },
  druid:     { icon: '🐉', short: 'Друид',    label: '🐉 Друид',    css: 'druid',     desc: 'Дубль → суммон.' },
  berserker: { icon: '🔥', short: 'Берсерк',  label: '🔥 Берсерк',  css: 'berserker', desc: 'Мало HP → бонус.' }
};
var CLASS_KEYS = Object.keys(CLASSES);

var SUMMON_TABLE = {
  11: { type: 'boar', name: 'Кабан',   icon: '🐗', hp: 33,  mult: 0.5, canStun: false },
  22: { type: 'boar', name: 'Кабан',   icon: '🐗', hp: 50,  mult: 0.5, canStun: false },
  33: { type: 'wolf', name: 'Волк',    icon: '🐺', hp: 66,  mult: 1.0, canStun: false },
  44: { type: 'wolf', name: 'Волк',    icon: '🐺', hp: 82,  mult: 1.0, canStun: false },
  55: { type: 'bear', name: 'Медведь', icon: '🐻', hp: 115, mult: 1.0, canStun: true  },
  66: { type: 'bear', name: 'Медведь', icon: '🐻', hp: 132, mult: 1.0, canStun: true  }
};

var BARB_WEAK_MULT = 0.8;
var ASSASSIN_CRIT = 1.9;
var JOKER_ROUND_MULT = 2.5;
var JOKER_BEAUTIFUL_MULT = 3.5;
var MAX_HP = 1000;
var MAX_LOG = 60;
var speed = 4;

// ============ ИМЕНА ============
var FIRST_NAMES = [
  'Аэлис','Гримгор','Ксилл','Торин','Вельда','Роран','Мира','Зарк','Нимфа','Дарион',
  'Элдрин','Сайра','Корвус','Тавия','Лун','Бранд','Фелис','Морок','Кира','Страж',
  'Пельмень','Скибиди','Гигачад','Босс','Стрелок','Тень','Ястреб','Вихрь','Гром','Пепел',
  'Змей','Клык','Клинок','Сова','Ворон','Пегас','Ирис','Лава','Мороз','Огонь',
  'Иван','Мария','Дмитрий','Ольга','Сергей','Анна','Никита','Елена','Артём','Ксения'
];
function randomName() { return FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]; }
function randomClass() { return CLASS_KEYS[Math.floor(Math.random() * CLASS_KEYS.length)]; }
function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function(c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function shortenName(s, max) {
  max = max || 7;
  if (!s) return '';
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + '…';
}

// ============ ЭЛЕМЕНТЫ ============
var menuOverlay = document.getElementById('menuOverlay');
var setupOverlay = document.getElementById('setupOverlay');
var playersOverlay = document.getElementById('playersOverlay');
var simOverlay = document.getElementById('simOverlay');
var championOverlay = document.getElementById('championOverlay');
var matchResultOverlay = document.getElementById('matchResultOverlay');
var bracketOverlay = document.getElementById('bracketOverlay');
var selectOverlay = document.getElementById('selectOverlay');
var playerCount = document.getElementById('playerCount');
var playersList = document.getElementById('playersList');
var playersCount = document.getElementById('playersCount');
var simTitle = document.getElementById('simTitle');
var simStatus = document.getElementById('simStatus');
var simProgress = document.getElementById('simProgress');
var simCounter = document.getElementById('simCounter');
var simLog = document.getElementById('simLog');
var watchBtn = document.getElementById('watchBtn');
var appEl = document.getElementById('app');
var matchBanner = document.getElementById('matchBanner');
var matchInfo = document.getElementById('matchInfo');
var matchScore = document.getElementById('matchScore');

var gameMode = 'quick';
var tournamentNames = { 1: 'Игрок 1', 2: 'Игрок 2' };
var tournamentGameCallback = null;
var tournamentRun = null;

// ============ МЕНЮ ============
document.getElementById('btnTournament').addEventListener('click', function() {
  menuOverlay.classList.remove('show');
  playerCount.value = '2';
  setupOverlay.classList.add('show');
});
document.getElementById('btnQuickPlay').addEventListener('click', function() {
  menuOverlay.classList.remove('show');
  selectOverlay.classList.add('show');
});
document.getElementById('quickBackBtn').addEventListener('click', function() {
  selectOverlay.classList.remove('show');
  menuOverlay.classList.add('show');
});

// ============ НАСТРОЙКА ============
document.getElementById('btnSetupBack').addEventListener('click', function() {
  setupOverlay.classList.remove('show');
  menuOverlay.classList.add('show');
});
document.getElementById('btnSetupNext').addEventListener('click', function() {
  var n = parseInt(playerCount.value, 10);
  if (isNaN(n) || n < 2) n = 2;
  if (n > 10000) n = 10000;
  playerCount.value = String(n);
  buildPlayersList(n);
  setupOverlay.classList.remove('show');
  playersOverlay.classList.add('show');
});

// ============ СПИСОК ИГРОКОВ ============
var tournamentPlayers = [];

function buildPlayersList(n) {
  tournamentPlayers = [];
  for (var i = 0; i < n; i++) tournamentPlayers.push({ name: '', classKey: null });
  renderPlayersList();
}

function renderPlayersList() {
  var n = tournamentPlayers.length;
  playersCount.textContent = 'Игроков: ' + n;
  playersList.innerHTML = '';
  if (n > 200) {
    var info = document.createElement('div');
    info.style.cssText = 'padding:20px;text-align:center;color:#8892b0;font-size:13px;line-height:1.6;';
    info.innerHTML = 'Список из <b style="color:#4ade80">' + n + '</b> игроков.<br><br>' +
      'Ручное редактирование показано для первых 200.<br>' +
      'Остальные заполнятся случайно при старте.';
    playersList.appendChild(info);
  }
  var showCount = Math.min(n, 200);
  for (var i = 0; i < showCount; i++) playersList.appendChild(createPlayerRow(i));
}

function createPlayerRow(idx) {
  var p = tournamentPlayers[idx];
  var row = document.createElement('div');
  row.className = 'player-row';
  var num = document.createElement('span'); num.className = 'num'; num.textContent = (idx + 1);
  row.appendChild(num);
  var nameInput = document.createElement('input');
  nameInput.className = 'name-input';
  nameInput.type = 'text';
  nameInput.placeholder = 'Имя (пусто = случайно)';
  nameInput.value = p.name;
  nameInput.addEventListener('input', function(e) { tournamentPlayers[idx].name = e.target.value; });
  row.appendChild(nameInput);
  var classBtn = document.createElement('button');
  classBtn.className = 'class-btn';
  updateClassBtn(classBtn, p.classKey);
  classBtn.addEventListener('click', function(e) { e.stopPropagation(); openClassMenu(idx, classBtn); });
  row.appendChild(classBtn);
  return row;
}

function updateClassBtn(btn, classKey) {
  if (classKey) {
    var c = CLASSES[classKey];
    btn.textContent = c.icon + ' ' + c.short;
    btn.className = 'class-btn set';
  } else {
    btn.textContent = '🎲 Случайно';
    btn.className = 'class-btn random';
  }
}

// ============ МЕНЮ КЛАССА ============
var classMenuEl = null, classMenuIdx = -1, classMenuBtn = null;
function openClassMenu(idx, btn) {
  classMenuIdx = idx; classMenuBtn = btn;
  if (classMenuEl) classMenuEl.remove();
  classMenuEl = document.createElement('div');
  classMenuEl.className = 'class-menu show';
  var card = document.createElement('div');
  card.className = 'class-menu-card';
  var title = document.createElement('div');
  title.className = 'class-menu-title'; title.textContent = 'Выбор класса';
  card.appendChild(title);
  var grid = document.createElement('div'); grid.className = 'class-menu-grid';

  var randOpt = document.createElement('div');
  randOpt.className = 'class-option' + (tournamentPlayers[idx].classKey === null ? ' selected' : '');
  randOpt.innerHTML = '<div class="co-icon random-icon">🎲</div><div class="co-name">Случайно</div>';
  randOpt.addEventListener('click', function() {
    tournamentPlayers[idx].classKey = null;
    updateClassBtn(classMenuBtn, null);
    closeClassMenu();
  });
  grid.appendChild(randOpt);

  CLASS_KEYS.forEach(function(k) {
    var c = CLASSES[k];
    var opt = document.createElement('div');
    opt.className = 'class-option' + (tournamentPlayers[idx].classKey === k ? ' selected' : '');
    opt.innerHTML = '<div class="co-icon">' + c.icon + '</div><div class="co-name">' + c.short + '</div>';
    opt.addEventListener('click', function() {
      tournamentPlayers[idx].classKey = k;
      updateClassBtn(classMenuBtn, k);
      closeClassMenu();
    });
    grid.appendChild(opt);
  });

  card.appendChild(grid);
  classMenuEl.appendChild(card);
  document.body.appendChild(classMenuEl);
  classMenuEl.addEventListener('click', function(e) { if (e.target === classMenuEl) closeClassMenu(); });
}
function closeClassMenu() { if (classMenuEl) { classMenuEl.remove(); classMenuEl = null; } classMenuIdx = -1; classMenuBtn = null; }

document.getElementById('btnFillRandom').addEventListener('click', function() {
  for (var i = 0; i < tournamentPlayers.length; i++) {
    if (!tournamentPlayers[i].name) tournamentPlayers[i].name = randomName();
    if (!tournamentPlayers[i].classKey) tournamentPlayers[i].classKey = randomClass();
  }
  renderPlayersList();
});
document.getElementById('btnClearAll').addEventListener('click', function() {
  for (var i = 0; i < tournamentPlayers.length; i++) {
    tournamentPlayers[i].name = ''; tournamentPlayers[i].classKey = null;
  }
  renderPlayersList();
});
document.getElementById('btnPlayersBack').addEventListener('click', function() {
  playersOverlay.classList.remove('show');
  setupOverlay.classList.add('show');
});

// ============ ЛОГ СИМУЛЯЦИИ ============
function addSimLog(html, cls) {
  var line = document.createElement('div');
  line.className = 'sim-log-line ' + (cls || '');
  line.innerHTML = html;
  simLog.insertBefore(line, simLog.firstChild);
  while (simLog.children.length > 200) simLog.removeChild(simLog.lastChild);
}
function addRoundHeader(roundName, aliveCount) {
  var line = document.createElement('div');
  line.className = 'sim-log-line round-header';
  line.textContent = roundName + ' · игроков: ' + aliveCount;
  simLog.insertBefore(line, simLog.firstChild);
}

function getRoundName(playersInRound) {
  if (playersInRound === 2) return 'ФИНАЛ';
  if (playersInRound === 4) return 'ПОЛУФИНАЛ';
  if (playersInRound === 8) return '1/4 ФИНАЛА';
  if (playersInRound === 16) return '1/8 ФИНАЛА';
  if (playersInRound === 32) return '1/16 ФИНАЛА';
  if (playersInRound === 64) return '1/32 ФИНАЛА';
  if (playersInRound === 128) return '1/64 ФИНАЛА';
  if (playersInRound === 256) return '1/128 ФИНАЛА';
  if (playersInRound === 512) return '1/256 ФИНАЛА';
  if (playersInRound === 1024) return '1/512 ФИНАЛА';
  return 'Раунд на ' + playersInRound;
}
function shortRoundName(name) {
  return name.replace('1/16 ФИНАЛА', '1/16')
             .replace('1/32 ФИНАЛА', '1/32')
             .replace('1/64 ФИНАЛА', '1/64')
             .replace('1/128 ФИНАЛА', '1/128')
             .replace('1/256 ФИНАЛА', '1/256')
             .replace('1/512 ФИНАЛА', '1/512')
             .replace('1/4 ФИНАЛА', '1/4')
             .replace('1/8 ФИНАЛА', '1/8')
             .replace('ПОЛУФИНАЛ', '1/2')
             .replace('ФИНАЛ', 'ФИНАЛ');
}

// ============ МАТЕМАТИЧЕСКАЯ СИМУЛЯЦИЯ ПАРТИИ ============
function simulateBattleMath(c1, c2) {
  var h1 = MAX_HP, h2 = MAX_HP;
  var t = Math.random() < 0.5 ? 1 : 2;
  var st = { 1: false, 2: false };
  var jb = { 1: 0, 2: 0 };
  var sm = { 1: null, 2: null };
  var weak = { 1: false, 2: false };
  var MAX_TURNS = 500;

  function r6() { return 1 + Math.floor(Math.random() * 6); }
  function beautiful(n) {
    if (n <= 0) return false;
    var s = '' + n; if (s.length < 2) return false;
    for (var i = 1; i < s.length; i++) if (s[i] !== s[0]) return false;
    return true;
  }
  function round(n) {
    if (n <= 0) return false;
    if (n >= 10 && n <= 90 && n % 10 === 0) return true;
    if (n >= 100 && n <= 900 && n % 100 === 0) return true;
    return false;
  }
  function bers(hp) {
    if (hp === 1) return 100;
    if (hp < 5) return 70;
    if (hp < 50) return 40;
    if (hp < 100) return 30;
    if (hp < 150) return 20;
    if (hp < 200) return 12;
    if (hp < 250) return 7;
    if (hp < 300) return 3;
    return 0;
  }
  function applyJoker(p) {
    if ((p === 1 ? c1 : c2) !== 'joker') return;
    var cur = jb[p];
    if (beautiful(h1) || beautiful(h2)) { if (JOKER_BEAUTIFUL_MULT > cur) jb[p] = JOKER_BEAUTIFUL_MULT; }
    else if (round(h1) || round(h2)) { if (JOKER_ROUND_MULT > cur) jb[p] = JOKER_ROUND_MULT; }
  }

  for (var ti = 0; ti < MAX_TURNS; ti++) {
    if (h1 <= 0) return 2;
    if (h2 <= 0) return 1;
    var a = t, d = a === 1 ? 2 : 1, cls = a === 1 ? c1 : c2;
    if (st[a]) { st[a] = false; t = d; continue; }
    var v1 = r6(), v2 = r6();
    var db = v1 === v2;
    var base = v1 * 10 + v2;
    var dmg = base, heal = 0, stunCause = false;

    if (cls === 'assassin' && db) {
      var r1 = r6(), r2 = r6();
      dmg = Math.round((r1 * 10 + r2) * ASSASSIN_CRIT);
    } else if (cls === 'barbarian') {
      if (db) { stunCause = true; weak[a] = true; }
      if (weak[a]) { dmg = Math.floor(base * BARB_WEAK_MULT); weak[a] = false; }
    } else if (cls === 'vampire' && db) {
      var b1 = r6(), b2 = r6();
      dmg = b1 * 10 + b2; heal = dmg;
    } else if (cls === 'joker') {
      if (jb[a] > 0) { dmg = Math.round(base * jb[a]); jb[a] = 0; }
    } else if (cls === 'berserker') {
      var myHp = a === 1 ? h1 : h2;
      dmg = base + bers(myHp);
    } else if (cls === 'druid') {
      if (sm[a]) {
        dmg = Math.floor(base * sm[a].mult);
        if (sm[a].canStun && db) stunCause = true;
      } else if (db) {
        var info = SUMMON_TABLE[base];
        if (info) { sm[a] = { hp: info.hp, mult: info.mult, canStun: info.canStun }; dmg = 0; }
      }
    }

    if (dmg > 0) {
      var s = sm[d];
      if (s) {
        if (dmg >= s.hp) {
          var ov = dmg - s.hp; sm[d] = null;
          if (d === 1) h1 = Math.max(0, h1 - ov); else h2 = Math.max(0, h2 - ov);
        } else { s.hp -= dmg; }
      } else {
        if (d === 1) h1 = Math.max(0, h1 - dmg); else h2 = Math.max(0, h2 - dmg);
      }
    }
    if (heal > 0) { if (a === 1) h1 = Math.min(MAX_HP, h1 + heal); else h2 = Math.min(MAX_HP, h2 + heal); }
    applyJoker(1); applyJoker(2);
    if (stunCause) st[d] = true;
    t = d;
  }
  return 1;
}

function simulateMatchMath(p1, p2, bo) {
  var need = Math.ceil(bo / 2);
  var w1 = 0, w2 = 0;
  while (w1 < need && w2 < need) {
    var r = simulateBattleMath(p1.classKey, p2.classKey);
    if (r === 1) w1++; else w2++;
  }
  return {
    winner: w1 >= need ? p1 : p2,
    loser: w1 >= need ? p2 : p1,
    score: [w1, w2],
    gamesCount: w1 + w2
  };
}

// ============ СТАРТ ТУРНИРА ============
document.getElementById('btnStartTournament').addEventListener('click', function() {
  for (var i = 0; i < tournamentPlayers.length; i++) {
    if (!tournamentPlayers[i].name) tournamentPlayers[i].name = randomName();
    if (!tournamentPlayers[i].classKey) tournamentPlayers[i].classKey = randomClass();
  }
  playersOverlay.classList.remove('show');
  simOverlay.classList.add('show');
  simLog.innerHTML = '';
  simProgress.style.width = '0%';
  watchBtn.style.display = 'none';
  startTournament();
});

function startTournament() {
  var N = tournamentPlayers.length;
  var size = 1;
  while (size < N) size *= 2;

  var list = tournamentPlayers.slice();
  shuffle(list);
  var bracket = [];
  for (var i = 0; i < size; i++) bracket.push(i < N ? list[i] : null);

  tournamentRun = {
    currentRound: bracket,
    currentRoundIdx: 0,
    rounds: [],
    totalMatches: 0,
    totalGames: 0,
    semifinalLosers: [],
    finalMatch: null
  };

  processInstantRound();
}

// ============ МГНОВЕННАЯ ФАЗА ============
function processInstantRound() {
  var cur = tournamentRun.currentRound;
  if (cur.length <= 1) { finishTournament(); return; }

  if (cur.length <= 32) {
    simStatus.textContent = 'Готово к просмотру';
    simCounter.textContent = 'Игроков: ' + cur.length + ' — можно смотреть бои';
    watchBtn.style.display = 'block';
    return;
  }

  var playersInRound = cur.length;
  var roundName = getRoundName(playersInRound);
  var bo = 3;

  simStatus.textContent = roundName + ' · Bo' + bo;
  addRoundHeader(roundName, playersInRound);

  var roundData = { name: roundName, bo: bo, matches: [] };
  var nextRound = [];

  for (var i = 0; i < cur.length; i += 2) {
    var p1 = cur[i], p2 = cur[i + 1];
    if (p1 && p2) {
      var res = simulateMatchMath(p1, p2, bo);
      tournamentRun.totalMatches++;
      tournamentRun.totalGames += res.gamesCount;
      roundData.matches.push({ p1: p1, p2: p2, winner: res.winner, loser: res.loser, score: res.score });
      addSimLog(
        '<span class="round-tag">' + shortRoundName(roundName) + '</span>' +
        '<span class="p-win">' + CLASSES[res.winner.classKey].icon + ' ' + escapeHtml(res.winner.name) + '</span>' +
        '<span class="score">' + res.score[0] + ':' + res.score[1] + '</span>' +
        '<span class="p-lose">' + escapeHtml(res.loser.name) + ' ' + CLASSES[res.loser.classKey].icon + '</span>',
        'match'
      );
      nextRound.push(res.winner);
    } else if (p1) {
      roundData.matches.push({ p1: p1, p2: null, winner: p1, loser: null, score: [0, 0] });
      nextRound.push(p1);
    } else if (p2) {
      roundData.matches.push({ p1: null, p2: p2, winner: p2, loser: null, score: [0, 0] });
      nextRound.push(p2);
    }
  }

  tournamentRun.rounds.push(roundData);
  tournamentRun.currentRoundIdx++;

  var N = tournamentPlayers.length;
  var progress = (1 - nextRound.length / N) * 100;
  simProgress.style.width = progress + '%';
  simCounter.textContent = 'Осталось игроков: ' + nextRound.length;

  tournamentRun.currentRound = nextRound;
  setTimeout(processInstantRound, 120);
}

// ============ СМОТРЕТЬ БОИ ============
watchBtn.addEventListener('click', function() {
  watchBtn.style.display = 'none';
  simOverlay.classList.remove('show');
  processAnimatedRound();
});

function processAnimatedRound() {
  var cur = tournamentRun.currentRound;
  if (cur.length <= 1) { finishTournament(); return; }

  var playersInRound = cur.length;
  var roundName = getRoundName(playersInRound);
  var isFinal = playersInRound === 2;
  var bo = isFinal ? 5 : 3;

  simStatus.textContent = roundName + ' · Bo' + bo;
  addRoundHeader(roundName, playersInRound);

  var roundData = { name: roundName, bo: bo, matches: [] };
  var matches = [];
  for (var i = 0; i < cur.length; i += 2) matches.push([cur[i], cur[i + 1]]);

  var matchIdx = 0;
  var nextRound = [];

  function playNext() {
    if (matchIdx >= matches.length) {
      tournamentRun.rounds.push(roundData);
      tournamentRun.currentRoundIdx++;
      tournamentRun.currentRound = nextRound;

      var N = tournamentPlayers.length;
      var progress = (1 - nextRound.length / N) * 100;
      simProgress.style.width = progress + '%';
      simCounter.textContent = 'Осталось игроков: ' + nextRound.length;

      setTimeout(processAnimatedRound, 2000);
      return;
    }
    var m = matches[matchIdx];
    if (m[0] && m[1]) {
      playMatch(m[0], m[1], bo, function(result) {
        tournamentRun.totalMatches++;
        tournamentRun.totalGames += result.gamesCount;
        nextRound.push(result.winner);
        roundData.matches.push({ p1: m[0], p2: m[1], winner: result.winner, loser: result.loser, score: result.score });
        if (playersInRound === 4) tournamentRun.semifinalLosers.push(result.loser);
        if (isFinal) tournamentRun.finalMatch = result;

        addSimLog(
          '<span class="round-tag">' + shortRoundName(roundName) + '</span>' +
          '<span class="p-win">' + CLASSES[result.winner.classKey].icon + ' ' + escapeHtml(result.winner.name) + '</span>' +
          '<span class="score">' + result.score[0] + ':' + result.score[1] + '</span>' +
          '<span class="p-lose">' + escapeHtml(result.loser.name) + ' ' + CLASSES[result.loser.classKey].icon + '</span>',
          'match'
        );

        document.getElementById('mrWinner').textContent = CLASSES[result.winner.classKey].icon + ' ' + result.winner.name;
        document.getElementById('mrScore').textContent = result.score[0] + ' : ' + result.score[1];
        document.getElementById('mrLoser').textContent = result.loser.name + ' ' + CLASSES[result.loser.classKey].icon;
        matchResultOverlay.classList.add('show');

        setTimeout(function() {
          matchResultOverlay.classList.remove('show');
          matchIdx++;
          setTimeout(playNext, 400);
        }, 1800);
      });
    } else if (m[0]) {
      nextRound.push(m[0]);
      roundData.matches.push({ p1: m[0], p2: null, winner: m[0], loser: null, score: [0, 0] });
      matchIdx++;
      setTimeout(playNext, 300);
    } else if (m[1]) {
      nextRound.push(m[1]);
      roundData.matches.push({ p1: null, p2: m[1], winner: m[1], loser: null, score: [0, 0] });
      matchIdx++;
      setTimeout(playNext, 300);
    } else {
      matchIdx++;
      playNext();
    }
  }

  playNext();
}

// ============ ОДИН МАТЧ С АНИМАЦИЕЙ ============
function playMatch(pA, pB, bo, callback) {
  var need = Math.ceil(bo / 2);
  var score = { 1: 0, 2: 0 };
  var gameNum = 0;

  gameMode = 'tournament';
  tournamentNames = { 1: pA.name, 2: pB.name };
  classes[1] = pA.classKey;
  classes[2] = pB.classKey;
  appEl.classList.add('show');
  matchBanner.style.display = 'flex';
  document.getElementById('exitBtn').classList.remove('hidden');

  function updateBanner() {
    var label = bo === 5 ? 'ФИНАЛ · Bo5' : 'Bo3';
    matchInfo.textContent = label;
    matchScore.textContent = score[1] + ' : ' + score[2];
  }

  function playGame() {
    gameNum++;
    resetGame();
    autoPlay = true;
    battleBtn.textContent = '⏸ ПАУЗА';
    battleBtn.className = 'control-btn stop';
    setHint('Бой ' + gameNum + ' · ' + tournamentNames[1] + ' vs ' + tournamentNames[2]);
    updateBanner();

    tournamentGameCallback = function(winner) {
      score[winner]++;
      updateBanner();

      if (score[1] >= need || score[2] >= need) {
        var matchWinner = score[1] >= need ? pA : pB;
        var matchLoser = score[1] >= need ? pB : pA;
        var res = { winner: matchWinner, loser: matchLoser, score: [score[1], score[2]], gamesCount: gameNum };
        appEl.classList.remove('show');
        matchBanner.style.display = 'none';
        document.getElementById('exitBtn').classList.add('hidden');
        setTimeout(function() { callback(res); }, 800);
      } else {
        setTimeout(playGame, 1600);
      }
    };

    roll();
  }

  playGame();
}

// ============ ЗАВЕРШЕНИЕ ТУРНИРА ============
function finishTournament() {
  var champion = tournamentRun.currentRound[0];
  if (!champion) return;

  simProgress.style.width = '100%';
  simCounter.textContent = 'Турнир завершён!';
  simStatus.textContent = 'Чемпион определён';

  appEl.classList.remove('show');
  simOverlay.classList.remove('show');

  var cClass = CLASSES[champion.classKey];
  document.getElementById('championName').textContent = champion.name;
  document.getElementById('championClass').textContent = cClass.icon + ' ' + cClass.label;

  var sl = tournamentRun.semifinalLosers;
  if (sl.length >= 2) {
    document.getElementById('podiumSilver').querySelector('.pname-txt').textContent =
      CLASSES[sl[0].classKey].icon + ' ' + sl[0].name;
    document.getElementById('podiumBronze').querySelector('.pname-txt').textContent =
      CLASSES[sl[1].classKey].icon + ' ' + sl[1].name;
  } else if (sl.length === 1) {
    document.getElementById('podiumSilver').querySelector('.pname-txt').textContent =
      CLASSES[sl[0].classKey].icon + ' ' + sl[0].name;
    document.getElementById('podiumBronze').querySelector('.pname-txt').textContent = '—';
  } else {
    document.getElementById('podiumSilver').querySelector('.pname-txt').textContent = '—';
    document.getElementById('podiumBronze').querySelector('.pname-txt').textContent = '—';
  }

  document.getElementById('tournamentStats').innerHTML =
    'Всего матчей: <b style="color:#e0e6f0">' + tournamentRun.totalMatches + '</b><br>' +
    'Всего партий: <b style="color:#e0e6f0">' + tournamentRun.totalGames + '</b><br>' +
    'Участников: <b style="color:#e0e6f0">' + tournamentPlayers.length + '</b>';

  setTimeout(function() {
    championOverlay.classList.add('show');
    var rect = document.getElementById('championName').getBoundingClientRect();
    spawnSparks(rect.left + rect.width / 2, rect.top + rect.height / 2, 40, '#fbbf24', 6);
    setTimeout(function() {
      spawnSparks(rect.left + rect.width / 2, rect.top + rect.height / 2, 25, '#4ade80', 5);
    }, 200);
  }, 300);
}

// ============ СЕТКА ТУРНИРА ============
var bracketZoomLevel = 1.0;
var bracketBaseWidth = 0, bracketBaseHeight = 0;

document.getElementById('btnShowBracket').addEventListener('click', function() {
  championOverlay.classList.remove('show');
  renderBracket();
  bracketOverlay.classList.add('show');
});

document.getElementById('bracketBackBtn').addEventListener('click', function() {
  bracketOverlay.classList.remove('show');
  championOverlay.classList.add('show');
});

document.getElementById('bracketZoomIn').addEventListener('click', function() {
  bracketZoomLevel = Math.min(2.5, bracketZoomLevel + 0.25);
  applyBracketZoom();
});
document.getElementById('bracketZoomOut').addEventListener('click', function() {
  bracketZoomLevel = Math.max(0.6, bracketZoomLevel - 0.25);
  applyBracketZoom();
});
function applyBracketZoom() {
  var grid = document.getElementById('bracketGrid');
  grid.style.transform = 'scale(' + bracketZoomLevel + ')';
  grid.style.transformOrigin = 'top left';
  document.getElementById('bracketZoom').textContent = bracketZoomLevel.toFixed(1) + '×';
  document.getElementById('bracketScroll').scrollTop = 0;
  document.getElementById('bracketScroll').scrollLeft = 0;
}

function renderBracket() {
  var N = tournamentPlayers.length;
  var size = 1; while (size < N) size *= 2;
  var numRounds = Math.log2(size);

  var SLOT_H = 14;
  var MATCH_H = SLOT_H * 2;
  var MATCH_GAP = 6;
  var COL_W = 68;
  var COL_GAP = 12;
  var LABEL_H = 20;

  var totalMatchH = size / 2 * MATCH_H + (size / 2 - 1) * MATCH_GAP;
  var totalH = totalMatchH + LABEL_H + 10;
  var totalW = numRounds * COL_W + (numRounds - 1) * COL_GAP;

  var grid = document.getElementById('bracketGrid');
  grid.innerHTML = '';
  grid.style.width = totalW + 'px';
  grid.style.height = totalH + 'px';
  grid.style.position = 'relative';

  bracketBaseWidth = totalW;
  bracketBaseHeight = totalH;
  bracketZoomLevel = 1.0;
  applyBracketZoom();

  for (var r = 0; r < numRounds; r++) {
    var playersIn = size / Math.pow(2, r);
    var label = document.createElement('div');
    label.className = 'bracket-round-label';
    label.textContent = getRoundName(playersIn).replace(' ФИНАЛА', '');
    label.style.left = (r * (COL_W + COL_GAP)) + 'px';
    label.style.top = '0px';
    label.style.width = COL_W + 'px';
    label.style.height = LABEL_H + 'px';
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.justifyContent = 'center';
    grid.appendChild(label);
  }

  var allRounds = tournamentRun.rounds;

  var initialOrder = null;
  if (allRounds.length > 0 && allRounds[0].matches.length > 0) {
    initialOrder = [];
    allRounds[0].matches.forEach(function(m) {
      initialOrder.push(m.p1);
      initialOrder.push(m.p2);
    });
    while (initialOrder.length < size) initialOrder.push(null);
  } else {
    initialOrder = [];
    for (var i = 0; i < size; i++) initialOrder.push(null);
  }

  function getMatch(r, m) {
    if (r < allRounds.length && allRounds[r].matches[m]) {
      return allRounds[r].matches[m];
    }
    if (r === 0) {
      var p1 = initialOrder[m * 2];
      var p2 = initialOrder[m * 2 + 1];
      return { p1: p1, p2: p2, winner: null, loser: null, score: [0, 0] };
    }
    var prev1 = getMatch(r - 1, m * 2);
    var prev2 = getMatch(r - 1, m * 2 + 1);
    return {
      p1: prev1.winner,
      p2: prev2.winner,
      winner: null, loser: null, score: [0, 0]
    };
  }

  var firstRoundMatches = size / 2;
  var stepFirst = (totalMatchH + MATCH_GAP) / firstRoundMatches;

  var matchCenters = [];

  for (var r = 0; r < numRounds; r++) {
    var matchesInRound = size / Math.pow(2, r + 1);
    matchCenters[r] = [];

    for (var m = 0; m < matchesInRound; m++) {
      var centerY;
      if (r === 0) {
        centerY = LABEL_H + m * stepFirst + stepFirst / 2;
      } else {
        var c1 = matchCenters[r - 1][m * 2].centerY;
        var c2 = matchCenters[r - 1][m * 2 + 1].centerY;
        centerY = (c1 + c2) / 2;
      }
      var matchTop = centerY - MATCH_H / 2;
      var matchLeft = r * (COL_W + COL_GAP);

      matchCenters[r][m] = { top: matchTop, bottom: matchTop + MATCH_H, centerY: centerY };

      var matchData = getMatch(r, m);
      var matchEl = document.createElement('div');
      matchEl.className = 'bracket-match' + (r === allRounds.length ? ' round-current' : '');
      matchEl.style.left = matchLeft + 'px';
      matchEl.style.top = matchTop + 'px';
      matchEl.style.width = COL_W + 'px';
      matchEl.style.height = MATCH_H + 'px';

      var p1 = matchData.p1;
      var p2 = matchData.p2;
      var winner = matchData.winner;

      var slot1 = document.createElement('div');
      slot1.className = 'bracket-slot';
      if (p1) {
        slot1.textContent = CLASSES[p1.classKey].icon + ' ' + shortenName(p1.name);
        slot1.classList.add(p1.classKey);
        if (winner === p1) slot1.classList.add('winner');
        else if (winner) slot1.classList.add('loser');
      } else {
        slot1.classList.add('empty');
        slot1.textContent = '—';
      }
      matchEl.appendChild(slot1);

      var slot2 = document.createElement('div');
      slot2.className = 'bracket-slot';
      if (p2) {
        slot2.textContent = CLASSES[p2.classKey].icon + ' ' + shortenName(p2.name);
        slot2.classList.add(p2.classKey);
        if (winner === p2) slot2.classList.add('winner');
        else if (winner) slot2.classList.add('loser');
      } else {
        slot2.classList.add('empty');
        slot2.textContent = '—';
      }
      matchEl.appendChild(slot2);

      grid.appendChild(matchEl);
    }
  }

  for (var r2 = 1; r2 < numRounds; r2++) {
    var matchesInRound2 = size / Math.pow(2, r2 + 1);
    var prevColRight = (r2 - 1) * (COL_W + COL_GAP) + COL_W;
    var curColLeft = r2 * (COL_W + COL_GAP);
    var midX = prevColRight + COL_GAP / 2;

    for (var m2 = 0; m2 < matchesInRound2; m2++) {
      var topCenter = matchCenters[r2 - 1][m2 * 2].centerY;
      var botCenter = matchCenters[r2 - 1][m2 * 2 + 1].centerY;
      var midY = matchCenters[r2][m2].centerY;

      var hTop = document.createElement('div');
      hTop.className = 'bracket-connector h-top';
      hTop.style.left = prevColRight + 'px';
      hTop.style.top = topCenter + 'px';
      hTop.style.width = (midX - prevColRight) + 'px';
      hTop.style.height = (midY - topCenter) + 'px';
      grid.appendChild(hTop);

      var hBot = document.createElement('div');
      hBot.className = 'bracket-connector h-bot';
      hBot.style.left = prevColRight + 'px';
      hBot.style.top = midY + 'px';
      hBot.style.width = (midX - prevColRight) + 'px';
      hBot.style.height = (botCenter - midY) + 'px';
      grid.appendChild(hBot);

      var hMid = document.createElement('div');
      hMid.className = 'bracket-connector h-mid';
      hMid.style.left = midX + 'px';
      hMid.style.top = midY + 'px';
      hMid.style.width = (curColLeft - midX) + 'px';
      hMid.style.height = '0px';
      grid.appendChild(hMid);
    }
  }
}

// ============ КНОПКИ ЭКРАНА ЧЕМПИОНА ============
document.getElementById('btnNewTournament').addEventListener('click', function() {
  championOverlay.classList.remove('show');
  setupOverlay.classList.add('show');
  gameMode = 'quick';
});
document.getElementById('btnChampionMenu').addEventListener('click', function() {
  championOverlay.classList.remove('show');
  menuOverlay.classList.add('show');
  gameMode = 'quick';
});

// ============ БЫСТРАЯ ИГРА ============
var pendingClasses = { 1: 'assassin', 2: 'barbarian' };
var dieEls = [document.getElementById('die1'), document.getElementById('die2')];
var resultEl = document.getElementById('result');
var logList = document.getElementById('logList');
var hintEl = document.getElementById('hint');
var overlay = document.getElementById('overlay');
var overlayTitle = document.getElementById('overlayTitle');
var overlaySub = document.getElementById('overlaySub');
var battleBtn = document.getElementById('battleBtn');
var exitBtn = document.getElementById('exitBtn');
var speedSlider = document.getElementById('speedSlider');
var speedValue = document.getElementById('speedValue');

// ============ ТАЙМЕРЫ (ОБНОВЛЕНЫ ПОД 30×) ============
function getSpinDuration()  { return Math.max(30, 900 / speed); }
function getPauseBetween()  { return Math.max(3,  120 / speed); }
function getStunPause()     { return Math.max(100, 1200 / speed); }
function getCritPause()     { return Math.max(30, 500 / speed); }
function getFrameInterval() { return Math.max(8, getSpinDuration() / 5); }

var rolling = false, rollNumber = 0, turn = 1;
var hp1 = MAX_HP, hp2 = MAX_HP;
var gameOver = false;
var stunned = { 1: false, 2: false };
var jokerBuff = { 1: 0, 2: 0 };
var summons = { 1: null, 2: null };
var barbWeak = { 1: false, 2: false };
var autoPlay = false, autoTimer = null;
var classes = { 1: 'assassin', 2: 'barbarian' };
var hpDisplay = { 1: MAX_HP, 2: MAX_HP };
var hpTarget = { 1: MAX_HP, 2: MAX_HP };
var hpAnimating = false;

var pipPositions = {
  1: [4], 2: [0, 8], 3: [0, 4, 8],
  4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8]
};

function coinFlip() { return Math.random() < 0.5 ? 1 : 2; }
function isBeautifulF(n) {
  if (n <= 0) return false;
  var s = String(n); if (s.length < 2) return false;
  for (var i = 1; i < s.length; i++) if (s[i] !== s[0]) return false;
  return true;
}
function isRoundF(n) {
  if (n <= 0) return false;
  if (n >= 10 && n <= 90 && n % 10 === 0) return true;
  if (n >= 100 && n <= 900 && n % 100 === 0) return true;
  return false;
}
function getBerserkerBonus(hp) {
  if (hp <= 0) return 0;
  if (hp === 1) return 100;
  if (hp < 5) return 70;
  if (hp < 50) return 40;
  if (hp < 100) return 30;
  if (hp < 150) return 20;
  if (hp < 200) return 12;
  if (hp < 250) return 7;
  if (hp < 300) return 3;
  return 0;
}
function getPlayerHp(p) { return p === 1 ? hp1 : hp2; }

function animateHp() {
  if (hpAnimating) return;
  hpAnimating = true;
  function step() {
    var done = true;
    [1, 2].forEach(function(p) {
      var cur = hpDisplay[p], tgt = hpTarget[p];
      if (cur !== tgt) {
        var diff = tgt - cur;
        var stepSize = Math.max(1, Math.ceil(Math.abs(diff) / 8));
        if (Math.abs(diff) <= stepSize) hpDisplay[p] = tgt;
        else hpDisplay[p] = cur + Math.sign(diff) * stepSize;
        var valEl = document.getElementById('hpVal' + p);
        if (valEl) valEl.textContent = hpDisplay[p];
        done = false;
      }
    });
    if (!done) requestAnimationFrame(step);
    else hpAnimating = false;
  }
  step();
}

function renderDie(el, value) {
  el.innerHTML = '';
  var pips = pipPositions[value] || [];
  for (var i = 0; i < 9; i++) {
    var cell = document.createElement('div');
    cell.className = 'pip';
    var show = false;
    for (var j = 0; j < pips.length; j++) if (pips[j] === i) { show = true; break; }
    if (!show) cell.className += ' hidden-pip';
    el.appendChild(cell);
  }
}
function randomDie() { return Math.floor(Math.random() * 6) + 1; }
function setDieGlow(type) {
  dieEls.forEach(function(el) {
    el.classList.remove('crit-glow', 'vampire-glow', 'joker-glow', 'joker15-glow', 'summon-glow', 'rage-glow');
    if (type) el.classList.add(type + '-glow');
  });
}

function renderSelectionUI() {
  ['1', '2'].forEach(function(p) {
    var container = document.querySelector('.select-list[data-player="' + p + '"]');
    container.innerHTML = '';
    CLASS_KEYS.forEach(function(key) {
      var c = CLASSES[key];
      var card = document.createElement('div');
      card.className = 'class-card' + (pendingClasses[p] === key ? ' selected' : '');
      card.innerHTML = '<div class="icon">' + c.icon + '</div>' +
        '<div class="cname">' + c.short + '</div>' +
        '<div class="cdesc">' + c.desc + '</div>';
      card.addEventListener('click', function(e) {
        e.stopPropagation();
        pendingClasses[p] = key;
        renderSelectionUI();
      });
      card.addEventListener('touchstart', function(e) { e.stopPropagation(); }, { passive: true });
      container.appendChild(card);
    });
  });
}

function updateSummonUI(p) {
  var s = summons[p];
  var el = document.getElementById('summon' + p);
  if (s) {
    el.classList.add('show');
    document.getElementById('summonIcon' + p).textContent = s.icon;
    document.getElementById('summonName' + p).textContent = s.name;
    document.getElementById('summonHp' + p).textContent = s.hp + '/' + s.maxHp;
  } else el.classList.remove('show');
}
function updateRageBadge(p) {
  var el = document.getElementById('p' + p);
  var badge = document.getElementById('rage' + p);
  if (classes[p] === 'berserker' && !gameOver && hp1 > 0 && hp2 > 0) {
    var bonus = getBerserkerBonus(getPlayerHp(p));
    if (bonus > 0) {
      el.classList.add('has-rage');
      badge.textContent = '🩸 +' + bonus;
      if (bonus >= 70) el.classList.add('rage-max'); else el.classList.remove('rage-max');
    } else { el.classList.remove('has-rage'); el.classList.remove('rage-max'); }
  } else { el.classList.remove('has-rage'); el.classList.remove('rage-max'); }
}
function updateJokerBadge(p) {
  var el = document.getElementById('p' + p);
  var badge = document.getElementById('buff' + p);
  if (classes[p] === 'joker' && !gameOver && jokerBuff[p] > 0) {
    el.classList.add('has-buff');
    if (jokerBuff[p] === JOKER_BEAUTIFUL_MULT) {
      badge.textContent = '🎲 x' + JOKER_BEAUTIFUL_MULT; badge.className = 'buff-badge tier3';
    } else {
      badge.textContent = '🎲 x' + JOKER_ROUND_MULT; badge.className = 'buff-badge tier15';
    }
  } else el.classList.remove('has-buff');
}
function updateWeakBadge(p) {
  var el = document.getElementById('p' + p);
  if (barbWeak[p] && !gameOver && hp1 > 0 && hp2 > 0) el.classList.add('has-weak');
  else el.classList.remove('has-weak');
}
function updatePlayersUI() {
  hpTarget[1] = hp1; hpTarget[2] = hp2;
  var fill1 = document.getElementById('hpFill1');
  var fill2 = document.getElementById('hpFill2');
  fill1.style.width = (hp1 / MAX_HP * 100) + '%';
  fill2.style.width = (hp2 / MAX_HP * 100) + '%';
  fill1.className = 'hp-fill' + (hp1 / MAX_HP < 0.3 ? ' low' : '');
  fill2.className = 'hp-fill' + (hp2 / MAX_HP < 0.3 ? ' low' : '');
  animateHp();

  var name1 = (gameMode === 'tournament') ? tournamentNames[1] : 'Игрок 1';
  var name2 = (gameMode === 'tournament') ? tournamentNames[2] : 'Игрок 2';
  document.getElementById('pname1').textContent = name1;
  document.getElementById('pname2').textContent = name2;

  var pc1 = document.getElementById('pclass1');
  var pc2 = document.getElementById('pclass2');
  var c1 = CLASSES[classes[1]], c2 = CLASSES[classes[2]];
  pc1.textContent = c1 ? c1.label : '—';
  pc1.className = 'pclass ' + (c1 ? c1.css : '');
  pc2.textContent = c2 ? c2.label : '—';
  pc2.className = 'pclass ' + (c2 ? c2.css : '');
  var p1 = document.getElementById('p1'), p2 = document.getElementById('p2');
  var cls1 = 'player', cls2 = 'player';
  if (!gameOver) {
    if (turn === 1) cls1 += ' active';
    if (turn === 2) cls2 += ' active p2-active';
  }
  if (stunned[1]) cls1 += ' stunned';
  if (stunned[2]) cls2 += ' stunned';
  if (hp1 <= 0) cls1 += ' dead';
  if (hp2 <= 0) cls2 += ' dead';
  p1.className = cls1; p2.className = cls2;
  updateJokerBadge(1); updateJokerBadge(2);
  updateRageBadge(1); updateRageBadge(2);
  updateWeakBadge(1); updateWeakBadge(2);
  updateSummonUI(1); updateSummonUI(2);
}
function setHint(text) { hintEl.textContent = text; }

function addAttackLog(m) {
  var entry = document.createElement('div');
  var extra = '';
  if (m.isWeak) extra = ' weak';
  else if (m.isCrit) extra = ' crit';
  else if (m.heal) extra = ' vampire';
  else if (m.jokerMult === JOKER_BEAUTIFUL_MULT) extra = ' joker';
  else if (m.jokerMult === JOKER_ROUND_MULT) extra = ' joker15';
  else if (m.rageBonus > 0) extra = ' rage';
  else if (m.summonInfo) extra = ' summon-attack';
  else if (m.isDouble) extra = ' double';
  entry.className = 'log-entry attack' + extra;

  var attackerLabel;
  if (m.summonInfo) attackerLabel = '<span class="p1">' + m.summonInfo.icon + ' ' + m.summonInfo.name + ' И' + m.attacker + '</span>';
  else attackerLabel = '<span class="p1">' + (gameMode === 'tournament' ? tournamentNames[m.attacker] : 'Игрок ' + m.attacker) + '</span>';

  var hpPct = m.defHpAfter / MAX_HP;
  var hpClass = '';
  if (m.defHpAfter <= 0) hpClass = ' critical';
  else if (hpPct < 0.3) hpClass = ' low';

  var extraFormula = '';
  if (m.heal > 0) extraFormula += ' · 🧛 +' + m.heal;
  if (m.stunCaused) extraFormula += ' · ⚡стан';

  entry.innerHTML =
    '<div class="le-head"><span class="idx">#' + m.number + '</span>' +
      '<span class="le-dice">[' + m.v1 + '|' + m.v2 + ']</span>' +
      '<span class="le-route">' + attackerLabel + '<span class="arrow">→</span><span class="p2">' + (gameMode === 'tournament' ? tournamentNames[m.defender] : 'Игрок ' + m.defender) + '</span></span></div>' +
    '<div class="le-calc"><span class="le-formula">' + m.formula + extraFormula + '</span>' +
      '<span class="le-dmg">−' + m.dmg + '</span></div>' +
    '<div class="le-hp"><span class="hp-label">HP</span>' +
      '<span class="hp-before">' + m.defHpBefore + '</span>' +
      '<span class="hp-arrow">→</span>' +
      '<span class="hp-after' + hpClass + '">' + m.defHpAfter + '</span></div>';

  logList.insertBefore(entry, logList.firstChild);
  trimLog();
}
function addStunSkipLog(n) {
  var entry = document.createElement('div'); entry.className = 'log-entry stun';
  entry.innerHTML = '<span class="idx" style="color:#fbbf24">⚡</span><span class="who">' + (gameMode === 'tournament' ? tournamentNames[n] : 'Игрок ' + n) + ' оглушён</span><span class="dmg">ПРОПУСК</span>';
  logList.insertBefore(entry, logList.firstChild); trimLog();
}
function addCoinLog(n) {
  var entry = document.createElement('div'); entry.className = 'log-entry coin';
  var name = n === 1 ? 'Орёл' : 'Решка';
  entry.innerHTML = '<span class="who">🪙 ' + name + ' — первым ходит ' + (gameMode === 'tournament' ? tournamentNames[n] : 'Игрок ' + n) + '</span>';
  logList.insertBefore(entry, logList.firstChild); trimLog();
}
function addJokerBuffLog(p, mult) {
  var entry = document.createElement('div');
  entry.className = 'log-entry ' + (mult === JOKER_BEAUTIFUL_MULT ? 'buff' : 'buff15');
  entry.innerHTML = '<span class="idx" style="color:#10b981">🎲</span><span class="who">Джокер ' + (gameMode === 'tournament' ? tournamentNames[p] : 'Игрок ' + p) + '</span><span class="dmg">×' + mult + ' ГОТОВ</span>';
  logList.insertBefore(entry, logList.firstChild); trimLog();
}
function addSummonLog(p, info) {
  var entry = document.createElement('div'); entry.className = 'log-entry summon';
  entry.innerHTML = '<span class="idx" style="color:#22c55e">✨</span><span class="who p' + p + '">' + (gameMode === 'tournament' ? tournamentNames[p] : 'И' + p) + ' призвал</span><span class="dmg">' + info.icon + ' ' + info.name + ' · ' + info.hp + ' HP</span>';
  logList.insertBefore(entry, logList.firstChild); trimLog();
}
function addSummonDeathLog(defender, killed, overflow) {
  var entry = document.createElement('div'); entry.className = 'log-entry summon-death';
  entry.innerHTML = '<span class="idx" style="color:#f87171">💀</span><span class="who">' + killed.icon + ' ' + killed.name + ' погиб</span><span class="dmg">' + (overflow > 0 ? overflow + ' → ' + (gameMode === 'tournament' ? tournamentNames[defender] : 'И' + defender) : '') + '</span>';
  logList.insertBefore(entry, logList.firstChild); trimLog();
}
function trimLog() { while (logList.children.length > MAX_LOG) logList.removeChild(logList.lastChild); }

function checkJokerBuffs() {
  [1, 2].forEach(function(p) {
    if (classes[p] !== 'joker') return;
    var cur = jokerBuff[p];
    var newBuff = 0;
    if (isBeautifulF(hp1) || isBeautifulF(hp2)) newBuff = JOKER_BEAUTIFUL_MULT;
    else if (isRoundF(hp1) || isRoundF(hp2)) newBuff = JOKER_ROUND_MULT;
    if (newBuff > cur) {
      jokerBuff[p] = newBuff;
      addJokerBuffLog(p, newBuff);
      var card = document.getElementById('p' + p);
      if (card) {
        var r = card.getBoundingClientRect();
        spawnSparks(r.left + r.width / 2, r.top + r.height / 2, 18, newBuff === JOKER_BEAUTIFUL_MULT ? '#10b981' : '#fbbf24', 3);
      }
    }
  });
}

function dealDamage(defender, dmg) {
  var s = summons[defender];
  if (s) {
    if (dmg >= s.hp) {
      var ov = dmg - s.hp;
      var killed = { name: s.name, icon: s.icon };
      summons[defender] = null;
      if (defender === 1) hp1 = Math.max(0, hp1 - ov); else hp2 = Math.max(0, hp2 - ov);
      return { toSummon: s.hp, toPlayer: ov, summonDied: true, killed: killed };
    } else { s.hp -= dmg; return { toSummon: dmg, toPlayer: 0, summonDied: false, killed: null }; }
  }
  if (defender === 1) hp1 = Math.max(0, hp1 - dmg); else hp2 = Math.max(0, hp2 - dmg);
  return { toSummon: 0, toPlayer: dmg, summonDied: false, killed: null };
}

function spinDice(callback) {
  dieEls.forEach(function(el) { el.classList.add('spinning', 'rolling'); });
  setDieGlow(null);
  var spinDuration = getSpinDuration();
  var frameInterval = getFrameInterval();
  var start = performance.now();
  var timer = setInterval(function() {
    dieEls.forEach(function(el) { renderDie(el, randomDie()); });
    if (performance.now() - start >= spinDuration) {
      clearInterval(timer);
      var v1 = randomDie(), v2 = randomDie();
      renderDie(dieEls[0], v1); renderDie(dieEls[1], v2);
      dieEls.forEach(function(el) { el.classList.remove('spinning', 'rolling'); });
      callback(v1, v2);
    }
  }, frameInterval);
}

function roll() {
  if (rolling || gameOver) return;
  rolling = true;
  spinDice(function(v1, v2) {
    var attacker = turn, defender = attacker === 1 ? 2 : 1;
    var cls = classes[attacker];
    var isDouble = v1 === v2;
    var baseDmg = v1 * 10 + v2;
    var formula = String(baseDmg);

    resultEl.textContent = String(baseDmg);
    resultEl.className = 'result' + (isDouble ? ' double' : (attacker === 2 ? ' p2' : ''));

    if (cls === 'druid') {
      if (summons[attacker]) {
        var s = summons[attacker];
        var sd = Math.floor(baseDmg * s.mult);
        var stunB = s.canStun && isDouble;
        resultEl.textContent = String(sd);
        resultEl.className = 'result summon';
        setDieGlow('summon'); setTimeout(function() { setDieGlow(null); }, 600);
        setHint(s.icon + ' ' + s.name + ' атакует!');
        var summonFormula = s.mult === 1.0 ? String(baseDmg) : baseDmg + ' ×' + s.mult;
        applyHit(attacker, defender, sd, isDouble, stunB, false, 0, 0, { icon: s.icon, name: s.name }, 0, false, v1, v2, summonFormula);
        return;
      }
      if (isDouble) {
        var info = SUMMON_TABLE[baseDmg];
        if (info) {
          summons[attacker] = { type: info.type, name: info.name, icon: info.icon, hp: info.hp, maxHp: info.hp, mult: info.mult, canStun: info.canStun };
          setHint(info.icon + ' Призыв: ' + info.name + '!');
          addSummonLog(attacker, info);
          rollNumber++; updatePlayersUI();
          finishTurnAfterAction(attacker, defender, 0);
          return;
        }
      }
      applyHit(attacker, defender, baseDmg, isDouble, false, false, 0, 0, null, 0, false, v1, v2, formula);
      return;
    }

    if (cls === 'assassin' && isDouble) {
      setHint('🗡 Дубль! Переброс на крит...');
      setTimeout(function() {
        spinDice(function(r1, r2) {
          var critBase = r1 * 10 + r2;
          var critDmg = Math.round(critBase * ASSASSIN_CRIT);
          resultEl.textContent = critDmg + '';
          resultEl.className = 'result crit';
          setDieGlow('crit'); setTimeout(function() { setDieGlow(null); }, 600);
          applyHit(attacker, defender, critDmg, false, false, true, 0, 0, null, 0, false, r1, r2, critBase + ' ×' + ASSASSIN_CRIT);
        });
      }, getCritPause());
      return;
    }

    if (cls === 'vampire' && isDouble) {
      setHint('🧛 Дубль! Укус...');
      setTimeout(function() {
        spinDice(function(r1, r2) {
          var bite = r1 * 10 + r2;
          resultEl.textContent = bite + '';
          resultEl.className = 'result vampire';
          setDieGlow('vampire'); setTimeout(function() { setDieGlow(null); }, 600);
          applyHit(attacker, defender, bite, false, false, false, bite, 0, null, 0, false, r1, r2, String(bite));
        });
      }, getCritPause());
      return;
    }

    var jokerMult = 0;
    var dmg = baseDmg;
    if (cls === 'joker' && jokerBuff[attacker] > 0) {
      jokerMult = jokerBuff[attacker];
      dmg = Math.round(baseDmg * jokerMult);
      jokerBuff[attacker] = 0;
      resultEl.textContent = dmg + '';
      resultEl.className = 'result ' + (jokerMult === JOKER_BEAUTIFUL_MULT ? 'joker' : 'joker15');
      setDieGlow(jokerMult === JOKER_BEAUTIFUL_MULT ? 'joker' : 'joker15');
      setTimeout(function() { setDieGlow(null); }, 700);
      setHint('🎲 Джокер ×' + jokerMult + '!');
      formula = baseDmg + ' ×' + jokerMult;
    }

    var rageBonus = 0;
    if (cls === 'berserker') {
      rageBonus = getBerserkerBonus(getPlayerHp(attacker));
      if (rageBonus > 0) {
        dmg = baseDmg + rageBonus;
        resultEl.textContent = dmg + '';
        resultEl.className = 'result rage';
        setDieGlow('rage'); setTimeout(function() { setDieGlow(null); }, 600);
        setHint('🔥 Ярость +' + rageBonus + '!');
        formula = baseDmg + ' +' + rageBonus;
      }
    }

    var stunCaused = false;
    var isWeak = false;
    if (cls === 'barbarian') {
      if (barbWeak[attacker]) {
        dmg = Math.floor(dmg * BARB_WEAK_MULT);
        isWeak = true; barbWeak[attacker] = false;
        resultEl.textContent = dmg + '';
        resultEl.className = 'result weak';
        setHint('💜 Удар ослаблен на 20%');
        formula = baseDmg + ' ×0.8';
      }
      if (isDouble && hp1 > 0 && hp2 > 0) {
        stunned[defender] = true; stunCaused = true; barbWeak[attacker] = true;
      }
    }

    applyHit(attacker, defender, dmg, isDouble, stunCaused, false, 0, jokerMult, null, rageBonus, isWeak, v1, v2, formula);
  });
}

function finishTurnAfterAction(attacker, defender, extraDelay) {
  if (hp1 <= 0 || hp2 <= 0) {
    gameOver = true;
    stunned[1] = false; stunned[2] = false;
    jokerBuff[1] = 0; jokerBuff[2] = 0;
    summons[1] = null; summons[2] = null;
    barbWeak[1] = false; barbWeak[2] = false;
    updatePlayersUI(); showGameOver(); rolling = false; return;
  }
  checkJokerBuffs();
  turn = defender;
  updatePlayersUI();
  var delay = extraDelay || 0;
  if (stunned[turn]) {
    var skip = turn;
    var sp = getStunPause();
    setHint('⚡ ' + (gameMode === 'tournament' ? tournamentNames[skip] : 'Игрок ' + skip) + ' оглушён!');
    addStunSkipLog(skip); delay += sp;
    setTimeout(function() {
      stunned[skip] = false;
      turn = skip === 1 ? 2 : 1;
      updatePlayersUI();
    }, sp);
  }
  rolling = false;
  if (autoPlay) {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(function() { if (autoPlay && !gameOver) roll(); }, getPauseBetween() + delay);
  }
}

function applyHit(attacker, defender, dmg, isDouble, stunCaused, isCrit, heal, jokerMult, summonInfo, rageBonus, isWeak, v1, v2, formula) {
  rollNumber++;
  var defHpBefore = defender === 1 ? hp1 : hp2;
  var dr = dealDamage(defender, dmg);
  var defHpAfter = defender === 1 ? hp1 : hp2;

  var floatType = '';
  if (isCrit) floatType = 'crit';
  else if (isWeak) floatType = 'weak';
  showFloatingDamage(defender, dmg, floatType);
  if (heal > 0) setTimeout(function() { showFloatingDamage(attacker, heal, 'heal'); }, 150);

  shakeCard(defender); flashHpBar(defender);
  var defRect = document.getElementById('p' + defender).getBoundingClientRect();
  var cx = defRect.left + defRect.width / 2;
  var cy = defRect.top + defRect.height / 2;

  var intensity = 0;
  if (isCrit) intensity = 3;
  else if (isWeak) intensity = 1;
  else if (dmg >= 60) intensity = 2;
  else if (dmg >= 40) intensity = 1;
  if (rageBonus > 0 && dmg >= 70) intensity = Math.max(intensity, 2);
  if (intensity >= 2) shakeScreen(intensity === 3);
  if (intensity === 3) {
    spawnSparks(cx, cy, 30, '#fbbf24', 6);
    spawnSparks(cx, cy, 15, '#ef4444', 4);
    spawnShockwave(cx, cy, '#fbbf24');
  } else if (intensity === 2) spawnSparks(cx, cy, 15, '#f87171', 4);
  else if (intensity === 1) spawnSparks(cx, cy, 8, '#f87171', 3);

  if ((v1 === 6 && v2 === 6) || (isCrit && dmg >= 100)) {
    dieEls.forEach(function(el) {
      el.classList.remove('max-pulse'); void el.offsetWidth;
      el.classList.add('max-pulse');
      setTimeout(function() { el.classList.remove('max-pulse'); }, 650);
    });
  }

  addAttackLog({
    number: rollNumber, attacker: attacker, defender: defender, dmg: dmg,
    v1: v1, v2: v2, formula: formula, isCrit: isCrit, isWeak: isWeak, heal: heal,
    jokerMult: jokerMult, rageBonus: rageBonus, stunCaused: stunCaused,
    summonInfo: summonInfo, isDouble: isDouble,
    defHpBefore: defHpBefore, defHpAfter: defHpAfter
  });

  if (dr.summonDied) addSummonDeathLog(defender, dr.killed, dr.toPlayer);
  if (heal > 0) {
    if (attacker === 1) hp1 = Math.min(MAX_HP, hp1 + heal); else hp2 = Math.min(MAX_HP, hp2 + heal);
  }
  finishTurnAfterAction(attacker, defender, 0);
}

function showGameOver() {
  var winner = hp1 <= 0 ? 2 : 1;

  if (gameMode === 'tournament' && tournamentGameCallback) {
    var cb = tournamentGameCallback;
    tournamentGameCallback = null;
    autoPlay = false;
    clearTimeout(autoTimer);
    var w = winner;
    setTimeout(function() { cb(w); }, 900);
    return;
  }

  overlayTitle.textContent = 'Игрок ' + winner + ' победил!';
  overlayTitle.style.color = winner === 1 ? '#4ade80' : '#60a5fa';
  overlaySub.textContent = CLASSES[classes[1]].label + ': ' + hp1 + ' HP  ·  ' + CLASSES[classes[2]].label + ': ' + hp2 + ' HP  ·  ' + speed + '×';
  overlay.classList.add('show');
  setHint('Игра окончена');
  battleBtn.classList.add('hidden');
  var card = document.getElementById('p' + winner);
  if (card) {
    var r = card.getBoundingClientRect();
    spawnSparks(r.left + r.width / 2, r.top + r.height / 2, 40, '#4ade80', 6);
  }
}

function startAuto() {
  if (gameOver) return;
  autoPlay = true;
  battleBtn.textContent = '⏸ СТОП';
  battleBtn.className = 'control-btn stop';
  setHint('⚔ Бой идёт... (' + speed + '×)');
  roll();
}
function stopAuto() {
  autoPlay = false;
  clearTimeout(autoTimer);
  battleBtn.textContent = '▶ НАЧАТЬ БОЙ';
  battleBtn.className = 'control-btn start';
  if (!gameOver) setHint('Пауза. Нажми «Начать бой»');
}

function resetGame() {
  hp1 = MAX_HP; hp2 = MAX_HP;
  hpDisplay[1] = MAX_HP; hpDisplay[2] = MAX_HP;
  hpTarget[1] = MAX_HP; hpTarget[2] = MAX_HP;
  turn = 1; rollNumber = 0;
  gameOver = false; rolling = false;
  autoPlay = false; clearTimeout(autoTimer);
  stunned[1] = false; stunned[2] = false;
  jokerBuff[1] = 0; jokerBuff[2] = 0;
  summons[1] = null; summons[2] = null;
  barbWeak[1] = false; barbWeak[2] = false;
  logList.innerHTML = '';
  resultEl.textContent = '— —';
  resultEl.className = 'result';
  overlay.classList.remove('show');
  if (gameMode === 'tournament') {
    battleBtn.textContent = '⏸ ПАУЗА';
    battleBtn.className = 'control-btn stop';
  } else {
    battleBtn.textContent = '▶ НАЧАТЬ БОЙ';
    battleBtn.className = 'control-btn start';
  }
  battleBtn.classList.remove('hidden');
  setDieGlow(null);
  document.getElementById('hpVal1').textContent = MAX_HP;
  document.getElementById('hpVal2').textContent = MAX_HP;
  turn = coinFlip();
  addCoinLog(turn);
  dieEls.forEach(function(el) { renderDie(el, randomDie()); });
  updatePlayersUI();
}

document.getElementById('startGameBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  gameMode = 'quick';
  classes[1] = pendingClasses[1];
  classes[2] = pendingClasses[2];
  selectOverlay.classList.remove('show');
  appEl.classList.add('show');
  matchBanner.style.display = 'none';
  exitBtn.classList.add('hidden');
  resetGame();
});

exitBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  if (gameMode === 'tournament') {
    autoPlay = false;
    clearTimeout(autoTimer);
    appEl.classList.remove('show');
    matchBanner.style.display = 'none';
    exitBtn.classList.add('hidden');
    matchResultOverlay.classList.remove('show');
    simOverlay.classList.remove('show');
    championOverlay.classList.remove('show');
    bracketOverlay.classList.remove('show');
    menuOverlay.classList.add('show');
    gameMode = 'quick';
    tournamentRun = null;
    tournamentGameCallback = null;
    return;
  }
  stopAuto();
  appEl.classList.remove('show');
  menuOverlay.classList.add('show');
});

document.getElementById('toMenuBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  overlay.classList.remove('show');
  appEl.classList.remove('show');
  menuOverlay.classList.add('show');
  gameMode = 'quick';
});
document.getElementById('restartBtn').addEventListener('click', function(e) { e.stopPropagation(); resetGame(); });
document.getElementById('changeClassesBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  overlay.classList.remove('show');
  appEl.classList.remove('show');
  selectOverlay.classList.add('show');
  gameMode = 'quick';
});

document.body.addEventListener('click', function(e) {
  if (!appEl.classList.contains('show')) return;
  if (gameMode !== 'quick') return;
  if (e.target.closest('.log-wrap')) return;
  if (e.target.closest('.controls')) return;
  if (e.target.closest('.speed-box')) return;
  if (e.target.closest('.overlay')) return;
  if (autoPlay || gameOver) return;
  roll();
});
document.body.addEventListener('touchstart', function(e) {
  if (!appEl.classList.contains('show')) return;
  if (gameMode !== 'quick') return;
  if (e.target.closest('.log-wrap')) return;
  if (e.target.closest('.controls')) return;
  if (e.target.closest('.speed-box')) return;
  if (e.target.closest('.overlay')) return;
  e.preventDefault();
  if (autoPlay || gameOver) return;
  roll();
}, { passive: false });

battleBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  if (gameMode === 'tournament') {
    if (autoPlay) {
      autoPlay = false;
      clearTimeout(autoTimer);
      battleBtn.textContent = '▶ ПРОДОЛЖИТЬ';
      battleBtn.className = 'control-btn start';
    } else {
      autoPlay = true;
      battleBtn.textContent = '⏸ ПАУЗА';
      battleBtn.className = 'control-btn stop';
      if (!rolling && !gameOver) roll();
    }
    return;
  }
  if (autoPlay) stopAuto(); else startAuto();
});

speedSlider.addEventListener('input', function(e) {
  e.stopPropagation();
  speed = parseInt(speedSlider.value, 10);
  speedValue.textContent = speed;
});

// ============ ИНИЦИАЛИЗАЦИЯ ============
renderSelectionUI();
dieEls.forEach(function(el) { renderDie(el, randomDie()); });
updatePlayersUI();
