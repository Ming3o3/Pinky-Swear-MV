// c08_finale: 尾声 (180–183.54). Pull back — the whole world was an illustration on the letter;
// the wax seal stamps; the curtains close on the little theatre.
(() => {
  function finale(t) {
    const zoom = lerp(1.7, 1.02, ease(seg(t, 180, 181.5)));
    const seal = seg(t, 181.45, 181.78);
    const close = ease(seg(t, 182.15, 183.4));
    camBegin(960 + (1 - zoom / 1.7) * -40, 560, zoom, -.006);
    deskScene(t, {
      night: true, moonInWindow: true, rot: -.03, paperX: 920, paperY: 640,
      seal: 0, noDoodle: true
    });
    // the illustration on the paper: their whole story in one small framed picture
    push(); translate(920, 640); rotate(-.03);
    const ik = backOut(seg(t, 180.05, 180.6));
    if (ik > .02) {
      push(); translate(-30, 40); scale(ik);
      paint(rrPts(-240, -160, 480, 300, 10), { wash: '#FFFDF4', washOp: 255, ink: PAL.ink, sw: 1.6 });
      // sky + sun
      paint(rectPts(-228, -148, 456, 220, 6), { wash: '#F7D9A8', washOp: 255, ink: null });
      paint(ellPts(150, -80, 34, 34, 14, 1.5), { wash: '#F2B95A', washOp: 250, ink: null });
      for (let i = 0; i < 3; i++) { const cx = -180 + hash(i * 3.3) * 300; paint(ellPts(cx, -110 + hash(i * 5.7) * 30, 26, 10, 8, 1.5), { wash: '#FFFDF4', washOp: 200, ink: null }); }
      // the hill and the two of them
      paint([[-228, 72], [0, -30], [228, 72], [228, 72]], { wash: '#8FBF6F', washOp: 255, fill: '#5E9648', fillOp: 60, bleed: .15, tex: .5, ink: PAL.ink, sw: 1.2, curv: .5 });
      paint(ellPts(0, -46, 13, 13, 10), { wash: mixCol('#93A9C2', '#F2C14E', .9), ink: PAL.ink, sw: .9 });
      paint(ellPts(26, -44, 13, 13, 10), { wash: '#F2C14E', ink: PAL.ink, sw: .9 });
      inkLine([[9, -50], [17, -50]], 1.2, '#D8394E', 'inkfine', 0);
      // tiny thread + petals
      for (let i = 0; i < 6; i++) paint(ellPts(-200 + hash(i * 3.3) * 400, -140 + hash(i * 7.7) * 160, 4, 3, 6, 0, t + i), { wash: ['#F5B8C4', '#F7D98C', '#FFFDF4'][i % 3], washOp: 210, ink: null });
      pop();
    }
    // the seal stamps the corner
    if (seal > 0) {
      waxSeal(230, 170, .82, { k: seal, rot: .12 });
      if (seal < .6) {
        flash(.4 * (1 - seal * 1.6), '#F7D98C');
        sfx('咚', 1290, 300, 74, '#B3372F', t - 181.45, { life: .8, rot: .14 });
      }
    }
    // a last line of handwriting appears under the illustration (absolute coords on the paper)
    const hk = seg(t, 182.05, 182.5);
    if (hk > 0) {
      const chars = '这是我们的约定';
      const n = Math.floor(hk * chars.length);
      for (let i = 0; i < n; i++) letter(chars[i], 620 + i * 42, 845, 34, '#4A5A78', { font: '34px WenKai, "Kaiti SC"', alpha: .92 });
    }
    pop();
    // bake the handwriting into the painting BEFORE the curtains draw, so closing curtains cover it
    flushLetters();
    camEnd();
    // curtains close
    if (close > 0) {
      theatreCurtains(t, { curtain: close });
      if (close > .85) {
        letter('剧 终', 960, 500, 120, '#F2D8B8', { font: '120px MaShanZheng, "Xingkai SC", WenKai', pop: seg(t, 183.05, 183.4), rot: -.02, stroke: '#7A1C2B' });
        letter('勾指起誓 · 完', 960, 610, 40, '#E8C9A0', { pop: seg(t, 183.2, 183.5) });
      }
    }
  }

  chapter('finale', 180, 183.59, [[180, finale]]);
})();
