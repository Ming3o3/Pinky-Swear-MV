// qc.mjs: run probe stats for a list of times, print one line per time. Usage: node qc.mjs t1,t2,...
import { spawnSync } from 'node:child_process';
const r = spawnSync('node', ['render.mjs', '--probe=' + process.argv[2]], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const out = (r.stdout || '') + '\n' + (r.stderr || '');
const i = out.indexOf('[\n') >= 0 ? out.indexOf('[\n') : out.indexOf('[ {') ;
const j = out.lastIndexOf(']');
if (i < 0 || j < 0) { console.log(out); process.exit(1); }
let stats; try { stats = JSON.parse(out.slice(i, j + 1)); } catch (e) { console.log(out); process.exit(1); }
for (const s of stats)
  console.log(`t=${String(s.t).padStart(6)}  content=${String(s.contentPct).padStart(5)}%  ink=${String(s.inkPct).padStart(5)}%  karaoke=${String(s.karaokePct).padStart(5)}%  mean=[${s.mean}]  bbox=[${s.bbox}]`);
