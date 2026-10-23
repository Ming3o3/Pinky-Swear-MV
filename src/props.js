// props.js: the recurring set pieces of 《勾指起誓》. All coordinates are world space (1920×1080).
//
// hillStage(t, o)  → chorus set: sky, distant hills, the big grassy hill (plateau top ≈ y 660, centre x 960).
//   o: { top, bot } hill greens · skyA/skyB sky wash · backdrop(t) replaces the sky entirely
//   · sun { x, y, r, col } · moon { x, y, r } · stars n · clouds n · flowers n · dawn 0..1 warm horizon band
//   · mist 0..1 soft ground fog · threadGlow …scene-specific extras are drawn by the chapter between Back and Front? (no front layer: hill is one call)
// theatreCurtains(t, o) → red side curtains + valance; o.curtain 0 open → 1 closed (c00 / c08).
// deskScene(t, o) → the writing desk under warm lamp light; big letter paper, envelope, pencil, ink pot (c00 / c08).
//   o: { paperX, paperY, rot } letter placement · o.flat true skips lamp pool · o.seal 0..1 wax seal pressed on the paper
// redThread(a, b, t, o) → the fate thread from point a to point b (arrays). o: { k draw-on, sag, glow, bow, sw, col }.
// ringProp(x, y, s, o) → the oversized gold ring. o: { rot, glow, spark 0..1 }.
// scrollProp(x, y, s, o) → the golden contract scroll. o: { unroll 0..1, seal 0..1, rot }.
// waxSeal(x, y, s, o) → red wax seal with the pinky-hook monogram. o: { k press 0..1, col }.
// paperDoll / paperCrane → the paper troupe. petalRain(t, o) → falling particles. starField(t, o) → night sky.
// hillPath(a→b optional) drawn by chapters.

const CURTAIN = '#B8323F', CURTAIN_DK = '#7A1C2B', GOLD = '#E8B23A', WOOD = '#B87A4B', WOOD_DK = '#7C4A2C';

