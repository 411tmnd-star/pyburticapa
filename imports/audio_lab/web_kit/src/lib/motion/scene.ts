import type { Curves, Phase, SceneSpan, WebAction, WebTimeline } from "./types";

/** Index of the scene span containing time t (clamped to the first/last span). Binary search. */
export function sceneIndexAt(states: readonly SceneSpan[], t: number): number {
  let lo = 0;
  let hi = states.length - 1;
  if (t <= states[0].start) return 0;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (states[mid].start <= t) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

export function sceneAt(timeline: WebTimeline, t: number): SceneSpan {
  return timeline.states[sceneIndexAt(timeline.states, t)];
}

/**
 * What an action is doing at time t, or null if t is outside [start, end].
 *   anticipating  before the musical event (visual preparation); only for event actions with source > start
 *   rising        from the event (or start) to the visual peak
 *   holding       between the peak and settle
 *   releasing     between settle and end
 *   following     a continuous action tracking a control channel
 */
export function actionPhase(a: WebAction, t: number): Phase | null {
  if (t < a.start || t > a.end) return null;
  if (a.kind === "continuous" || a.peak === null || a.settle === null) return "following";
  if (a.source !== null && t < a.source - 1e-9 && a.policy === "anticipatory") return "anticipating";
  if (t < a.peak) return "rising";
  if (t <= a.settle) return "holding";
  return "releasing";
}

/** The part of an anticipatory action that happens before its musical event, as [from, to]; else null. */
export function anticipationWindow(a: WebAction): [number, number] | null {
  return a.policy === "anticipatory" && a.source !== null && a.source > a.start + 1e-9 ? [a.start, a.source] : null;
}

/**
 * Actions active at time t. A linear scan: a timeline has a few hundred actions, so this costs
 * microseconds per frame. (Actions are sorted by start, so the scan stops at the first later start.)
 */
export function activeActions(timeline: WebTimeline, t: number): Array<{ action: WebAction; phase: Phase }> {
  const out: Array<{ action: WebAction; phase: Phase }> = [];
  for (const action of timeline.actions) {
    if (action.start > t) break;
    const phase = actionPhase(action, t);
    if (phase) out.push({ action, phase });
  }
  return out;
}

export function curveIndex(curves: Curves, track: string, property: string): number {
  return curves.keys.indexOf(`${track}.${property}`);
}

/** Linearly interpolated value of curve `index` at time t (clamped to the audio). */
export function curveValueAt(curves: Curves, index: number, t: number): number {
  if (index < 0) return 0;
  const x = Math.min(Math.max(t * curves.rateHz, 0), curves.nSamples - 1);
  const i = Math.floor(x);
  const base = index * curves.nSamples;
  const a = curves.data[base + i];
  const b = curves.data[base + Math.min(i + 1, curves.nSamples - 1)];
  return a + (b - a) * (x - i);
}
