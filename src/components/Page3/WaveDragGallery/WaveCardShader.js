export const WaveCardVertexShader = `
  uniform float uWarpIntensity;
  uniform float uViewportWidth;
  uniform float uIsMobile;
  varying vec2 vUv;
  varying float vWaveZ;

  void main() {
    vUv = uv;

    vec4 worldPos = modelMatrix * vec4(position, 1.0);

    float vpWidth = max(uViewportWidth * 0.5, 0.001);
    float screenPos = mix(
      worldPos.x / vpWidth,
      worldPos.y / vpWidth,
      uIsMobile
    );
    float screenClamped = clamp(screenPos, -1.0, 1.0);

    float zDepth = 0.0;
    float warpAbs = abs(uWarpIntensity);

    if (uIsMobile > 0.5) {

      float rollCurve = exp(-screenClamped * screenClamped * 4.0);
      float edgeDip = screenClamped * screenClamped * warpAbs * 0.6;
      zDepth = rollCurve * warpAbs * 0.8 - edgeDip;
    } else {

      float curve = exp(-screenClamped * screenClamped * 4.2);
      zDepth = -curve * uWarpIntensity * 1.5;
    }

    vec3 newPosition = position;
    newPosition.z += zDepth;
    vWaveZ = zDepth;

    float waveY = -uWarpIntensity * 0.22 * sin(screenClamped * 2.8);
    newPosition.y += waveY;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const WaveCardFragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vWaveZ;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    if (texColor.a < 0.02) discard;

    float lightInfluence = vWaveZ * 0.08;
    vec3 finalRgb = clamp(texColor.rgb + vec3(lightInfluence), 0.0, 1.0);

    gl_FragColor = vec4(finalRgb, texColor.a);
  }
`;
