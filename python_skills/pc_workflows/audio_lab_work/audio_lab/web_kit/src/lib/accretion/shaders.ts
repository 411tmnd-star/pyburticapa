/**
 * GLSL for the Accretion v0 scene. Artistic, inspired by images of black holes; not a physical simulation.
 * Every effect is driven by uniforms only: no textures and no render targets. Noise is cheap 2D value noise
 * (three octaves at most), kept to the disk, which covers a fraction of the screen.
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

/** Restrained temperature-like ramp: hot near the inner edge, cooling outwards. `shift` moves it towards a cooler, violet-leaning variant. */
const RAMP = /* glsl */ `
vec3 diskRamp(float t, float shift) {
  vec3 hot  = mix(vec3(1.00, 0.95, 0.86), vec3(0.92, 0.95, 1.00), shift);
  vec3 mid  = mix(vec3(1.00, 0.58, 0.22), vec3(0.98, 0.52, 0.42), shift);
  vec3 cool = mix(vec3(0.50, 0.12, 0.07), vec3(0.32, 0.10, 0.30), shift);
  return t < 0.35 ? mix(hot, mid, t / 0.35) : mix(mid, cool, (t - 0.35) / 0.65);
}
`;

export const PLANE_VERT = /* glsl */ `
varying vec2 vP;
void main() {
  vP = position.xy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/**
 * One disk layer. Differential rotation (faster inwards), streaks along the orbit, banding, an inner-edge glow,
 * a view-dependent brightening on the approaching side, and a rate-limited flare knot that rides the rotation.
 */
export const DISK_FRAG = /* glsl */ `
precision highp float;
uniform float uPhase;
uniform float uFlow;
uniform float uTurb;
uniform float uColour;
uniform float uExposure;
uniform float uHeat;
uniform float uDetail;
uniform float uInner;
uniform float uOuter;
uniform float uLayer;
uniform float uGain;
uniform float uScale;
uniform float uCamAngle;
uniform float uFlare;
uniform float uFlareAngle;
varying vec2 vP;
${NOISE}
${RAMP}
void main() {
  float r = length(vP);
  float t = clamp((r - uInner) / (uOuter - uInner), 0.0, 1.0);
  float ang = atan(vP.y, vP.x);
  float omega = pow(uInner / max(r, uInner), 1.5);
  float a = ang + uPhase * omega * (1.0 + 0.08 * uLayer);
  vec2 q = vec2(cos(a), sin(a)) * (1.4 * uScale) + vec2(0.0, r * 2.6 * uScale);
  float warp = 0.9 * uTurb;
  float n1 = vnoise(q * 2.0 + uLayer * 7.31 + warp * vnoise(q * 1.3 + uFlow * 0.07));
  float n2 = vnoise(q * 5.1 + uLayer * 3.17 - uFlow * 0.03);
  float n3 = vnoise(q * 11.0 + uLayer * 1.7);
  float n = 0.55 * n1 + 0.30 * n2 + 0.15 * n3 * (0.4 + 0.6 * uDetail);
  float bands = 0.72 + 0.28 * sin(r * 9.0 + n * 4.0);
  float inner = smoothstep(uInner - 0.02, uInner + 0.25, r);
  float outer = 1.0 - smoothstep(uOuter * 0.62, uOuter, r);
  float falloff = pow(1.0 - t, 1.7);
  float doppler = 1.0 + 0.42 * sin(ang - uCamAngle);
  float I = inner * outer * falloff * (0.25 + 0.95 * n) * bands * doppler;
  I *= (0.32 + 0.85 * uExposure) * (0.8 + 0.45 * uHeat);
  float da = atan(sin(a - uFlareAngle), cos(a - uFlareAngle));
  float dr = r - uInner * 1.35;
  float knot = exp(-da * da / 0.05) * exp(-dr * dr / 0.18) * uFlare;
  vec3 col = diskRamp(t, 0.6 * uColour) * I + vec3(1.0, 0.92, 0.80) * knot * 1.2;
  gl_FragColor = vec4(col * uGain, 1.0);
}
`;

/**
 * A camera-facing plane through the centre: the photon ring at the shadow's edge, a soft halo, a restrained
 * impression of the lensed far side of the disk arching above and below the shadow, and faint atmospheric glow.
 * Nothing is drawn inside the shadow.
 */
export const HALO_FRAG = /* glsl */ `
precision highp float;
uniform float uRim;
uniform float uExposure;
uniform float uColour;
uniform float uDiskBright;
uniform float uRadius;
varying vec2 vP;
void main() {
  float d = length(vP);
  float R = uRadius;
  float ringX = (d - R * 1.025) / (0.018 * R);
  float ring = exp(-ringX * ringX);
  float halo = exp(-max(d - R, 0.0) / (0.35 * R));
  float up = abs(vP.y) / max(d, 1e-4);
  float arcX = (d - R * 1.22) / (0.08 * R);
  float arc = exp(-arcX * arcX) * up * up;
  // Faded to zero well inside the plane's edge (half-size 9), so no boundary is ever visible.
  float atmos = exp(-d / 5.0) * 0.06 * (1.0 - smoothstep(6.0, 8.5, d));
  vec3 ringCol = vec3(1.0, 0.92, 0.82);
  vec3 arcCol = mix(vec3(1.0, 0.60, 0.25), vec3(0.95, 0.55, 0.50), 0.6 * uColour);
  vec3 col = ringCol * (ring * (0.25 + 0.75 * uRim) + halo * 0.12 * uRim) * (0.5 + 0.5 * uExposure)
           + arcCol * arc * uDiskBright * 0.35
           + vec3(0.30, 0.20, 0.32) * atmos * (0.4 + uExposure);
  float outside = smoothstep(R * 0.985, R, d);
  gl_FragColor = vec4(col * outside, 1.0);
}
`;

/** Jets: points flowing outwards along the axis, widening and fading with distance. */
export const JET_VERT = /* glsl */ `
attribute float aSeed;
attribute float aSide;
attribute vec3 aJit;
uniform float uFlow;
uniform float uJet;
uniform float uSpeed;
uniform float uLength;
uniform float uScale;
varying float vA;
varying float vS;
void main() {
  float s = fract(aSeed + uFlow * uSpeed * (0.7 + 0.3 * aJit.z));
  float len = uLength * (0.55 + 0.45 * uJet);
  float spread = 0.06 + 0.5 * s;
  vec3 pos = vec3(aJit.x * spread, aSide * (1.05 + s * len), aJit.y * spread);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  vA = 0.22 * uJet * (1.0 - s) * (1.0 - s) * (0.35 + 0.65 * (1.0 - length(aJit.xy)));
  vS = s;
  gl_PointSize = (0.8 + 1.4 * (1.0 - s)) * uScale / -mv.z;
}
`;

export const JET_FRAG = /* glsl */ `
precision highp float;
varying float vA;
varying float vS;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float a = 1.0 - 4.0 * dot(c, c);
  if (a <= 0.0) discard;
  vec3 col = mix(vec3(0.75, 0.85, 1.0), vec3(0.55, 0.60, 1.0), vS);
  gl_FragColor = vec4(col * a * vA, 1.0);
}
`;

/** Background stars: fixed positions, magnitude and tint per star, a slight twinkle tied to the highs. */
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
  vec3 col = mix(vec3(1.0, 0.85, 0.70), vec3(0.75, 0.85, 1.0), vTint);
  gl_FragColor = vec4(col * vB * a * 0.55, 1.0);
}
`;
