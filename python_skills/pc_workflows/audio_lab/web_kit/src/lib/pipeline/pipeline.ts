import { IDLE_FRAME, type AudioFeatureFrame, type SceneState } from "./contract";
import type { FeatureSource, SourceKind } from "./source";

/**
 * The audio pipeline: owns one active source, runs the frame loop, and publishes two kinds of change.
 *
 *  - Frames (up to 60 per second): onFrame(cb), or read `frame` at any time. No React state is involved.
 *  - Coarse state (rare): the source, whether it plays, its duration, the scene state, an error.
 *    getState()/subscribe() are shaped for useSyncExternalStore.
 *
 * It knows nothing about renderers. Consumers never touch sources; sources never touch consumers.
 */

export interface Scheduler {
  request(cb: (nowMs: number) => void): number;
  cancel(handle: number): void;
}

export const browserScheduler: Scheduler = {
  request: (cb) => requestAnimationFrame(cb),
  cancel: (h) => cancelAnimationFrame(h),
};

export interface SourceInfo {
  readonly id: string;
  readonly kind: SourceKind;
  readonly label: string;
  readonly canSeek: boolean;
}

export interface PipelineState {
  readonly source: SourceInfo | null;
  readonly isPlaying: boolean;
  /** Seconds; null when there is no source or the length is unknown. */
  readonly duration: number | null;
  readonly scene: SceneState;
  readonly latencyMs: number;
  readonly error: string | null;
}

const IDLE_STATE: PipelineState = Object.freeze({
  source: null,
  isPlaying: false,
  duration: null,
  scene: "rest",
  latencyMs: 0,
  error: null,
});

export class AudioPipeline {
  private src: FeatureSource | null = null;
  private unsubStatus: (() => void) | null = null;
  private current: AudioFeatureFrame = IDLE_FRAME;
  private state: PipelineState = IDLE_STATE;
  private readonly frameCbs = new Set<(f: AudioFeatureFrame) => void>();
  private readonly stateCbs = new Set<() => void>();
  private handle: number | null = null;
  private nudgeMs = 0;

  constructor(private readonly scheduler: Scheduler = browserScheduler) {}

  /** The latest frame. Safe to read from any callback; frames are frozen. */
  get frame(): AudioFeatureFrame {
    return this.current;
  }

  get source(): FeatureSource | null {
    return this.src;
  }

  // ---- source -----------------------------------------------------------------------------------

  /** Replace the active source (null clears it). The previous source is disposed. The new one is not started. */
  setSource(next: FeatureSource | null): void {
    if (next === this.src) return;
    this.unsubStatus?.();
    this.unsubStatus = null;
    this.src?.dispose();
    this.src = next;
    this.current = IDLE_FRAME;
    if (next) {
      next.setSyncNudge?.(this.nudgeMs);
      this.unsubStatus = next.onStatus(() => this.refreshStatus());
    }
    this.setState(this.derive(IDLE_FRAME));
  }

  async play(): Promise<void> {
    const s = this.src;
    if (!s) return;
    try {
      await s.play();
    } catch (e) {
      if (s === this.src) this.setState({ ...this.state, error: s.status().error ?? "Playback could not start. Press play again." });
      return;
    }
    if (s === this.src) this.refreshStatus();
  }

  pause(): void {
    this.src?.pause();
  }

  async toggle(): Promise<void> {
    if (this.src?.status().playing) this.pause();
    else await this.play();
  }

  seek(t: number): void {
    this.src?.seek(t);
  }

  /** Extra delay in milliseconds applied to the active source and to any source set later. */
  setSyncNudge(ms: number): void {
    this.nudgeMs = ms;
    this.src?.setSyncNudge?.(ms);
  }

  // ---- frames -----------------------------------------------------------------------------------

  /** Subscribe to every frame. Returns an unsubscribe function. */
  onFrame(cb: (f: AudioFeatureFrame) => void): () => void {
    this.frameCbs.add(cb);
    return () => this.frameCbs.delete(cb);
  }

  /** Start the frame loop. Safe to call twice. */
  start(): void {
    if (this.handle !== null) return;
    const loop = (nowMs: number) => {
      this.tick(nowMs);
      this.handle = this.scheduler.request(loop);
    };
    this.handle = this.scheduler.request(loop);
  }

  stop(): void {
    if (this.handle !== null) this.scheduler.cancel(this.handle);
    this.handle = null;
  }

  /** One step of the loop. Public so tests can drive it with a fake clock. */
  tick(nowMs: number): void {
    let f = IDLE_FRAME;
    if (this.src) {
      try {
        f = this.src.sample(nowMs / 1000);
      } catch (e) {
        this.setState({ ...this.state, error: e instanceof Error ? e.message : "The audio source failed." });
        f = IDLE_FRAME;
      }
    }
    this.current = f;
    const next = this.derive(f);
    if (next.isPlaying !== this.state.isPlaying || next.scene !== this.state.scene || next.latencyMs !== this.state.latencyMs) {
      this.setState({ ...this.state, isPlaying: next.isPlaying, scene: next.scene, latencyMs: next.latencyMs });
    }
    for (const cb of [...this.frameCbs]) cb(f);
  }

  // ---- coarse state -----------------------------------------------------------------------------

  getState = (): PipelineState => this.state;

  subscribe = (cb: () => void): (() => void) => {
    this.stateCbs.add(cb);
    return () => this.stateCbs.delete(cb);
  };

  private refreshStatus(): void {
    const s = this.src;
    if (!s) return;
    const st = s.status();
    if (st.playing !== this.state.isPlaying || st.duration !== this.state.duration || st.error !== this.state.error) {
      this.setState({ ...this.state, isPlaying: st.playing, duration: st.duration, error: st.error });
    }
  }

  private derive(f: AudioFeatureFrame): PipelineState {
    const s = this.src;
    if (!s) return IDLE_STATE;
    const st = s.status();
    return Object.freeze({
      source: Object.freeze({ id: s.id, kind: s.kind, label: s.label, canSeek: s.canSeek }),
      isPlaying: f.isPlaying,
      duration: st.duration,
      scene: f.currentSceneState,
      latencyMs: s.latencyMs,
      error: st.error,
    });
  }

  private setState(next: PipelineState): void {
    this.state = Object.freeze({ ...next });
    for (const cb of [...this.stateCbs]) cb();
  }
}
