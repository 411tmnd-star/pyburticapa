// Acceptance checks for the Constellation Core scene, on a GPU-enabled Edge (preview/cdp-lib-gpu.mjs).
// From web_kit/, with the harness served (node preview/serve-gl.mjs 5354) and the bundle built:
//   node preview/core-check.mjs [screenshotDir]
// Input is scripted SYNTHETIC audio or the 120 BPM synthetic demo; no real music is used. Exit 0 only if every section
// completed and every check passed. A crash exits non-zero and prints CRASHED.
import { join } from "node:path";
import { launchGpu, sleep } from "./cdp-lib-gpu.mjs";

const SHOTS = process.argv[2] || null;
const URL_BASE = "http://localhost:5354";
const results = [];
const measurements = {};
let completed = false;
const check = (name, ok, detail = "") => {
  results.push({ name, ok: !!ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  " + detail : ""}`);
};
let bref = null;
const allConsole = [];
const section = async (t) => {
  console.log(`\n== ${t} ==`);
  if (bref) {
    try {
      const d = await bref.js(`(() => { const d = window.__core && window.__core.debug(); if (!d) return 'no scene mounted'; const g = d.host.three && d.host.three.getContext(); return { status: d.host.status, frames: d.host.frameCount, contextLost: g ? g.isContextLost() : null, animTime: +d.anim.time.toFixed(2) }; })()`);
      console.log(`      [state] ${JSON.stringify(d)}`);
    } catch (e) { console.log(`      [state] unavailable: ${e.message}`); }
  }
};
const f3 = (x) => (typeof x === "number" ? x.toFixed(3) : String(x));
const waitFor = async (b, expr, ms) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { if (await b.js(expr)) return true; } catch { /* not yet */ }
    await sleep(50);
  }
  return false;
};
const C = "window.__core";
const SUSTAINED = "{ bass: 0.45, mid: 0.6, high: 0.35, rms: 0.55, onset: 0.2, scene: 'active' }";
const sample = (b) => b.js(`(() => { const s = ${C}.sample(); return s && { w: s.w, h: s.h, R: s.R, centre: s.centre, edge: s.edge, beam: s.beam, background: s.background, frameMean: s.frameMean, anim: s.anim, params: s.params }; })()`);
const anim = (b) => b.js(`(() => { const d = ${C}.debug(); return d && { ...d.anim }; })()`);
const status = (b) => b.js(`document.querySelector('[data-gl-status]')?.dataset.glStatus`);
const shot = async (b, name) => { if (SHOTS) await b.shot(join(SHOTS, `core-${name}.png`)); };
const poll = (b, expr, frames) => b.js(`new Promise((res) => { const out = []; let n = 0; (function f() { out.push(${expr}); if (++n < ${frames}) requestAnimationFrame(f); else res(out); })(); })`);
const countListeners = async (b, objectExpr, type) => {
  const r = await b.send("Runtime.evaluate", { expression: objectExpr });
  const l = await b.send("DOMDebugger.getEventListeners", { objectId: r.result.objectId, depth: 0 });
  return l.listeners.filter((x) => x.type === type).length;
};
const heapUsed = async (b) => { await b.send("HeapProfiler.collectGarbage"); return (await b.send("Runtime.getHeapUsage")).usedSize; };
const phaseRate = async (b, ms) => {
  const a0 = await anim(b); await sleep(ms); const a1 = await anim(b);
  return (a1.phase - a0.phase) / (a1.time - a0.time);
};

