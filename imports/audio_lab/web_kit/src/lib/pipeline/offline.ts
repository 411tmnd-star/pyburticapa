import { decodeCurves, parseManifest, parseTimeline } from "../motion/parse";
import { sceneAt } from "../motion/scene";
import type { Curves, Manifest, ManifestSong, WebTimeline } from "../motion/types";
import { FeatureComputer } from "./computer";
import { makeFrame, type AudioFeatureFrame } from "./contract";
import { decodeFeatureChannels, parseFeaturesMeta, type FeaturesMeta, type Readings } from "./features-bundle";
import { ElementPlayhead, SilentPlayhead } from "./playhead";
import type { FeatureSource, Playhead, SourceStatus } from "./source";

/** Everything an offline source needs, already parsed and validated. */
export interface OfflineData {
  id: string;
  label: string;
  timeline: WebTimeline;
  curves: Curves;
  meta: FeaturesMeta;
  readings: Readings;
  /** Audio to play alongside, or null for a silent clock. */
  audioUrl: string | null;
}

/** A jump of more than this many seconds between samples is a seek, not continuous playback. */
const SEEK_GAP_S = 0.25;

/**
 * A pre-computed track. Its readings were captured from the audio ahead of time and are run through the same
 * FeatureComputer as live audio, once, when the source is created. Playing it back is then a lookup by time,
 * so seeking is exact and costs nothing. The scene state comes from the AudioLab motion timeline.
 *
 * It does not touch Web Audio, the canvas or the DOM. With no `audioUrl` it runs on a silent clock.
 */
export class OfflineSource implements FeatureSource {
  readonly kind = "offline" as const;
  readonly id: string;
  readonly label: string;
  readonly canSeek = true;
  readonly latencyMs = 0;
  /** The motion timeline and its property curves, for consumers that want them (the contract does not include them). */
  readonly motion: { timeline: WebTimeline; curves: Curves };
  readonly beats: readonly number[];

  private readonly head: Playhead;
  private readonly rate: number;
  private readonly n: number;
  private readonly timeline: WebTimeline;
  private readonly cols: Record<"bass" | "mid" | "high" | "rms" | "onset" | "hit", Float32Array>;
  private readonly beatFlag: Uint8Array;
  private lastIdx = -1;
  private nudgeS = 0;

  constructor(data: OfflineData, now: () => number) {
    this.id = data.id;
    this.label = data.label;
    this.timeline = data.timeline;
    this.motion = { timeline: data.timeline, curves: data.curves };
    this.beats = data.meta.beats;
    this.rate = data.meta.rateHz;
    this.n = data.meta.nFrames;
    this.head = data.audioUrl ? new ElementPlayhead(data.audioUrl) : new SilentPlayhead(data.timeline.durationS, now);

    const n = this.n;
    this.cols = {
      bass: new Float32Array(n),
      mid: new Float32Array(n),
      high: new Float32Array(n),
      rms: new Float32Array(n),
      onset: new Float32Array(n),
      hit: new Float32Array(n),
    };
    this.beatFlag = new Uint8Array(n);
    const computer = new FeatureComputer();
    const dt = 1 / this.rate;
    const r = data.readings;
    for (let i = 0; i < n; i++) {
      const f = computer.push(
        { lowDb: r.lowDb[i], punchDb: r.punchDb[i], midDb: r.midDb[i], highDb: r.highDb[i], allDb: r.allDb[i], flux: r.flux[i] },
        i * dt,
        dt,
      );
      this.cols.bass[i] = f.bass;
      this.cols.mid[i] = f.mid;
      this.cols.high[i] = f.high;
      this.cols.rms[i] = f.rmsEnergy;
      this.cols.onset[i] = f.onsetStrength;
      this.cols.hit[i] = f.bassHit;
      this.beatFlag[i] = f.beatDetected ? 1 : 0;
    }
  }

