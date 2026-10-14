import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as THREE from "three";

import { createAccretionAnim } from "../src/lib/accretion/animator";
import { AccretionScene, BODY_RADIUS, JET_POINTS_PER_SIDE, STAR_COUNT, sceneStats } from "../src/lib/accretion/scene";

// Three.js builds scenes, geometry and materials without a GPU, so ownership, disposal and uniform mapping are
// tested here. Shader compilation and drawing are checked in the browser (preview/accretion-check.mjs).

const VIEW = { azimuth: 0, elevation: 0 };

function collect(s: AccretionScene) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  s.scene.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.geometry) geometries.add(m.geometry);
    if (m.material) (Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => materials.add(x));
  });
  return { geometries: [...geometries], materials: [...materials] };
}

describe("Accretion scene: ownership and disposal", () => {
  it("builds the central body, three disk layers, the jets, the stars and the halo plane", () => {
    const s = new AccretionScene();
    const { geometries, materials } = collect(s);
    assert.equal(geometries.length, 7);
    assert.equal(materials.length, 7);
    assert.deepEqual(s.resourceCounts, { geometries: 7, materials: 7 });
    const points = s.scene.children.filter((o) => (o as THREE.Points).isPoints) as THREE.Points[];
    const counts = points.map((p) => p.geometry.getAttribute("aSeed")?.count ?? p.geometry.getAttribute("aMag")?.count).sort((a, b) => (a ?? 0) - (b ?? 0));
    assert.deepEqual(counts, [STAR_COUNT, JET_POINTS_PER_SIDE * 2]);
    s.dispose();
  });

  it("dispose releases every geometry and material it created, exactly once", () => {
    const s = new AccretionScene();
    const { geometries, materials } = collect(s);
    let disposedEvents = 0;
    for (const r of [...geometries, ...materials]) r.addEventListener("dispose", () => disposedEvents++);
    const before = { ...sceneStats };
    s.dispose();
    assert.equal(disposedEvents, geometries.length + materials.length);
    assert.equal(s.scene.children.length, 0, "the scene graph is emptied");
    assert.equal(sceneStats.disposed, before.disposed + 1);
    s.dispose();
    assert.equal(disposedEvents, geometries.length + materials.length, "a second dispose does nothing");
    assert.equal(sceneStats.disposed, before.disposed + 1);
  });

  it("releaseGpu (on context loss) releases every GPU record but keeps the scene graph, so it can be redrawn", () => {
    const s = new AccretionScene();
    const { geometries, materials } = collect(s);
    const children = s.scene.children.length;
    let released = 0;
    for (const r of [...geometries, ...materials]) r.addEventListener("dispose", () => released++);
    const before = { ...sceneStats };
    s.releaseGpu();
    assert.equal(released, geometries.length + materials.length, "every geometry and material released");
    assert.equal(s.scene.children.length, children, "the scene graph is kept for re-upload");
    assert.equal(sceneStats.disposed, before.disposed, "releasing is not disposing");
    assert.doesNotThrow(() => s.update(createAccretionAnim(), VIEW));
    s.dispose();
    assert.equal(sceneStats.disposed, before.disposed + 1);
    s.releaseGpu();
    assert.equal(released, 2 * (geometries.length + materials.length), "after dispose, releaseGpu does nothing more");
  });

  it("update after dispose is a no-op and does not throw", () => {
    const s = new AccretionScene();
    s.dispose();
    assert.doesNotThrow(() => s.update(createAccretionAnim(), VIEW));
  });

  it("creation and disposal counts balance across many scenes", () => {
    const start = { ...sceneStats };
    for (let i = 0; i < 20; i++) new AccretionScene().dispose();
    assert.equal(sceneStats.created - start.created, 20);
    assert.equal(sceneStats.disposed - start.disposed, 20);
  });

  it("is deterministic: two scenes have identical star and jet seeds", () => {
    const a = new AccretionScene();
    const b = new AccretionScene();
    const stars = (s: AccretionScene) => ((s.scene.children.find((o) => (o as THREE.Points).isPoints && (o as THREE.Points).geometry.getAttribute("aMag")) as THREE.Points).geometry.getAttribute("position").array as Float32Array);
    assert.deepEqual(Array.from(stars(a).slice(0, 30)), Array.from(stars(b).slice(0, 30)));
    a.dispose();
    b.dispose();
  });
});

