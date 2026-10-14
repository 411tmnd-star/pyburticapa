"use client";

import { useEffect, useRef, useState } from "react";

import { createLiveFileSource, createMicSource, createSyntheticSource, fetchManifest, loadOfflineSource, pipelineSongs } from "@/lib/pipeline";
import type { FeatureSource } from "@/lib/pipeline";
import { useAudioFrame, useAudioPipeline, usePipelineState } from "@/lib/pipeline/react";
import type { ManifestSong } from "@/lib/motion/types";

/**
 * Controls for the audio pipeline. This is the only place that builds sources; the visual components never
 * do. Swapping what feeds the pipeline is one setSource() call, and nothing that draws has to change.
 */

const MANIFEST_URL = "/motion/manifest.json";
const DEMO_BPM = 120;

const fmt = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;

type ChipState = "none" | "paused" | "silent" | "quiet" | "playing";
const CHIP_TEXT: Record<ChipState, string> = {
  none: "Pick a source to begin",
  paused: "Paused",
  silent: "Silent: resting",
  quiet: "Quiet: low energy",
  playing: "Playing",
};

export function SourcePicker() {
  const p = useAudioPipeline();
  const state = usePipelineState();
  const [songs, setSongs] = useState<ManifestSong[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const revokeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    fetchManifest(MANIFEST_URL, ac.signal)
      .then((m) => setSongs(pipelineSongs(m)))
      .catch(() => setSongs([])); // no pre-computed tracks available: the other sources still work
    return () => ac.abort();
  }, []);

  useEffect(() => () => revokeRef.current?.(), []);

  const use = (source: FeatureSource, revoke: (() => void) | null, autoplay: boolean) => {
    const previous = revokeRef.current;
    p.setSource(source);
    previous?.();
    revokeRef.current = revoke;
    setProblem(null);
    if (autoplay) void p.play();
  };

  const pickSong = async (song: ManifestSong) => {
    setBusy(song.id);
    setProblem(null);
    try {
      use(await loadOfflineSource({ manifestUrl: MANIFEST_URL, songId: song.id }), null, true);
    } catch (e) {
      setProblem(e instanceof Error ? e.message : "Could not load this track.");
    } finally {
      setBusy(null);
    }
  };

  const active = state.source?.id ?? null;
  const btn =
    "rounded-full px-3 py-1 text-sm text-slate-300 transition aria-pressed:bg-white aria-pressed:text-slate-900 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none disabled:opacity-50";

  return (
    <div role="group" aria-label="Audio source" className="flex flex-wrap items-center gap-2">
      <div className="inline-flex flex-wrap gap-1 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
        <button
          type="button"
          data-source="demo"
          aria-pressed={active === "demo"}
          className={btn}
          onClick={() => use(createSyntheticSource(() => performance.now(), DEMO_BPM), null, true)}
        >
          Demo
        </button>
        {songs.map((s) => (
          <button
            key={s.id}
            type="button"
            data-source={`song:${s.id}`}
            aria-pressed={active === `offline:${s.id}`}
            className={btn}
            disabled={busy !== null}
            title="Pre-computed track"
            onClick={() => void pickSong(s)}
          >
            {busy === s.id ? "Loading…" : s.title.split(" - ")[0]}
          </button>
        ))}
        <button
          type="button"
          data-source="mic"
          aria-pressed={active === "mic"}
          className={btn}
          onClick={() => use(createMicSource(), null, true)}
        >
          Microphone
        </button>
      </div>

      <label className="inline-flex cursor-pointer items-center rounded-full bg-white/10 px-4 py-1.5 text-sm ring-1 ring-white/15 transition hover:bg-white/15 focus-within:ring-2 focus-within:ring-cyan-300">
        Load a track
        <input
          type="file"
          accept="audio/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const { source, revoke } = createLiveFileSource(file);
            use(source, revoke, false);
          }}
        />
      </label>
      {(problem || state.error) && (
        <p role="alert" className="w-full text-xs text-rose-300">
          {problem ?? state.error}
        </p>
      )}
    </div>
  );
}

