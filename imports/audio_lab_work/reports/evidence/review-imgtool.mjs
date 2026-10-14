// Contact sheets and pixel analysis for the visual review. Uses headless Edge's 2D canvas (no dependencies).
// Panels are unmodified captured screenshots, cropped to the scene area and scaled down with the same factor within a sheet.
// The only processed images are the clearly labelled ZOOM crops (nearest-neighbour) and one labelled DIAGNOSTIC contrast stretch.
import { launchGpu, sleep } from "file:///C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/audio_lab/web_kit/preview/cdp-lib-gpu.mjs";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const EV = "C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/evidence/";
const D = JSON.parse(readFileSync(EV + "review-data.json", "utf8"));
const V = JSON.parse(readFileSync(EV + "review-data-views.json", "utf8"));
const R = D.runs;
const b = await launchGpu({ port: 9614, width: 800, height: 600 });
const loaded = new Set();
async function load(file) {
  if (loaded.has(file)) return;
  const b64 = readFileSync(EV + file).toString("base64");
  await b.js(`(async () => { window.IM = window.IM || {}; const im = new Image(); im.src = 'data:image/png;base64,${b64}'; await im.decode(); window.IM[${JSON.stringify(file)}] = im; return im.width + 'x' + im.height; })()`);
  loaded.add(file);
}
const fmt = (x, n = 2) => (Number.isFinite(x) ? x.toFixed(n) : "n/a");
const S = (name) => D.shots.find((s) => s.name === name) ?? V.shots.find((s) => s.name === name);

