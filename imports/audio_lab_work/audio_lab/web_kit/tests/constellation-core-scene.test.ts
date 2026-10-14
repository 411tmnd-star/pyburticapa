import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as THREE from "three";

import { createCoreAnim } from "../src/lib/constellation-core/animator";
import { BEAM_POINTS_PER_SIDE, ConstellationCoreScene, FIT_HALF_WIDTH, ORBS_PER_RING, RING_RADII, STAR_COUNT, sceneStats } from "../src/lib/constellation-core/scene";

// Three.js builds scenes, geometry and materials without a GPU, so ownership, disposal, framing and uniform mapping are
// tested here. Shader compilation and drawing are checked in the browser (preview/core-check.mjs).

const VIEW = { azimuth: 0, elevation: 0 };

function collect(s: ConstellationCoreScene) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  s.scene.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.geometry) geometries.add(m.geometry);
    if (m.material) (Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => materials.add(x));
  });
  return { geometries: [...geometries], materials: [...materials] };
}

describe("Constellation Core scene: ownership and disposal", () => {
  it("builds the core, three rings, eight orbs, the beam, the halo and the stars from 9 geometries and 9 materials", () => {
    const s = new ConstellationCoreScene();
    const { geometries, materials } = collect(s);
    assert.equal(geometries.length, 9);
    assert.equal(materials.length, 9);
    assert.deepEqual(s.resourceCounts, { geometries: 9, materials: 9 });
    assert.equal(s.rings.length, 3);
    let orbs = 0;
    s.scene.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh && (m.geometry as THREE.SphereGeometry).parameters?.radius === 1) orbs++; });
    assert.equal(orbs, ORBS_PER_RING.reduce((a, b) => a + b, 0));
    const points = s.scene.children.filter((o) => (o as THREE.Points).isPoints) as THREE.Points[];
    const counts = points.map((p) => p.geometry.getAttribute("aSeed")?.count ?? p.geometry.getAttribute("aMag")?.count).sort((a, b) => (a ?? 0) - (b ?? 0));
    assert.deepEqual(counts, [BEAM_POINTS_PER_SIDE * 2, STAR_COUNT].sort((a, b) => a - b));
    s.dispose();
  });

  it("dispose releases every geometry and material it created, exactly once", () => {
    const s = new ConstellationCoreScene();
    const { geometries, materials } = collect(s);
    let events = 0;
    for (const r of [...geometries, ...materials]) r.addEventListener("dispose", () => events++);
    const before = { ...sceneStats };
    s.dispose();
    assert.equal(events, geometries.length + materials.length);
    assert.equal(s.scene.children.length, 0);
    assert.equal(sceneStats.disposed, before.disposed + 1);
    s.dispose();
    assert.equal(events, geometries.length + materials.length, "a second dispose does nothing");
    assert.equal(sceneStats.disposed, before.disposed + 1);
  });

  it("releaseGpu disposes the GPU records but keeps the scene graph, so a restore can re-upload", () => {
    const s = new ConstellationCoreScene();
    const { geometries, materials } = collect(s);
    let events = 0;
    for (const r of [...geometries, ...materials]) r.addEventListener("dispose", () => events++);
    const kids = s.scene.children.length;
    s.releaseGpu();
    assert.equal(events, geometries.length + materials.length);
    assert.equal(s.scene.children.length, kids);
    s.dispose();
  });

  it("update and releaseGpu after dispose do nothing and do not throw", () => {
    const s = new ConstellationCoreScene();
    s.dispose();
    assert.doesNotThrow(() => { s.update(createCoreAnim(), VIEW); s.releaseGpu(); });
  });

  it("created and disposed counters balance after create and dispose", () => {
    const a = { ...sceneStats };
    new ConstellationCoreScene().dispose();
    assert.equal(sceneStats.created, a.created + 1);
    assert.equal(sceneStats.disposed, a.disposed + 1);
  });
});

