import type { Playhead } from "./source";

class Emitter {
  private cbs = new Set<() => void>();
  on(cb: () => void): () => void {
    this.cbs.add(cb);
    return () => this.cbs.delete(cb);
  }
  emit(): void {
    for (const cb of [...this.cbs]) cb();
  }
}

/** A clock with no audio: time advances while playing. Used for silent offline tracks and the demo signal. */
export class SilentPlayhead implements Playhead {
  readonly canSeek: boolean;
  readonly error = null;
  private readonly em = new Emitter();
  private base = 0;
  private startedMs = 0;
  private isPlaying = false;

  /** `now` is a millisecond clock (performance.now in the browser); injected so tests control time. */
  constructor(
    readonly duration: number | null,
    private readonly now: () => number,
  ) {
    this.canSeek = duration !== null;
  }

  private position(): number {
    const t = this.isPlaying ? this.base + (this.now() - this.startedMs) / 1000 : this.base;
    return this.duration === null ? t : Math.min(t, this.duration);
  }

  /** Stops at the end of a bounded track, once. */
  private settle(): void {
    if (this.isPlaying && this.duration !== null && this.position() >= this.duration) {
      this.base = this.duration;
      this.isPlaying = false;
      this.em.emit();
    }
  }

  get time(): number {
    this.settle();
    return this.position();
  }

  get playing(): boolean {
    this.settle();
    return this.isPlaying;
  }

  async play(): Promise<void> {
    if (this.isPlaying) return;
    if (this.duration !== null && this.base >= this.duration) this.base = 0; // replay from the start
    this.startedMs = this.now();
    this.isPlaying = true;
    this.em.emit();
  }

  pause(): void {
    if (!this.isPlaying) return;
    this.base = this.position();
    this.isPlaying = false;
    this.em.emit();
  }

  seek(t: number): void {
    if (!this.canSeek) return;
    this.base = Math.min(Math.max(t, 0), this.duration ?? t);
    this.startedMs = this.now();
    this.em.emit();
  }

  onChange(cb: () => void): () => void {
    return this.em.on(cb);
  }

  dispose(): void {
    this.isPlaying = false;
  }
}

/** Playback through an HTMLAudioElement (a media element, not a rendering API). */
export class ElementPlayhead implements Playhead {
  readonly element: HTMLAudioElement;
  readonly canSeek = true;
  error: string | null = null;
  private readonly em = new Emitter();
  private readonly detach: Array<() => void> = [];

  constructor(url: string) {
    this.element = new Audio();
    this.element.preload = "auto";
    this.element.src = url;
    const on = (name: string, fn: () => void) => {
      this.element.addEventListener(name, fn);
      this.detach.push(() => this.element.removeEventListener(name, fn));
    };
    on("loadedmetadata", () => this.em.emit());
    on("play", () => this.em.emit());
    on("pause", () => this.em.emit());
    on("ended", () => this.em.emit());
    on("error", () => {
      this.error = "This audio could not be loaded or decoded. Try an MP3, M4A, WAV or OGG.";
      this.em.emit();
    });
  }

  get time(): number {
    return this.element.currentTime;
  }

  get duration(): number | null {
    return Number.isFinite(this.element.duration) ? this.element.duration : null;
  }

  get playing(): boolean {
    return !this.element.paused && !this.element.ended;
  }

  async play(): Promise<void> {
    await this.element.play();
  }

  pause(): void {
    this.element.pause();
  }

  seek(t: number): void {
    const d = this.duration;
    this.element.currentTime = Math.min(Math.max(t, 0), d ?? t);
  }

  onChange(cb: () => void): () => void {
    return this.em.on(cb);
  }

  dispose(): void {
    this.element.pause();
    for (const d of this.detach) d();
    this.element.removeAttribute("src");
    this.element.load();
  }
}
