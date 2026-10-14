/**
 * GLSL for Constellation Core. Artistic: a glowing core, orbit rings, glass-like orbs, a vertical beam and stars.
 * Every effect is driven by uniforms only: no textures and no render targets. Noise is cheap 2D value noise
 * (copied from Accretion's shaders), used only on the core's disc and in the beam.
 */

const NOISE = /* glsl */ `
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
`;

/** Restrained blue-to-violet palette. `s` (0..0.6) moves it towards violet. */
const RAMP = /* glsl */ `
vec3 coreRamp(float s) {
  return mix(vec3(0.34, 0.76, 1.00), vec3(0.64, 0.52, 1.00), s);
}
`;

export const PLANE_VERT = /* glsl */ `
varying vec2 vP;
void main() {
  vP = position.xy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/** Shared by the core and the orbs: view-space normal and direction for a fresnel rim. */
export const BODY_VERT = /* glsl */ `
varying vec3 vN;
varying vec3 vV;
varying vec3 vObj;
void main() {
  vObj = normalize(position);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

/** The core: a near-black blue interior with a faint nebula, and a fresnel rim. Opaque, so it hides what is behind it. */
export const CORE_FRAG = /* glsl */ `
precision highp float;
uniform float uGlow;
uniform float uExposure;
uniform float uColour;
uniform float uFlow;
varying vec3 vN;
varying vec3 vV;
varying vec3 vObj;
${NOISE}
${RAMP}
void main() {
  float f = 1.0 - max(dot(normalize(vN), normalize(vV)), 0.0);
  float rim = pow(f, 2.6);
  vec2 q = vObj.xy * 2.2 + vec2(uFlow * 0.02, 0.0);
  float n = 0.6 * vnoise(q * 2.0) + 0.4 * vnoise(q * 5.0 + 3.1);
  float cloud = smoothstep(0.25, 1.0, n) * (1.0 - f);
  vec3 neb = mix(vec3(0.60, 0.22, 0.48), vec3(0.28, 0.36, 0.92), 0.5 * uColour);
  vec3 col = vec3(0.012, 0.030, 0.080)
           + neb * cloud * (0.10 + 0.45 * uExposure)
           + coreRamp(0.6 * uColour) * rim * (0.25 + 0.90 * uGlow) * (0.5 + 0.5 * uExposure);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * Orbs: a glassy body lit by a fixed key light (so it has volume rather than reading as a flat disc), a broad rim light that
 * shimmers with the highs, and a small specular highlight. One shared material for every orb. The key light is fixed in view
 * space, so the lit side is always the upper left, whichever way the camera drifts. Dithered like the core.
 */
export const ORB_FRAG = /* glsl */ `
precision highp float;
uniform float uShimmer;
uniform float uExposure;
uniform float uColour;
uniform float uFlow;
varying vec3 vN;
varying vec3 vV;
varying vec3 vObj;
${NOISE}
${RAMP}
void main() {
  vec3 n = normalize(vN);
  vec3 v = normalize(vV);
  vec3 L = normalize(vec3(-0.45, 0.65, 0.60));
  float f = 1.0 - max(dot(n, v), 0.0);
  float rim = pow(f, 1.6);
  float key = max(dot(n, L), 0.0);
  float spec = pow(max(dot(reflect(-L, n), v), 0.0), 28.0);
  float tw = 0.5 + 0.5 * sin(uFlow * 1.7 + vObj.x * 6.0 + vObj.y * 4.0);
  vec3 tint = coreRamp(0.6 * uColour);
  vec3 col = vec3(0.016, 0.034, 0.090)
           + tint * key * 0.20 * (0.6 + 0.4 * uExposure)
           + tint * rim * (0.40 + 0.30 * uShimmer * tw) * (0.55 + 0.60 * uExposure)
           + vec3(0.80, 0.90, 1.00) * spec * 0.35 * (0.5 + 0.5 * uExposure);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

/**
 * A camera-facing plane through the centre: a soft halo and a thin bright band at the core's edge, modulated around the
 * circumference so it does not read as a uniform outline, plus a faint atmosphere. Dithered so the dark gradient does not
 * band. Faded to zero well inside the plane's edge (half-size 8), so no boundary is ever visible.
 */
export const HALO_FRAG = /* glsl */ `
precision highp float;
uniform float uRadius;
uniform float uGlow;
uniform float uExposure;
uniform float uColour;
uniform float uFlow;
varying vec2 vP;
${NOISE}
${RAMP}
void main() {
  float d = length(vP);
  float R = uRadius;
  float ang = atan(vP.y, vP.x);
  float m = 0.55 + 0.45 * vnoise(vec2(cos(ang), sin(ang)) * 1.7 + vec2(uFlow * 0.1, 0.0));
  float bx = (d - R * 1.045) / (0.02 * R);
  float band = exp(-bx * bx) * m;
  float glow = exp(-max(d - R, 0.0) / (0.45 * R)) * 0.35;
  float atmos = exp(-d / 4.5) * 0.05 * (1.0 - smoothstep(5.0, 7.5, d));
  vec3 col = coreRamp(0.6 * uColour) * (band * (0.30 + 0.70 * uGlow) + glow * uGlow) * (0.5 + 0.5 * uExposure)
           + vec3(0.08, 0.14, 0.35) * atmos * (0.5 + uExposure);
  col *= smoothstep(R * 0.985, R, d);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

/** One orbit ring: a thin ribbon with a soft profile across its width and a bright head that travels along it. */
export const RING_FRAG = /* glsl */ `
precision highp float;
uniform float uInner;
uniform float uOuter;
uniform float uHead;
uniform float uPulse;
uniform float uExposure;
uniform float uColour;
varying vec2 vP;
${RAMP}
void main() {
  float r = length(vP);
  float t = clamp((r - uInner) / (uOuter - uInner), 0.0, 1.0);
  float prof = exp(-pow((t - 0.5) * 3.0, 2.0));
  float ang = atan(vP.y, vP.x);
  float head = pow(0.5 + 0.5 * cos(ang - uHead), 6.0);
  float tail = 0.35 * pow(0.5 + 0.5 * cos(ang - uHead - 3.14159), 3.0);
  float I = prof * (0.20 + 0.80 * head + tail) * (0.35 + 0.90 * uExposure) + prof * uPulse * 0.9;
  gl_FragColor = vec4(coreRamp(0.6 * uColour) * I, 1.0);
}
`;

/** The beam's strip: a bright narrow core with faint streaks, emerging from the core's surface and fading with distance. */
export const BEAM_STRIP_FRAG = /* glsl */ `
precision highp float;
uniform float uBeam;
uniform float uColour;
uniform float uFlow;
uniform float uCoreR;
varying vec2 vP;
${NOISE}
void main() {
  float ay = abs(vP.y);
  float x = vP.x;
  float streak = 0.7 + 0.3 * vnoise(vec2(x * 30.0, vP.y * 0.6 - uFlow * 0.4));
  float narrow = exp(-pow(x / 0.07, 2.0));
  float wide = exp(-pow(x / 0.22, 2.0)) * 0.25;
  float along = smoothstep(uCoreR * 0.9, uCoreR * 0.9 + 1.2, ay) * (1.0 - smoothstep(4.0, 9.5, ay));
  float I = (narrow * streak + wide) * along * uBeam;
  gl_FragColor = vec4(mix(vec3(0.60, 0.85, 1.00), vec3(0.80, 0.70, 1.00), 0.5 * uColour) * I, 1.0);
}
`;

/** Beam points: a narrow stream flowing outwards along the axis, faded in from the core so it reads as emitted. */
export const BEAM_VERT = /* glsl */ `
attribute float aSeed;
attribute float aSide;
attribute vec3 aJit;
uniform float uFlow;
uniform float uBeam;
uniform float uSpeed;
uniform float uLength;
uniform float uCoreR;
uniform float uScale;
varying float vA;
void main() {
  float s = fract(aSeed + uFlow * uSpeed * (0.7 + 0.3 * aJit.z));
  vec3 pos = vec3(aJit.x * 0.08, aSide * (uCoreR + s * uLength), aJit.y * 0.08);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  vA = 0.35 * uBeam * (1.0 - s) * (1.0 - s) * smoothstep(0.0, 0.12, s) * (0.4 + 0.6 * (1.0 - length(aJit.xy)));
  gl_PointSize = (0.8 + 1.2 * (1.0 - s)) * uScale / -mv.z;
}
`;

export const BEAM_FRAG = /* glsl */ `
precision highp float;
varying float vA;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float a = 1.0 - 4.0 * dot(c, c);
  if (a <= 0.0) discard;
  gl_FragColor = vec4(vec3(0.70, 0.88, 1.0) * a * vA, 1.0);
}
`;

/** Background stars: fixed positions, magnitude and tint per star, a slight twinkle tied to the highs (copied from Accretion, blue palette). */
export const STAR_VERT = /* glsl */ `
attribute float aMag;
attribute float aTint;
uniform float uFlow;
uniform float uTwinkle;
uniform float uScale;
uniform float uExposure;
varying float vB;
varying float vTint;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float tw = 1.0 + uTwinkle * 0.25 * sin(uFlow * (0.6 + 1.7 * aMag) + aMag * 40.0);
  vB = (0.25 + 0.75 * aMag) * tw * (0.7 + 0.3 * uExposure);
  vTint = aTint;
  gl_PointSize = (0.8 + 1.6 * aMag) * uScale;
}
`;

export const STAR_FRAG = /* glsl */ `
precision highp float;
varying float vB;
varying float vTint;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float a = 1.0 - 4.0 * dot(c, c);
  if (a <= 0.0) discard;
  vec3 col = mix(vec3(0.70, 0.82, 1.0), vec3(1.0, 0.95, 0.88), 0.5 * vTint);
  gl_FragColor = vec4(col * vB * a * 0.6, 1.0);
}
`;
