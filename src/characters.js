// characters.js: 小凡 (the grey-blue "ordinary me") and 小温 (the golden "warm you").
// Blocky watercolor mascots in the Clawd tradition: `u` is the body unit, (x, y) the ground point between the feet.
//
// Body-local coords (o.draw hook): body spans x -3.9u..3.9u, y -7.3u..-1.9u; eyes at ±1.75u, -5.9u; mouth -4.35u.
//   Arms pivot at (±3.75u, -6.2u), 2.1u long; arm hooks are called at the arm TIP in arm space (x outward).
//   o.pinkyL / o.pinkyR draw a little extended pinky at that arm's tip — the pinky-promise hands.
//
// kid options: kind 'fan'|'wen' (via xiaofan/xiaowen), eyes, lookX/lookY, mouth, blush, warm (fan: 0 grey → 1 golden),
//   glow (wen ambient light), ahoge (fan hair sprout perk 0..1), aL/aR (+pinkyL/pinkyR), dy/sq/take/rot/flip/sx,
//   walk, sit, noLegs, noShadow, emote/emoteK, seed, draw/armL/armR hooks.

function kid(x, y, u, kind, o = {}) {
  const dy = (o.dy || 0) * u, sq = (o.sq || 0) + (o.take || 0);
  const sw = clamp(u / 15, .45, 2.4) * (o.swMul || 1), J = u * .07;
  const warm = clamp(o.warm ?? 0);
  // warmth mixes late and gently: stays unmistakably blue through the mid-song values;
  // the "glowing" of the finale is carried by the gold halo, not by turning the body gold
  const wk = Math.pow(warm, 3) * .4;
  let col, dk, lt;
  if (kind === 'wen') { col = o.col || PAL.wen; dk = o.dk || PAL.wenDk; lt = o.lt || PAL.wenLt; }
  else { col = o.col || mixCol(PAL.fan, PAL.wen, wk); dk = o.dk || mixCol(PAL.fanDk, PAL.wenDk, wk); lt = o.lt || mixCol(PAL.fanLt, PAL.wenLt, wk); }

  if (!o.noShadow) {
    const f = 1 - Math.min(.5, Math.abs(o.dy || 0) * .06);
    paint(ellPts(x, y + u * .13, u * 4.1 * f, u * .85 * f, 22), { fill: PAL.ink, fillOp: 85, bleed: .25, tex: .3, border: .1, ink: null });
  }
  if (kind === 'wen' || warm > .55) {
    const g = kind === 'wen' ? (o.glow ?? .7) : (warm - .55) / .45 * .8;
    if (g > .02) paint(ellPts(x, y + dy - 4.6 * u, u * 6.6, u * 6.2, 26), { fill: PAL.wenLt, fillOp: 46 * g, bleed: .3, tex: .2, border: .1, ink: null });
  }

  push();
  translate(x, y + dy);
  if (o.rot) rotate(o.rot);
  scale((o.flip ? -1 : 1) * (o.sx ?? 1) * (kind === 'wen' ? 1.04 : 1) * (1 + sq * .55), (o.sy ?? 1) * (1 - sq));

  // legs
  if (o.sit) {
    paint(ellPts(0, -1.1 * u, 2.9 * u, .9 * u, 18, J * .5), { wash: dk, washOp: 255, ink: PAL.ink, sw: sw * .8 });
  } else if (!o.noLegs) [-1.5, 1.5].forEach((lx, i) => {
    let h = 1.9;
    if (o.walk != null) { const ph = Math.sin((o.walk + (i ? .5 : 0)) * TAU); if (ph > 0) h = 1.9 - ph * .8; }
    paint(rrPts(lx * u - .48 * u, -2.2 * u, .96 * u, h * u + .3 * u, .4 * u, J * .5), { wash: dk, washOp: 255, ink: PAL.ink, sw: sw * .8 });
  });

  // arms (pinkyL/pinkyR add the little promise finger at the tip, hooks still run after it)
  const arm = (side, a, pinky, hook) => {
    push(); translate(side * 3.75 * u, -6.2 * u); rotate(side < 0 ? a : -a);
    paint(rrPts(side < 0 ? -2.1 * u : 0, -.45 * u, 2.1 * u, .9 * u, .42 * u, J * .5), { wash: col, washOp: 255, fill: dk, fillOp: 55, tex: .5, ink: PAL.ink, sw: sw * .8 });
    if (pinky) {
      paint(ellPts(side * 2.05 * u, 0, .42 * u, .42 * u, 10), { wash: lt, ink: PAL.ink, sw: sw * .6 });
      inkLine([[side * 2.3 * u, -.1 * u], [side * 2.62 * u, -.5 * u], [side * 2.4 * u, -.85 * u]], sw * .75, PAL.ink, 'ink', .4);
    }
    if (hook) { translate(side * 2.1 * u, 0); if (side < 0) scale(-1, 1); hook(u, sw); }
    pop();
  };
  arm(-1, o.aL ?? .15, o.pinkyL, o.armL); arm(1, o.aR ?? .15, o.pinkyR, o.armR);

  // body: soft rounded block, light pool on top, darker settle below, ink outline last
  const body = rrPts(-3.9 * u, -7.3 * u, 7.8 * u, 5.4 * u, 1.7 * u, J);
  paint(body, { wash: col, washOp: 255, ink: null });
  paint(ellPts(-.9 * u, -6.2 * u, 2.7 * u, 1.15 * u, 18, J * 2, -.08), { fill: lt, fillOp: 115, bleed: .2, tex: .85, border: .8, ink: null });
  paint(ellPts(0, -3.55 * u, 2.35 * u, 1.05 * u, 18, J), { fill: lt, fillOp: warm > .3 || kind === 'wen' ? 90 : 45, bleed: .15, tex: .8, border: .6, ink: null });   // belly
  paint(rectPts(-3.7 * u, -3.1 * u, 7.4 * u, 1.2 * u, J), { fill: dk, fillOp: 95, bleed: .03, tex: .7, border: .5, ink: null });
  paint(body, { ink: PAL.ink, sw });

  // hair sprout (小凡) or curl (小温)
  if (kind === 'fan') {
    const pk = o.ahoge ?? .5;
    inkLine([[0, -7.25 * u], [.4 * u, (-7.9 - pk * 1.15) * u], [(1.0 + pk * .3) * u, (-8.2 - pk * 1.5) * u]], sw * 1.15, dk, 'ink', .6);
    inkLine([[-.2 * u, -7.25 * u], [-.75 * u, (-7.8 - pk * .7) * u]], sw * .9, dk, 'ink', .5);
  } else {
    const sp = []; for (let i = 0; i < 10; i++) { const a = -2.4 + i * .42, r = (.55 - i * .04) * u; sp.push([.4 * u + Math.cos(a) * r + i * .1 * u, -7.6 * u + Math.sin(a) * r - i * .12 * u]); }
    inkLine(sp, sw * 1.05, dk, 'ink', .8);
  }

  if (o.blush) for (const bx of [-2.6, 2.6]) paint(ellPts(bx * u, -4.9 * u, u * .72, u * .34, 12), { fill: PAL.blush, fillOp: 150, bleed: .25, ink: null });
  face(u, kind, o, sw);
  if (o.draw) o.draw(u, sw);
  pop();
  if (o.emote) emote(o.emote, x + (o.flip ? -1 : 1) * 4.3 * u, y + dy - 8.6 * u, u * .85, o.emoteK ?? 1);
}

