"use client";

import { useRef, useState, useSyncExternalStore } from "react";

import { SCENE_STATES, type SceneState } from "@/lib/motion/types";
import { MotionPlayerProvider, useMotionFrame, useMotionCssVars, useMotionPlayer, useSceneState } from "./MotionPlayerProvider";
import { SceneBackdrop } from "./SceneBackdrop";
import { Scrubber } from "./Scrubber";
import { TrackMeters } from "./TrackMeters";

/** Drop-in Motion Lab. Mount it on any page: <MotionLab />. */
export default function MotionLab() {
  return (
    <MotionPlayerProvider>
      <LabShell />
    </MotionPlayerProvider>
  );
}

const SCENE_CHIP: Record<SceneState, string> = {
  rest: "bg-slate-400/20 text-slate-200 ring-slate-300/30",
  build: "bg-amber-400/20 text-amber-100 ring-amber-300/40",
  active: "bg-emerald-400/20 text-emerald-100 ring-emerald-300/40",
  settle: "bg-violet-400/20 text-violet-100 ring-violet-300/40",
};

export function LabShell() {
  const { status, error, warning } = useMotionPlayer();
  const root = useRef<HTMLElement>(null);
  const scene = useSceneState();
  useMotionCssVars(root); // publishes --motion-<track>-<property> on this element each frame

  return (
    // `group` + data-scene lets any descendant use e.g. `group-data-[scene=active]:border-emerald-400/50`.
    <section
      ref={root}
      data-scene={scene ?? "rest"}
      className="group relative isolate overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-4 text-slate-100 shadow-2xl transition-colors duration-1000 group-data-[scene=active]:border-emerald-400/30 sm:p-6"
      aria-label="Audio-driven motion lab"
    >
      <SceneBackdrop />
      <div className="space-y-5">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Motion Lab</h2>
            <p className="max-w-prose text-sm text-slate-300">
              A song, analysed offline, planned as motion on four abstract layers. The amber hatching is the visual getting ready
              before the beat it answers; the white tick is the beat.
            </p>
          </div>
          <SceneChip />
        </header>

        {status === "error" && <p role="alert" className="rounded-lg bg-rose-500/15 p-3 text-sm text-rose-100 ring-1 ring-rose-400/40">{error}</p>}
        {warning && <p role="status" className="rounded-lg bg-amber-500/15 p-3 text-sm text-amber-100 ring-1 ring-amber-400/40">{warning}</p>}

        <div className="flex flex-wrap items-center gap-3">
          <Transport />
          <SongSwitcher />
          <ProfileSwitcher />
        </div>
        <Scrubber />
        <Legend />
        <TrackMeters />
      </div>
    </section>
  );
}

function SceneChip() {
  const scene = useSceneState();
  return (
    <div className="flex flex-col items-end gap-1">
      <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide ring-1 transition-colors duration-500 ${scene ? SCENE_CHIP[scene] : "bg-white/5 text-slate-400 ring-white/10"}`}>
        scene: {scene ?? "…"}
      </span>
      <ul className="flex gap-1.5" aria-hidden>
        {SCENE_STATES.map((s) => (
          <li key={s} className={`h-1.5 w-6 rounded-full transition-opacity duration-500 ${scene === s ? "opacity-100" : "opacity-25"} ${SCENE_CHIP[s].split(" ")[0]}`} />
        ))}
      </ul>
      {/* Announce a change of scene, politely, to screen readers. A few times a minute at most. */}
      <span className="sr-only" role="status" aria-live="polite">{scene ? `Scene: ${scene}` : ""}</span>
    </div>
  );
}

const formatTime = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;

function Transport() {
  const { playing, toggle, status, timeline, silent, clock } = useMotionPlayer();
  const time = useSyncExternalStore(clock.subscribe, () => Math.floor(clock.getTime() * 10), () => 0) / 10;
  const ready = status === "ready" && timeline !== null;
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? "Pause" : "Play"}
        className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-900 shadow transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-40 motion-reduce:transition-none"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10-6.5a1 1 0 0 0 0-1.72l-10-6.5A1 1 0 0 0 8 5.5Z" /></svg>
        )}
      </button>
      <div className="text-sm tabular-nums text-slate-200">
        {formatTime(time)} <span className="text-slate-500">/ {timeline ? formatTime(timeline.durationS) : "–:––.–"}</span>
        {silent && ready && <span className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase text-slate-300" title="This song ships no audio; the plan plays on a silent clock.">silent</span>}
      </div>
    </div>
  );
}

function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T | null; options: Array<{ id: T; label: string }>; onChange: (id: T) => void }) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full bg-white/5 p-1 ring-1 ring-white/10">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
          className="rounded-full px-3 py-1 text-sm text-slate-300 transition aria-pressed:bg-white aria-pressed:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function SongSwitcher() {
  const { manifest, song, selectSong } = useMotionPlayer();
  if (!manifest) return null;
  return <Segmented label="Song" value={song?.id ?? null} options={manifest.songs.map((s) => ({ id: s.id, label: s.title.split(" - ")[0] }))} onChange={selectSong} />;
}

function ProfileSwitcher() {
  const { song, profileId, selectProfile } = useMotionPlayer();
  if (!song) return null;
  return <Segmented label="Visual profile" value={profileId} options={song.profiles.map((p) => ({ id: p.id, label: p.label }))} onChange={selectProfile} />;
}

function Legend() {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-xs text-slate-300">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="underline-offset-2 hover:underline">
        {open ? "Hide" : "How to read this"}
      </button>
      {open && (
        <ul className="mt-2 grid gap-1 sm:grid-cols-2">
          <li><span className="mr-2 inline-block h-2 w-5 bg-[repeating-linear-gradient(45deg,#fbbf24_0_2px,transparent_2px_5px)] align-middle" />anticipation: the visual starts before the beat</li>
          <li><span className="mr-2 inline-block h-3 w-0.5 bg-white align-middle" />the musical event the action answers</li>
          <li><span className="mr-2 inline-block h-2 w-5 rounded-sm bg-rose-400 align-middle" />burst · <span className="text-violet-300">transition out</span> · <span className="text-teal-300">transition in</span></li>
          <li><span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-300 align-middle" />outline / dot: acting right now (amber while anticipating)</li>
        </ul>
      )}
    </div>
  );
}