describe("Constellation Core scene: framing", () => {
  it("keeps a minimum distance on wide canvases and backs off on narrow ones, so the outer ring fits", () => {
    const s = new ConstellationCoreScene();
    s.setViewport(1248, 563, 1);
    const wide = s.distance;
    s.setViewport(358, 352, 1);
    const narrow = s.distance;
    assert.ok(narrow > wide, `narrow ${narrow} vs wide ${wide}`);
    const tanHalf = Math.tan((36 * Math.PI) / 360);
    assert.ok(Math.abs(narrow * tanHalf * (358 / 352) - FIT_HALF_WIDTH) < 1e-6, "narrow canvases show exactly FIT_HALF_WIDTH");
    assert.ok(FIT_HALF_WIDTH > Math.max(...RING_RADII), "the fit half-width exceeds the outer ring");
    s.dispose();
  });

  it("ignores a zero-size canvas", () => {
    const s = new ConstellationCoreScene();
    s.setViewport(800, 400, 1);
    const d = s.distance;
    s.setViewport(0, 0, 1);
    assert.equal(s.distance, d);
    s.dispose();
  });

  it("the camera looks at the core and moves closer as the scene level rises", () => {
    const s = new ConstellationCoreScene();
    s.setViewport(1248, 563, 1);
    const a = createCoreAnim();
    s.update(a, VIEW);
    const far = s.camera.position.length();
    a.sceneLevel = 1;
    s.update(a, VIEW);
    assert.ok(s.camera.position.length() < far);
    s.dispose();
  });
});

describe("Constellation Core scene: update", () => {
  it("writes the animation state into uniforms, and a pulse lights only the chosen ring", () => {
    const s = new ConstellationCoreScene();
    s.setViewport(1248, 563, 1);
    const a = createCoreAnim();
    a.phase = 2; a.pulse = 0.8; a.pulseRing = 1; a.exposure = 0.6; a.colour = 0.4; a.glow = 0.5; a.beam = 0.5;
    s.update(a, VIEW);
    const uniforms: Array<Record<string, { value: number }>> = [];
    s.scene.traverse((o) => { const m = (o as THREE.Mesh).material as THREE.ShaderMaterial | undefined; if (m?.uniforms && "uPulse" in m.uniforms) uniforms.push(m.uniforms as never); });
    assert.equal(uniforms.length, 3);
    assert.deepEqual(uniforms.map((u) => u.uPulse.value), [0, 0.8, 0]);
    assert.ok(uniforms.every((u) => u.uExposure.value === 0.6 && u.uColour.value === 0.4));
    assert.ok(uniforms[0].uHead.value > uniforms[1].uHead.value && uniforms[1].uHead.value > uniforms[2].uHead.value, "inner rings turn faster");
    s.dispose();
  });

  it("keeps every orb on its ring's radius as the phase advances", () => {
    const s = new ConstellationCoreScene();
    s.setViewport(1248, 563, 1);
    const a = createCoreAnim();
    for (const phase of [0, 1.3, 7.9, 100]) {
      a.phase = phase;
      s.update(a, VIEW);
      s.rings.forEach((g, i) => g.children.forEach((c) => {
        if ((c as THREE.Mesh).geometry instanceof THREE.SphereGeometry) assert.ok(Math.abs(Math.hypot(c.position.x, c.position.y, c.position.z) - RING_RADII[i]) < 1e-9);
      }));
    }
    s.dispose();
  });

  it("the beam level is capped below full strength even when the impulse is at maximum", () => {
    const s = new ConstellationCoreScene();
    s.setViewport(1248, 563, 1);
    const a = createCoreAnim();
    a.beam = 1; a.exposure = 1;
    s.update(a, VIEW);
    const levels: number[] = [];
    s.scene.traverse((o) => { const m = (o as THREE.Mesh).material as THREE.ShaderMaterial | undefined; if (m?.uniforms && "uBeam" in m.uniforms) levels.push(m.uniforms.uBeam.value as number); });
    assert.equal(levels.length, 2);
    assert.ok(levels.every((v) => v <= 0.8 + 1e-9), `levels ${levels}`);
    s.dispose();
  });
});
