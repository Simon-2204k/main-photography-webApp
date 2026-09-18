/**
 * WaveCardShader.js
 * Authentic WebGL Vertex & Fragment Shaders matching NaughtyDuk's continuous wave physics.
 * 
 * World-space deformation:
 * - Continuous Gaussian curve and undulating harmonic wave responding to drag velocity.
 * - Reliable alpha-tested fragment shader that never discards valid pixels.
 */

export const WaveCardVertexShader = `
  uniform float uWarpIntensity; // Smoothed momentum warp intensity from drag
  uniform float uViewportWidth;  // Viewport width in Three.js world units
  uniform float uIsMobile;       // 0.0 for desktop, 1.0 for mobile
  varying vec2 vUv;
  varying float vWaveZ;

  void main() {
    vUv = uv;
    
    // World space position of vertex across the entire horizontal carousel
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    
    // Screen position normalized [-1.0, 1.0] across the camera frustum
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
      // MOBILE: center bulge
      float rollCurve = exp(-screenClamped * screenClamped * 4.0);
      float edgeDip = screenClamped * screenClamped * warpAbs * 0.6;
      zDepth = rollCurve * warpAbs * 0.8 - edgeDip;
    } else {
      // DESKTOP: Gaussian wave bulge + trough based on drag velocity
      float curve = exp(-screenClamped * screenClamped * 4.2);
      zDepth = -curve * uWarpIntensity * 1.5;
    }
    
    vec3 newPosition = position;
    newPosition.z += zDepth;
    vWaveZ = zDepth;

    // Harmonic Y-wave across the carousel strip matching user's continuous wave ribbon
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

    // Subtle dynamic lighting depth sheen based on wave peak
    float lightInfluence = vWaveZ * 0.08;
    vec3 finalRgb = clamp(texColor.rgb + vec3(lightInfluence), 0.0, 1.0);

    gl_FragColor = vec4(finalRgb, texColor.a);
  }
`;

