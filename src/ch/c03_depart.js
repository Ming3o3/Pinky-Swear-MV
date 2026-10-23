// c03_depart: 间奏一 (68–89). The departure comedy — packing an impossible backpack, an upside-down
// map corrected by a paper crane, a chase after a paper plane, and a dusk rest that lets the night in.
// Shots: pack 68 · map gag 73 · the chase 78 · dusk rest 83.5.
(() => {
  const GREEN = { skyA: '#C8E4D2', skyB: '#DDEEDC', distCol: '#8FBF92', top: '#83B563', bot: '#578C42' };

  // items for the packing gag; each drawn around its own origin, ground point (0,0)
  const ITEMS = {
    kettle: (s) => { paint(ellPts(0, -18 * s, 26 * s, 20 * s, 14, 1), { wash: '#8E9AB2', ink: PAL.ink, sw: 1 }); paint(rrPts(-8 * s, -44 * s, 16 * s, 10 * s, 4 * s), { wash: '#6E7A92', ink: PAL.ink, sw: .8 }); inkLine([[24 * s, -22 * s], [38 * s, -34 * s], [36 * s, -16 * s]], 2.4 * s, '#6E7A92', 'ink', .4); },
    umbrella: (s) => { push(); rotate(.5); inkLine([[0, 0], [0, -60 * s]], 3 * s, '#7C4A2C', 'ink', 0); paint([[-34 * s, -56 * s], [0, -74 * s], [34 * s, -56 * s], [0, -50 * s]], { wash: PAL.rose, ink: PAL.ink, sw: 1, curv: .3 }); pop(); },
    maproll: (s) => { push(); rotate(.2); paint(rrPts(-30 * s, -14 * s, 60 * s, 28 * s, 12 * s), { wash: '#E8D9B4', ink: PAL.ink, sw: 1 }); inkLine([[-30 * s, -4 * s], [30 * s, -8 * s]], .8, '#A89058', 'inkfine', 0); pop(); },
    snack: (s) => { paint(rrPts(-24 * s, -30 * s, 48 * s, 30 * s, 6 * s), { wash: '#D8A862', ink: PAL.ink, sw: 1 }); letter('饼', 0, -15 * s, 16 * s, '#6E4A2C', { ink: false }); },
    lantern: (s) => { paint(rectPts(-16 * s, -34 * s, 32 * s, 30 * s, 6 * s), { wash: '#F2C14E', washOp: 235, ink: PAL.ink, sw: 1 }); paint(rectPts(-10 * s, -42 * s, 20 * s, 8 * s, 2 * s), { wash: '#7C4A2C', ink: PAL.ink, sw: .8 }); inkLine([[0, -42 * s], [0, -52 * s]], 1.5 * s, '#7C4A2C', 'ink', 0); }
  };

  // =====================================================================================
  // 68–73 packing: everything goes in — except the crane, which would rather fly
  // =====================================================================================
  function pack(t, lt) {
    const iv = 1 - seg(t, 68, 68.5); if (iv > 0) iris(960, 700, lerp(1500, 60, iv), '#4E6E46');
    camBegin(960, 640, 1.12, .01);
    hillStage(t, { ...GREEN, clouds: 2, flowers: 4, sun: { x: 400, y: 230, r: 100 } });
    const BX = 1120, BY = 880;
    // the backpack, bulging more with every item
    const fill = clamp(seg(t, 68.3, 72.1)), bulge = 1 + fill * .38 + Math.sin(fill * Math.PI * 5) * .04 * fill + (fill >= 1 ? Math.sin((t - 72.1) * 20) * .05 * Math.exp(-(t - 72.1) * 4) : 0);
    // items fly in along arcs and disappear into the mouth
    const FLIGHTS = [[68.6, 'kettle', 300, 950], [69.15, 'umbrella', 380, 980], [69.7, 'maproll', 260, 900], [70.25, 'snack', 420, 1000], [70.8, 'lantern', 300, 1020]];
    FLIGHTS.forEach(([t0, kind, x0, y0], i) => {
      const k = seg(t, t0, t0 + .55); if (k <= 0 || k >= 1) return;
      const mx = (x0 + BX) / 2, my = Math.min(y0, 620) - 140;
      const x = lerp(lerp(x0, mx, k), lerp(mx, BX, k), k), y = lerp(lerp(y0, my, k), lerp(my, BY - 190, k), k);
      push(); translate(x, y); rotate(k * 2.4); ITEMS[kind](1.15); pop();

    });
    // the crane refuses to be packed: it dodges the last toss
    const ck = seg(t, 71.3, 72);
    if (ck > 0 && ck < 1) {
      const dodge = Math.sin(clamp((ck - .3) / .5) * Math.PI) * 130;
      paperCrane(lerp(820, BX, ck), lerp(760, 700, ck) - dodge, 20, t, { rot: ck * .8 });
      if (ck > .4 && ck < .5) sfx('?!', 890, 620, 54, PAL.sky, t - 71.87, { life: .6 });
    }
    // 小凡 shoving; 小温 folding the spilled pile neatly
    xiaofan(BX - 190, 900, 22, { flip: true, ...move('idle', t), eyes: t > 71 ? 'x' : 'happy', mouth: t > 71 ? 'wobble' : 'grin', aR: .9 + Math.sin(t * 6) * .3 * (1 - fill), emote: t > 71.1 ? 'sweat' : null, emoteK: seg(t, 71.1, 71.4), dy: -(fill >= 1 ? .6 : 0) });
    // backpack
    push(); translate(BX, BY); scale(bulge, 1 + (bulge - 1) * .5);
    paint(rrPts(-120, -260, 240, 260, 40, 3), { wash: '#6E8FB2', washOp: 255, fill: '#4A6484', fillOp: 60, tex: .55, ink: PAL.ink, sw: 1.6 });
    paint(rrPts(-70, -285, 140, 60, 24, 2), { wash: '#5E7A96', ink: PAL.ink, sw: 1.3 });
    paint(rectPts(-16, -290, 32, 20, 4), { wash: PAL.gold, ink: PAL.ink, sw: .9 });
    inkLine([[-46, -236], [46, -236]], 2, '#3E5468', 'ink', .1);
    if (fill >= 1 && t < 72.9) { // zipper gives up: items spring out and rain down
      const bk = seg(t, 72.15, 72.9);
      ['kettle', 'umbrella', 'maproll', 'snack', 'lantern'].forEach((kind, i) => {
        const k = seg(t, 72.2 + i * .06, 72.9);
        if (k <= 0) return;
        const x = BX - 150 + hash(i * 3.1) * 300 + k * (hash(i * 7) - .5) * 500, y = lerp(BY - 240, 1040, easeIn(k));
        push(); translate(x, y); rotate(k * 5 * (i % 2 ? 1 : -1)); ITEMS[kind](1); pop();
      });
      if (t < 72.45) sfx('砰', BX, 560, 88, PAL.rose, t - 72.15, { life: .7 });
    }
    pop();
    xiaowen(1500, 905, 22, { ...move('idle', t, 2), eyes: 'happy', mouth: 'smile', aL: .8, aR: .8, lookX: -1, glow: .7,
      armL: (u, sw) => { paint(rrPts(u * .3, -u * .5, u * 1.3, u * .55, u * .2), { wash: '#FFFDF4', ink: PAL.ink, sw: sw * .7 }); } });
    camEnd();
  }

  // =====================================================================================
  // 73–78 the map is upside down (coherently — route, lake, compass all flip together);
  // 小凡 turns it right-side up, and the crane flies the route to the X
  // =====================================================================================
  function mapGag(t, lt) {
    camBegin(960, 600, 1.2, 0);
    hillStage(t, { ...GREEN, clouds: 2, flowers: 3, distant: true });
    const MX = 960, MY = 640;
    const fix = ease(seg(t, 75.55, 75.95)), fa = Math.PI * (1 - fix);
    push(); translate(MX, MY); rotate(-.04 + Math.sin(t * 1.3) * .01);
    push(); rotate(fa);
    paint(rectPts(-420, -280, 840, 560, 10), { wash: '#F2E8D0', washOp: 255, ink: PAL.ink, sw: 1.8 });
    for (let i = 0; i < 4; i++) { const mx = -300 + hash(i * 3.3) * 600, my = -180 + hash(i * 5.7) * 320; paint([[mx, my + 24], [mx - 26, my], [mx, my - 30], [mx + 26, my]], { wash: '#9FB58E', washOp: 220, ink: PAL.ink, sw: 1, curv: .4 }); } // little mountains
    paint(ellPts(260, 150, 90, 50, 16, 2), { wash: '#9CC4D8', washOp: 200, ink: null }); // a lake
    // dashed route to an X (drawn in map-local coords; the frame rotation flips it wholesale)
    const route = [[-330, 190], [-180, 80], [-40, 150], [120, 40], [280, -60]];
    inkLine(partial(route, seg(t, 73.4, 74.2)), 2.4, '#B3372F', 'ink', .5);
    if (t > 74.1) { const k = backOut(seg(t, 74.1, 74.4)); push(); translate(280, -60); scale(k); inkLine([[-16, -16], [16, 16]], 5, '#B3372F', 'ink', 0); inkLine([[16, -16], [-16, 16]], 5, '#B3372F', 'ink', 0); pop(); }
    pop();
    pop();
    // 北 compass rides the map's rotation (letter() bypasses push, so track it manually)
    const nx = MX + Math.cos(fa) * 330 - Math.sin(fa) * 220, ny = MY + Math.sin(fa) * 330 + Math.cos(fa) * 220;
    letter('北', nx, ny, 44, '#8A6B2A', { rot: fa });
    // 小温 held it upside down, confidently — then sweats once it's fixed
    const flipMap = fix;
    xiaowen(370, 950, 22, { flip: true, ...move('idle', t), eyes: 'happy', mouth: 'smile', aR: 1.5, aL: 1.1, lookX: 1, glow: .8,
      emote: flipMap > .9 ? 'sweat' : null, emoteK: seg(t, 75.9, 76.2) });
    // 小凡 leans in and turns the map around
    xiaofan(1560, 950, 22, { ...move('idle', t, 3), eyes: fix > .9 ? 'happy' : 'wide', lookX: -1, mouth: fix > .9 ? 'smile' : 'flat', rot: Math.sin(fix * Math.PI) * -.14, aL: Math.sin(fix * Math.PI) * 1.4,
      emote: fix > .92 && t < 76.4 ? '!' : null, emoteK: seg(t, 75.95, 76.2) });
    // the crane guides the way: it appears at the route's start and glides along the red
    // line, from beginning to end, then perches on the X
    if (t > 76.05) {
      const RWP = [[630, 830], [780, 720], [920, 790], [1080, 680], [1240, 580]];
      const k = seg(t, 76.1, 77.5);
      let tot = 0; const LENS = [];
      for (let i = 1; i < RWP.length; i++) { const L2 = Math.hypot(RWP[i][0] - RWP[i - 1][0], RWP[i][1] - RWP[i - 1][1]); LENS.push(L2); tot += L2; }
      if (k < 1) {
        let target = k * tot, cx = RWP[0][0], cy = RWP[0][1], dir = 0;
        for (let i = 0; i < LENS.length; i++) {
          if (target <= LENS[i]) { const f = target / LENS[i]; cx = lerp(RWP[i][0], RWP[i + 1][0], f); cy = lerp(RWP[i][1], RWP[i + 1][1], f); dir = Math.atan2(RWP[i + 1][1] - RWP[i][1], RWP[i + 1][0] - RWP[i][0]); break; }
          target -= LENS[i];
        }
        const pk = backOut(seg(t, 76.05, 76.3));
        push(); translate(cx, cy - 30 - Math.sin(t * 6) * 5 * (1 - k)); rotate(dir * .5); scale(pk);
        paperCrane(0, 0, 26, t, { rot: 0 });
        pop();
      } else { // perched on the X, one proud flap
        const fl = Math.abs(Math.sin((t - 77.5) * 4)) * seg(t, 77.5, 78);
        push(); translate(1240, 562 - fl * 8); paperCrane(0, 0, 26, t, { rot: 0, flap: fl * .8 }); pop();
        if (t > 77.5 && t < 77.8) sfx('啄', 1315, 495, 54, PAL.ochre, t - 77.5, { life: .6 });
      }
    }
    camEnd();
  }

  // =====================================================================================
  // 78–83.5 the chase: a paper plane leads them over the rolling hills
  // =====================================================================================
  function chase(t, lt) {
    const scroll = (t - 78) * 330;
    camBegin(960, 560, 1.05, 0);
    hillStage(t, { ...GREEN, skyA: '#BFE0EE', skyB: '#D8EEDC', clouds: 3, distant: true, flowers: 0 });
    // rolling hills, scrolling with the camera
    for (let i = 0; i < 8; i++) {
      const hx = (((i * 560 - scroll) % 4480) + 4480) % 4480 - 800;
      const hr = 200 + hash(i * 3.3) * 120;
      paint(ellPts(hx, 950, hr, hr * .55, 18, 3), { wash: i % 2 ? '#8FBF6F' : '#83B563', washOp: 255, fill: '#5E9648', fillOp: 55, bleed: .15, tex: .5, ink: PAL.ink, sw: 1, curv: .5 });
    }
    // the paper plane bobs ahead, then loops back to land on 小凡's head
    const back = seg(t, 81.2, 82.5), onHead = t > 82.5;
    const px = onHead ? 700 : back > 0 ? lerp(1290, 700, ease(back)) : 1290 + Math.sin(t * 2.4) * 30;
    const py = onHead ? 758 : back > 0 ? lerp(430, 762, ease(back)) - Math.sin(clamp(back) * Math.PI) * 120 : 430 + Math.sin(t * 3.1) * 46;
    push(); translate(px, py); rotate(back > 0 || onHead ? Math.sin(t * 6) * .2 : Math.sin(t * 2.4 + 1) * .12);
    paint([[0, 0], [95, 26], [6, 40]], { wash: '#FFFDF4', washOp: 250, ink: PAL.ink, sw: 1.2, curv: .2 });
    paint([[0, 0], [40, -14], [95, 26]], { wash: '#E8DAB4', ink: PAL.ink, sw: 1, curv: .2 });
    pop();
    if (back > .96 && t < 82.8) sfx('哒', px + 60, py - 30, 54, PAL.ochre, t - 82.45, { life: .6 });
    // the runners: the rock rolls in from ahead, 小凡 runs into it, 小温 catches his hand
    const trip = seg(t, 80.9, 81.4), catchup = seg(t, 81.4, 82.0), up = backOut(seg(t, 81.85, 82.35));
    const stumbling = t >= 80.9 && t < 81.5, caught = t >= 81.5 && t < 82.0;
    // the rock scrolls in from the right at ground speed, reaching him on the beat
    if (t > 79.9 && t < 82.1) {
      const rx = 1300 - (t - 79.93) * 620;
      if (rx > -60) paint([[rx - 30, 952], [rx - 12, 926], [rx + 18, 924], [rx + 34, 950]], { wash: '#9A9284', ink: PAL.ink, sw: 1.2, curv: .3 });
    }
    // 小温: always present — running alongside, then leaning back to catch him
    if (caught) {
      xiaowen(980 - ease(catchup) * 26, 955, 25, { ...move('run', t, 1), eyes: 'wide', mouth: 'O', glow: .85, rot: .1, aL: -.9 });
    } else {
      xiaowen(980, 955, 25, { ...move('run', t, 1), eyes: stumbling ? 'wide' : 'crescent', mouth: stumbling ? 'O' : onHead ? 'grin' : 'smile', glow: .85 });
    }
    if (stumbling) {
      // pitching forward, arms windmilling
      const tk = ease(trip);
      xiaofan(700 + tk * 46, 950, 25, { rot: tk * .5, sq: .12, eyes: 'wide', mouth: 'O', warm: .35,
        aL: 1.1 + Math.sin(t * 30) * .55, aR: -.3 + Math.sin(t * 30 + 2) * .55, emote: '!', emoteK: seg(t, 80.9, 81.15) });
      if (t < 81.15) sfx('哎哟', 830, 760, 56, PAL.sky, t - 80.9, { life: .7, rot: -.08 });
    } else if (caught) {
      // dangling from her hand, then hauled upright
      const ck = ease(catchup);
      xiaofan(lerp(746, 712, ck), 950 - ck * 6, 25, { rot: lerp(.5, -.1, ck), eyes: 'wide', mouth: 'O', warm: .35, aR: -.9 });

    } else {
      const hop = up > 0 && up < 1 ? Math.sin(clamp(up) * Math.PI) * -10 : 0;
      xiaofan(700, 950 + hop, 25, { ...move('run', t), eyes: onHead ? 'dot' : 'happy', mouth: 'grin', warm: .35, lookY: onHead ? -.6 : 0 });
    }
    for (let i = 0; i < 4; i++) { const dx = 620 - ((t * 620 + i * 210) % 900); paint(ellPts(dx, 985, 30, 7, 8), { wash: '#C9B37E', washOp: 150, ink: null }); }
    camEnd();
  }

  // =====================================================================================
  // 83.5–89 dusk: sharing a snack on the hilltop while the day folds into night
  // =====================================================================================
  function dusk(t, lt) {
    const night = seg(t, 86.2, 89);
    const walk = seg(t, 83.5, 84.25), pitch = seg(t, 84.3, 85.05), lit = seg(t, 85.15, 85.55), settle = seg(t, 85.5, 86.15);
    const fire = lit > .01, flick = fire ? (0.8 + .2 * Math.sin(t * 9) * Math.sin(t * 13.7)) * seg(t, 85.25, 85.65) : 0;
    camBegin(960, 620, lerp(1.08, 1.18, ease(lt / 5.5)), 0);
    hillStage(t, {
      skyA: mixCol('#F7C98C', '#232849', night), skyB: mixCol('#F2A868', '#2C3257', night), distCol: mixCol('#B58A6A', '#3E466E', night),
      top: mixCol('#9CB563', '#44583E', night), bot: mixCol('#6E8C48', '#324530', night),
      clouds: 0, flowers: 0, distant: true, backdrop: null,
      sun: { x: lerp(1520, 1760, seg(t, 83.5, 86.4)), y: lerp(430, 560, seg(t, 83.5, 86.4)), r: lerp(105, 60, seg(t, 83.5, 86.4)), col: '#F2A05C', k: 1 - seg(t, 84.8, 86.4) }
    });
    if (night > .35) starField(t, { n: Math.floor(30 * (night - .35) / .65), seed: 6, h: 520 });
    if (night > .55) { paint(ellPts(300, 190, 52, 52, 18), { wash: '#F3EBD3', washOp: 190, ink: null }); paint(ellPts(318, 178, 40, 40, 16), { wash: mixCol('#F7C98C', '#232849', night), washOp: 255, ink: null }); }
    // the bare branch; the crane perches on it and hangs its lantern
    inkLine([[300, 706], [420, 648], [560, 618]], 7, mixCol('#4E4238', '#2A2530', night), 'ink', .4);
    inkLine([[430, 640], [470, 596]], 4.5, mixCol('#4E4238', '#2A2530', night), 'ink', .3);
    const land = ease(seg(t, 86.15, 86.95));
    if (land < 1) paperCrane(lerp(140, 470, land), lerp(320, 585, land) - Math.sin(land * Math.PI) * 60, 22, t, { flip: true });
    else {
      push(); translate(470, 588 + Math.sin(t * 2.2) * 3); paperCrane(0, 0, 22, t, { rot: .15, flap: Math.abs(Math.sin(t * 1.5)) * .2 }); pop();
      paint(rectPts(462, 606, 16, 22, 4), { wash: '#F2C14E', washOp: 240, ink: PAL.ink, sw: .9 });
      paint(ellPts(470, 620, 26, 26, 12), { fill: '#F2C14E', fillOp: (50 + 25 * Math.sin(t * 2.6)) * (1 - night * .3), bleed: .3, ink: null });
    }
    // THE TENT: two poles cross, the canvas unfurls down from the apex
    const TX = 480, TY = 888;
    const p1 = backOut(seg(t, 84.3, 84.6)), p2 = backOut(seg(t, 84.6, 84.9)), cv = ease(seg(t, 84.85, 85.3));
    if (p1 > .02) inkLine([[TX - 150, TY], [lerp(TX - 150, TX + 30, p1), TY - 230 * p1]], 7, '#7C5A40', 'ink', .2);
    if (p2 > .02) inkLine([[TX + 150, TY], [lerp(TX + 150, TX - 30, p2), TY - 230 * p2]], 7, '#7C5A40', 'ink', .2);
    if (cv > .02) {
      push(); translate(TX, TY - 226); scale(1, cv);
      paint([[0, -4], [-168, 230], [168, 230]], { wash: mixCol('#C9BD96', '#EFDCA8', flick), washOp: 255, fill: '#A89668', fillOp: 45, bleed: .1, tex: .5, ink: PAL.ink, sw: 1.4, curv: .2 });
      paint([[0, 224], [-54, 230], [0, 92]], { wash: mixCol('#5E4E38', '#F7D98C', flick * .85), ink: PAL.ink, sw: 1.1, curv: .2 });
      pop();
      if (cv > .4 && cv < .75) sfx('唰', TX + 90, TY - 160, 52, PAL.sky, t - 84.95, { life: .6 });
    }
    // the campfire: stone ring; kindling placed by 小温; flame; sparks
    for (let i = 0; i < 7; i++) { const a = i / 7 * TAU + .4; paint(ellPts(1180 + Math.cos(a) * 62, 912 + Math.sin(a) * 22, 13, 9, 8, 1.5), { wash: '#8E8678', washOp: 255, fill: '#5E5648', fillOp: 55, tex: .5, ink: PAL.ink, sw: 1 }); }
    for (let i = 0; i < 2; i++) {
      const k = backOut(seg(t, 84.45 + i * .3, 84.75 + i * .3)); if (k < .02) continue;
      push(); translate(1180, 908); rotate((i - .5) * .8); scale(k);
      inkLine([[0, 0], [0, -64]], 6, '#7C5A40', 'ink', .2);
      inkLine([[0, 0], [0, -64]], 2.2, '#9A7452', 'ink', .2);
      pop();
    }
    if (fire) {
      const fk = seg(t, 85.2, 85.7);
      push(); translate(1180, 905); scale(fk * 1.3);
      const w1 = Math.sin(t * 9) * 7, w2 = Math.sin(t * 13.7 + 2) * 5;
      paint([[-30, 0], [-26 + w1, -46], [-6 + w1, -78 - w2], [10 + w2, -50], [30, -4]], { wash: '#E8874F', fill: '#D8632F', fillOp: 90, bleed: .2, tex: .35, ink: null, curv: .5 });
      paint([[-14, 0], [-10 + w2, -30], [2 + w1 * .5, -46], [14, -2]], { wash: '#F2B95A', fill: '#F7D98C', fillOp: 110, bleed: .2, tex: .25, ink: null, curv: .5 });
      pop();
      paint(ellPts(1180, 878, 395 * flick, 305 * flick, 22, 5), { fill: '#F2B95A', fillOp: 85 * flick, bleed: .4, tex: .15, ink: null });
      for (let i = 0; i < 5; i++) {
        const q = frac(t * .55 + hash(i * 3.3) * .5 + i * .13);
        const sx = 1180 + (hash(i * 5.7) - .5) * 50 + Math.sin(q * 7 + i * 2) * 14;
        paint(ellPts(sx, 830 - q * 240, 3.5 * (1 - q * .6), 3.5 * (1 - q * .6), 6), { fill: i % 2 ? '#F7D98C' : '#E8874F', fillOp: 190 * (1 - q), bleed: .2, ink: null });
      }
    }
    // the log between tent and fire
    paint(rrPts(600, 900, 340, 46, 20, 2), { wash: WOOD, washOp: 255, fill: WOOD_DK, fillOp: 60, tex: .55, ink: PAL.ink, sw: 1.3 });
    paint(ellPts(940, 923, 23, 23, 12), { wash: '#C9A06B', washOp: 255, ink: PAL.ink, sw: 1.1 });
    paint(ellPts(940, 923, 12, 12, 10), { wash: '#A87E4E', ink: null });
    // the pair: walk in (poles / kindling), build their halves, then share the log
    const FX = lerp(lerp(140, 480, ease(walk)), 700, ease(settle));
    const W2X = lerp(lerp(30, 1140, ease(walk)), 866, ease(settle));
    const seated = settle >= 1, walkingIn = walk < 1;
    if (walkingIn) {
      xiaofan(FX, 950, 24, { ...move('walk', t), eyes: 'happy', mouth: 'smile', warm: .45, aL: 1.2, aR: 1.35,
        draw: (u, sw) => { inkLine([[-2 * u, -7.4 * u], [3.4 * u, -9.6 * u]], 3, '#7C5A40', 'ink', 0); inkLine([[-2 * u, -7.2 * u], [3.8 * u, -9 * u]], 3, '#8E6A4C', 'ink', 0); } });
      xiaowen(W2X, 952, 24, { ...move('walk', t, 1), eyes: 'crescent', mouth: 'smile', glow: .9, lookX: -.4,
        draw: (u, sw) => { inkLine([[-2.6 * u, -5.2 * u], [1.6 * u, -6.4 * u]], 3.4, '#7C5A40', 'ink', 0); inkLine([[-2.4 * u, -4.8 * u], [2 * u, -5.8 * u]], 3, '#8E6A4C', 'ink', 0); } });
    } else if (!seated) {
      // building: 小凡 raises the tent, 小温 kneels and lays the kindling
      xiaofan(560, 950, 24, { eyes: 'happy', mouth: 'grin', warm: .45, aL: .9 + .4 * Math.sin(t * 6), aR: .9 + .4 * Math.sin(t * 6 + 2), ...move('idle', t) });
      xiaowen(1140, 952, 24, { sit: true, eyes: 'happy', mouth: 'o', glow: .9, lookX: -.2, lookY: .3, aR: .5 + .3 * Math.sin(t * 6), rot: .06 });
    } else {
      xiaofan(700, 908, 24, { sit: true, eyes: 'crescent', mouth: fire ? 'smile' : 'o', warm: .45, lookX: 1, aR: fire ? 1.25 : .3,
        armR: fire ? (u, sw) => { inkLine([[0, 0], [u * 7.5, -u * 1.1]], 3.4, '#9A7452', 'ink', 0); } : null });
      xiaowen(866, 906, 24, { sit: true, flip: true, eyes: 'crescent', mouth: fire ? 'grin' : 'smile', glow: .95, lookX: 1, aR: fire ? .8 + Math.sin(t * 2) * .15 : .3,
        emote: fire && t < 86.3 ? 'spark' : null, emoteK: seg(t, 85.5, 85.8) });
      if (fire) {
        push(); translate(1048, 824); rotate(Math.sin(t * 1.4) * .1);
        paint(ellPts(0, 0, 26, 22, 12, 1.5), { wash: '#FFF3DC', washOp: 250, ink: PAL.ink, sw: 1.1 });
        paint(ellPts(8, -5, 7, 6, 8), { wash: mixCol('#E8D9B4', '#D8A862', seg(t, 85.6, 88.6) * .8), ink: null });
        pop();
        if (frac(t * .7) < .3) { const sp = []; for (let q2 = 0; q2 <= 6; q2++) { const u2 = q2 / 6; sp.push([1048 + Math.sin(u2 * 5 + t * 2) * 7, 796 - u2 * 46]); } inkLine(partial(sp, seg(t, 85.7, 86.1)), 1.3, mixCol('#FFFDF4', '#8B97C9', night), 'inkfine', .7); }
      }
      if (lit > 0 && lit < 1) {
        push(); translate(lerp(1160, 1120, ease(lit)), lerp(846, 862, ease(lit)));
        paint(ellPts(0, 0, 8, 8, 8), { fill: '#F7D98C', fillOp: 220, bleed: .4, ink: null });
        pop();
        if (lit > .85 && lit < 1) flash(.3 * (1 - lit), '#F7D98C');
      }
      if (lit >= 1 && t < 85.75) sfx('呼', 1180, 760, 64, PAL.ochre, t - 85.35, { life: .7, rot: .05 });
    }
    // fireflies as the stars take over
    if (night > .75) for (let i = 0; i < 3; i++) { const fx2 = 500 + hash(i * 3.3) * 900, fy2 = 640 + hash(i * 5.7) * 200 + Math.sin(t * 2 + i * 2.4) * 16; paint(ellPts(fx2, fy2, 4, 4, 8), { fill: '#F7E9C4', fillOp: 150 * (night - .75) / .25, bleed: .3, ink: null }); }
    camEnd();
  }

  chapter('depart', 68, 89, [[68, pack], [73, mapGag], [78, chase], [83.5, dusk]]);
})();
