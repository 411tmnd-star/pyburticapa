/**
 * Lifecycle rules for the WebGL host, as pure functions. No DOM, no Three.js, so every rule is unit-tested in Node.
 *
 * The host draws only when `drawable(state)` is true. Events move the state; `describeGl` names it for the UI.
 */

/** Largest device-pixel ratio the 3D view uses. PROPOSED: a fill-rate budget for integrated GPUs (see the architecture report). */
export const MAX_PIXEL_RATIO = 1.5;
/** Smallest ratio, so a zoomed-out page does not render at an unusably low resolution. PROPOSED. */
export const MIN_PIXEL_RATIO = 0.5;

export interface GlState {
  /** Disposed hosts never draw again. This is final. */
  readonly disposed: boolean;
  /** WebGL could not be created on this device or browser. */
  readonly unsupported: boolean;
  /** The GPU context was lost and not yet restored. */
  readonly lost: boolean;
  /** The document is hidden. */
  readonly hidden: boolean;
  /** The consumer has marked the host inactive (for example, another visualizer is shown). */
  readonly inactive: boolean;
}

export type GlStatus = "ready" | "inactive" | "hidden" | "lost" | "unsupported" | "disposed";

export type GlEvent =
  | { readonly type: "unsupported" }
  | { readonly type: "lost" }
  | { readonly type: "restored" }
  | { readonly type: "hidden"; readonly value: boolean }
  | { readonly type: "active"; readonly value: boolean }
  | { readonly type: "disposed" };

export const INITIAL_GL_STATE: GlState = Object.freeze({
  disposed: false,
  unsupported: false,
  lost: false,
  hidden: false,
  inactive: false,
});

/** Applies one event. A disposed state is absorbing: nothing revives it. */
export function reduceGl(s: GlState, e: GlEvent): GlState {
  if (s.disposed) return s;
  switch (e.type) {
    case "disposed":
      return Object.freeze({ ...s, disposed: true });
    case "unsupported":
      return Object.freeze({ ...s, unsupported: true });
    case "lost":
      return Object.freeze({ ...s, lost: true });
    case "restored":
      // A restore cannot bring back an unsupported renderer.
      return s.lost ? Object.freeze({ ...s, lost: false }) : s;
    case "hidden":
      return s.hidden === e.value ? s : Object.freeze({ ...s, hidden: e.value });
    case "active":
      // The event carries "active"; the state stores "inactive".
      return s.inactive === !e.value ? s : Object.freeze({ ...s, inactive: !e.value });
  }
}

/** True only when the host may draw a frame. */
export function drawable(s: GlState): boolean {
  return !s.disposed && !s.unsupported && !s.lost && !s.hidden && !s.inactive;
}

/** Names the state. The priority order matters: a disposed host is never described as lost. */
export function describeGl(s: GlState): GlStatus {
  if (s.disposed) return "disposed";
  if (s.unsupported) return "unsupported";
  if (s.lost) return "lost";
  if (s.hidden) return "hidden";
  if (s.inactive) return "inactive";
  return "ready";
}

/**
 * The device-pixel ratio to render at. Invalid values (NaN, zero, negative, infinite) fall back to 1,
 * and valid values are clamped to [MIN_PIXEL_RATIO, cap].
 */
export function resolvePixelRatio(devicePixelRatio: number, cap: number = MAX_PIXEL_RATIO): number {
  if (!Number.isFinite(devicePixelRatio) || devicePixelRatio <= 0) return 1;
  return Math.min(cap, Math.max(MIN_PIXEL_RATIO, devicePixelRatio));
}

/**
 * Backing-store size in device pixels for a CSS size. This is the same rule Three.js applies
 * (floor of CSS size times ratio), so the browser check can compare the canvas against it.
 */
export function drawSize(cssWidth: number, cssHeight: number, pixelRatio: number): { width: number; height: number } {
  return {
    width: Math.max(1, Math.floor(cssWidth * pixelRatio)),
    height: Math.max(1, Math.floor(cssHeight * pixelRatio)),
  };
}
