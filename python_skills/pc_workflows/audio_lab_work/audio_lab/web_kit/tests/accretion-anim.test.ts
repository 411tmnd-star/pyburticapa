import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  ATTACK_S, DISK_SPIN, FLARE_MIN_INTERVAL_S, JET_DECAY_S, MAX_DT_S, ORBIT_RATE, RELEASE_S,
  createAccretionAnim, stepAccretionAnim, type AccretionAnim,
} from "../src/lib/accretion/animator";
import { toAccretionParams, type AccretionParams } from "../src/lib/accretion/params";
import { IDLE_FRAME, makeFrame, type AudioFeatureFrame } from "../src/lib/pipeline/contract";

const DT = 1 / 60;
const frame = (o: Partial<AudioFeatureFrame> = {}) => makeFrame({ ...IDLE_FRAME, ...o });
const LOUD = frame({ isPlaying: true, bass: 0.8, mid: 0.6, high: 0.4, rmsEnergy: 0.7, onsetStrength: 0.9, beatDetected: true, bassHit: 0.8, currentSceneState: "active" });
const P_LOUD = toAccretionParams(LOUD, false);
const P_SILENT = toAccretionParams(IDLE_FRAME, false);
const withP = (o: Partial<AccretionParams>): AccretionParams => ({ ...P_LOUD, ...o });
const run = (a: AccretionAnim, p: AccretionParams, seconds: number, reduced = false, dt = DT) => {
  for (let t = 0; t < seconds - 1e-9; t += dt) stepAccretionAnim(a, p, dt, reduced);
  return a;
};

describe("time steps", () => {
  it("invalid or non-positive steps advance nothing", () => {
    const a = createAccretionAnim();
    const before = { ...a };
    for (const dt of [0, -0.1, NaN, -Infinity]) stepAccretionAnim(a, P_LOUD, dt, false);
    assert.deepEqual(a, before);
  });

  it("a very long finite step is shortened to MAX_DT_S; an infinite step is invalid and advances nothing", () => {
    const b = stepAccretionAnim(createAccretionAnim(), P_LOUD, 10, false);
    assert.equal(b.time, MAX_DT_S);
    const a = stepAccretionAnim(createAccretionAnim(), P_LOUD, Infinity, false);
    assert.equal(a.time, 0);
  });

  it("returns the same object: no allocation per frame", () => {
    const a = createAccretionAnim();
    assert.equal(stepAccretionAnim(a, P_LOUD, DT, false), a);
  });
});

describe("envelopes", () => {
  it("move towards the target continuously, without jumping to it in one frame", () => {
    const a = stepAccretionAnim(createAccretionAnim(), P_LOUD, DT, false);
    assert.ok(a.exposure > 0 && a.exposure < P_LOUD.exposure, `exposure ${a.exposure}`);
    run(a, P_LOUD, 2);
    assert.ok(Math.abs(a.exposure - P_LOUD.exposure) < 1e-3, "converges within 2 s");
  });

  it("rise faster than they fall (attack shorter than release)", () => {
    assert.ok(ATTACK_S < RELEASE_S);
    const up = run(createAccretionAnim(), withP({ exposure: 1 }), 0.1);
    const down = run(run(createAccretionAnim(), withP({ exposure: 1 }), 3), withP({ exposure: 0 }), 0.1);
    assert.ok(up.exposure > 1 - down.exposure, `rise ${up.exposure} vs fall ${1 - down.exposure}`);
  });

  it("reduced motion slows the attack, so no change is abrupt", () => {
    const normal = run(createAccretionAnim(), withP({ exposure: 1 }), 0.1, false);
    const reduced = run(createAccretionAnim(), withP({ exposure: 1 }), 0.1, true);
    assert.ok(reduced.exposure < normal.exposure * 0.6, `reduced ${reduced.exposure} vs normal ${normal.exposure}`);
  });

  it("silence after a loud passage returns everything to the resting state", () => {
    const a = run(run(createAccretionAnim(), P_LOUD, 2), P_SILENT, 5);
    assert.ok(Math.abs(a.exposure - P_SILENT.exposure) < 1e-3);
    assert.ok(a.jet < 1e-3, `jet ${a.jet}`);
    assert.ok(a.flare < 1e-3, `flare ${a.flare}`);
    assert.ok(Math.abs(a.motion - P_SILENT.motion) < 1e-3);
  });
});

