import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as THREE from "three";

import { COLS, ROWS, createMatrixAnim, rowOffset, stepMatrixAnim } from "../src/lib/spectrum-matrix/animator";
import { toMatrixParams } from "../src/lib/spectrum-matrix/params";
import { FIT_HALF_WIDTH, H_MAX, SPACING, SpectrumMatrixScene, WIDTH, Z_FAR, sceneStats } from "../src/lib/spectrum-matrix/scene";
import { IDLE_FRAME, makeFrame } from "../src/lib/pipeline/contract";

// Three.js builds scenes, geometry and materials without a GPU, so ownership, disposal, framing, continuity and uniform
// mapping are tested here. Shader compilation and drawing are checked in the browser (preview/matrix-check.mjs).

const VIEW = { azimuth: 0, elevation: 0 };
const LOUD = toMatrixParams(makeFrame({ ...IDLE_FRAME, isPlaying: true, bass: 0.8, mid: 0.6, high: 0.4, rmsEnergy: 0.7, currentSceneState: "active" }), false);

function collect(s: SpectrumMatrixScene) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  s.scene.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.geometry) geometries.add(m.geometry);
    if (m.material) (Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => materials.add(x));
  });
  return { geometries: [...geometries], materials: [...materials] };
}
const terrainOf = (s: SpectrumMatrixScene) => s.scene.children.find((c) => c.type === "Group") as THREE.Group;
const linesOf = (s: SpectrumMatrixScene) => (terrainOf(s).children.find((c) => (c as THREE.LineSegments).isLineSegments) as THREE.LineSegments);

