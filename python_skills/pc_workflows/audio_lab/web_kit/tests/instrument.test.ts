import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { BANDS, OnsetDetector, bandDb, binRange, dbToUnit, follow } from "../src/lib/audio/features";
import { createConstellation, createFrame, project, type Pointer } from "../src/lib/instrument/constellation";
import { PROFILES, toVisualParams } from "../src/lib/instrument/profiles";
import { IDLE_FRAME, makeFrame, type AudioFeatureFrame } from "../src/lib/pipeline/contract";

const frame = (o: Partial<AudioFeatureFrame> = {}) => makeFrame({ ...IDLE_FRAME, ...o });
import { BassShaper } from "../src/lib/audio/bass";
import { DelayLine } from "../src/lib/audio/delay";

const bass = PROFILES[1]; // pulse
const drift = PROFILES[2];
const galaxy = PROFILES[0];

describe("audio maths", () => {
  it("maps frequencies to FFT bins (44.1 kHz, 2048 point FFT: about 21.5 Hz per bin)", () => {
    assert.deepEqual(binRange(40, 150, 44100, 2048), [1, 7]);
    assert.deepEqual(binRange(2000, 10000, 44100, 2048), [92, 465]);
    assert.ok(binRange(0, 0, 44100, 2048)[1] > binRange(0, 0, 44100, 2048)[0], "always a non-empty range");
  });

  it("splits the low end into sub and punch at the longer FFT size", () => {
    // 4096 point FFT at 44.1 kHz: bins are 10.8 Hz wide.
    assert.deepEqual(binRange(60, 150, 44100, 4096), [5, 14]);
    assert.deepEqual(binRange(20, 150, 44100, 4096), [1, 14]);
    assert.ok(BANDS.punchHz[0] >= 60 && BANDS.lowHz[0] <= 20, "punch excludes the sub; the low band includes it");
  });

  it("averages power, not dB, across bins", () => {
    // Two bins at 0 dB and -20 dB: the mean power is about 0.505, which is about -2.97 dB.
    const db = new Float32Array([0, -20]);
    assert.ok(Math.abs(bandDb(db, 0, 2) - -2.97) < 0.05);
    // Uniform input returns the same level.
    assert.ok(Math.abs(bandDb(new Float32Array([-40, -40, -40]), 0, 3) - -40) < 1e-6);
  });

  it("maps dB into 0..1 and clamps", () => {
    assert.equal(dbToUnit(-85, -85, -25), 0);
    assert.equal(dbToUnit(-25, -85, -25), 1);
    assert.equal(dbToUnit(-200, -85, -25), 0);
    assert.equal(dbToUnit(0, -85, -25), 1);
    assert.ok(Math.abs(dbToUnit(-55, -85, -25) - 0.5) < 1e-9);
  });

  it("follows targets faster on attack than on release", () => {
    const up = follow(0, 1, 0.05, 0.02, 0.4);
    const down = follow(1, 0, 0.05, 0.02, 0.4);
    assert.ok(1 - down < up, "the rise covers more of the step than the fall");
    assert.ok(follow(0.3, 0.3, 1, 0.02, 0.4) === 0.3, "no change when already at target");
    assert.ok(follow(0, 1, 100, 0.02, 0.4) > 0.999, "converges over a long interval");
  });
});

/** A bass band (dB) with a kick of `width` seconds at each beat, on a floor `floor` dB, sampled at 60 Hz. */
function kickTrain(beats: number[], seconds: number, peak: number, floor: number, width = 0.06) {
  const dt = 1 / 60;
  const db: number[] = [];
  for (let i = 0; i < seconds / dt; i++) {
    const t = i * dt;
    const inKick = beats.some((b) => t >= b && t < b + width);
    db.push(inKick ? peak : floor);
  }
  return { db, dt };
}

function runShaper(db: number[], dt: number) {
  const s = new BassShaper();
  return db.map((x, i) => s.push(x, i * dt, dt));
}

