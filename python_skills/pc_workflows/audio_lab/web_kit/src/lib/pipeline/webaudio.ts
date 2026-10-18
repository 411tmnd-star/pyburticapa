import { BANDS, bandDb, binRange } from "../audio/features";
import type { BandReading } from "./computer";
import { ElementPlayhead } from "./playhead";
import { RealtimeSource, type ReadingBackend } from "./realtime";
import type { Playhead } from "./source";

/**
 * The browser's Web Audio side of the live pipeline: two AnalyserNodes turned into BandReadings.
 * This is the only file in the pipeline that touches Web Audio, and it knows nothing about rendering.
 */

const MAIN_FFT = 2048; // mids, highs and onsets
const LOW_FFT = 4096; // the low end: at 44.1 kHz its bins are 10.8 Hz wide, enough to separate sub from punch
const ONSET_TOP_HZ = 4000;

/** Two analysers tapped from one node, read together as one BandReading. */
class AnalyserTaps {
  private readonly main: AnalyserNode;
  private readonly low: AnalyserNode;
  private readonly mainDb = new Float32Array(MAIN_FFT / 2);
  private readonly lowDb = new Float32Array(LOW_FFT / 2);
  private readonly mag = new Float32Array(MAIN_FFT / 2);
  private readonly prevMag = new Float32Array(MAIN_FFT / 2);
  private primed = false;
  private readonly r: Record<"low" | "punch" | "mid" | "high" | "all" | "onsetTop", [number, number]>;

  constructor(ctx: AudioContext) {
    this.main = ctx.createAnalyser();
    this.main.fftSize = MAIN_FFT;
    this.main.smoothingTimeConstant = 0.5;
    this.low = ctx.createAnalyser();
    this.low.fftSize = LOW_FFT;
    this.low.smoothingTimeConstant = 0;
    const sr = ctx.sampleRate;
    this.r = {
      low: binRange(BANDS.lowHz[0], BANDS.lowHz[1], sr, LOW_FFT),
      punch: binRange(BANDS.punchHz[0], BANDS.punchHz[1], sr, LOW_FFT),
      mid: binRange(BANDS.midHz[0], BANDS.midHz[1], sr, MAIN_FFT),
      high: binRange(BANDS.highHz[0], BANDS.highHz[1], sr, MAIN_FFT),
      all: binRange(BANDS.lowHz[0], BANDS.highHz[1], sr, MAIN_FFT),
      onsetTop: binRange(0, ONSET_TOP_HZ, sr, MAIN_FFT),
    };
  }

  /** Connect a node to both analysers. */
  tap(node: AudioNode): void {
    node.connect(this.main);
    node.connect(this.low);
  }

  untap(node: AudioNode): void {
    try {
      node.disconnect(this.main);
      node.disconnect(this.low);
    } catch {
      /* already disconnected */
    }
    this.primed = false;
  }

  read(): BandReading {
    this.main.getFloatFrequencyData(this.mainDb);
    this.low.getFloatFrequencyData(this.lowDb);
    let flux = 0;
    const top = this.r.onsetTop[1];
    for (let i = 0; i < this.mag.length; i++) this.mag[i] = 10 ** (this.mainDb[i] / 20);
    if (this.primed) {
      for (let i = 1; i < top; i++) {
        const d = this.mag[i] - this.prevMag[i];
        if (d > 0) flux += d;
      }
    }
    this.prevMag.set(this.mag);
    this.primed = true;
    return {
      lowDb: bandDb(this.lowDb, ...this.r.low),
      punchDb: bandDb(this.lowDb, ...this.r.punch),
      midDb: bandDb(this.mainDb, ...this.r.mid),
      highDb: bandDb(this.mainDb, ...this.r.high),
      allDb: bandDb(this.mainDb, ...this.r.all),
      flux,
    };
  }
}

/** A playhead that prepares the audio graph on the first play(), because browsers require a user gesture for that. */
class GraphPlayhead implements Playhead {
  constructor(
    private readonly inner: Playhead,
    private readonly prepare: () => Promise<void>,
  ) {}
  get time() {
    return this.inner.time;
  }
  get duration() {
    return this.inner.duration;
  }
  get playing() {
    return this.inner.playing;
  }
  get canSeek() {
    return this.inner.canSeek;
  }
  get error() {
    return this.inner.error;
  }
  async play() {
    await this.prepare();
    await this.inner.play();
  }
  pause() {
    this.inner.pause();
  }
  seek(t: number) {
    this.inner.seek(t);
  }
  onChange(cb: () => void) {
    return this.inner.onChange(cb);
  }
  dispose() {
    this.inner.dispose();
  }
}

/** Analyses an audio file or URL played through an HTMLAudioElement, and plays it to the speakers. */
class ElementBackend implements ReadingBackend {
  readonly playhead: Playhead;
  private ctx: AudioContext | null = null;
  private taps: AnalyserTaps | null = null;