describe("accumulated motion", () => {
  it("disk phase grows at DISK_SPIN times the smoothed disk speed", () => {
    const a = run(createAccretionAnim(), withP({ diskSpeed: 1 }), 3);
    const before = a.diskPhase;
    run(a, withP({ diskSpeed: 1 }), 1);
    assert.ok(Math.abs(a.diskPhase - before - DISK_SPIN) < 0.01, `phase step ${a.diskPhase - before}`);
  });

  it("disk phase never decreases and stops when speed is zero", () => {
    const a = createAccretionAnim();
    let prev = a.diskPhase;
    for (let i = 0; i < 600; i++) {
      stepAccretionAnim(a, withP({ diskSpeed: (i % 120) / 120 }), DT, false);
      assert.ok(a.diskPhase >= prev);
      prev = a.diskPhase;
    }
    run(a, withP({ diskSpeed: 0 }), 10);
    const settled = a.diskPhase;
    run(a, withP({ diskSpeed: 0 }), 1);
    assert.ok(a.diskPhase - settled < 1e-6);
  });

  it("the camera drifts at ORBIT_RATE times the smoothed motion", () => {
    const a = run(createAccretionAnim(), withP({ motion: 1 }), 3);
    const before = a.orbit;
    run(a, withP({ motion: 1 }), 1);
    assert.ok(Math.abs(a.orbit - before - ORBIT_RATE) < 0.001);
  });

  it("flow time advances at the smoothed motion rate, so reduced motion slows drift continuously", () => {
    const a = run(createAccretionAnim(), withP({ motion: 1 }), 3);
    const f0 = a.flow;
    run(a, withP({ motion: 1 }), 1);
    assert.ok(Math.abs(a.flow - f0 - 1) < 0.001, `flow step ${a.flow - f0}`);
    const b = run(createAccretionAnim(), withP({ motion: 0.35 }), 3);
    const g0 = b.flow;
    run(b, withP({ motion: 0.35 }), 1);
    assert.ok(Math.abs(b.flow - g0 - 0.35) < 0.001, `reduced flow step ${b.flow - g0}`);
  });

  it("under reduced motion the disk turns at the reduced speed from the params", () => {
    const pn = toAccretionParams(LOUD, false);
    const pr = toAccretionParams(LOUD, true);
    const n = run(createAccretionAnim(), pn, 3);
    const r = run(createAccretionAnim(), pr, 3, true);
    const nStart = n.diskPhase, rStart = r.diskPhase;
    run(n, pn, 2); run(r, pr, 2, true);
    const ratio = (r.diskPhase - rStart) / (n.diskPhase - nStart);
    assert.ok(Math.abs(ratio - 0.35) < 0.01, `ratio ${ratio}`);
  });
});

describe("jet impulses", () => {
  it("a single bass hit decays by about 1/e after JET_DECAY_S", () => {
    const a = stepAccretionAnim(createAccretionAnim(), withP({ jet: 0.8 }), DT, false);
    assert.equal(a.jet, 0.8);
    run(a, withP({ jet: 0 }), JET_DECAY_S);
    assert.ok(Math.abs(a.jet - 0.8 * Math.exp(-1)) < 0.02, `jet ${a.jet}`);
  });

  it("never exceeds the strongest input, and a stronger hit retriggers", () => {
    const a = createAccretionAnim();
    for (let i = 0; i < 300; i++) {
      stepAccretionAnim(a, withP({ jet: i % 30 === 0 ? 0.6 : 0 }), DT, false);
      assert.ok(a.jet <= 0.6 + 1e-12);
    }
    stepAccretionAnim(a, withP({ jet: 0.9 }), DT, false);
    assert.equal(a.jet, 0.9);
  });

  it("under reduced motion the params carry no jets, so the impulse fades to zero", () => {
    const a = stepAccretionAnim(createAccretionAnim(), P_LOUD, DT, false);
    run(a, toAccretionParams(LOUD, true), 3, true);
    assert.ok(a.jet < 0.01, `jet ${a.jet}`);
  });
});

