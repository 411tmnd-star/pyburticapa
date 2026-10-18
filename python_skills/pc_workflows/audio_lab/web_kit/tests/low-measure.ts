import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { BassShaper, type BassOptions } from "../src/lib/audio/bass";

/**
 * Compares ways of reading the low end against each song's beat grid. The series in bassdata/low_series.json
 * are built with trailing FFT windows, so they carry the same delay as a live AnalyserNode read.
 */

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(here, "..", "bassdata", "low_series.json"), "utf8"));

interface Row {
  hit: number;
  offsetMs: number;
  contrast: number;
  rest: number;
}

function measure(pull: number[], beats: number[], fps: number): Row {
  const at = (x: number) => pull[Math.min(pull.length - 1, Math.max(0, Math.round(x * fps)))];
  let hits = 0;
  let c = 0;
  let r = 0;
  const offs: number[] = [];
  let n = 0;
  for (const b of beats) {
    const lo = Math.round((b - 0.06) * fps);
    const hi = Math.round((b + 0.12) * fps);
    if (lo < 0 || hi >= pull.length) continue;
    let best = lo;
    for (let i = lo; i <= hi; i++) if (pull[i] > pull[best]) best = i;
    offs.push((best / fps - b) * 1000);
    // A hit: the peak is interior to the window (not just its edge) and rises clearly above the pull 200-300 ms later.
    let later = Infinity;
    for (let i = Math.round((b + 0.2) * fps); i <= Math.round((b + 0.3) * fps) && i < pull.length; i++) later = Math.min(later, pull[i]);
    if (best > lo && best < hi && pull[best] - later > 0.1) hits++;
    c += at(b + 0.05);
    r += at(b + 0.25);
    n++;
  }
  offs.sort((a, b) => a - b);
  return { hit: hits / Math.max(1, n), offsetMs: offs[Math.floor(offs.length / 2)] ?? 0, contrast: (c - r) / Math.max(1, n), rest: r / Math.max(1, n) };
}

const shape = (db: number[], fps: number, o: Partial<BassOptions> = {}) => {
  const s = new BassShaper(o);
  return db.map((x, i) => s.push(x, i / fps, 1 / fps));
};

type Variant = (d: any) => number[];
const pullOf = (key: string, o: Partial<BassOptions> = {}): Variant => (d) => shape(d[key], d.fps, o).map((s) => s.pull);

const variants: Array<[string, Variant]> = [
  ["before: one band 40-150 Hz, 2048 FFT", pullOf("wide2048")],
  ["punch 60-150 Hz, 2048 FFT", pullOf("punch2048")],
  ["punch 60-150 Hz, 4096 FFT", pullOf("punch4096")],
  ["punch 60-150 Hz, 8192 FFT", pullOf("punch8192")],
  ["sub 20-60 Hz alone, 8192 FFT", pullOf("sub8192")],
  [
    "punch 2048 + sub 8192 (max, sub x0.6)",
    (d) => {
      const p = shape(d.punch2048, d.fps).map((s) => s.pull);
      const s = shape(d.sub8192, d.fps).map((s) => s.pull);
      return p.map((x, i) => Math.max(x, 0.6 * s[i]));
    },
  ],
  [
    "punch 4096 + sub 8192 (max, sub x0.6)",
    (d) => {
      const p = shape(d.punch4096, d.fps).map((s) => s.pull);
      const s = shape(d.sub8192, d.fps).map((s) => s.pull);
      return p.map((x, i) => Math.max(x, 0.6 * s[i]));
    },
  ],
];

/** Bass events in the raw punch band: a rise of at least 6 dB over the previous 4 frames, at a local maximum of the rise. */
function events(db: number[]): number[] {
  const out: number[] = [];
  const rise = db.map((x, i) => (i < 4 ? 0 : x - Math.min(db[i - 1], db[i - 2], db[i - 3], db[i - 4])));
  for (let i = 4; i < db.length - 3; i++) {
    let isMax = rise[i] >= 6;
    for (let j = -3; j <= 3 && isMax; j++) if (rise[i + j] > rise[i]) isMax = false;
    if (isMax && (out.length === 0 || i - out[out.length - 1] >= 6)) out.push(i);
  }
  return out;
}

/** Spikes in a pull curve: a rise of at least 0.25 over the previous 5 frames. */
function spikes(pull: number[]): number[] {
  const out: number[] = [];
  for (let i = 5; i < pull.length; i++) {
    const rise = pull[i] - Math.min(pull[i - 1], pull[i - 2], pull[i - 3], pull[i - 4], pull[i - 5]);
    if (rise >= 0.25 && (out.length === 0 || i - out[out.length - 1] >= 6)) out.push(i);
  }
  return out;
}

if (process.argv.includes("--events")) {
  console.log("Event capture. Events = raw 60-150 Hz rises of 6 dB or more (the music's bass-note onsets).");
  console.log("recall = events the pull answers (spike within -1..+4 frames); precision = spikes that match an event.");
  for (const [label, run] of variants) {
    console.log(`
${label}`);
    for (const song of Object.keys(data)) {
      const d = data[song];
      const ev = events(d.punch4096);
      const sp = spikes(run(d));
      const recall = ev.filter((e) => sp.some((x) => x >= e - 1 && x <= e + 4)).length / Math.max(1, ev.length);
      const precision = sp.filter((x) => ev.some((e) => x >= e - 4 && x <= e + 1)).length / Math.max(1, sp.length);
      console.log(`  ${song.padEnd(6)} events ${String(ev.length).padStart(4)}  recall ${(recall * 100).toFixed(0).padStart(3)}%  precision ${(precision * 100).toFixed(0).padStart(3)}%  spikes ${sp.length}`);
    }
  }
}

if (process.argv.includes("--sweep")) {
  const grid: Array<Partial<BassOptions>> = [];
  for (const kickSpan of [0.3, 0.2, 0.15, 0.1]) for (const sustainRelease of [0.25, 0.5, 1.0]) grid.push({ kickSpan, sustainRelease });
  for (const o of grid) {
    const cells = Object.keys(data).map((song) => {
      const d = data[song];
      const ev = events(d.punch4096);
      const sp = spikes(shape(d.punch4096, d.fps, o).map((x) => x.pull));
      const rec = ev.filter((e) => sp.some((x) => x >= e - 1 && x <= e + 4)).length / Math.max(1, ev.length);
      const pre = sp.filter((x) => ev.some((e) => x >= e - 4 && x <= e + 1)).length / Math.max(1, sp.length);
      return `${song} r${(rec * 100).toFixed(0)}/p${(pre * 100).toFixed(0)}`;
    });
    console.log(`kickSpan ${o.kickSpan} sustainRelease ${o.sustainRelease}: ${cells.join("  ")}`);
  }
}

if (process.argv.includes("--print")) {
  for (const [label, run] of variants) {
    console.log(`\n${label}`);
    for (const song of Object.keys(data)) {
      const d = data[song];
      const m = measure(run(d), d.beats, d.fps);
      console.log(
        `  ${song.padEnd(6)} hit ${(m.hit * 100).toFixed(0).padStart(3)}%  offset ${m.offsetMs.toFixed(0).padStart(4)} ms  contrast ${m.contrast.toFixed(3).padStart(6)}  rest ${m.rest.toFixed(3)}`,
      );
    }
  }
}