// ---------- chorus hill ----------
function hillStage(t, o = {}) {
  if (o.backdrop) o.backdrop(t);
  else {
    paint(rectPts(-400, -400, W + 800, 1100), { wash: o.skyA || '#BFE0EE', washOp: 255, ink: null });
    if (o.skyB) paint(rectPts(-400, 200, W + 800, 480), { wash: o.skyB, washOp: 200, ink: null });
  }
  if (o.stars) starField(t, { n: o.stars, ...o });
  if (o.dawn > .01) paint(rectPts(-400, 380, W + 800, 300), { fill: o.dawnCol || PAL.ochre, fillOp: 105 * clamp(o.dawn), bleed: .25, tex: .4, ink: null });
  if (o.sun) {
    const s = o.sun, k = s.k ?? 1;
    paint(ellPts(s.x, s.y, (s.r || 130) * 1.5, (s.r || 130) * 1.5, 26, 3), { fill: s.col || '#F7D98C', fillOp: 70 * k, bleed: .35, tex: .2, ink: null });
    paint(ellPts(s.x, s.y, s.r || 130, s.r || 130, 30, 2), { wash: s.col || '#F7D98C', washOp: 250 * k, fill: '#F2B95A', fillOp: 80 * k, tex: .5, ink: null });
  }
  if (o.moon) {
    const m = o.moon;
    paint(ellPts(m.x, m.y, m.r * 1.5, m.r * 1.5, 24, 3), { fill: '#F3EBD3', fillOp: 55, bleed: .3, ink: null });
    paint(ellPts(m.x, m.y, m.r, m.r, 28, 1.5), { wash: '#F3EBD3', washOp: 245, fill: PAL.ochre, fillOp: 35, tex: .4, ink: PAL.ink, sw: 1.1 });
    paint(ellPts(m.x - m.r * .28, m.y - m.r * .3, m.r * .22, m.r * .18, 10), { wash: '#D8CBA6', washOp: 140, ink: null });
    paint(ellPts(m.x + m.r * .3, m.y + m.r * .25, m.r * .15, m.r * .12, 10), { wash: '#D8CBA6', washOp: 120, ink: null });
  }
  if (o.clouds) for (let i = 0; i < o.clouds; i++) {
    const cw = 260 + hash(i * 3.3) * 240, cx = frac(hash(i * 7.1) + t * .008 * (0.5 + hash(i))) * (W + cw + 400) - cw / 2 - 200;
    const cy = 120 + hash(i * 5.7) * 260, p = [];
    for (let k = 0; k <= 12; k++) { const q = k / 12, a = Math.PI + q * Math.PI, b = 1 + .18 * Math.abs(Math.sin(q * Math.PI * 3 + i)); p.push([cx + Math.cos(a) * cw * .5 * b, cy + Math.sin(a) * cw * .26 * b]); }
    p.push([cx + cw * .5, cy + 4], [cx - cw * .5, cy + 4]);
    paint(p, { wash: '#FFFDF4', washOp: 210, ink: null, curv: .6 });
  }
  // distant hills
  const dh = o.distant === undefined ? true : o.distant;
  if (dh) {
    paint([[ -400, 760 ], [150, 560 + jit(4)], [430, 700], [700, 620], [980, 740], [1300, 600 + jit(4)], [1620, 720], [1920, 620], [2320, 780], [2320, 1200], [-400, 1200]],
      { wash: o.distCol || '#9CC4A2', washOp: 235, fill: '#C4DECB', fillOp: 60, bleed: .2, tex: .5, ink: null, curv: .5 });
  }
  // the hill: wide mound, flat-ish stage plateau on top
  const top = o.top || '#8FBF6F', bot = o.bot || '#5E9648';
  const hill = [[-420, 1080]];
  for (let i = 0; i <= 26; i++) { const q = i / 26, x = lerp(-420, 2340, q); hill.push([x, 664 + Math.pow((x - 960) / 1380, 2) * 430 + Math.sin(x * .006) * 12 + jit(3)]); }
  hill.push([2340, 1080]);
  paint(hill, { wash: top, washOp: 255, fill: bot, fillOp: 85, bleed: .12, tex: .65, border: .55, ink: PAL.ink, sw: 1.4, curv: .5 });
  // light pool on the plateau + tufts of grass
  paint(ellPts(960, 700, 480, 60, 20, 3), { fill: '#C4E39A', fillOp: 80, bleed: .3, tex: .5, ink: null });
  for (let i = 0; i < 26; i++) {
    const gx = lerp(-200, 2120, hash(i * 11.3)), gy = 700 + Math.pow((gx - 960) / 1380, 2) * 430 + hash(i * 4.7) * 300;
    if (gy > 1040) continue;
    const sway = Math.sin(t * 1.7 + i) * 3;
    inkLine([[gx, gy], [gx + sway, gy - 14 - hash(i) * 8]], .8, bot, 'inkfine', .4);
  }
  if (o.flowers) for (let i = 0; i < o.flowers; i++) {
    const fx = lerp(120, 1800, hash(i * 13.7)), fy = 730 + Math.pow((fx - 960) / 1380, 2) * 430 + hash(i * 6.1) * 260;
    if (fy > 1020) continue;
    const c = [PAL.rose, PAL.ochre, '#FFFDF4'][i % 3], bob = Math.sin(t * 2 + i * 2.2) * 3;
    inkLine([[fx, fy], [fx + bob, fy - 26]], .9, bot, 'inkfine', .3);
    for (let p = 0; p < 5; p++) { const a = p / 5 * TAU + i; paint(ellPts(fx + bob + Math.cos(a) * 6, fy - 26 + Math.sin(a) * 6, 5, 5, 8), { wash: c, washOp: 220, ink: null }); }
    paint(ellPts(fx + bob, fy - 26, 3.5, 3.5, 8), { wash: PAL.ochre, ink: null });
  }
  if (o.mist > .01) paint(rectPts(-400, 560, W + 800, 520), { fill: '#F6F0E2', fillOp: 60 * clamp(o.mist), bleed: .4, tex: .2, ink: null });
}

