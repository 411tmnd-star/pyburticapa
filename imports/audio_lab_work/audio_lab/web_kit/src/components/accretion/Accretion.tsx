"use client";

import AccretionCanvas, { type AccretionDebug } from "@/components/accretion/AccretionCanvas";
import { SourcePicker, Transport } from "@/components/pipeline/Controls";
import type { AudioPipeline } from "@/lib/pipeline";
import { AudioPipelineProvider, useSceneState } from "@/lib/pipeline/react";

/**
 * The Accretion experience: one shared audio pipeline, the WebGL scene, and the same source and transport controls
 * the Constellation instrument uses. The scene reads the pipeline's frames and nothing else.
 */
export default function Accretion({ pipeline, debugRef }: { pipeline?: AudioPipeline; debugRef?: { current: AccretionDebug | null } }) {
  return (
    <AudioPipelineProvider pipeline={pipeline}>
      <Shell debugRef={debugRef} />
    </AudioPipelineProvider>
  );
}

function Shell({ debugRef }: { debugRef?: { current: AccretionDebug | null } }) {
  const scene = useSceneState();
  return (
    <section
      aria-labelledby="accretion-title"
      data-scene={scene}
      className="relative isolate flex min-h-[85vh] flex-col overflow-hidden rounded-3xl bg-[#020308] text-slate-100 ring-1 ring-white/10"
    >
      <div className="relative min-h-[22rem] flex-1">
        <div className="absolute inset-0">
          <AccretionCanvas debugRef={debugRef} />
        </div>
        <header className="pointer-events-none relative p-5 sm:p-6">
          <h2 id="accretion-title" className="text-lg font-semibold tracking-tight">
            Accretion
          </h2>
          <p className="max-w-md text-sm text-slate-300/90">
            Bass brightens the ring around the dark centre, mids turn the disk, bass hits fire the jets. Silence lets it settle. Drag to orbit.
          </p>
        </header>
      </div>
      <div className="relative m-3 space-y-3 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md sm:m-5 sm:mt-0">
        <SourcePicker />
        <Transport />
      </div>
    </section>
  );
}
