import type { Metadata } from "next";

import SpectrumMatrix from "@/components/spectrum-matrix/SpectrumMatrix";

export const metadata: Metadata = {
  title: "Spectrum Matrix: a terrain shaped by sound",
  description: "A glowing wireframe terrain scrolling toward the viewer. Bass raises the left, mids the centre and highs the right (three bands, not a full spectrum); bass hits raise a ridge. A WebGL scene on the shared audio pipeline.",
};

export default function SpectrumMatrixPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-4">
      <SpectrumMatrix />
    </main>
  );
}
