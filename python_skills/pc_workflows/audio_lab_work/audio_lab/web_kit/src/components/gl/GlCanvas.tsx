"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { GlHost } from "@/lib/gl/host";
import type { GlStatus } from "@/lib/gl/state";
import { useAudioFrame } from "@/lib/pipeline/react";

/**
 * A WebGL canvas that a visualizer can draw into. It has no scene of its own: this empty version clears the canvas
 * to the page's background colour. The accretion scene will be passed in later, in a separate change.
 *
 * It follows the same conventions as the existing visualizers: the renderer is created in an effect and disposed
 * in its cleanup, and drawing happens inside the shared audio frame callback (useAudioFrame), not in a loop of its own.
 */
export default function GlCanvas({ className = "", label, onHost }: { className?: string; label: string; onHost?: (host: GlHost | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<GlHost | null>(null);
  const [scene] = useState(() => new THREE.Scene());
  const [camera] = useState(() => new THREE.PerspectiveCamera(50, 1, 0.1, 100));
  const [status, setStatus] = useState<GlStatus>("ready");
  const onHostRef = useRef(onHost);
  onHostRef.current = onHost;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = new GlHost({ canvas, onStatus: setStatus });
    hostRef.current = host;
    host.three?.setClearColor(0x03050b, 1);
    onHostRef.current?.(host);
    setStatus(host.status);
    return () => {
      hostRef.current = null;
      onHostRef.current?.(null);
      host.dispose();
    };
  }, []);

  useAudioFrame(() => {
    hostRef.current?.render(scene, camera);
  });

  return (
    // The canvas is taken out of the layout (absolute), so its size can follow the container and never the other way.
    <div data-gl-status={status} className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} role="img" aria-label={label} style={{ position: "absolute", inset: 0 }} />
      {status === "unsupported" && (
        <p role="alert" className="p-4 text-sm text-slate-300">
          WebGL is not available in this browser, so this view cannot be drawn.
        </p>
      )}
    </div>
  );
}
