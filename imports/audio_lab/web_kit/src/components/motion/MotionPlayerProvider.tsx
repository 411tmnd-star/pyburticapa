"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { ClockStore } from "@/lib/motion/clock";
import { decodeCurves, parseManifest, parseTimeline } from "@/lib/motion/parse";
import { curveIndex, curveValueAt, sceneAt } from "@/lib/motion/scene";
import type { Curves, Manifest, ManifestSong, SceneState, WebTimeline } from "@/lib/motion/types";

type Status = "loading" | "ready" | "error";

export interface MotionPlayer {
  status: Status;
  error: string | null;
  /** Non-fatal problems, e.g. the audio length does not match the timeline. */
  warning: string | null;
  manifest: Manifest | null;
  song: ManifestSong | null;
  profileId: string | null;
  timeline: WebTimeline | null;
  curves: Curves | null;
  playing: boolean;
  /** True when the song ships no audio: playback runs on a silent clock so the plan can still be explored. */
  silent: boolean;
  /** The playback clock. Read it with the hooks below instead of subscribing to React state. */
  clock: ClockStore;
  selectSong: (id: string) => void;
  selectProfile: (id: string) => void;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  seek: (t: number) => void;
}

const MotionPlayerContext = createContext<MotionPlayer | null>(null);

export function useMotionPlayer(): MotionPlayer {
  const ctx = useContext(MotionPlayerContext);
  if (!ctx) throw new Error("useMotionPlayer must be used inside <MotionPlayerProvider>");
  return ctx;
}

const describe = (e: unknown): string => (e instanceof Error ? e.message : String(e));

async function fetchJson(url: string, signal: AbortSignal): Promise<unknown> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.json();
}

async function fetchBuffer(url: string, signal: AbortSignal): Promise<ArrayBuffer> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.arrayBuffer();
}

interface Loaded {
  songId: string;
  profileId: string;
  timeline: WebTimeline;
  curves: Curves;
}

/** Longest tolerated gap between the audio file and the timeline before the user is warned. */
const DURATION_TOLERANCE_S = 0.75;

