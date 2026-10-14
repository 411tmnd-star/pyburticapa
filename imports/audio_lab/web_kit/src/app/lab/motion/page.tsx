import type { Metadata } from "next";

import MotionLab from "@/components/motion/MotionLab";

export const metadata: Metadata = {
  title: "Motion Lab",
  description: "Hear a song, see the motion plan an analysis of it produced: scene states, anticipated accents and transitions.",
};

export default function MotionLabPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <MotionLab />
    </main>
  );
}