describe("Accretion scene: mapping animation state to the picture", () => {
  const uniformsOf = (s: AccretionScene, name: string) => {
    const out: number[] = [];
    s.scene.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.ShaderMaterial | undefined;
      if (m && (m as THREE.ShaderMaterial).isShaderMaterial && m.uniforms[name]) out.push(m.uniforms[name].value as number);
    });
    return out;
  };

  it("writes the animation state into the disk uniforms", () => {
    const s = new AccretionScene();
    const a = createAccretionAnim();
    Object.assign(a, { diskPhase: 3.2, diskTurbulence: 0.5, diskColour: 0.7, exposure: 0.6, rimGlow: 0.4, flare: 0.9, flareAngle: 1.1 });
    s.update(a, VIEW);
    assert.deepEqual(uniformsOf(s, "uPhase"), [3.2, 3.2, 3.2]);
    assert.deepEqual(uniformsOf(s, "uTurb"), [0.5, 0.5, 0.5]);
    assert.deepEqual(uniformsOf(s, "uFlare"), [0.9, 0.9, 0.9]);
    s.dispose();
  });

  it("the jet level is 0.7 x the impulse plus a faint steady glow, so even a full hit stays below the maximum", () => {
    const s = new AccretionScene();
    const a = createAccretionAnim();
    Object.assign(a, { jet: 0.5, exposure: 1 });
    s.update(a, VIEW);
    assert.ok(Math.abs(uniformsOf(s, "uJet")[0] - 0.41) < 1e-9);
    Object.assign(a, { jet: 1, exposure: 1 });
    s.update(a, VIEW);
    assert.ok(Math.abs(uniformsOf(s, "uJet")[0] - 0.76) < 1e-9);
    Object.assign(a, { jet: 0, exposure: 0 });
    s.update(a, VIEW);
    assert.equal(uniformsOf(s, "uJet")[0], 0, "silence: no jet");
    s.dispose();
  });

  it("bass swells the central body by at most 4 percent, and the ring follows its edge", () => {
    const s = new AccretionScene();
    const a = createAccretionAnim();
    a.horizon = 1;
    s.update(a, VIEW);
    const body = s.scene.children.find((o) => (o as THREE.Mesh).isMesh && ((o as THREE.Mesh).geometry as THREE.SphereGeometry).type === "SphereGeometry")!;
    assert.ok(Math.abs(body.scale.x - 1.04) < 1e-9);
    assert.ok(Math.abs(uniformsOf(s, "uRadius")[0] - BODY_RADIUS * 1.04) < 1e-9);
    s.dispose();
  });

  it("the camera always looks at the centre and comes closer as the scene level rises", () => {
    const s = new AccretionScene();
    const a = createAccretionAnim();
    a.sceneLevel = 0;
    s.update(a, VIEW);
    const far = s.camera.position.length();
    a.sceneLevel = 1;
    s.update(a, VIEW);
    const near = s.camera.position.length();
    assert.ok(near < far, `near ${near} vs far ${far}`);
    const forward = new THREE.Vector3();
    s.camera.getWorldDirection(forward);
    const toCentre = s.camera.position.clone().negate().normalize();
    assert.ok(forward.dot(toCentre) > 0.9999);
    s.dispose();
  });

  it("the viewer's elevation is clamped so the camera never flips over the pole", () => {
    const s = new AccretionScene();
    s.update(createAccretionAnim(), { azimuth: 0, elevation: 10 });
    const p = s.camera.position;
    const elev = Math.asin(p.y / p.length());
    assert.ok(elev <= 1.1 + 1e-9 && elev > 0);
    s.dispose();
  });
});