// Each panel: file, title, detail line. crop = [x, y, w, h] in source pixels (default: the scene area of a 1280x900 frame).
const sceneCrop = [0, 0, 1280, 590];
const burst = (i) => R.bass.burst[i];
const oburst = (i) => R.onset.burst[i];
const sheets = {
  "1-states": { title: "ACCRETION V0 — visual review sheet 1: resting, sustained, bass impulse, onset  (1280x900 viewport, DPR 1, canvas 1248x563, scene area shown)", sections: [
    ["A. RESTING STATE", [
      ["review-A1-rest-silent.png", "A1 rest, silent", "no source; pipeline idle frame; screenshot"],
      ["review-A2-rest-low-energy.png", "A2 rest, low energy", "scripted synthetic: rms .12 bass .10 mid .12; screenshot"],
      ["accretion-silent.png", "A3 EXISTING silent evidence", "earlier phase file, 1280x720 viewport; unmodified", [0, 0, 1280, 425]],
    ]],
    ["B. SUSTAINED ACTIVITY (scripted synthetic constant input, no hits, no beats; three separate stills ~0.5 s apart, not a sequence)", [
      ["review-B1-sustained-a.png", "B1 sustained, t0", `scripted: rms .55 bass .45 mid .60; ph ${fmt(S("B1-sustained-a")?.before.ph)}`],
      ["review-B2-sustained-b.png", "B2 sustained, ~+0.5 s", `ph ${fmt(S("B2-sustained-b")?.before.ph)} (disk phase, rad)`],
      ["review-B3-sustained-c.png", "B3 sustained, ~+1 s", `ph ${fmt(S("B3-sustained-c")?.before.ph)}`],
      ["review-B4-demo-synthetic-a.png", "B4 harness demo (synthetic 120 BPM)", "kick every beat; mixed features; label: SYNTHETIC, not music"],
      ["review-B5-demo-synthetic-b.png", "B5 demo, +1.3 s", "same session; different phase of the kick pattern"],
      ["accretion-demo.png", "B6 EXISTING demo evidence", "earlier phase file, 1280x720 viewport; unmodified", [0, 0, 1280, 425]],
    ]],
    ["C. BASS IMPULSE (ONE scripted event: hit(1) at page t=" + fmt(R.bass.tHit, 0) + " ms; the frames below are consecutive screenshots of that single event)", [
      ["review-C0-bass-pre.png", "C0 before", `jet ${fmt(R.bass.pre.before.jet)}; scripted rms .45 bass .30`],
      ...[0, 1, 2, 3, 4, 6, 8].map((i) => [`review-C${i + 1}-bass-burst.png`, `C${i + 1} +${fmt(burst(i).afterHitMs, 0)} ms`, `jet ${fmt(burst(i).before.jet)}  rim ${fmt(burst(i).before.rim)}  bassHit decays 150 ms`]),
      ["review-C10-bass-post-3s.png", "C10 about +3 s", `jet ${fmt(R.bass.post.before.jet, 3)}; no residual jets`],
    ]],
    ["D. ONSET / FLARE (ONE single beat(0.9) at page t=" + fmt(R.onset.tBeat, 0) + " ms, then a separate scripted train of 20 beat frames 60 ms apart)", [
      ["review-D0-onset-pre.png", "D0 before", `flare ${fmt(R.onset.pre ? 0 : 0)}; accepted ${R.onset.stateBefore.fa}`],
      ["review-D1-onset-burst.png", "D1 single beat +" + fmt(oburst(0).afterBeatMs, 0) + " ms", `flare ${fmt(oburst(0).before.flare)}`],
      ["review-D2-onset-burst.png", "D2 single beat +" + fmt(oburst(1).afterBeatMs, 0) + " ms", `flare ${fmt(oburst(1).before.flare)}`],
      ["review-D3-onset-burst.png", "D3 single beat +" + fmt(oburst(2).afterBeatMs, 0) + " ms", `flare ${fmt(oburst(2).before.flare)}`],
      ["review-D5-onset-train-mid.png", "D5 during 20-beat train", `flare ${fmt(R.onset.train[0].before.flare)}  accepted ${R.onset.train[0].before.fa} refused ${R.onset.train[0].before.fr}`],
      ["review-D6-onset-train-after.png", "D6 after train (~2 s)", `accepted ${R.onset.stateAfter.fa}, refused ${R.onset.stateAfter.fr} (cumulative)`],
    ]],
  ] },
  "2-motion-composition": { title: "ACCRETION V0 — visual review sheet 2: reduced motion vs normal, composition across viewports, depth views, lifecycle", sections: [
    ["E. NORMAL vs REDUCED MOTION (same viewport 1280x900, DPR 1, same scripted input, fresh page each; rotation phase differs by run)", [
      ["review-E-normal-1-sustained.png", "E1 NORMAL sustained", `motion ${fmt(R.normal.sus.before.mot)}  disk speed ${fmt(R.normal.sus.before.spd)}`],
      ["review-E-normal-2-hit.png", "E2 NORMAL +" + fmt(R.normal.hit.afterHitMs, 0) + " ms after hit(1)", `jet ${fmt(R.normal.hit.before.jet)}`],
      ["review-E-normal-3-beat.png", "E3 NORMAL +" + fmt(R.normal.bt.afterBeatMs, 0) + " ms after beat(.9)", `flare ${fmt(R.normal.bt.before.flare)}`],
      ["review-E-reduced-1-sustained.png", "E4 REDUCED sustained", `motion ${fmt(R.reduced.sus.before.mot)}  disk speed ${fmt(R.reduced.sus.before.spd)}`],
      ["review-E-reduced-2-hit.png", "E5 REDUCED +" + fmt(R.reduced.hit.afterHitMs, 0) + " ms after hit(1)", `jet ${fmt(R.reduced.hit.before.jet)} (suppressed)`],
      ["review-E-reduced-3-beat.png", "E6 REDUCED +" + fmt(R.reduced.bt.afterBeatMs, 0) + " ms after beat(.9)", `flare ${fmt(R.reduced.bt.before.flare)} (suppressed)`],
    ]],
    ["F. COMPOSITION ACROSS VIEWPORTS (scripted sustained input; full frames shown, each scaled to fit)", [
      ...R.composition.map((c) => [c.shot, `F ${c.vw}x${c.vh} DPR ${c.dpr}`, `canvas client ${c.dims.client.join("x")} buffer ${c.dims.buffer.join("x")}`, [0, 0, c.vw, c.vh], true]),
    ]],
    ["F2. DEPTH VIEWS (drag-to-orbit; recorded input; scripted hit-base input)", [
      ["review-F2a-view-elevated.png", "F2a elevated (drag +150 px)", "disk layering, inner gap, ring over disk"],
      ["review-F2b-view-elevated-hit.png", "F2b elevated, +0.1 s after hit(1)", "jets point toward camera"],
      ["review-F2c-view-low-edge-on.png", "F2c near edge-on (elev. -0.15)", "front of disk crosses the shadow"],
      ["review-F2d-view-azimuth-shifted.png", "F2d azimuth shifted", "horizontal drag 500 px"],
    ]],
    ["G. LIFECYCLE RECOVERY (existing evidence only; context loss was NOT re-triggered in this review)", [
      ["accretion-after-restore.png", "G1 EXISTING after context restore", "earlier phase file; silent state; unmodified", [0, 0, 1280, 425]],
      ["accretion-reduced-motion.png", "G2 EXISTING reduced motion (earlier)", "earlier phase file; unmodified", [0, 0, 1280, 425]],
    ]],
  ] },
};

