// c04_map: 主歌二 (89–112). Eight night vignettes in indigo and silver.
// Shots: origami range 89 · the mark 93 · the dividing line 95 · joined 98.08 · a thousand glances 100 ·
//        pious hands 104 · everything, spiralling 105.89 · my world 109.
(() => {
  const NIGHT = '#2C3257', NIGHT2 = '#373E66', SILVER = '#C7D4E4';

  // a snow-capped paper mountain; k = pop
  function mountain(x, y, s, k, col = '#5E6899', snow = '#E8ECF4') {
    const p = backOut(k); if (p < .02) return;
    push(); translate(x, y); scale(p);
    paint([[-s, 0], [0, -s * 1.35], [s, 0]], { wash: col, washOp: 255, fill: '#464F7C', fillOp: 45, tex: .5, ink: PAL.ink, sw: 1.2, curv: .15 });
    paint([[-s * .3, -s * .95], [0, -s * 1.35], [s * .3, -s * .95], [s * .12, -s * .82], [0, -s * .95], [-s * .12, -s * .8]], { wash: snow, washOp: 240, ink: null });
    pop();
  }

  // =====================================================================================
  // 89–93 你是我万水千山的冒险 — a folded map unfolds into a mountain range
  // =====================================================================================
  function range(t, lt) {
    const iv = ease(seg(t, 89, 89.55)); if (iv < 1) iris(960, 620, lerp(70, 1500, iv), '#3A3450');
    camBegin(960, 560, 1.06 + pulse(t, 4) * .01, .01);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: mixCol('#4A4470', NIGHT, seg(t, 89, 90)), washOp: 255, ink: null });
    starField(t, { n: 20, seed: 11, h: 400 });
    paint(rectPts(-400, 700, W + 800, 420), { wash: '#443E68', washOp: 200, ink: null });
    // the map: three panels fold open
    const f1 = backOut(seg(t, 89.2, 89.75)), f2 = backOut(seg(t, 89.65, 90.2)), f3 = backOut(seg(t, 90.1, 90.65));
    push(); translate(960, 600); rotate(-.02);
    const panel = (cx, k, draw) => {
      if (k < .02) return;
      push(); translate(cx, 0); scale(clamp(k), 1);
      paint(rectPts(-280, -330, 560, 660, 6), { wash: '#EFE6CC', washOp: 255, ink: PAL.ink, sw: 1.6 });
      draw();
      pop();
    };
    panel(-285, f1, () => {
      mountain(-90, 180, 130, 1, '#5E6899'); mountain(60, 220, 100, 1, '#6E78A8');
      inkLine([[-200, 260], [0, 240], [220, 265]], 2.4, '#7FA0C0', 'ink', .5); // river
      for (let i = 0; i < 5; i++) paint(ellPts(-200 + i * 90 + Math.sin(i) * 20, 255 + (i % 2) * 8, 14, 4, 8), { wash: '#9CC4D8', washOp: 150, ink: null });
    });
    panel(0, f2, () => {
      mountain(-60, 140, 170, 1, '#5E6899'); mountain(140, 220, 110, 1, '#6E78A8');
      inkLine([[-160, 200], [-60, 120], [40, 170], [160, 90]], 2, '#B8C4DC', 'inkfine', .5);
      for (let i = 0; i < 4; i++) paint(ellPts(-160 + i * 110, 210 - i * 34, 5, 5, 6), { wash: '#B3372F', washOp: 220, ink: null });
    });
    panel(285, f3, () => {
      mountain(-140, 230, 105, 1, '#6E78A8'); mountain(30, 190, 150, 1, '#5E6899'); mountain(190, 250, 90, 1, '#7E88B8');
      // the flag on the highest peak
      const fk = seg(t, 90.7, 91.05);
      if (fk > 0) { const fp = backOut(fk); push(); translate(30, s0(30, 190, 150)); scale(fp); inkLine([[0, 0], [0, -54]], 3, '#8E3B2F', 'ink', 0); paint([[0, -54], [34, -46], [0, -36]], { wash: '#D8394E', ink: PAL.ink, sw: .9, curv: .3 }); pop(); }
      paint(ellPts(190, 250, 26, 10, 10, 2), { wash: '#F2E8D0', washOp: 200, ink: null });
    });
    // the two of them, tiny, at the map's foot
    const tk = backOut(seg(t, 91.2, 91.6));
    if (tk > .02) {
      push(); translate(-70, 380); scale(tk); xiaofan(0, 0, 9, { eyes: 'spark', mouth: 'O', lookY: -1 }); pop();
      push(); translate(-20, 382); scale(tk); xiaowen(0, 0, 9, { eyes: 'happy', mouth: 'smile', lookY: -1, glow: .8 }); pop();
    }
    pop();
    if (t > 91.6 && t < 92.1) sfx('旗', 1265, 330, 60, PAL.rose, t - 91.6, { life: .8, rot: .12 });
    camEnd();
  }
  const s0 = (x, y, s) => y - s * 1.35; // peak height of a mountain

  // =====================================================================================
  // 93–95 要找的标记点 — the route traces itself in red thread to a sparkling X
  // =====================================================================================
  function markPoint(t, lt) {
    const trace = seg(t, 93.3, 94.4), xk = seg(t, 94.35, 94.7);
    camBegin(960, 560, lerp(1.3, 1.18, ease(lt / 2)), 0);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: '#3E3860', washOp: 255, ink: null });
    paint(rectPts(-400, 760, W + 800, 360), { wash: '#342E52', washOp: 220, ink: null });
    starField(t, { n: 14, seed: 13, h: 300 });
    push(); translate(960, 580); rotate(.025);
    paint(rectPts(-560, -360, 1120, 720, 10), { wash: '#EFE6CC', washOp: 255, ink: PAL.ink, sw: 1.8 });
    for (let i = 0; i < 6; i++) { const gx = -460 + i * 180; inkLine([[gx, -300], [gx + 30, 300]], .5, '#C9BC90', 'inkfine', 0); }
    // contour doodles
    for (let i = 0; i < 3; i++) { const r = 60 + i * 44; paint(ellPts(-260, -60, r * 1.4, r, 20, 2), { ink: '#A89A6E', sw: .8 }); }
    // the route in red thread, tied to the X
    const route = [[-440, 240], [-260, 120], [-320, -40], [-100, -140], [80, -40], [240, -160], [420, -80]];
    if (trace > 0) redThread(route[0], [420, -80], t, { k: trace, sag: .06, sw: 2.6, glow: xk * .6, col: '#D8394E' });
    // waypoints light up as the thread passes
    route.forEach((p, i) => { if (trace > i / (route.length - 1)) paint(ellPts(p[0], p[1], 7, 7, 8), { wash: '#F2C14E', washOp: 220, ink: PAL.ink, sw: .8 }); });
    // the X
    if (xk > 0) {
      const p = backOut(xk), th = Math.sin(t * 6) * .04 * (xk < 1 ? 1 : pulse(t, 2));
      push(); translate(420, -80); rotate(th); scale(p);
      inkLine([[-30, -30], [30, 30]], 7, '#B3372F', 'ink', 0);
      inkLine([[30, -30], [-30, 30]], 7, '#B3372F', 'ink', 0);
      for (let i = 0; i < 4; i++) { const a = i / 4 * TAU + t * 2; paint(starPts(Math.cos(a) * 62, Math.sin(a) * 62, 10, .45, 4), { wash: '#FFF6D8', fill: PAL.ochre, fillOp: 90, ink: null }); }
      pop();
      if (t > 94.4 && t < 94.75) sfx('闪', 1380, 400, 60, PAL.ochre, t - 94.4, { life: .6 });
    }
    pop();
    camEnd();
  }

  // =====================================================================================
  // 95–98.08 你是分割我人生的线 — the dashed line between grey and colour ties into a bow
  // =====================================================================================
  function divide(t, lt) {
    const line = seg(t, 95.2, 95.8), bow = seg(t, 96.9, 97.7);
    camBegin(960, 540, 1.05, 0);
    // left: grey ink world; right: warm colour
    paint(rectPts(-400, -400, 1360, H + 800), { wash: '#B8B4AC', washOp: 255, ink: null });
    paint(rectPts(960, -400, W + 800, H + 800), { wash: '#F2E0C0', washOp: 255, ink: null });
    // left scenery: bare tree, rain lines, small grey 小凡
    paint([[-400, 760], [960, 760], [960, 1120], [-400, 1120]], { wash: '#9C988E', washOp: 255, fill: '#847E72', fillOp: 50, ink: null });
    push(); translate(420, 880);
    inkLine([[0, 0], [4, -110], [0, -200]], 6, '#6E6A60', 'ink', .3);
    inkLine([[2, -140], [50, -190]], 3.5, '#6E6A60', 'ink', .3);
    inkLine([[2, -170], [-44, -215]], 3.5, '#6E6A60', 'ink', .3);
    pop();
    for (let i = 0; i < 8; i++) { const rx = 120 + hash(i * 3.3) * 780, ry = (hash(i * 5.7) * 700 + t * 420) % 760; inkLine([[rx, ry], [rx - 8, ry + 26]], 1, '#8B877D', 'inkfine', 0); }
    xiaofan(560, 1000, 20, { eyes: 'dot', mouth: 'flat', col: '#A8A49A', dk: '#847E72', lt: '#C4C0B6', noGlow: true, dy: -Math.abs(Math.sin(t * 1.2)) * .3 });
    // right scenery: blooming, warm, 小温 waving from her side
    paint([[960, 760], [W + 400, 760], [W + 400, 1120], [960, 1120]], { wash: '#A8C489', washOp: 255, fill: '#6E9F58', fillOp: 55, ink: null });
    push(); translate(1620, 860);
    inkLine([[0, 0], [-4, -120], [0, -210]], 6, '#5E9648', 'ink', .3);
    paint(ellPts(0, -230, 70, 55, 14, 3), { fill: '#F5B8C4', fillOp: 200, bleed: .3, tex: .3, ink: null });
    for (let i = 0; i < 5; i++) paint(ellPts((hash(i * 3) - .5) * 110, -230 + (hash(i * 7) - .5) * 80, 12, 9, 8), { wash: '#FFFDF4', washOp: 200, ink: null });
    pop();
    xiaowen(1520, 1000, 20, { flip: true, eyes: 'happy', mouth: 'smile', lookX: -1, glow: .9, aR: 1.1 + .3 * Math.sin(bpOf(t) * Math.PI) });
    // the dashed dividing line draws down the middle…
    const L = 440 * ease(line);
    for (let y = 540 - L; y < 540 + L; y += 56) inkLine([[952, y], [968, y + 22]], 3.4, '#F2E8D0', 'ink', 0);
    // …then softens and ties itself into a bow
    if (bow > 0) {
      const p = backOut(bow), wob = Math.sin(t * 2.2) * .06 * (1 - bow * .6);
      push(); translate(960, 540 + Math.sin(t * 1.4) * 8); rotate(wob); scale(p * 1.6);
      for (const s of [-1, 1]) paint([[0, 0], [s * 44, -26], [s * 52, 12]], { wash: '#D8394E', ink: PAL.ink, sw: 1.2, curv: .4 });
      paint([[0, 0], [-16, 40], [14, 44]], { wash: '#C22747', ink: PAL.ink, sw: 1, curv: .4 });
      paint(ellPts(0, 2, 12, 12, 10), { wash: '#E2476E', ink: PAL.ink, sw: 1 });
      pop();
      if (bow > .5 && bow < .75) flash(.22 * (1 - seg(t, 97.35, 97.6)), '#F7D98C');
    }
    camEnd();
  }

  // =====================================================================================
  // 98.08–100 又将它们相连 — the two halves of life click together like puzzle pieces
  // =====================================================================================
  function joined(t, lt) {
    const meet = seg(t, 98.2, 98.75), glowk = seg(t, 98.75, 99.5);
    const sep = lerp(430, 0, ease(meet));
    camBegin(960, 540, 1.12 + glowk * .05, 0);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: '#443E68', washOp: 255, ink: null });
    starField(t, { n: 18, seed: 17, h: 420 });
    // two puzzle halves
    for (const side of [-1, 1]) {
      const x = 960 + side * sep, warm = side > 0;
      push(); translate(x, 560);
      const edge = []; // scalloped join edge
      edge.push([0, -300]);
      for (let i = 0; i <= 6; i++) { const y = -300 + i * 100; edge.push([side * (i % 2 ? 42 : 0) * -1, y], [side * -21, y + 50]); }
      edge.push([0, 300]);
      const outer = side < 0 ? [[-820, -300], [-820, 300]] : [[820, -300], [820, 300]];
      paint([edge[0], ...outer, edge[edge.length - 1], ...edge.slice().reverse()], { wash: warm ? '#F2E0C0' : '#B8B4AC', washOp: 255, fill: warm ? '#E0C090' : '#948E82', fillOp: 40, bleed: .08, tex: .5, border: .35, ink: PAL.ink, sw: 1.4 });
      if (warm) { // her half: sun + flowers
        paint(ellPts(side * 300, -120, 70, 70, 18, 2), { wash: '#F2C14E', washOp: 230, ink: null });
        for (let i = 0; i < 4; i++) paint(ellPts(side * (180 + i * 110), 200, 16, 16, 8), { wash: [PAL.rose, PAL.ochre][i % 2], washOp: 220, ink: null });
      } else { // his half: moon + rain
        paint(ellPts(side * 300, -120, 56, 56, 18, 2), { wash: '#E8ECF4', washOp: 230, ink: null });
        paint(ellPts(side * 322, -132, 40, 40, 16), { wash: '#B8B4AC', washOp: 255, ink: null });
      }
      pop();
    }
    // the seam lights up when they meet; the bow sits on it
    if (meet > .9) {
      paint(rectPts(946, 240, 28, 640, 12), { fill: '#F7D98C', fillOp: 130 * glowk * pulse(t, 2), bleed: .3, ink: null });
      const p = 1 - seg(t, 99, 99.6);
      if (p > 0) { push(); translate(960, 540); scale(p * 1.4); for (const s of [-1, 1]) paint([[0, 0], [s * 40, -24], [s * 48, 10]], { wash: '#D8394E', ink: PAL.ink, sw: 1.1, curv: .4 }); paint(ellPts(0, 0, 11, 11, 10), { wash: '#E2476E', ink: PAL.ink, sw: 1 }); pop(); }
      if (meet >= 1 && t < 99.1) { flash(.3 * (1 - seg(t, 98.75, 99.1)), '#F7D98C'); if (t < 99) sfx('咔', 960, 300, 64, PAL.ochre, t - 98.78, { life: .5 }); }
    }
    camEnd();
  }

  // =====================================================================================
  // 100–104 你是前世千次的回眸 — a carousel of past lives: six glowing panels circle the pair,
  // each a tiny scene where one of them glances back; at the centre, this life — face to face.
  // =====================================================================================
  function glances(t, lt) {
    camBegin(960, 540, 1.04 + pulse(t, 6) * .012, 0);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: NIGHT, washOp: 255, ink: null });
    paint(rectPts(-400, 640, W + 800, 480), { wash: '#262C4E', washOp: 220, ink: null });
    starField(t, { n: 26, seed: 19, h: 620 });
    paint(ellPts(300, 170, 90, 90, 22), { wash: '#F3EBD3', washOp: 200, ink: null });
    paint(ellPts(330, 155, 68, 68, 20), { wash: NIGHT, washOp: 255, ink: null });
    const CX = 960, CY = 480, RX = 555, RY = 190, spin = (t - 100) * .42;
    // one tiny person silhouette; glance = looking back over the shoulder
    const fig = (fx, fy, s, dir, glance, col) => {
      paint(rrPts(fx - 6 * s, fy - 9 * s, 12 * s, 15 * s, 4 * s), { wash: col, ink: null });
      paint(ellPts(fx + (glance ? -dir * 3.4 * s : 0), fy - 13 * s, 6.4 * s, 6.8 * s, 8), { wash: col, ink: null });
      if (glance) paint(ellPts(fx - dir * 5 * s, fy - 13.5 * s, 1.7 * s, 2.2 * s, 6), { wash: '#F3EBD3', ink: null });
    };
    // six past-life vignettes, one glance each
    const SCENES = ['umbrella', 'lantern', 'boat', 'bridge', 'snow', 'flowers'];
    const scene = (kind, s) => {
      const ink = '#3E3450';
      if (kind === 'umbrella') {
        for (let i = 0; i < 4; i++) inkLine([[-58 + i * 22, -46], [-66 + i * 22, -30]], 1.4, '#8B97C9', 'inkfine', 0);
        paint([[-34, -16], [0, -40], [34, -16]], { wash: '#C9524A', ink: PAL.ink, sw: .9, curv: .35 });
        inkLine([[0, -38], [0, 14]], 1.8, ink, 'ink', 0);
        fig(-10, 26, s, 1, false, ink); fig(12, 26, s, -1, true, ink);
      } else if (kind === 'lantern') {
        paint(rrPts(-11, -44, 22, 28, 9), { wash: PAL.gold, ink: PAL.ink, sw: .9 });
        paint(ellPts(0, -30, 26, 24, 12, 3), { fill: '#F2C14E', fillOp: 60, bleed: .3, ink: null });
        fig(-14, 26, s, 1, false, ink); fig(14, 26, s, -1, true, ink);
        inkLine([[-22, -8], [-30, -18]], 1.4, PAL.gold, 'inkfine', 0); inkLine([[22, -8], [30, -18]], 1.4, PAL.gold, 'inkfine', 0);
      } else if (kind === 'boat') {
        paint([[-44, 16], [-22, 26], [22, 26], [44, 16], [0, 12]], { wash: '#8A6B4A', ink: PAL.ink, sw: .9, curv: .3 });
        for (let i = 0; i < 3; i++) inkLine([[-50 + i * 36, 36], [-20 + i * 36, 38]], 1.2, '#8B97C9', 'inkfine', .5);
        fig(-13, 6, s, 1, false, ink); fig(13, 4, s, -1, true, ink);
      } else if (kind === 'bridge') {
        paint([[-52, 34], [-30, 6], [0, -6], [30, 6], [52, 34], [38, 34], [22, 12], [0, 4], [-22, 12], [-38, 34]], { wash: '#9A8F7A', ink: PAL.ink, sw: .9, curv: .2 });
        fig(-12, -14, s, 1, false, ink); fig(14, -20, s, -1, true, ink);
      } else if (kind === 'snow') {
        paint([[-46, 24], [-32, -8], [-18, 24]], { wash: '#4E6858', ink: PAL.ink, sw: .9, curv: .3 });
        paint([[-42, 6], [-32, -20], [-22, 6]], { wash: '#4E6858', ink: null, curv: .3 });
        for (let i = 0; i < 5; i++) paint(ellPts(-50 + hash(i * 3.3) * 100, -44 + hash(i * 5.7) * 50, 2.2, 2.2, 6), { wash: '#FFFDF4', washOp: 220, ink: null });
        fig(-2, 26, s, 1, false, ink); fig(20, 26, s, -1, true, ink);
      } else if (kind === 'flowers') {
        for (let i = 0; i < 4; i++) { const fx2 = -52 + i * 20; inkLine([[fx2, 34], [fx2 + 4, 12]], 1.4, '#5E9648', 'inkfine', 0); paint(ellPts(fx2 + 5, 8, 4.5, 4.5, 8), { wash: [PAL.rose, PAL.ochre][i % 2], ink: null }); }
        fig(-10, 26, s, 1, false, ink); fig(16, 26, s, -1, true, ink);
      }
    };
    // orbit positions
    const panel = i => {
      const a = spin + i / 6 * TAU;
      return { a, x: CX + Math.sin(a) * RX, y: CY + Math.cos(a) * RY, depth: (Math.cos(a) + 1) / 2 };
    };
    // the golden ring threading all past lives to this one
    const ring = [];
    for (let i = 0; i <= 40; i++) { const q = panel(0), a = spin + i / 40 * TAU; ring.push([CX + Math.sin(a) * RX, CY + Math.cos(a) * RY]); }
    inkLine(ring, 1.6, mixCol(PAL.gold, NIGHT, .45), 'ink', .5);
    // converging threads: every life leads here
    for (let i = 0; i < 6; i++) { const q = panel(i); inkLine([[q.x, q.y], [960, 660]], 1, mixCol(PAL.gold, NIGHT, .62), 'inkfine', .4); }
    // panels, back to front
    const order = [0, 1, 2, 3, 4, 5].map(i => ({ i, d: panel(i).depth })).sort((a, b) => a.d - b.d);
    for (const { i, d } of order) {
      const q = panel(i), op = 195 + 60 * d, sc = .62 + .48 * d;
      if (op < 5) continue;
      push(); translate(q.x, q.y); rotate(Math.sin(q.a * 2) * .06); scale(sc);
      paint(rrPts(-90, -66, 180, 132, 8), { wash: '#F3EBD3', washOp: op, ink: mixCol(PAL.ink, NIGHT, .35), sw: 1.3 });
      paint(rrPts(-84, -60, 168, 120, 6), { ink: mixCol(PAL.gold, '#C9A85C', .5), sw: .9 });
      scene(SCENES[i], 1);
      // a faint cord hanging from each panel — they are lanterns
      inkLine([[0, 58], [0, 74]], 1.2, mixCol(PAL.gold, NIGHT, .5), 'inkfine', 0);
      pop();
    }
    // this life: the only pair in full colour, face to face at last
    xiaofan(880, 706, 19, { eyes: 'happy', mouth: 'smile', warm: .3, lookX: 1, blush: true });
    xiaowen(1046, 704, 19, { flip: true, eyes: t > 102.8 ? 'spark' : 'happy', mouth: 'smile', glow: 1.1, lookX: 1, blush: true });
    if (t > 102.9) { paint(ellPts(962, 610, 26 + 8 * Math.sin(t * 3), 18, 12, 3), { fill: '#F7D98C', fillOp: 90, bleed: .4, ink: null }); if (t < 103.3) sfx('回眸', 962, 520, 58, PAL.rose, t - 102.9, { life: .8, rot: .04 }); }
    camEnd();
  }

  // =====================================================================================
  // 104–105.89 虔诚牵的手 — two hands reach across a candle flame
  // =====================================================================================
  function piousHands(t, lt) {
    const reach = ease(seg(t, 104.2, 105.7));
    camBegin(960, 560, 1.25, 0);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: '#241F38', washOp: 255, ink: null });
    // candle pool of light
    paint(ellPts(960, 780, 620, 420, 26, 5), { fill: '#F2B95A', fillOp: 70, bleed: .45, tex: .2, ink: null });
    // the candle
    push(); translate(960, 830);
    paint(rrPts(-34, -90, 68, 110, 10, 2), { wash: '#EFE0BE', washOp: 255, ink: PAL.ink, sw: 1.3 });
    paint(ellPts(0, -90, 34, 12, 14), { wash: '#E0CD9E', ink: PAL.ink, sw: 1 });
    inkLine([[0, -96], [2, -122]], 2.6, '#D8C89C', 'ink', 0);
    const fk = 1 + Math.sin(t * 8) * .18 + Math.sin(t * 13.7) * .1;
    paint([[0, -122], [-16 * fk, -170 * fk], [0, -225 * fk], [16 * fk, -170 * fk]], { wash: PAL.ochre, fill: '#D8632F', fillOp: 100, bleed: .3, tex: .3, ink: null, curv: .5 });
    pop();
    // the two hands reach from each side (mitten hands with a thumb)
    const hand = (side, col, dk) => {
      const x = 960 + side * lerp(560, 105, reach), y = 620 + Math.sin(t * 1.5 + side) * 8;
      push(); translate(x, y); rotate(side * lerp(.5, .12, reach) + Math.sin(t * 2 + side) * .03);
      paint(ellPts(0, 0, 62, 52, 18, 2), { wash: col, washOp: 255, ink: PAL.ink, sw: 1.3 });
      paint(ellPts(side * -30, -34, 24, 20, 12, 1), { wash: col, washOp: 255, ink: PAL.ink, sw: 1.1 });
      pop();
    };
    hand(-1, mixCol(PAL.fan, PAL.wen, .3), PAL.fanDk);
    hand(1, PAL.wen, PAL.wenDk);
    // spark motes rise
    for (let i = 0; i < 5; i++) { const my = 800 - ((t * 60 + hash(i) * 300) % 380); paint(ellPts(940 + hash(i * 3.1) * 40, my, 3, 3, 6), { fill: '#F7D98C', fillOp: 140, bleed: .2, ink: null }); }
    // almost touching…
    if (reach > .95) paint(ellPts(960, 618, 60, 30, 14, 3), { fill: '#F7E9C4', fillOp: 90, bleed: .35, ink: null });
    camEnd();
  }

  // =====================================================================================
  // 105.89–109 你是其余所有的一切 — everything spirals into one point
  // =====================================================================================
  function everything(t, lt) {
    const k = seg(t, 105.95, 108.6);
    camBegin(960, 540, 1.06, 0);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: NIGHT, washOp: 255, ink: null });
    starField(t, { n: 30, seed: 23, h: H });
    const CX = 960, CY = 520;
    const icons = ['star', 'fish', 'umbrella', 'moon', 'leaf', 'heart', 'cat', 'flower', 'bell', 'cloud'];
    icons.forEach((ic, i) => {
      const u = clamp(k * 1.25 - i / icons.length * .55);           // each icon spirals in on its own schedule
      if (u <= 0 || u >= 1) return;
      const a = i * 2.4 + u * 7.5, r = lerp(560, 26, ease(u));
      const x = CX + Math.cos(a) * r * 1.25, y = CY + Math.sin(a) * r;
      const s = lerp(1, .34, ease(u)) * (26 + hash(i * 3.3) * 10);
      const col = [PAL.ochre, '#9CC4D8', PAL.rose, SILVER, '#B99BD6', '#F2A283'][i % 6];
      push(); translate(x, y); rotate(a * 2); scale(s / 26);
      if (ic === 'star') paint(starPts(0, 0, 22, .45, 5), { wash: '#FFF6D8', fill: PAL.ochre, fillOp: 80, ink: PAL.ink, sw: 1 });
      else if (ic === 'fish') { paint(ellPts(0, 0, 20, 11, 12), { wash: '#9CC4D8', ink: PAL.ink, sw: 1 }); paint([[-20, 0], [-32, -10], [-32, 10]], { wash: '#9CC4D8', ink: PAL.ink, sw: .8 }); paint(ellPts(10, -2, 2.5, 2.5, 6), { wash: PAL.ink, ink: null }); }
      else if (ic === 'umbrella') { paint([[-18, 2], [0, -16], [18, 2]], { wash: PAL.rose, ink: PAL.ink, sw: 1, curv: .3 }); inkLine([[0, 0], [0, 16]], 2, PAL.ink, 'ink', 0); }
      else if (ic === 'moon') { paint(ellPts(0, 0, 15, 15, 16), { wash: '#F3EBD3', ink: PAL.ink, sw: 1 }); paint(ellPts(7, -3, 12, 12, 14), { wash: NIGHT, ink: null }); }
      else if (ic === 'leaf') paint([[0, -16], [12, 0], [0, 16], [-12, 0]], { wash: '#8FBF6F', ink: PAL.ink, sw: 1, curv: .5 });
      else if (ic === 'heart') paint(heartPts(0, 0, 14), { wash: '#E2476E', ink: PAL.ink, sw: 1 });
      else if (ic === 'cat') { paint(ellPts(0, 2, 15, 13, 12), { wash: '#C9B8A0', ink: PAL.ink, sw: 1 }); paint([[-14, -8], [-18, -20], [-4, -12]], { wash: '#C9B8A0', ink: PAL.ink, sw: .9 }); paint([[14, -8], [18, -20], [4, -12]], { wash: '#C9B8A0', ink: PAL.ink, sw: .9 }); for (const ex of [-5, 5]) paint(ellPts(ex, 0, 2, 2.6, 6), { wash: PAL.ink, ink: null }); }
      else if (ic === 'flower') { for (let p = 0; p < 5; p++) { const a2 = p / 5 * TAU; paint(ellPts(Math.cos(a2) * 10, Math.sin(a2) * 10, 7, 7, 8), { wash: PAL.rose, ink: null }); } paint(ellPts(0, 0, 5, 5, 8), { wash: PAL.ochre, ink: null }); }
      else if (ic === 'bell') { paint([[-14, 10], [-10, -8], [0, -14], [10, -8], [14, 10]], { wash: PAL.gold, ink: PAL.ink, sw: 1, curv: .4 }); paint(ellPts(0, 14, 4, 4, 8), { wash: PAL.goldDk, ink: PAL.ink, sw: .8 }); }
      else if (ic === 'cloud') { paint(ellPts(-8, 2, 10, 7, 10), { wash: '#FFFDF4', washOp: 240, ink: null }); paint(ellPts(4, 0, 12, 9, 10), { wash: '#FFFDF4', washOp: 240, ink: null }); }
      pop();
    });
    // the point they all fall into
    const g = ease(seg(t, 107.8, 108.8));
    paint(ellPts(CX, CY, 26 + g * 60, 26 + g * 60, 22, 3), { fill: '#FFF6D8', fillOp: 120 + 80 * g, bleed: .4, tex: .1, ink: null });
    paint(starPts(CX, CY, 34 + 20 * Math.sin(t * 5) * g, .42, 4), { wash: '#FFFDF4', fill: PAL.gold, fillOp: 100 * g + 30, ink: g > .1 ? PAL.ink : null, sw: 1 });
    if (g > .3 && t < 108.9) sfx('聚', CX, 330, 62, PAL.ochre, t - 108.35, { life: .7 });
    camEnd();
  }

  // =====================================================================================
  // 109–112 是我的世界 — the point becomes a little planet held in his hands
  // =====================================================================================
  function myWorld(t, lt) {
    const grow = backOut(seg(t, 109.1, 109.9));
    camBegin(960, 560, 1.1 + ease(seg(t, 111.4, 112)) * .12, 0);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: NIGHT, washOp: 255, ink: null });
    paint(rectPts(-400, 700, W + 800, 420), { wash: '#262C4E', washOp: 200, ink: null });
    starField(t, { n: 34, seed: 29, h: 700 });
    // the planet
    const PY = 430, PR = 130 * grow, bob = Math.sin(t * 1.6) * 6;
    push(); translate(960, PY + bob);
    paint(ellPts(0, 6, PR * 1.35, PR * 1.35, 24, 4), { fill: '#F3EBD3', fillOp: 50, bleed: .3, ink: null });
    paint(ellPts(0, 0, PR, PR, 30, 1.5), { wash: '#8FBF6F', washOp: 255, fill: '#5E9648', fillOp: 55, tex: .5, ink: PAL.ink, sw: 1.4 });
    paint(ellPts(-PR * .3, -PR * .25, PR * .5, PR * .3, 16, 2), { fill: '#C4E39A', fillOp: 100, bleed: .25, tex: .4, ink: null }); // a meadow
    paint(ellPts(PR * .4, PR * .3, PR * .45, PR * .28, 14, 2), { wash: '#9CC4D8', washOp: 220, ink: null }); // a pond
    inkLine([[-PR * .18, -PR * .42], [-PR * .18, -PR * .78]], 3.4, '#6E4A3A', 'ink', 0);
    paint(ellPts(-PR * .18, -PR * .9, PR * .3, PR * .26, 12), { wash: '#5E9648', ink: null }); // tree
    // 小温 stands on top, waving
    if (grow > .9) xiaowen(-PR * .05, -PR * 1.02, PR * .11, { ...move('idle', t), eyes: 'happy', mouth: 'smile', aR: 1 + .4 * Math.sin(bpOf(t) * Math.PI), glow: 1 });
    pop();
    // his hands cupped under it
    xiaofan(960, 950, 34, { eyes: 'heart', mouth: 'smile', blush: true, warm: .5, aL: 1.35, aR: 1.35,
      armL: (u, sw) => { paint(ellPts(u * .9, u * .1, u * .62, u * .5, 12, u * .04), { wash: mixCol(PAL.fan, PAL.wen, .5), ink: PAL.ink, sw: sw * .7 }); },
      armR: (u, sw) => { paint(ellPts(u * .9, u * .1, u * .62, u * .5, 12, u * .04), { wash: mixCol(PAL.fan, PAL.wen, .5), ink: PAL.ink, sw: sw * .7 }); } });
    // a few silver chords connect the planet to passing stars
    for (let i = 0; i < 3; i++) {
      const a = t * .4 + i * 2.1, sx = 960 + Math.cos(a) * 420, sy = PY + bob + Math.sin(a) * 300;
      inkLine([[960, PY + bob], [sx, sy]], .8, mixCol(SILVER, NIGHT, .4), 'inkfine', 0);
      paint(ellPts(sx, sy, 5, 5, 8), { wash: SILVER, washOp: 200, ink: null });
    }
    camEnd();
    // iris into the planet as chorus 2 arrives
    const iv = seg(t, 111.45, 112);
    if (iv > 0) iris(960, 430, lerp(1500, 90, ease(iv)), '#241F38');
  }

  chapter('map', 89, 112, [
    [89.0, range], [93.0, markPoint], [95.0, divide], [98.08, joined],
    [100.0, glances], [104.0, piousHands], [105.89, everything], [109.0, myWorld]
  ]);
})();