// ---------- theatre curtains ----------
function theatreCurtains(t, o = {}) {
  const k = clamp(o.curtain || 0);
  const drape = (side) => {
    const edge = side < 0 ? lerp(255, 985, k) : lerp(1665, 935, k), outer = side < 0 ? -80 : W + 80;
    const tie = k < .05, pts = [];
    for (let i = 0; i <= 10; i++) {
      const y = -20 + i * 112, gather = tie && y > 380 && y < 740 ? -Math.sin((y - 380) / 360 * Math.PI) * 120 : 0;
      pts.push([edge + side * gather + Math.sin(i * 1.7 + t * 2) * 6, y]);
    }
    pts.push([outer, 1130], [outer, -20]);
    if (side > 0) pts.reverse();
    paint(pts, { wash: CURTAIN, washOp: 255, ink: PAL.ink, sw: 1.5 });
    const w = Math.abs(edge - outer), nf = Math.max(3, Math.round(w / 90));
    for (let f = 1; f < nf; f++) {
      const fx = lerp(outer, edge, f / nf), top = [];
      for (let i = 0; i <= 6; i++) { const y = i * 185, g = tie && y > 380 && y < 740 ? -Math.sin((y - 380) / 360 * Math.PI) * 120 * f / nf : 0; top.push([fx + side * g + Math.sin(i + f) * 8, y]); }
      inkLine(top, .8, CURTAIN_DK, 'inkfine', .5);
    }
    if (tie) paint(rrPts(edge - side * 120 - 40, 544, 80, 32, 14), { wash: GOLD, ink: PAL.ink, sw: .8 });
  };
  drape(-1); drape(1);
  const v = [[-80, -40], [W + 80, -40]];
  for (let i = 12; i >= 0; i--) { const x = i * 160; v.push([x + 80, 118 + jit(2)]); v.push([x, 92]); }
  paint(v, { wash: CURTAIN, washOp: 255, ink: PAL.ink, sw: 1.5 });
  const fr = []; for (let i = 0; i <= 24; i++) fr.push([i * 80, i % 2 ? 106 : 96]);
  inkLine(fr, 1.2, GOLD, 'ink', .3);
}

