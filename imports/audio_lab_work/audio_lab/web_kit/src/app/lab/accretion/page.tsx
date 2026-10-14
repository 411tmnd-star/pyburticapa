import type { Metadata } from "next";

import Accretion from "@/components/accretion/Accretion";

export const metadata: Metadata = {
  title: "Accretion: a black hole driven by sound",
  description: "Bass brightens the ring around a dark centre, mids turn the accretion disk and bass hits fire the jets. A WebGL scene on the shared audio pipeline.",
};

export default function AccretionPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-4">
      <Accretion />
    </main>
  );
}
