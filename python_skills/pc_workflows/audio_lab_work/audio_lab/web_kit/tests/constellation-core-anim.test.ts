import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  ATTACK_S, BEAM_DECAY_S, MAX_DT_S, ORBIT_SPIN, PULSE_MIN_INTERVAL_S, REDUCED_ATTACK_S, RELEASE_S, RING_COUNT,
  createCoreAnim, stepCoreAnim, type CoreAnim,
} from "../src/lib/constellation-core/animator";
import { toCoreParams, type CoreParams } from "../src/lib/constellation-core/params";
import { IDLE_FRAME, makeFrame, type AudioFeatureFrame } from "../src/lib/pipeline/contract";

const DT = 1 / 60;
const frame = (o: Partial<AudioFeatureFrame> = {}) => makeFrame({ ...IDLE_FRAME, ...o });
const LOUD = frame({ isPlaying: true, bass: 0.8, mid: 0.6, high: 0.4, rmsEnergy: 0.7, onsetStrength: 0.9, beatDetected: true, bassHit: 0.8, currentSceneState: "active" });
const P_LOUD = toCoreParams(LOUD, false);
const withP = (o: Partial<CoreParams>): CoreParams => ({ ...P_LOUD, ...o });
const run = (a: CoreAnim, p: CoreParams, seconds: number, reduced = false, dt = DT) => {
  for (let t = 0; t < seconds - 1e-9; t += dt) stepCoreAnim(a, p, dt, reduced);
  return a;
};

describe("Constellation Core animator: time steps", () => {
  it("invalid or non-positive steps advance nothing", () => {
    const a = createCoreAnim();
    const before = { ...a };
    for (const dt of [0, -0.1, NaN, -Infinity, Infinity]) stepCoreAnim(a, P_LOUD, dt, false);
    assert.deepEqual(a, before);
  });

  it("a long finite step is shortened to MAX_DT_S", () => {
    assert.equal(stepCoreAnim(createCoreAnim(), P_LOUD, 10, false).time, MAX_DT_S);
  });

  it("returns the same object: no allocation per frame", () => {
    const a = createCoreAnim();
    assert.equal(stepCoreAnim(a, P_LOUD, DT, false), a);
  });

  it("is deterministic: the same sequence gives the same state", () => {
    const x = run(createCoreAnim(), P_LOUD, 3);
    const y = run(createCoreAnim(), P_LOUD, 3);
    assert.deepEqual(x, y);
  });
});

describe("Constellation Core animator: envelopes and motion", () => {
  it("move towards the target continuously and converge", () => {
    const a = stepCoreAnim(createCoreAnim(), P_LOUD, DT, false);
    assert.ok(a.exposure > 0 && a.exposure < P_LOUD.exposure);
    run(a, P_LOUD, 2);
    assert.ok(Math.abs(a.exposure - P_LOUD.exposure) < 1e-3);
  });

  it("rise faster than they fall", () => {
    assert.ok(ATTACK_S < RELEASE_S);
    const up = run(createCoreAnim(), withP({ exposure: 1 }), 0.1);
    const down = run(run(createCoreAnim(), withP({ exposure: 1 }), 3), withP({ exposure: 0 }), 0.1);
    assert.ok(up.exposure > 1 - down.exposure);
  });

  it("reduced motion slows the attack", () => {
    assert.ok(REDUCED_ATTACK_S > ATTACK_S);
    const n = run(createCoreAnim(), withP({ exposure: 1 }), 0.1, false);
    const r = run(createCoreAnim(), withP({ exposure: 1 }), 0.1, true);
    assert.ok(r.exposure < n.exposure);
  });

  it("orbit phase accumulates from the smoothed speed and never moves backwards", () => {
    const a = createCoreAnim();
    let last = 0;
    for (let i = 0; i < 300; i++) {
      stepCoreAnim(a, withP({ orbitSpeed: i < 150 ? 1 : 0.1 }), DT, false);
      assert.ok(a.phase >= last);
      last = a.phase;
    }
    assert.ok(a.phase > 0 && a.phase < ORBIT_SPIN * 5, `phase ${a.phase}`);
  });

  it("a sudden speed change bends the rotation: per-frame phase steps stay small", () => {
    const a = run(createCoreAnim(), withP({ orbitSpeed: 0 }), 2);
    let maxStep = 0;
    for (let i = 0; i < 120; i++) {
      const before = a.phase;
      stepCoreAnim(a, withP({ orbitSpeed: 1 }), DT, false);
      maxStep = Math.max(maxStep, a.phase - before);
    }
    assert.ok(maxStep <= ORBIT_SPIN * DT + 1e-9, `step ${maxStep}`);
  });
});

