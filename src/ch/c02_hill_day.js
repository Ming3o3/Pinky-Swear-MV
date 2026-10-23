// c02_hill_day: 副歌一 (44–68). The hill stage v1 — white day, dandelions.
// Shots: approach 44.0 · warmth 46.99 · grow strong 49.04 · softness 53.10 · the ring 54.76 ·
//        years 58.77 · hands 61.0 · the long road 63.74.
(() => {
  // dandelion: stem + seed head of fluff; bend = wind sway
  function dandelion(x, y, s, t, bend = 0, seeds = 0) {
    push(); translate(x, y); rotate(bend * .3);
    inkLine([[0, 0], [0, -70 * s]], 3 * s, '#5E9648', 'ink', 0);
    inkLine([[0, -22 * s], [10 * s, -34 * s]], 1.5 * s, '#5E9648', 'ink', .2);
    push(); translate(0, -74 * s);
    if (seeds > 0) { // head bursting: seeds fly out
      for (let i = 0; i < 12; i++) {
        const a = hash(i * 3.3) * TAU, d = (30 + hash(i * 7.1) * 90) * easeOut(seeds);
        const sx = Math.cos(a) * d, sy = Math.sin(a) * d * .8 - seeds * 40;
        inkLine([[sx, sy], [sx + Math.cos(a) * 10, sy - 8]], 1, '#FFFDF4', 'inkfine', 0);
        paint(ellPts(sx + Math.cos(a) * 12, sy - 10, 4.5 * s, 3 * s, 6, 0, a), { wash: '#FFFDF4', washOp: 230, ink: null });
      }
    }
    const puff = 1 - seeds * .8;
    if (puff > .1) {
      for (let i = 0; i < 14; i++) { const a = i / 14 * TAU; inkLine([[0, 0], [Math.cos(a) * 26 * s * puff, Math.sin(a) * 26 * s * puff]], 1.1, '#EDEAE0', 'inkfine', 0); }
      paint(ellPts(0, 0, 30 * s * puff, 30 * s * puff, 18, 2), { wash: '#FFFDF4', washOp: 215, ink: null });
      paint(ellPts(0, 0, 15 * s * puff, 15 * s * puff, 12), { wash: '#F2EFE4', washOp: 200, ink: null });
    }
    pop();
    pop();
  }

  // wind streak
  function windStreak(x, y, len, t, ph) {
    const k = frac(t * .35 + ph);
    const x0 = x - len + k * len * 1.6;
    inkLine([[x0, y], [x0 + len * .3, y - 6], [x0 + len * .6, y], [x0 + len, y - 4]], 1.4, '#F6F3E8', 'ink', .6);
  }

  function day(pulseK = 0) {
    hillStage(T, { skyA: '#BFE0EE', skyB: '#D5EBE2', clouds: 3, flowers: 7, sun: { x: 1560, y: 210, r: 120 }, distant: true });
  }

  // =====================================================================================
  // 44.0–46.99 所以让我再靠近一点点 — the long walk up the hill
  // =====================================================================================
  function approach(t, lt) {
    const iv = ease(seg(t, 44, 44.55));                 // arrive through the ladle-drop
    if (iv < 1) iris(960, 540, lerp(60, 1500, iv), '#2A2331');
    const wk = seg(t, 44.1, 46.8);
    camBegin(960, 600, lerp(.98, 1.04, ease(lt / 3)), 0);
    day();
    // growing rings on the plateau mark each beat of the approach
    for (let i = 0; i < 3; i++) {
      const ph = frac(bpOf(t) / 4 + i / 3), r = 60 + ph * 420, a = (1 - ph) * 160;
      if (ph > .04 && ph < .96) paint(ellPts(1030, 700, r, r * .3, 26, 2), { wash: '#FFFDF4', washOp: a, ink: null });
    }
    xiaowen(1120, 688, 24, { ...move('idle', t), eyes: 'happy', mouth: 'smile', aR: 1 + .5 * Math.sin(bpOf(t) * Math.PI), lookX: -1, blush: true });
    const m = move('walk', t);
    xiaofan(lerp(360, 880, ease(wk)), lerp(920, 692, ease(wk)), 24, { ...m, eyes: 'happy', mouth: 'smile', lookX: 1, warm: .1, emote: wk > .92 ? 'heart' : null, emoteK: seg(t, 46.55, 46.8) });
    dandelion(300, 960, 1.5, t, Math.sin(t * 1.8) * .12);
    dandelion(1660, 860, 1.1, t, Math.sin(t * 1.5 + 2) * .12);
    camEnd();
  }

  // =====================================================================================
  // 46.99–49.04 因为你太温暖 — her glow, felt from an arm's length
  // =====================================================================================
  function warmth(t, lt) {
    camBegin(960, 620, 1.45 + pulse(t, 5) * .015, 0);
    day();
    // warmth rings pulsing out of 小温 on the beats
    for (let i = 0; i < 3; i++) {
      const ph = frac(bpOf(t) / 2 + i / 3), r = 80 + ph * 320;
      paint(ellPts(1120, 620, r, r, 26, 3), { fill: PAL.wenLt, fillOp: 110 * (1 - ph) * pulse(t, 2), bleed: .4, tex: .2, ink: null });
    }
    xiaowen(1120, 688, 26, { ...move('sway', t), eyes: 'crescent', mouth: 'smile', glow: 1, blush: true });
    xiaofan(820, 692, 25, { ...move('idle', t), eyes: 'happy', mouth: 'O', lookX: 1, blush: true, warm: .16,
      aR: 1.7, armR: (u, sw) => { paint(ellPts(u * .95, -.1 * u, u * .5, u * .42, 10, u * .04), { wash: PAL.fan, ink: PAL.ink, sw: sw * .7 }); } });
    // the colour of the world leans warm on each beat
    paint(rectPts(-400, -400, W + 800, H + 800), { fill: '#F2C14E', fillOp: 26 * pulse(t, 2.5), bleed: .3, tex: .2, ink: null });
    if (t < 47.4) letter('暖', 1150, 420, 90, PAL.ochre, { font: '90px MaShanZheng, WenKai', alpha: 1 - seg(t, 47.1, 47.5), rot: .06 });
    camEnd();
  }

  // =====================================================================================
  // 49.04–53.10 我会再变得坚强一点点 — he stands taller; flowers pop around him
  // =====================================================================================
  function stronger(t, lt) {
    const up = backOut(seg(t, 49.1, 49.9)), pop2 = seg(t, 51.9, 52.3);
    camBegin(960, 610, 1.3 + pop2 * .06, 0);
    day();
    xiaowen(1180, 690, 25, { ...move('bounce', t), eyes: 'happy', mouth: 'grin', aL: .9 + .4 * Math.sin(bpOf(t) * TAU), lookX: -1, glow: .8 });
    // 小凡 draws himself up to his full (small) height
    xiaofan(830, 692, 25, {
      dy: -up * 1.1, sq: -.12 * up, sx: 1 + up * .1, eyes: 'spark', mouth: 'grin', aL: .95, aR: .95, warm: .22, lookX: 1,
      ...move('idle', t, 3)
    });
    // flowers pop in a ring around him
    for (let i = 0; i < 7; i++) {
      const a = i / 7 * TAU + .4, t0 = 49.5 + i * .16;
      if (t < t0) break;
      const fx = 830 + Math.cos(a) * 150, fy = 692 + Math.sin(a) * 42, k = backOut(seg(t, t0, t0 + .3));
      push(); translate(fx, fy); scale(k);
      for (let p = 0; p < 5; p++) { const pa = p / 5 * TAU; paint(ellPts(Math.cos(pa) * 8, Math.sin(pa) * 8, 6, 6, 8), { wash: [PAL.rose, PAL.ochre, '#FFFDF4'][i % 3], washOp: 230, ink: null }); }
      paint(ellPts(0, 0, 4.5, 4.5, 8), { wash: PAL.ochre, ink: null });
      pop();
    }
    if (pop2 > 0 && pop2 < 1) sfx('锵', 830, 460, 72, PAL.ochre, t - 51.9, { life: .8, rot: -.1 });
    camEnd();
  }

  // =====================================================================================
  // 53.10–54.76 因为你太柔软 — wind, a dandelion, a pat on the head
  // =====================================================================================
  function softness(t, lt) {
    const zoom = lerp(1.5, 1.34, ease(lt / 1.7));
    camBegin(1000, 640, zoom, .012);
    day();
    for (let i = 0; i < 4; i++) windStreak(lerp(-100, 2100, hash(i * 3.3)), 240 + hash(i * 5.1) * 320, 260 + hash(i * 7) * 200, t, hash(i * 9));
    dandelion(1340, 900, 2.2, t, Math.sin(t * 2.2) * .22, seg(t, 53.9, 54.6));
    xiaowen(1030, 700, 27, { ...move('sway', t, 2), eyes: 'crescent', mouth: 'smile', blush: true, glow: .9, aR: 1.35, lookX: -1, rot: .04 });
    xiaofan(830, 705, 26, { ...move('sway', t), eyes: 'closed', mouth: 'smile', blush: true, warm: .26, rot: -.03, ahoge: .8 + Math.sin(t * 3) * .2 });
    camEnd();
  }

  // =====================================================================================
  // 54.76–58.77 交换无名指金色的契约 — the ring descends onto their raised pinkies
  // =====================================================================================
  function theRing(t, lt) {
    const lift = seg(t, 55, 55.7), drop = seg(t, 56.2, 56.95), on = seg(t, 56.95, 57.35), glow = seg(t, 57.3, 58.3);
    camBegin(960, 620, lerp(1.28, 1.42, lift) + glow * .04, 0);
    day();
    // they turn to each other, pinkies raised
    xiaofan(830, 700, 27, { eyes: 'happy', mouth: 'smile', blush: true, warm: .3, aR: lerp(.3, 1.5, ease(lift)), pinkyR: true, lookX: 1, ...move('idle', t) });
    xiaowen(1100, 698, 27, { flip: true, eyes: 'crescent', mouth: 'smile', blush: true, glow: 1, aL: lerp(.3, 1.5, ease(lift)), pinkyL: true, lookX: 1, ...move('idle', t, 1) });
    // the ring spins down between them and settles on the hooked pinkies
    const RX = 965, RY = lerp(-80, 590, easeOut(drop)) - lift * 0;
    ringProp(RX, lerp(120, 560, easeOut(drop)), 1.15, { rot: drop < 1 ? t * 7 : .18, flat: drop >= 1, glow: .4 * ease(glow) + (drop > .9 ? 1 : 0), spark: pulse(t, 3) * glow, holeCol: drop >= 1 ? '#F2C9A0' : PAL.paper });
    if (drop > .92 && drop < 1) flash(.5 * (1 - seg(t, 56.85, 57.25)), '#F7D98C');
    if (drop > .95 && t < 57.5) { sfx('叮—', 965, 330, 84, PAL.ochre, t - 56.97, { life: 1.1, rot: .1 }); }
    if (glow > .3) for (let i = 0; i < 8; i++) {
      const a = hash(i * 3.7) * TAU + t, r = (150 + hash(i) * 200) * glow;
      paint(starPts(RX + Math.cos(a) * r, 560 + Math.sin(a) * r * .7, 10 * glow, .45, 4), { wash: '#FFF6D8', fill: PAL.ochre, fillOp: 100, ink: PAL.ink, sw: .6 });
    }
    camEnd();
  }

  // =====================================================================================
  // 58.77–61.0 给彼此岁月 — a golden ribbon of days encircles them: suns and moons drifting
  // along a loop that wraps the pair (back half behind them, front half in front); the ring
  // stays on their hooked pinkies.
  // =====================================================================================
  function years(t, lt) {
    const loopK = seg(t, 58.95, 60.4);
    camBegin(960, 600, 1.16, 0);
    day();
    xiaofan(850, 700, 26, { eyes: 'crescent', mouth: 'smile', blush: true, warm: .34, aR: 1.2, pinkyR: true, lookX: 1, ...move('idle', t) });
    xiaowen(1075, 698, 26, { flip: true, eyes: 'crescent', mouth: 'smile', blush: true, aL: 1.2, pinkyL: true, lookX: 1, glow: 1, ...move('idle', t, 1) });
    // pinky thread + the ring resting on the hooked pinkies
    redThread([912, 642], [1016, 640], t, { sag: .1, sw: 2.4, glow: .6 });
    ringProp(964, 648, .55, { rot: .15, flat: true, glow: .7, spark: pulse(t, 2), holeCol: '#F2C9A0' });
    // the ribbon of days: golden loop around the pair, sun and moon tokens riding it
    const CXr = 962, CYr = 618, RXr = 425, RYr = 115, ph = t * .22;
    const loopPt = a => [CXr + Math.cos(a) * RXr, CYr + Math.sin(a) * RYr + Math.sin(ph + a) * 4];
    // contiguous polyline runs of the drawn portion, split by front/back
    const runs = [];
    let cur = null, curBack = null;
    const N = 72;
    for (let i = 0; i <= N * loopK; i++) {
      const a = Math.PI / 2 + (i / N) * TAU;
      const p = loopPt(a), back = Math.sin(a) < 0;
      if (cur === null || back !== curBack) { if (cur && cur.length > 1) runs.push([cur, curBack]); cur = [p]; curBack = back; }
      else cur.push(p);
    }
    if (cur && cur.length > 1) runs.push([cur, curBack]);
    for (const [pts, back] of runs) {
      inkLine(pts, back ? 2.6 : 4, back ? mixCol(PAL.gold, PAL.cream, .35) : PAL.gold, 'ink', .5);
      if (!back) inkLine(pts, 1.4, '#FFF3D0', 'ink', .5);
    }
    // sun / moon tokens pop as the ribbon passes them
    const TOK = [[.06, 'sun'], [.22, 'moon'], [.39, 'sun'], [.56, 'moon'], [.73, 'sun'], [.9, 'moon']];
    for (const [u, kind] of TOK) {
      const k = backOut(seg(loopK, u, u + .1)); if (k < .02) continue;
      const a = Math.PI / 2 + u * TAU, [tx, ty] = loopPt(a), back = Math.sin(a) < 0, r = (back ? 10 : 14) * k;
      push(); translate(tx, ty);
      if (kind === 'sun') {
        paint(ellPts(0, 0, r, r, 12, 1), { wash: PAL.ochre, washOp: back ? 200 : 245, ink: PAL.ink, sw: .8 });
        for (let q = 0; q < 6; q++) { const qa = q / 6 * TAU + t; inkLine([[Math.cos(qa) * (r + 3), Math.sin(qa) * (r + 3)], [Math.cos(qa) * (r + 8), Math.sin(qa) * (r + 8)]], 1.2, PAL.ochre, 'inkfine', 0); }
      } else {
        paint(ellPts(0, 0, r, r, 14, 1), { wash: '#F3EBD3', washOp: back ? 200 : 245, ink: PAL.ink, sw: .8 });
        paint(ellPts(r * .32, -r * .3, r * .2, r * .18, 8), { wash: '#D8CBA6', washOp: 140, ink: null });
      }
      pop();
    }
    petalRain(t, { n: 16, kind: 'petal', cols: ['#F5B8C4', '#F7D98C', '#FFFDF4'], wind: .8, fall: .9, area: [-100, -100, W + 200, 800] });
    // the paper troupe cheers at the hill's edge
    for (let i = 0; i < 4; i++) paperDoll(240 + i * 90 + (i % 2) * 500, i % 2 ? 980 : 1010, 9, t, { ph: i * 1.3, cheer: true });
    if (t < 59.4) letter('给彼此 · 岁月', 960, 300, 64, '#8A6B2A', { font: '64px MaShanZheng, WenKai', alpha: 1 - seg(t, 59, 59.45) });
    camEnd();
  }

  // =====================================================================================
  // 61.0–63.74 说好从今以后都牵着手 — step in, pinkies hook, hands clasp HIGH between them;
  // the ring sits on the clasp, the thread winds the wrists, and they bounce as one.
  // =====================================================================================
  function hands(t, lt) {
    const clasp = seg(t, 61.1, 61.75), tie = seg(t, 61.9, 62.9), rock = clamp(seg(t, 62.3, 62.9));
    camBegin(960, 600, 1.32, 0);
    day();
    const X1 = lerp(810, 850, ease(clasp)), X2 = lerp(1150, 1110, ease(clasp));
    // holding hands they bounce and sway as one body
    const hop = rock * Math.abs(Math.sin(bpOf(t) * Math.PI)) * .9;
    const rockA = rock * Math.sin(bpOf(t) * Math.PI) * .05;
    xiaofan(X1, 700 - hop, 27, { eyes: 'crescent', mouth: 'smile', blush: true, warm: .38, aR: lerp(.3, 1.25, ease(clasp)), pinkyR: clasp < .95, rot: rockA, lookX: 1 });
    xiaowen(X2, 698 - hop, 27, { flip: true, eyes: 'crescent', mouth: 'smile', blush: true, glow: 1, aL: lerp(.3, 1.25, ease(clasp)), pinkyL: clasp < .95, rot: rockA, lookX: 1 });
    // the clasp, drawn on top once their arms meet
    if (clasp > .8) {
      const ck = backOut(seg(t, 61.7, 62.05));
      const HX = 980, HY = lerp(600, 462, ck);
      push(); translate(0, -hop);
      // thread loops under the clasped hands, a visible red U
      if (tie > 0) redThread([952, 514], [1008, 512], t, { k: tie, sag: .5, sw: 1.8, glow: .5 });
      // two mittens clasped: his and hers, overlapping
      push(); translate(HX, HY); scale(ck);
      paint(ellPts(-16, 6, 30, 24, 12, 1.5), { wash: mixCol(PAL.fan, PAL.wen, .25), ink: PAL.ink, sw: 1.3 });
      paint(ellPts(16, -2, 30, 24, 12, 1.5), { wash: PAL.wen, ink: PAL.ink, sw: 1.3 });
      pop();
      // the ring sits on the clasped hands
      if (ck > .9) ringProp(HX, HY - 34, .42, { rot: .12, glow: .55 + pulse(t, 2) * .3, spark: pulse(t, 2) });
      // the bow pops on the knot
      if (tie > .55) {
        push(); translate(HX, HY + 26); scale(backOut(seg(t, 62.5, 62.9)));
        for (const s of [-1, 1]) paint([[0, 0], [s * 24, -14], [s * 28, 6]], { wash: '#E2476E', ink: PAL.ink, sw: .9, curv: .4 });
        paint(ellPts(0, 0, 6.5, 6.5, 10), { wash: '#C22747', ink: PAL.ink, sw: .8 });
        pop();
      }
      pop();
      if (clasp > .85 && t < 61.95) { sfx('牵', 980, 320, 84, PAL.rose, t - 61.55, { life: .8, rot: -.06 }); flash(.22 * (1 - seg(t, 61.6, 61.95)), '#F7D98C'); }
    }
    camEnd();
  }

  // =====================================================================================
  // 63.74–68 因为要走很远 — the road winds away over the ridge, narrowing to a tiny red flag
  // at its far end; the pair walks hand in hand at the start of it.
  // =====================================================================================
  function longRoad(t, lt) {
    const out = ease(seg(t, 63.8, 65.4)), road = seg(t, 64.4, 66.6), step = seg(t, 66.7, 67.6);
    camBegin(960, lerp(620, 570, out), lerp(1.38, .86, out), 0);
    day();
    // the road: from their feet it winds right in S-bends, over the ridge, narrowing into the distance
    const RP = [[1006, 700], [1105, 728], [1200, 704], [1295, 730], [1390, 696], [1485, 712], [1580, 668], [1665, 646]];
    const roadPts = k => { // sub-path up to arclength k, with widths tapering 26 -> 5
      const pts = [RP[0]]; let tot = 0;
      for (let i = 1; i < RP.length; i++) tot += Math.hypot(RP[i][0] - RP[i - 1][0], RP[i][1] - RP[i - 1][1]);
      const target = clamp(k) * tot; let acc = 0;
      for (let i = 1; i < RP.length; i++) {
        const seg2 = Math.hypot(RP[i][0] - RP[i - 1][0], RP[i][1] - RP[i - 1][1]);
        if (acc + seg2 >= target) { const f = (target - acc) / seg2; pts.push([lerp(RP[i - 1][0], RP[i][0], f), lerp(RP[i - 1][1], RP[i][1], f)]); break; }
        acc += seg2; pts.push(RP[i]);
      }
      return pts;
    };
    if (road > 0) {
      const pts = roadPts(road), left = [], right = [];
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i], q = pts[Math.min(i + 1, pts.length - 1)], o = pts[Math.max(i - 1, 0)];
        let dx = q[0] - o[0], dy = q[1] - o[1]; const L2 = Math.hypot(dx, dy) || 1; dx /= L2; dy /= L2;
        const w = lerp(17, 3.5, i / Math.max(1, pts.length - 1));
        left.push([p[0] - dy * w, p[1] + dx * w]);
        right.push([p[0] + dy * w, p[1] - dx * w]);
      }
      paint(left.concat(right.reverse()), { wash: '#E8D9B4', washOp: 245, fill: '#C9B37E', fillOp: 40, bleed: .08, tex: .4, ink: PAL.ink, sw: 1 });
      for (let i = 1; i < RP.length - 1; i++) { // centre dashes where the road has reached
        const acc = RP.slice(1, i + 1).reduce((s2, q, j) => s2 + Math.hypot(q[0] - RP[j][0], q[1] - RP[j][1]), 0);
        if (acc / 660 > road) break;
        paint(ellPts(RP[i][0], RP[i][1], 4.5, 3, 6, 1), { wash: '#B89B62', washOp: 150, ink: null });
      }
    }
    // the red pennant at the far end of the road, on the far hills
    if (road > .92) {
      const fk = backOut(seg(t, 66.15, 66.6)), E = RP[RP.length - 1], wv = Math.sin(t * 5) * 4;
      push(); translate(E[0], E[1]); scale(fk);
      inkLine([[0, 2], [0, -66]], 4, '#6E4A3A', 'ink', 0);
      paint([[0, -66], [58, -57 + wv], [44, -50 + wv * .5], [0, -42]], { wash: '#D8394E', ink: PAL.ink, sw: 1, curv: .3 });
      pop();
      if (fk > .9 && t < 66.9) paint(starPts(E[0] + 8, E[1] - 76, 8 + 14 * pulse(t, 2), .45, 4), { wash: '#FFF6D8', fill: PAL.ochre, fillOp: 90, ink: null });
    }
    // the pair at the start of the road, walking hand in hand
    xiaowen(1094, 692, 22, { flip: true, eyes: 'crescent', mouth: 'smile', glow: .9, blush: true, aL: -.5, ...move(step > 0 ? 'walk' : 'idle', t, 1) });
    xiaofan(920, 694, 22, { eyes: 'crescent', mouth: 'smile', warm: .4, blush: true, aR: -.5, ...move(step > 0 ? 'walk' : 'idle', t) });
    // one clear two-tone clasp swinging gently between them — no ribbon clutter at this distance
    const ckk = backOut(seg(t, 63.9, 64.3));
    push(); translate(1006, 638 + Math.sin(bpOf(t) * Math.PI) * 3); scale(ckk);
    paint(ellPts(-12, 2, 21, 17, 12, 1.2), { wash: PAL.fan, ink: PAL.ink, sw: 1 });
    paint(ellPts(12, -2, 21, 17, 12, 1.2), { wash: PAL.wen, ink: PAL.ink, sw: 1 });
    pop();
    if (t > 67.4) { const k = seg(t, 67.4, 68); paint(rectPts(-400, -400, W + 800, H + 800), { fill: '#F6E9C8', fillOp: 90 * k, bleed: .25, ink: null }); }
    camEnd();
  }

  chapter('hill_day', 44, 68, [
    [44.0, approach], [46.99, warmth], [49.04, stronger], [53.10, softness],
    [54.76, theRing], [58.77, years], [61.0, hands], [63.74, longRoad]
  ]);
})();
