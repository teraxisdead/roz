'use strict';
/* ===== helpers ===== */
var $ = function (i) { return document.getElementById(i); }, R = Math.round;
function p2(n) { return (n < 10 ? '0' : '') + n; }
function ds(d) { return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()); }
function pd(s) { return new Date(s + 'T00:00:00'); }
function ad(s, n) { var d = pd(s); d.setDate(d.getDate() + n); return ds(d); }
function dd(a, b) { return Math.round((pd(b) - pd(a)) / 864e5); }
function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function wdn(s) { return pd(s).toLocaleDateString('en-IN', { weekday: 'long' }); }
function dfull(s) { return pd(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
function hm(m) { return Math.floor(m / 60) + 'h ' + (m % 60) + 'm'; }
function fmt(s) { return p2(Math.floor(s / 3600)) + ':' + p2(Math.floor(s % 3600 / 60)) + ':' + p2(s % 60); }
function r1(x) { return Math.round(x * 10) / 10; }
function hs(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
var TODAY = ds(new Date());

var IC = {
  home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  food: 'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2 M7 2v20 M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  dumbbell: 'M6.5 6.5v11 M17.5 6.5v11 M3.5 9v6 M20.5 9v6 M6.5 12h11',
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
  bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
  moon: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  sun: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42',
  plus: 'M12 5v14 M5 12h14',
  camera: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  mic: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8',
  pencil: 'M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z',
  trash: 'M3 6h18 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6 M10 11v6 M14 11v6 M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2',
  x: 'M18 6L6 18 M6 6l12 12',
  cal: 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M16 2v4 M8 2v4 M3 10h18',
  left: 'M15 18l-6-6 6-6',
  right: 'M9 18l6-6-6-6',
  play: 'M5 3l14 9-14 9z',
  stop: 'M6 6h12v12H6z',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2',
  flame: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z',
  wallet: 'M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 1 0-4h14v4 M3 5v14a2 2 0 0 0 2 2h16v-5 M18 12a2 2 0 0 0 0 4h4v-4z',
  pulse: 'M22 12h-4l-3 9L9 3l-3 9H2',
  bed: 'M2 4v16 M2 8h18a2 2 0 0 1 2 2v10 M2 17h20 M6 8v9',
  trophy: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 0 0 12 0V2z',
  sliders: 'M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6',
  umbrella: 'M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7',
  refresh: 'M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
  back: 'M19 12H5 M12 19l-7-7 7-7',
  drop: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z',
  alert: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01',
  chart: 'M18 20V10 M12 20V4 M6 20v-6',
  check: 'M20 6L9 17l-5-5'
};
function ic(n, s) { return '<svg class="i" viewBox="0 0 24 24"' + (s ? ' style="width:' + s + 'px;height:' + s + 'px"' : '') + '><path d="' + IC[n] + '"/></svg>'; }

/* ===== data ===== */
var KEY = 'roz-data-v1';
var D = { food: [], study: [], work: [], exp: [], sleep: [], wts: [], off: {}, budget: 5000, lang: 'Random', wint: 2, dark: 0, sleeping: 0, focus: null, gkey: '', gmodel: 'gemini-2.5-flash', lastWater: 0, lastWt: '', g: { cal: 2000, study: 5, work: 45, sleep: 8 } };
function load() { try { var j = JSON.parse(localStorage.getItem(KEY)); if (j) { for (var k in j) D[k] = j[k]; } } catch (e) { } if (!D.g) D.g = { cal: 2000, study: 5, work: 45, sleep: 8 }; }
function persist() { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) { } }
load();
var U = { tab: 'home', sub: '', date: TODAY, cal: 0, cy: 0, cm: 0, fsum: 0, offOpen: 0, ofr: 'Travel', wr: 30, rep: 'Week', wtype: 'Gym', msub: '', edit: '', err: '', q: '', cfl: [], ip: null };
var TI = null, WL = null, TT = null;

/* ===== quotes ===== */
var Q = {
  Hinglish: ['Aaj ka kaam kal pe mat chhodo, bas shuru karo.', 'Chhote steps bhi manzil tak le jaate hain.', 'Motivation aata-jaata hai, discipline tikta hai.', 'Thoda thoda roz, bada result ek din.', 'Jo aaj mehnat karega, kal usi ka din hoga.', 'Bas 10 minute shuru karo, baaki apne aap ho jayega.', 'Thak jao to ruk jao thodi der, par chhodna mat.', 'Aaj ki padhai kal ka confidence hai.', 'Perfect hone ka wait mat karo, roz thoda behtar bano.', 'Streak tootne mat do, ek chhota session bhi chalega.', 'Body ko bolo: tu kar sakta hai, bas aaj ka session pura kar.', 'Sapne bade hain to sone se pehle thoda aur padh lo.'],
  English: ['Small daily habits build big results.', 'Show up today. That is the whole secret.', 'Consistency beats intensity.', 'You do not have to be extreme, just consistent.', 'Discipline is choosing what you want most over what you want now.', 'One more rep, one more page, one more day.', 'Progress, not perfection.', 'Your future self is watching what you do today.', 'Start where you are. Use what you have. Do what you can.', 'Motivation gets you started. Habit keeps you going.'],
  Hindi: ['लगातार मेहनत ही सफलता की चाबी है।', 'आज की मेहनत कल की पहचान बनेगी।', 'छोटा कदम भी आगे ही ले जाता है।', 'जो रोज़ थोड़ा-थोड़ा करता है, वही एक दिन बड़ा करता है।', 'हार मत मानो, कल का दिन तुम्हारा है।', 'अनुशासन ही सफलता का असली रास्ता है।', 'आज का पसीना कल की मुस्कान बनेगा।', 'शुरुआत करो, बाकी रास्ता खुद बन जाएगा।', 'आलस्य छोड़ो, आज ही शुरू करो।', 'धीरे चलो, पर रुको मत।']
};
function pickQ(rand) {
  var ls = ['Hinglish', 'English', 'Hindi'];
  var l = D.lang === 'Random' ? ls[rand ? Math.floor(Math.random() * 3) : hs(TODAY) % 3] : D.lang;
  var a = Q[l] || Q.Hinglish;
  U.q = a[rand ? Math.floor(Math.random() * a.length) : hs(TODAY + l) % a.length];
}

/* ===== foods ===== */
var FOODS = [
  [['roti', 'chapati', 'chapatti', 'phulka', 'रोटी', 'चपाती'], [100, 3, 18, 3]],
  [['paratha', 'parantha', 'पराठा'], [260, 6, 36, 10]],
  [['naan'], [260, 8, 45, 5]],
  [['puri', 'poori', 'पूरी'], [100, 2, 12, 5]],
  [['bhatura', 'bhature'], [250, 6, 35, 10]],
  [['thepla'], [110, 3, 16, 4]],
  [['rice', 'chawal', 'chaawal', 'चावल'], [200, 4, 44, 0.5]],
  [['biryani', 'बिरयानी'], [350, 12, 50, 12]],
  [['khichdi', 'khichadi', 'खिचड़ी'], [160, 6, 28, 3]],
  [['dal', 'daal', 'दाल'], [130, 7, 20, 3]],
  [['rajma', 'राजमा'], [150, 8, 22, 3]],
  [['chole', 'chhole', 'छोले'], [180, 8, 25, 6]],
  [['paneer sabzi', 'paneer curry'], [250, 12, 8, 18]],
  [['paneer', 'पनीर'], [265, 18, 4, 20]],
  [['aloo sabzi', 'aloo'], [130, 2, 18, 6]],
  [['sabzi', 'sabji', 'subzi', 'सब्जी', 'सब्ज़ी'], [90, 2, 10, 5]],
  [['egg', 'anda', 'अंडा', 'अंडे'], [78, 6, 1, 5]],
  [['omelette', 'omelet'], [150, 10, 1, 11]],
  [['chicken', 'चिकन'], [165, 31, 0, 4]],
  [['fish', 'machli'], [140, 22, 0, 5]],
  [['curd', 'dahi', 'yogurt', 'दही'], [100, 6, 8, 5]],
  [['milk', 'doodh', 'dudh', 'दूध'], [120, 6, 10, 6]],
  [['lassi', 'लस्सी'], [150, 5, 20, 5]],
  [['chaas', 'buttermilk', 'छाछ'], [40, 2, 5, 1]],
  [['chai', 'tea', 'चाय'], [60, 2, 9, 2]],
  [['coffee', 'कॉफी', 'कॉफ़ी'], [50, 1, 6, 2]],
  [['banana', 'kela', 'केला'], [105, 1, 27, 0]],
  [['apple', 'seb', 'सेब'], [95, 0, 25, 0]],
  [['orange', 'santra', 'संतरा'], [62, 1, 15, 0]],
  [['mango', 'aam', 'आम'], [150, 1, 35, 1]],
  [['papaya', 'papita', 'पपीता'], [60, 1, 15, 0]],
  [['grapes', 'angoor', 'अंगूर'], [100, 1, 27, 0]],
  [['samosa', 'समोसा'], [260, 4, 24, 17]],
  [['pakora', 'pakoda', 'bhajiya', 'पकोड़ा'], [50, 1, 5, 3]],
  [['poha', 'पोहा'], [250, 5, 45, 6]],
  [['upma'], [230, 5, 35, 8]],
  [['idli', 'इडली'], [60, 2, 12, 0.4]],
  [['dosa', 'डोसा'], [170, 4, 28, 5]],
  [['uttapam', 'uthappam'], [200, 5, 32, 6]],
  [['sambar', 'सांभर'], [90, 4, 13, 2]],
  [['dhokla'], [60, 2, 9, 2]],
  [['maggi', 'noodles', 'मैगी'], [350, 8, 48, 14]],
  [['chowmein', 'chow mein'], [400, 10, 60, 13]],
  [['momos', 'momo', 'मोमोज'], [45, 2, 6, 1.5]],
  [['pav bhaji', 'pavbhaji'], [400, 9, 55, 16]],
  [['vada pav', 'vadapav'], [290, 6, 40, 12]],
  [['pizza', 'पिज़्ज़ा'], [285, 12, 36, 10]],
  [['burger', 'बर्गर'], [295, 17, 30, 14]],
  [['sandwich', 'सैंडविच'], [250, 9, 30, 10]],
  [['bread', 'brown bread', 'ब्रेड'], [80, 3, 14, 1]],
  [['biscuit', 'biscuits', 'बिस्कुट'], [50, 1, 8, 2]],
  [['butter', 'makhan', 'मक्खन'], [35, 0, 0, 4]],
  [['ghee', 'घी'], [45, 0, 0, 5]],
  [['oats', 'ओट्स'], [150, 5, 27, 3]],
  [['cornflakes', 'corn flakes'], [150, 3, 33, 0.5]],
  [['peanuts', 'peanut', 'moongfali', 'मूंगफली'], [160, 7, 5, 14]],
  [['almonds', 'almond', 'badam', 'बादाम'], [35, 1, 1, 3]],
  [['salad', 'सलाद'], [40, 2, 8, 0]],
  [['soup', 'सूप'], [90, 3, 12, 3]],
  [['kheer', 'खीर'], [220, 6, 32, 8]],
  [['gulab jamun', 'gulabjamun'], [150, 2, 22, 6]],
  [['jalebi', 'जलेबी'], [150, 1, 30, 4]],
  [['ice cream', 'icecream', 'आइसक्रीम'], [140, 2, 17, 7]],
  [['cold drink', 'coke', 'pepsi', 'soda', 'कोल्ड ड्रिंक'], [140, 0, 35, 0]],
  [['juice', 'जूस'], [110, 1, 26, 0]],
  [['protein shake', 'whey', 'shake'], [120, 24, 3, 1.5]],
  [['sugar', 'chini', 'चीनी'], [16, 0, 4, 0]]
];
var FM = [];
FOODS.forEach(function (f) { f[0].forEach(function (a) { FM.push({ a: a, v: f[1], n: f[0][0], re: /^[a-z ]+$/.test(a) ? new RegExp('(^|[^a-z])' + a + '(e?s)?(?![a-z])') : null }); }); });
FM.sort(function (x, y) { return y.a.length - x.a.length; });
var NW = { ek: 1, one: 1, do: 2, two: 2, teen: 3, three: 3, char: 4, chaar: 4, four: 4, panch: 5, paanch: 5, five: 5, chhe: 6, che: 6, six: 6, saat: 7, seven: 7, aath: 8, eight: 8, nau: 9, nine: 9, das: 10, ten: 10, aadha: 0.5, half: 0.5, 'एक': 1, 'दो': 2, 'तीन': 3, 'चार': 4, 'पांच': 5, 'पाँच': 5, 'छह': 6, 'छः': 6, 'सात': 7, 'आठ': 8, 'नौ': 9, 'दस': 10, 'आधा': 0.5 };
function parseFood(text) {
  var items = [], unknown = [];
  text.toLowerCase().split(/,|\n|\+|\band\b|\baur\b|और/).forEach(function (p) {
    p = p.trim(); if (!p) return;
    var q = 1, m = p.match(/(\d+(\.\d+)?)/);
    if (m) q = +m[1]; else { p.split(/\s+/).forEach(function (t) { if (NW[t] !== undefined) q = NW[t]; }); }
    var hit = null;
    for (var i = 0; i < FM.length; i++) { var f = FM[i]; if (f.re ? f.re.test(p) : p.indexOf(f.a) > -1) { hit = f; break; } }
    if (hit) items.push({ n: hit.n, q: q, d: hit.v });
    else {
      var nm = p.replace(/\d+(\.\d+)?/g, '').split(/\s+/).filter(function (t) { return NW[t] === undefined; }).join(' ').trim();
      if (nm) unknown.push(nm);
    }
  });
  return { items: items, unknown: unknown };
}

/* ===== queries ===== */
function L(k, d) { return D[k].map(function (x, i) { return { x: x, i: i }; }).filter(function (o) { return o.x.dt === (d || U.date); }); }
function ftd(d) { var t = { k: 0, p: 0, c: 0, f: 0 }; L('food', d).forEach(function (o) { var x = o.x; t.k += x.q * x.d[0]; t.p += x.q * x.d[1]; t.c += x.q * x.d[2]; t.f += x.q * x.d[3]; }); return t; }
function smd(d) { var m = 0; L('study', d).forEach(function (o) { m += o.x.m; }); return m; }
function wmd(d) { var m = 0; L('work', d).forEach(function (o) { m += o.x.m; }); return m; }
function exd(d) { var m = 0; L('exp', d).forEach(function (o) { m += o.x.a; }); return m; }
function slp(d) { var h = 0; L('sleep', d).forEach(function (o) { h = o.x.h; }); return h; }
function wtd(d) { var x = D.wts.filter(function (a) { return a.dt === (d || U.date); })[0]; return x ? x.w : 0; }
function monthSpent(ref) { var k = (ref || U.date).slice(0, 7), e = 0; D.exp.forEach(function (x) { if (x.dt.slice(0, 7) === k) e += x.a; }); return e; }
function weekDays() { var d = pd(U.date), m = ad(U.date, -((d.getDay() + 6) % 7)), a = []; for (var i = 0; i < 7; i++) a.push(ad(m, i)); return a; }
function wlab(a) { return a.map(function (d, i) { return 'MTWTFSS'[i] + '<br>' + pd(d).getDate(); }); }
function active(d) { return smd(d) > 0 || wmd(d) > 0 || !!D.off[d]; }
function streak() { var n = 0, d = TODAY; if (!active(d)) d = ad(d, -1); while (active(d) && n < 3650) { n++; d = ad(d, -1); } return n; }
function firstStudy() { var m = '9999-99-99'; D.study.forEach(function (x) { if (x.dt < m) m = x.dt; }); return m; }
function avgStudy() { var fs = firstStudy(), a = []; for (var i = 1; i <= 14; i++) { var d = ad(TODAY, -i); if (!D.off[d] && d >= fs) a.push(smd(d) / 60); } return a.length ? a.reduce(function (x, y) { return x + y; }, 0) / a.length : 0; }
function subjects() {
  var c = {}; D.study.forEach(function (x) { c[x.s] = (c[x.s] || 0) + 1; });
  var k = Object.keys(c).sort(function (a, b) { return c[b] - c[a]; }).slice(0, 8);
  return k.length ? k : ['Maths', 'Physics', 'Chemistry', 'English'];
}

/* ===== ui builders ===== */
var P = { food: ['#FAECE7', '#712B13', '#993C1D', '#D85A30'], study: ['#E1F5EE', '#085041', '#0F6E56', '#1D9E75'], work: ['#FAEEDA', '#633806', '#854F0B', '#BA7517'], money: ['#E6F1FB', '#0C447C', '#185FA5', '#378ADD'], wt: ['#FBEAF0', '#72243E', '#993556', '#D4537E'], sl: ['#EEEDFE', '#3C3489', '#534AB7', '#7F77DD'] };
function card(k, inner, st) { return '<div class="card" style="background:' + P[k][0] + ';color:' + P[k][1] + ';' + (st || '') + '">' + inner + '</div>'; }
function ring(p, k, val, lab) { return card(k, '<svg width="56" height="56" viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="rgba(0,0,0,.13)" stroke-width="7"/><circle cx="32" cy="32" r="26" fill="none" stroke="' + P[k][3] + '" stroke-width="7" stroke-linecap="round" stroke-dasharray="163.4" stroke-dashoffset="' + R(163.4 * (1 - Math.min(1, p || 0))) + '" transform="rotate(-90 32 32)"/></svg><div><div style="font-size:17px;font-weight:600">' + val + '</div><div style="font-size:12px;color:' + P[k][2] + '">' + lab + '</div></div>', 'display:flex;align-items:center;gap:8px;margin:0'); }
function er() { return U.err ? '<p class="err">' + U.err + '</p>' : ''; }
function bars(a, k, lab, f) { var mx = Math.max.apply(null, a) || 1; return '<div class="bars">' + a.map(function (v, i) { return '<div><span style="height:' + Math.max(4, R(v / mx * 58)) + 'px;background:' + P[k][3] + '"></span><div style="color:var(--t2)">' + (f ? f(v) : v) + '</div><div style="color:var(--t3)">' + lab[i] + '</div></div>'; }).join('') + '</div>'; }
function back(t) { return '<button data-a="back" style="margin-bottom:8px;border:none;padding:4px 0;color:var(--t2);background:transparent">' + ic('back') + ' Back</button><p style="font-size:20px;font-weight:600;margin:0 0 10px">' + t + '</p>'; }
function chips(arr, cur, a) { return arr.map(function (x) { var v = Array.isArray(x) ? x[0] : x, l = Array.isArray(x) ? x[1] : x; return '<span class="chip' + (String(v) === String(cur) ? ' on' : '') + '" data-a="' + a + '" data-v="' + esc(v) + '">' + esc(l) + '</span>'; }).join(''); }
function acts(k, i) { return '<span style="white-space:nowrap"><button class="ic" data-a="edit" data-v="' + k + ':' + i + '" aria-label="Edit">' + ic('pencil') + '</button><button class="ic" data-a="del" data-v="' + k + ':' + i + '" aria-label="Delete">' + ic('trash') + '</button></span>'; }
function save(c) { return '<span style="white-space:nowrap"><button class="btn" data-a="esave" style="background:' + c + ';padding:7px 11px">Save</button><button class="ic" data-a="ecancel" aria-label="Cancel">' + ic('x') + '</button></span>'; }
function dbar() { return '<div style="display:flex;align-items:center;gap:6px;margin-bottom:10px"><button class="ic" data-a="dprev" aria-label="Previous day" style="font-size:22px">' + ic('left') + '</button><div style="flex:1;text-align:center"><div style="font-weight:600;font-size:17px">' + wdn(U.date) + '</div><div style="font-size:13px;color:var(--t2)">' + dfull(U.date) + (U.date === TODAY ? ' · Today' : '') + '</div></div>' + (U.date < TODAY ? '<button class="ic" data-a="dnext" aria-label="Next day" style="font-size:22px">' + ic('right') + '</button>' : '<span style="width:34px"></span>') + '<button data-a="cal" aria-label="Calendar" style="width:40px;height:40px;padding:0;border-radius:12px;border:none;background:' + (U.cal ? '#534AB7' : '#EEEDFE') + ';color:' + (U.cal ? '#EEEDFE' : '#534AB7') + ';font-size:21px">' + ic('cal') + '</button></div>'; }
function lineChart(pts, k) {
  if (pts.length < 2) return '<div style="font-size:14px;color:var(--t3)">Chart ke liye kam se kam 2 entries chahiye.</div>';
  var w = 300, h = 110, pad = 16, vs = pts.map(function (p) { return p.v; }), mn = Math.min.apply(null, vs), mx = Math.max.apply(null, vs);
  if (mx === mn) { mx += 1; mn -= 1; }
  var xs = function (i) { return pad + (w - 2 * pad) * i / (pts.length - 1); }, ys = function (v) { return h - pad - (h - 2 * pad) * (v - mn) / (mx - mn); };
  var path = pts.map(function (p, i) { return (i ? 'L' : 'M') + xs(i).toFixed(1) + ' ' + ys(p.v).toFixed(1); }).join(' ');
  var dots = pts.map(function (p, i) { return '<circle cx="' + xs(i).toFixed(1) + '" cy="' + ys(p.v).toFixed(1) + '" r="3" fill="' + P[k][3] + '"/>'; }).join('');
  return '<svg viewBox="0 0 300 130" width="100%" style="color:var(--t2)"><path d="' + path + '" fill="none" stroke="' + P[k][3] + '" stroke-width="2.5" stroke-linejoin="round"/>' + dots + '<text x="2" y="12" font-size="10" fill="currentColor">' + r1(mx) + '</text><text x="2" y="' + (h - 6) + '" font-size="10" fill="currentColor">' + r1(mn) + '</text><text x="' + pad + '" y="126" font-size="10" fill="currentColor">' + esc(pts[0].l) + '</text><text x="' + (w - pad) + '" y="126" font-size="10" text-anchor="end" fill="currentColor">' + esc(pts[pts.length - 1].l) + '</text></svg>';
}
function shortd(s) { return pd(s).getDate() + '/' + (pd(s).getMonth() + 1); }

function mood() {
  if (D.off[U.date]) return '';
  var t = smd() / 60, fs = firstStudy(), avg = avgStudy(), a = r1(avg);
  if (U.date !== TODAY) return fs === '9999-99-99' || dd(fs, TODAY) < 7 ? '' : card('sl', '<b>' + hm(smd()) + '</b> studied · average ' + a + ' h');
  if (fs === '9999-99-99' || dd(fs, TODAY) < 7) return card('sl', '<b>Pehle hafte me average set ho raha hai.</b><div style="font-size:13px;margin-top:4px;color:#534AB7">Roz padhte raho. Ek hafte baad average se kam padhne pe yahan sad message aayega.</div>');
  if (t < avg) return card('work', '<svg class="sad" width="54" height="54" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#FAC775" stroke="#BA7517" stroke-width="2"/><circle cx="23" cy="26" r="3" fill="#412402"/><circle cx="41" cy="26" r="3" fill="#412402"/><path d="M20 46 Q32 34 44 46" fill="none" stroke="#412402" stroke-width="3" stroke-linecap="round"/><path class="tear" d="M23 32 q-3 5 0 7 q3-2 0-7z" fill="#378ADD"/></svg><div><div style="font-weight:600">Aaj average se kam pdha hai</div><div style="font-size:13px;color:#854F0B">Aaj ' + hm(smd()) + ' · average ' + a + ' h</div></div>', 'display:flex;align-items:center;gap:10px');
  return card('study', '<svg class="hap" width="54" height="54" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#9FE1CB" stroke="#0F6E56" stroke-width="2"/><circle cx="23" cy="26" r="3" fill="#04342C"/><circle cx="41" cy="26" r="3" fill="#04342C"/><path d="M20 38 Q32 52 44 38" fill="none" stroke="#04342C" stroke-width="3" stroke-linecap="round"/></svg><div><div style="font-weight:600">Average cross kar diya</div><div style="font-size:13px;color:#0F6E56">Aaj ' + hm(smd()) + ' · average ' + a + ' h</div></div>', 'display:flex;align-items:center;gap:10px');
}
function offUI() {
  var o = D.off[U.date];
  if (o) return card('work', '<div style="display:flex;justify-content:space-between;align-items:center"><span>' + ic('umbrella') + ' <b>Off day: ' + esc(o.r) + '</b></span><button class="ic" data-a="ofrm" aria-label="Remove off day">' + ic('x') + '</button></div><div style="font-size:13px;color:#854F0B;margin-top:4px">Streak safe hai. Average aur sad message me count nahi hoga.</div>');
  if (!U.offOpen) return '<button data-a="ofo" style="width:100%;margin-bottom:10px;font-size:14px">' + ic('umbrella') + ' Mark off day (travel, festival...)</button>';
  return card('work', '<div style="font-weight:600;margin-bottom:6px">Why off today?</div>' + chips(['Travel', 'Festival', 'Rest day', 'Other'], U.ofr, 'ofr') + '<div class="in" style="margin:0"><input id="or" placeholder="Reason, jaise Diwali" data-e="ofs"><button class="btn" data-a="ofs" style="background:#BA7517;padding:0 14px">Save</button></div>' + er());
}

/* ===== views ===== */
var V = {
  focus: function () {
    var f = D.focus, up = f.mode === 'up';
    return '<div style="background:#085041;color:#E1F5EE;border-radius:22px;padding:24px 10px;text-align:center;min-height:calc(100vh - 150px);display:flex;flex-direction:column;justify-content:center;gap:16px"><div style="font-size:14px;color:#9FE1CB"><span class="dot">●</span> ' + (up ? 'Studying' : 'Practice countdown') + '</div><div style="font-size:34px;font-weight:600;word-break:break-word">' + esc(f.s) + '</div><div id="big" class="pulse" style="font-size:clamp(46px,16vw,76px);font-weight:600;letter-spacing:1px">' + fmt(up ? 0 : f.lim * 60) + '</div><div style="font-size:13px;color:#9FE1CB">Phone ko side me rakh do. Kaam khatam ho to Stop dabao.</div><button class="btn" data-a="fstop" style="background:#E1F5EE;color:#085041;padding:14px;font-size:16px;font-weight:600">' + ic('stop') + ' Stop and save</button><button data-a="fcancel" style="background:transparent;border-color:#5DCAA5;color:#9FE1CB">Discard</button></div>';
  },
  home: function () {
    var t = ftd(), h = slp(), g = D.g;
    return '<div class="card" style="background:#534AB7;color:#EEEDFE"><div style="font-size:13px;color:#CECBF6">Aaj ka quote</div><div style="font-size:17px;line-height:1.5;margin:6px 0 10px">' + esc(U.q) + '</div><span class="chip" style="background:#3C3489;color:#EEEDFE;border:none" data-a="newq">' + ic('refresh') + ' New quote</span></div>' + offUI() +
      (D.sleeping ? card('sl', ic('moon') + ' Sleeping since ' + new Date(D.sleeping).toTimeString().slice(0, 5) + '. Uthne pe round button dabao.') : '') +
      '<div class="g2">' + ring(t.k / g.cal, 'food', R(t.k) + ' kcal', 'Calories') + ring(smd() / (g.study * 60), 'study', hm(smd()), 'Study') + ring(wmd() / g.work, 'work', hm(wmd()), 'Workout') + ring(h / g.sleep, 'sl', h ? h + ' h' : 'No entry', 'Sleep') + '</div><div style="height:10px"></div>' + mood() +
      '<div style="display:flex;gap:8px;margin-bottom:10px"><div class="card" style="background:#FAEEDA;color:#633806;flex:1;margin:0;font-size:14px">' + ic('flame') + ' Streak: ' + streak() + ' din</div><div class="card" style="background:#E6F1FB;color:#0C447C;flex:1;margin:0;font-size:14px">' + ic('wallet') + ' Kharcha ₹' + exd() + '</div></div>';
  },
  food: function () {
    var t = ftd(), l = L('food');
    if (U.fsum) return card('sl', '<div style="font-size:18px;font-weight:600">Day summary</div><div style="font-size:14px;color:#534AB7;margin:4px 0 10px">' + l.length + ' items eaten</div><div class="g2">' + card('food', '<b>' + R(t.k) + '</b> kcal', 'margin:0') + card('study', '<b>' + R(t.p) + '</b> g protein', 'margin:0') + card('work', '<b>' + R(t.c) + '</b> g carbs', 'margin:0') + card('money', '<b>' + R(t.f) + '</b> g fat', 'margin:0') + '</div><div style="font-size:14px;margin-top:10px">' + (t.k <= D.g.cal ? R(D.g.cal - t.k) + ' kcal goal se kam.' : R(t.k - D.g.cal) + ' kcal goal se zyada.') + '</div>') +
      l.map(function (o) { return '<div class="row"><span>' + o.x.q + ' x ' + esc(o.x.n) + '</span><span>' + R(o.x.q * o.x.d[0]) + ' kcal</span></div>'; }).join('') + '<button data-a="fnew" style="width:100%;margin-top:12px">Back to entries</button>';
    var cf = U.cfl.length ? card('food', '<div style="font-weight:600;margin-bottom:6px">"' + esc(U.cfl[0]) + '" list me nahi mila. Khud daalo:</div><div class="in"><input id="cfn" value="' + esc(U.cfl[0]) + '" placeholder="Naam"><input id="cfq" type="number" step="0.5" value="1" style="max-width:64px" placeholder="Qty"></div><div class="in"><input id="cfk" type="number" placeholder="kcal (1 piece)"><input id="cfp" type="number" placeholder="Protein g"></div><div class="in"><input id="cfc" type="number" placeholder="Carbs g"><input id="cff" type="number" placeholder="Fat g"></div><div style="display:flex;gap:8px"><button class="btn" data-a="cfsave" style="background:#D85A30;flex:1;padding:10px">Add</button><button data-a="cfcancel" style="flex:1">Skip</button></div>') : '';
    return '<div class="in"><input id="fi" placeholder="2 roti, 1 banana, chai" data-e="fadd"><button class="btn" data-a="fadd" style="background:#D85A30;padding:0 12px" aria-label="Add">' + ic('plus') + '</button><button class="btn" data-a="fphoto" style="background:#993C1D;padding:0 12px" aria-label="Photo">' + ic('camera') + '</button><button class="btn" data-a="fmic" style="background:#7F77DD;padding:0 12px" aria-label="Voice">' + ic('mic') + '</button></div>' + er() + cf +
      card('food', '<div style="display:flex;justify-content:space-between;text-align:center"><div><div style="font-size:20px;font-weight:600">' + R(t.k) + '</div><div style="font-size:12px">kcal</div></div><div><div style="font-size:20px;font-weight:600">' + R(t.p) + '</div><div style="font-size:12px">protein</div></div><div><div style="font-size:20px;font-weight:600">' + R(t.c) + '</div><div style="font-size:12px">carbs</div></div><div><div style="font-size:20px;font-weight:600">' + R(t.f) + '</div><div style="font-size:12px">fat</div></div></div><div class="bar"><div style="background:#D85A30;width:' + Math.min(100, t.k / D.g.cal * 100) + '%"></div></div>') +
      (l.map(function (o) { var x = o.x, i = o.i; return U.edit === 'food:' + i ? '<div class="row"><span>' + esc(x.n) + ' qty</span><input id="eq" type="number" step="0.5" value="' + x.q + '" data-e="esave">' + save('#D85A30') + '</div>' : '<div class="row"><span>' + x.q + ' x ' + esc(x.n) + '</span><span style="color:#D85A30;font-weight:600">' + R(x.q * x.d[0]) + ' kcal</span>' + acts('food', i) + '</div>'; }).join('') || '<div class="row" style="color:var(--t3)">Is din ki koi entry nahi. Type karo, bolo, ya photo lo.</div>') +
      '<button class="btn" data-a="fend" style="width:100%;margin-top:12px;background:#534AB7;padding:11px">' + ic('moon') + ' End day and see summary</button>';
  },
  study: function () {
    var wd = weekDays(), hrs = wd.map(function (d) { return smd(d) / 60; }), tot = {};
    D.study.forEach(function (x) { if (wd.indexOf(x.dt) > -1) tot[x.s] = (tot[x.s] || 0) + x.m / 60; });
    var ks = Object.keys(tot).sort(function (a, b) { return tot[b] - tot[a]; }), mx = tot[ks[0]] || 1, subs = subjects(), cur = U.msub || subs[0];
    return mood() + offUI() +
      card('study', '<div style="font-weight:600;margin-bottom:6px">Start studying</div><div style="margin-bottom:6px">' + chips(subs, cur, 'msub') + '</div><div class="in" style="margin:0"><input id="ss" placeholder="Subject name" value="' + esc(cur) + '" data-e="sstart"><button class="btn" data-a="sstart" style="background:#1D9E75;padding:0 16px">' + ic('play') + ' Start</button></div>') + er() +
      card('sl', '<div style="font-weight:600;margin-bottom:6px">Practice session (countdown)</div><div class="in" style="margin:0"><input id="ps" placeholder="Subject" value="' + esc(cur) + '"><input id="ph" type="number" placeholder="Hr" style="max-width:58px"><input id="pm" type="number" placeholder="Min" style="max-width:58px"><button class="btn" data-a="pstart" style="background:#7F77DD;padding:0 12px" aria-label="Start">' + ic('clock') + '</button></div><div style="font-size:12px;color:#534AB7;margin-top:6px">Time 0 hote hi notification aayega</div>') +
      '<p class="h">Add time for ' + wdn(U.date) + '</p><div class="in"><input id="ms" placeholder="Subject" value="' + esc(cur) + '"><input id="mh" type="number" placeholder="Hr" style="max-width:58px"><input id="mm" type="number" placeholder="Min" style="max-width:58px"><button class="btn" data-a="sadd" style="background:#1D9E75;padding:0 12px" aria-label="Add">' + ic('plus') + '</button></div>' +
      (L('study').map(function (o) { var x = o.x, i = o.i; return U.edit === 'study:' + i ? '<div class="row"><input id="es" value="' + esc(x.s) + '" style="flex:1;width:auto" data-e="esave">' + save('#1D9E75') + '</div>' : '<div class="row"><span>' + esc(x.s) + ' <span style="font-size:12px;color:var(--t3)">' + x.t + '</span></span><span style="color:#0F6E56;font-weight:600">' + hm(x.m) + '</span>' + acts('study', i) + '</div>'; }).join('') || '<div class="row" style="color:var(--t3)">Is din ki koi study entry nahi.</div>') +
      (U.edit.indexOf('study') === 0 ? '<div style="font-size:12px;color:var(--t3);margin-top:4px">Sirf subject ka naam badlega, time same rahega.</div>' : '') +
      '<p class="h" style="margin-top:14px">Weekly report (' + pd(wd[0]).getDate() + ' to ' + dfull(wd[6]).replace(/ \d{4}$/, '') + ')</p><div style="font-size:13px;color:var(--t2);margin-bottom:6px">Average: ' + r1(avgStudy()) + ' h per day, off days ko chhodke</div>' + bars(hrs, 'study', wlab(wd), r1) +
      '<p class="h" style="margin-top:14px">Time per subject this week</p>' + (ks.map(function (k) { return '<div style="margin-bottom:8px;font-size:14px"><div style="display:flex;justify-content:space-between"><span>' + esc(k) + '</span><span>' + r1(tot[k]) + ' h</span></div><div class="bar" style="margin-top:3px"><div style="background:#1D9E75;width:' + R(tot[k] / mx * 100) + '%"></div></div></div>'; }).join('') || '<div style="font-size:14px;color:var(--t3)">Is hafte koi entry nahi.</div>');
  },
  work: function () {
    var wd = weekDays();
    return offUI() + card('work', '<div style="font-weight:600;margin-bottom:8px">Log a workout</div>' + chips(['Gym', 'Running', 'Yoga', 'Cycling', 'Sports', 'Walk'], U.wtype, 'wtype') + '<div class="in" style="margin:6px 0 0"><input id="wh" type="number" placeholder="Hours"><input id="wmn" type="number" placeholder="Minutes" data-e="wadd"><button class="btn" data-a="wadd" style="background:#BA7517;padding:0 14px">Add</button></div>') + er() +
      '<p class="h">Workout this week (minutes)</p>' + bars(wd.map(function (d) { return wmd(d); }), 'work', wlab(wd)) + '<p class="h" style="margin-top:14px">' + wdn(U.date) + '</p>' +
      (L('work').map(function (o) { var x = o.x, i = o.i; return U.edit === 'work:' + i ? '<div class="row" style="flex-wrap:wrap"><input id="et" value="' + esc(x.t) + '" style="width:90px"><input id="eh" type="number" value="' + Math.floor(x.m / 60) + '" style="width:54px"><input id="em" type="number" value="' + x.m % 60 + '" style="width:54px" data-e="esave">' + save('#BA7517') + '</div>' : '<div class="row"><span>' + ic('dumbbell') + ' ' + esc(x.t) + '</span><span>' + hm(x.m) + '</span>' + acts('work', i) + '</div>'; }).join('') || '<div class="row" style="color:var(--t3)">Is din koi workout nahi.</div>');
  },
  more: function () {
    var T = [['money', 'wallet', 'Money', 'Budget aur kharcha', 'money'], ['wt', 'pulse', 'Weight', 'Hafte me 2 baar', 'weight'], ['sl', 'bed', 'Sleep', 'Sone ka hisab', 'sleep'], ['study', 'chart', 'Reports', 'Week aur month', 'report'], ['work', 'trophy', 'Badges', 'Goals aur rewards', 'badges'], ['food', 'sliders', 'Settings', 'Goals, reminders, backup', 'settings']];
    return '<div class="g2">' + T.map(function (x) { return card(x[0], '<div style="font-size:26px">' + ic(x[1]) + '</div><div style="font-weight:600;margin-top:6px">' + x[2] + '</div><div style="font-size:12px;color:' + P[x[0]][2] + '">' + x[3] + '</div>', 'margin:0;cursor:pointer" data-a="sub" data-v="' + x[4]); }).join('') + '</div>';
  },
  money: function () {
    var e = monthSpent(), p = e / D.budget, mn = pd(U.date).toLocaleDateString('en-IN', { month: 'long' });
    return back('Money') + '<div class="in"><input id="bi" type="number" placeholder="Monthly budget ₹" value="' + D.budget + '" data-e="bset"><button class="btn" data-a="bset" style="background:#378ADD;padding:0 16px">Set</button></div>' +
      (p >= 1 ? '<div class="toast bad" style="margin-bottom:10px">' + ic('alert') + ' Budget ₹' + (e - D.budget) + ' se paar ho gaya</div>' : p >= .8 ? '<div class="toast warn" style="margin-bottom:10px">' + ic('alert') + ' ' + R(p * 100) + '% budget use ho gaya. ₹' + (D.budget - e) + ' bacha hai.</div>' : '') +
      card('money', '<div style="font-size:13px;color:#185FA5">' + mn + ' me kharcha</div><div style="font-size:26px;font-weight:600">₹' + e.toLocaleString('en-IN') + ' <span style="font-size:14px;color:#185FA5">of ₹' + D.budget.toLocaleString('en-IN') + '</span></div><div class="bar"><div style="background:' + (p >= 1 ? '#E24B4A' : p >= .8 ? '#BA7517' : '#378ADD') + ';width:' + Math.min(100, R(p * 100)) + '%"></div></div>') + er() +
      '<div class="in"><input id="ea" type="number" placeholder="₹ Amount" style="max-width:104px"><input id="en" placeholder="Kis liye" data-e="eadd"><button class="btn" data-a="eadd" style="background:#185FA5;padding:0 12px" aria-label="Add">' + ic('plus') + '</button></div>' +
      (L('exp').map(function (o) { var x = o.x, i = o.i; return U.edit === 'exp:' + i ? '<div class="row"><input id="en2" value="' + esc(x.n) + '" style="flex:1;width:auto"><input id="ea2" type="number" value="' + x.a + '" style="width:76px" data-e="esave">' + save('#185FA5') + '</div>' : '<div class="row"><span>' + esc(x.n) + '</span><span style="font-weight:600">₹' + x.a + '</span>' + acts('exp', i) + '</div>'; }).join('') || '<div class="row" style="color:var(--t3)">Is din koi kharcha nahi.</div>');
  },
  weight: function () {
    var a = D.wts.filter(function (x) { return x.dt > ad(TODAY, -U.wr); }), d = a.length > 1 ? r1(a[a.length - 1].w - a[0].w) : 0, last = D.wts[D.wts.length - 1];
    return back('Weight') + '<div class="in"><input id="wi" type="number" step="0.1" placeholder="Weight in kg" data-e="wtadd"><button class="btn" data-a="wtadd" style="background:#D4537E;padding:0 16px">Save</button></div>' + er() + '<div style="font-size:13px;color:var(--t2);margin-bottom:8px">' + ic('bell') + ' Reminder: Monday aur Thursday</div>' +
      card('wt', '<div style="font-size:13px;color:#993556">Latest' + (last ? ' (' + dfull(last.dt) + ')' : '') + '</div><div style="font-size:26px;font-weight:600">' + (last ? last.w + ' kg' : 'No entry') + '</div><div style="font-size:14px">' + (a.length > 1 ? (d <= 0 ? 'Kam hua ' : 'Badha ') + Math.abs(d) + ' kg is range me' : '') + '</div>') +
      chips([[7, 'Week'], [30, 'Month'], [60, '2 months'], [90, '3 months'], [180, '6 months']], U.wr, 'wr') + lineChart(a.map(function (x) { return { v: x.w, l: shortd(x.dt) }; }), 'wt') +
      (L('wts') && D.wts.filter(function (x) { return x.dt === U.date; }).length ? '<div style="font-size:13px;color:var(--t2);margin-top:8px">Is din ka weight: ' + wtd() + ' kg</div>' : '');
  },
  sleep: function () {
    var l = D.sleep.slice(-7), av = l.length ? r1(l.reduce(function (a, b) { return a + b.h; }, 0) / l.length) : 0;
    return back('Sleep') + '<div style="font-size:13px;color:var(--t2);margin-bottom:8px">Home screen ke round button se bhi sleep add kar sakte ho.</div><div class="h">Add for ' + wdn(U.date) + '</div>' + er() + '<div class="in"><input id="sb" type="time" value="23:30"><input id="sw" type="time" value="06:30"><button class="btn" data-a="slsave" style="background:#7F77DD;padding:0 14px">Save</button></div>' +
      card('sl', '<div style="font-size:13px;color:#534AB7">Pichli raaton ka average</div><div style="font-size:24px;font-weight:600">' + (l.length ? av + ' h' : 'No data') + '</div>') + (l.length ? bars(l.map(function (x) { return x.h; }), 'sl', l.map(function (x) { return shortd(x.dt); })) : '') +
      (L('sleep').map(function (o) { return '<div class="row"><span>' + dfull(o.x.dt) + '</span><span>' + o.x.h + ' h</span>' + acts('sleep', o.i) + '</div>'; }).join(''));
  },
  report: function () {
    var n = U.rep === 'Week' ? 7 : U.rep === 'Month' ? 30 : 90, days = []; for (var i = n - 1; i >= 0; i--) days.push(ad(U.date, -i));
    var sm = 0, sd = 0, best = 0, bd = '', subj = {}, wd = 0, wmn = 0, kc = 0, kn = 0, ex = 0, offn = 0, sl = [], wtypes = {};
    days.forEach(function (d) {
      var s = smd(d); if (D.off[d]) offn++; else if (s > 0) { sd++; } sm += s; if (s > best) { best = s; bd = d; }
      var w = wmd(d); if (w > 0) { wd++; wmn += w; } var k = ftd(d).k; if (k > 0) { kc += k; kn++; } ex += exd(d); var z = slp(d); if (z) sl.push(z);
    });
    D.study.forEach(function (x) { if (days.indexOf(x.dt) > -1) subj[x.s] = (subj[x.s] || 0) + x.m; });
    D.work.forEach(function (x) { if (days.indexOf(x.dt) > -1) wtypes[x.t] = (wtypes[x.t] || 0) + x.m; });
    var counted = n - offn, ks = Object.keys(subj).sort(function (a, b) { return subj[b] - subj[a]; }), mx = subj[ks[0]] || 1;
    var wt = D.wts.filter(function (x) { return x.dt >= days[0] && x.dt <= U.date; });
    return back('Reports') + '<div style="margin-bottom:6px">' + chips(['Week', 'Month', '3 Months'], U.rep, 'rep') + '</div><div style="font-size:13px;color:var(--t2);margin-bottom:10px">' + dfull(days[0]) + ' se ' + dfull(U.date) + ' tak</div>' +
      card('study', '<div style="font-weight:600;margin-bottom:6px">Study</div><div class="g2"><div><div style="font-size:20px;font-weight:600">' + hm(sm) + '</div><div style="font-size:12px">total</div></div><div><div style="font-size:20px;font-weight:600">' + r1(sm / 60 / Math.max(1, counted)) + ' h</div><div style="font-size:12px">average per din</div></div><div><div style="font-size:20px;font-weight:600">' + sd + '</div><div style="font-size:12px">din padha</div></div><div><div style="font-size:20px;font-weight:600">' + (best ? hm(best) : '-') + '</div><div style="font-size:12px">best din' + (bd ? ' (' + shortd(bd) + ')' : '') + '</div></div></div>' + (ks.length ? '<div style="margin-top:10px">' + ks.map(function (k) { return '<div style="margin-bottom:6px;font-size:14px"><div style="display:flex;justify-content:space-between"><span>' + esc(k) + '</span><span>' + hm(subj[k]) + '</span></div><div class="bar" style="margin-top:3px"><div style="background:#1D9E75;width:' + R(subj[k] / mx * 100) + '%"></div></div></div>'; }).join('') + '</div>' : '')) +
      card('work', '<div style="font-weight:600;margin-bottom:6px">Workout</div><div class="g2"><div><div style="font-size:20px;font-weight:600">' + wd + '</div><div style="font-size:12px">din workout</div></div><div><div style="font-size:20px;font-weight:600">' + hm(wmn) + '</div><div style="font-size:12px">total time</div></div></div>' + Object.keys(wtypes).map(function (k) { return '<div class="row"><span>' + esc(k) + '</span><span>' + hm(wtypes[k]) + '</span></div>'; }).join('')) +
      card('food', '<div style="font-weight:600;margin-bottom:6px">Food</div><div style="font-size:20px;font-weight:600">' + (kn ? R(kc / kn) : 0) + ' kcal</div><div style="font-size:12px">average per din (' + kn + ' din ka data)</div>') +
      card('money', '<div style="font-weight:600;margin-bottom:6px">Kharcha</div><div style="font-size:20px;font-weight:600">₹' + ex.toLocaleString('en-IN') + '</div><div style="font-size:12px">total · ₹' + R(ex / n) + ' per din</div>') +
      card('sl', '<div style="font-weight:600;margin-bottom:6px">Sleep aur weight</div><div style="font-size:14px">Sleep average: <b>' + (sl.length ? r1(sl.reduce(function (a, b) { return a + b; }, 0) / sl.length) + ' h' : 'no data') + '</b></div><div style="font-size:14px;margin-top:4px">Weight: <b>' + (wt.length > 1 ? (r1(wt[wt.length - 1].w - wt[0].w) <= 0 ? 'Kam ' : 'Badha ') + Math.abs(r1(wt[wt.length - 1].w - wt[0].w)) + ' kg' : wt.length ? wt[0].w + ' kg' : 'no data') + '</b></div><div style="font-size:14px;margin-top:4px">Off days: <b>' + offn + '</b></div>');
  },
  badges: function () {
    var sh = 0; D.study.forEach(function (x) { sh += x.m; });
    var l7 = D.sleep.slice(-7), s = streak();
    var B = [['Pehla study log', 'book', D.study.length > 0], ['Pehla workout', 'dumbbell', D.work.length > 0], ['7 din streak', 'flame', s >= 7], ['30 din streak', 'flame', s >= 30], ['Budget me', 'wallet', monthSpent(TODAY) > 0 && monthSpent(TODAY) < D.budget], ['100 study ghante', 'trophy', sh >= 6000], ['Achhi neend', 'bed', l7.length >= 5 && l7.reduce(function (a, b) { return a + b.h; }, 0) / l7.length >= 7], ['Weight tracker', 'pulse', D.wts.length >= 8]];
    var wk = weekDays().reduce(function (a, d) { return a + smd(d); }, 0);
    return back('Goals and badges') + card('work', '<b>Weekly goal</b><div style="font-size:14px;margin-top:4px">Study ' + D.g.study * 7 + ' ghante is hafte: ' + hm(wk) + '</div><div class="bar"><div style="background:#BA7517;width:' + Math.min(100, R(wk / (D.g.study * 7 * 60) * 100)) + '%"></div></div>') + card('study', ic('flame') + ' Abhi ki streak: <b>' + s + ' din</b>') + '<div class="g2">' + B.map(function (x) { return '<div class="card" style="margin:0;text-align:center;background:' + (x[2] ? '#FAEEDA' : 'var(--s1)') + ';color:' + (x[2] ? '#633806' : 'var(--t3)') + '"><div style="font-size:28px">' + ic(x[1]) + '</div><div style="font-size:13px;margin-top:4px">' + x[0] + '</div><div style="font-size:12px">' + (x[2] ? 'Unlocked' : 'Locked') + '</div></div>'; }).join('') + '</div>';
  },
  settings: function () {
    var np = 'Notification' in window ? Notification.permission : 'unsupported';
    return back('Settings') + '<div class="h">Quote language</div>' + chips(['Random', 'Hinglish', 'English', 'Hindi'], D.lang, 'lang') +
      '<div class="h" style="margin-top:8px">Paani reminder (subah 8 se raat 10)</div>' + chips([[0, 'Off'], [1, 'Har 1 ghanta'], [2, 'Har 2 ghante'], [3, 'Har 3 ghante']], D.wint, 'wint') +
      '<div class="h" style="margin-top:8px">Notifications</div><div style="font-size:13px;color:var(--t2);margin-bottom:6px">Status: ' + np + '. Reminders tabhi aayenge jab app khuli ho ya background me chal rahi ho.</div><div style="display:flex;gap:8px"><button data-a="notifreq" style="flex:1">Allow notifications</button><button data-a="test" style="flex:1">Test</button></div>' +
      '<div class="h" style="margin-top:14px">Daily goals</div><div class="in"><input id="gcal" type="number" value="' + D.g.cal + '" placeholder="kcal"><input id="gst" type="number" step="0.5" value="' + D.g.study + '" placeholder="Study h"></div><div class="in"><input id="gwk" type="number" value="' + D.g.work + '" placeholder="Workout min"><input id="gsl" type="number" step="0.5" value="' + D.g.sleep + '" placeholder="Sleep h"></div><div style="font-size:12px;color:var(--t3);margin:-4px 0 6px">Calories, study (ghante), workout (min), sleep (ghante)</div><button class="btn" data-a="gsave" style="background:#534AB7;width:100%;padding:10px">Save goals</button>' +
      '<div class="h" style="margin-top:14px">Photo se calories (free Gemini key)</div><div style="font-size:13px;color:var(--t2);margin-bottom:6px">aistudio.google.com/apikey se free key lo aur yahan paste karo. Key sirf tumhare phone me rehti hai.</div><div class="in"><input id="gkey" type="password" placeholder="Gemini API key" value="' + esc(D.gkey) + '"></div><div class="in"><input id="gmodel" value="' + esc(D.gmodel) + '" placeholder="Model"></div><button class="btn" data-a="gk" style="background:#993C1D;width:100%;padding:10px">Save key</button>' +
      '<div class="row" style="margin-top:14px"><span>Dark mode</span><input type="checkbox" data-a="dark" ' + (D.dark ? 'checked' : '') + '></div>' +
      '<div class="h" style="margin-top:14px">Backup</div><div style="display:flex;gap:8px"><button data-a="export" style="flex:1">Export</button><button data-a="import" style="flex:1">Import</button></div><div style="font-size:12px;color:var(--t3);margin-top:6px">Data sirf is phone me hai. Hafte me ek baar Export karke file save kar lo.</div>' +
      (U.ip ? '<button class="btn" data-a="install" style="background:#1D9E75;width:100%;padding:11px;margin-top:14px">Install Roz app</button>' : '<div style="font-size:12px;color:var(--t3);margin-top:14px">Install: Chrome menu me "Install app" ya "Add to Home screen".</div>') +
      '<button data-a="reset" style="width:100%;margin-top:14px;color:var(--danger)">Saara data delete karo</button>';
  }
};

/* ===== calendar ===== */
var TTL = { a: 'All activity', f: 'Food calendar', s: 'Study calendar', w: 'Workout calendar', e: 'Kharcha calendar', t: 'Weight calendar', z: 'Sleep calendar' }, KM = { f: 'food', s: 'study', w: 'work', e: 'money', t: 'wt', z: 'sl' };
function cmode() { var t = U.tab === 'more' && U.sub ? U.sub : U.tab; return { food: 'f', study: 's', work: 'w', money: 'e', weight: 't', sleep: 'z' }[t] || 'a'; }
function cv(dt, m) {
  if (m === 'f') { var k = ftd(dt).k; return k ? r1(k / 1000) + 'k' : ''; }
  if (m === 's') { var s = smd(dt); return s ? r1(s / 60) + 'h' : ''; }
  if (m === 'w') { var w = wmd(dt); return w ? w + 'm' : ''; }
  if (m === 'e') { var e = exd(dt); return e ? '₹' + e : ''; }
  if (m === 't') { var x = wtd(dt); return x ? String(x) : ''; }
  if (m === 'z') { var z = slp(dt); return z ? z + 'h' : ''; }
  return '';
}
function sumV(m) {
  var off = D.off[U.date], hd = '<div style="font-weight:600;margin-bottom:8px">' + wdn(U.date) + ', ' + dfull(U.date) + '</div>', ofl = off && (m === 'a' || m === 's' || m === 'w') ? '<div style="font-size:14px;margin-bottom:8px">' + ic('umbrella') + ' Off day: ' + esc(off.r) + '</div>' : '', t = ftd();
  var none = function (x) { return '<div style="font-size:14px">' + x + '</div>'; };
  if (m === 'f') return card('food', hd + '<div class="g2">' + card('food', '<b>' + R(t.k) + '</b> kcal', 'margin:0;background:#fff') + card('food', '<b>' + R(t.p) + '</b> g protein', 'margin:0;background:#fff') + card('food', '<b>' + R(t.c) + '</b> g carbs', 'margin:0;background:#fff') + card('food', '<b>' + R(t.f) + '</b> g fat', 'margin:0;background:#fff') + '</div>' + (L('food').map(function (o) { return '<div class="row"><span>' + o.x.q + ' x ' + esc(o.x.n) + '</span><span>' + R(o.x.q * o.x.d[0]) + ' kcal</span></div>'; }).join('') || none('Is din koi food entry nahi.')));
  if (m === 's') return card('study', hd + ofl + '<div style="font-size:24px;font-weight:600">' + hm(smd()) + '</div><div style="font-size:13px;color:#0F6E56;margin-bottom:6px">total study</div>' + (L('study').map(function (o) { return '<div class="row"><span>' + esc(o.x.s) + ' · ' + o.x.t + '</span><span>' + hm(o.x.m) + '</span></div>'; }).join('') || none('Is din koi study entry nahi.')));
  if (m === 'w') return card('work', hd + ofl + '<div style="font-size:24px;font-weight:600">' + hm(wmd()) + '</div><div style="font-size:13px;color:#854F0B;margin-bottom:6px">total workout</div>' + (L('work').map(function (o) { return '<div class="row"><span>' + esc(o.x.t) + '</span><span>' + hm(o.x.m) + '</span></div>'; }).join('') || none('Is din koi workout nahi.')));
  if (m === 'e') return card('money', hd + '<div style="font-size:24px;font-weight:600">₹' + exd() + '</div><div style="font-size:13px;color:#185FA5;margin-bottom:6px">is din ka kharcha · month total ₹' + monthSpent() + '</div>' + (L('exp').map(function (o) { return '<div class="row"><span>' + esc(o.x.n) + '</span><span>₹' + o.x.a + '</span></div>'; }).join('') || none('Is din koi kharcha nahi.')));
  if (m === 't') return card('wt', hd + (wtd() ? '<div style="font-size:24px;font-weight:600">' + wtd() + ' kg</div><div style="font-size:13px;color:#993556">is din naapa</div>' : none('Is din weight nahi naapa.')));
  if (m === 'z') return card('sl', hd + (slp() ? '<div style="font-size:24px;font-weight:600">' + slp() + ' h</div><div style="font-size:13px;color:#534AB7">soya</div>' : none('Is din ki sleep entry nahi.')));
  return card('sl', hd + ofl + '<div class="g2">' + card('food', '<b>' + R(t.k) + '</b> kcal', 'margin:0') + card('study', '<b>' + hm(smd()) + '</b> study', 'margin:0') + card('work', '<b>' + hm(wmd()) + '</b> workout', 'margin:0') + card('money', '<b>₹' + exd() + '</b> kharcha', 'margin:0') + '</div><div style="font-size:14px;margin-top:8px">Sleep: ' + (slp() ? slp() + ' h' : 'no entry') + '</div>');
}
function calV() {
  var m = cmode(), y = U.cy, mo = U.cm, lead = (new Date(y, mo, 1).getDay() + 6) % 7, n = new Date(y, mo + 1, 0).getDate(), ix = {};
  function g(d) { return ix[d] || (ix[d] = {}); }
  D.food.forEach(function (x) { g(x.dt).f = 1; }); D.study.forEach(function (x) { g(x.dt).s = 1; }); D.work.forEach(function (x) { g(x.dt).w = 1; }); D.exp.forEach(function (x) { g(x.dt).e = 1; });
  var c = ''; for (var i = 0; i < lead; i++) c += '<span></span>';
  for (var d = 1; d <= n; d++) {
    var dt = y + '-' + p2(mo + 1) + '-' + p2(d), o = ix[dt] || {}, sel = dt === U.date, off = D.off[dt] && (m === 'a' || m === 's' || m === 'w'), fu = dt > TODAY, v = m === 'a' ? '' : cv(dt, m), st = '';
    if (sel) st = 'background:#534AB7;color:#EEEDFE;border-color:#534AB7'; else if (off) st = 'background:#FAEEDA;color:#633806'; else if (v) st = 'background:' + P[KM[m]][0] + ';color:' + P[KM[m]][1]; else if (dt === TODAY) st = 'border:2px solid #534AB7';
    var sub = off ? ic('umbrella', 11) : m === 'a' ? ((o.f ? '<span class="dt" style="background:#D85A30"></span>' : '') + (o.s ? '<span class="dt" style="background:#1D9E75"></span>' : '') + (o.w ? '<span class="dt" style="background:#BA7517"></span>' : '') + (o.e ? '<span class="dt" style="background:#378ADD"></span>' : '')) : v;
    c += '<button ' + (fu ? 'style="opacity:.35"' : 'data-a="pick" data-v="' + dt + '" style="' + st + '"') + '>' + d + '<small>' + sub + '</small></button>';
  }
  var leg = m === 'a' ? '<span class="dt" style="background:#D85A30"></span>Food <span class="dt" style="background:#1D9E75"></span>Study <span class="dt" style="background:#BA7517"></span>Workout <span class="dt" style="background:#378ADD"></span>Kharcha ' + ic('umbrella', 12) + ' Off' : 'Sirf is page ka data dikh raha hai' + (m === 's' || m === 'w' ? ' · ' + ic('umbrella', 12) + ' Off day' : '');
  return '<div style="font-weight:600;font-size:15px;margin-bottom:6px;color:' + (m === 'a' ? 'var(--tx)' : P[KM[m]][3]) + '">' + TTL[m] + '</div><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px"><button class="ic" data-a="cmn" data-v="-1" aria-label="Previous month">' + ic('left') + '</button><b>' + new Date(y, mo, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) + '</b><button class="ic" data-a="cmn" data-v="1" aria-label="Next month">' + ic('right') + '</button></div><div class="cal" style="margin-bottom:4px">' + 'MTWTFSS'.split('').map(function (x) { return '<div style="text-align:center;font-size:12px;color:var(--t3)">' + x + '</div>'; }).join('') + '</div><div class="cal">' + c + '</div><div style="font-size:12px;color:var(--t2);margin:8px 0">' + leg + '</div>' + sumV(m) + '<button class="btn" data-a="calopen" style="width:100%;background:#534AB7;padding:11px">Open this day</button>';
}

/* ===== draw ===== */
function draw() {
  var t = U.tab === 'more' && U.sub ? U.sub : U.tab;
  document.body.className = D.dark ? 'dk' : '';
  $('main').innerHTML = D.focus ? V.focus() : dbar() + (U.cal ? calV() : V[t]());
  $('nav').style.display = D.focus ? 'none' : 'flex';
  $('nav').innerHTML = [['home', 'home', 'Home'], ['food', 'food', 'Food'], ['study', 'book', 'Study'], ['work', 'dumbbell', 'Workout'], ['more', 'grid', 'More']].map(function (x) { return '<button data-a="tab" data-v="' + x[0] + '" class="' + (U.tab === x[0] ? 'on' : '') + '">' + ic(x[1]) + x[2] + '</button>'; }).join('');
  var f = $('fab'); f.style.display = U.tab === 'home' && !D.focus && !U.sub && !U.cal ? 'flex' : 'none'; f.style.background = D.sleeping ? '#BA7517' : '#7F77DD'; f.innerHTML = ic(D.sleeping ? 'sun' : 'moon', 26);
  $('bBell').innerHTML = ic('bell', 18); $('bDark').innerHTML = ic(D.dark ? 'sun' : 'moon', 18);
  persist();
}
function r() { U.err = ''; U.edit = ''; draw(); }
function toast(m, cls) { var o = $('ov'); o.innerHTML = '<div class="toast ' + (cls || '') + '">' + esc(m) + '</div>'; o.style.display = 'block'; clearTimeout(TT); TT = setTimeout(function () { o.style.display = 'none'; }, 3000); }
function showAlert(m) { var a = $('al'); a.innerHTML = '<div class="toast warn"><span style="flex:1">' + esc(m) + '</span><button class="ic" data-a="dis" style="color:#FAEEDA" aria-label="Dismiss">' + ic('x') + '</button></div>'; a.style.display = 'block'; }
function notify(t, b) {
  toast(b);
  try {
    if ('Notification' in window && Notification.permission === 'granted') {
      if (navigator.serviceWorker && navigator.serviceWorker.getRegistration) navigator.serviceWorker.getRegistration().then(function (reg) { if (reg) reg.showNotification(t, { body: b, icon: 'icon-192.png', vibrate: [200, 100, 200] }); else new Notification(t, { body: b }); }).catch(function () { });
      else new Notification(t, { body: b });
    }
  } catch (e) { }
  try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch (e) { }
}
function beep() { try { var a = new (window.AudioContext || window.webkitAudioContext)(), o = a.createOscillator(), g = a.createGain(); o.connect(g); g.connect(a.destination); o.frequency.value = 880; g.gain.value = 0.2; o.start(); setTimeout(function () { o.stop(); }, 700); } catch (e) { } }
function val(i) { var e = $(i); return e ? e.value.trim() : ''; }

/* ===== timers ===== */
function lock() { try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then(function (l) { WL = l; }).catch(function () { }); } catch (e) { } }
function unlock() { try { if (WL) { WL.release(); WL = null; } } catch (e) { } }
function stopT() { clearInterval(TI); TI = null; }
function finishPractice(f) {
  stopT(); unlock();
  D.study.push({ dt: ds(new Date(f.t0)), s: f.s, m: f.lim, t: 'Practice' }); D.focus = null; persist();
  showAlert('Time up! ' + f.s + ' practice (' + hm(f.lim) + ') complete ho gayi.');
  notify('Roz: time up', f.s + ' practice complete ho gayi.'); beep(); draw();
}
function tick() {
  var f = D.focus; if (!f) { stopT(); return; }
  var s = Math.floor((Date.now() - f.t0) / 1000), up = f.mode === 'up', v = up ? s : f.lim * 60 - s;
  if (!up && v <= 0) { finishPractice(f); return; }
  var e = $('big'); if (e) e.textContent = fmt(v);
}
function begin(f) { f.t0 = Date.now(); D.focus = f; persist(); stopT(); TI = setInterval(tick, 1000); lock(); draw(); }

/* ===== food helpers ===== */
function addParsed(text) {
  var res = parseFood(text);
  res.items.forEach(function (x) { D.food.push({ dt: U.date, n: x.n, q: x.q, d: x.d }); });
  U.cfl = res.unknown;
  if (!res.items.length && !res.unknown.length) { U.err = 'Kuch samajh nahi aaya. Jaise likho: 2 roti, 1 chai'; draw(); return false; }
  r(); return true;
}
function callGemini(b64) {
  if (!D.gkey) { U.err = 'Photo se calories ke liye Settings me free Gemini key daalo. Tab tak khana likhke daal do.'; draw(); return; }
  toast('Photo check ho rahi hai...');
  var prompt = 'Identify each food item on this plate or meal (Indian food context). Return ONLY a JSON array. Each element: {"name": string, "portion": string, "kcal": number, "protein": number, "carbs": number, "fat": number} for the portion visible.';
  fetch('https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(D.gmodel || 'gemini-2.5-flash') + ':generateContent?key=' + encodeURIComponent(D.gkey), {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: 'image/jpeg', data: b64 } }] }], generationConfig: { responseMimeType: 'application/json' } })
  }).then(function (r) { return r.json(); }).then(function (j) {
    var t = j.candidates[0].content.parts[0].text, arr = JSON.parse(t.replace(/```json|```/g, '').trim());
    if (!Array.isArray(arr) || !arr.length) throw new Error('empty');
    arr.forEach(function (x) { D.food.push({ dt: U.date, n: String(x.name || 'Food') + (x.portion ? ' (' + x.portion + ')' : '') + ' [photo]', q: 1, d: [+x.kcal || 0, +x.protein || 0, +x.carbs || 0, +x.fat || 0] }); });
    r(); toast(arr.length + ' item add hue. Galat lage to edit kar lo.');
  }).catch(function () { U.err = 'Photo se calories nahi nikal paaye. Key ya model check karo, ya khud likho.'; draw(); });
}
function photoFood(file) {
  var rd = new FileReader();
  rd.onload = function () {
    var img = new Image();
    img.onload = function () {
      var sc = Math.min(1, 800 / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = R(img.width * sc); c.height = R(img.height * sc); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      callGemini(c.toDataURL('image/jpeg', 0.8).split(',')[1]);
    };
    img.onerror = function () { U.err = 'Photo khul nahi paayi.'; draw(); };
    img.src = rd.result;
  };
  rd.readAsDataURL(file);
}

/* ===== actions ===== */
function day(n) { var nd = ad(U.date, n); if (nd > TODAY) return; U.date = nd; U.fsum = 0; U.offOpen = 0; U.cy = pd(nd).getFullYear(); U.cm = pd(nd).getMonth(); r(); }
var H = {
  tab: function (v) { U.tab = v; U.sub = ''; U.cal = 0; U.fsum = 0; r(); },
  sub: function (v) { U.sub = v; U.cal = 0; r(); },
  back: function () { U.sub = ''; U.cal = 0; r(); },
  dprev: function () { day(-1); }, dnext: function () { day(1); },
  cal: function () { U.cal = U.cal ? 0 : 1; U.cy = pd(U.date).getFullYear(); U.cm = pd(U.date).getMonth(); r(); },
  cmn: function (v) { U.cm += +v; if (U.cm < 0) { U.cm = 11; U.cy--; } if (U.cm > 11) { U.cm = 0; U.cy++; } draw(); },
  pick: function (v) { U.date = v; U.fsum = 0; draw(); },
  calopen: function () { U.cal = 0; r(); },
  ofo: function () { U.offOpen = 1; draw(); }, ofr: function (v) { U.ofr = v; draw(); },
  ofrm: function () { delete D.off[U.date]; r(); },
  ofs: function () { var t = val('or'); if (U.ofr === 'Other' && !t) { U.err = 'Pehle reason likho'; draw(); return; } D.off[U.date] = { r: t || U.ofr }; U.offOpen = 0; r(); },
  newq: function () { pickQ(true); draw(); },
  lang: function (v) { D.lang = v; pickQ(false); draw(); },
  wint: function (v) { D.wint = +v; D.lastWater = Date.now(); draw(); },
  dis: function () { $('al').style.display = 'none'; },
  dark: function () { D.dark = D.dark ? 0 : 1; draw(); },
  test: function () { notify('Roz', 'Paani pi lo. Thoda paani piyo abhi.'); },
  notifreq: function () { if ('Notification' in window) Notification.requestPermission().then(function () { draw(); }); else toast('Is browser me notifications support nahi hain.', 'warn'); },
  fadd: function () { var v = val('fi'); if (!v) { U.err = 'Pehle likho kya khaya'; draw(); return; } addParsed(v); },
  fmic: function () {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { U.err = 'Is browser me voice input nahi hai. Chrome use karo.'; draw(); return; }
    var rc = new SR(); rc.lang = 'hi-IN'; rc.interimResults = false; rc.maxAlternatives = 1;
    rc.onresult = function (e) { var t = e.results[0][0].transcript; toast('Suna: ' + t); addParsed(t); };
    rc.onerror = function () { toast('Voice samajh nahi aayi. Dobara try karo.', 'warn'); };
    try { rc.start(); toast('Bolo... (jaise: do roti aur ek chai)'); } catch (e) { }
  },
  fphoto: function () { $('pf').value = ''; $('pf').click(); },
  fend: function () { U.fsum = 1; r(); }, fnew: function () { U.fsum = 0; r(); },
  cfsave: function () {
    var n = val('cfn'), q = +val('cfq') || 1, k = +val('cfk');
    if (!n || !k || k <= 0) { toast('Naam aur kcal daalo', 'warn'); return; }
    D.food.push({ dt: U.date, n: n, q: q, d: [k, +val('cfp') || 0, +val('cfc') || 0, +val('cff') || 0] });
    U.cfl.shift(); r();
  },
  cfcancel: function () { U.cfl.shift(); r(); },
  msub: function (v) { U.msub = v; draw(); },
  sstart: function () { var s = val('ss'); if (!s) { U.err = 'Subject ka naam likho'; draw(); return; } U.msub = s; begin({ mode: 'up', s: s }); },
  pstart: function () { var s = val('ps'), m = (+val('ph') || 0) * 60 + (+val('pm') || 0); if (!s) { U.err = 'Subject ka naam likho'; draw(); return; } if (m <= 0) { U.err = 'Time limit set karo (ghante ya minute)'; draw(); return; } U.msub = s; begin({ mode: 'down', s: s, lim: m }); },
  fstop: function () {
    var f = D.focus; if (!f) return; stopT(); unlock();
    var m = Math.max(1, R((Date.now() - f.t0) / 60000)), dt = ds(new Date(f.t0));
    D.study.push({ dt: dt, s: f.s, m: m, t: f.mode === 'up' ? 'Study' : 'Practice' }); D.focus = null; U.tab = 'study'; U.sub = ''; U.date = dt; r(); toast(hm(m) + ' save hua: ' + f.s);
  },
  fcancel: function () { stopT(); unlock(); D.focus = null; r(); },
  sadd: function () { var s = val('ms'), m = (+val('mh') || 0) * 60 + (+val('mm') || 0); if (!s) { U.err = 'Subject ka naam likho'; draw(); return; } if (m <= 0) { U.err = 'Ghante ya minute daalo'; draw(); return; } D.study.push({ dt: U.date, s: s, m: m, t: 'Manual' }); U.msub = s; r(); },
  edit: function (v) { U.edit = v; draw(); },
  ecancel: function () { U.edit = ''; draw(); },
  del: function (v) { var a = v.split(':'); D[a[0]].splice(+a[1], 1); r(); },
  esave: function () {
    var a = U.edit.split(':'), k = a[0], i = +a[1];
    if (k === 'food') { var q = +val('eq'); if (!q || q <= 0) { U.err = 'Sahi quantity daalo'; draw(); return; } D.food[i].q = q; }
    else if (k === 'study') { var s = val('es'); if (!s) { U.err = 'Subject khali nahi ho sakta'; draw(); return; } D.study[i].s = s; }
    else if (k === 'work') { var t = val('et'), m = (+val('eh') || 0) * 60 + (+val('em') || 0); if (!t || m <= 0) { U.err = 'Naam aur time daalo'; draw(); return; } D.work[i].t = t; D.work[i].m = m; }
    else if (k === 'exp') { var n = val('en2'), am = +val('ea2'); if (!am || am <= 0) { U.err = 'Sahi amount daalo'; draw(); return; } D.exp[i].n = n || 'Other'; D.exp[i].a = am; }
    r();
  },
  wtype: function (v) { U.wtype = v; draw(); },
  wadd: function () { var m = (+val('wh') || 0) * 60 + (+val('wmn') || 0); if (m <= 0) { U.err = 'Ghante ya minute daalo'; draw(); return; } D.work.push({ dt: U.date, t: U.wtype, m: m }); r(); },
  bset: function () { var b = +val('bi'); if (!b || b <= 0) { U.err = 'Budget daalo'; draw(); return; } D.budget = b; r(); },
  eadd: function () {
    var a = +val('ea'); if (!a || a <= 0) { U.err = 'Pehle amount daalo'; draw(); return; }
    var before = monthSpent() / D.budget; D.exp.push({ dt: U.date, a: a, n: val('en') || 'Other' }); var after = monthSpent() / D.budget; r();
    if (before < 1 && after >= 1) { showAlert('Budget khatam! Is mahine ka ₹' + D.budget + ' ka budget paar ho gaya.'); notify('Roz: budget', 'Mahine ka budget paar ho gaya.'); }
    else if (before < 0.8 && after >= 0.8) { showAlert('Dhyaan: budget ka 80% use ho gaya.'); notify('Roz: budget', 'Budget ka 80% use ho gaya.'); }
  },
  wtadd: function () { var w = +val('wi'); if (!w || w < 20 || w > 300) { U.err = 'Weight kg me daalo'; draw(); return; } D.wts = D.wts.filter(function (x) { return x.dt !== U.date; }); D.wts.push({ dt: U.date, w: w }); D.wts.sort(function (a, b) { return a.dt < b.dt ? -1 : 1; }); r(); },
  wr: function (v) { U.wr = +v; draw(); },
  rep: function (v) { U.rep = v; draw(); },
  fab: function () {
    if (D.sleeping) {
      var h = r1((Date.now() - D.sleeping) / 36e5);
      if (h < 0.5) { D.sleeping = 0; draw(); toast('30 min se kam tha, sleep cancel kar di.', 'warn'); return; }
      D.sleeping = 0; D.sleep.push({ dt: TODAY, h: h }); draw(); toast('Good morning! ' + h + ' ghante ki sleep save hui.');
    } else { D.sleeping = Date.now(); draw(); toast('Good night! Sleep time shuru.'); }
  },
  slsave: function () { var a = val('sb').split(':'), b = val('sw').split(':'); if (a.length < 2 || b.length < 2 || !val('sb') || !val('sw')) { U.err = 'Dono time chuno'; draw(); return; } var m = (+b[0] * 60 + +b[1]) - (+a[0] * 60 + +a[1]); if (m <= 0) m += 1440; D.sleep.push({ dt: U.date, h: R(m / 6) / 10 }); D.sleep.sort(function (x, y) { return x.dt < y.dt ? -1 : 1; }); r(); },
  gsave: function () { var c = +val('gcal'), s = +val('gst'), w = +val('gwk'), z = +val('gsl'); if (!c || !s || !w || !z) { toast('Saare goals daalo', 'warn'); return; } D.g = { cal: c, study: s, work: w, sleep: z }; draw(); toast('Goals save ho gaye.'); },
  gk: function () { D.gkey = val('gkey'); D.gmodel = val('gmodel') || 'gemini-2.5-flash'; draw(); toast('Key save ho gayi.'); },
  export: function () { var b = new Blob([JSON.stringify(D)], { type: 'application/json' }), a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'roz-backup-' + TODAY + '.json'; document.body.appendChild(a); a.click(); a.remove(); toast('Backup file download ho gayi.'); },
  import: function () { $('imp').value = ''; $('imp').click(); },
  install: function () { if (U.ip) { U.ip.prompt(); U.ip = null; draw(); } },
  reset: function () { if (confirm('Saara data delete ho jayega. Pakka?')) { try { localStorage.removeItem(KEY); } catch (e) { } location.reload(); } }
};

/* ===== background checks ===== */
function bgTick() {
  var now = Date.now(), nd = new Date(), h = nd.getHours();
  if (D.wint > 0 && h >= 8 && h < 22) {
    if (!D.lastWater) { D.lastWater = now; persist(); }
    if (now - D.lastWater >= D.wint * 3600000) { D.lastWater = now; persist(); notify('Roz: paani', 'Paani pi lo. Ek glass paani piyo.'); }
  }
  var dow = nd.getDay();
  if ((dow === 1 || dow === 4) && h >= 7 && D.lastWt !== TODAY && !wtd(TODAY)) { D.lastWt = TODAY; persist(); notify('Roz: weight', 'Aaj weight naapne ka din hai.'); }
}
function refreshDay() {
  var t = ds(new Date());
  if (t !== TODAY) { if (U.date === TODAY) U.date = t; TODAY = t; pickQ(false); if (!document.activeElement || document.activeElement.tagName !== 'INPUT') draw(); }
}

/* ===== events ===== */
document.addEventListener('click', function (e) {
  var t = e.target.closest ? e.target.closest('[data-a]') : null;
  if (t && H[t.dataset.a]) H[t.dataset.a](t.dataset.v);
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && e.target && e.target.dataset && e.target.dataset.e && H[e.target.dataset.e]) { e.preventDefault(); H[e.target.dataset.e](); }
});
$('pf').addEventListener('change', function () { if (this.files && this.files[0]) photoFood(this.files[0]); });
$('imp').addEventListener('change', function () {
  var f = this.files && this.files[0]; if (!f) return;
  var rd = new FileReader();
  rd.onload = function () {
    try { var j = JSON.parse(rd.result); if (!j || !Array.isArray(j.study) || !Array.isArray(j.food)) throw new Error('bad'); for (var k in j) D[k] = j[k]; D.focus = null; D.sleeping = 0; persist(); draw(); toast('Backup import ho gaya.'); }
    catch (e) { toast('Yeh sahi Roz backup file nahi hai.', 'bad'); }
  };
  rd.readAsText(f);
});
document.addEventListener('visibilitychange', function () { if (!document.hidden) { refreshDay(); bgTick(); if (D.focus) { lock(); tick(); } } });
window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); U.ip = e; });
$('bBell').setAttribute('data-a', 'test'); $('bDark').setAttribute('data-a', 'dark'); $('fab').setAttribute('data-a', 'fab');

/* ===== start ===== */
U.cy = pd(U.date).getFullYear(); U.cm = pd(U.date).getMonth();
pickQ(false);
draw();
if (D.focus) { TI = setInterval(tick, 1000); lock(); tick(); }
setInterval(bgTick, 60000); bgTick();
if ('serviceWorker' in navigator) { window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { }); }); }