// ---------- the writing desk (prelude / finale) ----------
function deskScene(t, o = {}) {
  paint(rectPts(-400, -400, W + 800, H + 800), { wash: o.wall || '#E9D9BC', washOp: 255, ink: null });
  // lamp pool on the wall
  if (!o.flat) paint(ellPts(960, 300, 700, 420, 24, 4), { fill: '#F7E9C4', fillOp: 110, bleed: .35, tex: .3, ink: null });
  // window with night outside (upper right)
  if (!o.noWindow) {
    push(); translate(1600, 190); rotate(.03);
    paint(rrPts(-150, -120, 300, 240, 10), { wash: o.night ? '#2C3257' : '#324069', washOp: 255, ink: null });
    for (let i = 0; i < 7; i++) paint(ellPts(-120 + hash(i * 3.1) * 280, -100 + hash(i * 5.3) * 200, 3, 3, 8), { wash: '#F3EBD3', washOp: 200, ink: null });
    if (o.night && o.moonInWindow) paint(ellPts(60, -50, 34, 34, 18), { wash: '#F3EBD3', washOp: 230, ink: null });
    paint(rrPts(-150, -120, 300, 240, 10), { ink: PAL.ink, sw: 1.4 });
    inkLine([[0, -120], [0, 120]], 1.6, PAL.ink, 'ink', 0);
    inkLine([[-150, 0], [150, 0]], 1.6, PAL.ink, 'ink', 0);
    pop();
  }
  // desk top with soft front edge
  paint([[-420, 660 + jit(3)], [W / 2, 645 + jit(3)], [W + 420, 660 + jit(3)], [W + 420, 1120], [-420, 1120]],
    { wash: WOOD, washOp: 255, fill: WOOD_DK, fillOp: 55, bleed: .08, tex: .7, border: .5, ink: PAL.ink, sw: 1.4 });
  for (let i = -6; i <= 6; i++) inkLine([[960 + i * 230, 660], [960 + i * 260, 1120]], .55, WOOD_DK, 'inkfine', 0);
  // envelope under the paper
  const px = o.paperX ?? 920, py = o.paperY ?? 640, pr = o.rot ?? -.03;
  push(); translate(px + 210, py + 160); rotate(.06);
  paint(rectPts(-190, -120, 560, 260, 6), { wash: '#E3B768', washOp: 255, fill: '#B27E33', fillOp: 45, tex: .55, ink: PAL.ink, sw: 1.3 });
  paint([[-190, -120], [90, 40], [370, -120]], { wash: '#D3A44F', washOp: 255, ink: PAL.ink, sw: 1.1, curv: .3 });
  pop();
  // the letter paper
  push(); translate(px, py); rotate(pr);
  const wob = Math.sin(t * 1.3) * 2;
  paint(rectPts(-380, -260 + wob * .3, 760, 520, 8), { wash: '#FFFDF4', washOp: 255, ink: PAL.ink, sw: 1.5 });
  for (let i = 1; i < 8; i++) inkLine([[-340, -260 + i * 62], [340, -260 + i * 62 + jit(1.5)]], .5, '#B9C6D8', 'inkfine', 0);
  // handwriting squiggles (two "paragraphs")
  for (let r = 0; r < 3; r++) {
    const y = -190 + r * 62, len = 300 - r * 40;
    for (let x = -340; x < -340 + len; x += 26) inkLine([[x, y + jit(2)], [x + 15, y + 6 + jit(2)], [x + 26, y - 2 + jit(2)]], 1.5, '#4A5A78', 'inkfine', .7);
  }
  // a small doodle: two stick figures and a heart
  if (!o.noDoodle) {
    push(); translate(150, 30); scale(.9);
    inkLine([[-40, 40], [-40, 0], [-40, -14]], 1.6, PAL.ink, 'inkfine', 0);
    paint(ellPts(-40, -26, 12, 12, 8), { wash: PAL.fan, washOp: 255, ink: PAL.ink, sw: 1 });
    inkLine([[0, 40], [0, 0], [0, -14]], 1.6, PAL.ink, 'inkfine', 0);
    paint(ellPts(0, -26, 12, 12, 8), { wash: PAL.wen, washOp: 255, ink: PAL.ink, sw: 1 });
    inkLine([[-30, -6], [-10, -6]], 1.2, PAL.ink, 'inkfine', 0);
    paint(heartPts(-15, -34, 8), { wash: PAL.rose, ink: PAL.ink, sw: .8 });
    pop();
  }
  if (o.writing) { // the pencil hovers, a fresh squiggle grows
    const k = clamp(o.writing);
    const y = -190 + 3 * 62;
    for (let x = -340; x < -340 + 300 * k; x += 26) inkLine([[x, y + jit(2)], [x + 15, y + 6 + jit(2)], [x + 26, y - 2 + jit(2)]], 1.5, '#4A5A78', 'inkfine', .7);
  }
  if (o.seal > .01) waxSeal(230, 170, .8, { k: o.seal, rot: .12 });
  pop();
  // pencil + ink pot on the desk
  if (!o.noTools) {
    push(); translate(px + 470, py + 320); rotate(1.25);
    paint(rectPts(-110, -7, 220, 14, 4), { wash: PAL.ochre, ink: PAL.ink, sw: 1 });
    paint([[-110, -7], [-140, 0], [-110, 7]], { wash: '#4A5A78', ink: PAL.ink, sw: .8 });
    paint(rectPts(96, -7, 30, 14, 2), { wash: PAL.rose, ink: PAL.ink, sw: .8 });
    pop();
    push(); translate(px - 480, py + 300);
    paint(rrPts(-38, -60, 76, 90, 12), { wash: '#5E7A96', washOp: 255, fill: '#31506B', fillOp: 60, tex: .5, ink: PAL.ink, sw: 1.2 });
    paint(ellPts(0, -60, 38, 12, 14), { wash: '#22374A', ink: PAL.ink, sw: 1 });
    pop();
  }
}

