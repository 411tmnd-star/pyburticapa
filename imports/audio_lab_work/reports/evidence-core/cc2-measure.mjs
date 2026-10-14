// Polish-pass measurement for Constellation Core: rest-state luminance, and orb-disc contrast with an orb in front of the core.
// Usage: node cc2-measure.mjs <label>   (label: "before" or "after"). Writes cc2-<label>-measure.json and cc2-<label>-*.png here;
// refuses to overwrite. Input is scripted SYNTHETIC audio or silence. Run with the harness served on :5354 and the bundle built.
import { launchGpu, sleep } from "file:///C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/audio_lab/web_kit/preview/cdp-lib-gpu.mjs";
import { writeFileSync, existsSync } from "node:fs";

const label = process.argv[2];
if (!label) throw new Error("label required");
const EV = "C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/evidence-core/";
const out = EV + `cc2-${label}-measure.json`;
if (existsSync(out)) throw new Error("refusing to overwrite " + out);
const C = "window.__core";
const SUSTAINED = "{ bass: 0.45, mid: 0.6, high: 0.35, rms: 0.55, onset: 0.2, scene: 'active' }";
const READY = `!!(${C} && ${C}.debug() && ${C}.debug().frames > 5)`;
const data = { label, startedAt: new Date().toISOString() };
const b = await launchGpu({ port: 9660, width: 1280, height: 900 });
const png = async (name, clip) => { const p = EV + `cc2-${label}-${name}.png`; if (existsSync(p)) throw new Error("refusing to overwrite " + p); const r = await b.send("Page.captureScreenshot", clip ? { format: "png", clip: { ...clip, scale: 1 } } : { format: "png" }); writeFileSync(p, Buffer.from(r.data, "base64")); return p; };
const smp = () => b.js(`(() => { const s = ${C}.sample(); return { centre: s.centre, edge: s.edge, beam: s.beam, background: s.background, frameMean: s.frameMean, sceneLight: s.frameMean - s.background }; })()`);
try {
  await b.viewport(1280, 900, 1);
  await b.goto("http://localhost:5354/core?m=" + Date.now(), READY);
  await sleep(2500);
  data.restSilent = await smp(); await png("rest-silent");
  await b.js(`${C}.script({ bass: 0.1, mid: 0.12, high: 0.05, rms: 0.12, onset: 0.05, scene: 'rest' })`); await sleep(4000);
  data.restLow = await smp(); await png("rest-low");
  await b.js(`${C}.script(${SUSTAINED})`); await sleep(4000);
  data.sustained = await smp(); await png("sustained");
  const probe = await b.js(`${C}.orbProbe(true)`);
  data.orb = probe;
  if (probe.found) {
    await sleep(200);
    const x = Math.max(0, probe.cssX - 90 + 16 * 0), y = Math.max(0, probe.cssY - 90);
    // canvas starts at its container offset; convert canvas CSS coords to page coords
    const off = await b.js("(() => { const r = document.querySelector('canvas').getBoundingClientRect(); return { x: r.x, y: r.y }; })()");
    await png("orb-over-core", { x: Math.max(0, off.x + probe.cssX - 100), y: Math.max(0, off.y + probe.cssY - 100), width: 200, height: 200 });
    await png("orb-over-core-wide", { x: Math.max(0, off.x + probe.cssX - 260), y: Math.max(0, off.y + probe.cssY - 200), width: 520, height: 400 });
    await b.js(`${C}.resume()`);
  }
  data.consoleEvents = b.events.slice(0, 10);
} catch (e) { data.error = String(e && e.stack || e); console.error("FAILED", data.error); }
finally { writeFileSync(out, JSON.stringify(data, null, 1)); await b.close(); }
console.log(JSON.stringify(data, null, 1));
