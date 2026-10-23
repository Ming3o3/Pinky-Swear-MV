// c01_letter: 主歌一 (21–44). Eight "你是……" vignettes in ink-blue and cream.
// Shots: poem-birds 21.02 · storybook end 25.2 · miracle bloom 27.2 · moon smile 30.0 ·
//        chimney gift 33.04 · 小温 unboxed 36.25 · three thousand worlds 38.0 · one ladle of water 42.0.
(() => {
  const BIRD = '#4A5A78';

  // tiny flapping bird from a former brushstroke
  function bird(x, y, s, ph, col = BIRD) {
    const f = Math.sin(T * 9 + ph);
    push(); translate(x, y); rotate(f * .15 + .2); scale(s);
    paint([[-10, 2], [0, 0], [10, 2]], { wash: col, ink: null, curv: .5 });
    inkLine([[-9, 1], [-3, -6 - f * 5], [1, -1]], 1.6, col, 'ink', .5);
    inkLine([[9, 1], [3, -6 - f * 5], [-1, -1]], 1.6, col, 'ink', .5);
    paint(ellPts(9.5, 1, 2.6, 2.2, 8), { wash: col, ink: null });
    pop();
  }

  // =====================================================================================
  // 21.02–25.2 你是信的开头诗的内容 — the opening verse writes itself, then flies away as birds
  // =====================================================================================
  function openingVerse(t) {
    camBegin(960, 500, 1.05 + pulse(t, 3) * .012, .012);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: '#E3CFA8', washOp: 255, ink: null });
    paint(ellPts(300, 200, 420, 260, 20, 5), { fill: '#D3BC8E', fillOp: 110, bleed: .4, tex: .3, ink: null });
    paint(ellPts(1650, 900, 400, 240, 20, 5), { fill: '#C9B183', fillOp: 90, bleed: .4, tex: .3, ink: null });
    // the letter
    push(); translate(960, 470); rotate(-.025);
    paint(rectPts(-470, -290, 940, 580, 10), { wash: '#B99F6E', washOp: 90, ink: null });
    paint(rectPts(-460, -280, 920, 560, 10), { wash: '#FFFDF4', washOp: 255, ink: PAL.ink, sw: 1.6 });
    for (let i = 1; i < 4; i++) inkLine([[-410, -280 + i * 130 + jit(1)], [410, -280 + i * 130]], .5, '#C9D2E0', 'inkfine', 0);
    // the poem writes itself stroke by stroke
    const wk = seg(t, 21.5, 23.3);
    if (wk > 0) {
      const n = 26;
      for (let i = 0; i < n; i++) {
        const x = -400 + i * 32;
        if (i / n > wk) break;
        const yy = -180 + (i % 2 ? 10 : 0);
        inkLine([[x, yy + jit(2)], [x + 14, yy + 9 + jit(2)], [x + 28, yy - 3 + jit(2)], [x + 40, yy + 8]], 3, '#3E4E6E', 'inkfine', .7);
      }
    }
    // the last strokes lift off and become birds
    if (t > 23.2) for (let i = 0; i < 5; i++) {
      const t0 = 23.25 + i * .22, k = seg(t, t0, t0 + 2.4);
      if (k <= 0) continue;
      const x = lerp(-280 + i * 150, 1500 + i * 120, ease(k)), y = -280 - ease(k) * 260 - i * 22 + Math.sin(k * 6 + i) * 24;
      push(); translate(0, 0);
      bird(x, y, 1.5 + i * .2, i * 2, BIRD);
      pop();
      if (k < .3) paint(ellPts(lerp(-280 + i * 150, x, .4), lerp(-180, y, .4), 26 * (1 - k * 3), 14 * (1 - k * 3), 8), { wash: '#3E4E6E', washOp: 120 * (1 - k * 3), ink: null });
    }
    pop();
    // 小凡 writing, delighted
    const m = move('idle', t);
    xiaofan(280, 930, 14, { ...m, eyes: 'happy', mouth: 'smile', aR: 1 + Math.sin(t * 3.2) * .15, lookX: .7, armR: (u, sw) => inkLine([[0, 0], [u * .8, -u * .3]], sw * .8, PAL.ochre, 'ink', 0), emote: t > 23.6 ? 'spark' : null, emoteK: seg(t, 23.6, 23.9) });
    camEnd();
  }

  // =====================================================================================
  // 25.2–27.2 童话的结尾 — a storybook's last page: the castle, “全剧终”, fireworks
  // =====================================================================================
  function storybook(t) {
    camBegin(960, 520, 1.14, -.01);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: '#EFE2C6', washOp: 255, ink: null });
    push(); translate(960, 540); rotate(.015);
    // open book
    paint(rrPts(-540, -260, 1080, 520, 14), { wash: '#FFFDF4', washOp: 255, ink: PAL.ink, sw: 1.8 });
    inkLine([[0, -260], [0, 260]], 1.4, '#C9B88C', 'inkfine', 0);
    // left page: the paper castle
    push(); translate(-270, 40);
    const towers = [[-140, 90, 40], [-60, 60, 34], [30, 95, 44], [120, 70, 32]];
    towers.forEach(([tx, ty, ts], i) => {
      const k = backOut(seg(t, 25.35 + i * .1, 25.6 + i * .1)); if (k < .02) return;
      push(); translate(tx, ty); scale(k);
      paint(rectPts(-ts, -ts * 1.7, ts * 2, ts * 1.7, 3), { wash: '#C9CFDA', washOp: 255, ink: PAL.ink, sw: 1.1 });
      paint([[-ts * 1.15, -ts * 1.7], [0, -ts * 2.45], [ts * 1.15, -ts * 1.7]], { wash: '#8E9AB2', ink: PAL.ink, sw: 1 });
      inkLine([[0, -ts * 2.45], [0, -ts * 3]], 1.2, PAL.ink, 'inkfine', 0);
      paint([[0, -ts * 3], [ts * .55, -ts * 2.85], [0, -ts * 2.7]], { wash: PAL.rose, ink: null });
      pop();
    });
    pop();
    // right page: the flip, then 全剧终
    const flip = ease(seg(t, 25.5, 25.85));
    if (flip < 1) { push(); translate(270, 0); scale(1 - flip, 1); paint(rectPts(-270, -260, 540, 520, 8), { wash: '#F4ECD8', washOp: 255, ink: PAL.ink, sw: 1.2 }); pop(); }
    if (flip > .5) ['全', '剧', '终'].forEach((c, i) => {
      const k = backOut(seg(t, 25.9 + i * .12, 26.1 + i * .12));
      if (k > .02) letter(c, 1110 + i * 120, 552, 130, PAL.ink, { font: '130px MaShanZheng, WenKai', pop: seg(t, 25.9 + i * .12, 26.1 + i * .12) });
    });
    // the words burst into little fireworks on the beat
    if (t > 26.4) {
      for (let i = 0; i < 14; i++) {
        const a = hash(i * 3.3) * TAU, r = (60 + hash(i * 5.1) * 260) * easeOut(seg(t, 26.4, 27.2)), x = 960 + Math.cos(a) * r * 1.4, y = 560 + Math.sin(a) * r;
        const c = [PAL.rose, PAL.ochre, '#9CC4D8', '#B99BD6'][i % 4];
        paint(starPts(x, y, 10 + 8 * hash(i), .45, 4, a), { wash: c, washOp: 235, ink: PAL.ink, sw: .6 });
      }
      if (t < 26.7) sfx('啪', 1150, 330, 64, PAL.ochre, t - 26.4, { life: .7 });
    }
    pop();
    camEnd();
    // the golden flash is a full-screen effect — it must be OUTSIDE the book's transform,
    // otherwise it only covers the right half of the frame (the "yellow curtain" bug)
    if (t > 26.4) { const k = seg(t, 26.4, 27.2); if (k < 1) flash(.3 * (1 - k), '#F7D98C'); }
  }

  // =====================================================================================
  // 27.2–30.0 你是理所当然的奇迹 — a grey street bursts into bloom
  // =====================================================================================
  function miracle(t) {
    const bloom = seg(t, 28.26, 29.4), b2 = seg(t, 28.9, 29.9);
    camBegin(960, 540, 1.08 + bloom * .05, 0);
    // grey world
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: mixCol('#D9D5CC', '#F2E8D0', bloom), washOp: 255, ink: null });
    paint(rectPts(-400, 300, W + 800, 420), { wash: mixCol('#C4C0B8', '#BFE0EE', b2), washOp: 200, ink: null });
    // street
    paint([[-400, 700], [W + 400, 700], [W + 400, 1120], [-400, 1120]], { wash: mixCol('#B2AEA6', '#C9B899', bloom), washOp: 255, fill: '#8E8676', fillOp: 30 * (1 - bloom), ink: null });
    inkLine([[-400, 700], [W + 400, 700 + jit(2)]], 1.4, PAL.ink, 'ink', 0);
    // houses colour up
    const hs = [[240, 700, 130], [620, 700, 105], [1620, 700, 125], [1880, 700, 95]];
    hs.forEach(([hx, hy, hw], i) => {
      const k = clamp(bloom * 1.3 - i * .1);
      paint(rectPts(hx - hw / 2, hy - hw * 1.15, hw, hw * 1.15, 4), { wash: mixCol('#CFCABC', ['#D8A48C', '#A8C4B2', '#C9B37E', '#B9A8CC'][i], k), washOp: 255, fill: mixCol('#9C968A', '#7C6A52', k * .5), fillOp: 35, tex: .5, ink: PAL.ink, sw: 1.2 });
      paint(rectPts(hx - hw * .16, hy - hw * .55, hw * .32, hw * .55, 2), { wash: '#6E5B44', ink: PAL.ink, sw: .9 });
      paint(rectPts(hx - hw * .38, hy - hw * .95, hw * .2, hw * .2, 2), { wash: k > .5 ? '#F2DFAE' : '#B2AEA6', ink: PAL.ink, sw: .8 });
    });
    // the tree: bare, then one beat of pink
    push(); translate(1080, 830);
    inkLine([[0, 0], [6, -90], [2, -170]], 7, '#6E5B44', 'ink', .4);
    inkLine([[4, -110], [50, -160]], 4, '#6E5B44', 'ink', .3);
    inkLine([[5, -140], [-46, -190]], 4, '#6E5B44', 'ink', .3);
    inkLine([[2, -170], [30, -230]], 3.2, '#6E5B44', 'ink', .3);
    inkLine([[2, -170], [-26, -236]], 3.2, '#6E5B44', 'ink', .3);
    if (bloom > .25) {
      const k = ease(seg(t, 28.5, 29.3));
      for (let i = 0; i < 16; i++) {
        const a = hash(i * 3.7) * TAU, r = 40 + hash(i * 7.3) * 110, bx = Math.cos(a) * r, by = -150 + Math.sin(a) * r * .8;
        const bk = clamp(seg(t, 28.4 + hash(i * 1.9) * .5, 28.7 + hash(i * 1.9) * .5));
        if (bk <= 0) continue;
        paint(ellPts(bx, by, 22 * bk, 17 * bk, 10, 2), { fill: i % 3 ? '#F5B8C4' : '#FFFDF4', fillOp: 200, bleed: .3, tex: .3, ink: null });
      }
      if (t > 28.55 && t < 28.9) sfx('噗', 1230, 500, 66, PAL.rose, t - 28.55, { life: .8, rot: .12 });
    }
    pop();
    if (b2 > .05) paint(rectPts(-400, -400, W + 800, H + 800), { fill: '#F2D98C', fillOp: 45 * b2, bleed: .3, tex: .2, ink: null });
    // 小凡 walking through, amazed
    const wx = lerp(330, 880, seg(t, 27.3, 29.6)), m = move('walk', t);
    xiaofan(wx, 985, 15, { ...m, eyes: bloom > .3 ? 'spark' : 'normal', mouth: bloom > .3 ? 'O' : 'flat', lookX: .4, emote: bloom > .35 ? '!' : null, emoteK: seg(t, 28.5, 28.8) });
    camEnd();
  }

  // =====================================================================================
  // 30.0–33.04 你是月色真美 — the crescent moon bends into a smiling eye; a boat on the water
  // =====================================================================================
  function moonlight(t) {
    const smile = seg(t, 31.05, 31.8);
    camBegin(960, 520, 1.06, .015);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: '#2C3257', washOp: 255, ink: null });
    paint(rectPts(-400, 200, W + 800, 420), { wash: '#3A4270', washOp: 150, ink: null });
    starField(t, { n: 34, seed: 3, h: 620 });
    // the moon
    push(); translate(1380, 260); rotate(-.35 + smile * .25);
    const r = 150;
    paint(ellPts(0, 0, r * 1.5, r * 1.5, 22, 3), { fill: '#F3EBD3', fillOp: 40, bleed: .35, ink: null });
    // crescent: big disc minus an offset bite (the bite shrinks as it “smiles”)
    paint(ellPts(0, 0, r, r, 30, 1.5), { wash: '#F3EBD3', washOp: 250, fill: PAL.ochre, fillOp: 40, tex: .4, ink: PAL.ink, sw: 1.3 });
    paint(ellPts(r * .42, -r * (.42 - smile * .1), r * .78, r * (.78 - smile * .16), 26), { wash: mixCol('#2C3257', '#373E66', .4), washOp: 255, ink: null });
    if (smile > .5) { // sleepy happy face
      const k = clamp((smile - .5) * 2);
      for (const ex of [-r * .38, -r * .05]) inkLine([[ex - 16 * k, -r * .25], [ex, -r * .38 * k], [ex + 16 * k, -r * .25]], 3 * k, PAL.ink, 'ink', .5);
      for (const bx of [-r * .5, r * .05]) paint(ellPts(bx, -r * .05, 15 * k, 8 * k, 8), { wash: PAL.rose, washOp: 170 * k, ink: null });
      if (k > .5 && t < 31.7) sfx('♪', 1240, 130, 60, PAL.ochre, t - 31.3, { life: 1 });
    }
    pop();
    // water
    paint([[-400, 700], [W + 400, 690], [W + 400, 1120], [-400, 1120]], { wash: '#37406E', washOp: 255, fill: '#232A52', fillOp: 70, bleed: .1, tex: .5, ink: PAL.ink, sw: 1.2, curv: .4 });
    for (let i = 0; i < 7; i++) {
      const ry = 740 + i * 48, rx = 300 + hash(i * 3.1) * 1200, wob = Math.sin(t * 1.6 + i * 1.4) * 40;
      inkLine([[rx - 130 + wob, ry], [rx + 60 + wob, ry + 5], [rx + 180 + wob, ry]], 1, '#8B97C9', 'inkfine', .6);
    }
    // moon path glitter
    for (let i = 0; i < 5; i++) { const gy = 730 + i * 56; paint(ellPts(1380 - i * 26 + Math.sin(t * 2 + i) * 16, gy, 26 - i * 4, 5, 8), { wash: '#F3EBD3', washOp: 130 - i * 18, ink: null }); }
    // paper boat with 小凡
    const bob = Math.sin(t * 1.4) * 5;
    push(); translate(700, 830 + bob); rotate(Math.sin(t * 1.4 + 1) * .06);
    paint([[0, -60], [130, 30], [0, 44], [-130, 30]], { wash: '#FFFDF4', washOp: 250, ink: PAL.ink, sw: 1.4, curv: .2 });
    paint([[0, -60], [26, -8], [-26, -8]], { wash: '#E8DAB4', ink: PAL.ink, sw: 1, curv: .2 });
    xiaofan(0, 6, 9.5, { noLegs: true, sit: true, eyes: 'happy', mouth: 'smile', lookX: .8, aR: -.7, blush: true });
    pop();
    camEnd();
  }

  // =====================================================================================
  // 33.04–36.25 你是圣诞老人送给我 — a gift slides down the chimney
  // =====================================================================================
  function chimney(t) {
    camBegin(960, 540, 1.1 + pulse(t, 4) * .008);
    // room
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: '#3A3B5E', washOp: 255, ink: null });
    paint(rectPts(-400, 300, W + 800, 380), { wash: '#4A4B72', washOp: 140, ink: null });
    starField(t, { n: 14, seed: 8, h: 300 });
    // floor
    paint([[-400, 760], [W + 400, 760], [W + 400, 1120], [-400, 1120]], { wash: '#7C5A40', washOp: 255, fill: '#5C4230', fillOp: 60, bleed: .08, tex: .6, ink: PAL.ink, sw: 1.3 });
    for (let i = -5; i <= 5; i++) inkLine([[960 + i * 220, 762], [960 + i * 260, 1120]], .5, '#5C4230', 'inkfine', 0);
    // fireplace with warm fire
    push(); translate(1430, 800);
    paint(rectPts(-230, -430, 460, 430, 8), { wash: '#8E5A44', washOp: 255, fill: '#6E4232', fillOp: 55, tex: .55, ink: PAL.ink, sw: 1.5 });
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) inkLine([[-230 + c * 92 + (r % 2) * 46, -430 + r * 68], [-230 + c * 92 + 70 + (r % 2) * 46, -430 + r * 68]], .6, '#5C3428', 'inkfine', 0);
    paint([[0, 0], [-110, -10], [-90, -160], [0, -220], [90, -160], [110, -10]], { wash: '#2A1B22', ink: PAL.ink, sw: 1.2, curv: .4 });
    const fk = 1 + Math.sin(t * 9) * .12;
    paint([[0, -10], [-55, -70 * fk], [0, -150 * fk], [55, -70 * fk]], { wash: PAL.ochre, fill: '#D8632F', fillOp: 90, bleed: .25, tex: .4, ink: null, curv: .5 });
    paint(ellPts(0, -30, 26, 20, 10), { fill: '#F2B95A', fillOp: 110, bleed: .3, ink: null });
    pop();
    // christmas tree on the left, twinkling
    push(); translate(360, 962);
    inkLine([[0, 0], [0, -46]], 9, '#5E4232', 'ink', 0);
    const tier = (cy, w) => paint([[-w, cy], [0, cy - 118], [w, cy]], { wash: '#46685A', washOp: 255, fill: '#324E44', fillOp: 55, bleed: .15, tex: .5, ink: PAL.ink, sw: 1.2, curv: .3 });
    tier(-50, 132); tier(-120, 102); tier(-182, 72);
    paint(starPts(0, -308, 25, .45, 5), { wash: '#F2C14E', fill: PAL.ochre, fillOp: 80, ink: PAL.ink, sw: 1 });
    const BA = [[-72, -76, 0], [-18, -92, 1], [44, -70, 2], [-48, -148, 1], [30, -136, 0], [-10, -206, 2], [40, -188, 1]];
    for (const [bx, by, ci] of BA) paint(ellPts(bx, by, 9, 10, 8), { wash: [PAL.rose, PAL.ochre, '#FFFDF4'][ci], washOp: 235, ink: PAL.ink, sw: .7 });
    for (let i = 0; i < 6; i++) {
      const lx = [-52, 8, 58, -30, 34, -58][i], ly = [-60, -112, -44, -160, -192, -128][i];
      const tw2 = .5 + .5 * Math.sin(t * 2.4 + i * 2.2);
      paint(ellPts(lx, ly, 3.5, 3.5, 6), { fill: '#F7E9C4', fillOp: 110 + 110 * tw2, bleed: .3, ink: null });
    }
    pop();
    // garland across the top
    for (let i = 0; i <= 12; i++) { const x = i * 160, y = 120 + Math.sin(i / 12 * Math.PI) * 90; if (i) inkLine([[(i - 1) * 160, 120 + Math.sin((i - 1) / 12 * Math.PI) * 90], [x, y]], 2.2, '#4E6E46', 'ink', .5); }
    for (let i = 1; i < 12; i += 2) { const x = i * 160, y = 120 + Math.sin(i / 12 * Math.PI) * 90 + 12; paint(ellPts(x, y, 14, 18, 8), { wash: [PAL.rose, PAL.ochre][i % 2], ink: PAL.ink, sw: .8 }); }
    // 小凡 waiting by the fireplace, then notices the box
    const wk = seg(t, 34.9, 35.6), wx = lerp(560, 900, wk), m = move(wk > .9 ? 'idle' : 'walk', t);
    xiaofan(wx, 1000, 15, { ...m, eyes: t > 35.2 ? 'wide' : 'normal', lookX: t > 35.2 ? .8 : 0, mouth: t > 35.2 ? 'O' : 'smile', emote: t > 35.3 ? '!' : null, emoteK: seg(t, 35.3, 35.6), lookY: t > 35.2 ? -.4 : 0 });
    // the gift slides down the chimney
    const dk = seg(t, 33.7, 35.15), dy = lerp(-950, 905, easeIn(dk) * .8 + easeOut(dk) * .2);
    const landed = t >= 35.15, sq = landed ? Math.max(0, .3 * Math.exp(-(t - 35.15) * 7)) : 0;
    push(); translate(1430, dy);
    if (sq > 0) { scale(1 + sq * .4, 1 - sq); }
    paint(rectPts(-95, -95, 190, 190, 10), { wash: '#D8394E', washOp: 255, fill: '#8E1F33', fillOp: 55, tex: .5, ink: PAL.ink, sw: 1.5 });
    paint(rectPts(-16, -95, 32, 190, 2), { wash: PAL.gold, ink: PAL.ink, sw: 1 });
    paint(rectPts(-95, -16, 190, 32, 2), { wash: PAL.gold, ink: PAL.ink, sw: 1 });
    for (const s of [-1, 1]) { push(); translate(s * 22, -100); rotate(s * .5); paint(ellPts(0, 0, 26, 16, 10, 0, s * .8), { wash: PAL.gold, ink: PAL.ink, sw: 1 }); pop(); }
    pop();
    if (dk > 0 && dk < 1) { // ribbon of sparkles trailing
      for (let i = 0; i < 4; i++) paint(starPts(1430 + (hash(i * 3) - .5) * 90, dy - 130 - i * 60, 8, .45, 4), { wash: '#FFF6D8', fill: PAL.ochre, fillOp: 80, ink: null });
    }
    if (landed && t < 35.5) { sfx('咚', 1600, 830, 70, PAL.rose, t - 35.15, { life: .6 }); paint(ellPts(1430, 1010, 130 * (1 - seg(t, 35.15, 35.5)), 24, 12), { wash: '#5C4230', washOp: 160 * (1 - seg(t, 35.15, 35.5)), ink: null }); }
    // the fire dims politely while the gift passes
    if (dk > .5 && dk < 1) paint(rectPts(1200, 370, 460, 430), { fill: '#2A1B22', fillOp: 60 * Math.sin(dk * Math.PI), bleed: .2, ink: null });
    camEnd();
  }

  // =====================================================================================
  // 36.25–38.0 好孩子的礼物 — the lid pops: golden light, and inside is 小温
  // =====================================================================================
  function unbox(t) {
    const shake = t > 36.45 && t < 36.85, lid = seg(t, 36.9, 37.25), pup = seg(t, 37.1, 37.5);
    const [sx, sy] = shakeXY(t, shake ? 7 : 0);
    camBegin(960 + sx, 560 + sy, lerp(1.05, 1.22, seg(t, 36.3, 37.6)), 0);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: '#4A4B72', washOp: 255, ink: null });
    starField(t, { n: 16, seed: 8, h: 360 });
    paint([[-400, 800], [W + 400, 800], [W + 400, 1120], [-400, 1120]], { wash: '#7C5A40', washOp: 255, fill: '#5C4230', fillOp: 60, ink: null });
    // golden light bursts when the lid pops
    if (lid > 0) {
      const g = ease(lid);
      paint(ellPts(960, 760, 320 * g, 300 * g, 24, 4), { fill: '#F7D98C', fillOp: 160 * g, bleed: .4, tex: .2, ink: null });
      for (let i = 0; i < 9; i++) {
        const a = -Math.PI * (.12 + .76 * i / 8), L = (380 + 200 * hash(i * 3.7)) * g;
        paint([[960 + Math.cos(a + .09) * 60, 720], [960 + Math.cos(a) * L, 720 + Math.sin(a) * L], [960 + Math.cos(a - .09) * 60, 720]], { fill: '#F7E9C4', fillOp: 120 * g, bleed: .25, tex: .3, ink: null });
      }
      if (t > 36.9 && t < 37.2) flash(.5 * (1 - seg(t, 36.9, 37.3)), '#F7E9C4');
    }
    // the box
    push(); translate(960, 810); if (shake) rotate(Math.sin(t * 40) * .05);
    const hop = lid > 0 ? Math.sin(clamp(lid) * Math.PI) * -26 : 0;
    translate(0, hop);
    paint(rectPts(-150, -150, 300, 300, 12), { wash: '#D8394E', washOp: 255, fill: '#8E1F33', fillOp: 55, tex: .5, ink: PAL.ink, sw: 1.6 });
    paint(rectPts(-26, -150, 52, 300, 2), { wash: PAL.gold, ink: PAL.ink, sw: 1 });
    paint(rectPts(-150, -150, 300, 52, 2), { wash: PAL.gold, ink: PAL.ink, sw: 1 });
    pop();
    // the lid flies
    if (lid > 0) {
      const lk = clamp(lid);
      push(); translate(960 + lk * 210, 640 - lk * 320); rotate(-lk * 2.4);
      paint(rrPts(-150, -46, 300, 92, 12), { wash: '#C22747', washOp: 255, ink: PAL.ink, sw: 1.5 });
      paint(rectPts(-26, -46, 52, 92, 2), { wash: PAL.gold, ink: PAL.ink, sw: 1 });
      pop();
    }
    // 小温 inside, glowing
    if (pup > 0) {
      const pk = backOut(pup), rise = lerp(120, -160, pk);
      push(); translate(0, rise);
      paint(ellPts(960, 745, 240 * ease(pup), 130, 20), { fill: '#F7D98C', fillOp: 120 * (1 - pup * .4), bleed: .35, ink: null });
      xiaowen(960, 780, 26, { eyes: 'spark', mouth: 'grin', aL: 1.1, aR: 1.1, dy: 0, emote: t < 37.8 ? '!' : 'heart', emoteK: seg(t, 37.2, 37.5) });
      pop();
      for (let i = 0; i < 6; i++) { const a = hash(i * 7) * TAU, r = (160 + hash(i * 3) * 120) * ease(pup); paint(starPts(960 + Math.cos(a) * r, 660 + Math.sin(a) * r * .7, 12, .45, 4), { wash: '#FFF6D8', fill: PAL.ochre, fillOp: 90, ink: PAL.ink, sw: .6 }); }
      if (pup > .2 && t < 37.9) sfx('叮', 1240, 430, 66, PAL.ochre, t - 37.25, { life: .9, rot: .14 });
    }
    // 小凡 peeking from the side
    if (t < 37.6) xiaofan(430, 1000, 14, { flip: true, eyes: 'wide', lookX: 1, lookY: -.5, mouth: 'O', sq: .1 * pulse(t, 8) });
    camEnd();
  }

  // =====================================================================================
  // 38.0–42.0 你是三千美丽世界里 — the sky fills with little watercolour worlds
  // =====================================================================================
  function worlds(t) {
    const drift = (t - 38);
    camBegin(960 + Math.sin(drift * .3) * 30, 520, 1.02 + pulse(t, 4) * .01);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: mixCol('#F2E8D0', '#8B97C9', seg(t, 38, 39.5)), washOp: 255, ink: null });
    paint(rectPts(-400, 500, W + 800, 300), { wash: mixCol('#E0D2B0', '#5E6899', seg(t, 38, 40)), washOp: 160, ink: null });
    starField(t, { n: 20, seed: 5, h: 400 });
    // bubble worlds: [x, y, r, scene, t0]
    const W7 = [
      [260, 250, 120, 'hill', 38.2], [760, 180, 84, 'sea', 38.45], [1290, 300, 130, 'night', 38.7], [1700, 200, 88, 'sakura', 38.95],
      [420, 640, 96, 'snow', 39.2], [1560, 680, 104, 'meadow', 39.45], [960, 420, 70, 'desert', 39.7]
    ];
    W7.forEach(([bx, by, br, scene, t0], i) => {
      const k = backOut(seg(t, t0, t0 + .5)); if (k < .02) return;
      const bob = Math.sin(t * 1.1 + i * 2) * 10, x = bx + Math.sin(t * .6 + i) * 14, y = by + bob;
      push(); translate(x, y); scale(k);
      const inner = {
        hill: () => { paint(ellPts(0, 0, br, br, 26), { wash: '#BFE0EE', washOp: 255, ink: null }); paint(ellPts(0, br * .55, br * 1.2, br * .75, 20), { wash: '#8FBF6F', washOp: 255, ink: null }); inkLine([[br * .2, br * .45], [br * .2, br * .05]], 2.5, '#5E4632', 'ink', 0); paint(ellPts(br * .2, -br * .12, br * .34, br * .3, 10), { wash: '#5E9648', ink: null }); },
        sea: () => { paint(ellPts(0, 0, br, br, 26), { wash: '#9CC4D8', washOp: 255, ink: null }); paint(rectPts(-br, br * .1, br * 2, br, 2), { wash: '#3A7C98', washOp: 230, ink: null }); paint([[0, -br * .3], [br * .4, br * .15], [0, br * .22], [-br * .4, br * .15]], { wash: '#FFFDF4', ink: PAL.ink, sw: .8 }); },
        night: () => { paint(ellPts(0, 0, br, br, 26), { wash: '#2C3257', washOp: 255, ink: null }); for (let s = 0; s < 8; s++) paint(ellPts((hash(s * 3.3) - .5) * br * 1.4, (hash(s * 5.1) - .5) * br * 1.4, 3, 3, 6), { wash: '#F3EBD3', washOp: 220, ink: null }); paint(ellPts(br * .3, -br * .3, br * .26, br * .26, 12), { wash: '#F3EBD3', washOp: 240, ink: null }); },
        sakura: () => { paint(ellPts(0, 0, br, br, 26), { wash: '#F7D4DC', washOp: 255, ink: null }); inkLine([[0, br * .6], [0, 0]], 3, '#6E4A3A', 'ink', 0); for (let p = 0; p < 5; p++) { const a = p / 5 * TAU; paint(ellPts(Math.cos(a) * br * .34, -br * .1 + Math.sin(a) * br * .3, br * .3, br * .24, 10), { wash: '#F0A8BC', ink: null }); } },
        snow: () => { paint(ellPts(0, 0, br, br, 26), { wash: '#DCE8F2', washOp: 255, ink: null }); paint(ellPts(0, br * .6, br * 1.2, br * .7, 18), { wash: '#FFFDF4', washOp: 240, ink: null }); paint(rectPts(-br * .1, -br * .1, br * .16, br * .6, 1), { wash: '#6E5B44', ink: null }); },
        meadow: () => { paint(ellPts(0, 0, br, br, 26), { wash: '#C4E39A', washOp: 255, ink: null }); paint(ellPts(0, br * .55, br * 1.2, br * .8, 18), { wash: '#8FBF6F', washOp: 255, ink: null }); for (let f = 0; f < 4; f++) paint(ellPts((hash(f * 7) - .5) * br, br * (.3 + hash(f * 3) * .4), 5, 5, 6), { wash: [PAL.rose, PAL.ochre, '#FFFDF4'][f % 3], ink: null }); },
        desert: () => { paint(ellPts(0, 0, br, br, 26), { wash: '#F2D98C', washOp: 255, ink: null }); paint(ellPts(0, br * .7, br * 1.3, br * .6, 18), { wash: '#D8A862', washOp: 255, ink: null }); paint(ellPts(br * .35, -br * .35, br * .2, br * .2, 12), { wash: '#E8874F', ink: null }); }
      };
      (inner[scene] || inner.hill)();
      paint(ellPts(0, 0, br, br, 26, 1), { ink: PAL.ink, sw: 1.1 });
      inkLine([[-br * .55, -br * .45], [-br * .2, -br * .68]], 1.4, '#FFFFFF', 'inkfine', .4);
      pop();
    });
    // 小凡 & 小温 tiny in the middle, taking it in
    xiaofan(890, 1000, 13, { eyes: 'spark', lookX: -.6, lookY: -.5, mouth: 'O', ...move('idle', t) });
    xiaowen(1040, 1000, 13, { eyes: 'happy', lookX: .6, lookY: -.5, mouth: 'smile', ...move('idle', t, 1) });
    camEnd();
  }

  // =====================================================================================
  // 42.0–44.0 我的一瓢水 — the ladle rises centre-frame; in its water, her reflection; she waves at herself
  // =====================================================================================
  function ladle(t) {
    const raise = ease(seg(t, 42.15, 42.8)), settle = seg(t, 42.8, 43.35), shine = seg(t, 43.3, 43.9);
    const notice = seg(t, 43.05, 43.35);
    camBegin(960, 560, lerp(.98, 1.16, raise) + pulse(t, 3) * .01, -.008);
    // night sky with the three-thousand-worlds bubbles drifting away behind
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: '#6E78A8', washOp: 255, ink: null });
    paint(rectPts(-400, 420, W + 800, 320), { wash: '#5E6899', washOp: 170, ink: null });
    starField(t, { n: 26, seed: 5, h: 460 });
    paint(ellPts(260, 170, 190, 190, 24, 4), { fill: '#F3EBD3', fillOp: 40, bleed: .35, ink: null });
    paint(ellPts(260, 170, 70, 70, 20), { wash: '#F3EBD3', washOp: 200, ink: null });
    paint(ellPts(300, 155, 52, 52, 18), { wash: '#6E78A8', washOp: 255, ink: null });
    for (let i = 0; i < 4; i++) { // departing bubble worlds
      const k = backOut(seg(t, 42 + i * .12, .55 + 42 + i * .12)); if (k < .02) continue;
      const bx = 1500 - i * 300 + Math.sin(t * .8 + i * 2) * 16, by = 420 - i * 60 - ease(seg(t, 42.2, 44)) * 90, br = (46 + hash(i * 3.3) * 26) * k;
      push(); translate(bx, by);
      paint(ellPts(0, 0, br, br, 18), { wash: ['#BFE0EE', '#F7D4DC', '#C4E39A', '#9CC4D8'][i], washOp: 110, ink: PAL.ink, sw: .9 });
      inkLine([[-br * .4, -br * .3], [-br * .1, -br * .5]], 1.2, '#FFFDF4', 'inkfine', .4);
      pop();
    }
    // the pool: soft dark water, no hard outline, light ripples
    paint(ellPts(1180, 1040, 820, 190, 30, 4), { wash: '#3E4E7E', washOp: 255, fill: '#2E3C68', fillOp: 70, bleed: .18, tex: .45, ink: null });
    for (let i = 0; i < 6; i++) {
      const rx = 620 + hash(i * 3.7) * 900, ry = 960 + hash(i * 5.1) * 140;
      inkLine([[rx, ry], [rx + 70, ry + 4], [rx + 140, ry]], 1.1, '#8B97C9', 'inkfine', .5);
    }
    // reeds on the far bank
    for (let i = 0; i < 6; i++) {
      const gx = 1560 + hash(i * 7.3) * 340, gy = 940 + hash(i * 3.1) * 30, sway = Math.sin(t * 1.8 + i) * 6;
      inkLine([[gx, gy], [gx + sway, gy - 46 - hash(i) * 26]], 2.2, '#2E3C68', 'ink', .4);
      paint(ellPts(gx + sway * 1.3, gy - 52 - hash(i) * 26, 5, 14, 8, 0, .5), { wash: '#4E5E8E', washOp: 200, ink: null });
    }
    // wooden dock, the two standing on it
    paint([[-120, 990], [700, 952], [790, 1120], [-120, 1120]], { wash: WOOD, washOp: 255, fill: WOOD_DK, fillOp: 60, bleed: .08, tex: .55, ink: PAL.ink, sw: 1.3 });
    for (let i = 0; i < 4; i++) inkLine([[-60 + i * 210, 975 - i * 9], [-30 + i * 210, 1120]], .55, WOOD_DK, 'inkfine', 0);
    // drips fall from the bowl back to the pool as it rises
    if (raise > .15 && raise < 1) for (let i = 0; i < 3; i++) {
      const dk = frac((t - 42.3) * 1.6 + i * .33);
      if (raise > .95) break;
      paint(ellPts(lerp(1180, 1060, raise) + (hash(i * 3) - .5) * 90, lerp(800, 1000, dk), 5, 7, 8), { wash: '#8B97C9', washOp: 210, ink: null });
    }
    // the ladle: rises from the pool to centre-frame, big
    const C = [lerp(1640, 980, raise), lerp(1150, 620, raise)], s = lerp(.5, 1.3, raise);
    const wob = Math.sin(t * 2.6) * 3 * settle;
    push(); translate(C[0], C[1] + wob); rotate(lerp(.1, -.06, raise));
    // handle up to the upper right
    push(); translate(150 * s, -120 * s); rotate(-.62);
    inkLine([[0, 0], [860 * s, 0]], 17 * s, '#8E5A44', 'ink', .2);
    inkLine([[0, -4 * s], [860 * s, -4 * s]], 5 * s, '#B87A4B', 'ink', .2);
    paint(rrPts(850 * s, -14 * s, 26 * s, 28 * s, 8 * s), { wash: '#7C4A2C', ink: PAL.ink, sw: clamp(1 * s, .6, 1.6) });
    pop();
    // bowl + rim
    paint(ellPts(0, 0, 258 * s, 205 * s, 26, 2.5), { wash: '#B87A4B', washOp: 255, fill: '#7C4A2C', fillOp: 60, tex: .5, ink: PAL.ink, sw: clamp(1.5 * s, .8, 2) });
    paint(ellPts(0, -8 * s, 218 * s, 168 * s, 24, 1.5), { wash: '#D9A868', washOp: 220, ink: PAL.ink, sw: clamp(1 * s, .6, 1.5) });
    // the water and, in it, her reflection resolving
    paint(ellPts(0, -4 * s, 190 * s, 140 * s, 24), { wash: '#8B97C9', washOp: 245, ink: null });
    const rk = ease(seg(settle, .1, .8));
    if (rk > .05) {
      const rw = Math.sin(t * 3.1) * 4 * s, rh = Math.sin(t * 2.3) * 2.5 * s;
      push(); translate(rw, 6 * s + rh);
      for (const ex of [-52, 52]) { paint(ellPts(ex * s, -14 * s, 17 * s, 21 * s, 10), { wash: PAL.wen, washOp: 235 * rk, ink: null }); paint(ellPts(ex * s, -14 * s, 7 * s, 9 * s, 8), { wash: PAL.ink, washOp: 235 * rk, ink: null }); inkLine([[ex * s - 13 * s, -32 * s], [ex * s, -42 * s], [ex * s + 13 * s, -32 * s]], 3 * s * rk, PAL.wenDk, 'ink', .5); }
      inkLine([[-22 * s, 26 * s], [0, 38 * s], [22 * s, 26 * s]], 3.4 * s * rk, PAL.ink, 'ink', .5);
      for (const bx of [-88, 88]) paint(ellPts(bx * s, 12 * s, 11 * s, 6 * s, 8), { wash: PAL.blush, washOp: 170 * rk, ink: null });
      // she waves at herself: the reflection waves back
      if (notice > .5) {
        const wv = Math.sin(t * 9) * .5;
        push(); translate(120 * s, -10 * s); rotate(wv);
        paint(rrPts(0, -9 * s, 44 * s, 18 * s, 9 * s), { wash: PAL.wen, washOp: 225 * rk, ink: PAL.ink, sw: clamp(1 * s, .5, 1.4) });
        pop();
      }
      pop();
      for (let i = 0; i < 2; i++) inkLine([[-120 * s - i * 26 * s, 30 * s + i * 18 * s], [-60 * s, 36 * s + i * 18 * s], [0, 30 * s + i * 20 * s]], 1.2 * s, '#DCE4F2', 'inkfine', .5);
    }
    if (shine > .3) paint(starPts(150 * s, -110 * s, 26 * s * shine, .45, 4), { wash: '#FFF6D8', fill: PAL.ochre, fillOp: 95, ink: PAL.ink, sw: .8 });
    pop();
    // the two lean over the dock edge, peering into the bowl
    xiaofan(330, 975, 29, { eyes: shine > .3 ? 'spark' : 'heart', mouth: 'smile', blush: true, warm: .5, rot: .1, lookX: 1, lookY: .55, ...move('idle', t),
      aR: 1.05, aL: .55 });
    xiaowen(565, 988, 22, { eyes: notice > .6 ? 'spark' : 'happy', mouth: notice > .6 ? 'O' : 'smile', lookX: 1, lookY: .6, glow: 1.1, rot: .08, blush: true,
      aR: notice > .5 ? .8 + Math.abs(Math.sin(t * 9)) * .9 : .4, emote: notice > .1 && notice < .9 ? '!' : null, emoteK: seg(t, 43.1, 43.4), ...move('idle', t, 2) });
    // close into the water as the chorus arrives (screen point of the bowl at full raise)
    const iv = seg(t, 43.55, 44);
    if (iv > 0) iris(983, 610, lerp(1500, 120, ease(iv)), '#2A2331');
    camEnd();
  }

  chapter('letter', 21, 44, [
    [21.02, openingVerse], [25.2, storybook], [27.2, miracle], [30.0, moonlight],
    [33.04, chimney], [36.25, unbox], [38.0, worlds], [42.0, ladle]
  ]);
})();