// ---------- the red thread of fate ----------
function redThread(a, b, t, o = {}) {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
  const sag = o.sag ?? .18, d = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const sway = Math.sin(t * 2.2 + a[0] * .01) * 5;
  const c = [mx + sway, my + d * sag + sway * .5];
  const pts = []; for (let i = 0; i <= 16; i++) { const u = i / 16, iu = 1 - u; pts.push([iu * iu * a[0] + 2 * iu * u * c[0] + u * u * b[0], iu * iu * a[1] + 2 * iu * u * c[1] + u * u * b[1]]); }
  const k = o.k ?? 1;
  if (o.glow > .01) inkLine(partial(pts, k), 7, 'rgba(216,57,78,1)', 'ink', .5);
  inkLine(partial(pts, k), o.sw ?? 2.4, o.col || '#D8394E', 'ink', .5);
  inkLine(partial(pts, k), (o.sw ?? 2.4) * .4, '#F2A283', 'ink', .5);
  if (o.bow > .01) { // a little ribbon bow at the midpoint
    const bk = backOut(o.bow), q = pts[8];
    push(); translate(q[0], q[1]); rotate(Math.sin(t * 1.5) * .1); scale(bk);
    for (const s of [-1, 1]) paint([[0, 0], [s * 26, -16], [s * 30, 6]], { wash: '#E2476E', ink: PAL.ink, sw: .9, curv: .4 });
    paint(ellPts(0, 0, 7, 7, 10), { wash: '#C22747', ink: PAL.ink, sw: .8 });
    pop();
  }
  return pts;
}

// ---------- the golden ring ----------
function ringProp(x, y, s, o = {}) {
  const r = 62 * s;
  push(); translate(x, y); rotate(o.rot || 0); scale(1, o.flat ? .38 : 1);
  if (o.glow > .01) paint(ellPts(0, 0, r * 1.9, r * 1.9, 22, 3), { fill: PAL.gold, fillOp: 95 * o.glow, bleed: .35, tex: .2, ink: null });
  paint(ellPts(0, 0, r, r, 30, 1.5), { wash: PAL.gold, washOp: 255, fill: PAL.goldDk, fillOp: 70, tex: .5, ink: PAL.ink, sw: clamp(1.2 * s, .6, 2) });
  paint(ellPts(0, 0, r * .55, r * .55, 24, 1), { wash: o.holeCol || PAL.paper, washOp: 255, ink: PAL.ink, sw: clamp(.9 * s, .5, 1.6) });
  inkLine([[-r * .55, -r * .5], [-r * .2, -r * .75]], clamp(.8 * s, .5, 1.4), '#FFF3D0', 'inkfine', .4);
  pop();
  if (o.spark > .01) {
    const a = T * 3, sx = x + Math.cos(a) * r * 1.15 * (o.flat ? 1 : 1), sy = y + Math.sin(a) * r * 1.15 * (o.flat ? .38 : 1);
    paint(starPts(sx, sy, 16 * s * o.spark, .42, 4), { wash: '#FFF6D8', fill: PAL.ochre, fillOp: 90, ink: PAL.ink, sw: .7 });
  }
}

// ---------- the golden contract scroll ----------
function scrollProp(x, y, s, o = {}) {
  push(); translate(x, y); rotate(o.rot || 0); scale(s);
  const w = 560 * clamp(o.unroll ?? 1), sw = 1.3;
  if (w > 30) {
    paint(rectPts(-w / 2, -170, w, 340, 6), { wash: '#F7ECC8', washOp: 255, ink: PAL.ink, sw: 1.5 });
    for (let r = 0; r < 3; r++) { const ry = -90 + r * 80; for (let qx = -w / 2 + 50; qx < w / 2 - 90; qx += 40) inkLine([[qx, ry + jit(2)], [qx + 22, ry + 7 + jit(2)], [qx + 40, ry - 2 + jit(2)]], 2, '#8A6B2A', 'inkfine', .7); }
  }
  for (const sd of [-1, 1]) { // rods
    push(); translate(sd * w / 2, 0);
    paint(rrPts(-14, -205, 28, 410, 12, 2), { wash: PAL.gold, washOp: 255, fill: PAL.goldDk, fillOp: 60, tex: .5, ink: PAL.ink, sw });
    paint(ellPts(0, -205, 16, 16, 10), { wash: PAL.goldDk, ink: PAL.ink, sw });
    paint(ellPts(0, 205, 16, 16, 10), { wash: PAL.goldDk, ink: PAL.ink, sw });
    pop();
  }
  if (o.seal > .01) waxSeal(0, 90, .75, { k: o.seal });
  pop();
}

