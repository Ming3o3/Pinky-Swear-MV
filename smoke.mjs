// smoke.mjs: verify headless Edge + p5.brush GPU rendering + CJK fonts, before building the project.
import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CAND = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  'C:/Program Files/Google/Chrome/Application/chrome.exe'
];
import { existsSync } from 'node:fs';
const exe = CAND.find(existsSync);
console.log('browser:', exe);
const browser = await puppeteer.launch({
  executablePath: exe, headless: true, protocolTimeout: 0,
  args: ['--allow-file-access-from-files', '--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--window-size=1920,1080', '--disable-renderer-backgrounding', '--disable-background-timer-throttling']
});
const page = await browser.newPage();
page.on('console', m => console.log('[page]', m.text()));
page.on('pageerror', e => console.log('[pageerror]', e.message));
await page.goto(pathToFileURL(resolve('smoke.html')).href + '?render', { waitUntil: 'networkidle0' });
await page.waitForFunction('window.ready === true', { timeout: 30000 });
console.log('GPU:', await page.evaluate(() => { const gl = drawingContext, e = gl.getExtension('WEBGL_debug_renderer_info'); return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER); }));
for (const t of [0, 0.5]) {
  const t0 = Date.now();
  const { url, report } = await page.evaluate(async (t) => {
    const report = await window.renderAt(t);
    const url = document.getElementById('out').toDataURL('image/png');
    return { url, report };
  }, t);
  console.log(`t=${t}  ${Date.now() - t0} ms`);
  if (t === 0.5) { writeFileSync('out/smoke.png', Buffer.from(url.slice(url.indexOf(',') + 1), 'base64')); console.log('fonts:', report.join(' | ')); }
}
await browser.close();
console.log('SMOKE OK');