  sample(_nowS: number): AudioFeatureFrame {
    const t = this.head.time;
    const playing = this.head.playing;
    const x = Math.max(0, t - this.nudgeS) * this.rate;
    const i0 = Math.min(this.n - 1, Math.floor(x));
    const i1 = Math.min(this.n - 1, i0 + 1);
    const a = Math.min(1, x - i0);
    const mix = (c: Float32Array) => c[i0] + (c[i1] - c[i0]) * a;

    // A beat fires on the sample where playback passes an analysis frame flagged as an onset. After a seek,
    // or while paused, nothing fires.
    let beat = false;
    if (playing && this.lastIdx >= 0 && i0 > this.lastIdx && i0 - this.lastIdx < SEEK_GAP_S * this.rate) {
      for (let i = this.lastIdx + 1; i <= i0; i++) if (this.beatFlag[i]) beat = true;
    }
    this.lastIdx = i0;

    const duration = this.timeline.durationS;
    return makeFrame({
      time: t,
      progress: duration > 0 ? t / duration : 0,
      isPlaying: playing,
      bass: mix(this.cols.bass),
      mid: mix(this.cols.mid),
      high: mix(this.cols.high),
      rmsEnergy: mix(this.cols.rms),
      onsetStrength: this.cols.onset[i0],
      beatDetected: beat,
      currentSceneState: sceneAt(this.timeline, t).state,
      bassHit: mix(this.cols.hit),
    });
  }

  async play(): Promise<void> {
    await this.head.play();
  }

  pause(): void {
    this.head.pause();
  }

  seek(t: number): void {
    this.head.seek(t);
    this.lastIdx = -1;
  }

  status(): SourceStatus {
    return { playing: this.head.playing, duration: this.timeline.durationS, error: this.head.error };
  }

  onStatus(cb: () => void): () => void {
    return this.head.onChange(cb);
  }

  setSyncNudge(ms: number): void {
    this.nudgeS = Math.max(-0.2, Math.min(0.4, ms / 1000));
  }

  dispose(): void {
    this.head.dispose();
  }
}

export interface LoadOptions {
  manifestUrl: string;
  songId: string;
  /** Motion profile whose scene states are used. Defaults to the first one the song has. */
  profileId?: string;
  now?: () => number;
  signal?: AbortSignal;
}

async function getJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const r = await fetch(url, { signal });
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r.json();
}

async function getBuffer(url: string, signal?: AbortSignal): Promise<ArrayBuffer> {
  const r = await fetch(url, { signal });
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r.arrayBuffer();
}

export async function fetchManifest(manifestUrl: string, signal?: AbortSignal): Promise<Manifest> {
  return parseManifest(await getJson(manifestUrl, signal));
}

/** Songs in a manifest that can feed the audio pipeline (they ship a features bundle). */
export function pipelineSongs(manifest: Manifest): ManifestSong[] {
  return manifest.songs.filter((s) => s.features !== null);
}

/** Fetch, validate and build an offline source. Throws a ParseError naming the field if the bundle is malformed. */
export async function loadOfflineSource(o: LoadOptions): Promise<OfflineSource> {
  const manifest = await fetchManifest(o.manifestUrl, o.signal);
  const song = manifest.songs.find((s) => s.id === o.songId);
  if (!song) throw new Error(`song "${o.songId}" is not in the manifest`);
  if (!song.features) throw new Error(`song "${o.songId}" has no features bundle; re-run export_web.py with a "source" audio file`);
  const profile = song.profiles.find((p) => p.id === (o.profileId ?? song.profiles[0].id));
  if (!profile) throw new Error(`song "${o.songId}" has no profile "${o.profileId}"`);

  const [tlJson, curveBuf, metaJson, featBuf] = await Promise.all([
    getJson(profile.timeline, o.signal),
    getBuffer(profile.curves, o.signal),
    getJson(song.features.meta, o.signal),
    getBuffer(song.features.bin, o.signal),
  ]);
  const timeline = parseTimeline(tlJson);
  const curves = decodeCurves(curveBuf, timeline);
  const meta = parseFeaturesMeta(metaJson);
  const readings = decodeFeatureChannels(featBuf, meta);
  if (Math.abs(meta.durationS - timeline.durationS) > 0.25) {
    throw new Error(`features (${meta.durationS.toFixed(2)} s) and timeline (${timeline.durationS.toFixed(2)} s) are for different audio`);
  }
  const now = o.now ?? (() => performance.now());
  return new OfflineSource(
    { id: `offline:${song.id}`, label: song.title, timeline, curves, meta, readings, audioUrl: song.audio?.src ?? null },
    now,
  );
}