  constructor(private readonly inner: ElementPlayhead) {
    this.playhead = new GraphPlayhead(inner, () => this.ensureGraph());
  }

  private async ensureGraph(): Promise<void> {
    if (!this.ctx) {
      const ctx = new AudioContext();
      const taps = new AnalyserTaps(ctx);
      const src = ctx.createMediaElementSource(this.inner.element);
      taps.tap(src);
      src.connect(ctx.destination);
      this.ctx = ctx;
      this.taps = taps;
    }
    if (this.ctx.state === "suspended") await this.ctx.resume();
  }

  read(): BandReading {
    return this.taps ? this.taps.read() : EMPTY_READING;
  }

  get latencyS(): number {
    const c = this.ctx;
    if (!c) return 0;
    const sum = (c.baseLatency ?? 0) + (c.outputLatency ?? 0);
    return Number.isFinite(sum) ? sum : 0;
  }

  dispose(): void {
    this.playhead.dispose();
    void this.ctx?.close();
  }
}

/** A microphone (or any MediaStream). It is analysed but never played back, to avoid feedback. */
class StreamPlayhead implements Playhead {
  readonly canSeek = false;
  readonly duration = null;
  error: string | null = null;
  private isPlaying = false;
  private startedAt = 0;
  private readonly cbs = new Set<() => void>();
  private stream: MediaStream | null = null;
  private node: MediaStreamAudioSourceNode | null = null;

  constructor(
    private readonly getCtx: () => AudioContext,
    private readonly taps: () => AnalyserTaps,
    private readonly constraints: MediaStreamConstraints,
  ) {}

  get time(): number {
    return this.isPlaying ? this.getCtx().currentTime - this.startedAt : 0;
  }
  get playing(): boolean {
    return this.isPlaying;
  }

  async play(): Promise<void> {
    if (this.isPlaying) return;
    try {
      this.error = null;
      const ctx = this.getCtx();
      if (ctx.state === "suspended") await ctx.resume();
      this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
      this.node = ctx.createMediaStreamSource(this.stream);
      this.taps().tap(this.node);
      this.startedAt = ctx.currentTime;
      this.isPlaying = true;
    } catch (e) {
      this.error = "The microphone is unavailable or access was denied.";
      this.emit();
      throw e;
    }
    this.emit();
  }

  pause(): void {
    if (!this.isPlaying) return;
    this.release();
    this.isPlaying = false;
    this.emit();
  }

  seek(): void {
    /* a live stream cannot seek */
  }

  onChange(cb: () => void): () => void {
    this.cbs.add(cb);
    return () => this.cbs.delete(cb);
  }

  dispose(): void {
    this.release();
    this.isPlaying = false;
  }

  private release(): void {
    if (this.node) this.taps().untap(this.node);
    this.stream?.getTracks().forEach((t) => t.stop());
    this.node = null;
    this.stream = null;
  }

  private emit(): void {
    for (const cb of [...this.cbs]) cb();
  }
}

class StreamBackend implements ReadingBackend {
  readonly latencyS = 0; // a microphone is not played back, so there is nothing to line the picture up with
  readonly playhead: Playhead;
  private readonly ctx = new AudioContext();
  private readonly taps = new AnalyserTaps(this.ctx);

  constructor(constraints: MediaStreamConstraints) {
    this.playhead = new StreamPlayhead(() => this.ctx, () => this.taps, constraints);
  }

  read(): BandReading {
    return this.taps.read();
  }

  dispose(): void {
    this.playhead.dispose();
    void this.ctx.close();
  }
}

const EMPTY_READING: BandReading = { lowDb: -120, punchDb: -120, midDb: -120, highDb: -120, allDb: -120, flux: 0 };

/** An audio file or URL, analysed live. `label` is shown to the user. */
export function createLiveUrlSource(url: string, label: string, id = `live:${label}`): RealtimeSource {
  return new RealtimeSource({ id, kind: "live", label }, new ElementBackend(new ElementPlayhead(url)));
}

/** A File chosen by the user. The caller owns the object URL returned in `revoke`. */
export function createLiveFileSource(file: File): { source: RealtimeSource; revoke: () => void } {
  const url = URL.createObjectURL(file);
  return { source: createLiveUrlSource(url, file.name, `file:${file.name}`), revoke: () => URL.revokeObjectURL(url) };
}

/** The microphone. Capture settings that process the signal are off, so the analysis sees the raw sound. */
export function createMicSource(): RealtimeSource {
  const constraints: MediaStreamConstraints = {
    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
  };
  return new RealtimeSource({ id: "mic", kind: "live", label: "Microphone" }, new StreamBackend(constraints));
}
