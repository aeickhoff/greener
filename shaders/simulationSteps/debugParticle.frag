#ifdef GL_ES
    precision highp float;
#endif

varying vec2 particleVelocity;

void main (void) {
    gl_FragColor = vec4(0.8, 0.8, 1.0, 1.0);
}