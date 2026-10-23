// c05_hill_night: 副歌二 (112–132). The hill stage v2 — starry night, silver and gold.
// Shots: shine 111.77 · ordinary 114.85 · night breeze 116.82 · sensitive 121.0 · the ring + star river 123.21 ·
//        written in stars 125.85 · walking the crest 128.69.
(() => {
  function nightHill(t, o = {}) {
    hillStage(t, {
      skyA: o.skyA || '#252B4E', distCol: '#3E466E', top: '#4E6E52', bot: '#33503C', backdrop: null,
      moon: o.moon === null ? null : (o.moon || { x: 320, y: 190, r: 95 }),
      stars: o.stars ?? 36, clouds: 0, flowers: o.flowers ?? 4, distant: true, ...o
    });
    // the star river: a diagonal band of pale wash and dense little stars
    const glow = o.river ?? .5;
    if (glow > .02) {
      push(); translate(960, 240); rotate(-.42);
      paint(rectPts(-1300, -70 - 60 * glow, 2600, 140 + 120 * glow, 60), { fill: mixCol('#8B97C9', '#E8ECF4', glow * .6), fillOp: 40 + 55 * glow, bleed: .5, tex: .25, ink: null });
      for (let i = 0; i < 30 * glow; i++) {
        const sx = -1200 + hash(i * 3.3 + 40) * 2400, sy = -60 + hash(i * 5.7 + 40) * 120, tw = .5 + .5 * Math.sin(t * 2 + i * 2.1);
        paint(ellPts(sx, sy, 2.2, 2.2, 6), { wash: '#E8ECF4', washOp: 200 * tw + 55, ink: null });
      }
      pop();
    }
  }

  // a heart drawn in constellation stars, lines drawing on with k
  function constellation(t, k, cx, cy, s) {
    const PTS = [[0, -70], [52, -20], [30, 52], [0, 20], [-30, 52], [-52, -20]]; // heart-ish loop
    const scaled = PTS.map(p => [cx + p[0] * s, cy + p[1] * s]);
    const total = PTS.length, prog = k * total;
    inkLine(partial([...scaled, scaled[0]], clamp(prog / total)), 1.2, '#E8ECF4', 'inkfine', .4);
    scaled.forEach((p, i) => {
      if (prog < i) return;
      const tw = .6 + .4 * Math.sin(t * 3 + i * 2.2);
      paint(ellPts(p[0], p[1], 6.5 * tw + 3, 6.5 * tw + 3, 8), { wash: '#F3EBD3', washOp: 240, ink: null });
      if (i % 2 === 0) { inkLine([[p[0] - 12, p[1]], [p[0] + 12, p[1]]], .7, '#F3EBD3', 'inkfine', 0); inkLine([[p[0], p[1] - 12], [p[0], p[1] + 12]], .7, '#F3EBD3', 'inkfine', 0); }
    });
  }

  // =====================================================================================
  // 111.77–114.85 所以请你再闪亮一点点 — she turns the whole hill into constellations
  // =====================================================================================
  function shine(t, lt) {
    const iv = ease(seg(t, 111.77, 112.3)); if (iv < 1) iris(960, 430, lerp(90, 1500, iv), '#241F38');
    const cons = seg(t, 112.9, 114.4);
    camBegin(960, 590, 1.1 + pulse(t, 4) * .012, 0);
    nightHill(t, { river: .55, flowers: 5 });
    xiaowen(1080, 690, 25, { ...move('bounce', t), eyes: 'spark', mouth: 'grin', glow: 1.4, blush: true,
      draw: (u, sw) => { for (let i = 0; i < 5; i++) { const a = t * 2.4 + i * 1.26, r = (90 + hash(i) * 60) * (0.7 + .3 * Math.sin(t * 3 + i)); paint(starPts(0 + Math.cos(a) * r, -300 + Math.sin(a) * r * .8, 8, .45, 4), { wash: '#FFF6D8', fill: PAL.ochre, fillOp: 100, ink: PAL.ink, sw: .55 }); } } });
    xiaofan(760, 700, 24, { ...move('idle', t), eyes: 'spark', mouth: 'O', lookX: 1, lookY: -.3, warm: .55, emote: '!', emoteK: seg(t, 112.4, 112.7) });
    constellation(t, cons, 960, 260, 2.1);
    if (cons > .9 && t < 114.6) letter('亮', 1250, 430, 76, '#F3EBD3', { font: '76px MaShanZheng, WenKai', alpha: 1 - seg(t, 114.2, 114.6), rot: .08 });
    camEnd();
  }

  // =====================================================================================
  // 114.85–116.82 尽管我太平凡 — a firefly lands on his nose and he glints anyway
  // =====================================================================================
  function ordinary(t, lt) {
    const land = seg(t, 115.35, 115.75), glint = seg(t, 115.75, 116.6);
    camBegin(900, 600, 1.5, -.01);
    nightHill(t, { river: .35, moon: null, stars: 22 });
    // the firefly: zigzags in, lands on his nose
    let fx = 1420, fy = 420;
    if (land < 1) { const k = ease(land); fx = lerp(1420, 905, k) + Math.sin(k * 12) * 40 * (1 - k); fy = lerp(420, 545, k) + Math.cos(k * 9) * 30 * (1 - k); }
    else { fx = 905; fy = 545 - Math.sin(t * 4) * 4; }
    paint(ellPts(fx, fy, 5, 5, 8), { fill: '#F7E9C4', fillOp: 190, bleed: .3, ink: null });
    paint(ellPts(fx, fy, 2.4, 2.4, 6), { wash: '#FFFDF4', washOp: 240, ink: null });
    xiaofan(870, 700, 26, { eyes: land < 1 ? 'look' : (glint > .5 ? 'spark' : 'wide'), lookX: 0, lookY: land >= 1 ? 0 : .8, mouth: glint > .4 ? 'smile' : 'flat', warm: .58, blush: glint > .3, emote: glint > .2 ? 'spark' : null, emoteK: seg(t, 115.9, 116.2), dy: -glint * .8 });
    xiaowen(1090, 702, 26, { ...move('sway', t, 2), eyes: 'crescent', mouth: 'smile', lookX: -1, glow: 1.1, aL: glint > .3 ? .9 : .4 });
    if (glint > .1 && glint < .9) { // the silver glint ripples out from him
      const r = 60 + glint * 320;
      paint(ellPts(870, 620, r, r * .8, 24, 3), { wash: SILVERISH(), washOp: 60 * (1 - glint), ink: null });
    }
    if (land > .9 && land < 1) sfx('叮', 905, 480, 54, '#F7E9C4', t - 115.7, { life: .6 });
    camEnd();
  }
  const SILVERISH = () => '#C7D4E4';

  // =====================================================================================
  // 116.82–121.0 我会再变得柔软一点点 — wind through the grass, two shooting stars
  // =====================================================================================
  function breeze(t, lt) {
    camBegin(960, 600, 1.04 + Math.sin(lt * .5) * .02, 0);
    nightHill(t, { river: .5, flowers: 6 });
    for (let i = 0; i < 5; i++) {
      const k = frac(t * .3 + hash(i * 3.3)), x0 = lerp(-100, 2100, hash(i * 7.1)) - k * 300;
      inkLine([[x0, 250 + hash(i * 5.3) * 300], [x0 + 90, 244 + hash(i * 5.3) * 300]], 1.2, '#8B97C9', 'ink', .5);
    }
    // grass waves bending in the wind
    for (let i = 0; i < 12; i++) {
      const gx = 100 + i * 160, gy = 760 + Math.pow((gx - 960) / 1380, 2) * 430 + hash(i * 3.1) * 160;
      if (gy > 1000) continue;
      const bend = Math.sin(t * 2.2 + i * .8) * 14;
      inkLine([[gx, gy], [gx + bend, gy - 26], [gx + bend * 1.8, gy - 40]], 1.2, '#33503C', 'inkfine', .5);
    }
    shootStar(t, 117.4, 1500, 160, 2.6, 1, 380);
    shootStar(t, 119.3, 400, 120, .5, 1, 340);
    xiaofan(840, 700, 25, { ...move('sway', t), eyes: 'crescent', mouth: 'smile', warm: .6, blush: true, lookY: -.5, lookX: -.4 });
    xiaowen(1080, 698, 25, { ...move('sway', t, 1), eyes: 'crescent', mouth: 'smile', glow: 1.2, lookY: -.5, lookX: .4, blush: true });
    camEnd();
  }

  // =====================================================================================
  // 121.0–123.21 因为你太敏感 — every hoot makes her curl twitch; he drapes his scarf on her
  // =====================================================================================
  function sensitive(t, lt) {
    const scarf = seg(t, 122.1, 122.75);
    camBegin(1020, 620, 1.52, 0);
    nightHill(t, { river: .3, moon: null, stars: 18 });
    // the owl in a little tree, hooting on the beats
    push(); translate(430, 850);
    inkLine([[0, 0], [-6, -150]], 7, '#3E3450', 'ink', .3);
    paint(ellPts(-8, -180, 60, 46, 12, 2), { wash: '#44523E', washOp: 235, ink: null });
    const hoot = Math.sin(bpOf(t) * Math.PI) > .92 && beatN(t) % 4 === 0;
    push(); translate(-8, -186); scale(1, hoot ? 1.08 : 1);
    paint(ellPts(0, 0, 26, 30, 14, 1.5), { wash: '#B08A5E', washOp: 255, ink: PAL.ink, sw: 1.1 });
    paint([[-16, -22], [-24, -38], [-6, -26]], { wash: '#B08A5E', ink: PAL.ink, sw: .9 });
    paint([[16, -22], [24, -38], [6, -26]], { wash: '#B08A5E', ink: PAL.ink, sw: .9 });
    for (const ex of [-9, 9]) { paint(ellPts(ex, -4, 7, 7, 8), { wash: '#F3EBD3', ink: PAL.ink, sw: .8 }); paint(ellPts(ex, -4, 3, hoot ? 1 : 4, 6), { wash: PAL.ink, ink: null }); }
    inkLine([[-4, 10], [0, 13], [4, 10]], 1.4, PAL.ink, 'ink', .4);
    pop();
    pop();
    if (hoot && t < 121.9) sfx('咕咕', 470, 600, 56, '#B08A5E', .2, { life: .7, rot: -.1 });
    // 小温 flinches at each hoot until the scarf lands
    const flinch = hoot && scarf < .9 ? Math.max(0, 1 - frac(bpOf(t)) * 3) : 0;
    xiaowen(1080, 700, 27, { ...move('idle', t, 2), eyes: scarf > .9 ? 'crescent' : 'wide', lookY: scarf > .9 ? 0 : -.6, mouth: scarf > .9 ? 'smile' : 'o', glow: 1.15, sq: flinch * .18, dy: -flinch * 1.2, blush: scarf > .9,
      draw: (u, sw) => { if (scarf > .02) { const sk = backOut(scarf); push(); scale(sk); paint(rrPts(-2.6 * u, -7.1 * u, 5.2 * u, 1.15 * u, .5 * u), { wash: '#D8394E', washOp: 255, ink: PAL.ink, sw: sw * .7 }); paint(rectPts(1.6 * u, -6.2 * u, .9 * u, 2.1 * u, .3 * u), { wash: '#C22747', ink: PAL.ink, sw: sw * .5 }); pop(); } } });
    // 小凡 steps over and drapes it
    xiaofan(lerp(760, 880, ease(scarf)), 702, 27, { eyes: 'happy', lookX: 1, mouth: 'smile', warm: .62, aR: lerp(.4, 1.5, ease(scarf)), emote: scarf > .95 ? 'heart' : null, emoteK: seg(t, 122.8, 123.1), ...move('idle', t) });
    camEnd();
  }

  // =====================================================================================
  // 123.21–125.85 交换无名指金色的契约 — the ring on their hooked pinkies; the star river blazes
  // =====================================================================================
  function ringRiver(t, lt) {
    const hook = seg(t, 123.3, 123.9), blaze = seg(t, 124.35, 125.3);
    camBegin(960, 590, lerp(1.6, 1.44, blaze), 0);
    nightHill(t, { river: .5 + blaze * .5, stars: 30 + blaze * 20 });
    xiaofan(880, 700, 28, { eyes: 'crescent', mouth: 'smile', blush: true, warm: .66, aR: 1.45, pinkyR: true, lookX: 1, ...move('idle', t) });
    xiaowen(1055, 698, 28, { flip: true, eyes: 'crescent', mouth: 'smile', blush: true, glow: 1.25, aL: 1.45, pinkyL: true, lookX: 1, ...move('idle', t, 1) });
    // the ring now sits ON the hooked pinkies
    if (hook > .7) ringProp(968, 648, .62, { rot: .15, flat: true, glow: .7 + blaze * .3, spark: pulse(t, 2) * blaze, holeCol: '#F2C9A0' });
    if (blaze > 0 && blaze < 1) flash(.35 * blaze * (1 - blaze * .5), '#E8ECF4');
    if (blaze > .1 && t < 124.9) sfx('哗——', 960, 330, 70, '#C7D4E4', t - 124.45, { life: .9, rot: 0 });
    camEnd();
  }

  // =====================================================================================
  // 125.85–128.69 给彼此岁月 — an infinity of stars writes itself above them
  // =====================================================================================
  function writtenStars(t, lt) {
    const inf = seg(t, 126.1, 128.2);
    camBegin(960, 590, 1.14, 0);
    nightHill(t, { river: .9, stars: 44, flowers: 3 });
    // the infinity constellation draws itself
    const loop = [];
    for (let i = 0; i <= 40; i++) { const a = i / 40 * TAU; loop.push([960 + Math.sin(a * 2) * 260, 300 + Math.sin(a) * 90]); }
    inkLine(partial(loop, inf), 1.6, '#E8ECF4', 'inkfine', .5);
    for (let i = 0; i < 10; i++) {
      if (inf * 41 < i * 4.1) break;
      const p = loop[i * 4], tw = .6 + .4 * Math.sin(t * 3 + i * 1.9);
      paint(ellPts(p[0], p[1], 6 * tw + 3, 6 * tw + 3, 8), { wash: '#F3EBD3', washOp: 235, ink: null });
    }
    // golden motes drift down like slow sand
    petalRain(t, { n: 14, kind: 'spark', cols: ['#F7D98C'], wind: .3, fall: .25, area: [200, 100, 1500, 500], op: 200 });
    // two lantern cranes cross
    for (const [ph, y, sp, flip] of [[0, 330, .5, 1], [2.6, 250, .38, -1]]) {
      const k = frac(t * .06 * sp + ph / 8);
      const cx = lerp(-160, W + 160, k), cy = y + Math.sin(t * 1.3 + ph) * 24;
      paperCrane(cx, cy, 16, t, { flip: flip < 0, ph });
      paint(rectPts(cx - 7, cy + 12, 14, 16, 3), { wash: '#F2C14E', washOp: 230, ink: PAL.ink, sw: .8 });
      paint(ellPts(cx, cy + 22, 20, 20, 10), { fill: '#F2C14E', fillOp: 55, bleed: .3, ink: null });
    }
    xiaofan(850, 700, 25, { eyes: 'crescent', mouth: 'smile', warm: .7, blush: true, lookY: -.4, ...move('idle', t) });
    xiaowen(1070, 698, 25, { eyes: 'crescent', mouth: 'smile', glow: 1.2, lookY: -.4, blush: true, ...move('idle', t, 1) });
    camEnd();
  }

  // =====================================================================================
  // 128.69–132 说好从今以后都牵着手 — walking the crest, fireflies trailing
  // =====================================================================================
  function crestWalk(t, lt) {
    const walk = seg(t, 128.8, 131.6);
    const px = lerp(700, 1180, ease(walk));
    camBegin(px + 60, 640, 1.16, 0);
    nightHill(t, { river: .7, stars: 34, flowers: 4 });
    // firefly trail behind them
    for (let i = 0; i < 8; i++) {
      const tr = clamp(walk * 8 - i * .8); if (tr <= 0) break;
      const fx = px - 60 - i * 46 - Math.sin(t * 1.8 + i) * 12, fy = 640 + Math.sin(i * 2.1 + t * 1.4) * 26;
      paint(ellPts(fx, fy, 4.5, 4.5, 8), { fill: '#F7E9C4', fillOp: 170, bleed: .3, ink: null });
    }
    xiaofan(px - 64, 694, 22, { eyes: 'crescent', mouth: 'smile', warm: .5, blush: true, aR: -.22, ...move('walk', t) });
    xiaowen(px + 68, 692, 22, { flip: true, eyes: 'crescent', mouth: 'smile', glow: 1.25, blush: true, aL: -.22, ...move('walk', t, 1) });
    // thread wraps their wrists, then the clasped hands over it
    push(); translate(px + 2, 640);
    paint(ellPts(-13, 4, 24, 19, 12, 1.2), { wash: mixCol(PAL.fan, PAL.wen, .3), ink: PAL.ink, sw: 1.1 });
    paint(ellPts(13, -2, 24, 19, 12, 1.2), { wash: PAL.wen, ink: PAL.ink, sw: 1.1 });
    pop();
    // the horizon quietly warms: the journey (and the dawn) is coming
    const pre = seg(t, 131, 132);
    if (pre > 0) paint(rectPts(-400, 300, W + 800, 400), { fill: '#E8A862', fillOp: 50 * pre, bleed: .4, tex: .2, ink: null });
    camEnd();
  }

  chapter('hill_night', 112, 132, [
    [111.77, shine], [114.85, ordinary], [116.82, breeze], [121.0, sensitive],
    [123.21, ringRiver], [125.85, writtenStars], [128.69, crestWalk]
  ]);
})();