function xiaofan(x, y, u, o = {}) { kid(x, y, u, 'fan', o); }
function xiaowen(x, y, u, o = {}) { kid(x, y, u, 'wen', { glow: .7, ...o }); }

// ---------- faces ----------
function face(u, kind, o, sw) {
  const e = o.eyes || (kind === 'wen' ? 'happy' : 'normal');
  const sqz = clamp(o.squint || 0);
  const blink = e === 'normal' && ((T * .85 + (o.seed || 0) * 1.7) % 3.4) < .11;
  if (sqz > .8) { for (const ex of [-1.75, 1.75]) inkLine([[ex * u - .35 * u, -5.9 * u], [ex * u + .35 * u, -5.9 * u]], sw, PAL.ink, 'ink', 0); return; }
  if (sqz > 0) { push(); translate(0, -5.9 * u); scale(1 + sqz * .18, 1 - sqz); translate(0, 5.9 * u); }
  for (const ex of [-1.75, 1.75]) {
    const X = ex * u, Y = -5.9 * u, cx = X;
    if (e === 'normal' || e === 'look') {
      const lx = e === 'look' ? (o.lookX || 0) * u * .38 : 0, ly = e === 'look' ? (o.lookY || 0) * u * .3 : 0;
      if (blink) inkLine([[X - .38 * u, Y + .1 * u], [X + .38 * u, Y + .1 * u]], sw, PAL.ink, 'ink', 0);
      else {
        paint(ellPts(cx + lx, Y + .1 * u + ly, u * .48, u * .58, 14), { wash: PAL.ink, ink: null });
        if (u > 9) paint(ellPts(cx + lx + .15 * u, Y - .1 * u + ly, u * .16, u * .2, 8), { wash: PAL.cream, washOp: 235, ink: null });
      }
    } else if (e === 'happy') inkLine([[X - .42 * u, Y + .28 * u], [cx, Y - .32 * u], [X + .42 * u, Y + .28 * u]], sw * 1.35, PAL.ink, 'ink', .5);
    else if (e === 'crescent') {
      inkLine([[X - .45 * u, Y + .22 * u], [cx, Y - .34 * u], [X + .45 * u, Y + .22 * u]], sw * 1.45, PAL.ink, 'ink', .5);
      inkLine([[X - .3 * u, Y + .34 * u], [cx, Y + .02 * u], [X + .3 * u, Y + .34 * u]], sw * .5, PAL.ink, 'inkfine', .5);
    } else if (e === 'closed') inkLine([[X - .4 * u, Y - .12 * u], [cx, Y + .34 * u], [X + .4 * u, Y - .12 * u]], sw * 1.25, PAL.ink, 'ink', .5);
    else if (e === 'wink') { if (ex < 0) inkLine([[X - .42 * u, Y + .28 * u], [cx, Y - .32 * u], [X + .42 * u, Y + .28 * u]], sw * 1.35, PAL.ink, 'ink', .5); else paint(ellPts(cx, Y + .1 * u, u * .48, u * .58, 14), { wash: PAL.ink, ink: null }); }
    else if (e === 'wide') {
      paint(ellPts(cx, Y + .05 * u, u * .62, u * .7, 16), { wash: PAL.cream, ink: PAL.ink, sw: sw * .55 });
      paint(ellPts(cx + (o.lookX || 0) * u * .2, Y + .15 * u, u * .3, u * .36, 12), { wash: PAL.ink, ink: null });
    } else if (e === 'spark') {
      paint(ellPts(cx, Y + .05 * u, u * .95, u * .95, 18), { fill: PAL.ochre, fillOp: 90, bleed: .3, ink: null });
      paint(starPts(cx, Y + .05 * u, u * .85 * (1 + .1 * Math.sin(T * 13 + ex)), .48, 5), { wash: PAL.cream, fill: PAL.ochre, fillOp: 80, ink: PAL.ink, sw: sw * .5 });
    } else if (e === 'heart') paint(heartPts(cx, Y + .05 * u, u * .55), { wash: '#E2476E', ink: PAL.ink, sw: sw * .5 });
    else if (e === 'dot') paint(ellPts(cx, Y + .05 * u, u * .3, u * .38, 12), { wash: PAL.ink, ink: null });
    else if (e === 'x') { inkLine([[X - .3 * u, Y - .3 * u], [X + .3 * u, Y + .4 * u]], sw, PAL.ink, 'ink', 0); inkLine([[X + .3 * u, Y - .3 * u], [X - .3 * u, Y + .4 * u]], sw, PAL.ink, 'ink', 0); }
    if (e === 'tears') paint([[cx + .5 * u, Y + .5 * u], [cx + .72 * u, Y + 1.1 * u], [cx + .45 * u, Y + 1.35 * u], [cx + .3 * u, Y + .8 * u]], { wash: PAL.sky, fill: '#FFFFFF', fillOp: 70, ink: PAL.ink, sw: sw * .45, curv: .6 });
  }
  if (sqz > 0) pop();
  mouth(u, o.mouth || (kind === 'wen' ? 'smile' : 'flat'), sw);
}

