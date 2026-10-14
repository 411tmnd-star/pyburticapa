import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import GlCanvas from "@/components/gl/GlCanvas";
import { hostStats, type GlHost } from "@/lib/gl/host";
import { AudioPipelineProvider } from "@/lib/pipeline/react";

// Test harness for the empty WebGL host only. Not a page. It mounts and unmounts one GlCanvas so the browser check
// can measure lifecycle, resize, visibility, reduced motion and context loss. It exposes window.__glhost for the check.

let setMountedFn: ((v: boolean) => void) | null = null;
let currentHost: GlHost | null = null;

function Harness() {
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    setMountedFn = setMounted;
    return () => {
      setMountedFn = null;
    };
  }, []);
  return (
    <AudioPipelineProvider>
      <div style={{ width: "min(900px, 100%)", height: 360 }}>
        {mounted && <GlCanvas className="h-full w-full" label="Empty WebGL host test" onHost={(h) => (currentHost = h)} />}
      </div>
    </AudioPipelineProvider>
  );
}

(window as unknown as { __glhost: unknown }).__glhost = {
  set: (v: boolean) => setMountedFn?.(v),
  host: () => currentHost,
  stats: hostStats,
};

createRoot(document.getElementById("root")!).render(<Harness />);