// ---------- wax seal ----------
function waxSeal(x, y, s, o = {}) {
  const k = o.k ?? 1, col = o.col || '#B3372F';
  push(); translate(x, y); rotate(o.rot || 0); scale(backOut(k));
  paint(starPts(0, 0, 66, .92, 12, 0), { wash: col, washOp: 255, fill: '#7E1F1C', fillOp: 60, tex: .6, ink: PAL.ink, sw: 1.2 });
  paint(ellPts(0, 0, 46, 46, 24, 1), { wash: '#C9483F', washOp: 200, ink: PAL.ink, sw: .9 });
  // monogram: two hooked pinkies (勾)
  inkLine([[-20, -18], [-2, -22], [4, -4], [-8, 8], [-22, 2]], 3.2, '#F2D8B8', 'ink', .6);
  inkLine([[20, -6], [8, -20], [-6, -14], [-4, 4], [12, 16], [24, 8]], 3.2, '#F2D8B8', 'ink', .6);
  paint(ellPts(-22, -26, 10, 6, 8, 0, -.7), { wash: '#F0A99B', washOp: 150, ink: null });
  pop();
}

// ---------- the paper troupe ----------
function paperDoll(x, y, s, t, o = {}) {
  const bp = bpOf(t), dy = -Math.abs(Math.sin(bp * Math.PI + (o.ph || 0))) * 1.4;
  const J = s * .06;
  push(); translate(x, y + dy * s); if (o.rot) rotate(o.rot); scale(o.flip ? -1 : 1, 1);
  paint(ellPts(0, .2 * s, s * 2.6, s * .4, 10), { wash: PAL.ink, washOp: 45, ink: null });
  paint(rrPts(-1.6 * s, -4.6 * s, 3.2 * s, 4 * s, s * .8, J), { wash: '#FFFBEE', washOp: 250, fill: '#E4D6B0', fillOp: 35, tex: .45, ink: PAL.ink, sw: clamp(s * .12, .5, 1.3) });
  for (const sd of [-1, 1]) { // stub arms, raised when dancing
    const a = sd * (o.cheer ? .9 : .25);
    push(); translate(sd * 1.5 * s, -3.8 * s); rotate(a);
    paint(rectPts(sd < 0 ? -1.3 * s : 0, -.25 * s, 1.3 * s, .5 * s, J), { wash: '#FFFBEE', ink: PAL.ink, sw: clamp(s * .1, .5, 1) });
    pop();
  }
  paint(rectPts(-1.15 * s, -.6 * s, .85 * s, 1.5 * s, J), { wash: '#F4E9CC', ink: PAL.ink, sw: clamp(s * .1, .5, 1) });
  paint(rectPts(.3 * s, -.6 * s, .85 * s, 1.5 * s, J), { wash: '#F4E9CC', ink: PAL.ink, sw: clamp(s * .1, .5, 1) });
  for (const ex of [-.55, .55]) paint(ellPts(ex * s, -3.3 * s, s * .14, s * .18, 8), { wash: PAL.ink, ink: null });
  inkLine([[-.3 * s, -2.7 * s], [0, -2.5 * s], [.3 * s, -2.7 * s]], clamp(s * .08, .4, .9), PAL.ink, 'inkfine', .5);
  pop();
}

function paperCrane(x, y, s, t, o = {}) {
  const flap = o.flap === undefined ? Math.sin(t * 5 + (o.ph || 0)) : o.flap;
  push(); translate(x, y); rotate(o.rot || Math.sin(t * 2 + (o.ph || 0)) * .08); scale(o.flip ? -1 : 1, 1);
  // body + tail
  paint([[-s * 1.5, s * .45], [s * 1.1, s * .1], [s * 1.5, s * .8], [s * .2, s * .55]], { wash: '#FFFBEE', washOp: 250, fill: '#E4D6B0', fillOp: 35, tex: .4, ink: PAL.ink, sw: clamp(s * .12, .5, 1.2), curv: .3 });
  // neck + head
  paint([[s * .9, s * .2], [s * 1.9, -s * .5], [s * 2.15, -s * .42], [s * 1.55, s * .05]], { wash: '#FFFBEE', ink: PAL.ink, sw: clamp(s * .1, .5, 1.1), curv: .3 });
  paint(ellPts(s * 1.98, -s * .5, s * .2, s * .16, 8), { wash: '#FFFBEE', ink: PAL.ink, sw: clamp(s * .09, .4, 1) });
  // wings (flap)
  const wy = -flap * s * .9;
  paint([[0, s * .2], [-s * .5, -s * 1.6 + wy], [s * .4, s * .1]], { wash: '#F4E9CC', ink: PAL.ink, sw: clamp(s * .1, .5, 1.1), curv: .3 });
  inkLine([[0, s * .1], [-s * .1, -s * 1.2 + wy]], .5, '#C9B88C', 'inkfine', 0);
  pop();
}

