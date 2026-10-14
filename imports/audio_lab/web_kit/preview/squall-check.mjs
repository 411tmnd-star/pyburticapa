// Browser verification of Squall, driven through the Chrome DevTools Protocol (Microsoft Edge, headless).
// From web_kit/, with the preview built and served (see preview/README.txt):
//   node --import ./tests/resolve-ts.mjs --experimental-transform-types preview/squall-check.mjs [section ...]
// Sections: render audio offline pointer cleanup states a11y  (default: all). Screenshots go to shots/squall-*.png.
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

import { launch, sleep } from "./cdp-lib.mjs";
import { forecastFromSong } from "../src/lib/squall/forecast-decode.ts";
import { tendencyAt } from "../src/lib/squall/forecast.ts";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const SITE = "http://localhost:5353/squall";
const SHOTS = join(root, "shots");
const work = mkdtempSync(join(tmpdir(), "squall-check-"));
const WAV = join(work, "signal.wav");
execFileSync(process.execPath, [join(here, "make-test-wav.mjs"), WAV], { stdio: "ignore" });
const JUNK = join(work, "broken.mp3");
writeFileSync(JUNK, Buffer.from("this is not audio at all".repeat(40)));
const TEXT = join(work, "notes.txt");
writeFileSync(TEXT, "hello");

const wanted = new Set(process.argv.slice(2));
const run = (name) => wanted.size === 0 || wanted.has(name);
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  " + detail : ""}`);
};
const shot = (b, name) => b.shot(join(SHOTS, `squall-${name}.png`));
/** The map canvas, captured in the page at this instant (a full-page screenshot lags behind playback in headless software rendering). */
const mapShot = async (b, name) => {
  const url = await b.js("document.querySelector('[data-squall] canvas[role=img]').toDataURL('image/png')");
  writeFileSync(join(SHOTS, `squall-${name}.png`), Buffer.from(url.split(",")[1], "base64"));
};
const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
const max = (a) => (a.length ? Math.max(...a) : 0);
const f2 = (x) => Number(x).toFixed(2);

const ready = "!!window.__pipeline && !!window.__snapshot && !!document.querySelector('[data-source=demo]')";
const open = async (b, query = "") => {
  await b.goto(SITE + query, ready);
  await sleep(500);
};
const snap = (b) => b.js("JSON.stringify(window.__snapshot.current)").then(JSON.parse);
const state = (b) => b.js("JSON.stringify(window.__pipeline.getState())").then(JSON.parse);
const waitFor = async (b, expr, ms = 8000) => {
  for (let t = 0; t < ms; t += 100) {
    if (await b.js(expr)) return true;
    await sleep(100);
  }
  return false;
};
/** Pixels of the map canvas that are not (nearly) the ink background: a blank canvas scores near 0. */
const inkyShare = (b) =>
  b.js(`(() => { const c = document.querySelector('[data-squall] canvas[role=img]'); const x = c.getContext('2d'); const w = c.width, h = c.height;
    const d = x.getImageData(0, 0, w, h).data; let lit = 0, n = 0; for (let i = 0; i < d.length; i += 4 * 17) { n++; if (d[i] + d[i + 1] + d[i + 2] > 120) lit++; } return lit / n; })()`);

