// c00_prelude: 序幕 (0–21). The theatre: curtain opens on a writing desk; the letter draws a little town;
// we dive into the paper (a pencil world blooms into colour); the title stamps in on the beats.
// Shots: curtain 0–4.5 · desk 4.5–11 · dive 11–16.5 · title 16.5–21.
(() => {
  const qbez = (a, c, b, u) => [(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]];

  // a little house, ground point (x, y), sketch style (used on the paper and in the pencil world)
  function house(x, y, s, k, col = '#C9BFA6', roof = '#8A7B62') {
    const p = backOut(k); if (p < .02) return;
    push(); translate(x, y); scale(p);
    paint(rectPts(-s, -s * 1.1, s * 2, s * 1.1, s * .1), { wash: col, washOp: 255, ink: PAL.ink, sw: 1.1 });
    paint([[-s * 1.15, -s * 1.1], [0, -s * 1.9], [s * 1.15, -s * 1.1]], { wash: roof, ink: PAL.ink, sw: 1.1, curv: .2 });
    paint(rectPts(-s * .22, -s * .55, s * .44, s * .55, 2), { wash: '#6E5B44', ink: PAL.ink, sw: .8 });
    paint(rectPts(s * .35, -s * .8, s * .3, s * .3, 2), { wash: '#F2DFAE', ink: PAL.ink, sw: .7 });
    pop();
  }

  // =====================================================================================
  // shot 1 · 0–4.5 the curtain opens on the desk
  // =====================================================================================
  function curtainOpen(t) {
    const open = 1 - ease(seg(t, 1.3, 4.1));                       // 1 closed → 0 open
    const lamp = seg(t, 2.2, 3.4);
    camBegin(960, 540 + Math.sin(t * .5) * 8, lerp(1.06, 1, ease(seg(t, 0, 4.5))));
    deskScene(t, { flat: lamp < .5, night: true });
    // lamp warms up
    if (lamp > .01) paint(rectPts(-400, -400, W + 800, H + 800), { fill: '#F7DFA8', fillOp: 70 * lamp, bleed: .3, tex: .2, ink: null });
    theatreCurtains(t, { curtain: open });
    camEnd();
    if (t < 1.2) letter('· · ·', 960, 560, 44, PAL.cream, { alpha: (1 - seg(t, .8, 1.2)) * .8 });
  }

  // =====================================================================================
  // shot 2 · 4.5–11 the letter writes a little town; a crane flies through
  // =====================================================================================
  function letterWorld(t) {
    const write = seg(t, 4.8, 8.2);
    camBegin(960, 560, 1.12 + Math.sin(t * .4) * .02, -.008);
    deskScene(t, { writing: write, night: true, rot: -.03, paperX: 920, paperY: 640 });
    // draw on the paper (same transform as deskScene's letter)
    push(); translate(920, 640); rotate(-.03);
    // pencil hill line draws itself, then houses pop on the beats
    const crest = []; for (let i = 0; i <= 10; i++) crest.push([-330 + i * 34, 96 - Math.sin(i / 10 * Math.PI) * 26]);
    const ck = seg(t, 6.4, 7.6);
    if (ck > .01) inkLine(partial(crest, ck), 1.2, '#8B95AC', 'ink', .5);
    const bt = [B(7), B(8), B(9), B(10)];
    for (let i = 0; i < 3; i++) if (t > bt[i]) house(-290 + i * 58, 96, 24, seg(t, bt[i], bt[i] + .35), '#D8D2BE', '#9A8A6E');
    if (t > B(10)) { // a little tree
      const k = backOut(seg(t, B(10), B(10) + .4));
      push(); translate(-110, 96); scale(k);
      inkLine([[0, 0], [0, -26]], 1.4, '#8B95AC', 'ink', 0);
      paint(ellPts(0, -34, 15, 13, 10), { wash: '#B9C9A2', washOp: 200, ink: PAL.ink, sw: .8 });
      pop();
    }
    // sun doodle
    if (t > B(11)) { const k = backOut(seg(t, B(11), B(11) + .4)); push(); translate(210, 60); scale(k); paint(ellPts(0, 0, 20, 20, 12, 1.5), { wash: '#F2C14E', washOp: 230, ink: PAL.ink, sw: .9 }); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + .3; inkLine([[Math.cos(a) * 26, Math.sin(a) * 26], [Math.cos(a) * 34, Math.sin(a) * 34]], 1, '#D0922A', 'inkfine', 0); } pop(); }
    pop();
    // the paper crane crosses the room and dives at the paper
    if (t > 7.6 && t < 11) {
      const k = seg(t, 7.6, 10.9), x = lerp(2150, 1050, k), y = 300 + Math.sin(k * Math.PI * 1.5) * 60 + k * k * 190;
      const s = lerp(26, 15, k);
      push(); if (k > .93) { const f = (k - .93) / .07; translate(x, y); scale(1 - f * .8); translate(-x, -y); } paperCrane(x, y, s, t, { rot: -.1 + k * .35 });
      if (k > .93) for (let i = 0; i < 4; i++) { const q = hash(i * 3) ; paint(ellPts(x + (q - .5) * 60, y + 20 + q * 40, 8 * (1 - k), 8 * (1 - k), 8), { wash: '#F4E9CC', washOp: 200 * (1 - k), ink: null }); }
      pop();
    }
    // 小凡 humming at the desk edge, pencil in hand
    const m = move('idle', t);
    xiaofan(430, 940, 15, { ...m, eyes: 'happy', mouth: 'smile', aR: .9 + Math.sin(t * 3) * .12, armR: (u, sw) => inkLine([[0, 0], [u * .9, -u * .35]], sw * .8, PAL.ochre, 'ink', 0), lookX: .6 });
    camEnd();
  }

  // =====================================================================================
  // shot 3 · 11–16.5 dive into the letter: a pencil world blooms into colour
  // =====================================================================================
  function dive(t) {
    camBegin(960, 560, lerp(1.28, 1.02, ease(seg(t, 11, 16.2))), .01);
    // sketch world
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: '#EFEAE0', washOp: 255, ink: null });
    paint(rectPts(-400, 300, W + 800, 500), { wash: '#DCE4EC', washOp: 140, ink: null });
    // hill crest draws on
    const crest = []; for (let i = 0; i <= 24; i++) { const x = -300 + i * 110; crest.push([x, 780 - Math.pow((x - 960) / 1250, 2) * 330]); }
    const ck = seg(t, 11, 12.6);
    if (ck > .01) { inkLine(partial(crest, ck), 2.2, '#6E7789', 'ink', .5); paint(partial(crest, ck).concat([[crest[0][0], 1120]]), { wash: '#CFCBB8', washOp: 120, ink: null }); }
    // houses pop, sketch grey at first
    const houses = [[420, 760, 46], [560, 730, 34], [1330, 748, 40], [1470, 782, 30]];
    houses.forEach(([hx, hy, hs], i) => { if (t > 12.5 + i * .35) house(hx, hy, hs, seg(t, 12.5 + i * .35, 12.9 + i * .35), '#D8D2BE', '#9A8A6E'); });
    // colour blooms in from the left on the beats
    const blooms = [[500, 850, '#A8CB86', 13.4, 380], [960, 700, '#F2D98C', 14.1, 520], [1400, 830, '#9CC4D8', 14.8, 400], [760, 560, '#F5C9CE', 15.3, 300]];
    for (const [bx, by, bc, bt0, br] of blooms) {
      const k = ease(seg(t, bt0, bt0 + 1.4));
      if (k > .01) paint(ellPts(bx, by, br * k, br * .8 * k, 22, 4), { fill: bc, fillOp: 90 * (1 - ease(seg(t, bt0 + 1.2, bt0 + 2.6)) * .55), bleed: .4, tex: .3, ink: null });
    }
    // the sketch world settles into warm watercolour paper
    paint(rectPts(-400, -400, W + 800, H + 800), { fill: '#F2DFA8', fillOp: 60 * ease(seg(t, 15, 16.4)), bleed: .3, tex: .2, ink: null });
    // 小凡 walks in and looks around, delighted
    const wk = seg(t, 12.7, 15.8), wx = lerp(150, 730, wk), m = move('walk', t);
    xiaofan(wx, 862, 17, { ...m, eyes: wk >= 1 ? 'spark' : 'happy', mouth: wk >= 1 ? 'O' : 'smile', emote: wk >= 1 ? '!' : null, emoteK: seg(t, 15.8, 16.1), lookX: .5 });
    camEnd();
    // dive: an ink iris opens over the new world
    if (t < 11.65) {
      const k = ease(seg(t, 11, 11.6));
      iris(960, 540, lerp(60, 1500, k), '#2A2331');
    }
  }

  // =====================================================================================
  // shot 4 · 16.5–21 the title stamps in on the beats
  // =====================================================================================
  function title(t) {
    camBegin(960, 560, 1.02 + pulse(t, 3) * .012);
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: '#E9DFC8', washOp: 255, ink: null });
    paint(rectPts(-400, 340, W + 800, 460), { wash: '#CBDCCE', washOp: 130, ink: null });
    // hill + the two of them tiny, centre
    const crest = []; for (let i = 0; i <= 20; i++) { const x = -300 + i * 130; crest.push([x, 800 - Math.pow((x - 960) / 1250, 2) * 300]); }
    paint(crest.concat([[2100, 1120], [-300, 1120]]), { wash: '#8FBF6F', washOp: 220, fill: '#5E9648', fillOp: 70, bleed: .15, tex: .6, ink: PAL.ink, sw: 1.2, curv: .5 });
    // dim for the card BEFORE the pair, so 小凡 keeps his blue
    paint(rectPts(-400, -400, W + 800, H + 800), { fill: '#F2E9D4', fillOp: 130 * ease(seg(t, 16.5, 17.2)), bleed: .2, tex: .3, ink: null });
    xiaofan(880, 812, 11, { eyes: 'happy', mouth: 'smile', warm: .15 });
    xiaowen(1040, 812, 11, { eyes: 'happy', mouth: 'smile' });
    // halo behind the banner once the seal lands (kept dim and BEHIND the banner)
    if (t > 19.8) paint(ellPts(960, 470, 700 * ease(seg(t, 19.8, 20.6)), 190, 24, 4), { fill: PAL.gold, fillOp: 30 * (1 - seg(t, 20, 21) * .5), bleed: .4, ink: null });
    // gold banner
    const bk = backOut(seg(t, 16.7, 17.15));
    if (bk > .02) {
      push(); translate(960, 470); rotate(-.025); scale(bk);
      paint(rectPts(-560, -125, 1120, 250, 16), { wash: '#F7ECC8', washOp: 255, fill: '#D9B96A', fillOp: 50, bleed: .08, tex: .55, border: .5, ink: PAL.ink, sw: 2 });
      for (let i = 0; i < 4; i++) { const x = -540 + i * 24; inkLine([[x, -110 + (i % 2) * 12], [x + 10, -125]], 1.2, '#C9A85C', 'inkfine', 0); }
      pop();
    }
    // the four characters stamp on consecutive beats (centred on the banner)
    const CH = [['勾', 17.02], ['指', 17.73], ['起', 18.43], ['誓', 19.14]];
    CH.forEach(([c, t0], i) => {
      if (t < t0) return;
      letter(c, 690 + i * 180, 462, 172, i % 2 ? '#B3372F' : PAL.ink, { font: '172px MaShanZheng, "Xingkai SC", WenKai', pop: seg(t, t0, t0 + .3), rot: (hash(i) - .5) * .09 });
    });
    letter('— 洛天依 & ilem —', 960, 640, 42, '#6E5B44', { pop: seg(t, 19.5, 19.8) });
    // the seal stamps with a thunk
    const sk = seg(t, 19.75, 20.05);
    if (sk > 0) { waxSeal(1290, 560, 1.05, { k: sk, rot: .12 }); if (t > 19.75 && t < 19.95) sfx('咚', 1420, 470, 74, PAL.rose, t - 19.75, { life: .8, rot: .15 }); }
    if (t > 19.75 && t < 20.1) flash(.45 * (1 - seg(t, 19.75, 20.1)), '#F7D98C');
    camEnd();
  }

  chapter('prelude', 0, 21, [[0, curtainOpen], [4.5, letterWorld], [11, dive], [16.5, title]]);
})();
