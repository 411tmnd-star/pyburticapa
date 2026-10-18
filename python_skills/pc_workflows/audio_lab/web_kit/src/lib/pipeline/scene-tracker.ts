import { follow } from "../audio/features";
import type { SceneState } from "./contract";

/**
 * A causal scene-state tracker for audio that has no pre-computed timeline (live and demo sources).
 * It has the same four states as the AudioLab motion timeline but is a deliberately simpler machine:
 * a slow energy envelope with hysteresis, a minimum dwell time and a rising/falling trend. It is not a
 * port of the Python state machine, so its boundaries will differ from an offline track's.
 */
export interface SceneTrackerOptions {
  /** Below this slow energy the scene is at rest; rising above restExit leaves rest. */
  restEnter: number;
  restExit: number;
  /** Slow energy needed to count as active, and the level below which active gives way to settle. */
  activeEnter: number;
  activeExit: number;
  /** A state must last this long before it can change. */
  minDwellS: number;
  /** Window over which the energy trend is measured. */
  slopeWindowS: number;
  /** A trend below this (per second) ends an active scene. */
  settleSlope: number;
}

export const SCENE_DEFAULTS: SceneTrackerOptions = {
  restEnter: 0.1,
  restExit: 0.16,
  activeEnter: 0.42,
  activeExit: 0.3,
  minDwellS: 1.5,
  slopeWindowS: 1.5,
  settleSlope: -0.08,
};

export class SceneTracker {
  state: SceneState = "rest";
  private readonly o: SceneTrackerOptions;
  private energy = 0;
  private dwell = 0;
  private hist: Array<[number, number]> = []; // [time, energy]
  private clock = 0;

  constructor(opts: Partial<SceneTrackerOptions> = {}) {
    this.o = { ...SCENE_DEFAULTS, ...opts };
  }

  reset(): void {
    this.state = "rest";
    this.energy = 0;
    this.dwell = 0;
    this.hist = [];
    this.clock = 0;
  }

  /** `rms` is the overall loudness 0..1; `dt` the seconds since the previous call. Call only while playing. */
  push(rms: number, dt: number): SceneState {
    this.clock += dt;
    this.dwell += dt;
    this.energy = follow(this.energy, rms, dt, 0.8, 1.5);
    this.hist.push([this.clock, this.energy]);
    while (this.hist.length > 1 && this.clock - this.hist[0][0] > this.o.slopeWindowS * 1.5) this.hist.shift();
    const slope = this.slope();
    const E = this.energy;
    const o = this.o;
    let next = this.state;
    if (this.dwell >= o.minDwellS) {
      switch (this.state) {
        case "rest":
          if (E > o.restExit) next = "build";
          break;
        case "build":
          if (E < o.restEnter) next = "rest";
          else if (E > o.activeEnter) next = "active";
          break;
        case "active":
          if (E < o.activeExit || slope < o.settleSlope) next = "settle";
          break;
        case "settle":
          if (E < o.restEnter) next = "rest";
          else if (E > o.activeEnter && slope >= 0) next = "active";
          else if (slope > 0.04 && E > o.restExit) next = "build";
          break;
      }
    }
    if (next !== this.state) {
      this.state = next;
      this.dwell = 0;
    }
    return this.state;
  }

  private slope(): number {
    const target = this.clock - this.o.slopeWindowS;
    if (this.hist[0][0] > target) return 0; // not enough history yet
    let ref = this.hist[0];
    for (const h of this.hist) {
      if (h[0] <= target) ref = h;
      else break;
    }
    return (this.energy - ref[1]) / Math.max(1e-3, this.clock - ref[0]);
  }
}