const b = await launch({ width: 1280, height: 820 });
try {
  // =================================================================================================
  if (run("render")) {
    console.log("\n== 1. Render and resize ==");
    await b.viewport(1280, 820);
    await open(b);
    const r0 = await b.rect("[data-squall] canvas[role=img]");
    const dims = await b.js(`(() => { const c = document.querySelector('[data-squall] canvas[role=img]'); return { w: c.width, h: c.height, dpr: devicePixelRatio }; })()`);
    check("canvas fills its container and its backing store matches the CSS size", Math.abs(dims.w - r0.w * dims.dpr) <= 1 && Math.abs(dims.h - r0.h * dims.dpr) <= 1, `css ${r0.w}x${r0.h}, backing ${dims.w}x${dims.h}`);
    const f1 = (await snap(b)).frames;
    await sleep(500);
    const f2n = (await snap(b)).frames;
    check("the loop draws while idle (calm map)", f2n > f1 + 5, `${f1} -> ${f2n} frames in 0.5 s`);
    const calm = await snap(b);
    check("idle: calm, Force 0, two storms", calm.weather.calm && calm.readout.force === 0 && calm.storms.length === 2, `force ${calm.readout.force}, storms ${calm.storms.length}`);
    check("idle chart is dim but not blank", (await inkyShare(b)) > 0.001);
    await shot(b, "01-empty-desktop");

    await b.click("[data-source=demo]");
    await sleep(2500);
    const lit = await inkyShare(b);
    check("demo playing: the map lights up", lit > 0.1, `lit pixel share ${f2(lit)}`);
    await shot(b, "02-demo-desktop");

    // Resize: the canvas must follow the window, keep drawing and keep storms on the map.
    for (const [w, h, mobile, name] of [[900, 640, false, "03-resized-900"], [390, 844, true, "04-mobile-390"], [1600, 700, false, "05-wide-1600"]]) {
      await b.viewport(w, h, mobile);
      await sleep(700);
      const r = await b.rect("[data-squall] canvas[role=img]");
      const d = await b.js(`(() => { const c = document.querySelector('[data-squall] canvas[role=img]'); return { w: c.width, h: c.height, dpr: devicePixelRatio, sw: document.documentElement.scrollWidth, iw: innerWidth }; })()`);
      const s0 = (await snap(b)).frames;
      await sleep(400);
      const s1 = await snap(b);
      check(`resize ${w}x${h}: canvas follows, no horizontal scroll, still drawing`, Math.abs(d.w - r.w * d.dpr) <= 1 && Math.abs(d.h - r.h * d.dpr) <= 1 && d.sw <= d.iw && s1.frames > s0 + 3, `canvas ${r.w}x${r.h}, scrollWidth ${d.sw}/${d.iw}`);
      check(`resize ${w}x${h}: map not blank`, (await inkyShare(b)) > 0.02);
      await shot(b, name);
    }
    await b.viewport(1280, 820);
    await sleep(400);
    check("page errors during render checks", b.events.filter((e) => e.kind === "exception").length === 0, JSON.stringify(b.events.slice(0, 3)));
  }

  // =================================================================================================
  if (run("audio")) {
    console.log("\n== 2/3. Audio reactivity: a real file through a real AnalyserNode ==");
    await b.viewport(1280, 820);
    await open(b);
    await b.setFile("[data-empty] [data-file-input]", WAV);
    check("file source adopted (kind live, seekable)", await waitFor(b, "window.__pipeline.getState().source?.id?.startsWith('file:')"));
    await waitFor(b, "document.querySelector('[data-forecast]')?.dataset.forecast === 'ready'", 6000);
    check("forecast strip fills after the file is decoded", (await b.js("document.querySelector('[data-forecast]').dataset.forecast")) === "ready");
    await b.js("window.__diag.reset()");
    await b.click("[data-play]");
    check("play starts the audio", await waitFor(b, "window.__pipeline.getState().isPlaying", 4000));
    const marks = [[5.5, "10-kicks"], [10.5, "11-hats"], [14.5, "12-mid"], [18, "13-silence-after"]];
    for (const [t, name] of marks) {
      if (!(await waitFor(b, `window.__pipeline.frame.time >= ${t}`, 25000))) break;
      await mapShot(b, name);
    }
    await waitFor(b, "window.__pipeline.frame.time >= 18.9 || !window.__pipeline.getState().isPlaying", 6000);
    const series = await b.js("JSON.stringify(window.__diag.series)").then(JSON.parse);
    const seg = (a, z) => series.filter((s) => s.playing && s.time >= a && s.time < z);
    const sil1 = seg(0.3, 1.8), kick = seg(2.6, 7.8), hat = seg(8.6, 12.8), mid = seg(13.5, 15.8), sil2 = seg(17, 18.8);
    console.log(`      segments: silence ${sil1.length}, kicks ${kick.length}, hats ${hat.length}, mid ${mid.length}, silence ${sil2.length} samples`);
    const col = (a, k) => a.map((s) => s[k]);
    const row = (name, a) => console.log(`      ${name.padEnd(8)} bass ${f2(mean(col(a, "bass")))}  mid ${f2(mean(col(a, "mid")))}  high ${f2(mean(col(a, "high")))}  rms ${f2(mean(col(a, "rms")))}  hit(max) ${f2(max(col(a, "hit")))}  vortex ${f2(mean(col(a, "vortex")))}  jet ${f2(mean(col(a, "jet")))}  rain ${f2(mean(col(a, "rain")))}  force ${f2(mean(col(a, "force")))}`);
    row("silence", sil1); row("kicks", kick); row("hats", hat); row("mid", mid); row("silence", sil2);
    check("silence: RMS near zero, the map is calm (Force 0)", max(col(sil1, "rms")) < 0.05 && mean(col(sil1, "force")) < 0.5 && max(col(sil1, "rain")) === 0, `rms max ${f2(max(col(sil1, "rms")))}`);
    check("BASS: kicks raise bass and bass hit; storms deepen (vortex speed up)", mean(col(kick, "bass")) > mean(col(sil1, "bass")) + 0.15 && max(col(kick, "hit")) > 0.5 && mean(col(kick, "vortex")) > mean(col(sil1, "vortex")) + 0.05, `vortex ${f2(mean(col(sil1, "vortex")))} -> ${f2(mean(col(kick, "vortex")))}`);
    check("BASS HIT: inflow surges on kicks and a pressure ring leaves the eyes", max(col(kick, "inflow")) > 0.2 && (kick.at(-1)?.rings ?? 0) - (kick[0]?.rings ?? 0) >= 6, `peak inflow ${f2(max(col(kick, "inflow")))}, rings +${(kick.at(-1)?.rings ?? 0) - (kick[0]?.rings ?? 0)} (12 kicks)`);
    check("HIGH: hi-hats raise high and bring rain; kicks alone do not", mean(col(hat, "high")) > mean(col(kick, "high")) + 0.1 && mean(col(hat, "rain")) > 0.1 && mean(col(hat, "rain")) > mean(col(kick, "rain")) + 0.05, `rain kicks ${f2(mean(col(kick, "rain")))} -> hats ${f2(mean(col(hat, "rain")))}`);
    check("MID: tones raise mid and speed up the jet stream", mean(col(mid, "mid")) > mean(col(hat, "mid")) + 0.1 && mean(col(mid, "jet")) > mean(col(sil1, "jet")) + 0.03, `jet silence ${f2(mean(col(sil1, "jet")))} -> mid ${f2(mean(col(mid, "jet")))}`);
    check("RMS: overall energy raises the Beaufort force above silence in every loud segment", [kick, hat, mid].every((a) => mean(col(a, "force")) > mean(col(sil1, "force")) + 1), `force kicks ${f2(mean(col(kick, "force")))}, hats ${f2(mean(col(hat, "force")))}, mid ${f2(mean(col(mid, "force")))}`);
    const beatsKick = kick.filter((s) => s.beat).length;
    const strikesDuring = (kick.at(-1)?.strikes ?? 0) - (kick[0]?.strikes ?? 0);
    const strikesHats = (hat.at(-1)?.strikes ?? 0) - (hat[0]?.strikes ?? 0);
    check("ONSET: detected onsets strike lightning, at most 3 a second", beatsKick >= 4 && strikesDuring >= 2 && strikesDuring <= 3 * 5.2 + 1, `kick segment (5.2 s): ${beatsKick} beat frames, ${strikesDuring} strikes; hats: ${strikesHats}`);
    check("silence again: calm returns, strikes stop", max(col(sil2, "rain")) === 0 && mean(col(sil2, "force")) < 1.5 && (sil2.at(-1)?.strikes ?? 0) === (sil2[0]?.strikes ?? 0), `force ${f2(mean(col(sil2, "force")))}`);
    const chips = await b.js("document.querySelector('[data-chip]').dataset.chip");
    check("status chip says the doldrums or paused at the end", ["silent", "paused"].includes(chips), chips);
    check("no exceptions while playing a real file", b.events.filter((e) => e.kind === "exception").length === 0, JSON.stringify(b.events.slice(0, 3)));
    const frameMs = (await snap(b)).frameMs;
    console.log(`      average frame interval ${f2(frameMs)} ms (headless Edge, software rendering)`);
  }

  // =================================================================================================
  if (run("offline")) {
    console.log("\n== 4. Forecast strip, seeking, scene states (pre-computed Seyi track) ==");
    await b.viewport(1280, 820);
    await open(b);
    await b.click("[data-source='song:seyi']");
    check("track loads as an offline source with a duration", await waitFor(b, "window.__pipeline.getState().source?.kind === 'offline' && window.__pipeline.getState().duration > 60"));
    check("forecast strip is ready", await waitFor(b, "document.querySelector('[data-forecast]')?.dataset.forecast === 'ready'", 5000));
    const strip = await b.rect("[data-forecast]");
    const paint = await b.js(`(() => { const c = document.querySelector('[data-forecast] canvas'); const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let lit = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 40) lit++; return lit / (d.length / 4); })()`);
    check("strip silhouette is drawn", paint > 0.05, `painted share ${f2(paint)}`);
    await shot(b, "20-forecast-paused");
    const dur = (await state(b)).duration;
    // Seeking by clicking the strip (real mouse), while paused.
    for (const p of [0.25, 0.5, 0.8]) {
      await b.mouse("mouseMoved", strip.x + strip.w * p, strip.y + strip.h / 2);
      await b.mouse("mousePressed", strip.x + strip.w * p, strip.y + strip.h / 2, 1);
      await b.mouse("mouseReleased", strip.x + strip.w * p, strip.y + strip.h / 2, 0);
      await sleep(300);
      const t = await b.js("window.__pipeline.frame.time");
      check(`click strip at ${p * 100}% seeks while paused`, Math.abs(t - dur * p) < dur * 0.03, `time ${f2(t)} s, wanted ${f2(dur * p)}`);
    }
    const headLeft = await b.js("parseFloat(document.querySelector('[data-forecast] .bg-white').style.left)");
    check("playhead follows the seek", Math.abs(headLeft - 80) < 4, `${f2(headLeft)}%`);

    // Scene states, against the timeline the AudioLab analysis wrote.
    const tl = JSON.parse(readFileSync(join(root, "public/motion/seyi/balanced.timeline.json"), "utf8"));
    const want = (t) => tl.states.find((s) => t >= s.start && t < s.end)?.state;
    let okScenes = true;
    const seen = [];
    for (const t of [3, 17, 25, 76, 78]) {
      await b.js(`window.__pipeline.seek(${t})`);
      await sleep(250);
      const got = (await state(b)).scene;
      seen.push(`${t}s:${got}`);
      if (got !== want(t)) okScenes = false;
    }
    check("scene state follows the motion timeline across seeks (rest, build, active, settle, rest)", okScenes, seen.join("  "));
    const hud = await b.js("document.querySelector('[data-scene-label]').textContent");
    check("HUD shows the scene", /scene: (rest|build|active|settle)/.test(hud), hud);

    // A seek is a different stretch of music: the lightning history resets.
    await b.js("window.__pipeline.play(); window.__pipeline.seek(40)");
    await sleep(4500);
    const before = (await snap(b)).readout.strikesPerMin;
    await b.js("window.__pipeline.pause(); window.__pipeline.seek(5)");
    await sleep(900);
    const after = (await snap(b)).readout.strikesPerMin;
    check("seeking resets the strikes-per-minute history", before > 0 && after === 0, `${before} -> ${after}`);
    await b.js("window.__pipeline.pause()");

    // Playback sync: the strip clock and the pipeline clock advance together at real speed.
    await b.js("window.__pipeline.seek(20)");
    await b.click("[data-play]");
    await sleep(500);
    const a0 = await b.js("({ t: window.__pipeline.frame.time, w: performance.now() })");
    await sleep(3000);
    const a1 = await b.js("({ t: window.__pipeline.frame.time, w: performance.now(), clock: document.querySelector('[data-clock]').textContent, head: parseFloat(document.querySelector('[data-forecast] .bg-white').style.left), range: parseFloat(document.querySelector('[data-forecast] input').value) })");
    const rate = (a1.t - a0.t) / ((a1.w - a0.w) / 1000);
    check("playback advances at real time (offline clock)", Math.abs(rate - 1) < 0.1, `${f2(rate)}x`);
    check("clock, playhead and range value all track the frame time", Math.abs(a1.head - (a1.t / dur) * 100) < 1.5 && Math.abs(a1.range - a1.t) < 0.6 && a1.clock.startsWith(`${Math.floor(a1.t / 60)}:`), `${a1.clock}, head ${f2(a1.head)}%, range ${f2(a1.range)}`);
    // Barometer: it should fall ahead of a louder passage and be steady in a stable one. Truth comes from the same forecast code, run in Node.
    globalThis.fetch = async (u) => {
      try {
        return new Response(readFileSync(join(root, "public", String(u).replace(/^\//, ""))), { status: 200 });
      } catch {
        return new Response("nope", { status: 404 });
      }
    };
    const fc = await forecastFromSong("/motion/manifest.json", "seyi");
    let best = { t: 0, v: -1 };
    for (let t = 2; t < fc.durationS - 6; t += 0.25) if (tendencyAt(fc, t) > best.v) best = { t, v: tendencyAt(fc, t) };
    let low = { t: 0, v: 1 };
    for (let t = 6; t < fc.durationS - 6; t += 0.25) if (tendencyAt(fc, t) < low.v) low = { t, v: tendencyAt(fc, t) };
    await b.js(`window.__pipeline.seek(${best.t})`);
    await sleep(1200);
    const fall = await snap(b);
    await shot(b, "21-barometer-falling");
    await b.js(`window.__pipeline.seek(${low.t})`);
    await sleep(1200);
    const rise = await snap(b);
    check("BAROMETER falls before a louder passage and rises as it clears (from the forecast)", fall.tendency > 0.12 && fall.readout.tendency === "falling" && rise.tendency < -0.12 && rise.readout.tendency === "rising", `t=${f2(best.t)}s tendency ${f2(fall.tendency)} (${fall.readout.tendency}); t=${f2(low.t)}s ${f2(rise.tendency)} (${rise.readout.tendency})`);
    // Keyboard
    await b.js("window.__pipeline.pause(); window.__pipeline.seek(30)");
    await sleep(300);
    await b.js("document.body.focus()");
    await b.key("ArrowRight");
    await sleep(250);
    const k1 = await b.js("window.__pipeline.frame.time");
    await b.key("ArrowLeft");
    await sleep(250);
    const k2 = await b.js("window.__pipeline.frame.time");
    check("keyboard: arrow keys seek by 5 s", Math.abs(k1 - 35) < 0.6 && Math.abs(k2 - 30) < 0.6, `${f2(k1)}, ${f2(k2)}`);
    await b.key(" ", "Space", " ");
    await sleep(400);
    const playing = await b.js("window.__pipeline.getState().isPlaying");
    await b.key(" ", "Space", " ");
    await sleep(400);
    check("keyboard: space toggles play and pause", playing === true && (await b.js("window.__pipeline.getState().isPlaying")) === false);
    // Range input keyboard (screen reader / keyboard seek control)
    await b.js("document.querySelector('[data-forecast] input').focus()");
    await b.key("ArrowRight");
    await sleep(300);
    check("the strip's range input is keyboard-operable and seeks", (await b.js("window.__pipeline.frame.time")) > 30.0 && (await b.js("document.activeElement === document.querySelector('[data-forecast] input')")));
    await shot(b, "22-focus-strip");
    check("no exceptions in the offline checks", b.events.filter((e) => e.kind === "exception").length === 0, JSON.stringify(b.events.slice(0, 3)));
  }

  // =================================================================================================
  if (run("pointer")) {
    console.log("\n== 5. Pointer and touch ==");
    await b.viewport(1280, 820);
    await open(b);
    await b.click("[data-source=demo]");
    await sleep(1500);
    const toPx = async (u) => {
      const r = await b.rect("[data-squall] canvas[role=img]");
      const m = Math.min(r.w, r.h);
      return { x: r.x + u.x * m, y: r.y + u.y * m };
    };
    const emptyPoint = async () => {
      const s = await snap(b);
      const r = await b.rect("[data-squall] canvas[role=img]");
      const m = Math.min(r.w, r.h);
      // The middle band of the map, away from every eye, the HUD and the transport.
      for (let k = 0; k < 40; k++) {
        const x = r.x + r.w * (0.42 + 0.3 * ((k * 0.618) % 1));
        const y = r.y + r.h * (0.3 + 0.3 * ((k * 0.377) % 1));
        if (s.storms.every((st) => Math.hypot(r.x + st.x * m - x, r.y + st.y * m - y) > 90)) return { x, y };
      }
      return { x: r.x + r.w * 0.5, y: r.y + r.h * 0.45 };
    };
    const g0 = (await snap(b)).gusts;
    const p = await emptyPoint();
    const gusts = [];
    await b.mouse("mouseMoved", p.x, p.y);
    await b.mouse("mousePressed", p.x, p.y, 1);
    for (let i = 1; i <= 14; i++) {
      await b.mouse("mouseMoved", p.x + i * 14, p.y + i * 4, 1);
      await sleep(18);
      if (i === 8) gusts.push((await snap(b)).gusts);
    }
    await shot(b, "30-mouse-gust");
    await b.mouse("mouseReleased", p.x + 200, p.y + 56, 0);
    await sleep(1400);
    check("MOUSE drag on empty map blows gusts that then decay", g0 === 0 && gusts[0] > 2 && (await snap(b)).gusts === 0, `idle ${g0}, mid-drag ${gusts[0]}, after ${(await snap(b)).gusts}`);

    // Move a storm.
    let s = await snap(b);
    const id = s.storms[0].id;
    let from = await toPx(s.storms[0]);
    const to = { x: from.x + 160, y: from.y + 90 };
    await b.mouse("mouseMoved", from.x, from.y);
    await sleep(150);
    check("hovering an L shows the grab cursor", (await b.js("document.querySelector('[data-squall] canvas[role=img]').style.cursor")) === "grab");
    await b.mouse("mousePressed", from.x, from.y, 1);
    for (let i = 1; i <= 12; i++) {
      await b.mouse("mouseMoved", from.x + ((to.x - from.x) * i) / 12, from.y + ((to.y - from.y) * i) / 12, 1);
      await sleep(18);
    }
    s = await snap(b);
    const held = await toPx(s.storms.find((st) => st.id === id));
    await b.mouse("mouseReleased", to.x, to.y, 0);
    check("MOUSE drag on an L moves that storm under the pointer", Math.hypot(held.x - to.x, held.y - to.y) < 30, `storm ${Math.round(held.x)},${Math.round(held.y)} vs pointer ${Math.round(to.x)},${Math.round(to.y)}`);

    // Double click: seed then dissipate.
    const dbl = async (pt) => {
      for (let i = 0; i < 2; i++) {
        await b.mouse("mouseMoved", pt.x, pt.y);
        await b.mouse("mousePressed", pt.x, pt.y, 1);
        await b.mouse("mouseReleased", pt.x, pt.y, 0);
        await sleep(60);
      }
      await sleep(150);
    };
    const n0 = (await snap(b)).storms.length;
    const sp = await emptyPoint();
    await dbl(sp);
    s = await snap(b);
    check("double-click on empty map seeds a storm there", s.storms.length === n0 + 1, `${n0} -> ${s.storms.length}`);
    await shot(b, "31-seeded");
    // Storms drift east and the screenshot above is slow: read the storm's position afresh, just before clicking it.
    const target = (await snap(b)).storms.find((st) => !s.storms.slice(0, n0).some((o) => o.id === st.id)) ?? (await snap(b)).storms.at(-1);
    await dbl(await toPx(target));
    check("double-click on an L dissipates it", (await snap(b)).storms.length === n0, `${(await snap(b)).storms.length} storms`);
    for (let i = 0; i < 6; i++) await b.js("window.__api.current.seedStorm()");
    check("at most five storms", (await snap(b)).storms.length === 5);
    for (let i = 0; i < 8; i++) await b.js("window.__api.current.removeStorm()");
    check("at least one storm is kept", (await snap(b)).storms.length === 1);
    await b.js("window.__api.current.seedStorm()");

    // Touch
    await b.viewport(820, 700, true, 1);
    await sleep(700);
    s = await snap(b);
    const tp = await emptyPoint();
    await b.touch("touchStart", [tp]);
    for (let i = 1; i <= 10; i++) {
      await b.touch("touchMove", [{ x: tp.x + i * 12, y: tp.y + i * 3 }]);
      await sleep(18);
    }
    const tg = (await snap(b)).gusts;
    await b.touch("touchEnd", []);
    await sleep(1400);
    check("TOUCH drag blows gusts, the page does not scroll", tg > 2 && (await b.js("scrollY")) === 0, `gusts mid-drag ${tg}`);
    const ts = await snap(b);
    const tn0 = ts.storms.length;
    const tp2 = await emptyPoint();
    // Two touchStart/touchEnd pairs through CDP take ~0.6 s each under software rendering, which is not a double tap.
    // The tap-gesture synthesizer sends both taps natively and quickly.
    await b.send("Input.synthesizeTapGesture", { x: tp2.x, y: tp2.y, tapCount: 2, gestureSourceType: "touch" });
    await sleep(200);
    check("TOUCH double-tap seeds a storm", (await snap(b)).storms.length === Math.min(5, tn0 + 1), `${tn0} -> ${(await snap(b)).storms.length}`);
    const eye = (await snap(b)).storms[0];
    const eyePx = await toPx(eye);
    await b.touch("touchStart", [eyePx]);
    const dest = { x: eyePx.x - 120, y: eyePx.y + 60 };
    for (let i = 1; i <= 10; i++) {
      await b.touch("touchMove", [{ x: eyePx.x + ((dest.x - eyePx.x) * i) / 10, y: eyePx.y + ((dest.y - eyePx.y) * i) / 10 }]);
      await sleep(18);
    }
    const moved = (await snap(b)).storms.find((st) => st.id === eye.id);
    const movedPx = moved ? await toPx(moved) : null;
    await b.touch("touchEnd", []);
    check("TOUCH drag on an L moves the storm", !!movedPx && Math.hypot(movedPx.x - dest.x, movedPx.y - dest.y) < 40, movedPx ? `storm ${Math.round(movedPx.x)},${Math.round(movedPx.y)} vs finger ${Math.round(dest.x)},${Math.round(dest.y)}` : "storm gone");
    await shot(b, "32-touch");
    // The add/remove buttons are the keyboard route to the same actions.
    await b.viewport(1280, 820);
    await sleep(500);
    await b.click("[aria-controls=squall-rail]");
    await sleep(200);
    const n1 = (await snap(b)).storms.length;
    await b.click("[data-add-storm]");
    await sleep(150);
    const n2 = (await snap(b)).storms.length;
    await b.click("[data-remove-storm]");
    await sleep(150);
    check("Add and Remove storm buttons work (keyboard route)", n2 === Math.min(5, n1 + 1) && (await snap(b)).storms.length === n2 - 1 || n1 === 5, `${n1} -> ${n2} -> ${(await snap(b)).storms.length}`);
    await shot(b, "33-rail-open");
    check("no exceptions in the pointer checks", b.events.filter((e) => e.kind === "exception").length === 0, JSON.stringify(b.events.slice(0, 3)));
  }

  // =================================================================================================
  if (run("cleanup")) {
    console.log("\n== 6. Cleanup when switching between Squall and Constellation ==");
    await b.viewport(1280, 820);
    await b.goto(SITE + "?view=switch", ready);
    await sleep(500);
    const probe = () =>
      b.js(`(() => { window.__recount(); const p = window.__squallPipeline; return JSON.stringify({ leaks: window.__leaks, frameCbs: p.frameCbs.size, loop: p.handle !== null, source: p.getState().source?.id ?? null, playing: p.getState().isPlaying, stateCbs: p.stateCbs.size }); })()`).then(JSON.parse);
    const base = await probe();
    console.log("      at load:", JSON.stringify(base));
    await b.setFile("[data-empty] [data-file-input]", WAV);
    await waitFor(b, "window.__squallPipeline.getState().source !== null");
    await b.click("[data-play]");
    await waitFor(b, "window.__squallPipeline.getState().isPlaying");
    await sleep(800);
    const live = await probe();
    console.log("      squall playing a file:", JSON.stringify(live));
    check("while playing: one frame loop, an AudioContext, an object URL, window keydown listener", live.loop && live.leaks.contextsOpen >= 1 && live.leaks.urlsLive === 1 && (live.leaks.listeners["window:keydown"] ?? 0) === 1);
    const frameCbsPlaying = live.frameCbs;

    for (let cycle = 1; cycle <= 3; cycle++) {
      await b.click("[data-view=constellation]");
      await waitFor(b, "!!document.querySelector('#instrument-title')", 4000);
      await sleep(600);
      const away = await probe();
      if (cycle === 1) {
        await shot(b, "40-switched-to-constellation");
        console.log("      on constellation:", JSON.stringify(away));
        check("Squall's loop is stopped, its frame callbacks are gone, its source is cleared", !away.loop && away.frameCbs === 1 /* the harness's own tap */ && away.source === null && !away.playing, JSON.stringify({ loop: away.loop, frameCbs: away.frameCbs, source: away.source }));
        check("audio resources released: no open AudioContext, no live object URL, no ResizeObserver", away.leaks.contextsOpen === 0 && away.leaks.urlsLive === 0 && away.leaks.observers === 0, JSON.stringify({ ctx: away.leaks.contextsOpen, urls: away.leaks.urlsLive, ro: away.leaks.observers }));
        const ls = Object.keys(away.leaks.listeners);
        check("Squall's own listeners are removed (window keydown, document fullscreenchange, every audio-element listener)", !ls.includes("window:keydown") && !ls.includes("document:fullscreenchange") && !ls.some((k) => k.startsWith("audio:")), JSON.stringify(away.leaks.listeners));
      }
      await b.click("[data-view=squall]");
      await waitFor(b, "!!document.querySelector('[data-squall]')", 4000);
      await sleep(600);
      await b.click("[data-source=demo]");
      await sleep(800);
      const back = await probe();
      if (cycle === 1) {
        check("Squall remounts on the same pipeline and draws again", back.loop && (await snap(b)).frames > 5 && back.source !== null, JSON.stringify({ loop: back.loop, source: back.source }));
      }
      if (cycle === 3) {
        check("after three round trips nothing has accumulated (frame callbacks, listeners, observers, rAF)", back.frameCbs <= frameCbsPlaying && back.leaks.observers <= 2 && (back.leaks.listeners["window:keydown"] ?? 0) === 1 && (back.leaks.listeners["document:fullscreenchange"] ?? 0) === 1 && back.leaks.rafPending <= live.leaks.rafPending + 1, JSON.stringify({ frameCbs: back.frameCbs, ro: back.leaks.observers, keydown: back.leaks.listeners["window:keydown"], raf: back.leaks.rafPending }));
      }
    }
    await shot(b, "41-back-on-squall");

    // Microphone: the stream must be stopped and the context closed when Squall goes away.
    await b.click("[data-view=squall]");
    await b.js("window.__squallPipeline.setSource(null)");
    await b.js("document.querySelector('[data-source=mic]')?.click()");
    check("microphone source starts (fake device)", await waitFor(b, "window.__squallPipeline.getState().isPlaying && window.__leaks.tracksLive >= 1", 5000), JSON.stringify((await probe()).leaks));
    await sleep(800);
    const micMeters = (await b.js("window.__squallPipeline.frame.rmsEnergy")) >= 0;
    await b.click("[data-view=constellation]");
    await sleep(700);
    const gone = await probe();
    check("leaving Squall stops the microphone tracks and closes its AudioContext", gone.leaks.tracksLive === 0 && gone.leaks.contextsOpen === 0 && micMeters, JSON.stringify({ tracks: gone.leaks.tracksLive, ctx: gone.leaks.contextsOpen }));
    check("no exceptions while switching", b.events.filter((e) => e.kind === "exception").length === 0, JSON.stringify(b.events.slice(0, 3)));
  }

  // =================================================================================================
  if (run("states")) {
    console.log("\n== 7. Loading, silence, errors, unsupported capabilities ==");
    await b.viewport(1280, 820);
    // Loading, on a slow network.
    await b.send("Network.enable");
    await b.goto(SITE, "!!document.querySelector('[data-source=demo]')");
    await waitFor(b, "!!document.querySelector(\"[data-source='song:seyi']\")", 8000);
    await b.send("Network.emulateNetworkConditions", { offline: false, latency: 1200, downloadThroughput: 60000, uploadThroughput: 60000 });
    await b.js("document.querySelector(\"[data-source='song:seyi']\").click()");
    await sleep(400);
    const loading = await b.js("({ text: document.querySelector(\"[data-source='song:seyi']\")?.textContent, others: document.querySelector('[data-source=demo]')?.disabled || document.querySelector(\"[data-source='song:detty']\")?.disabled })");
    await shot(b, "50-loading");
    check("LOADING: the chosen track shows 'Loading…' and other tracks are disabled meanwhile", loading.text === "Loading…" && loading.others === true, JSON.stringify(loading));
    await waitFor(b, "window.__pipeline.getState().source?.kind === 'offline'", 40000);
    const fcs = await b.js("document.querySelector('[data-forecast]').dataset.forecast");
    console.log("      forecast status right after the track loaded on a slow link:", fcs);
    await b.send("Network.emulateNetworkConditions", { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });

    // Silence: a live source that is playing nothing.
    await open(b);
    await b.click("[data-source=demo]");
    await sleep(1200);
    await b.js("window.__pipeline.pause()");
    await sleep(900);
    const paused = await snap(b);
    check("PAUSED: the map goes to the doldrums, Force 0 'Calm'", paused.weather.calm && paused.readout.force === 0 && (await b.js("document.querySelector('[data-force-name]').textContent")) === "Calm" && (await b.js("document.querySelector('[data-chip]').dataset.chip")) === "paused");
    await shot(b, "51-paused-calm");

    // Errors: a broken audio file, a non-audio file.
    await open(b);
    await b.setFile("[data-empty] [data-file-input]", JUNK);
    await b.click("[data-play]");
    const bad = await waitFor(b, "!!document.querySelector('[data-problem]')", 5000);
    const badText = bad ? await b.js("document.querySelector('[data-problem]').textContent") : "";
    await shot(b, "52-error-broken-file");
    check("ERROR: an undecodable file shows a clear alert, the map stays calm", bad && /could not be loaded|decoded|could not start/i.test(badText) && (await snap(b)).weather.calm, badText);
    check("ERROR: forecast strip says unavailable for the broken file", (await b.js("document.querySelector('[data-forecast]').dataset.forecast")) === "unavailable");
    await open(b);
    await b.setFile("[data-empty] [data-file-input]", TEXT);
    check("ERROR: a non-audio file is rejected with a message", await waitFor(b, "/not an audio file/.test(document.querySelector('[data-problem]')?.textContent ?? '')", 3000));
    // Drag and drop a real file onto the map.
    await open(b);
    const dropPt = { x: 640, y: 380 };
    const data = { items: [], files: [WAV], dragOperationsMask: 1 };
    let dropOk = true;
    try {
      for (const type of ["dragEnter", "dragOver"]) await b.send("Input.dispatchDragEvent", { type, x: dropPt.x, y: dropPt.y, data });
      const overlay = await b.js("!!document.querySelector('[data-dropping]')");
      await shot(b, "56-drop-overlay");
      await b.send("Input.dispatchDragEvent", { type: "drop", x: dropPt.x, y: dropPt.y, data });
      const got = await waitFor(b, "window.__pipeline.getState().source?.id?.startsWith('file:signal.wav')", 4000);
      check("DROP: dragging a file over the map shows the overlay, dropping loads it", overlay && got, `overlay ${overlay}, loaded ${got}`);
    } catch (e) {
      dropOk = false;
      check("DROP: dragging a file onto the map loads it", false, String(e.message).slice(0, 160));
    }
    void dropOk;
    // Denied microphone.
    await open(b);
    await b.send("Browser.setPermission", { permission: { name: "microphone" }, setting: "denied" }).catch(() => {});
    await b.js("navigator.mediaDevices.getUserMedia = () => Promise.reject(new DOMException('denied', 'NotAllowedError'))");
    await b.click("[data-source=mic]");
    const micErr = await waitFor(b, "!!document.querySelector('[data-problem]')", 4000);
    check("ERROR: a denied microphone shows a message", micErr && /microphone/i.test(await b.js("document.querySelector('[data-problem]').textContent")), micErr ? await b.js("document.querySelector('[data-problem]').textContent") : "no alert");
    await shot(b, "53-error-mic");

    // Unsupported: no Web Audio, no microphone API, no fullscreen.
    const u = await launch({ port: 9445, width: 1100, height: 760 });
    try {
      await u.send("Page.addScriptToEvaluateOnNewDocument", {
        source: `delete window.AudioContext; delete window.webkitAudioContext; delete window.OfflineAudioContext; delete window.webkitOfflineAudioContext;
                 Object.defineProperty(navigator, 'mediaDevices', { value: undefined }); Element.prototype.requestFullscreen = undefined;`,
      });
      await u.goto(SITE, "!!document.querySelector('[data-source=demo]')");
      await sleep(900);
      const un = await u.js(`({ note: document.querySelector('[data-unsupported]')?.textContent, mic: document.querySelector('[data-source=mic]')?.disabled, file: document.querySelector('[data-empty] [data-file-input]')?.disabled, full: !!document.querySelector('[data-fullscreen]'), demo: !document.querySelector('[data-source=demo]').disabled })`);
      await shot(u, "54-unsupported");
      check("UNSUPPORTED Web Audio: a note explains it, file and mic are disabled, demo still offered", !!un.note && /Web Audio/.test(un.note) && un.mic && un.file && un.demo, JSON.stringify(un));
      await u.click("[data-source=demo]");
      await sleep(1500);
      const d = await u.js("JSON.stringify({ frames: window.__snapshot.current?.frames, force: window.__snapshot.current?.readout.force })").then(JSON.parse);
      check("UNSUPPORTED Web Audio: the demo still plays and drives the map", d.frames > 30 && d.force > 0, JSON.stringify(d));
      check("UNSUPPORTED fullscreen: no fullscreen button", un.full === false);
      await u.goto(SITE, "!!document.querySelector(\"[data-source='song:seyi']\")");
      await u.click("[data-source='song:seyi']");
      check("UNSUPPORTED Web Audio: a pre-computed track still loads and plays", await waitFor(u, "window.__pipeline.getState().source?.kind === 'offline'", 6000));
      await waitFor(u, "document.querySelector('[data-forecast]')?.dataset.forecast === 'ready'", 4000);
      check("UNSUPPORTED Web Audio: its forecast still works (built from the features bundle, no decode)", (await u.js("document.querySelector('[data-forecast]').dataset.forecast")) === "ready");
      check("no exceptions without Web Audio", u.events.filter((e) => e.kind === "exception").length === 0, JSON.stringify(u.events.slice(0, 3)));
    } finally {
      await u.close();
    }

    // No Canvas 2D context.
    const n = await launch({ port: 9446, width: 1100, height: 760 });
    try {
      await n.send("Page.addScriptToEvaluateOnNewDocument", { source: `HTMLCanvasElement.prototype.getContext = function () { return null; };` });
      await n.goto(SITE, "document.querySelector('[role=alert]') !== null || document.querySelector('[data-squall]') !== null");
      await sleep(800);
      const t = await n.js("document.querySelector('[role=alert]')?.textContent ?? null");
      await shot(n, "55-no-canvas");
      check("UNSUPPORTED Canvas 2D: a text fallback is shown instead of a blank page", !!t && /Canvas 2D/.test(t), String(t));
    } finally {
      await n.close();
    }
  }

  // =================================================================================================
  if (run("a11y")) {
    console.log("\n== 8. Reduced motion and accessibility ==");
    await b.viewport(1280, 820);
    await b.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
    await open(b);
    await b.click("[data-source=demo]");
    await sleep(2500);
    const rm = await snap(b);
    await b.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });
    await sleep(600);
    const nm = await snap(b);
    check("REDUCED MOTION: particle speed is scaled to 0.35 and the map still responds", rm.weather.speedScale <= 0.35 + 1e-9 && nm.weather.speedScale >= 0.99 && rm.readout.force > 0, `speedScale ${rm.weather.speedScale} vs ${nm.weather.speedScale}`);
    await b.click("[aria-controls=squall-rail]");
    const unnamed = await b.js(`[...document.querySelectorAll('[data-squall] button, [data-squall] input, [data-squall] [role=slider]')].filter((e) => e.offsetParent || e.classList.contains('sr-only') || e.type === 'range').map((e) => ({ el: e.tagName + (e.type ? '[' + e.type + ']' : ''), name: (e.getAttribute('aria-label') || e.labels?.[0]?.textContent || e.textContent || '').trim(), cls: e.className.slice(0, 40) })).filter((x) => !x.name)`);
    const names = unnamed.length;
    if (names) console.log("      unnamed:", JSON.stringify(unnamed));
    check("every visible control has an accessible name", names === 0, `${names} unnamed`);
    check("the map has an aria-label that explains the controls", /Drag to blow wind/.test(await b.js("document.querySelector('[data-squall] canvas[role=img]').getAttribute('aria-label')")));
  }
} finally {
  await b.close().catch(() => {});
  const failed = results.filter((r) => !r.ok);
  writeFileSync(join(SHOTS, "squall-results.json"), JSON.stringify(results, null, 1));
  console.log(`\n${results.length - failed.length}/${results.length} checks passed${failed.length ? "; FAILED: " + failed.map((f) => f.name).join(" | ") : ""}`);
  process.exitCode = failed.length ? 1 : 0;
}
