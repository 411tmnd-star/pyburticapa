import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { dbToUnit, follow } from "../src/lib/audio/features";
import { BassShaper, type BassOptions } from "../src/lib/audio/bass";

/**
 * Offline check of how well a visual pull lines up with the beat grid, using the bass band that the
 * analyzer measured for each real song (dB re the loudest frame, 43 frames/s). Only the grid is used,
 * not the audio, so this is a fair test of the shaping maths.
 */

const here = dirname(fileURLToPath(import.meta.url));
const series = JSON.parse(readFileSync(join(here, "..", "bassdata", "bass_series.json"), "utf8"));

interface Metrics {
  hitRate: number; // share of beats whose pull peak falls in [beat - 60 ms, beat + 120 ms]
  medianOffsetMs: number; // median (peak time - beat time)
  pulseContrast: number; // mean pull at beat + 50 ms minus mean pull at beat + 250 ms (higher = more pulse-like)
  restBetween: number; // mean pull at beat + 250 ms (lower = returns to rest between beats)
}

type Run = (bassDb: number[], t: number[]) => number[];

function measure(name: string, pull: number[], t: number[], beats: number[]): Metrics {
  const at = (x: number) => {
    const i = Math.min(t.length - 1, Math.max(0, Math.round(x * 43.0664)));
    return pull[i];
  };
  let hits = 0;
  const offsets: number[] = [];
  let early = 0;
  let late = 0;
  for (const b of beats) {
    const lo = Math.max(0, Math.round((b - 0.06) * 43.0664));
    const hi = Math.min(t.length - 1, Math.round((b + 0.12) * 43.0664));
    let best = lo;
    for (let i = lo; i <= hi; i++) if (pull[i] > pull[best]) best = i;
    const peakT = t[best];
    offsets.push((peakT - b) * 1000);
    if (peakT >= b - 0.06 && peakT <= b + 0.12) hits++;
    early += at(b + 0.05);
    late += at(b + 0.25);
    void early;
    void late;
  }
  const sorted = [...offsets].sort((a, b) => a - b);
  const med = sorted[Math.floor(sorted.length / 2)];
  const n = beats.length;
  const m: Metrics = {
    hitRate: hits / n,
    medianOffsetMs: med,
    pulseContrast: 0,
    restBetween: 0,
  };
  let c = 0;
  let r = 0;
  for (const b of beats) {
    c += at(b + 0.05);
    r += at(b + 0.25);
  }
  m.pulseContrast = (c - r) / n;
  m.restBetween = r / n;
  void name;
  return m;
}

/** The current engine behaviour: a fixed dB window and a plain attack/release follower. */
const current: Run = (db, t) => {
  const out: number[] = [];
  let prev = 0;
  for (let i = 0; i < db.length; i++) {
    const dt = i === 0 ? 1 / 43.0664 : t[i] - t[i - 1];
    const target = dbToUnit(db[i], -85, -25);
    prev = follow(prev, target, dt, 0.02, 0.18);
    out.push(prev * 0.95); // Pulse profile gravity
  }
  return out;
};

const shaped = (opts?: Partial<ConstructorParameters<typeof BassShaper>[0]>): Run => (db, t) => {
  const s = new BassShaper(opts);
  const out: number[] = [];
  for (let i = 0; i < db.length; i++) {
    const dt = i === 0 ? 1 / 43.0664 : t[i] - t[i - 1];
    out.push(s.push(db[i], t[i], dt).pull);
  }
  return out;
};

export function run(runner: Run, label: string) {
  const rows = Object.keys(series).map((song) => {
    const d = series[song];
    const pull = runner(d.bassDb, d.t);
    return { song, ...measure(label, pull, d.t, d.beats) };
  });
  return { label, rows };
}

if (process.argv.includes("--print")) {
  const grid: Array<[string, Partial<BassOptions>]> = [
    ["current defaults (max, body 0.2)", {}],
    ["sum combine", { combine: "sum" }],
    ["max, body 0.4", { sustainWeight: 0.4 }],
    ["max, body 0.5", { sustainWeight: 0.5 }],
    ["max, body 0.5, floorAttack 1", { sustainWeight: 0.5, floorAttack: 1 }],
  ];
  const variants = [run(current, "current engine"), ...grid.map(([label, o]) => run(shaped(o), label))];
  for (const v of variants) {
    console.log(`\n${v.label}`);
    for (const r of v.rows) {
      console.log(
        `  ${r.song.padEnd(6)} hit ${(r.hitRate * 100).toFixed(0).padStart(3)}%  offset ${r.medianOffsetMs.toFixed(0).padStart(4)} ms  contrast ${r.pulseContrast.toFixed(3)}  rest ${r.restBetween.toFixed(3)}`,
      );
    }
  }
}

