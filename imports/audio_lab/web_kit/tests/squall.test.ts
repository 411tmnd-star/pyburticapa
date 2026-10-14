import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { IDLE_FRAME, makeFrame, type AudioFeatureFrame } from "../src/lib/pipeline/contract";
import {
  GUST_LIFE_S,
  MAX_VORTICES,
  addGust,
  createField,
  jetAt,
  removeVortex,
  seedVortex,
  stepField,
  vortexAt,
  windAt,
  type Field,
} from "../src/lib/squall/field";
import { computeForecast, forecastFromReadings, tendencyAt } from "../src/lib/squall/forecast";
import { Particles, Rain, mulberry32 } from "../src/lib/squall/particles";
import { RAMP_LUT, makeBolt, markerColour } from "../src/lib/squall/render";
import {
  BEAUFORT,
  FLASH_MIN_GAP_S,
  KickEdge,
  REDUCED_SCALE,
  StrikeScheduler,
  beaufort,
  rainLabel,
  tendencyFromScene,
  tendencyLabel,
  toWeather,
} from "../src/lib/squall/weather";

const frame = (o: Partial<AudioFeatureFrame>): AudioFeatureFrame => makeFrame({ ...IDLE_FRAME, isPlaying: true, ...o });

/** A field with no jet, no drift and one storm, so a single term can be checked. */
function bareField(): Field {
  const f = createField(1.6, 1);
  f.vortices = [{ id: 1, x: 0.8, y: 0.5, r: 0.15, weight: 1 }];
  f.params = { jet: 0, vortex: 0, inflow: 0, prevailing: 0 };
  return f;
}

describe("squall wind field", () => {
  it("the jet is divergence-free (it is the curl of a stream function)", () => {
    const f = createField(1.6, 1);
    f.params.jet = 0.3;
    f.jetPhase = 1.7;
    const h = 1e-4;
    const a = { u: 0, v: 0 };
    const b = { u: 0, v: 0 };
    let worst = 0;
    for (let i = 0; i < 40; i++) {
      const x = 0.1 + (i % 8) * 0.18;
      const y = 0.1 + Math.floor(i / 8) * 0.18;
      jetAt(f, x + h, y, a);
      jetAt(f, x - h, y, b);
      const dudx = (a.u - b.u) / (2 * h);
      jetAt(f, x, y + h, a);
      jetAt(f, x, y - h, b);
      const dvdy = (a.v - b.v) / (2 * h);
      worst = Math.max(worst, Math.abs(dudx + dvdy));
    }
    assert.ok(worst < 1e-5, `max divergence ${worst}`);
  });

  it("the jet's peak speed stays near params.jet", () => {
    const f = createField(1.6, 1);
    f.params.jet = 0.2;
    const v = { u: 0, v: 0 };
    let peak = 0;
    for (let i = 0; i < 2000; i++) {
      jetAt(f, (i % 50) * 0.032, Math.floor(i / 50) * 0.025, v);
      peak = Math.max(peak, Math.hypot(v.u, v.v));
    }
    assert.ok(peak <= 0.2 + 1e-9 && peak > 0.08, `peak ${peak}`);
  });

  it("a storm turns anticlockwise on screen (y down), fastest at its core radius", () => {
    const f = bareField();
    f.params.vortex = 0.4;
    const v = { u: 0, v: 0 };
    windAt(f, 0.8 + 0.15, 0.5, v); // right of the eye, on the core radius
    assert.ok(v.v < -0.35 && Math.abs(v.u) < 1e-9, `right of eye moves up: ${v.u}, ${v.v}`); // 0.94x: the Gaussian tail
    windAt(f, 0.8, 0.5 - 0.15, v); // above the eye
    assert.ok(v.u < -0.35, `above the eye moves left: ${v.u}`);
    windAt(f, 0.8 + 0.6, 0.5, v);
    assert.ok(Math.abs(v.v) < 0.4 * 0.45, "slower far from the core");
  });

  it("inflow (the kick) points at the eye", () => {
    const f = bareField();
    f.params.inflow = 0.3;
    const v = { u: 0, v: 0 };
    windAt(f, 0.8 + 0.1, 0.5 + 0.1, v);
    assert.ok(v.u < 0 && v.v < 0, `toward the eye: ${v.u}, ${v.v}`);
  });

  it("a gust pushes air the way the pointer moved, and fades out", () => {
    const f = bareField();
    addGust(f, 0.3, 0.3, 1, 0);
    const v = { u: 0, v: 0 };
    windAt(f, 0.3, 0.3, v);
    assert.ok(v.u > 0.9, `gust speed ${v.u}`);
    stepField(f, GUST_LIFE_S + 0.01, 0);
    windAt(f, 0.3, 0.3, v);
    assert.equal(f.gusts.length, 0);
    assert.ok(Math.abs(v.u) < 1e-9);
  });

  it("caps a flick so it cannot fling the map", () => {
    const f = bareField();
    addGust(f, 0.3, 0.3, 50, 0);
    assert.ok(Math.hypot(f.gusts[0].vx, f.gusts[0].vy) <= 1.6 + 1e-9);
  });

  it("storms can be found, seeded up to the limit, and removed but never all of them", () => {
    const f = bareField();
    assert.equal(vortexAt(f, 0.81, 0.5, 0.03)?.id, 1);
    assert.equal(vortexAt(f, 0.2, 0.2, 0.03), null);
    const rand = mulberry32(3);
    while (f.vortices.length < MAX_VORTICES) assert.ok(seedVortex(f, 0.5, 0.5, rand));
    assert.equal(seedVortex(f, 0.5, 0.5, rand), null);
    for (const v of [...f.vortices]) removeVortex(f, v.id);
    assert.equal(f.vortices.length, 1);
  });

  it("storms drift east with the prevailing wind and wrap; a held storm stays put", () => {
    const f = bareField();
    f.vortices.push({ id: 2, x: 0.4, y: 0.5, r: 0.1, weight: 1 });
    f.params.prevailing = 0.5;
    for (let i = 0; i < 300; i++) stepField(f, 1 / 30, 0, 2);
    const a = f.vortices[0];
    assert.ok(a.x >= -a.r && a.x <= f.width + a.r, `wrapped inside: ${a.x}`);
    assert.notEqual(a.x, 0.8);
    assert.equal(f.vortices[1].x, 0.4);
  });
});