export function MotionPlayerProvider({
  children,
  manifestUrl = "/motion/manifest.json",
}: {
  children: ReactNode;
  manifestUrl?: string;
}) {
  const clock = useMemo(() => new ClockStore(), []);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [songId, setSongId] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  /** performance.now() at which the silent clock read 0. */
  const silentOriginRef = useRef(0);

  const song = useMemo(() => manifest?.songs.find((s) => s.id === songId) ?? null, [manifest, songId]);
  const silent = !song?.audio;
  // Keep showing the previous timeline while a new profile loads, so the UI does not flash empty.
  const timeline = loaded?.timeline ?? null;

  // 1. The manifest.
  useEffect(() => {
    const ctl = new AbortController();
    fetchJson(manifestUrl, ctl.signal)
      .then(parseManifest)
      .then((m) => {
        setManifest(m);
        setSongId(m.songs[0].id);
        setProfileId(m.songs[0].profiles[0].id);
      })
      .catch((e) => !ctl.signal.aborted && setError(describe(e)));
    return () => ctl.abort();
  }, [manifestUrl]);

  // 2. The selected timeline and its curves (cancelled if the selection changes meanwhile).
  useEffect(() => {
    const profile = song?.profiles.find((p) => p.id === profileId);
    if (!song || !profile) return;
    const ctl = new AbortController();
    (async () => {
      const [tl, buf] = await Promise.all([
        fetchJson(profile.timeline, ctl.signal).then(parseTimeline),
        fetchBuffer(profile.curves, ctl.signal),
      ]);
      const curves = decodeCurves(buf, tl);
      if (ctl.signal.aborted) return;
      setLoaded({ songId: song.id, profileId: profile.id, timeline: tl, curves });
      setError(null);
    })().catch((e) => !ctl.signal.aborted && setError(describe(e)));
    return () => ctl.abort();
  }, [song, profileId]);

  // 3. The audio element for the selected song.
  useEffect(() => {
    if (!song?.audio) {
      audioRef.current = null;
      return;
    }
    const audio = new Audio(song.audio.src);
    audio.preload = "auto";
    audioRef.current = audio;
    const onEnded = () => setPlaying(false);
    const onError = () => setError(`Could not load audio from ${song.audio?.src}`);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, [song]);

  // Warn if the audio and the timeline are not the same length: every marker would drift.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !timeline) return setWarning(null);
    const check = () => {
      const off = Math.abs(audio.duration - timeline.durationS);
      setWarning(off > DURATION_TOLERANCE_S ? `This audio is ${audio.duration.toFixed(1)} s but the timeline was planned for ${timeline.durationS.toFixed(1)} s. Markers will not line up.` : null);
    };
    if (Number.isFinite(audio.duration)) check();
    audio.addEventListener("loadedmetadata", check);
    return () => audio.removeEventListener("loadedmetadata", check);
  }, [timeline, song]);

  const seek = useCallback(
    (t: number) => {
      const duration = timeline?.durationS ?? 0;
      const next = Math.min(Math.max(t, 0), duration);
      if (audioRef.current) audioRef.current.currentTime = next;
      silentOriginRef.current = performance.now() - next * 1000;
      clock.set(next);
    },
    [clock, timeline],
  );

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      clock.set(audio.currentTime);
    }
    setPlaying(false);
  }, [clock]);

  const play = useCallback(async () => {
    if (!timeline) return;
    if (clock.getTime() >= timeline.durationS - 0.05) seek(0);
    const audio = audioRef.current;
    if (audio) {
      try {
        await audio.play(); // must be called from a user gesture; the browser may refuse otherwise
      } catch {
        setError("The browser blocked audio playback. Press play again.");
        return;
      }
    } else {
      silentOriginRef.current = performance.now() - clock.getTime() * 1000;
    }
    setError(null);
    setPlaying(true);
  }, [clock, seek, timeline]);

  const toggle = useCallback(() => (playing ? pause() : void play()), [pause, play, playing]);

  // 4. The frame loop: the audio element's clock is the truth; the silent clock is performance.now().
  useEffect(() => {
    if (!playing || !timeline) return;
    let raf = 0;
    const tick = () => {
      const audio = audioRef.current;
      const t = audio ? audio.currentTime : (performance.now() - silentOriginRef.current) / 1000;
      if (t >= timeline.durationS) {
        audio?.pause();
        clock.set(timeline.durationS);
        setPlaying(false);
        return;
      }
      clock.set(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, timeline, clock]);

  const selectSong = useCallback(
    (id: string) => {
      const next = manifest?.songs.find((s) => s.id === id);
      if (!next || next.id === songId) return;
      pause();
      clock.set(0);
      setLoaded(null);
      setSongId(next.id);
      // Keep the same profile if the new song has it.
      setProfileId((cur) => (next.profiles.some((p) => p.id === cur) ? cur : next.profiles[0].id));
    },
    [clock, manifest, pause, songId],
  );

  const selectProfile = useCallback((id: string) => setProfileId(id), []);

  const status: Status = error && !loaded ? "error" : loaded ? "ready" : "loading";
  const value = useMemo<MotionPlayer>(
    () => ({
      status, error, warning, manifest, song, profileId, timeline, curves: loaded?.curves ?? null,
      playing, silent, clock, selectSong, selectProfile, play, pause, toggle, seek,
    }),
    [status, error, warning, manifest, song, profileId, timeline, loaded, playing, silent, clock, selectSong, selectProfile, play, pause, toggle, seek],
  );

  return <MotionPlayerContext.Provider value={value}>{children}</MotionPlayerContext.Provider>;
}

// ---- hooks ---------------------------------------------------------------------------------------

/**
 * The current scene state (rest | build | active | settle), or null before a timeline is loaded.
 * Re-renders only when the state changes (a few times a minute), not every frame.
 */
export function useSceneState(): SceneState | null {
  const { clock, timeline } = useMotionPlayer();
  return useSyncExternalStore(
    clock.subscribe,
    () => (timeline ? sceneAt(timeline, clock.getTime()).state : null),
    () => null,
  );
}

/**
 * Run `callback(t)` on every clock tick (animation frame while playing, and on every seek), with no
 * re-render. It also runs once immediately and again whenever `deps` change, so a paused view
 * (e.g. after the scrubber is resized or a new timeline loads) is always drawn for the current time.
 */
export function useMotionFrame(callback: (t: number) => void, deps: readonly unknown[] = []): void {
  const { clock } = useMotionPlayer();
  const latest = useRef(callback);
  latest.current = callback;
  useEffect(() => {
    latest.current(clock.getTime());
    return clock.subscribe(() => latest.current(clock.getTime()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clock, ...deps]);
}

/** `prefers-reduced-motion: reduce`. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** Properties that pulse quickly. They are held at 0 for people who prefer reduced motion. */
const IMPULSIVE = new Set(["accent", "shake", "punch", "burst", "color_shift"]);

/**
 * Publish every property curve as a CSS custom property on `ref` each frame, without re-rendering:
 *   --motion-<track>-<property>   a number in [0, 1], e.g. --motion-main_element-scale
 * Use them in Tailwind with arbitrary values, e.g. `opacity-[var(--motion-particles-density)]`,
 * `scale-[calc(1+var(--motion-main_element-scale)*0.15)]`, or as shader uniforms in a canvas.
 */
export function useMotionCssVars(ref: { current: HTMLElement | null }): void {
  const { timeline, curves } = useMotionPlayer();
  const reduced = usePrefersReducedMotion();
  const vars = useMemo(
    () =>
      timeline && curves
        ? timeline.tracks.flatMap((tr) =>
            tr.properties.map((p) => ({
              name: `--motion-${tr.name}-${p.name}`,
              index: curveIndex(curves, tr.name, p.name),
              max: p.max,
              mute: reduced && IMPULSIVE.has(p.name),
            })),
          )
        : [],
    [timeline, curves, reduced],
  );
  useMotionFrame((t) => {
    const el = ref.current;
    if (!el || !curves) return;
    for (const v of vars) el.style.setProperty(v.name, v.mute ? "0" : (curveValueAt(curves, v.index, t) / v.max).toFixed(3));
  }, [vars, curves]);
}
