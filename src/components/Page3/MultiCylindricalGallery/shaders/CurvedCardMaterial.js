import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

export const CustomCurvedCardMaterial = shaderMaterial(
  {
    uTexture: null,
    uDistortion: 0.15,
    uChromaticAberration: 0.015,
    uRadius: 4.5,
    uHover: 0.0,
    uFocus: 0.0,
    uTime: 0.0,
    uOpacity: 1.0,
    uVelocity: 0.0,
  },

   `
    uniform float uRadius;
    uniform float uHover;
    uniform float uFocus;
    uniform float uVelocity;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vec3 pos = position;

      float safeRadius = max(uRadius, 1.0);
      float angle = pos.x / safeRadius;

      pos.x = safeRadius * sin(angle);
      pos.z = safeRadius * (cos(angle) - 1.0);

      pos.z += uHover * 0.25;

      vec3 curvedNormal = vec3(sin(angle), 0.0, cos(angle));
      vNormal = normalMatrix * curvedNormal;

      vec4 worldPos = modelMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,

   `
    uniform sampler2D uTexture;
    uniform float uDistortion;
    uniform float uChromaticAberration;
    uniform float uHover;
    uniform float uFocus;
    uniform float uTime;
    uniform float uOpacity;
    uniform float uVelocity;

    varying vec2 vUv;

    vec2 barrelDistortion(vec2 coord, float amt) {
      vec2 cc = coord - 0.5;
      float dist = dot(cc, cc);
      return coord + cc * dist * amt;
    }

    void main() {
      float focusFactor = (1.0 - uFocus);
      float dynamicDistortion = uDistortion * focusFactor * (1.0 + abs(uVelocity) * 3.0);

      vec2 uv = barrelDistortion(vUv, dynamicDistortion);

      if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        discard;
      }

      vec2 offset = vec2(uChromaticAberration * (uv.x - 0.5) * focusFactor * (1.0 + uHover * 1.5 + abs(uVelocity) * 8.0), 0.0);

      float r = texture2D(uTexture, uv + offset).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - offset).b;

      vec4 texColor = texture2D(uTexture, uv);

      vec3 rawColor = vec3(r, g, b);

      float gray = dot(rawColor, vec3(0.299, 0.587, 0.114));
      vec3 monoColor = vec3(gray * 0.95);

      vec3 realColor = rawColor;

      realColor = pow(max(realColor, vec3(0.0)), vec3(0.92));
      realColor = mix(realColor, realColor * 1.1 + vec3(0.05), 0.5);

      float luma = dot(realColor, vec3(0.299, 0.587, 0.114));
      vec3 bloomGlow = realColor * (1.2 + luma * 0.6);
      realColor = mix(realColor, bloomGlow, 0.4 * uHover);

      vec3 finalColor = mix(monoColor, realColor, uHover);

      float brightness = 0.9 + uFocus * 0.25 + uHover * 0.2;
      finalColor *= brightness;

      float alpha = texColor.a * uOpacity * (0.85 + uFocus * 0.15);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

export const ChromaticDistortionMaterial = CustomCurvedCardMaterial;

extend({ CustomCurvedCardMaterial, ChromaticDistortionMaterial });
