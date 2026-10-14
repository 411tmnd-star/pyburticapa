"use client";

import { useEffect, useState } from "react";

import ConstellationCanvas from "@/components/pipeline/ConstellationCanvas";
import { Meters, SourcePicker, Transport } from "@/components/pipeline/Controls";
import ParticleField from "@/components/pipeline/ParticleField";
import { PROFILES } from "@/lib/instrument/profiles";
import { AudioPipelineProvider, useAudioPipeline, useSceneState } from "@/lib/pipeline/react";

type Visual = "constellation" | "particles";

/**
 * The page. One pipeline feeds one visual at a time. Switching the visual, or the audio source, is a state
 * change here; neither visual knows where the audio comes from, and the pipeline knows neither visual.
 */
export default function Instrument() {
  return (
    <AudioPipelineProvider>
      <Shell />
    </AudioPipelineProvider>
  );
}

function Shell() {
  const [visual, setVisual] = useState<Visual>("constellation");
  const [profileId, setProfileId] = useState(PROFILES[0].id);
  const profile = PROFILES.find((p) => p.id === profileId) ?? PROFILES[0];
  const scene = useSceneState();
  const pipeline = useAudioPipeline();

  // Exposed for debugging and the preview harness only; nothing in the app reads it.
  useEffect(() => {
    const w = window as unknown as { __pipeline?: unknown };
    w.__pipeline = pipeline;
    return () => {
      delete w.__pipeline;
    };
  }, [pipeline]);

  const toggle =
    "rounded-full px-3 py-1 text-sm text-slate-300 transition aria-pressed:bg-white aria-pressed:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none";

  return (
    <section
      aria-labelledby="instrument-title"
      data-scene={scene}
      className="relative isolate flex min-h-[85vh] flex-col overflow-hidden rounded-3xl bg-[#03050b] text-slate-100 ring-1 ring-white/10"
    >
      {/* The picture fills the top region; the controls sit below it, so nothing covers the visual. */}
      <div className="relative min-h-[22rem] flex-1">
        {visual === "constellation" ? (
          <ConstellationCanvas profile={profile} className="absolute inset-0 h-full w-full" />
        ) : (
          <ParticleField className="absolute inset-0 h-full w-full" />
        )}

      <header className="relative flex flex-wrap items-start justify-between gap-3 p-5 sm:p-6">
        <div>
          <h2 id="instrument-title" className="text-lg font-semibold tracking-tight">
            {visual === "constellation" ? "Constellation" : "Particle field"}
          </h2>
          <p className="max-w-md text-sm text-slate-300/90">
            {visual === "constellation"
              ? "Bass pulls the stars in, mids shift the colour, highs make them sparkle. Silence lets them drift."
              : "Loudness sets the speed, a detected beat fires a burst, mids set the colour, highs set the size."}
          </p>
        </div>
        <div role="group" aria-label="Visual" className="inline-flex rounded-full bg-white/5 p-1 ring-1 ring-white/10">
          <button type="button" data-visual="constellation" aria-pressed={visual === "constellation"} className={toggle} onClick={() => setVisual("constellation")}>
            Constellation
          </button>
          <button type="button" data-visual="particles" aria-pressed={visual === "particles"} className={toggle} onClick={() => setVisual("particles")}>
            Particles
          </button>
        </div>
      </header>
      </div>

      <div className="relative m-3 space-y-3 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md sm:m-5 sm:mt-0">
        <SourcePicker />
        <Transport />
        <Meters />
        {visual === "constellation" && (
          <div role="group" aria-label="Visual profile" className="inline-flex rounded-full bg-white/5 p-1 ring-1 ring-white/10">
            {PROFILES.map((p) => (
              <button key={p.id} type="button" data-profile={p.id} title={p.blurb} aria-pressed={profileId === p.id} className={toggle} onClick={() => setProfileId(p.id)}>
                {p.label}
              </button>
            ))}
          </div>
        )}
        <p className="text-xs text-slate-400">
          {visual === "constellation" ? `${profile.blurb} Hover to push, drag to pull.` : "Same audio, a different picture."}
        </p>
      </div>
    </section>
  );
}