describe("squall weather mapping", () => {
  it("silence is the doldrums: Force 0, no rain, slowed motion", () => {
    for (const f of [IDLE_FRAME, frame({ rmsEnergy: 0.01, bass: 0.01 })]) {
      const w = toWeather(f, 0, false);
      assert.equal(w.calm, true);
      assert.equal(beaufort(w.wind).force, 0);
      assert.equal(w.rain, 0);
      assert.ok(w.speedScale <= 0.25);
    }
  });

  it("bass deepens the storms and raises the Beaufort force", () => {
    const quiet = toWeather(frame({ bass: 0.1, rmsEnergy: 0.2, mid: 0.2 }), 0, false);
    const loud = toWeather(frame({ bass: 0.95, rmsEnergy: 0.85, mid: 0.5 }), 0, false);
    assert.ok(loud.vortex > quiet.vortex * 3);
    assert.ok(beaufort(loud.wind).force >= 9, `force ${beaufort(loud.wind).force}`);
    assert.ok(beaufort(quiet.wind).force <= 3);
  });

  it("bass hits drive inflow, mids the jet, highs the rain, energy the trails", () => {
    const base = toWeather(frame({ rmsEnergy: 0.3 }), 0, false);
    assert.ok(toWeather(frame({ rmsEnergy: 0.3, bassHit: 1 }), 0, false).inflow > base.inflow + 0.3);
    assert.ok(toWeather(frame({ rmsEnergy: 0.3, mid: 1 }), 0, false).jet > base.jet + 0.2);
    assert.ok(toWeather(frame({ rmsEnergy: 0.3, high: 0.9 }), 0, false).rain > 0.9);
    assert.ok(toWeather(frame({ rmsEnergy: 1 }), 0, false).persistence > base.persistence);
  });

  it("an approaching front deepens the storms before it arrives", () => {
    const f = frame({ bass: 0.3, rmsEnergy: 0.3 });
    assert.ok(toWeather(f, 0.8, false).depth > toWeather(f, 0, false).depth);
    assert.ok(toWeather(f, 0.8, false).inflow > toWeather(f, 0, false).inflow);
  });

  it("reduced motion damps movement but keeps the readings", () => {
    const f = frame({ bass: 0.8, rmsEnergy: 0.7 });
    assert.equal(toWeather(f, 0, true).speedScale, REDUCED_SCALE);
    assert.equal(toWeather(f, 0, true).wind, toWeather(f, 0, false).wind);
  });

  it("Beaufort, rain and barometer wording", () => {
    assert.equal(BEAUFORT.length, 13);
    let last = -1;
    for (let w = 0; w <= 1.0001; w += 0.01) {
      const b = beaufort(w).force;
      assert.ok(b >= last);
      last = b;
    }
    assert.deepEqual(beaufort(1), { force: 12, name: "Hurricane force" });
    assert.equal(rainLabel(0), "none");
    assert.equal(rainLabel(0.9), "heavy");
    assert.equal(tendencyLabel(tendencyFromScene("build")), "falling");
    assert.equal(tendencyLabel(tendencyFromScene("settle")), "rising");
    assert.equal(tendencyLabel(tendencyFromScene("active")), "steady");
  });
});