const CELL_W = 620, LABEL_H = 52, GAP = 10, HEAD_H = 34, COLS = 3, TITLE_H = 44;
for (const [key, sheet] of Object.entries(sheets)) {
  const out = EV + `review-contact-sheet-${key}.png`;
  if (existsSync(out)) throw new Error("refusing to overwrite " + out);
  // layout
  const items = []; let y = TITLE_H;
  for (const [head, panels] of sheet.sections) {
    items.push({ kind: "head", text: head, y }); y += HEAD_H;
    let col = 0, rowH = 0, rowY = y;
    for (const p of panels) {
      await load(p[0]);
      const [file, title, detail, crop0, fit] = p;
      const crop = crop0 ?? sceneCrop;
      const maxH = fit ? 460 : Math.round(CELL_W * (crop[3] / crop[2]));
      const sc = Math.min(CELL_W / crop[2], maxH / crop[3]);
      const w = Math.round(crop[2] * sc), h = Math.round(crop[3] * sc);
      items.push({ kind: "panel", file, title, detail, crop, x: GAP + col * (CELL_W + GAP), y: rowY, w, h, scale: sc });
      rowH = Math.max(rowH, h + LABEL_H + GAP);
      if (++col === COLS) { col = 0; rowY += rowH; rowH = 0; }
    }
    y = rowY + (col ? rowH : 0) + GAP;
  }
  const W = GAP + COLS * (CELL_W + GAP), H = y;
  await b.js(`(() => { const c = document.createElement('canvas'); c.width = ${W}; c.height = ${H}; window.SHEET = c; const g = c.getContext('2d'); g.fillStyle = '#0b0d12'; g.fillRect(0, 0, ${W}, ${H});
    g.fillStyle = '#e8ecf4'; g.font = 'bold 18px Segoe UI, Arial'; g.fillText(${JSON.stringify(sheet.title)}, 12, 28); return true; })()`);
  for (const it of items) {
    if (it.kind === "head") {
      await b.js(`(() => { const g = window.SHEET.getContext('2d'); g.fillStyle = '#ffd479'; g.font = 'bold 15px Segoe UI, Arial'; g.fillText(${JSON.stringify(it.text)}, 12, ${it.y + 22}); return true; })()`);
    } else {
      await b.js(`(() => { const g = window.SHEET.getContext('2d'); const im = window.IM[${JSON.stringify(it.file)}]; const [sx, sy, sw, sh] = ${JSON.stringify(it.crop)};
        g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'; g.drawImage(im, sx, sy, sw, sh, ${it.x}, ${it.y}, ${it.w}, ${it.h});
        g.strokeStyle = '#2a3140'; g.strokeRect(${it.x} + 0.5, ${it.y} + 0.5, ${it.w}, ${it.h});
        g.fillStyle = '#ffffff'; g.font = 'bold 14px Segoe UI, Arial'; g.fillText(${JSON.stringify(it.title)}, ${it.x}, ${it.y + it.h + 18});
        g.fillStyle = '#aab3c5'; g.font = '12px Segoe UI, Arial'; g.fillText(${JSON.stringify(it.detail)}, ${it.x}, ${it.y + it.h + 36});
        g.fillStyle = '#6f7a90'; g.font = '11px Segoe UI, Arial'; g.fillText(${JSON.stringify(it.file + "  (scale " + it.scale.toFixed(2) + ")")}, ${it.x}, ${it.y + it.h + 50}); return true; })()`);
    }
  }
  const url = await b.js("window.SHEET.toDataURL('image/png')");
  writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
  console.log("wrote", out, W + "x" + H);
}

