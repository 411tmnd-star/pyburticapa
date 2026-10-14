import { launchGpu, sleep } from "file:///C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/audio_lab/web_kit/preview/cdp-lib-gpu.mjs";
const A = "window.__accretion";
const warn = (b) => b.events.filter((e) => /WebGL|warning|error/i.test(e.kind + e.text)).length;
const b = await launchGpu({ port: 9630, width: 1280, height: 900 });
try {
  await b.goto("http://localhost:5354/accretion", `!!(${A} && ${A}.debug())`);
  await sleep(1500);
  console.log("A. after load:", warn(b));
  await b.js(`${A}.set(false)`); await sleep(500); await b.js(`${A}.set(true)`); await sleep(1500);
  console.log("B. after one unmount/mount with NO context loss:", warn(b));
  await b.js(`(() => { const e = ${A}.debug().host.three.getContext().getExtension('WEBGL_lose_context'); window.__l = e; e.loseContext(); return 1; })()`); await sleep(500);
  console.log("C. after loseContext:", warn(b));
  await b.js(`window.__l.restoreContext()`); await sleep(1500);
  console.log("D. after restoreContext and some frames:", warn(b));
  await b.js(`${A}.set(false)`); await sleep(800);
  console.log("E. after unmounting the restored scene:", warn(b), JSON.stringify(b.events.slice(-3)));
} finally { await b.close(); }