function mouth(u, m, sw) {
  if (!m) return;
  if (m === 'o') paint(ellPts(0, -4.45 * u, u * .34, u * .4, 12), { wash: '#6A2A35', ink: PAL.ink, sw: sw * .5 });
  else if (m === 'O') paint(ellPts(0, -4.35 * u, u * .62, u * .72, 14), { wash: '#6A2A35', ink: PAL.ink, sw: sw * .6 });
  else if (m === 'smile') inkLine([[-.62 * u, -4.6 * u], [0, -4.1 * u], [.62 * u, -4.6 * u]], sw * .85, PAL.ink, 'ink', .6);
  else if (m === 'grin') paint([[-1.05 * u, -4.7 * u], [1.05 * u, -4.7 * u], [.72 * u, -3.9 * u], [-.72 * u, -3.9 * u]], { wash: '#6A2A35', ink: PAL.ink, sw: sw * .55, curv: .4 });
  else if (m === 'flat') inkLine([[-.55 * u, -4.4 * u], [.55 * u, -4.4 * u]], sw * .8, PAL.ink, 'ink', 0);
  else if (m === 'wobble') inkLine([[-.75 * u, -4.4 * u], [-.38 * u, -4.7 * u], [0, -4.4 * u], [.38 * u, -4.7 * u], [.75 * u, -4.4 * u]], sw * .7, PAL.ink, 'ink', .3);
  else if (m === 'cat') inkLine([[-.8 * u, -4.5 * u], [-.4 * u, -4.05 * u], [0, -4.5 * u], [.4 * u, -4.05 * u], [.8 * u, -4.5 * u]], sw * .7, PAL.ink, 'ink', .5);
}

