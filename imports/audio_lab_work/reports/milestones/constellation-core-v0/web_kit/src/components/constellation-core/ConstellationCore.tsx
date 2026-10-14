"use client";

import ConstellationCoreCanvas, { type CoreDebug } from "@/components/constellation-core/ConstellationCoreCanvas";
import { SourcePicker, Transport } from "@/components/pipeline/Controls";
import type { AudioPipeline } from "@/lib/pipeline";
import { AudioPipelineProvider, useSceneState } from "@/lib/pipeline/react";

/**
 * The Constellation Core experience: one shared audio pipeline, the WebGL scene, and the same source and transport
 * controls the other visuals use. The scene reads the pipeline's frames and nothing else.
 */
export default function ConstellationCore({ pipeline, debugRef }: { pipeline?: AudioPipeline; debugRef?: { current: CoreDebug | null } }) {
  return (
    <AudioPipelineProvider pipeline={pipeline}>
      <Shell debugRef={debugRef} />
    </AudioPipelineProvider>
  );
}

function Shell({ debugRef }: { debugRef?: { current: CoreDebug | null } }) {
  const scene = useSceneState();
  return (
    <section
      aria-labelledby="constellation-core-title"
      data-scene={scene}
      className="relative isolate flex min-h-[85vh] flex-col overflow-hidden rounded-3xl bg-[#02040c] text-slate-100 ring-1 ring-white/10"
    >
      <div className="relative min-h-[22rem] flex-1">
        <div className="absolute inset-0">
          <ConstellationCoreCanvas debugRef={debugRef} />
        </div>
        <header className="pointer-events-none relative p-5 sm:p-6">
          <h2 id="constellation-core-title" className="text-lg font-semibold tracking-tight">
            Constellation Core
          </h2>
          <p className="max-w-md text-sm text-slate-300/90">
            Bass swells the core, mids speed the orbits, bass hits surge the beam, detected onsets light the rings in turn. Silence lets it settle. Drag to orbit.
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