const b = await launchGpu({ port: 9630, width: 1280, height: 900 });
bref = b;
b.listeners.push((d) => {
  const t = d.method === "Runtime.consoleAPICalled" ? `${d.params.type}: ${d.params.args.map((a) => a.value ?? a.description).join(" ")}` : d.method === "Log.entryAdded" ? `log-${d.params.entry.level}: ${d.params.entry.text}` : null;
  if (t && /webgl|gpu|context|three/i.test(t)) allConsole.push(t.slice(0, 200));
});
try {
  await section("0. hardware");
  await b.send("HeapProfiler.enable");
  // 1280x900 matches the conditions the polish-pass thresholds were registered at (canvas 1248x563); pacing in section 9 uses 1280x720.
  await b.viewport(1280, 900, 1);
  await b.goto(URL_BASE + "/core", `!!(${C} && ${C}.debug())`);
  const gpu = await b.js(`(() => { const g = ${C}.debug().host.three.getContext(); const e = g.getExtension('WEBGL_debug_renderer_info'); return { renderer: e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : g.getParameter(g.RENDERER), version: g.getParameter(g.VERSION) }; })()`);
  measurements.gpu = gpu;
  console.log(`renderer: ${gpu.renderer} | ${gpu.version}`);
  check("hardware GPU in use (not software rendering)", /Intel|NVIDIA|AMD|Radeon|GeForce/i.test(gpu.renderer) && !/Basic Render|SwiftShader/i.test(gpu.renderer), gpu.renderer);

  await section("1. initialization");
  check("host status is 'ready'", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'ready'`, 4000));
  const st0 = await b.js(`({ scene: ${C}.sceneStats, host: ${C}.hostStats })`);
  check("exactly one live scene and one live host", st0.scene.created - st0.scene.disposed === 1 && st0.host.created - st0.host.disposed === 1, JSON.stringify(st0));
  const mem0 = await b.js(`${C}.memory()`);
  check("the scene owns 9 geometries, 0 textures", mem0.geometries === 9 && mem0.textures === 0, JSON.stringify(mem0));
  const f0 = await b.js(`${C}.debug().frames`);
  await sleep(600);
  check("frames are drawn through the shared pipeline", (await b.js(`${C}.debug().frames`)) - f0 > 20);

  await section("2. silence: the resting state");
  await sleep(2500);
  const S0 = await sample(b);
  await shot(b, "silent");
  measurements.silent = { centre: S0.centre, edge: S0.edge, beam: S0.beam, background: S0.background, frameMean: S0.frameMean };
  console.log(`      silent luminance: centre ${f3(S0.centre)} edge ${f3(S0.edge)} beam ${f3(S0.beam)} background ${f3(S0.background)} frameMean ${f3(S0.frameMean)}`);
  check("silence is calm (params report calm)", S0.params && S0.params.calm === true);
  check("the core interior is dark (centre luminance < 0.06)", S0.centre < 0.06, f3(S0.centre));
  check("the core edge stays legible in silence (edge > 1.5x centre and > background)", S0.edge > 1.5 * S0.centre && S0.edge > S0.background, `${f3(S0.edge)} vs centre ${f3(S0.centre)}`);
  check("no beam impulse in silence", S0.anim.beam < 0.01 && S0.anim.pulse < 0.01);

  await section("3. audio response (scripted synthetic input)");
  check("the scripted source starts and is labelled synthetic", (await b.js(`${C}.script(${SUSTAINED})`)) === "synthetic");
  await sleep(3500);
  const S1 = await sample(b);
  await shot(b, "sustained");
  measurements.sustained = { frameMean: S1.frameMean, edge: S1.edge, anim: { exposure: S1.anim.exposure, glow: S1.anim.glow, colour: S1.anim.colour } };
  // The whole-frame mean includes the constant clear-colour background, which dilutes the ratio (first run: 1.45x raw), so the
  // response is judged on the scene's own light: frame mean above the background, and the core edge.
  const lit = (s) => s.frameMean - s.background;
  check("sustained input is clearly brighter than silence (scene light above background >= 1.5x, core edge >= 1.5x)", lit(S1) >= 1.5 * lit(S0) && S1.edge >= 1.5 * S0.edge, `scene light ${f3(lit(S1))} vs ${f3(lit(S0))}; edge ${f3(S1.edge)} vs ${f3(S0.edge)}`);
  check("params are not calm and exposure follows loudness above the rest floor (0.2 + 0.8 x 0.55 = 0.64)", S1.params.calm === false && Math.abs(S1.anim.exposure - 0.64) < 0.03, f3(S1.anim.exposure));
  // Polish-pass criteria, fixed before the change (evidence-core/cc2-acceptance-thresholds.md). Luminance proxies, one viewport.
  check("R1 rest floor: silent scene light >= 0.0070 and core edge >= 0.105", lit(S0) >= 0.0070 && S0.edge >= 0.105, `scene light ${f3(lit(S0))}, edge ${f3(S0.edge)}`);
  check("R3 the floor keeps rest distinct from activity: sustained / silent >= 1.8 for scene light and for core edge", lit(S1) / lit(S0) >= 1.8 && S1.edge / S0.edge >= 1.8, `${(lit(S1) / lit(S0)).toFixed(2)} and ${(S1.edge / S0.edge).toFixed(2)}`);
  const orb = await b.js(`${C}.orbProbe(false)`);
  measurements.orb = orb;
  console.log(`      orb in front of the core (orb ${orb.orb}, phase ${f3(orb.phase)}): interior ${f3(orb.centre)} (spread ${f3(orb.interiorSpread)}), rim ${f3(orb.rim)}, core edge ${f3(S1.edge)}`);
  check("an orb passes in front of the core in the probe", orb.found === true);
  check("O1 the orb's interior is not darker than the core behind it (interior mean >= 0.05)", orb.centre >= 0.05, f3(orb.centre));
  check("O2 the orb shows a shading gradient, not a flat disc (interior spread >= 0.02)", orb.interiorSpread >= 0.02, f3(orb.interiorSpread));
  check("O3 the orb has a bright rim (rim mean >= 0.15)", orb.rim >= 0.15, f3(orb.rim));
  check("O4 the orb stays subordinate to the core (rim mean <= core edge at the same input)", orb.rim <= S1.edge, `${f3(orb.rim)} vs ${f3(S1.edge)}`);
  check("no beam without a hit (anim.beam < 0.01)", S1.anim.beam < 0.01);
  const rate1 = await phaseRate(b, 1500);
  check("orbits advance while playing", rate1 > 0.1, `${f3(rate1)} rad/s`);

  // bass hit: one controlled event, sampled every frame
  const beamBefore = (await sample(b)).beam;
  const aBeforeHit = await anim(b);
  await b.js(`${C}.hit(1)`);
  const beamSeries = await poll(b, `${C}.debug().anim.beam`, 90);
  const peak = Math.max(...beamSeries);
  const first3 = Math.max(...beamSeries.slice(0, 4));
  measurements.bass = { peak, first3, series: beamSeries.filter((_, i) => i % 6 === 0).map((x) => +x.toFixed(3)) };
  console.log(`      beam after hit (every 6th frame): ${measurements.bass.series.join(" ")}`);
  check("a bass hit raises the beam above 0.3 within a few frames", first3 > 0.3, `first 4 frames max ${f3(first3)}`);
  check("the beam is below full strength by design (anim <= 1, scene scales to 0.7)", peak <= 1);
  await sleep(200);
  await b.js(`${C}.hit(1)`); await b.js(`new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))`);
  const Shit = await sample(b);
  await shot(b, "bass-hit");
  check("the beam region brightens during a hit (> 1.5x its pre-hit level)", Shit.beam > 1.5 * beamBefore + 0.003, `${f3(Shit.beam)} vs ${f3(beamBefore)}`);
  await sleep(1700);
  const aAfterHit = await anim(b);
  check("the beam decays back (anim.beam < 0.05 within 1.7 s) and does not stay lit", aAfterHit.beam < 0.05, f3(aAfterHit.beam));
  const Spost = await sample(b);
  check("the beam region returns to its pre-hit level", Spost.beam < beamBefore * 1.6 + 0.004, `${f3(Spost.beam)} vs ${f3(beamBefore)}`);

  // single onset, then a rapid train
  const accBefore = aAfterHit.pulsesAccepted;
  await b.js(`${C}.beat(0.9)`);
  const pulseSeries = await poll(b, `${C}.debug().anim.pulse`, 20);
  check("one onset lights a ring pulse above 0.3", Math.max(...pulseSeries) > 0.3, f3(Math.max(...pulseSeries)));
  await sleep(1500);
  const aAfterBeat = await anim(b);
  check("exactly one pulse was accepted for the single onset", aAfterBeat.pulsesAccepted === accBefore + 1, `${accBefore} to ${aAfterBeat.pulsesAccepted}`);
  await b.js(`${C}.train(20, 60, 0.9)`);
  await sleep(2600); // the train lasts ~1.2 s and the last accepted pulse can land near its end; allow >= 4 time constants after it
  const aTrain = await anim(b);
  const acceptedInTrain = aTrain.pulsesAccepted - aAfterBeat.pulsesAccepted;
  const rejectedInTrain = aTrain.pulsesRejected - aAfterBeat.pulsesRejected;
  measurements.train = { acceptedInTrain, rejectedInTrain };
  console.log(`      20 onsets in ~1.2 s: accepted ${acceptedInTrain}, refused ${rejectedInTrain}`);
  check("a train of 20 onsets in ~1.2 s is rate limited (<= 4 accepted, under 3 per second)", acceptedInTrain <= 4 && acceptedInTrain >= 2 && rejectedInTrain >= 10, `accepted ${acceptedInTrain}, refused ${rejectedInTrain}`);
  check("pulses decay (anim.pulse < 0.05 after the train)", aTrain.pulse < 0.05, f3(aTrain.pulse));

  // return to rest
  await b.js(`${C}.silence()`);
  await sleep(4000);
  const Srest = await sample(b);
  check("after the source stops the scene returns to the calm resting state", Srest.params.calm === true && Math.abs(Srest.anim.exposure - 0.2) < 0.02 && Srest.anim.beam < 0.01 && Srest.frameMean < 1.3 * S0.frameMean + 0.003, `frameMean ${f3(Srest.frameMean)} vs ${f3(S0.frameMean)}`);

  await section("4. reduced motion");
  await b.js(`${C}.script(${SUSTAINED})`);
  await sleep(3500);
  const normalRate = await phaseRate(b, 2000);
  const normalMean = (await sample(b)).frameMean;
  await b.emulateMotion(true);
  await b.goto(URL_BASE + "/core?reduced=" + Date.now(), `!!(${C} && ${C}.debug() && ${C}.debug().frames > 5)`);
  check("the host reports reduced motion", await b.js(`${C}.debug().host.reducedMotion === true`));
  await b.js(`${C}.script(${SUSTAINED})`);
  await sleep(4500);
  const redRate = await phaseRate(b, 2000);
  const ratio = redRate / normalRate;
  measurements.reduced = { normalRate, redRate, ratio };
  console.log(`      orbit phase rate: normal ${f3(normalRate)}, reduced ${f3(redRate)}, ratio ${f3(ratio)}`);
  check("orbits turn at about 0.35x of the normal speed (0.25 to 0.45)", ratio > 0.25 && ratio < 0.45, f3(ratio));
  const Sr = await sample(b);
  await shot(b, "reduced");
  check("params report motion 0.35", Math.abs(Sr.params.motion - 0.35) < 1e-6, f3(Sr.params.motion));
  const accR0 = Sr.anim.pulsesAccepted;
  await b.js(`${C}.hit(1)`);
  const redBeam = Math.max(...(await poll(b, `${C}.debug().anim.beam`, 60)));
  await b.js(`${C}.beat(0.9)`); await sleep(800);
  const redAfter = await anim(b);
  check("no beam surge under reduced motion", redBeam === 0, f3(redBeam));
  check("no ring pulse under reduced motion", redAfter.pulse === 0 && redAfter.pulsesAccepted === accR0, `accepted ${accR0} to ${redAfter.pulsesAccepted}`);
  check("brightness and identity are retained (frame mean >= 70% of normal)", Sr.frameMean >= 0.7 * normalMean, `${f3(Sr.frameMean)} vs ${f3(normalMean)}`);
  await b.emulateMotion(false);

  await section("5. resize and framing (the outer ring must fit the canvas)");
  await b.goto(URL_BASE + "/core?fit=" + Date.now(), `!!(${C} && ${C}.debug() && ${C}.debug().frames > 5)`);
  await b.js(`${C}.script(${SUSTAINED})`);
  measurements.fit = [];
  for (const [vw, vh, dpr] of [[1280, 720, 1], [1920, 1080, 1], [1280, 900, 1.5], [768, 1024, 1], [390, 844, 1]]) {
    await b.viewport(vw, vh, dpr);
    await sleep(900);
    const r = await b.js(`(() => { const cv = document.querySelector('canvas'), box = cv.parentElement.getBoundingClientRect(), gl = ${C}.debug().host.three.getContext(); return { client: [cv.clientWidth, cv.clientHeight], box: [Math.round(box.width), Math.round(box.height)], buffer: [gl.drawingBufferWidth, gl.drawingBufferHeight], pr: ${C}.debug().host.pixelRatioInUse, fit: ${C}.fits() }; })()`);
    measurements.fit.push({ vw, vh, dpr, ...r });
    check(`${vw}x${vh} DPR ${dpr}: canvas fills its container and the buffer matches`, r.client[0] === r.box[0] && r.client[1] === r.box[1] && r.buffer[0] === Math.floor(r.client[0] * r.pr) && r.buffer[1] === Math.floor(r.client[1] * r.pr), `client ${r.client} buffer ${r.buffer} pr ${r.pr}`);
    // Framing rule: the outer ring's full WIDTH fits at every aspect (the Accretion review found its disk clipped on narrow screens).
    // The vertical extent is not constrained: on wide canvases the outer ring and beam may cross the top and bottom edges by design.
    check(`${vw}x${vh} DPR ${dpr}: the rings' full width is inside the canvas (max |x| < 1)`, r.fit.maxAbsX < 1, `max |x| ${f3(r.fit.maxAbsX)}, max |y| ${f3(r.fit.maxAbsY)} (informational), distance ${f3(r.fit.distance)}`);
    await shot(b, `viewport-${vw}x${vh}-dpr${String(dpr).replace(".", "p")}`);
  }
  await b.viewport(1280, 720, 1); await sleep(600);
  const sz1 = await b.js(`[document.querySelector('canvas').clientWidth, document.querySelector('canvas').clientHeight]`);
  await b.viewport(1000, 700, 1); await sleep(400); await b.viewport(1280, 720, 1); await sleep(600);
  const sz2 = await b.js(`[document.querySelector('canvas').clientWidth, document.querySelector('canvas').clientHeight]`);
  check("resizing away and back gives the same size (no feedback growth)", sz1[0] === sz2[0] && sz1[1] === sz2[1], `${sz1} then ${sz2}`);

  await section("6. context loss and restore");
  const geoBefore = (await b.js(`${C}.memory()`)).geometries;
  const cornerPx = () => b.js(`(() => { const d = ${C}.debug(), gl = d.host.three.getContext(); d.host.render(d.scene.scene, d.scene.camera); const a = new Uint8Array(4); gl.readPixels(5, 5, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, a); return Array.from(a); })()`);
  const cornerBefore = await cornerPx();
  const evBefore = b.events.length;
  await b.js(`(() => { window.__lose = ${C}.debug().host.three.getContext().getExtension('WEBGL_lose_context'); window.__lose.loseContext(); })()`);
  check("status becomes 'lost'", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'lost'`, 3000));
  const fLost0 = await b.js(`${C}.debug().host.frameCount`);
  await sleep(500);
  check("nothing is drawn while the context is lost", (await b.js(`${C}.debug().host.frameCount`)) === fLost0);
  await b.js(`window.__lose.restoreContext()`);
  check("status returns to 'ready'", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'ready'`, 4000));
  await sleep(800);
  const geoAfter = (await b.js(`${C}.memory()`)).geometries;
  check("all geometries are uploaded again after the restore", geoAfter === geoBefore, `${geoBefore} to ${geoAfter}`);
  const fR = await b.js(`${C}.debug().host.frameCount`);
  await sleep(500);
  check("drawing resumes", (await b.js(`${C}.debug().host.frameCount`)) - fR > 15);
  const Sres = await sample(b);
  await shot(b, "after-restore");
  check("the scene is visible after the restore (core edge > 1.5x centre, scene light above background > silence)", Sres.edge > 1.5 * Sres.centre && lit(Sres) > lit(S0), `edge ${f3(Sres.edge)} centre ${f3(Sres.centre)} scene light ${f3(lit(Sres))}`);
  const cornerAfter = await cornerPx();
  check("the background clear colour survives the restore (corner pixel unchanged; Three.js resets it to black otherwise)", JSON.stringify(cornerBefore) === JSON.stringify(cornerAfter), `${JSON.stringify(cornerBefore)} then ${JSON.stringify(cornerAfter)}`);
  const warnings = b.events.slice(evBefore).filter((e) => /does not belong|INVALID_|GL_/i.test(e.text));
  check("no WebGL 'does not belong to this context' warnings", warnings.length === 0, warnings.map((w) => w.text).slice(0, 2).join(" | "));

  await section("7. repeated mount and unmount (30 cycles)");
  await b.viewport(1280, 720, 1); await sleep(400);
  const winBefore = await countListeners(b, "window", "resize");
  const docBefore = await countListeners(b, "document", "visibilitychange");
  const heap0 = await heapUsed(b);
  const s0 = await b.js(`({ scene: ${C}.sceneStats, host: ${C}.hostStats })`);
  for (let i = 0; i < 30; i++) {
    await b.js(`${C}.set(false)`); await sleep(60);
    await b.js(`${C}.set(true)`); await waitFor(b, `!!${C}.debug() && ${C}.debug().frames > 2`, 3000);
  }
  await sleep(500);
  const s1 = await b.js(`({ scene: ${C}.sceneStats, host: ${C}.hostStats })`);
  check("30 scenes and 30 hosts were created and disposed", s1.scene.created - s0.scene.created === 30 && s1.scene.disposed - s0.scene.disposed === 30 && s1.host.created - s0.host.created === 30 && s1.host.disposed - s0.host.disposed === 30, JSON.stringify({ s0, s1 }));
  check("one scene and one host are live afterwards", s1.scene.created - s1.scene.disposed === 1 && s1.host.created - s1.host.disposed === 1);
  check("window resize and document visibility listeners return to baseline", (await countListeners(b, "window", "resize")) === winBefore && (await countListeners(b, "document", "visibilitychange")) === docBefore, `window ${winBefore}, document ${docBefore}`);
  const heap1 = await heapUsed(b);
  measurements.heapGrowthMB = (heap1 - heap0) / 1048576;
  check("heap growth after 30 cycles is under 5 MB", heap1 - heap0 < 5 * 1048576, `${measurements.heapGrowthMB.toFixed(2)} MB`);
  check("exactly one canvas remains and the scene is drawing", (await b.js(`document.querySelectorAll('canvas').length`)) === 1 && (await b.js(`${C}.debug().host.status`)) === "ready");

  await section("8. hidden tab");
  await b.js(`(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); })()`);
  check("status becomes 'hidden'", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'hidden'`, 2000));
  const fH = await b.js(`${C}.debug().host.frameCount`);
  await sleep(400);
  check("nothing is drawn while hidden", (await b.js(`${C}.debug().host.frameCount`)) === fH);
  await b.js(`(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => false }); document.dispatchEvent(new Event('visibilitychange')); })()`);
  check("status returns to 'ready' and drawing resumes without a time jump", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'ready'`, 2000) && (await sleep(500), (await b.js(`${C}.debug().host.frameCount`)) - fH > 10));

  await section("9. frame pacing and GPU time (synthetic demo, 120 BPM)");
  await b.viewport(1280, 720, 1); await sleep(400);
  await b.js(`${C}.demo()`); await sleep(3000);
  await b.js(`${C}.mark()`); await sleep(10000);
  const T = await b.js(`${C}.timing()`);
  const G = await b.js(`${C}.gpuTime(120)`);
  measurements.perf = { T, G };
  console.log(`      1280x720 DPR1 canvas ${G.buffer}: interval median ${f3(T.intervals.median)} p95 ${f3(T.intervals.p95)} p99 ${f3(T.intervals.p99)} max ${f3(T.intervals.max)} over33 ${(T.intervals.over33 * 100).toFixed(2)}% | main thread median ${f3(T.cpu.median)} p95 ${f3(T.cpu.p95)} | GPU sync median ${f3(G.median)} p95 ${f3(G.p95)}`);
  check("1280x720 DPR 1 (10 s): interval median <= 16.9 ms and p95 <= 20 ms", T.intervals.median <= 16.9 && T.intervals.p95 <= 20, `${f3(T.intervals.median)} / ${f3(T.intervals.p95)}`);
  check("p99 <= 33 ms and under 1% of frames over 33 ms", T.intervals.p99 <= 33 && T.intervals.over33 < 0.01, `${f3(T.intervals.p99)}, ${(T.intervals.over33 * 100).toFixed(2)}%`);
  check("main-thread time per frame median <= 4 ms", T.cpu.median <= 4, f3(T.cpu.median));
  check("synchronized GPU time median <= 8 ms at DPR 1", G.median <= 8, f3(G.median));
  await shot(b, "demo");
  await b.viewport(1920, 1080, 1); await sleep(800);
  const G2 = await b.js(`${C}.gpuTime(80)`);
  await b.viewport(1280, 720, 1.5); await sleep(800);
  const G3 = await b.js(`${C}.gpuTime(80)`);
  measurements.perfOther = { fullHdViewport: G2, dpr15: G3 };
  console.log(`      1920x1080 viewport canvas ${G2.buffer}: GPU sync median ${f3(G2.median)} p95 ${f3(G2.p95)} | DPR 1.5 canvas ${G3.buffer}: median ${f3(G3.median)} p95 ${f3(G3.p95)}`);
  check("GPU time is recorded for the larger canvases (informational, outside the gate)", Number.isFinite(G2.median) && Number.isFinite(G3.median));

  await section("10. browser errors");
  const bad = b.events.filter((e) => e.kind === "exception" || e.kind === "error" || e.kind === "log-error" || e.kind === "warning" || e.kind === "log-warning");
  check("no page exceptions, console errors or warnings", bad.length === 0, bad.slice(0, 3).map((e) => e.text.slice(0, 120)).join(" | "));
  console.log(`      WebGL-related console lines: ${JSON.stringify([...new Set(allConsole)])}`);
  completed = true;
} catch (e) {
  console.log("CRASHED: " + (e && e.stack || e));
} finally {
  await b.close();
}
const failed = results.filter((r) => !r.ok);
console.log(`\nMEASUREMENTS ${JSON.stringify(measurements)}`);
console.log(`\n${results.length - failed.length}/${results.length} checks passed${completed ? "" : "  (RUN DID NOT COMPLETE)"}`);
if (failed.length) for (const f of failed) console.log("FAILED: " + f.name + "  " + f.detail);
process.exit(completed && failed.length === 0 ? 0 : 1);
