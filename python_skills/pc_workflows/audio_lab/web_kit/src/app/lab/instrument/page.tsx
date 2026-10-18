import type { Metadata } from "next";

import Instrument from "@/components/instrument/Instrument";

export const metadata: Metadata = {
  title: "Constellation: an audio-reactive instrument",
  description: "Load a track and watch bass, mids and highs move a particle constellation in real time.",
};

export default function InstrumentPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Instrument />
    </main>
  );
}
