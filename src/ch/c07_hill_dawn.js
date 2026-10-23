// c07_hill_dawn: 终副歌 (158–180). The hill stage v3 — sunrise. The golden contract is signed and
// sealed; 小凡 is fully warm now; every season's petals come to watch; the world begins to show its paper edges.
// Shots: last steps 158.0 · sunrise 159.97 · the wind 162.0 · foreheads 166.0 · the contract 168.25 ·
//        written 172.0 · joined hands 174.13 · the tableau 176.88.
(() => {
  function dawnHill(t, o = {}) {
    const rise = o.rise ?? 0;
    hillStage(t, {
      skyA: mixCol('#5E5680', '#F2D98C', rise), skyB: mixCol('#C77B5E', '#F7D98C', rise),
      distCol: mixCol('#6E5A78', '#C8936A', rise), top: mixCol('#7E8C5E', '#A8BF6F', rise), bot: mixCol('#54684A', '#7E9F58', rise),
      backdrop: null, sun: rise > 0 ? { x: 1430, y: lerp(690, 310, rise), r: lerp(90, 150, rise), col: '#F7C98C', k: 1 } : null,
      clouds: rise > .6 ? 2 : 0, flowers: o.flowers ?? 5, distant: true, dawn: 1 - rise, dawnCol: '#E8956A', stars: rise < .25 ? 16 : 0
    });
    // long morning light from the sun
    if (rise > .15) {
      const a = lerp(.5, .25, rise);
      for (let i = 0; i < 4; i++) {
        const x0 = 1430 - i * 120, L = 1500;
        paint([[x0, lerp(690, 310, rise)], [x0 - L * Math.sin(a) * .3, lerp(690, 310, rise) + L], [x0 - L * Math.sin(a) * .3 - 240, lerp(690, 310, rise) + L]], { fill: '#F7D98C', fillOp: 34 * rise, bleed: .3, tex: .2, ink: null });
      }
    }
  }

  // =====================================================================================
  // 158.0–159.97 让我再靠近一点点 — the last few steps up to the very top
  // =====================================================================================
  function lastSteps(t, lt) {
    const iv = ease(seg(t, 158, 158.55)); if (iv < 1) iris(960, 540, lerp(60, 1500, iv), '#5E4A50');
    const climb = ease(seg(t, 158.15, 159.9));
    camBegin(960, 610, 1.12, .01);
    dawnHill(t, { rise: seg(t, 158, 160.2) * .25, flowers: 4 });
    const X1 = lerp(560, 880, climb), Y1 = lerp(860, 700, climb), X2 = lerp(1400, 1080, climb), Y2 = lerp(850, 698, climb);
    xiaofan(X1, Y1, 26, { ...move('walk', t), eyes: 'happy', mouth: 'smile', warm: warmthAt(t), blush: true, lookX: 1 });
    xiaowen(X2, Y2, 26, { flip: true, ...move('walk', t, 1), eyes: 'crescent', mouth: 'smile', glow: 1.3, lookX: 1, blush: true });
    camEnd();
  }

  // =====================================================================================
  // 159.97–162.0 因为你太温暖 — the sun breaks the horizon on the downbeat
  // =====================================================================================
  function sunrise(t, lt) {
    const rise = seg(t, 159.97, 162);
    camBegin(1120, 580, lerp(1.2, 1.08, ease(lt / 2)) + pulse(t, 5) * .015, 0);
    dawnHill(t, { rise: .25 + .75 * ease(rise), flowers: 5 });
    if (rise > .05 && rise < .5) { flash(.4 * ease(rise) * (1 - ease(seg(t, 161.2, 162))), '#F7D98C'); if (t < 160.6) sfx('咚', 1430, 380, 84, PAL.ochre, t - 159.97, { life: .9 }); }
    xiaowen(1130, 700, 27, { ...move('bounce', t), eyes: 'crescent', mouth: 'grin', glow: 1.4, blush: true, aL: 1.1, aR: 1.1 });
    xiaofan(870, 702, 27, { ...move('idle', t), eyes: 'happy', mouth: 'smile', warm: warmthAt(t), blush: true, lookX: 1, emote: rise > .3 ? 'spark' : null, emoteK: seg(t, 160.5, 160.8) });
    camEnd();
  }

  // =====================================================================================
  // 162.0–166.0 我会再变得坚强一点点 — the morning wind blows; she leans on his shoulder
  // =====================================================================================
  function theWind(t, lt) {
    const lean = ease(seg(t, 163.2, 164.2));
    camBegin(980, 600, 1.22, 0);
    dawnHill(t, { rise: 1, flowers: 6 });
    for (let i = 0; i < 4; i++) {
      const k = frac(t * .38 + hash(i * 3.3)), x0 = -200 + hash(i * 7.1) * 2200 - k * 500;
      const y0 = 240 + hash(i * 5.3) * 280;
      inkLine([[x0, y0], [x0 + 110, y0 - 8], [x0 + 220, y0], [x0 + 320, y0 - 6]], 1.4, '#F6E8CC', 'ink', .6);
    }
    // grass and flowers all lean with the gusts
    for (let i = 0; i < 10; i++) {
      const gx = 200 + i * 180, gy = 740 + Math.pow((gx - 960) / 1380, 2) * 430 + hash(i * 3.1) * 180;
      if (gy > 1010) continue;
      const bend = (Math.sin(t * 2.4 + i * .7) * .5 + .5) * 22;
      inkLine([[gx, gy], [gx + bend, gy - 24], [gx + bend * 1.7, gy - 36]], 1.2, '#5E7E48', 'inkfine', .5);
    }
    xiaofan(900, 700, 27, { eyes: 'crescent', mouth: 'smile', warm: warmthAt(t), sx: 1.03, aL: .5, aR: .35, ...move('idle', t) });
    xiaowen(lean > 0 ? 1005 : 1070, 698, 27, { flip: true, eyes: 'crescent', mouth: 'smile', glow: 1.35, rot: lean * .16, dx: 0, dy: 0, blush: true, ...move('idle', t, 1), aR: lean > 0 ? .2 : .5 });
    // his hair sprout streams heroically in the wind
    if (t > 162.4) for (let i = 0; i < 3; i++) inkLine(partial([[912, 560 - i * 12], [950 + i * 16, 548 - i * 20], [1000 + i * 22, 552 - i * 18]], frac(t * .9 + i * .33)), 2, '#66788F', 'inkfine', .5);
    camEnd();
  }

  // =====================================================================================
  // 166.0–168.25 因为你太柔软 — foreheads touch; every season's petals drift down
  // =====================================================================================
  function foreheads(t, lt) {
    const near = ease(seg(t, 166.2, 167.2));
    camBegin(960, 600, lerp(1.18, 1.5, near), 0);
    dawnHill(t, { rise: 1, flowers: 7 });
    const X1 = lerp(830, 905, near), X2 = lerp(1100, 1015, near);
    xiaofan(X1, 702, 28, { eyes: 'closed', mouth: 'smile', warm: warmthAt(t), blush: true, lookX: 1, ...move('idle', t) });
    xiaowen(X2, 700, 28, { flip: true, eyes: 'closed', mouth: 'smile', glow: 1.4, blush: true, lookX: 1, ...move('idle', t, 1) });
    // forehead glow when they touch
    if (near > .9) {
      paint(ellPts(960, 560, 46 + 10 * Math.sin(t * 3), 30, 14, 3), { fill: '#FFF3D0', fillOp: 120, bleed: .4, ink: null });
      if (t < 166.7) sfx('嗯', 960, 420, 62, PAL.rose, t - 166.35, { life: .7, rot: .05 });
    }
    // petals of all four seasons
    petalRain(t, { n: 8, kind: 'petal', cols: ['#F5B8C4', '#F0A8BC'], wind: .9, fall: .8, area: [-100, -100, W + 200, 700] });
    petalRain(t, { n: 6, kind: 'leaf', cols: ['#D86E38', '#E8A05C'], wind: 1.2, fall: .9, area: [-100, -100, W + 200, 700] });
    petalRain(t, { n: 8, kind: 'snow', cols: ['#FFFFFF'], wind: .6, fall: .7, area: [-100, -100, W + 200, 700] });
    petalRain(t, { n: 5, kind: 'spark', cols: ['#F7D98C'], wind: .4, fall: .4, area: [-100, -100, W + 200, 700] });
    camEnd();
  }

  // =====================================================================================
  // 168.25–172.0 交换无名指金色的契约 — the scroll unrolls; pinkies press; the seal lands
  // =====================================================================================
  function contract(t, lt) {
    const unroll = seg(t, 168.5, 169.5), press = seg(t, 169.7, 170.3), seal = seg(t, 170.55, 170.95);
    camBegin(960, 590, lerp(1.16, 1.26, unroll) + (seal > 0 && seal < 1 ? .03 * (1 - seal) : 0), 0);
    dawnHill(t, { rise: 1, flowers: 5 });
    // the two, pinkies extended toward the scroll
    const sep = lerp(0, 190, ease(press));
    xiaofan(960 - sep - 105, 706, 26, { eyes: 'happy', mouth: 'smile', warm: warmthAt(t), blush: true, aR: 1.5, pinkyR: true, lookX: 1, dy: -press * 1.2 });
    xiaowen(960 + sep + 105, 704, 26, { flip: true, eyes: 'crescent', mouth: 'smile', glow: 1.4, blush: true, aL: 1.5, pinkyL: true, lookX: 1, dy: -press * 1.2 });
    // the scroll between and above them
    push(); translate(960, lerp(300, 420, ease(unroll)));
    scrollProp(0, 0, 1.05, { unroll, seal: 0, names: false, rot: -.015 });
    pop();
    // pinkies press the scroll's centre on the beat
    if (press > 0) {
      const pk = backOut(press);
      push(); translate(lerp(960 - 210, 945, pk), lerp(560, 480, pk)); rotate(-.3);
      paint(ellPts(0, 0, 26, 20, 10), { wash: mixCol(PAL.fan, PAL.wen, warmthAt(t)), ink: PAL.ink, sw: 1 });
      pop();
      push(); translate(lerp(960 + 210, 975, pk), lerp(560, 480, pk)); rotate(.3);
      paint(ellPts(0, 0, 26, 20, 10), { wash: PAL.wen, ink: PAL.ink, sw: 1 });
      pop();
    }
    // the seal slams down
    if (seal > 0) {
      waxSeal(960, 505, 1.15, { k: seal, rot: .1 });
      if (seal < .5) {
        flash(.55 * (1 - seal * 2), '#F7D98C');
        sfx('咚!', 1140, 350, 92, '#B3372F', t - 170.55, { life: .9, rot: .12 });
        for (let i = 0; i < 8; i++) { const a = hash(i * 3.3) * TAU; paint(ellPts(960 + Math.cos(a) * (60 + seal * 180), 505 + Math.sin(a) * (40 + seal * 120), 8, 6, 8), { wash: '#B3372F', washOp: 180 * (1 - seal * 2), ink: null }); }
      }
    }
    if (seal >= 1) paint(ellPts(960, 505, 160, 90, 18, 4), { fill: PAL.gold, fillOp: 70 * pulse(t, 2), bleed: .4, ink: null });
    camEnd();
  }

  // =====================================================================================
  // 172.0–174.13 给彼此岁月 — the contract writes itself; the troupe takes a bow
  // =====================================================================================
  function written(t, lt) {
    const ink = seg(t, 172.15, 173.6);
    camBegin(960, 590, 1.2, .01);
    dawnHill(t, { rise: 1, flowers: 5 });
    push(); translate(960, 400); rotate(-.015);
    scrollProp(0, 0, 1.05, { unroll: 1, seal: 1, names: true, rot: 0 });
    // the four characters ink themselves in one by one (absolute world coords on the scroll)
    ['勾', '指', '起', '誓'].forEach((c, i) => {
      const k = seg(t, 172.15 + i * .34, 172.45 + i * .34);
      if (k <= 0) return;
      letter(c, 805 + i * 95, 337, 80, PAL.ink, { font: '80px MaShanZheng, WenKai', pop: k });
    });
    // two tiny doodles under the names: the hill and the two of them
    if (ink > .7) {
      const k = backOut(seg(t, 173.4, 173.8));
      push(); translate(-140, 90); scale(k);
      paint([[0, 0], [26, -16], [52, 0]], { wash: '#A8CB86', ink: PAL.ink, sw: 1, curv: .3 });
      pop();
      push(); translate(120, 90); scale(k);
      paint(heartPts(0, 0, 13), { wash: '#E2476E', ink: PAL.ink, sw: 1 });
      pop();
    }
    pop();
    // the pair below, hands clasped high
    xiaofan(850, 706, 25, { eyes: 'crescent', mouth: 'grin', warm: warmthAt(t), blush: true, aR: 1.7, ...move('hop', t) });
    xiaowen(1070, 704, 25, { flip: true, eyes: 'crescent', mouth: 'grin', glow: 1.4, blush: true, aL: 1.7, ...move('hop', t, 1) });
    // the paper troupe bows at the hill's foot
    for (let i = 0; i < 5; i++) paperDoll(200 + i * 100 + (i % 2) * 620, 990 + (i % 2) * 20, 9, t, { ph: i, cheer: i % 2 === 0, rot: i % 2 ? 0 : -.12 });
    petalRain(t, { n: 12, kind: 'petal', cols: ['#F5B8C4', '#F7D98C', '#FFFDF4'], wind: .9, fall: .9, area: [-100, -100, W + 200, 620] });
    camEnd();
  }

  // =====================================================================================
  // 174.13–176.88 说好从今以后都牵着手 — joined hands rise together on the beat
  // =====================================================================================
  function joinedHands(t, lt) {
    const up = backOut(seg(t, 174.25, 174.9));
    camBegin(960, 580, 1.24, 0);
    dawnHill(t, { rise: 1, flowers: 5 });
    xiaofan(880, 706, 27, { eyes: 'crescent', mouth: 'grin', warm: warmthAt(t), blush: true, aR: lerp(.4, 2, up), aL: lerp(.15, .9, up), dy: -up * 1.4, ...move('idle', t) });
    xiaowen(1050, 704, 27, { flip: true, eyes: 'crescent', mouth: 'grin', glow: 1.45, blush: true, aL: lerp(.4, 2, up), aR: lerp(.15, .9, up), dy: -up * 1.4, ...move('idle', t, 1) });
    // the joined hands and the braided thread
    if (up > .3) {
      const hx = 966, hy = lerp(640, 500, up);
      redThread([hx - 4, hy + 8], [hx + 6, hy + 6], t, { sag: .04, sw: 3, glow: 1 });
      paint(ellPts(hx, hy, 30, 22, 12), { wash: mixCol(PAL.fan, PAL.wen, .6), ink: PAL.ink, sw: 1.2 });
      inkLine([[hx - 8, hy - 6], [hx + 8, hy + 4]], 1.4, '#D8394E', 'inkfine', .2);
      inkLine([[hx - 8, hy + 4], [hx + 8, hy - 6]], 1.4, PAL.gold, 'inkfine', .2);
      if (up > .9 && t < 174.6) { sfx('嘿—', 1000, 380, 66, PAL.ochre, t - 174.3, { life: .7, rot: -.08 }); flash(.25 * (1 - seg(t, 174.3, 174.65)), '#FFF3D0'); }
    }
    // ring glints on the raised hands
    if (up > .8) ringProp(966, 470, .38, { glow: .8, spark: pulse(t, 2), flat: false, rot: .1 });
    camEnd();
  }

  // =====================================================================================
  // 176.88–180 因为要走很远 — the tableau: the two against the huge sun; the paper edges show
  // =====================================================================================
  function tableau(t, lt) {
    const wide = ease(seg(t, 176.9, 179.2)), paper = seg(t, 178.4, 180);
    camBegin(1050, 560, lerp(1.2, .8, wide), 0);
    dawnHill(t, { rise: 1, flowers: 6 });
    // the sun enormous behind them now
    paint(ellPts(1430, 350, 320, 320, 30, 4), { fill: '#F7C98C', fillOp: 80, bleed: .4, ink: null });
    paint(ellPts(1430, 350, 230, 230, 30, 2), { wash: '#F7D98C', washOp: 255, fill: '#F2B95A', fillOp: 70, tex: .4, ink: PAL.ink, sw: 1.4 });
    // the pair, small against it
    xiaofan(1000, 700, 20, { eyes: 'crescent', mouth: 'smile', warm: warmthAt(t), blush: true, aR: 1.6, dy: -1, ...move('idle', t) });
    xiaowen(1080, 698, 20, { flip: true, eyes: 'crescent', mouth: 'smile', glow: 1.5, blush: true, aL: 1.6, dy: -1, ...move('idle', t, 1) });
    // petals of every season one last time
    petalRain(t, { n: 14, kind: 'petal', cols: ['#F5B8C4', '#F7D98C', '#D86E38'], wind: .8, fall: .8, area: [-100, -100, W + 200, 700] });
    petalRain(t, { n: 8, kind: 'snow', cols: ['#FFFFFF'], wind: .5, fall: .6, area: [-100, -100, W + 200, 700] });
    // the illustration looks like an illustration: deckled paper edges creep in
    if (paper > 0) {
      const k = ease(paper), c = '#FBF6EA';
      paint([[-40, -40], [W * .06 * k, -40], [-40, H * .1 * k]], { wash: c, washOp: 255 * k, ink: null });
      paint([[W + 40, -40], [W - W * .06 * k, -40], [W + 40, H * .1 * k]], { wash: c, washOp: 255 * k, ink: null });
      paint([[-40, H + 40], [-40, H - H * .16 * k], [W * .08 * k, H + 40]], { wash: c, washOp: 255 * k, ink: null });
      paint([[W + 40, H + 40], [W - W * .08 * k, H + 40], [W + 40, H - H * .16 * k]], { wash: c, washOp: 255 * k, ink: null });
    }
    // golden whiteout into the finale
    const wout = seg(t, 179.35, 180);
    if (wout > 0) flash(ease(wout), '#FBF3DC');
    camEnd();
  }

  chapter('hill_dawn', 158, 180, [
    [158.0, lastSteps], [159.97, sunrise], [162.0, theWind], [166.0, foreheads],
    [168.25, contract], [172.0, written], [174.13, joinedHands], [176.88, tableau]
  ]);
})();
