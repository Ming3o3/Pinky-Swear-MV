// c06_seasons: 间奏二 (132–158). One 26-second travelling shot: a sideways journey through
// spring sakura, summer sea, autumn maple and first snow — hand in hand the whole way.
(() => {
  const SPEED = 300;                                   // world px per second
  const SEASON_W = 1950;                               // world px per season
  // palettes: sky, sky2 (horizon), far, ground, ground dark, tree, accent
  const PAL4 = [
    { sky: '#F2D5DE', sky2: '#F8E4EA', far: '#A8C4B2', gr: '#A8CB86', grD: '#6E9F58', tree: '#F0A8BC', ac: '#E27A92' },  // spring
    { sky: '#9CD4E8', sky2: '#C8E8E0', far: '#7FB8A0', gr: '#8FBF6F', grD: '#5E9648', tree: '#4E8E5E', ac: '#F2C14E' },  // summer
    { sky: '#E8C8A0', sky2: '#F2DDB8', far: '#C89A6E', gr: '#D8A862', grD: '#A87840', tree: '#D86E38', ac: '#B3372F' },  // autumn
    { sky: '#C8D4E4', sky2: '#E8ECF4', far: '#9FAEC4', gr: '#E8ECF2', grD: '#B8C4D4', tree: '#8A94A8', ac: '#E8B23A' }   // winter
  ];
  const NAMES = ['春', '夏', '秋', '冬'];
  const zone = wx => clamp(Math.floor(wx / SEASON_W), 0, 3);
  // palette at world centre cx: mix across boundaries (±330 px)
  function seasonPal(cx) {
    const zz = cx / SEASON_W, i = clamp(Math.floor(zz), 0, 3);
    if (i >= 3) return { ...PAL4[3] };
    const f = zz - Math.floor(zz);
    const mix = f > .82 ? (f - .82) / .18 : 0; // ramp toward the NEXT season only as the boundary approaches
    const A = PAL4[i], B = PAL4[i + 1];
    const out = {};
    for (const k of ['sky', 'sky2', 'far', 'gr', 'grD', 'tree', 'ac']) out[k] = mixCol(A[k], B[k], mix);
    return out;
  }

  // a tree of the given season, ground point (x, y)
  function seasonTree(x, y, s, season, t, o = {}) {
    push(); translate(x, y);
    const sway = Math.sin(t * 1.6 + x * .01) * (season === 3 ? .015 : .035);
    rotate(sway);
    inkLine([[0, 0], [-4, -110 * s], [0, -190 * s]], 9 * s, season === 3 ? '#5E6878' : '#6E4A3A', 'ink', .3);
    inkLine([[-3, -120 * s], [46 * s, -160 * s]], 5 * s, season === 3 ? '#5E6878' : '#6E4A3A', 'ink', .3);
    inkLine([[-2, -150 * s], [-48 * s, -185 * s]], 5 * s, season === 3 ? '#5E6878' : '#6E4A3A', 'ink', .3);
    const puff = (px, py, r) => {
      if (season === 3) { // bare branches with snow
        inkLine([[-4, -150 * s], [-30 * s, -200 * s]], 3 * s, '#5E6878', 'ink', .3);
        inkLine([[0, -190 * s], [26 * s, -230 * s]], 3 * s, '#5E6878', 'ink', .3);
        paint(ellPts(px, py, r, r * .5, 10), { wash: '#F4F8FC', washOp: 220, ink: null });
        return;
      }
      paint(ellPts(px, py, r, r * .8, 16, 3), { fill: PAL4[season].tree, fillOp: season === 0 ? 170 : 220, bleed: .35, tex: .4, ink: null });
    };
    puff(-48 * s, -195 * s, 52 * s); puff(46 * s, -170 * s, 44 * s); puff(0, -230 * s, 58 * s);
    if (season === 0) for (let i = 0; i < 4; i++) paint(ellPts((hash(i * 3.1) - .5) * 150 * s, -225 * s + (hash(i * 5.7) - .5) * 70 * s, 8 * s, 6 * s, 8), { wash: '#FFFDF4', washOp: 210, ink: null });
    pop();
  }

  // =====================================================================================
  // 132–158 the journey
  // =====================================================================================
  function journey(t, lt) {
    const iv = 1 - ease(seg(t, 132, 132.55)); if (iv > 0) iris(960, 640, lerp(1500, 60, iv), '#4E5A3E');
    const camX = lt * SPEED, P = seasonPal(camX);
    const dawn = seg(t, 156.8, 158);
    // continuous season weights: 1 at a season's core, .5 at boundaries, 0 beyond — no hard switches anywhere
    const CW = [975, 2925, 4875, 6825].map(c2 => clamp(1 - Math.abs(camX - c2) / 1950));
    // sky
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: mixCol(P.sky, '#F7C98C', dawn * .7), washOp: 255, ink: null });
    paint(rectPts(-400, 420, W + 800, 320), { wash: mixCol(P.sky2, '#F2A868', dawn), washOp: 220, ink: null });
    if (CW[1] > .05) paint(ellPts(1450, 150, 95, 95, 22, 3), { fill: '#F7DE9C', fillOp: 90 * CW[1], bleed: .3, ink: null }); // high summer sun
    if (Math.max(CW[3], dawn) > .05) starField(t, { n: Math.round(20 * Math.max(CW[3], dawn)), seed: 31, h: 380 });
    // summer sea lies BEHIND the far hills: painted first, the mountains then occlude it and the sail
    const sea = CW[1];
    if (sea > .02) {
      paint(rectPts(-400, 640, W + 800, 130), { wash: mixCol('#7FB8C8', '#F2C98C', dawn), washOp: 205 * sea, ink: null });
      for (let i = 0; i < 5; i++) { const wx = 200 + hash(i * 3.3) * 1500; inkLine([[wx + Math.sin(t * 1.5 + i) * 20, 672 + i * 18], [wx + 120 + Math.sin(t * 1.5 + i) * 20, 676 + i * 18]], 1, '#E8F4F0', 'inkfine', .4); }
      // a little sail drifting with the distant water
      const bx = (((1500 - camX * .45) % 2200) + 2200) % 2200 - 150;
      paint([[bx, 662], [bx, 620], [bx + 36, 654]], { wash: '#FFFDF4', washOp: 240 * sea, ink: PAL.ink, sw: .9, curv: .2 });
      paint(ellPts(bx + 10, 666, 22, 6, 8), { wash: '#8A5E3E', washOp: 235 * sea, ink: null });
    }
    // far layer: mountains
    const farX = camX * .3;
    for (let i = -1; i < 7; i++) {
      const hx = (((i * 760 - farX) % 5320) + 5320) % 5320 - 800;
      paint([[hx, 730], [hx + 240, 560 + hash(i * 3.3) * 60], [hx + 500, 730]], { wash: P.far, washOp: 235, fill: mixCol(P.far, '#FFFFFF', .3), fillOp: 50, bleed: .2, tex: .4, ink: null, curv: .4 });
    }
    // mid hills
    const midX = camX * .6;
    for (let i = -1; i < 8; i++) {
      const hx = (((i * 520 - midX) % 4160) + 4160) % 4160 - 700;
      paint(ellPts(hx, 940, 300 + hash(i * 5.1) * 90, 150, 18, 3), { wash: mixCol(P.gr, P.far, .4), washOp: 255, fill: P.grD, fillOp: 45, bleed: .15, tex: .5, ink: null, curv: .5 });
    }
    // ground
    paint([[-400, 900], [W / 2, 890 + jit(3)], [W + 400, 900 + jit(3)], [W + 400, 1120], [-400, 1120]],
      { wash: mixCol(P.gr, '#F7C98C', dawn * .5), washOp: 255, fill: P.grD, fillOp: 65, bleed: .08, tex: .6, border: .45, ink: PAL.ink, sw: 1.3 });
    inkLine([[-400, 900], [W + 400, 896 + jit(2)]], 1.2, mixCol(P.grD, '#4E3A28', .3), 'ink', 0);
    // a path under their feet
    paint([[760, 1120], [860, 905], [1060, 905], [1220, 1120]], { wash: mixCol('#E8D9B4', '#F7DFC0', dawn), washOp: 200, fill: '#C9B37E', fillOp: 55, bleed: .15, tex: .5, ink: null, curv: .4 });
    // butterflies in spring
    if (CW[0] > .3) for (let i = 0; i < 2; i++) {
      const bx2 = 400 + hash(i * 3.7) * 1100 + Math.sin(t * 1.1 + i * 2.6) * 90, by2 = 460 + hash(i * 5.9) * 240 + Math.sin(t * 1.7 + i) * 40;
      const wf = Math.sin(t * 9 + i * 3);
      push(); translate(bx2, by2); scale(.8 + hash(i) * .4);
      for (const s2 of [-1, 1]) paint(ellPts(s2 * 7 * wf, -2, 8 * Math.abs(wf) + 3, 5, 6, 0, s2 * .4), { wash: i ? '#F0A8BC' : '#F7D4DC', washOp: 225 * CW[0], ink: PAL.ink, sw: .6 });
      inkLine([[0, -4], [0, 5]], 1.2, '#6E4A3A', 'inkfine', 0);
      pop();
    }
    // seagulls over the summer sea
    if (CW[1] > .3) for (let i = 0; i < 2; i++) {
      const gx2 = 300 + hash(i * 7.3) * 1300 + Math.sin(t * .9 + i * 2) * 60, gy2 = 210 + hash(i * 3.1) * 150 + Math.cos(t * 1.1 + i) * 18;
      inkLine([[gx2 - 16, gy2], [gx2 - 6, gy2 - 7], [gx2, gy2], [gx2 + 6, gy2 - 7], [gx2 + 16, gy2]], 1.6, mixCol('#FFFDF4', P.sky, .3), 'ink', .4);
    }
    // trees & props at fixed world positions
    for (let i = Math.floor((camX - 1200) / 480); i < (camX + 1200) / 480; i++) {
      const wx = i * 480 + hash(i * 3.3) * 220, sx = wx - camX + 960;
      if (sx < -260 || sx > 2180) continue;
      const szn = zone(wx), sz = .9 + hash(i * 7.1) * .5;
      const gy = 920 + hash(i * 5.3) * 60;
      if (hash(i * 9.7) < .62) seasonTree(sx, gy, sz, szn, t);
      else if (szn === 3) { // winter lamp post
        push(); translate(sx, 930 + hash(i * 5.3) * 40);
        inkLine([[0, 0], [0, -220]], 6, '#3E4454', 'ink', 0);
        paint(rrPts(-26, -282, 52, 62, 10), { wash: '#F2C14E', washOp: 235, ink: PAL.ink, sw: 1.2 });
        paint(ellPts(0, -250, 90, 90, 14, 4), { fill: '#F2C14E', fillOp: 55, bleed: .35, ink: null });
        pop();
      } else if (szn === 1 && hash(i * 4.3) > .5) { // summer beach umbrella
        push(); translate(sx, 935);
        inkLine([[0, 0], [-8, -120]], 4, '#8A5E3E', 'ink', 0);
        paint([[-70, -120], [0, -155], [70, -120], [0, -108]], { wash: '#F2A05C', ink: PAL.ink, sw: 1, curv: .3 });
        pop();
      } else if (szn === 1) { // summer sunflower
        push(); translate(sx, 932 + hash(i * 5.3) * 30);
        inkLine([[0, 0], [0, -95]], 4.5, '#5E8E3E', 'ink', 0);
        paint(ellPts(-14, -40, 10, 5, 6, 0, .5), { wash: '#5E9648', ink: null });
        for (let p2 = 0; p2 < 10; p2++) { const a2 = p2 / 10 * TAU + t * .3; paint(ellPts(Math.cos(a2) * 15, -95 + Math.sin(a2) * 15, 6.5, 6.5, 6), { wash: '#F2C14E', washOp: 235 * CW[1], ink: null }); }
        paint(ellPts(0, -95, 11, 11, 10), { wash: '#8A5E2E', washOp: 235 * CW[1], ink: PAL.ink, sw: .8 });
        pop();
      } else if (szn === 2 && hash(i * 4.3) < .6) { // autumn pumpkin
        push(); translate(sx, 928 + hash(i * 5.3) * 40);
        paint(ellPts(0, -16, 26, 20, 12, 2), { wash: '#D8823A', washOp: 245 * CW[2], ink: PAL.ink, sw: 1 });
        inkLine([[0, -34], [0, -26]], 2.4, '#5E7E38', 'ink', 0);
        inkLine([[-10, -32], [-12, -4]], .8, '#B8642A', 'inkfine', 0);
        inkLine([[10, -32], [12, -4]], .8, '#B8642A', 'inkfine', 0);
        pop();
      }
      // season boundary signposts
      const zb = Math.round(wx / SEASON_W) * SEASON_W;
      if (Math.abs(wx - zb) < 8 && zb >= SEASON_W && zb < camX + 1000 && zone(zb - 1) !== zone(zb + 1)) {
        push(); translate(sx, 940); scale(.8);
        inkLine([[0, 0], [0, -80]], 4, '#7C4A2C', 'ink', 0);
        paint(rrPts(-34, -128, 68, 54, 8), { wash: '#E8D9B4', ink: PAL.ink, sw: 1.1 });
        pop();
        letter(NAMES[zone(zb)], sx, 839, 30, PAL.ink, { font: '30px MaShanZheng, WenKai' });
      }
    }
    // the winter snowman
    const snx = 6600 - camX + 960;
    if (snx > -220 && snx < 2140 && CW[3] > .2) {
      push(); translate(snx, 930); scale(.9 * CW[3] + .1);
      paint(ellPts(0, -30, 42, 34, 16, 2), { wash: '#FFFDF4', washOp: 250, ink: PAL.ink, sw: 1.2 });
      paint(ellPts(0, -74, 30, 25, 14, 2), { wash: '#FFFDF4', washOp: 250, ink: PAL.ink, sw: 1.1 });
      for (const ex of [-10, 10]) paint(ellPts(ex, -78, 3, 3.4, 6), { wash: PAL.ink, ink: null });
      paint(ellPts(0, -70, 4, 3, 6), { wash: '#D8632F', ink: null });
      paint(rectPts(-22, -98, 44, 7, 3), { wash: '#B3372F', ink: null });
      paint(rectPts(-16, -106, 32, 9, 2), { wash: '#B3372F', ink: PAL.ink, sw: .8 });
      for (let b2 = 0; b2 < 3; b2++) paint(ellPts(0, -46 - b2 * 17, 2.6, 2.6, 6), { wash: PAL.ink, ink: null });
      inkLine([[10, -70], [38, -88]], 2.2, '#6E4A3A', 'ink', 0);
      inkLine([[-10, -68], [-36, -84]], 2.2, '#6E4A3A', 'ink', 0);
      pop();
    }
    // weather: all four sets crossfaded by the continuous weights — no more popping
    if (CW[0] > .03) petalRain(t, { n: Math.round(22 * CW[0]), kind: 'petal', cols: ['#F5B8C4', '#F0A8BC', '#FFFDF4'], wind: 1.1, fall: .8, op: Math.round(160 + 75 * CW[0]) });
    if (CW[1] > .5) petalRain(t, { n: Math.round(8 * (CW[1] - .5) * 2), kind: 'spark', cols: ['#F7D98C'], wind: .5, fall: .35, area: [-100, -100, W + 200, 500], op: 200 });
    if (CW[2] > .03) petalRain(t, { n: Math.round(16 * CW[2]), kind: 'leaf', cols: ['#D86E38', '#E8A05C', '#C85A2E'], wind: 1.4, fall: .9, op: Math.round(160 + 75 * CW[2]) });
    if (CW[3] > .03) petalRain(t, { n: Math.round(26 * CW[3]), kind: 'snow', cols: ['#FFFFFF'], wind: .7, fall: .7, op: Math.round(140 + 90 * CW[3]) });
    // footprints trail behind
    for (let i = 1; i < 7; i++) {
      const ft = lt - i * .34; if (ft < 0) break;
      const fx = 830 - i * 42 + Math.sin(i * 2.6) * 8;
      paint(ellPts(fx, 1000 + (i % 2) * 14, 9, 5, 6, 1), { wash: mixCol(P.grD, '#4E3A28', .35), washOp: 130, ink: null });
    }
    // the walkers — backpack and all, hands joined by the ever-brighter thread
    const glowT = .4 + .5 * seg(t, 132, 158) + dawn * .3;
    xiaofan(830, 1000, 27, { ...move('walk', t), eyes: 'crescent', mouth: 'smile', warm: .6, blush: true,
      draw: (u, sw) => paint(rrPts(-4.6 * u, -6.6 * u, 1.9 * u, 2.6 * u, .5 * u), { wash: '#6E8FB2', ink: PAL.ink, sw: sw * .7 }) });
    xiaowen(935, 998, 27, { flip: true, ...move('walk', t, 1), eyes: 'crescent', mouth: 'smile', glow: 1.3, blush: true });
    if (CW[3] > .5) for (let i = 0; i < 2; i++) {
      const bp = frac(t * .8 + i * .5);
      if (bp < .5) { const q = [[988, 930], [1004, 918 - bp * 30], [1024, 906 - bp * 60]]; inkLine(partial(q.map((p, j) => [p[0], p[1] - j * 4]), clamp(bp * 2.4)), 2, mixCol('#F4F8FC', P.sky, .4), 'inkfine', .6); }
    }
    // the first warm hint of dawn creeps in from the east
    if (dawn > 0) paint(rectPts(-400, -400, W + 800, H + 800), { fill: '#F2A868', fillOp: 40 * dawn, bleed: .35, tex: .15, ink: null });
    camEnd();
  }

  chapter('seasons', 132, 158, [[132, journey]]);
})();
