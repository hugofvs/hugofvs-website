precision mediump float;

varying vec2 vUv;
attribute vec2 a_position;

void main() {
  vUv = vec2(0.5 * (a_position.x + 1.0), 0.5 * (1.0 - a_position.y));
  gl_Position = vec4(a_position, 0.0, 1.0);
}