describe("Constellation Core animator: beam impulse", () => {
  it("jumps to the hit strength at once and then decays with the stated time constant", () => {
    const a = stepCoreAnim(createCoreAnim(), withP({ beam: 1 }), DT, false);
    assert.equal(a.beam, 1);
    const after = run(a, withP({ beam: 0 }), BEAM_DECAY_S);
    assert.ok(Math.abs(after.beam - Math.exp(-1)) < 0.03, `beam ${after.beam}`);
    run(after, withP({ beam: 0 }), 3);
    assert.ok(after.beam < 0.001, "it does not stay lit");
  });

  it("a weaker hit does not cut a stronger one short, a stronger one retriggers", () => {
    const a = stepCoreAnim(createCoreAnim(), withP({ beam: 0.9 }), DT, false);
    stepCoreAnim(a, withP({ beam: 0.2 }), DT, false);
    assert.ok(a.beam > 0.8);
    stepCoreAnim(a, withP({ beam: 1 }), DT, false);
    assert.equal(a.beam, 1);
  });
});

describe("Constellation Core animator: ring pulse and its rate limit", () => {
  it("one onset gives one accepted pulse that decays", () => {
    const a = stepCoreAnim(createCoreAnim(), withP({ pulse: 0.9 }), DT, false);
    assert.equal(a.pulsesAccepted, 1);
    assert.equal(a.pulse, 0.9);
    run(a, withP({ pulse: 0 }), 3);
    assert.ok(a.pulse < 0.001);
  });

  it("never accepts more than one pulse per PULSE_MIN_INTERVAL_S, however often onsets arrive", () => {
    const a = createCoreAnim();
    const seconds = 10;
    for (let t = 0; t < seconds; t += DT) stepCoreAnim(a, withP({ pulse: 1 }), DT, false); // an onset on every frame
    const rate = a.pulsesAccepted / seconds;
    assert.ok(rate <= 1 / PULSE_MIN_INTERVAL_S + 0.2, `rate ${rate}/s`);
    assert.ok(rate < 3.0, "under 3 per second");
    assert.ok(a.pulsesRejected > a.pulsesAccepted, "most were refused");
  });

  it("each accepted pulse lights the next ring, round-robin, always within range", () => {
    const a = createCoreAnim();
    const seen: number[] = [];
    for (let i = 0; i < 6; i++) {
      stepCoreAnim(a, withP({ pulse: 1 }), 0.05, false);
      run(a, withP({ pulse: 0 }), PULSE_MIN_INTERVAL_S + 0.05);
      seen.push(a.pulseRing);
      assert.ok(a.pulseRing >= 0 && a.pulseRing < RING_COUNT);
    }
    assert.equal(new Set(seen).size, RING_COUNT, `rings lit: ${seen}`);
  });
});

describe("Constellation Core animator: stays bounded", () => {
  it("all unit fields stay in 0..1 over a long noisy run", () => {
    const a = createCoreAnim();
    for (let i = 0; i < 6000; i++) {
      const v = (Math.sin(i * 0.37) + 1) / 2;
      stepCoreAnim(a, withP({ swell: v, glow: v, orbitSpeed: v, colour: v, shimmer: v, exposure: v, beam: i % 90 === 0 ? 1 : 0, pulse: i % 20 === 0 ? 1 : 0, motion: v }), DT, i % 2000 > 1000);
    }
    for (const k of ["swell", "glow", "orbitSpeed", "colour", "shimmer", "exposure", "sceneLevel", "motion", "beam", "pulse"] as const) {
      assert.ok(Number.isFinite(a[k]) && a[k] >= 0 && a[k] <= 1, `${k}=${a[k]}`);
    }
  });
});
