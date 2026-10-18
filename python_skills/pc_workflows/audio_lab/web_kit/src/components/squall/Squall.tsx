"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/components/motion/MotionPlayerProvider";
import { AudioPipeline } from "@/lib/pipeline";
import { AudioPipelineProvider, useAudioFrame, useAudioPipeline, usePipelineState } from "@/lib/pipeline/react";
import { RAMP, rampCss } from "@/lib/squall/render";
import { BEAUFORT } from "@/lib/squall/weather";
import ForecastStrip from "./ForecastStrip";
import SquallCanvas, {
  DEFAULT_SETTINGS,
  type Detail,
  type SquallApi,
  type SquallReadout,
  type SquallSettings,
  type SquallSnapshot,
} from "./SquallCanvas";
import { useSquallSources } from "./useSquallSources";

/**
 * Squall: a song as weather on a night-time chart. This file is the experience around the map: the
 * instrument readout, the transport with the forecast strip, the settings rail, the empty state and the
 * drop target. The audio comes from the shared AudioPipeline (any source); the map reads its frames.
 */

export interface SquallProps {
  /** Supply a pipeline to share one with other visuals or to inspect it. By default Squall creates its own. */
  pipeline?: AudioPipeline;
  snapshotRef?: { current: SquallSnapshot | null };
  apiRef?: { current: SquallApi | null };
  className?: string;
}

export default function Squall({ pipeline, ...rest }: SquallProps) {
  return (
    <AudioPipelineProvider pipeline={pipeline}>
      <SquallStage {...rest} />
    </AudioPipelineProvider>
  );
}

const fmt = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;
const glass = "bg-[#050912]/60 backdrop-blur-md ring-1 ring-white/10";
const label = "text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400";
const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300";

