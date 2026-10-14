import { launchGpu, sleep } from "file:///C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/audio_lab/web_kit/preview/cdp-lib-gpu.mjs";
const A = "window.__accretion";
const run = Number(process.argv[2] || 1);
const b = await launchGpu({ port: 9640 + run, width: 1280, height: 900 });
const all = [];
b.listeners.push((d) => { if (d.method === "Runtime.consoleAPICalled") all.push(`${d.params.type}: ${d.params.args.map((a) => a.value ?? a.description).join(" ")}`.slice(0, 160)); if (d.method === "Log.entryAdded") all.push(`log-${d.params.entry.level}: ${d.params.entry.text}`.slice(0, 160)); });
const st = async (tag) => console.log(tag, JSON.stringify(await b.js(`(() => { const d = ${A}.debug(); return d ? { status: d.host.status, frames: d.host.frameCount, lost: d.host.three ? d.host.three.getContext().isContextLost() : null, t: +d.anim.time.toFixed(2) } : 'no debug'; })()`)));
try {
  await b.viewport(1280, 720, 1);
  await b.goto("http://localhost:5354/accretion", `!!(${A} && ${A}.debug())`);
  await b.js(`${A}.demo()`); await sleep(2000); await st("start");
  await b.js(`${A}.gpuTime(60)`); await st("after gpuTime dpr1");
  await b.viewport(1280, 720, 1.5); await sleep(1500); await b.js(`${A}.gpuTime(60)`); await st("after gpuTime dpr1.5");
  await b.viewport(1920, 1080, 1); await sleep(1500); await b.js(`${A}.gpuTime(60)`); await st("after gpuTime 1920x1080");
  await b.viewport(1280, 720, 1); await sleep(800); await st("back at 1280x720");
  for (let i = 0; i < 6; i++) { await sleep(500); await st(`  +${(i + 1) * 0.5}s`); }
} finally { await b.close(); console.log("ALL CONSOLE:", JSON.stringify(all.filter((x) => !/Download the React DevTools/.test(x)).slice(0, 12))); }