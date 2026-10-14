import type { Metadata } from "next";

import ConstellationCore from "@/components/constellation-core/ConstellationCore";

export const metadata: Metadata = {
  title: "Constellation Core: an orbital core driven by sound",
  description: "Bass swells a glowing core, mids speed its orbits, bass hits surge a vertical beam and detected onsets light the rings in turn. A WebGL scene on the shared audio pipeline.",
};

export default function ConstellationCorePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-4">
      <ConstellationCore />
    </main>
  );
}
