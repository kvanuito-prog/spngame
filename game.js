// ============ ЧАСТИЦЫ ФОНА ============
(function initParticles() {
  var canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var COUNT = Math.min(40, Math.floor(window.innerWidth / 40));
  for (var i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.6 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.15 - Math.random() * 0.35,
      a: 0.2 + Math.random() * 0.5,
      hue: Math.random() < 0.5 ? 160 : 220
    });
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + p.hue + ', 80%, 70%, ' + p.a + ')';
      ctx.shadowColor = 'hsla(' + p.hue + ', 80%, 60%, 1)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

// ============ ВСПЛЫВАЮЩИЙ УРОН ============
function showFloatingDamage(playerNum, value, type) {
  var card = document.getElementById('p' + playerNum);
  if (!card) return;
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

var classes = { 1: 'assassin', 2: 'barbarian' };
var pendingClasses = { 1: 'assassin', 2: 'barbarian' };

var dieEls = [document.getElementById('die1'), document.getElementById('die2')];
var resultEl = document.getElementById('result');
var logList = document.getElementById('logList');
var hintEl = document.getElementById('hint');
var overlay = document.getElementById('overlay');
var overlayTitle = document.getElementById('overlayTitle');
var overlaySub = document.getElementById('overlaySub');
var battleBtn = document.getElementById('battleBtn');
var speedSlider = document.getElementById('speedSlider');
var speedValue = document.getElementById('speedValue');
var selectOverlay = document.getElementById('selectOverlay');
var testOverlay = document.getElementById('testOverlay');
var testResultBody = document.getElementById('testResultBody');
var testSub = document.getElementById('testSub');

var MAX_HP = 1000;
var MAX_LOG = 80;
var speed = 4;

function getSpinDuration()  { return Math.max(70, 900 / speed); }
function getPauseBetween()  { return Math.max(8,  120 / speed); }
function getStunPause()     { return Math.max(150, 1200 / speed); }
function getCritPause()     { return Math.max(80, 500 / speed); }
function getFrameInterval() { return Math.max(16, getSpinDuration() / 5); }

var rolling = false, rollNumber = 0, turn = 1;
var hp1 = MAX_HP, hp2 = MAX_HP;
var gameOver = false;
var stunned = { 1: false, 2: false };
var jokerBuff = { 1: 0, 2: 0 };
var summons = { 1: null, 2: null };
var barbWeak = { 1: false, 2: false };
var autoPlay = false, autoTimer = null;

var pipPositions = {
  1: [4], 2: [0, 8], 3: [0, 4, 8],
  4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8]
};

function coinFlip() { return Math.random() < 0.5 ? 1 : 2; }

function isBeautiful(n) {
  if (n <= 0) return false;
  var s = String(n);
  if (s.length < 2) return false;
  for (var i = 1; i < s.length; i++) if (s[i] !== s[0]) return false;
  return true;
}
function isRound(n) {
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

// ============ СИМУЛЯЦИЯ ============
function simulateBattle(c1, c2) {
  var h1 = MAX_HP, h2 = MAX_HP;
  var t = coinFlip();
  var st = { 1: false, 2: false };
  var jb = { 1: 0, 2: 0 };
  var sm = { 1: null, 2: null };
  var weak = { 1: false, 2: false };
  var MAX_TURNS = 500;

  function r6() { return 1 + Math.floor(Math.random() * 6); }
  function beautiful(n) {
    if (n <= 0) return false;
    var s = '' + n;
    if (s.length < 2) return false;
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
    if (beautiful(h1) || beautiful(h2)) {
      if (JOKER_BEAUTIFUL_MULT > cur) jb[p] = JOKER_BEAUTIFUL_MULT;
    } else if (round(h1) || round(h2)) {
      if (JOKER_ROUND_MULT > cur) jb[p] = JOKER_ROUND_MULT;
    }
  }

  for (var t_i = 0; t_i < MAX_TURNS; t_i++) {
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
      if (db) {
        stunCause = true;
        weak[a] = true;
      }
      if (weak[a]) {
        dmg = Math.floor(base * BARB_WEAK_MULT);
        weak[a] = false;
      }
    } else if (cls === 'vampire' && db) {
      var b1 = r6(), b2 = r6();
      dmg = b1 * 10 + b2;
      heal = dmg;
    } else if (cls === 'joker') {
      if (jb[a] > 0) {
        dmg = Math.round(base * jb[a]);
        jb[a] = 0;
      }
    } else if (cls === 'berserker') {
      var myHp = a === 1 ? h1 : h2;
      dmg = base + bers(myHp);
    } else if (cls === 'druid') {
      if (sm[a]) {
        dmg = Math.floor(base * sm[a].mult);
        if (sm[a].canStun && db) stunCause = true;
      } else if (db) {
        var info = SUMMON_TABLE[base];
        if (info) {
          sm[a] = { hp: info.hp, mult: info.mult, canStun: info.canStun };
          dmg = 0;
        }
      }
    }

    if (dmg > 0) {
      var s = sm[d];
      if (s) {
        if (dmg >= s.hp) {
          var ov = dmg - s.hp;
          sm[d] = null;
          if (d === 1) h1 = Math.max(0, h1 - ov);
          else h2 = Math.max(0, h2 - ov);
        } else {
          s.hp -= dmg;
        }
      } else {
        if (d === 1) h1 = Math.max(0, h1 - dmg);
        else h2 = Math.max(0, h2 - dmg);
      }
    }
    if (heal > 0) {
      if (a === 1) h1 = Math.min(MAX_HP, h1 + heal);
      else h2 = Math.min(MAX_HP, h2 + heal);
    }
    applyJoker(1);
    applyJoker(2);
    if (stunCause) st[d] = true;

    t = d;
  }
  return 0;
}

function runBalanceTest() {
  var N = 100000;
  testSub.textContent = '100 000 боёв на пару · 1 500 000 боёв всего';
  testResultBody.innerHTML = '<div class="test-loading">⏳ Выполняется 1 500 000 боёв...<br>Это займёт 20–60 секунд, подожди.</div>';
  testOverlay.classList.add('show');

  setTimeout(function() {
    var C = Object.keys(CLASSES);
    var R = {};
    C.forEach(function(c) { R[c] = { w: 0, l: 0, d: 0 }; });

    var matrix = {};
    C.forEach(function(a) { matrix[a] = {}; });

    for (var i = 0; i < C.length; i++) {
      for (var j = i + 1; j < C.length; j++) {
        var a = C[i], b = C[j];
        var aWins = 0, bWins = 0, draws = 0;

        for (var n = 0; n < N; n++) {
          var r = simulateBattle(a, b);
          if (r === 1) { aWins++; R[a].w++; R[b].l++; }
          else if (r === 2) { bWins++; R[b].w++; R[a].l++; }
          else { draws++; R[a].d++; R[b].d++; }
        }

        var total = aWins + bWins;
        var aWR = total > 0 ? aWins / total * 100 : 50;
        var bWR = total > 0 ? bWins / total * 100 : 50;
        matrix[a][b] = aWR;
        matrix[b][a] = bWR;
      }
    }

    var sorted = C.map(function(c) {
      var r = R[c];
      var total = r.w + r.l + r.d;
      return { cls: c, w: r.w, l: r.l, d: r.d, wr: r.w / total * 100 };
    }).sort(function(a, b) { return b.wr - a.wr; });

    var html = '<table class="test-table"><thead><tr>' +
      '<th>#</th><th>Класс</th><th>W</th><th>L</th><th>D</th><th>WR</th>' +
      '</tr></thead><tbody>';

    sorted.forEach(function(row, idx) {
      var c = CLASSES[row.cls];
      var wrClass = row.wr >= 52 ? 'wr-good' : (row.wr >= 49 ? 'wr-mid' : 'wr-bad');
      var rankClass = idx === 0 ? 'rank-1' : idx === 1 ? 'rank-2' : idx === 2 ? 'rank-3' : '';
      html += '<tr class="' + rankClass + '">' +
        '<td>' + (idx + 1) + '</td>' +
        '<td class="cls-cell">' + c.icon + ' ' + c.short + '</td>' +
        '<td>' + row.w + '</td>' +
        '<td>' + row.l + '</td>' +
        '<td>' + row.d + '</td>' +
        '<td class="wr-cell ' + wrClass + '">' + row.wr.toFixed(1) + '%</td>' +
        '</tr>';
    });

    html += '</tbody></table>';

    html += '<div class="matrix-title">Класс против класса</div>';
    html += '<div class="matrix-scroll"><table class="matrix-table"><thead><tr><th></th>';
    C.forEach(function(c) {
      html += '<th>' + CLASSES[c].icon + '</th>';
    });
    html += '</tr></thead><tbody>';

    C.forEach(function(row) {
      html += '<tr><th class="row-label">' + CLASSES[row].icon + ' ' + CLASSES[row].short + '</th>';
      C.forEach(function(col) {
        if (row === col) {
          html += '<td class="diag">—</td>';
        } else {
          var wr = matrix[row][col];
          var cls = wr >= 55 ? 'm-high' : (wr >= 45 ? 'm-mid' : 'm-low');
          html += '<td class="' + cls + '">' + wr.toFixed(1) + '</td>';
        }
      });
      html += '</tr>';
    });

    html += '</tbody></table></div>';

    testResultBody.innerHTML = html;
  }, 100);
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
    Object.keys(CLASSES).forEach(function(key) {
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

function openSelection() {
  pendingClasses[1] = classes[1];
  pendingClasses[2] = classes[2];
  renderSelectionUI();
  selectOverlay.classList.add('show');
}

function startGameFromSelection() {
  classes[1] = pendingClasses[1];
  classes[2] = pendingClasses[2];
  selectOverlay.classList.remove('show');
  resetGame();
}

function updateSummonUI(p) {
  var s = summons[p];
  var el = document.getElementById('summon' + p);
  if (s) {
    el.classList.add('show');
    document.getElementById('summonIcon' + p).textContent = s.icon;
    document.getElementById('summonName' + p).textContent = s.name;
    document.getElementById('summonHp' + p).textContent = s.hp + '/' + s.maxHp;
  } else {
    el.classList.remove('show');
  }
}

function updateRageBadge(p) {
  var el = document.getElementById('p' + p);
  var badge = document.getElementById('rage' + p);
  if (classes[p] === 'berserker' && !gameOver && hp1 > 0 && hp2 > 0) {
    var bonus = getBerserkerBonus(getPlayerHp(p));
    if (bonus > 0) {
      el.classList.add('has-rage');
      badge.textContent = '🩸 +' + bonus;
      if (bonus >= 70) el.classList.add('rage-max');
      else el.classList.remove('rage-max');
    } else {
      el.classList.remove('has-rage');
      el.classList.remove('rage-max');
    }
  } else {
    el.classList.remove('has-rage');
    el.classList.remove('rage-max');
  }
}

function updateJokerBadge(p) {
  var el = document.getElementById('p' + p);
  var badge = document.getElementById('buff' + p);
  if (classes[p] === 'joker' && !gameOver && jokerBuff[p] > 0) {
    el.classList.add('has-buff');
    if (jokerBuff[p] === JOKER_BEAUTIFUL_MULT) {
      badge.textContent = '🎲 x' + JOKER_BEAUTIFUL_MULT;
      badge.className = 'buff-badge tier3';
    } else {
      badge.textContent = '🎲 x' + JOKER_ROUND_MULT;
      badge.className = 'buff-badge tier15';
    }
  } else {
    el.classList.remove('has-buff');
  }
}

function updateWeakBadge(p) {
  var el = document.getElementById('p' + p);
  if (barbWeak[p] && !gameOver && hp1 > 0 && hp2 > 0) {
    el.classList.add('has-weak');
  } else {
    el.classList.remove('has-weak');
  }
}

function updatePlayersUI() {
  document.getElementById('hpVal1').textContent = hp1;
  document.getElementById('hpVal2').textContent = hp2;
  var fill1 = document.getElementById('hpFill1');
  var fill2 = document.getElementById('hpFill2');
  fill1.style.width = (hp1 / MAX_HP * 100) + '%';
  fill2.style.width = (hp2 / MAX_HP * 100) + '%';
  fill1.className = 'hp-fill' + (hp1 / MAX_HP < 0.3 ? ' low' : '');
  fill2.className = 'hp-fill' + (hp2 / MAX_HP < 0.3 ? ' low' : '');

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
  p1.className = cls1;
  p2.className = cls2;

  updateJokerBadge(1);
  updateJokerBadge(2);
  updateRageBadge(1);
  updateRageBadge(2);
  updateWeakBadge(1);
  updateWeakBadge(2);
  updateSummonUI(1);
  updateSummonUI(2);
}

function setHint(text) { hintEl.textContent = text; }

function addLogEntry(number, attacker, dmg, isDouble, stunCaused, isCrit, heal, jokerMult, summonInfo, rageBonus, isWeak) {
  var entry = document.createElement('div');
  var extraClass = '';
  if (isWeak) extraClass = ' weak';
  else if (isCrit) extraClass = ' crit';
  else if (heal) extraClass = ' vampire';
  else if (jokerMult === JOKER_BEAUTIFUL_MULT) extraClass = ' joker';
  else if (jokerMult === JOKER_ROUND_MULT) extraClass = ' joker15';
  else if (rageBonus > 0) extraClass = ' rage';
  else if (summonInfo) extraClass = ' summon-attack';
  else if (isDouble) extraClass = ' double';
  entry.className = 'log-entry' + extraClass;

  var idx = document.createElement('span'); idx.className = 'idx'; idx.textContent = '#' + number;
  var who = document.createElement('span'); who.className = 'who p' + attacker;
  who.textContent = summonInfo ? summonInfo.icon + ' И' + attacker : 'Игрок ' + attacker;
  var dmgEl = document.createElement('span'); dmgEl.className = 'dmg';

  var suffix = '';
  if (isWeak) suffix = ' 💜 −20%';
  else if (isCrit) suffix = ' 💥 КРИТ×1.9';
  else if (jokerMult === JOKER_BEAUTIFUL_MULT) suffix = ' 🎲×' + JOKER_BEAUTIFUL_MULT;
  else if (jokerMult === JOKER_ROUND_MULT) suffix = ' 🎲×' + JOKER_ROUND_MULT;
  else if (heal) suffix = ' 🧛 +' + heal;
  if (rageBonus > 0) suffix += ' 🩸+' + rageBonus;
  if (stunCaused) suffix += ' ⚡';
  dmgEl.textContent = '−' + dmg + suffix;

  entry.appendChild(idx); entry.appendChild(who); entry.appendChild(dmgEl);
  logList.insertBefore(entry, logList.firstChild);
  trimLog();
}

function addStunSkipLog(playerNum) {
  var entry = document.createElement('div');
  entry.className = 'log-entry stun';
  var idx = document.createElement('span'); idx.className = 'idx'; idx.textContent = '⚡';
  var who = document.createElement('span'); who.className = 'who'; who.textContent = 'Игрок ' + playerNum + ' оглушён';
  var dmgEl = document.createElement('span'); dmgEl.className = 'dmg'; dmgEl.textContent = 'ПРОПУСК';
  entry.appendChild(idx); entry.appendChild(who); entry.appendChild(dmgEl);
  logList.insertBefore(entry, logList.firstChild); trimLog();
}

function addCoinLog(firstPlayer) {
  var entry = document.createElement('div');
  entry.className = 'log-entry coin';
  var who = document.createElement('span'); who.className = 'who';
  var coinName = firstPlayer === 1 ? 'Орёл' : 'Решка';
  who.textContent = '🪙 ' + coinName + ' — первым ходит Игрок ' + firstPlayer;
  entry.appendChild(who);
  logList.insertBefore(entry, logList.firstChild); trimLog();
}

function addJokerBuffLog(p, mult) {
  var entry = document.createElement('div');
  entry.className = 'log-entry ' + (mult === JOKER_BEAUTIFUL_MULT ? 'buff' : 'buff15');
  var idx = document.createElement('span'); idx.className = 'idx'; idx.textContent = '🎲';
  var who = document.createElement('span'); who.className = 'who'; who.textContent = 'Джокер Игрок ' + p;
  var dmgEl = document.createElement('span'); dmgEl.className = 'dmg';
  dmgEl.textContent = '×' + mult + ' ГОТОВ';
  entry.appendChild(idx); entry.appendChild(who); entry.appendChild(dmgEl);
  logList.insertBefore(entry, logList.firstChild); trimLog();
}
function addSummonLog(p, info) {
  var entry = document.createElement('div'); entry.className = 'log-entry summon';
  var idx = document.createElement('span'); idx.className = 'idx'; idx.textContent = '✨';
  var who = document.createElement('span'); who.className = 'who p' + p; who.textContent = 'И' + p + ' призвал';
  var dmgEl = document.createElement('span'); dmgEl.className = 'dmg';
  dmgEl.textContent = info.icon + ' ' + info.name + ' · ' + info.hp + ' HP';
  entry.appendChild(idx); entry.appendChild(who); entry.appendChild(dmgEl);
  logList.insertBefore(entry, logList.firstChild); trimLog();
}
function addSummonDeathLog(defender, killed, overflow) {
  var entry = document.createElement('div'); entry.className = 'log-entry summon-death';
  var idx = document.createElement('span'); idx.className = 'idx'; idx.textContent = '💀';
  var who = document.createElement('span'); who.className = 'who';
  who.textContent = killed.icon + ' ' + killed.name + ' И' + defender + ' погиб';
  var dmgEl = document.createElement('span'); dmgEl.className = 'dmg';
  dmgEl.textContent = overflow > 0 ? overflow + ' → И' + defender : '';
  entry.appendChild(idx); entry.appendChild(who); entry.appendChild(dmgEl);
  logList.insertBefore(entry, logList.firstChild); trimLog();
}
function trimLog() { while (logList.children.length > MAX_LOG) logList.removeChild(logList.lastChild); }

function checkJokerBuffs() {
  [1, 2].forEach(function(p) {
    if (classes[p] !== 'joker') return;
    var cur = jokerBuff[p];
    var newBuff = 0;
    if (isBeautiful(hp1) || isBeautiful(hp2)) newBuff = JOKER_BEAUTIFUL_MULT;
    else if (isRound(hp1) || isRound(hp2)) newBuff = JOKER_ROUND_MULT;
    if (newBuff > cur) {
      jokerBuff[p] = newBuff;
      addJokerBuffLog(p, newBuff);
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
      if (defender === 1) hp1 = Math.max(0, hp1 - ov);
      else hp2 = Math.max(0, hp2 - ov);
      return { toSummon: s.hp, toPlayer: ov, summonDied: true, killed: killed };
    } else {
      s.hp -= dmg;
      return { toSummon: dmg, toPlayer: 0, summonDied: false, killed: null };
    }
  }
  if (defender === 1) hp1 = Math.max(0, hp1 - dmg);
  else hp2 = Math.max(0, hp2 - dmg);
  return { toSummon: 0, toPlayer: dmg, summonDied: false, killed: null };
}

function spinDice(callback) {
  dieEls.forEach(function(el) { el.classList.add('spinning'); });
  setDieGlow(null);

  var spinDuration = getSpinDuration();
  var frameInterval = getFrameInterval();
  var start = performance.now();

  var timer = setInterval(function() {
    dieEls.forEach(function(el) { renderDie(el, randomDie()); });
    if (performance.now() - start >= spinDuration) {
      clearInterval(timer);
      var v1 = randomDie(), v2 = randomDie();
      renderDie(dieEls[0], v1);
      renderDie(dieEls[1], v2);
      dieEls.forEach(function(el) { el.classList.remove('spinning'); });
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

    resultEl.textContent = String(baseDmg);
    resultEl.className = 'result' + (isDouble ? ' double' : (attacker === 2 ? ' p2' : ''));

    if (cls === 'druid') {
      if (summons[attacker]) {
        var s = summons[attacker];
        var sd = Math.floor(baseDmg * s.mult);
        var stunB = s.canStun && isDouble;
        resultEl.textContent = String(sd);
        resultEl.className = 'result summon';
        setDieGlow('summon');
        setTimeout(function() { setDieGlow(null); }, 600);
        setHint(s.icon + ' ' + s.name + ' атакует!');
        applyHit(attacker, defender, sd, isDouble, stunB, false, 0, 0, { icon: s.icon, name: s.name }, 0, false);
        return;
      }
      if (isDouble) {
        var info = SUMMON_TABLE[baseDmg];
        if (info) {
          summons[attacker] = { type: info.type, name: info.name, icon: info.icon, hp: info.hp, maxHp: info.hp, mult: info.mult, canStun: info.canStun };
          setHint(info.icon + ' Призыв: ' + info.name + '!');
          addSummonLog(attacker, info);
          rollNumber++;
          updatePlayersUI();
          finishTurnAfterAction(attacker, defender, 0);
          return;
        }
      }
      applyHit(attacker, defender, baseDmg, isDouble, false, false, 0, 0, null, 0, false);
      return;
    }

    if (cls === 'assassin' && isDouble) {
      setHint('🗡 Дубль! Переброс на крит...');
      setTimeout(function() {
        spinDice(function(r1, r2) {
          var critDmg = Math.round((r1 * 10 + r2) * ASSASSIN_CRIT);
          resultEl.textContent = critDmg + '';
          resultEl.className = 'result crit';
          setDieGlow('crit');
          setTimeout(function() { setDieGlow(null); }, 600);
          applyHit(attacker, defender, critDmg, false, false, true, 0, 0, null, 0, false);
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
          setDieGlow('vampire');
          setTimeout(function() { setDieGlow(null); }, 600);
          applyHit(attacker, defender, bite, false, false, false, bite, 0, null, 0, false);
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
    }

    var rageBonus = 0;
    if (cls === 'berserker') {
      rageBonus = getBerserkerBonus(getPlayerHp(attacker));
      if (rageBonus > 0) {
        dmg = baseDmg + rageBonus;
        resultEl.textContent = dmg + '';
        resultEl.className = 'result rage';
        setDieGlow('rage');
        setTimeout(function() { setDieGlow(null); }, 600);
        setHint('🔥 Ярость +' + rageBonus + '!');
      }
    }

    var stunCaused = false;
    var isWeak = false;
    if (cls === 'barbarian') {
      if (barbWeak[attacker]) {
        dmg = Math.floor(dmg * BARB_WEAK_MULT);
        isWeak = true;
        barbWeak[attacker] = false;
        resultEl.textContent = dmg + '';
        resultEl.className = 'result weak';
        setHint('💜 Удар ослаблен на 20%');
      }
      if (isDouble && hp1 > 0 && hp2 > 0) {
        stunned[defender] = true;
        stunCaused = true;
        barbWeak[attacker] = true;
      }
    }

    applyHit(attacker, defender, dmg, isDouble, stunCaused, false, 0, jokerMult, null, rageBonus, isWeak);
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
    setHint('⚡ Игрок ' + skip + ' оглушён!');
    addStunSkipLog(skip);
    delay += sp;
    setTimeout(function() {
      stunned[skip] = false;
      turn = skip === 1 ? 2 : 1;
      updatePlayersUI();
      if (!autoPlay) setHint('Тап — бросок Игрока ' + turn);
    }, sp);
  } else if (!autoPlay) {
    setHint('Тап — бросок Игрока ' + turn);
  }

  rolling = false;
  if (autoPlay) {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(function() { if (autoPlay && !gameOver) roll(); }, getPauseBetween() + delay);
  }
}

function applyHit(attacker, defender, dmg, isDouble, stunCaused, isCrit, heal, jokerMult, summonInfo, rageBonus, isWeak) {
  rollNumber++;
  var dr = dealDamage(defender, dmg);

  var floatType = '';
  if (isCrit) floatType = 'crit';
  else if (isWeak) floatType = 'weak';
  showFloatingDamage(defender, dmg, floatType);

  if (heal > 0) {
    setTimeout(function() { showFloatingDamage(attacker, heal, 'heal'); }, 150);
  }

  addLogEntry(rollNumber, attacker, dmg, isDouble, stunCaused, isCrit, heal, jokerMult, summonInfo, rageBonus, isWeak);
  if (dr.summonDied) addSummonDeathLog(defender, dr.killed, dr.toPlayer);
  if (heal > 0) {
    if (attacker === 1) hp1 = Math.min(MAX_HP, hp1 + heal);
    else hp2 = Math.min(MAX_HP, hp2 + heal);
  }
  finishTurnAfterAction(attacker, defender, 0);
}

function showGameOver() {
  var winner = hp1 <= 0 ? 2 : 1;
  overlayTitle.textContent = 'Игрок ' + winner + ' победил!';
  overlayTitle.style.color = winner === 1 ? '#4ade80' : '#60a5fa';
  overlaySub.textContent = CLASSES[classes[1]].label + ': ' + hp1 + ' HP  ·  ' + CLASSES[classes[2]].label + ': ' + hp2 + ' HP  ·  ' + speed + '×';
  overlay.classList.add('show');
  setHint('Игра окончена');
  battleBtn.classList.add('hidden');
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
  battleBtn.textContent = '▶ НАЧАТЬ БОЙ';
  battleBtn.className = 'control-btn start';
  battleBtn.classList.remove('hidden');
  setDieGlow(null);

  turn = coinFlip();
  addCoinLog(turn);

  dieEls.forEach(function(el) { renderDie(el, randomDie()); });
  updatePlayersUI();
  setHint('Тап — бросок Игрока ' + turn);
}

document.body.addEventListener('click', function(e) {
  if (e.target.closest('.log-wrap')) return;
  if (e.target.closest('.controls')) return;
  if (e.target.closest('.speed-box')) return;
  if (e.target.closest('.overlay')) return;
  if (autoPlay || gameOver) return;
  roll();
});
document.body.addEventListener('touchstart', function(e) {
  if (e.target.closest('.log-wrap')) return;
  if (e.target.closest('.controls')) return;
  if (e.target.closest('.speed-box')) return;
  if (e.target.closest('.overlay')) return;
  e.preventDefault();
  if (autoPlay || gameOver) return;
  roll();
}, { passive: false });

battleBtn.addEventListener('click', function(e) { e.stopPropagation(); if (autoPlay) stopAuto(); else startAuto(); });
speedSlider.addEventListener('input', function(e) {
  e.stopPropagation();
  speed = parseInt(speedSlider.value, 10);
  speedValue.textContent = speed;
  if (autoPlay) setHint('⚔ Бой идёт... (' + speed + '×)');
});
speedSlider.addEventListener('click', function(e) { e.stopPropagation(); });
speedSlider.addEventListener('touchstart', function(e) { e.stopPropagation(); }, { passive: true });
speedSlider.addEventListener('touchend', function(e) { e.stopPropagation(); });

document.getElementById('restartBtn').addEventListener('click', function(e) { e.stopPropagation(); resetGame(); });
document.getElementById('changeClassesBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  overlay.classList.remove('show');
  openSelection();
});
document.getElementById('startGameBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  startGameFromSelection();
});
document.getElementById('testBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  runBalanceTest();
});
document.getElementById('testCloseBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  testOverlay.classList.remove('show');
});

renderSelectionUI();
dieEls.forEach(function(el) { renderDie(el, randomDie()); });
updatePlayersUI();