// ---------- emotes ----------
function emote(kind, x, y, s, k = 1) {
  const p = backOut(k); if (p < .02) return;
  if (kind === 'zzz') { letter('z', x, y, s * 2, PAL.ink, { pop: k * 3 }); letter('z', x + s * 1.5, y - s * 1.7, s * 1.5, PAL.ink, { pop: k * 3 - .3 }); return; }
  if (kind === '!' || kind === '?' || kind === '!?' || kind === '!!') { letter(kind, x, y, s * 3.2, kind.includes('?') ? PAL.sky : PAL.ochre, { pop: k * 1.5, rot: .1 }); return; }
  push(); translate(x, y); scale(p);
  const sw = clamp(s / 15, .4, 2);
  if (kind === 'sweat') {
    for (const [dx, dy, r] of [[0, 0, 1], [1.5, 1.3, .7]]) paint([[dx * s, (dy - 1.6 * r) * s], [(dx + .9 * r) * s, (dy + .2) * s], [dx * s, (dy + .9 * r) * s], [(dx - .9 * r) * s, (dy + .2) * s]], { wash: PAL.sky, fill: '#FFFFFF', fillOp: 60, ink: PAL.ink, sw: sw * .6, curv: .7 });
  } else if (kind === 'spark' || kind === 'sparkle') {
    paint(starPts(0, 0, 1.6 * s, .45, 4), { wash: PAL.cream, fill: PAL.ochre, fillOp: 80, ink: PAL.ink, sw: sw * .5 });
    paint(starPts(1.9 * s, 1.2 * s, .8 * s, .45, 4), { wash: PAL.ochre, ink: PAL.ink, sw: sw * .4 });
  } else if (kind === 'heart') {
    paint(heartPts(0, 0, s * 1.8), { wash: '#E2476E', fill: PAL.rose, fillOp: 90, ink: PAL.ink, sw: sw * .6 });
  } else if (kind === 'flower') {
    for (let i = 0; i < 5; i++) { const a = i / 5 * TAU - Math.PI / 2; paint(ellPts(Math.cos(a) * s * .85, Math.sin(a) * s * .85, s * .62, s * .62, 10), { wash: PAL.rose, fill: '#E2476E', fillOp: 60, ink: PAL.ink, sw: sw * .45 }); }
    paint(ellPts(0, 0, s * .45, s * .45, 10), { wash: PAL.ochre, ink: PAL.ink, sw: sw * .45 });
  } else if (kind === 'music') {
    paint(ellPts(0, 1.2 * s, .7 * s, .5 * s, 12, 0, -.3), { wash: PAL.ink, ink: null });
    inkLine([[.6 * s, 1.1 * s], [.6 * s, -1.6 * s], [1.6 * s, -1 * s]], sw * .8, PAL.ink, 'ink', 0);
  } else if (kind === 'note') {
    letter('♪', x ? 0 : 0, 0, s * 2.6, PAL.violet, { screen: false });
  } else if (kind === 'swirl') {
    const sp = []; for (let i = 0; i < 18; i++) { const a = i * .6 + T * 5, r = i * .09 * s; sp.push([Math.cos(a) * r, Math.sin(a) * r]); } inkLine(sp, sw * .7, PAL.violet, 'inkfine', .6);
  }
  pop();
}

