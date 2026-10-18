"use client";

import SpectrumMatrixCanvas, { type MatrixDebug } from "@/components/spectrum-matrix/SpectrumMatrixCanvas";
import { SourcePicker, Transport } from "@/components/pipeline/Controls";
import type { AudioPipeline } from "@/lib/pipeline";
import { AudioPipelineProvider, useSceneState } from "@/lib/pipeline/react";

/**
 * The Spectrum Matrix experience: one shared audio pipeline, the WebGL scene, and the same source and transport
 * controls the other visuals use. The scene reads the pipeline's frames and nothing else.
 */
export default function SpectrumMatrix({ pipeline, debugRef }: { pipeline?: AudioPipeline; debugRef?: { current: MatrixDebug | null } }) {
  return (
    <AudioPipelineProvider pipeline={pipeline}>
      <Shell debugRef={debugRef} />
    </AudioPipelineProvider>
  );
}

function Shell({ debugRef }: { debugRef?: { current: MatrixDebug | null } }) {
  const scene = useSceneState();
  return (
    <section
      aria-labelledby="spectrum-matrix-title"
      data-scene={scene}
      className="relative isolate flex min-h-[85vh] flex-col overflow-hidden rounded-3xl bg-[#02030a] text-slate-100 ring-1 ring-white/10"
    >
      <div className="relative min-h-[22rem] flex-1">
        <div className="absolute inset-0">
          <SpectrumMatrixCanvas debugRef={debugRef} />
        </div>
        <header className="pointer-events-none relative p-5 sm:p-6">
          <h2 id="spectrum-matrix-title" className="text-lg font-semibold tracking-tight">
            Spectrum Matrix
          </h2>
          <p className="max-w-md text-sm text-slate-300/90">
            A terrain shaped by bass (left), mids (centre) and highs (right): three bands, not a full spectrum. Bass hits raise a ridge. Silence lets it settle. Drag to orbit.
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
