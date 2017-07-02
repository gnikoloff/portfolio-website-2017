uniform float time;

void main () {
  vec3 newPos = position;
  newPos.x += time;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
}