describe("bass shaper", () => {
  const beats = Array.from({ length: 16 }, (_, i) => 1 + i * 0.5); // 120 BPM from 1 s

  it("peaks on each kick, not late (kicks are not delayed by the spring)", () => {
    const { db, dt } = kickTrain(beats, 10, -20, -60);
    const states = runShaper(db, dt);
    for (const b of beats.slice(0, 12)) {
      let best = 0;
      let bestT = 0;
      for (let i = 0; i < states.length; i++) {
        const t = i * dt;
        if (t >= b - 0.05 && t <= b + 0.2 && states[i].pull > best) {
          best = states[i].pull;
          bestT = t;
        }
      }
      assert.ok(Math.abs(bestT - b) <= 0.03, `beat ${b}: pull peaks at ${bestT.toFixed(3)} s`);
    }
  });

  it("returns toward rest between kicks, so each kick reads as a separate pulse", () => {
    const { db, dt } = kickTrain(beats, 10, -20, -60);
    const states = runShaper(db, dt);
    const at = (t: number) => states[Math.round(t / dt)].pull;
    const onKick = at(beats[8] + 0.03);
    const midGap = at(beats[8] + 0.4);
    assert.ok(midGap < onKick * 0.6, `on-kick ${onKick.toFixed(2)}, between kicks ${midGap.toFixed(2)}`);
  });

  it("holds a steady, non-pulsing pull for sustained bass", () => {
    const dt = 1 / 60;
    const db = Array.from({ length: 600 }, () => -25);
    const states = runShaper(db, dt);
    const tail = states.slice(400).map((s) => s.pull);
    const spread = Math.max(...tail) - Math.min(...tail);
    assert.ok(spread < 0.02, `steady bass should not pump (spread ${spread.toFixed(3)})`);
    assert.ok(tail[0] > 0.15, "sustained bass still gives a clear pull");
    assert.ok(states.slice(30).every((s) => s.kick < 0.3), "no false kicks on a steady level after warm-up");
  });

  it("sees bass re-entries that a loud steady sub would hide (the Swaguu case)", () => {
    // A steady 54 dB sub tone, and a punch band at 32 dB that jumps to 45 dB for 3 frames every 0.7 s.
    const dt = 1 / 43;
    const frames = Math.round(12 / dt);
    const hits: number[] = [];
    const punch: number[] = [];
    const wide: number[] = [];
    for (let i = 0; i < frames; i++) {
      const t = i * dt;
      const inHit = t >= 1 && (t - 1) % 0.7 < 3 * dt;
      if (inHit && (t - 1) % 0.7 < dt) hits.push(i);
      const p = inHit ? 45 : 32;
      punch.push(p);
      wide.push(10 * Math.log10(10 ** (54 / 10) + 10 ** (p / 10))); // the sub tone dominates the sum
    }
    const kicksOn = (db: number[]) => {
      const sh = new BassShaper();
      const k = db.map((x, i) => sh.push(x, i * dt, dt).kick);
      return hits.filter((h) => Math.max(...k.slice(h, h + 6)) > 0.5).length;
    };
    assert.ok(hits.length >= 14);
    assert.ok(kicksOn(punch) >= hits.length - 1, "the punch band answers every re-entry");
    assert.ok(kicksOn(wide) <= 1, "the summed band, dominated by the sub, hardly answers any");
  });

  it("decays to rest in silence", () => {
    const { db, dt } = kickTrain(beats, 4, -20, -60);
    const quiet = [...db, ...Array.from({ length: 600 }, () => -120)];
    const states = runShaper(quiet, dt);
    assert.ok(states[states.length - 1].pull < 0.01);
  });

  it("uses the same range for quiet and loud material", () => {
    const quiet = kickTrain(beats, 10, -50, -75);
    const loud = kickTrain(beats, 10, -12, -35);
    const peakOf = (db: number[], dt: number) => Math.max(...runShaper(db, dt).slice(0, Math.round(6 / dt)).map((s) => s.pull));
    const pq = peakOf(quiet.db, quiet.dt);
    const pl = peakOf(loud.db, loud.dt);
    assert.ok(Math.abs(pq - pl) < 0.15, `quiet ${pq.toFixed(2)} vs loud ${pl.toFixed(2)}`);
  });
});