export function SquallStage({ snapshotRef, apiRef, className = "" }: Omit<SquallProps, "pipeline">) {
  const pipeline = useAudioPipeline();
  const state = usePipelineState();
  const reduced = usePrefersReducedMotion();
  const src = useSquallSources();
  const sectionRef = useRef<HTMLElement>(null);
  const internalApi = useRef<SquallApi | null>(null);
  const api = apiRef ?? internalApi;
  const [settings, setSettings] = useState<SquallSettings>(DEFAULT_SETTINGS);
  const [readout, setReadout] = useState<SquallReadout | null>(null);
  const [railOpen, setRailOpen] = useState(false);
  const [dropping, setDropping] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [nudge, setNudge] = useState(0);
  const [note, setNote] = useState<string | null>(null);

  const hasSource = state.source !== null;
  // A source that failed to start can still report "playing" (the element did not pause); do not show it as playing.
  const playing = state.isPlaying && !state.error;
  const forecastMatches = src.forecast.sourceId !== null && src.forecast.sourceId === state.source?.id;
  const fcStatus = !hasSource ? "none" : forecastMatches ? src.forecast.status : "loading";
  const forecast = forecastMatches ? src.forecast.forecast : null;
  const problem = src.problem ?? state.error;

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === sectionRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    const el = sectionRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen().catch(() => setNote("Fullscreen was blocked by the browser."));
  };

  // Space plays and pauses, the arrow keys seek by five seconds, F toggles fullscreen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (t && t !== document.body && !sectionRef.current?.contains(t)) return;
      const tag = t?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if (e.key === " " && !typing && tag !== "BUTTON") {
        e.preventDefault();
        void pipeline.toggle();
      } else if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && !typing && pipeline.source?.canSeek) {
        e.preventDefault();
        pipeline.seek(Math.max(0, pipeline.frame.time + (e.key === "ArrowRight" ? 5 : -5)));
      } else if ((e.key === "f" || e.key === "F") && !typing && document.fullscreenEnabled) {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pipeline]);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDropping(false);
    const f = e.dataTransfer.files?.[0];
    if (f) src.file(f);
  };

  const set = <K extends keyof SquallSettings>(k: K, v: SquallSettings[K]) => setSettings((s) => ({ ...s, [k]: v }));

  return (
    <section
      ref={sectionRef}
      aria-label="Squall, a weather map driven by the audio"
      data-squall
      data-scene={state.scene}
      data-dropping={dropping || undefined}
      onDragOver={(e) => {
        if (Array.from(e.dataTransfer.types).includes("Files")) {
          e.preventDefault();
          setDropping(true);
        }
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setDropping(false);
      }}
      onDrop={onDrop}
      className={`relative isolate h-[min(48rem,calc(100svh-2rem))] min-h-[32rem] overflow-hidden bg-[#050912] text-slate-100 ${fullscreen ? "!h-screen" : "rounded-2xl ring-1 ring-white/10"} ${className}`}
    >
      <SquallCanvas
        settings={settings}
        forecast={forecast}
        onReadout={setReadout}
        apiRef={api}
        snapshotRef={snapshotRef}
        className="absolute inset-0 h-full w-full"
      />

      {/* ---- instrument readout, top left ---- */}
      <div className="pointer-events-none absolute left-3 top-3 flex max-w-[calc(100%-5.5rem)] flex-col gap-2 sm:left-5 sm:top-5">
        <div className={`pointer-events-auto rounded-xl px-4 py-3 ${glass}`}>
          <h2 className="text-sm font-semibold tracking-[0.3em] text-slate-100">SQUALL</h2>
          <div className="mt-2 flex items-baseline gap-3" data-hud="force">
            <span className="text-4xl font-light leading-none tabular-nums" data-force>
              {readout ? readout.force : 0}
            </span>
            <span className="text-sm text-slate-300">
              <span className={label}>Beaufort force</span>
              <br />
              <span data-force-name>{readout ? readout.name : "Calm"}</span>
            </span>
          </div>
          <p className="mt-2 text-xs tabular-nums text-slate-300 sm:hidden" data-hud="compact">
            {readout?.tendency === "falling" ? "↓" : readout?.tendency === "rising" ? "↑" : "→"} · {readout ? readout.strikesPerMin : 0}/min · rain {readout ? readout.rain : "none"}
          </p>
          <dl className="mt-3 hidden grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs sm:grid" data-hud="rows">
            <dt className={label}>Barometer</dt>
            <dd data-tendency className="tabular-nums">
              {readout?.tendency === "falling" ? "↓ falling" : readout?.tendency === "rising" ? "↑ rising" : "→ steady"}
            </dd>
            <dt className={label}>Lightning</dt>
            <dd data-strikes className="tabular-nums">
              {readout ? readout.strikesPerMin : 0} / min
            </dd>
            <dt className={label}>Rain</dt>
            <dd data-rain>{readout ? readout.rain : "none"}</dd>
            <dt className={label}>Storms</dt>
            <dd className="tabular-nums">{readout ? readout.storms : 2}</dd>
          </dl>
          <StatusChip hasSource={hasSource} />
          {readout?.reducedDetail && <p className="mt-2 max-w-[14rem] text-[11px] text-amber-200/90">Detail reduced to keep the map smooth.</p>}
        </div>
      </div>

      {/* ---- settings rail, top right ---- */}
      <div className="pointer-events-none absolute bottom-[12.5rem] right-3 top-3 flex flex-col items-end gap-2 sm:right-5 sm:top-5">
        <button
          type="button"
          aria-expanded={railOpen}
          aria-controls="squall-rail"
          onClick={() => setRailOpen((o) => !o)}
          className={`pointer-events-auto shrink-0 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-200 hover:bg-white/10 ${glass} ${focus}`}
        >
          Layers
        </button>
        {railOpen && (
          <div id="squall-rail" className={`pointer-events-auto min-h-0 w-60 space-y-4 overflow-y-auto rounded-xl p-4 ${glass}`}>
            <Seg name="Layer" value={settings.layer} options={[["wind", "Wind"], ["night", "Night"]]} onChange={(v) => set("layer", v)} />
            <Seg name="Isobars" value={settings.isobars ? "on" : "off"} options={[["on", "On"], ["off", "Off"]]} onChange={(v) => set("isobars", v === "on")} />
            <Seg
              name="Lightning"
              value={settings.lightning}
              options={[["on", "On"], ["soft", "Soft"], ["off", "Off"]]}
              onChange={(v) => set("lightning", v)}
              hint={reduced ? "Reduced motion is on, so there is no flash." : undefined}
            />
            <Seg name="Detail" value={settings.detail} options={[["light", "Light"], ["normal", "Normal"], ["dense", "Dense"]] as [Detail, string][]} onChange={(v) => set("detail", v)} />
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="squall-nudge" className={label}>
                  Sync nudge
                </label>
                <span className="text-xs tabular-nums text-slate-300">
                  {nudge > 0 ? "+" : ""}
                  {nudge} ms
                </span>
              </div>
              <input
                id="squall-nudge"
                type="range"
                min={-200}
                max={200}
                step={10}
                value={nudge}
                onChange={(e) => {
                  setNudge(Number(e.target.value));
                  pipeline.setSyncNudge(Number(e.target.value));
                }}
                className="mt-1 w-full accent-cyan-300"
              />
              <p className="mt-1 text-[11px] text-slate-500">Device latency {state.latencyMs} ms, compensated automatically.</p>
            </div>
            <div>
              <span className={label}>Storms</span>
              <div className="mt-1 flex gap-2">
                <button type="button" data-add-storm onClick={() => !api.current?.seedStorm() && setNote("The map holds at most five storms.")} className={`flex-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10 ${focus}`}>
                  Add
                </button>
                <button type="button" data-remove-storm onClick={() => !api.current?.removeStorm() && setNote("The map keeps at least one storm.")} className={`flex-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10 ${focus}`}>
                  Remove
                </button>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Or double-click the map. Drag an L to move it.</p>
            </div>
          </div>
        )}
      </div>

      {/* ---- Beaufort legend, bottom right ---- */}
      <BeaufortLegend force={readout?.force ?? 0} />

      {/* ---- empty state ---- */}
      {!hasSource && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center px-4 pb-24">
          <div className={`pointer-events-auto w-full max-w-md rounded-2xl p-6 text-center ${glass}`} data-empty>
            <p className="text-lg font-light tracking-wide">Turn a song into weather</p>
            <p className="mt-1 text-sm text-slate-400">Bass deepens the storms, highs bring rain, hits strike lightning.</p>
            <SourceButtons src={src} />
            <p className="mt-3 text-[11px] text-slate-500">Drop an audio file anywhere on the map.</p>
          </div>
        </div>
      )}
      {hasSource && !playing && !problem && (
        <p className="pointer-events-none absolute inset-x-0 top-[42%] text-center text-xs uppercase tracking-[0.2em] text-slate-300/80" data-ready>
          Press play, or Space
        </p>
      )}

      {/* ---- messages ---- */}
      {(problem || note) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-[12rem] flex justify-center px-4 sm:bottom-[10.5rem]">
          <p
            role="alert"
            className="pointer-events-auto flex items-center gap-3 rounded-lg bg-rose-950/80 px-4 py-2 text-sm text-rose-100 ring-1 ring-rose-300/30"
            data-problem
          >
            {problem ?? note}
            {!problem && (
              <button type="button" onClick={() => setNote(null)} className={`rounded px-1 text-rose-200 underline ${focus}`}>
                Dismiss
              </button>
            )}
          </p>
        </div>
      )}

      {dropping && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-cyan-300/10 text-sm uppercase tracking-[0.2em] ring-2 ring-inset ring-cyan-300/70">
          Drop to load this track
        </div>
      )}

      {/* ---- transport, bottom ---- */}
      <div className={`absolute inset-x-3 bottom-3 space-y-2 rounded-xl p-3 sm:inset-x-5 sm:bottom-5 ${glass}`} data-transport>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            data-play
            disabled={!hasSource}
            aria-label={playing ? "Pause" : "Play"}
            aria-pressed={playing}
            onClick={() => void pipeline.toggle()}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-slate-900 transition hover:scale-105 disabled:opacity-40 motion-reduce:transition-none motion-reduce:hover:scale-100 ${focus}`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              {playing ? (
                <>
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </>
              ) : (
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10-6.5a1 1 0 0 0 0-1.72l-10-6.5A1 1 0 0 0 8 5.5Z" />
              )}
            </svg>
          </button>
          <Clock duration={state.duration} />
          <span className="flex-1 sm:hidden" />
          <p className="hidden min-w-0 flex-1 truncate text-right text-xs text-slate-300 sm:block" data-source-label title={state.source?.label}>
            {state.source ? (
              <>
                {state.source.label}
                <span className="text-slate-500"> · {state.source.kind === "offline" ? "pre-computed" : state.source.kind === "synthetic" ? "demo signal" : state.source.id === "mic" ? "live mic" : "live file"}</span>
              </>
            ) : (
              <span className="text-slate-500">No source</span>
            )}
          </p>
          {hasSource && (
            <label className="cursor-pointer whitespace-nowrap rounded-full px-2 py-1.5 text-xs sm:px-3 text-slate-300 hover:bg-white/10 focus-within:ring-2 focus-within:ring-cyan-300">
              Open file
              <input type="file" accept="audio/*" className="sr-only" data-file-input onChange={(e) => e.target.files?.[0] && src.file(e.target.files[0])} />
            </label>
          )}
          {src.caps.fullscreen && (
            <button type="button" aria-label={fullscreen ? "Exit full screen" : "Full screen"} data-fullscreen onClick={toggleFullscreen} className={`whitespace-nowrap rounded-full px-2 py-1.5 text-xs text-slate-300 hover:bg-white/10 sm:px-3 ${focus}`}>
              {fullscreen ? "Exit full screen" : "Full screen"}
            </button>
          )}
        </div>
        {state.source && (
          <p className="truncate text-[11px] text-slate-400 sm:hidden" data-source-label-compact>
            {state.source.label}
          </p>
        )}
        <ForecastStrip forecast={forecast} status={fcStatus} duration={state.duration} canSeek={!!state.source?.canSeek} />
      </div>
    </section>
  );
}

// ---- small pieces ----------------------------------------------------------------------------------

function Clock({ duration }: { duration: number | null }) {
  const ref = useRef<HTMLSpanElement>(null);
  useAudioFrame((f) => {
    if (ref.current) ref.current.textContent = fmt(f.time);
  }, []);
  return (
    <span className="w-24 shrink-0 text-xs tabular-nums text-slate-300">
      <span ref={ref} data-clock>
        0:00.0
      </span>
      <span className="text-slate-500"> / {duration ? fmt(duration) : "--:--"}</span>
    </span>
  );
}

type Chip = "none" | "paused" | "silent" | "quiet" | "playing";
const CHIP: Record<Chip, string> = {
  none: "Waiting for a source",
  paused: "Paused",
  silent: "Silent: the doldrums",
  quiet: "Quiet: light weather",
  playing: "Playing",
};

/** The one live-region line. React state changes only when the wording does, not per frame. */
function StatusChip({ hasSource }: { hasSource: boolean }) {
  const state = usePipelineState();
  const [chip, setChip] = useState<Chip>("none");
  useAudioFrame(
    (f) => {
      const next: Chip = !hasSource ? "none" : !f.isPlaying ? "paused" : f.rmsEnergy < 0.04 ? "silent" : f.rmsEnergy < 0.3 ? "quiet" : "playing";
      setChip((c) => (c === next ? c : next));
    },
    [hasSource],
  );
  return (
    <p role="status" aria-live="polite" className="mt-3 border-t border-white/10 pt-2 text-[11px] text-slate-400" data-chip={chip}>
      {CHIP[chip]}
      {hasSource && <span data-scene-label> · scene: {state.scene}</span>}
    </p>
  );
}

function Seg<T extends string>({ name, value, options, onChange, hint }: { name: string; value: T; options: [T, string][]; onChange: (v: T) => void; hint?: ReactNode }) {
  return (
    <div role="group" aria-label={name}>
      <span className={label}>{name}</span>
      <div className="mt-1 flex rounded-lg bg-white/5 p-0.5">
        {options.map(([v, text]) => (
          <button
            key={v}
            type="button"
            data-setting={`${name.toLowerCase()}:${v}`}
            aria-pressed={value === v}
            onClick={() => onChange(v)}
            className={`flex-1 rounded-md px-2 py-1 text-xs text-slate-300 transition aria-pressed:bg-white aria-pressed:text-slate-900 hover:bg-white/10 aria-pressed:hover:bg-white motion-reduce:transition-none ${focus}`}
          >
            {text}
          </button>
        ))}
      </div>
      {hint && <p className="mt-1 text-[11px] text-slate-500">{hint}</p>}
    </div>
  );
}

function SourceButtons({ src }: { src: ReturnType<typeof useSquallSources> }) {
  const btn = `rounded-full px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none ${focus}`;
  const { caps } = src;
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Audio source">
      <label className={`${btn} cursor-pointer bg-white text-slate-900 hover:bg-slate-200 focus-within:ring-2 focus-within:ring-cyan-300 ${caps.webAudio ? "" : "pointer-events-none !bg-white/10 !text-slate-500"}`}>
        Choose a song
        <input type="file" accept="audio/*" className="sr-only" disabled={!caps.webAudio} data-file-input onChange={(e) => e.target.files?.[0] && src.file(e.target.files[0])} />
      </label>
      {src.songs.map((s) => (
        <button key={s.id} type="button" data-source={`song:${s.id}`} disabled={src.busy !== null} onClick={() => void src.song(s)} className={`${btn} bg-white/10 hover:bg-white/15`} title="Pre-computed track">
          {src.busy === s.id ? "Loading…" : s.title.split(" - ")[0]}
        </button>
      ))}
      <button type="button" data-source="mic" disabled={!caps.webAudio || !caps.microphone} onClick={src.mic} className={`${btn} bg-white/10 hover:bg-white/15`}>
        Use microphone
      </button>
      <button type="button" data-source="demo" onClick={src.demo} className={`${btn} bg-white/10 hover:bg-white/15`}>
        Demo
      </button>
      {!caps.webAudio && (
        <p className="w-full text-xs text-amber-200/90" role="note" data-unsupported>
          This browser has no Web Audio, so it cannot analyse a file or the microphone. The demo and the pre-computed tracks still work.
        </p>
      )}
      {caps.webAudio && !caps.microphone && (
        <p className="w-full text-xs text-amber-200/90" role="note" data-unsupported>
          The microphone is not available here (it needs a secure page and a supported browser).
        </p>
      )}
    </div>
  );
}

/** Windy's knots legend, in Beaufort: the ramp from calm to hurricane force, with a marker at the current force. */
function BeaufortLegend({ force }: { force: number }) {
  const gradient = useMemo(() => `linear-gradient(90deg, ${RAMP.map((_, i) => rampCss(i / (RAMP.length - 1))).join(", ")})`, []);
  return (
    <div className="pointer-events-none absolute bottom-[10.5rem] right-5 hidden w-52 sm:block" aria-hidden data-legend>
      <div className="relative h-2 rounded-full ring-1 ring-white/20" style={{ background: gradient }}>
        <div className="absolute -top-1 h-4 w-0.5 rounded bg-white shadow-[0_0_6px_white] transition-[left] duration-300 motion-reduce:transition-none" style={{ left: `${(force / 12) * 100}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[10px] tabular-nums text-slate-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
        <span>0 {BEAUFORT[0]}</span>
        <span>12</span>
      </div>
    </div>
  );
}
