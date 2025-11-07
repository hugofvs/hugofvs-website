// this fragment shader is based on this fantastic work from ElusivePete: https://www.shadertoy.com/view/lljGDt
precision mediump float;

varying vec2 vUv;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 uColor;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);

  return clamp(
    (0.25 + 0.15 * sin(cosAngle * seedA + u_time * speed)) +
    (0.2 + 0.2 * cos(-cosAngle * seedB + u_time * speed)),
    0.0, 1.0) *
    clamp((u_resolution.x - length(sourceToCoord)) / u_resolution.x, 0.2, 0.4);
}

void main() {
  vec2 fragCoord = vUv * u_resolution;

  // Set the parameters of the light rays
  vec2 rayPos = vec2(u_resolution.x, -50);
  vec2 rayRefDir = normalize(vec2(1.0, -0.116));
  float raySeedA = 30.0;
  float raySeedB = 20.0;
  float raySpeed = 0.2;

  // Calculate the colour of the light rays on the current fragment
  vec4 rays =
    uColor *
    rayStrength(rayPos, rayRefDir, fragCoord, raySeedA, raySeedB, raySpeed);

  gl_FragColor = rays * 0.3;
}