describe("squall lightning", () => {
  it("strikes on onsets, at most three a second, and flashes at most once a second", () => {
    const s = new StrikeScheduler();
    let strikes = 0;
    let flashes = 0;
    let lastFlash = -Infinity;
    for (let i = 0; i < 300; i++) {
      const t = i / 60;
      const d = s.update(t, frame({ beatDetected: i % 6 === 0, bassHit: 0.9, rmsEnergy: 0.8 }), "on", false);
      if (d.strike) strikes++;
      if (d.flash) {
        assert.ok(t - lastFlash >= FLASH_MIN_GAP_S - 1e-9);
        lastFlash = t;
        flashes++;
      }
    }
    // Onsets every 0.1 s and a 1/3 s minimum gap: a strike every 0.4 s, never more than 3 a second.
    assert.ok(strikes >= 12 && strikes <= 15, `strikes in 5 s: ${strikes}`);
    assert.ok(flashes >= 4 && flashes <= 5, `flashes in 5 s: ${flashes}`);
    assert.equal(s.perMinute(5), strikes * 4);
  });

  it("no strikes when off, in silence or for weak onsets; no flash when soft or reduced", () => {
    const strong = frame({ beatDetected: true, bassHit: 1, rmsEnergy: 0.9 });
    assert.equal(new StrikeScheduler().update(1, strong, "off", false).strike, false);
    assert.equal(new StrikeScheduler().update(1, { ...strong, isPlaying: false }, "on", false).strike, false);
    assert.equal(new StrikeScheduler().update(1, frame({ beatDetected: true, rmsEnergy: 0.1 }), "on", false).strike, false);
    const soft = new StrikeScheduler().update(1, strong, "soft", false);
    assert.equal(soft.strike, true);
    assert.equal(soft.flash, false);
    assert.equal(new StrikeScheduler().update(1, strong, "on", true).flash, false);
  });

  it("a pressure ring fires once per bass hit, not on every frame of it", () => {
    const k = new KickEdge();
    const hits = [0, 0.8, 0.9, 0.7, 0.4, 0.2, 0.9, 0.6].map((h) => k.update(h));
    assert.deepEqual(hits, [false, true, false, false, false, false, true, false]);
  });

  it("bolts branch from the strike point; markers age yellow to red", () => {
    const bolt = makeBolt(mulberry32(5), 1);
    assert.ok(bolt.length >= 6);
    assert.ok(bolt.some((b) => b[0] === 0 && b[1] === 0));
    const [r0, g0] = markerColour(0);
    const [r1, g1] = markerColour(15);
    assert.ok(g0 > 200 && r0 > 250, "fresh is yellow");
    assert.ok(g1 < 80 && r1 > 200, "old is red");
    assert.equal(RAMP_LUT.length, 256 * 3);
  });
});

describe("squall particles", () => {
  it("advect deterministically with a seed and respawn instead of leaving the map", () => {
    const run = () => {
      const f = createField(1.6, 1);
      f.params = { jet: 0.2, vortex: 0.4, inflow: 0.1, prevailing: 0.05 };
      const p = new Particles(500, 9);
      p.scatter(f.width, f.height);
      for (let i = 0; i < 240; i++) p.step(f, 1 / 60, 1);
      return p;
    };
    const a = run();
    const b = run();
    assert.deepEqual(Array.from(a.x.slice(0, 50)), Array.from(b.x.slice(0, 50)));
    for (let i = 0; i < a.count; i++) {
      assert.ok(a.x[i] > -0.05 && a.x[i] < 1.65 && a.y[i] > -0.05 && a.y[i] < 1.05);
    }
  });

  it("a speed scale of zero holds every particle still", () => {
    const f = createField(1.6, 1);
    f.params.vortex = 0.5;
    const p = new Particles(50, 2);
    p.scatter(f.width, f.height);
    p.step(f, 1 / 60, 1); // settle the respawn flags
    const x0 = Array.from(p.x);
    for (let i = 0; i < p.count; i++) p.life[i] = 100;
    p.step(f, 1 / 60, 0);
    assert.deepEqual(Array.from(p.x), x0);
  });

  it("rain follows the highs: more drops when loud, none after it stops", () => {
    const f = createField(1.6, 1);
    const r = new Rain(200, 4);
    for (let i = 0; i < 60; i++) r.step(f, 1 / 60, 0.8, 1);
    assert.ok(r.count >= 150, `rain count ${r.count}`);
    for (let i = 0; i < 60; i++) r.step(f, 1 / 60, 0, 1);
    assert.equal(r.count, 0);
  });
});