describe("Spectrum Matrix scene: ownership and disposal", () => {
  it("builds the haze, the surface and the wireframe from 3 geometries and 3 materials", () => {
    const s = new SpectrumMatrixScene();
    const { geometries, materials } = collect(s);
    assert.equal(geometries.length, 3);
    assert.equal(materials.length, 3);
    assert.deepEqual(s.resourceCounts, { geometries: 3, materials: 3 });
    s.dispose();
  });

  it("the surface and the wireframe share one set of vertices (the heights are uploaded once)", () => {
    const s = new SpectrumMatrixScene();
    const surface = terrainOf(s).children.find((c) => (c as THREE.Mesh).isMesh) as THREE.Mesh;
    const lines = linesOf(s);
    assert.equal(surface.geometry.getAttribute("position"), lines.geometry.getAttribute("position"));
    assert.equal(surface.geometry.getAttribute("aH"), lines.geometry.getAttribute("aH"));
    assert.equal(lines.geometry.getAttribute("position").count, ROWS * COLS);
    s.dispose();
  });

  it("dispose releases every geometry and material it created, exactly once", () => {
    const s = new SpectrumMatrixScene();
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

  it("releaseGpu disposes the GPU records but keeps the scene graph and marks the heights for re-upload", () => {
    const s = new SpectrumMatrixScene();
    const { geometries, materials } = collect(s);
    let events = 0;
    for (const r of [...geometries, ...materials]) r.addEventListener("dispose", () => events++);
    const kids = s.scene.children.length;
    const v0 = (linesOf(s).geometry.getAttribute("position") as THREE.BufferAttribute).version;
    s.releaseGpu();
    assert.equal(events, geometries.length + materials.length);
    assert.equal(s.scene.children.length, kids);
    assert.ok((linesOf(s).geometry.getAttribute("position") as THREE.BufferAttribute).version > v0, "the position attribute will be re-sent");
    s.dispose();
  });

  it("update, releaseGpu and a second dispose after dispose do nothing and do not throw", () => {
    const s = new SpectrumMatrixScene();
    s.dispose();
    assert.doesNotThrow(() => { s.update(createMatrixAnim(), VIEW); s.releaseGpu(); s.dispose(); });
  });
});

describe("Spectrum Matrix scene: scrolling is continuous", () => {
  it("rowZ is continuous across a row boundary: the age-j row at frac 1 sits where the age-(j+1) row sits at frac 0", () => {
    const s = new SpectrumMatrixScene();
    for (const j of [0, 7, ROWS - 2]) assert.ok(Math.abs(s.rowZ(j, 1) - s.rowZ(j + 1, 0)) < 1e-12);
    s.dispose();
  });

  it("the terrain group slides by frac x SPACING, so vertex world z equals rowZ", () => {
    const s = new SpectrumMatrixScene();
    const a = createMatrixAnim();
    for (const frac of [0, 0.25, 0.9]) {
      a.frac = frac;
      s.update(a, VIEW);
      const pos = linesOf(s).geometry.getAttribute("position");
      const r = 11;
      const worldZ = pos.getZ(r * COLS + 3) + terrainOf(s).position.z;
      assert.ok(Math.abs(worldZ - s.rowZ(r, frac)) < 1e-6, `z ${worldZ} vs ${s.rowZ(r, frac)}`);
    }
    s.dispose();
  });

  it("across an injection the terrain data shifts by one row while the slide resets, so every row moves only by the scroll", () => {
    const s = new SpectrumMatrixScene();
    const a = createMatrixAnim();
    a.motion = LOUD.motion;
    // advance to just before a row boundary
    while (a.frac < 0.9 || a.serial < 3) stepMatrixAnim(a, LOUD, 1 / 240, false);
    s.update(a, VIEW);
    const pos = linesOf(s).geometry.getAttribute("position");
    const hAttr = linesOf(s).geometry.getAttribute("aH");
    const before = { h: hAttr.getX(5 * COLS + 10), y: pos.getY(5 * COLS + 10), z: pos.getZ(5 * COLS + 10) + terrainOf(s).position.z };
    const serial = a.serial;
    while (a.serial === serial) stepMatrixAnim(a, LOUD, 1 / 240, false);
    s.update(a, VIEW);
    const after = { h: hAttr.getX(6 * COLS + 10), y: pos.getY(6 * COLS + 10), z: pos.getZ(6 * COLS + 10) + terrainOf(s).position.z };
    assert.equal(after.h, before.h, "the same terrain data, one row older");
    assert.ok(Math.abs(after.y - before.y) < 1e-6);
    assert.ok(Math.abs(after.z - before.z) < SPACING * 0.4, `moved ${after.z - before.z} (spacing ${SPACING})`);
    assert.ok(after.z >= before.z - 1e-9, "it moves toward the camera, never backwards");
    s.dispose();
  });

  it("the heights are re-sent only when a row was injected, and map value x H_MAX onto y", () => {
    const s = new SpectrumMatrixScene();
    const a = createMatrixAnim();
    s.update(a, VIEW);
    const pos = linesOf(s).geometry.getAttribute("position") as THREE.BufferAttribute;
    const v1 = pos.version;
    s.update(a, VIEW);
    assert.equal(pos.version, v1, "no new row: no upload");
    for (let i = 0; i < 40; i++) stepMatrixAnim(a, LOUD, 1 / 60, false);
    s.update(a, VIEW);
    assert.ok(pos.version > v1, "new rows: uploaded");
    const off = rowOffset(a, 0);
    assert.ok(Math.abs(pos.getY(0 * COLS + 5) - a.rows[off + 5] * H_MAX) < 1e-6);
    let max = 0;
    for (let i = 0; i < ROWS * COLS; i++) max = Math.max(max, pos.getY(i));
    assert.ok(max <= H_MAX + 1e-6);
    s.dispose();
  });
});

describe("Spectrum Matrix scene: framing and uniforms", () => {
  it("keeps a minimum distance on wide canvases and backs off on narrow ones, so the three lobes fit the width", () => {
    const s = new SpectrumMatrixScene();
    s.setViewport(1248, 563, 1);
    const wide = s.distance;
    s.setViewport(358, 355, 1);
    const narrow = s.distance;
    assert.ok(narrow > wide);
    const tanHalf = Math.tan((36 * Math.PI) / 360);
    assert.ok(Math.abs(narrow * tanHalf * (358 / 355) - FIT_HALF_WIDTH) < 1e-6);
    const xs = s.lobeCentresX();
    assert.ok(xs[0] < xs[1] && xs[1] < xs[2]);
    assert.ok(Math.max(...xs.map(Math.abs)) < FIT_HALF_WIDTH, "the lobe centres are inside the fitted half-width");
    assert.ok(Math.max(...xs.map(Math.abs)) <= WIDTH / 2);
    s.setViewport(0, 0, 1);
    assert.equal(s.distance, narrow, "a zero-size canvas is ignored");
    s.dispose();
  });

  it("the camera looks at the terrain, moves closer as the scene level rises, and clamps a dragged azimuth", () => {
    const s = new SpectrumMatrixScene();
    s.setViewport(1248, 563, 1);
    const a = createMatrixAnim();
    s.update(a, VIEW);
    const far = s.camera.position.distanceTo(new THREE.Vector3(0, 0.6, -6));
    a.sceneLevel = 1;
    s.update(a, VIEW);
    assert.ok(s.camera.position.distanceTo(new THREE.Vector3(0, 0.6, -6)) < far);
    s.update(a, { azimuth: 50, elevation: 0 });
    assert.ok(Math.abs(s.camera.position.x) < s.distance * Math.sin(0.8), "the azimuth is clamped");
    s.dispose();
  });

  it("writes exposure, colour and the fraction scrolled into the terrain uniforms", () => {
    const s = new SpectrumMatrixScene();
    s.setViewport(1248, 563, 1);
    const a = createMatrixAnim();
    a.exposure = 0.6; a.colour = 0.4; a.frac = 0.3; a.glow = 0.5;
    s.update(a, VIEW);
    const us: Array<Record<string, { value: number }>> = [];
    s.scene.traverse((o) => { const m = (o as THREE.Mesh).material as THREE.ShaderMaterial | undefined; if (m?.uniforms && "uFrac" in m.uniforms) us.push(m.uniforms as never); });
    assert.equal(us.length, 2);
    assert.ok(us.every((u) => u.uExposure.value === 0.6 && u.uColour.value === 0.4 && u.uFrac.value === 0.3));
    s.dispose();
  });

  it("the far end is at Z_FAR and rows get nearer with age", () => {
    const s = new SpectrumMatrixScene();
    assert.equal(s.rowZ(0, 0), Z_FAR);
    assert.ok(s.rowZ(ROWS - 1, 0) > s.rowZ(0, 0));
    s.dispose();
  });
});
