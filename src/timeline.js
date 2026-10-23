// timeline.js: chapter registry, brush-wipe chapter breaks, karaoke (Chinese, per-character).
//
// Each chapter file calls chapter(name, start, end, shots) where shots = [[t0, fn], ...] in time order.
// A shot function is called as fn(t, lt, dur): t = song time, lt = t - t0, dur = shot length. It paints the whole frame
// (backgrounds included) and must be a pure function of t: frames render in parallel and out of order.

const CH = [];
function chapter(name, start, end, shots) { CH.push({ name, start, end, shots }); CH.sort((a, b) => a.start - b.start); }

// Chapter breaks that get a brush wipe (cover by the boundary, reveal after it).
const WIPES = [21, 68, 89, 132, 158];
const WIPE_TR = .3;
const WIPE_COLS = [
  ['#C9A868', '#E5C98F'],   // → C1 信纸米黄
  ['#7FA06B', '#A8C489'],   // → C3 出发青绿
  ['#54648F', '#8B9CC9'],   // → C4 夜地图蓝紫
  ['#C97B52', '#E0A25B'],   // → C6 四季
  ['#E0884F', '#F2B95A']    // → C7 日出金橙
];

function drawWorld(t) {
  const ch = CH.find(c => t >= c.start && t < c.end);
  if (!ch) placeholder(t);
  else {
    let i = 0; while (i + 1 < ch.shots.length && t >= ch.shots[i + 1][0]) i++;
    const t0 = ch.shots[i][0], end = i + 1 < ch.shots.length ? ch.shots[i + 1][0] : ch.end;
    ch.shots[i][1](t, t - t0, end - t0);
    CAM = null;
  }
  flushLetters();
  WIPES.forEach((b, j) => { if (Math.abs(t - b) < WIPE_TR) wipe((t - (b - WIPE_TR)) / (2 * WIPE_TR), j); });
  karaoke(t);
}

function placeholder(t) {
  paint(ellPts(960, 460, 520, 260, 30, 20), { fill: PAL.sky, fillOp: 90, bleed: .3, ink: null });
  letter('(章节未绘制)', 960, 440, 60, PAL.ink, { ink: false });
  xiaofan(960, 900, 16, { warm: warmthAt(t), ...move('idle', t) });
}

// ---------- brush wipe ----------
// Fat paint strokes sweep across to cover the old scene, the scene swaps under full cover (p = .5), then they drag off.
function wipe(p, idx) {
  const [c1, c2] = WIPE_COLS[idx % WIPE_COLS.length], n = 5, bh = (H + 420) / n + 40;
  push(); translate(W / 2, H / 2); rotate(-.1); translate(-W / 2, -H / 2);
  for (let i = 0; i < n; i++) {
    const y0 = -230 + i * (H + 420) / n, d = [0, .14, .06, .18, .1][i];
    const q = p < .5 ? easeOut(clamp((p * 2 - d) / (1 - d))) : ease(clamp(((p - .5) * 2 - d) / (1 - d)));
    const x0 = p < .5 ? -300 : lerp(-300, W + 400, q), x1 = p < .5 ? lerp(-300, W + 400, q) : W + 400;
    if (x1 - x0 < 30) continue;
    const pts = [], rag = (k, side) => side * (40 + 50 * hash(i * 31 + k)) + jit(12);
    for (let k = 0; k <= 8; k++) pts.push([lerp(x0, x1, k / 8), y0 + Math.sin(k * .9 + i) * 14 + jit(5)]);
    for (let k = 1; k < 9; k++) pts.push([x1 + rag(k, 1) - 40, y0 + bh * k / 9]);
    for (let k = 8; k >= 0; k--) pts.push([lerp(x0, x1, k / 8), y0 + bh + Math.sin(k * .8 + i * 2) * 14 + jit(5)]);
    if (p >= .5) for (let k = 8; k > 0; k--) pts.push([x0 - rag(k + 20, 1) + 40, y0 + bh * k / 9]);
    paint(pts, { wash: i % 2 ? c1 : c2, washOp: 255, fill: i % 2 ? c2 : c1, fillOp: 70, bleed: .05, tex: .8, border: .6, ink: null,
      hatch: { d: 44, a: 0, o: { rand: .6, gradient: .5 }, b: 'charcoal', c: i % 2 ? c2 : PAL.cream, w: .8 } });
  }
  pop();
}

// ---------- karaoke ----------
const KFONT = '52px WenKai, "Kaiti SC", sans-serif';
function karaoke(t) {
  const L = LY.find(l => t >= l[0] && t < l[1]); if (!L) return;
  const [a, b, txt] = L;
  outX.font = KFONT;
  const tw = outX.measureText(txt).width, grow = easeOut((t - a) / .18) * (1 - ease((t - (b - .12)) / .12));
  if (grow < .02) return;
  const w = (tw + 110) * grow, x0 = 960 - w / 2, y0 = 978;
  const pts = [[x0 + jit(8), y0 + jit(4)], [x0 + w / 2, y0 - 4 + jit(4)], [x0 + w + jit(8), y0 + jit(4)], [x0 + w + 14 + jit(8), y0 + 44], [x0 + w + jit(8), y0 + 88 + jit(4)], [x0 + w / 2, y0 + 92 + jit(4)], [x0 + jit(8), y0 + 88 + jit(4)], [x0 - 14 + jit(8), y0 + 44]];
  paint(pts, { wash: PAL.ink, washOp: 225, fill: PAL.rose, fillOp: 60, tex: .7, border: .4, ink: null });
  KARAOKE = { a, b, txt, grow };
}
function drawKaraokeText(c) {
  if (!KARAOKE || KARAOKE.grow < .85) return;
  const { a, b, txt } = KARAOKE, t = T;
  c.font = KFONT; c.textBaseline = 'middle'; c.textAlign = 'left';
  const chars = [...txt], ws = chars.map(ch => c.measureText(ch).width);
  const total = ws.reduce((p, q) => p + q, 0);
  const singDur = Math.min(b - a - .1, .45 + chars.length * .33), sung = clamp((t - a) / singDur) * chars.length;
  let x = 960 - total / 2, done = 0; const y = 1022;
  chars.forEach((ch, i) => {
    const f = clamp((sung - i)); done += 1;
    c.fillStyle = PAL.cream; c.fillText(ch, x, y);
    if (f > 0) { c.save(); c.beginPath(); c.rect(x - 3, y - 42, ws[i] * f + 3, 84); c.clip(); c.fillStyle = PAL.ochre; c.fillText(ch, x, y); c.restore(); }
    x += ws[i];
  });
}