// Mood timeline: keys = [[t0, eyes, emote?], ...]. Around each change the face squints and the body takes.
function mood(t, keys) {
  let i = 0; while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  const [t0, eyes, em] = keys[i], age = t - t0, nextIn = i + 1 < keys.length ? keys[i + 1][0] - t : 9;
  let squint = 0, take = 0;
  if (i > 0 && age < .16) { squint = 1 - age / .16; take = -.12 * Math.sin(age / .16 * Math.PI); }
  if (nextIn < .08) squint = Math.max(squint, 1 - nextIn / .08);
  if (i > 0 && age >= .16 && age < .4) take = .09 * Math.sin((age - .16) / .24 * Math.PI) * (1 - (age - .16) / .24);
  return { eyes, squint, take, emote: em, emoteK: em ? seg(age, .05, .3) * (1 - seg(age, 1.4, 1.7)) : 0 };
}

// Dance moves, softened for an 85 BPM ballad: gentler dy/sq than P(doom), calm arm lines.
function move(style, t, seed = 0) {
  const bp = bpOf(t), bi = Math.floor(bp), bf = bp - bi, hit = Math.max(0, 1 - bf * 3.5), s1 = Math.sin(bp * Math.PI), ab = Math.abs(s1);
  const o = { dy: 0, sq: 0, aL: .15, aR: .15, rot: 0, walk: null, sx: 1, dx: 0 };
  if (style === 'mix') style = ['bounce', 'sway', 'wave', 'skip', 'hop', 'twirl'][(Math.floor(bp / 8) + seed) % 6];
  switch (style) {
    case 'idle': o.dy = -ab * .45; o.sq = hit * .05; o.aL = .15 + .06 * s1; o.aR = .15 - .06 * s1; break;
    case 'bounce': o.dy = -ab * 1.1; o.sq = hit * .1; o.aL = .35 + s1 * .7; o.aR = .35 - s1 * .7; break;
    case 'hop': o.dy = -ab * 2.5; o.sq = hit * .14; o.aL = o.aR = .25 + ab * .95; break;
    case 'sway': o.dx = s1 * 2.4; o.rot = s1 * .1; o.aL = .4 + .55 * s1; o.aR = .4 - .55 * s1; o.sq = hit * .06; break;
    case 'wave': o.dy = -ab * .8; o.aL = .95 + .45 * Math.sin(bp * TAU * 2); o.aR = -.15; o.sq = hit * .06; break;
    case 'walk': o.walk = bp / 2; o.dy = -ab * .5; o.aL = .28 * s1; o.aR = -.28 * s1; break;
    case 'skip': o.walk = bp / 1.6; o.dy = -ab * 1.7; o.sq = hit * .1; o.aL = .5 + .5 * s1; o.aR = .5 - .5 * s1; o.rot = .045 * s1; break;
    case 'run': o.walk = bp * 1.4; o.dy = -Math.abs(Math.sin(bp * TAU)) * 1.1; o.aL = .7 * Math.sin(bp * TAU * 1.5); o.aR = -o.aL; o.rot = -.07; break;
    case 'twirl': { const ph = (((bi % 8) + 8) % 8 === 7) ? bf : 0; o.sx = Math.cos(ph * TAU); o.dy = -Math.sin(ph * Math.PI) * 2 - ab * .5; o.aL = o.aR = .5 + ph; o.sq = hit * .08; break; }
    case 'shimmy': o.dx = Math.sin(bp * TAU * 2) * .5; o.rot = Math.sin(bp * TAU * 2) * .04; o.aL = .7 + .35 * Math.sin(bp * TAU * 2); o.aR = .7 - .35 * Math.sin(bp * TAU * 2); o.dy = -ab * .4; break;
  }
  return o;
}
function fanDancer(x, y, u, style, t, extra = {}) { const m = move(style, t, extra.seed || 0); xiaofan(x + m.dx * u, y, u, { ...m, ...extra }); }
function wenDancer(x, y, u, style, t, extra = {}) { const m = move(style, t, extra.seed || 0); xiaowen(x + m.dx * u, y, u, { ...m, ...extra }); }
