precision highp float;

/** @resolution */
uniform vec2 u_resolution;

/**
 * @label Tint
 * @color
 * @default #2F7BFF
 */
uniform vec3 u_tint;

/**
 * @label Scroll
 * @default 0.5
 * @range 0, 1
 */
uniform float u_scroll;

/**
 * @label Sheen Strength
 * @default 0.5
 * @range 0, 1
 */
uniform float u_sheen;

/**
 * @label Sheen Width
 * @default 0.18
 * @range 0.05, 0.8
 */
uniform float u_width;

/**
 * @label Depth
 * @default 0.1
 * @range 0, 0.4
 */
uniform float u_depth;

/**
 * @label Grain
 * @default 0.03
 * @range 0, 0.15
 */
uniform float u_grain;

/**
 * @label Fluting
 * @default 0.007
 * @range 0, 0.1
 */
uniform float u_flute;

/**
 * @label Flute Spacing
 * @default 7
 * @range 2, 40
 */
uniform float u_spacing;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
  vec2 px = gl_FragCoord.xy;
  vec2 uv = px / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;

  vec3 col = u_tint;

  float t = dot(vec2(uv.x * aspect, uv.y), normalize(vec2(1.0, 0.55))) / (aspect * 0.88 + 0.48);
  float pos = mix(-0.35, 1.35, u_scroll);
  float band = exp(-pow((t - pos) / u_width, 2.0));
  float halo = exp(-pow((t - pos) / (u_width * 3.0), 2.0)) * 0.35;
  vec3 lit = mix(u_tint, vec3(1.0), 0.55);
  col = mix(col, lit, (band + halo) * u_sheen);

  col *= 1.0 - u_depth * smoothstep(0.0, 1.0, 1.0 - t);

  float flute = sin((px.x + px.y * 0.18) / u_spacing * 6.2831853);
  col += flute * u_flute * (0.6 + band);

  float g = noise(px * 0.65) * 0.6 + hash(px) * 0.4;
  col += (g - 0.5) * u_grain;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
