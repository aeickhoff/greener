#ifdef GL_ES
    precision highp float;
#endif

varying vec2 uv;
uniform sampler2D pressureAndVelocity;
uniform vec2 slopeTilt;

float k = 5.0;

 float P (float d) {
     return k * (d * d * d * d * d);
 }

void main (void) {
    float dt = 1.0/240.0;
    float offset = 1.0/256.0;
    float pressureRight  = texture2D(pressureAndVelocity, uv + vec2(offset, 0.0)).x;
    float pressureLeft   = texture2D(pressureAndVelocity, uv - vec2(offset, 0.0)).x;
    float pressureTop    = texture2D(pressureAndVelocity, uv + vec2(0.0, offset)).x;
    float pressureBottom = texture2D(pressureAndVelocity, uv - vec2(0.0, offset)).x;

    vec4 here = texture2D(pressureAndVelocity, uv);
    vec2 velocity = here.yz;

    vec2 newVelocity = velocity - dt * vec2(
        P(pressureRight) - P(pressureLeft),
        P(pressureTop) - P(pressureBottom)
    ) + slopeTilt * dt;

    if (uv.x < offset) {
        newVelocity.x = max(0.0, newVelocity.x);
    }

    if (uv.x > 1.0 - offset) {
        newVelocity.x = min(0.0, newVelocity.x);
    }

    if (uv.y < offset) {
        newVelocity.y = max(0.0, newVelocity.y);
    }

    if (uv.y > 1.0 - offset) {
        newVelocity.y = min(0.0, newVelocity.y);
    }

    gl_FragColor = vec4(here.x, newVelocity, 1.0);
}