describe("delay line", () => {
  it("returns the value from the requested moment, not the newest one", () => {
    const d = new DelayLine<number>(5);
    for (let i = 0; i <= 10; i++) d.push(i / 10, i);
    assert.equal(d.at(0.5), 5);
    assert.equal(d.at(0.55), 5, "between samples, the earlier one");
    assert.equal(d.at(1.0), 10);
  });

  it("returns the first value before the history begins, and forgets what is older than its window", () => {
    const d = new DelayLine<string>(0.3);
    d.push(0, "a");
    d.push(0.1, "b");
    d.push(1.0, "c");
    assert.equal(d.at(-5), "c", "older samples were dropped, so the earliest kept value is returned");
    assert.equal(d.at(0.5), "c");
    assert.equal(new DelayLine<number>(1).at(0), undefined);
  });
});

describe("onset detector", () => {
  const flat = (n: number) => new Float32Array(n).fill(0.01);
  const spike = (n: number) => {
    const a = new Float32Array(n).fill(0.01);
    for (let i = 0; i < 40; i++) a[i] = 0.9;
    return a;
  };

  it("stays quiet on steady input", () => {
    const d = new OnsetDetector();
    let fired = 0;
    for (let i = 0; i < 200; i++) if (d.push(flat(64), i / 60)) fired++;
    assert.equal(fired, 0);
  });

  it("fires once on a sudden broadband rise", () => {
    const d = new OnsetDetector();
    for (let i = 0; i < 60; i++) d.push(flat(64), i / 60);
    assert.equal(d.push(spike(64), 1.0), true);
    assert.equal(d.push(flat(64), 1.02), false);
  });

  it("ignores a second onset inside the refractory period", () => {
    const d = new OnsetDetector();
    for (let i = 0; i < 60; i++) d.push(flat(64), i / 60);
    assert.equal(d.push(spike(64), 1.0), true);
    for (let i = 0; i < 3; i++) d.push(flat(64), 1.0 + (i + 1) * 0.01);
    assert.equal(d.push(spike(64), 1.05), false, "0.05 s later is inside the 0.12 s refractory period");
  });
});

describe("profiles map features to visual parameters", () => {
  it("is calm in silence: no pull, swell, sparkle or shock, but it keeps a slow spin", () => {
    for (const p of PROFILES) {
      const v = toVisualParams(frame(), p, false);
      assert.equal(v.pull, 0);
      assert.equal(v.swell, 0);
      assert.equal(v.sparkle, 0);
      assert.equal(v.shock, 0);
      assert.equal(v.linkAlpha, 0);
      assert.ok(v.spin > 0, "the cluster still turns slowly");
    }
  });

  it("pulls harder on bass, and the Pulse profile pulls harder than Drift", () => {
    const f = frame({ bass: 0.8, bassHit: 0.8, rmsEnergy: 0.5, isPlaying: true });
    assert.ok(toVisualParams(f, bass, false).pull > toVisualParams(f, drift, false).pull);
    assert.ok(toVisualParams(f, bass, false).pull > toVisualParams(frame(), bass, false).pull);
  });

  it("shifts colour with mid energy", () => {
    const low = toVisualParams(frame({ mid: 0.1 }), galaxy, false).hue;
    const high = toVisualParams(frame({ mid: 0.9 }), galaxy, false).hue;
    assert.ok(high > low);
  });

  it("passes the bass kick through as a flash, and it is zero in silence", () => {
    assert.equal(toVisualParams(frame(), bass, false).kick, 0);
    const kicked = toVisualParams(frame({ bass: 0.5, bassHit: 1, isPlaying: true }), bass, false);
    const calm = toVisualParams(frame({ bass: 0.5, isPlaying: true }), bass, false);
    assert.ok(kicked.kick > 0.9 && calm.kick === 0);
  });

  it("damps movement under reduced motion and switches off the flicker-like effects", () => {
    const f = frame({ bass: 1, bassHit: 1, mid: 0.5, high: 1, rmsEnergy: 1, onsetStrength: 1, isPlaying: true });
    const normal = toVisualParams(f, bass, false);
    const reduced = toVisualParams(f, bass, true);
    assert.ok(reduced.pull < normal.pull * 0.5, "movement is damped");
    assert.equal(reduced.sparkle, 0);
    assert.equal(reduced.jitter, 0);
    assert.equal(reduced.shock, 0);
    assert.equal(reduced.tilt, 0);
    assert.ok(reduced.hue > 0 && reduced.glow > 0, "colour and glow still respond");
  });

  it("keeps every parameter within its range for extreme inputs", () => {
    const f = frame({ bass: 1, bassHit: 1, mid: 1, high: 1, rmsEnergy: 1, onsetStrength: 1, beatDetected: true, isPlaying: true });
    for (const p of PROFILES) {
      const v = toVisualParams(f, p, false);
      for (const k of ["pull", "swell", "glow", "linkAlpha", "sparkle", "shock"] as const) {
        assert.ok(v[k] >= 0 && v[k] <= 1, `${p.id}.${k}`);
      }
    }
  });
});