// ---------- zoom crops (nearest-neighbour, 3x) and diagnostic ----------
async function zoomSheet(outName, title, tiles) {
  const out = EV + outName;
  if (existsSync(out)) throw new Error("refusing to overwrite " + out);
  for (const t of tiles) await load(t.file);
  const Z = 3;
  let x = 10, rowH = 0, y = 44; const place = [];
  for (const t of tiles) { const w = t.crop[2] * (t.z ?? Z), h = t.crop[3] * (t.z ?? Z); if (x + w > 1900) { x = 10; y += rowH + 60; rowH = 0; } place.push({ ...t, x, y, w, h }); x += w + 12; rowH = Math.max(rowH, h); }
  const H = y + rowH + 60;
  await b.js(`(() => { const c = document.createElement('canvas'); c.width = 1920; c.height = ${H}; window.SHEET = c; const g = c.getContext('2d'); g.fillStyle = '#0b0d12'; g.fillRect(0, 0, 1920, ${H}); g.fillStyle = '#e8ecf4'; g.font = 'bold 18px Segoe UI, Arial'; g.fillText(${JSON.stringify(title)}, 12, 28); return true; })()`);
  for (const t of place) {
    await b.js(`(() => { const g = window.SHEET.getContext('2d'); const im = window.IM[${JSON.stringify(t.file)}]; const [sx, sy, sw, sh] = ${JSON.stringify(t.crop)};
      g.imageSmoothingEnabled = false; g.drawImage(im, sx, sy, sw, sh, ${t.x}, ${t.y}, ${t.w}, ${t.h});
      ${t.gain ? `const id = g.getImageData(${t.x}, ${t.y}, ${t.w}, ${t.h}); for (let i = 0; i < id.data.length; i += 4) { id.data[i] = Math.min(255, id.data[i] * ${t.gain}); id.data[i + 1] = Math.min(255, id.data[i + 1] * ${t.gain}); id.data[i + 2] = Math.min(255, id.data[i + 2] * ${t.gain}); } g.putImageData(id, ${t.x}, ${t.y});` : ""}
      g.strokeStyle = '#2a3140'; g.strokeRect(${t.x} + 0.5, ${t.y} + 0.5, ${t.w}, ${t.h});
      g.fillStyle = '#fff'; g.font = 'bold 14px Segoe UI, Arial'; g.fillText(${JSON.stringify(t.label)}, ${t.x}, ${t.y + t.h + 18}); g.fillStyle = '#aab3c5'; g.font = '12px Segoe UI, Arial'; g.fillText(${JSON.stringify(t.sub)}, ${t.x}, ${t.y + t.h + 36}); return true; })()`);
  }
  const url = await b.js("window.SHEET.toDataURL('image/png')");
  writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
  console.log("wrote", out);
}
await zoomSheet("review-zoom-details.png", "ACCRETION V0 — zoom crops of captured frames (nearest-neighbour, source pixels; NOT additional renders). Row 3 is a labelled DIAGNOSTIC contrast stretch.", [
  { file: "review-B1-sustained-a.png", crop: [500, 190, 280, 200], label: "Z1 shadow, photon ring, inner disk (3x)", sub: "from B1 sustained; ring is a uniform thin line" },
  { file: "review-C1-bass-burst.png", crop: [560, 10, 160, 230], z: 3, label: "Z2 upper jet at +1 ms (3x)", sub: "from C1: dotted needle; base starts at the ring" },
  { file: "review-C10-bass-post-3s.png", crop: [560, 10, 160, 230], z: 3, label: "Z3 same region ~3 s after the hit (3x)", sub: "from C10: only the faint baseline glow remains" },
  { file: "review-F2a-view-elevated.png", crop: [440, 160, 400, 280], z: 2, label: "Z4 elevated view, disk layering (2x)", sub: "from F2a" },
  { file: "review-A1-rest-silent.png", crop: [150, 60, 980, 500], z: 1.9, gain: 12, label: "DIAGNOSTIC D1: A1 contrast x12, to expose background structure", sub: "analysis aid only: values multiplied by 12 and clipped; compare faint arcs with the unmodified frame" },
]);
await b.close();