// ---------- particles ----------
// petalRain(t, { n, cols, kind: 'petal'|'snow'|'leaf'|'spark', wind, fall, area: [x, y, w, h], op })
function petalRain(t, o = {}) {
  const n = o.n ?? 24, kind = o.kind || 'petal', [ax, ay, aw, ah] = o.area || [-100, -100, W + 200, H + 200];
  for (let i = 0; i < n; i++) {
    const sp = .6 + hash(i * 3.7) * .9, drift = Math.sin(t * .8 * sp + i * 2.1) * 60;
    const x = ax + frac(hash(i * 7.9) + t * .01 * sp * (o.wind ?? 1)) * (aw + 200) - 100 + drift;
    const y = ay + frac(hash(i * 5.3) * .7 + t * .045 * sp * (o.fall ?? 1)) * (ah + 200) - 100;
    const rot = t * (1 + hash(i)) * (hash(i * 9.1) > .5 ? 1 : -1) + i;
    const s = 5 + hash(i * 2.1) * 8, c = (o.cols || ['#F5B8C4', '#E27A92', '#F7D4DC'])[i % (o.cols || [1]).length];
    push(); translate(x, y); rotate(rot);
    if (kind === 'snow') paint(ellPts(0, 0, s * .8, s * .8, 8), { wash: '#FFFFFF', washOp: (o.op ?? 220), ink: null });
    else if (kind === 'spark') paint(starPts(0, 0, s, .45, 4), { wash: '#FFF6D8', fill: PAL.ochre, fillOp: 90, ink: null });
    else if (kind === 'leaf') paint([[0, -s], [s * .7, 0], [0, s], [-s * .7, 0]], { wash: c, washOp: (o.op ?? 235), ink: PAL.ink, sw: .55, curv: .5 });
    else paint(ellPts(0, 0, s, s * .55, 8), { wash: c, washOp: (o.op ?? 235), ink: PAL.ink, sw: .55 });
    pop();
  }
}

// ---------- night sky ----------
function starField(t, o = {}) {
  const n = o.n ?? 40;
  for (let i = 0; i < n; i++) {
    const x = hash(i * 3.1 + (o.seed || 0)) * (W + 200) - 100, y = hash(i * 8.7 + (o.seed || 0) * 1.7) * (o.h || 560);
    const tw = .45 + .55 * Math.sin(t * (1.5 + hash(i) * 2) + i * 2.4), s = 1.5 + hash(i * 1.3) * 2.5;
    paint(ellPts(x, y, s, s, 6), { wash: '#F3EBD3', washOp: 235 * clamp(tw + .3), ink: null });
    if (i % 9 === 0 && tw > .75) { inkLine([[x - s * 3.2, y], [x + s * 3.2, y]], .7, '#F3EBD3', 'inkfine', 0); inkLine([[x, y - s * 3.2], [x, y + s * 3.2]], .7, '#F3EBD3', 'inkfine', 0); }
  }
}

// shooting star: from (x0,y0), flies along dir for life seconds
function shootStar(t, t0, x0, y0, ang, life = .9, len = 260) {
  const k = (t - t0) / life; if (k < 0 || k > 1) return;
  const head = [x0 + Math.cos(ang) * len * k, y0 + Math.sin(ang) * len * k];
  const tail = [head[0] - Math.cos(ang) * len * .45 * (1 - k * .5), head[1] - Math.sin(ang) * len * .45 * (1 - k * .5)];
  inkLine([tail, head], 2.6, '#F3EBD3', 'ink', 0);
  inkLine([lerp(tail[0], head[0], .3), lerp(tail[1], head[1], .3)], 1.2, '#FFFDF4', 'inkfine', 0);
  paint(ellPts(head[0], head[1], 4, 4, 8), { wash: '#FFFDF4', ink: null });
}