describe("constellation projection", () => {
  const W = 800;
  const H = 600;
  const params = (over: Partial<ReturnType<typeof toVisualParams>> = {}) => ({
    ...toVisualParams(frame(), galaxy, false),
    ...over,
  });
  const meanDistance = (f: ReturnType<typeof createFrame>, n: number) => {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += Math.hypot(f.x[i] - W / 2, f.y[i] - H / 2);
    return sum / n;
  };

  it("places nodes on a unit sphere, deterministically", () => {
    const a = createConstellation(900);
    const b = createConstellation(900);
    assert.equal(a.n, 900);
    for (let i = 0; i < 900; i += 37) {
      const len = Math.hypot(a.ux[i], a.uy[i], a.uz[i]);
      assert.ok(Math.abs(len - 1) < 1e-5, `node ${i} has length ${len}`);
      assert.equal(a.ux[i], b.ux[i]);
    }
  });

  it("pulls the cluster inward as the pull parameter rises", () => {
    const c = createConstellation(300);
    const out = createFrame(300);
    project(c, out, { t: 0, params: params({ pull: 0 }), width: W, height: H, pointer: null });
    const outer = meanDistance(out, 300);
    project(c, out, { t: 0, params: params({ pull: 1 }), width: W, height: H, pointer: null });
    const inner = meanDistance(out, 300);
    assert.ok(inner < outer * 0.85, `pulled ${inner.toFixed(1)} vs resting ${outer.toFixed(1)}`);
  });

  it("produces identical frames for identical inputs", () => {
    const c = createConstellation(200);
    const a = createFrame(200);
    const b = createFrame(200);
    const o = { t: 3.7, params: params({ pull: 0.4, sparkle: 0.6, jitter: 2 }), width: W, height: H, pointer: null };
    project(c, a, o);
    project(c, b, o);
    assert.deepEqual(Array.from(a.x), Array.from(b.x));
    assert.deepEqual(Array.from(a.alpha), Array.from(b.alpha));
  });

  it("pushes nodes away from a hovering pointer, and pulls them in when attracting", () => {
    const c = createConstellation(200);
    const base = createFrame(200);
    project(c, base, { t: 0, params: params(), width: W, height: H, pointer: null });
    const target = 5;
    const px = base.x[target] + 20;
    const py = base.y[target];
    const hover: Pointer = { x: px, y: py, radius: 60, attract: false };
    const drag: Pointer = { ...hover, attract: true };
    const pushed = createFrame(200);
    const pulled = createFrame(200);
    project(c, pushed, { t: 0, params: params(), width: W, height: H, pointer: hover });
    project(c, pulled, { t: 0, params: params(), width: W, height: H, pointer: drag });
    const before = Math.hypot(base.x[target] - px, base.y[target] - py);
    const after = Math.hypot(pushed.x[target] - px, pushed.y[target] - py);
    const attracted = Math.hypot(pulled.x[target] - px, pulled.y[target] - py);
    assert.ok(after > before + 10, "hover pushes the node outward");
    assert.ok(attracted < before - 5, "drag pulls the node toward the pointer");
  });

  it("only sparkles when the high band and the profile allow it", () => {
    const c = createConstellation(400);
    const out = createFrame(400);
    const sizesOff = (() => {
      project(c, out, { t: 1, params: params({ sparkle: 0 }), width: W, height: H, pointer: null });
      return Array.from(out.size);
    })();
    project(c, out, { t: 1, params: params({ sparkle: 1 }), width: W, height: H, pointer: null });
    const sizesOn = Array.from(out.size);
    const bigger = sizesOn.filter((s, i) => s > sizesOff[i] + 1e-6).length;
    assert.ok(bigger > 20, `about 12% of nodes flash each frame (got ${bigger})`);
  });
});

