#ifdef GL_ES
    precision highp float;
#endif

varying vec2 uv;
uniform sampler2D level;

void main(void) {
    vec4 color = texture2D(level, uv);
    gl_FragColor = vec4(
        color.r, // terrain height, // velocity x
        0, // velocity y
        color.b - color.r, // water depth (not level!)
        0
    );
}