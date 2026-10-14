import type { Metadata } from "next";

import Squall from "@/components/squall/Squall";

export const metadata: Metadata = {
  title: "Squall: a song as weather",
  description: "Bass deepens the storms, highs bring rain and detected onsets strike lightning on a live weather map. Drag to blow wind.",
};

export default function SquallPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-4">
      <Squall />
    </main>
  );
}