describe("squall forecast", () => {
  // 20 s at 8 kHz: 4 s quiet, 8 s of a 55 Hz bass tone, 4 s of hiss, 4 s quiet.
  const sr = 8000;
  const n = sr * 20;
  const pcm = new Float32Array(n);
  const rand = mulberry32(1);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    if (t < 4) pcm[i] = 0.001 * (rand() - 0.5);
    else if (t < 12) pcm[i] = 0.6 * Math.sin(2 * Math.PI * 55 * t);
    else if (t < 16) pcm[i] = 0.3 * (rand() * 2 - 1);
    else pcm[i] = 0.001 * (rand() - 0.5);
  }
  const fc = computeForecast([pcm], sr, 10);
  const mean = (a: Float32Array, from: number, to: number) => {
    let s = 0;
    for (let i = from * 10; i < to * 10; i++) s += a[i];
    return s / ((to - from) * 10);
  };

  it("finds the bass and the hiss in the right windows", () => {
    assert.equal(fc.level.length, 200);
    assert.ok(Math.abs(fc.durationS - 20) < 1e-9);
    assert.ok(mean(fc.low, 4.5, 11.5) > 0.8, "low band during the bass tone");
    assert.ok(mean(fc.high, 12.5, 15.5) > 0.8, "high band during the hiss");
    assert.ok(mean(fc.high, 4.5, 11.5) < mean(fc.high, 12.5, 15.5) - 0.3, "the bass tone is not hiss");
    assert.ok(mean(fc.level, 0.5, 3.5) < 0.2 && mean(fc.level, 16.5, 19.5) < 0.2, "quiet passages read low");
  });

  it("the barometer falls before the loud part and rises after it", () => {
    assert.equal(tendencyLabel(tendencyAt(fc, 2.5)), "falling");
    assert.equal(tendencyLabel(tendencyAt(fc, 15.5)), "rising");
    assert.equal(tendencyLabel(tendencyAt(fc, 8)), "steady", "inside a long, even passage");
    assert.equal(tendencyAt(fc, 19.5), 0, "nothing ahead to compare at the end");
  });

  it("mixes channels and survives an empty file", () => {
    const l = new Float32Array(sr).fill(0.5);
    const r = new Float32Array(sr).fill(-0.5);
    const mixed = computeForecast([l, r], sr, 10);
    assert.ok(mixed.level.every((x) => Number.isFinite(x)));
    const empty = computeForecast([new Float32Array(0)], sr, 10);
    assert.equal(empty.level.length, 1);
  });
});

describe("squall forecast from pre-computed readings", () => {
  // 20 s at 10 frames a second, as analyser dB: quiet, then a loud passage from 8 s to 16 s, then quiet.
  const rate = 10;
  const n = 200;
  const loud = (i: number) => i >= 8 * rate && i < 16 * rate;
  const all = Float32Array.from({ length: n }, (_, i) => (loud(i) ? -30 : -80));
  const low = Float32Array.from({ length: n }, (_, i) => (loud(i) ? -35 : -90));
  const high = Float32Array.from({ length: n }, (_, i) => (i >= 12 * rate && i < 16 * rate ? -40 : -95));
  const fc = forecastFromReadings({ allDb: all, lowDb: low, highDb: high }, rate);

  it("keeps the readings' frame rate and length, normalised to 0..1", () => {
    assert.equal(fc.rateHz, rate);
    assert.ok(Math.abs(fc.durationS - 20) < 1e-9);
    for (const a of [fc.level, fc.low, fc.high]) assert.ok(a.length === n && a.every((x) => x >= 0 && x <= 1));
    assert.ok(fc.level[100] > 0.95 && fc.level[10] < 0.05, "loud reads high, quiet reads low");
    assert.ok(fc.high[140] > 0.95 && fc.high[100] < 0.05, "the highs are only in the last half of the loud passage");
  });

  it("gives the same barometer behaviour as a decoded file", () => {
    assert.equal(tendencyLabel(tendencyAt(fc, 5.5)), "falling");
    assert.equal(tendencyLabel(tendencyAt(fc, 15.5)), "rising");
  });
});

