import { launchGpu, sleep } from "file:///C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/audio_lab/web_kit/preview/cdp-lib-gpu.mjs";
const out = process.argv[2];
const b = await launchGpu({ port: 9610, width: 1280, height: 900 });
try {
  await b.viewport(1280, 900, 1);
  await b.goto("http://localhost:5354/accretion?source=demo", "!!(window.__accretion && window.__accretion.debug())");
  await sleep(4000);
  console.log(JSON.stringify(await b.js("(() => { const s = window.__accretion.sample(); return { R: s.R, centre: s.centre, ring: s.ring, disk: s.disk, jet: s.jet, background: s.background, jetLevel: s.anim.jet, exposure: s.anim.exposure }; })()")));
  console.log(JSON.stringify(await b.js("window.__accretion.timing()")));
  await b.shot(out + "/probe-demo-v2.png"); await b.js("window.__accretion.silence()"); await sleep(4000); console.log("silent:", JSON.stringify(await b.js("(() => { const s = window.__accretion.sample(); return { centre: s.centre, ring: s.ring, disk: s.disk, jet: s.jet, background: s.background, jetLevel: s.anim.jet, exposure: s.anim.exposure }; })()"))); await b.shot(out + "/probe-silent-v2.png");
  console.log("events:", JSON.stringify(b.events.slice(0, 5)));
} finally { await b.close(); }