export function Transport() {
  const p = useAudioPipeline();
  const state = usePipelineState();
  const scrubRef = useRef<HTMLInputElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const scrubbing = useRef(false);
  const [chip, setChip] = useState<ChipState>("none");
  const [nudge, setNudge] = useState(0);
  const hasSource = state.source !== null;

  // Fine-grained values come from frames and go to refs. React state changes only when the chip text changes.
  useAudioFrame((f) => {
    const next: ChipState = !hasSource ? "none" : !f.isPlaying ? "paused" : f.rmsEnergy < 0.04 ? "silent" : f.rmsEnergy < 0.3 ? "quiet" : "playing";
    setChip((c) => (c === next ? c : next));
    if (!scrubbing.current && scrubRef.current) scrubRef.current.value = String(f.time);
    if (clockRef.current) clockRef.current.textContent = fmt(f.time);
  }, [hasSource]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          data-play
          disabled={!hasSource}
          onClick={() => void p.toggle()}
          aria-label={state.isPlaying ? "Pause" : "Play"}
          aria-pressed={state.isPlaying}
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-900 shadow transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:opacity-40 motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          {state.isPlaying ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10-6.5a1 1 0 0 0 0-1.72l-10-6.5A1 1 0 0 0 8 5.5Z" />
            </svg>
          )}
        </button>
        <div role="status" aria-live="polite" className="flex flex-col">
          <span className="text-xs font-medium">{CHIP_TEXT[chip]}</span>
          <span className="max-w-[18rem] truncate text-[11px] text-slate-400">
            {state.source ? `${state.source.label} · ${state.source.kind}` : "No source"}
            {state.source && ` · scene: ${state.scene}`}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span ref={clockRef} className="w-14 text-xs tabular-nums text-slate-300">
          0:00.0
        </span>
        <input
          ref={scrubRef}
          type="range"
          aria-label="Timeline position"
          min={0}
          max={state.duration ?? 0}
          step={0.01}
          defaultValue={0}
          disabled={!state.source?.canSeek}
          onPointerDown={() => (scrubbing.current = true)}
          onPointerUp={() => (scrubbing.current = false)}
          onChange={(e) => p.seek(Number(e.target.value))}
          className="h-1.5 min-w-[12rem] flex-1 cursor-pointer accent-white disabled:cursor-not-allowed disabled:opacity-40"
        />
        <span className="w-14 text-right text-xs tabular-nums text-slate-400">{state.duration ? fmt(state.duration) : "--:--"}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
        <label htmlFor="sync-nudge">Sync nudge</label>
        <input
          id="sync-nudge"
          type="range"
          min={-200}
          max={200}
          step={10}
          value={nudge}
          onChange={(e) => {
            setNudge(Number(e.target.value));
            p.setSyncNudge(Number(e.target.value));
          }}
          className="w-40 accent-white"
        />
        <span className="w-16 tabular-nums">
          {nudge > 0 ? "+" : ""}
          {nudge} ms
        </span>
        <span className="text-slate-400">device latency {state.latencyMs} ms, compensated automatically</span>
      </div>
    </div>
  );
}

const BANDS = ["bass", "mid", "high"] as const;

export function Meters() {
  const refs = useRef<Record<(typeof BANDS)[number], HTMLDivElement | null>>({ bass: null, mid: null, high: null });
  useAudioFrame((f) => {
    for (const b of BANDS) {
      const el = refs.current[b];
      if (el) el.style.transform = `scaleX(${f[b].toFixed(3)})`;
    }
  }, []);
  return (
    <div className="grid grid-cols-3 gap-3 text-[11px] uppercase tracking-wide text-slate-400">
      {BANDS.map((b) => (
        <div key={b}>
          <div className="mb-1">{b}</div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              ref={(el) => {
                refs.current[b] = el;
              }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300 will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