describe("flare rate limit", () => {
  it("a flare every frame for 10 s is limited to at most one per FLARE_MIN_INTERVAL_S, under 3 per second", () => {
    const a = run(createAccretionAnim(), withP({ flare: 1 }), 10);
    const rate = a.flaresAccepted / a.time;
    assert.ok(a.flaresAccepted <= Math.floor(10 / FLARE_MIN_INTERVAL_S) + 1, `accepted ${a.flaresAccepted}`);
    assert.ok(rate < 3, `rate ${rate.toFixed(2)} per second`);
    assert.ok(a.flaresRejected > 0, "the limiter refused some");
  });

  it("flares at the interval boundary are accepted; inside it they are refused", () => {
    const a = createAccretionAnim();
    stepAccretionAnim(a, withP({ flare: 1 }), DT, false);
    assert.equal(a.flaresAccepted, 1);
    run(a, withP({ flare: 0 }), FLARE_MIN_INTERVAL_S - 3 * DT);
    stepAccretionAnim(a, withP({ flare: 1 }), DT, false);
    assert.equal(a.flaresAccepted, 1, "inside the interval: refused");
    run(a, withP({ flare: 0 }), 4 * DT);
    stepAccretionAnim(a, withP({ flare: 1 }), DT, false);
    assert.equal(a.flaresAccepted, 2, "after the interval: accepted");
  });

  it("each accepted flare moves to a new angle in 0..2pi", () => {
    const a = run(createAccretionAnim(), withP({ flare: 1 }), 3);
    assert.ok(a.flareAngle >= 0 && a.flareAngle < 2 * Math.PI);
    const first = a.flareAngle;
    run(a, withP({ flare: 1 }), 1);
    assert.notEqual(a.flareAngle, first);
  });

  it("silence and reduced motion produce no flares at all", () => {
    assert.equal(run(createAccretionAnim(), P_SILENT, 5).flaresAccepted, 0);
    assert.equal(run(createAccretionAnim(), toAccretionParams(LOUD, true), 5, true).flaresAccepted, 0);
  });
});

describe("bounds and determinism", () => {
  it("every envelope and impulse stays finite and in 0..1 over a long pseudo-random run", () => {
    let s = 7;
    const rand = () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
    const a = createAccretionAnim();
    for (let i = 0; i < 20000; i++) {
      const p = withP({ horizon: rand(), rimGlow: rand(), diskSpeed: rand(), diskTurbulence: rand(), diskColour: rand(), detail: rand(), exposure: rand(), jet: rand() < 0.1 ? rand() : 0, flare: rand() < 0.1 ? rand() : 0, sceneLevel: rand(), motion: rand() });
      stepAccretionAnim(a, p, rand() * 0.07, rand() < 0.2);
      for (const k of ["horizon", "rimGlow", "diskSpeed", "diskTurbulence", "diskColour", "detail", "exposure", "sceneLevel", "motion", "jet", "flare"] as const) {
        assert.ok(Number.isFinite(a[k]) && a[k] >= 0 && a[k] <= 1, `${k} = ${a[k]}`);
      }
      assert.ok(Number.isFinite(a.diskPhase) && Number.isFinite(a.orbit) && Number.isFinite(a.time));
    }
  });

  it("invalid params cannot poison the state", () => {
    const a = createAccretionAnim();
    const bad = withP({ exposure: NaN, jet: Infinity, flare: NaN, diskSpeed: -5 });
    run(a, bad, 1);
    assert.ok(Number.isFinite(a.exposure) && Number.isFinite(a.jet) && Number.isFinite(a.flare) && Number.isFinite(a.diskPhase));
    assert.ok(a.jet <= 1 && a.diskSpeed >= 0);
  });

  it("the same inputs give the same state", () => {
    const seq = (a: AccretionAnim) => {
      for (let i = 0; i < 500; i++) stepAccretionAnim(a, withP({ jet: i % 31 === 0 ? 0.7 : 0, flare: i % 17 === 0 ? 0.8 : 0, diskSpeed: (i % 50) / 50 }), DT * (1 + (i % 3) * 0.1), i % 97 === 0);
      return a;
    };
    assert.deepEqual(seq(createAccretionAnim()), seq(createAccretionAnim()));
  });
});
