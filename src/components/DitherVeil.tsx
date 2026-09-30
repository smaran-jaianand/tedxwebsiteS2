import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Mesh, Program, Renderer, Texture, Triangle } from 'ogl';

import './DitherVeil.css';

type Pattern = 'bayer' | 'noise' | 'atkinson' | 'floyd' | 'lines';
type Palette = 'duotone' | 'rgb';
type Fit = 'contain' | 'cover';

export interface DitherVeilProps {
  src?: string;
  fit?: Fit;
  pattern?: Pattern;
  pixelSize?: number;
  levels?: number;
  palette?: Palette;
  inkColor?: string;
  paperColor?: string;
  contrast?: number;
  brightness?: number;
  revealRadius?: number;
  softness?: number;
  linger?: number;
  rimColor?: string;
  rim?: number;
  reverse?: boolean;
  wander?: boolean;
  clickBurst?: boolean;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_SRC = 'https://images.unsplash.com/photo-1737071371043-761e02b1ef95?q=80&w=1400&auto=format&fit=crop';

const VERTEX = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;

  uniform sampler2D tImage;
  uniform vec2 uResolution;
  uniform vec2 uCover;
  uniform vec2 uPointer;
  uniform vec3 uInk;
  uniform vec3 uPaper;
  uniform vec3 uRimColor;
  uniform float uPattern;
  uniform float uPalette;
  uniform float uCell;
  uniform float uLevels;
  uniform float uContrast;
  uniform float uBrightness;
  uniform float uRadius;
  uniform float uSoftness;
  uniform float uPresence;
  uniform float uRim;
  uniform float uReverse;
  uniform float uIntro;
  uniform float uBurst;
  uniform float uBurstStrength;

  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float bayer4(vec2 cell) {
    vec2 p = mod(cell, 4.0);
    float x = p.x;
    float y = p.y;
    float value = 0.0;
    value += mod(x, 2.0) * 8.0;
    value += mod(y, 2.0) * 4.0;
    value += mod(floor(x / 2.0), 2.0) * 2.0;
    value += mod(floor(y / 2.0), 2.0);
    return (value + 0.5) / 16.0;
  }

  float threshold(vec2 cell) {
    if (uPattern < 0.5) return bayer4(cell);
    if (uPattern < 1.5) return hash(cell);
    if (uPattern < 2.5) return fract((cell.x + cell.y) / 7.0);
    return mix(bayer4(cell.yx), hash(cell * 0.73), 0.24);
  }

  vec3 grade(vec3 color) {
    return clamp((color - 0.5) * uContrast + 0.5 + uBrightness, 0.0, 1.0);
  }

  void main() {
    vec2 imageUv = (vUv - 0.5) * uCover + 0.5;
    vec2 bounds = step(vec2(0.0), imageUv) * step(imageUv, vec2(1.0));
    float framed = bounds.x * bounds.y;
    vec3 raw = grade(texture2D(tImage, imageUv).rgb);

    vec2 pixel = floor(gl_FragCoord.xy / max(uCell, 1.0));
    float t = threshold(pixel);
    float steps = max(1.0, uLevels - 1.0);
    float luma = dot(raw, vec3(0.2126, 0.7152, 0.0722));
    float mono = min(steps, floor(luma * steps + t)) / steps;
    vec3 rgb = min(vec3(steps), floor(raw * steps + t)) / steps;
    vec3 quantized = mix(vec3(mono), rgb, step(0.5, uPalette));
    vec3 dithered = mix(uInk, uPaper, quantized) * framed;

    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    float distanceToPointer = length((vUv - uPointer) * aspect);
    float radius = uRadius / max(uResolution.y, 1.0);
    float feather = max(radius * uSoftness, 0.001);
    float reveal = (1.0 - smoothstep(radius - feather, radius + feather, distanceToPointer)) * uPresence;

    float burstDistance = abs(distanceToPointer - uBurst);
    reveal = max(reveal, (1.0 - smoothstep(0.0, 0.028, burstDistance)) * uBurstStrength);
    if (uReverse > 0.5) reveal = 1.0 - reveal;

    float rimBand = smoothstep(0.0, 0.03, reveal) - smoothstep(max(0.03, uRim), max(0.05, uRim + 0.03), reveal);
    vec3 color = mix(dithered, raw * framed, reveal);
    color = mix(color, uRimColor, rimBand * step(0.001, uRim));

    float introDistance = length((vUv - 0.5) * aspect);
    float intro = smoothstep(uIntro + 0.18, uIntro - 0.12, introDistance);
    gl_FragColor = vec4(mix(uInk, color, intro), 1.0);
  }
`;

const hexToRgb = (hex: string): [number, number, number] => {
  let value = hex.replace('#', '');
  if (value.length === 3) value = value.replace(/./g, (character) => character + character);
  const number = Number.parseInt(value.slice(0, 6), 16);
  if (Number.isNaN(number)) return [0, 0, 0];
  return [((number >> 16) & 255) / 255, ((number >> 8) & 255) / 255, (number & 255) / 255];
};

const getPatternIndex = (pattern: Pattern) => {
  if (pattern === 'noise') return 1;
  if (pattern === 'lines') return 2;
  if (pattern === 'atkinson' || pattern === 'floyd') return 3;
  return 0;
};

const DitherVeil = ({
  src = DEFAULT_SRC,
  fit = 'contain',
  pattern = 'floyd',
  pixelSize = 2,
  levels = 2,
  palette = 'duotone',
  inkColor = '#120f17',
  paperColor = '#f4f1ea',
  contrast = 1.15,
  brightness = 0,
  revealRadius = 200,
  softness = 0.6,
  linger = 1,
  rimColor = '#a78bfa',
  rim = 0,
  reverse = false,
  wander = false,
  clickBurst = true,
  className = '',
  style,
}: DitherVeilProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 1.5), alpha: false, antialias: false });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const imageTexture = new Texture(gl, { minFilter: gl.LINEAR, magFilter: gl.LINEAR });
    const uniforms = {
      tImage: { value: imageTexture },
      uResolution: { value: [1, 1] },
      uCover: { value: [1, 1] },
      uPointer: { value: [0.5, 0.5] },
      uInk: { value: hexToRgb(inkColor) },
      uPaper: { value: hexToRgb(paperColor) },
      uRimColor: { value: hexToRgb(rimColor) },
      uPattern: { value: getPatternIndex(pattern) },
      uPalette: { value: palette === 'rgb' ? 1 : 0 },
      uCell: { value: Math.max(1, pixelSize * renderer.dpr) },
      uLevels: { value: Math.max(2, levels) },
      uContrast: { value: contrast },
      uBrightness: { value: brightness },
      uRadius: { value: revealRadius },
      uSoftness: { value: softness },
      uPresence: { value: wander ? 0.55 : 0 },
      uRim: { value: rim },
      uReverse: { value: reverse ? 1 : 0 },
      uIntro: { value: 0 },
      uBurst: { value: 0 },
      uBurstStrength: { value: 0 },
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex: VERTEX, fragment: FRAGMENT, uniforms, depthTest: false, depthWrite: false });
    const mesh = new Mesh(gl, { geometry, program });

    let width = 1;
    let height = 1;
    let imageWidth = 1;
    let imageHeight = 1;
    let visible = true;
    let pointerInside = false;
    let pointerTarget: [number, number] = [0.5, 0.5];
    let pointerCurrent: [number, number] = [0.5, 0.5];
    let presence = wander ? 0.55 : 0;
    let intro = 0;
    let burstStarted = 0;
    let frameId = 0;
    let lastTime = performance.now();

    const updateCover = () => {
      const ratio = width / height / (imageWidth / imageHeight);
      const contain = fit === 'contain';
      uniforms.uCover.value = contain
        ? ratio > 1 ? [ratio, 1] : [1, 1 / ratio]
        : ratio > 1 ? [1, 1 / ratio] : [ratio, 1];
    };

    const resize = () => {
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height);
      uniforms.uResolution.value = [canvas.width, canvas.height];
      updateCover();
    };

    const render = (now: number) => {
      frameId = 0;
      if (!visible) return;
      const delta = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (!pointerInside && wander) {
        pointerTarget = [0.5 + Math.sin(now * 0.00037) * 0.28, 0.5 + Math.cos(now * 0.00029) * 0.22];
      }

      const follow = 1 - Math.exp(-delta / 0.07);
      pointerCurrent = [
        pointerCurrent[0] + (pointerTarget[0] - pointerCurrent[0]) * follow,
        pointerCurrent[1] + (pointerTarget[1] - pointerCurrent[1]) * follow,
      ];
      uniforms.uPointer.value = pointerCurrent;

      const presenceTarget = pointerInside ? 1 : wander ? 0.55 : 0;
      const presenceFollow = 1 - Math.exp(-delta / Math.max(0.08, linger));
      presence += (presenceTarget - presence) * presenceFollow;
      uniforms.uPresence.value = presence;

      intro = Math.min(1.15, intro + delta * 0.65);
      uniforms.uIntro.value = intro;

      const burstAge = burstStarted ? (now - burstStarted) / 1100 : 2;
      uniforms.uBurst.value = Math.min(1.2, burstAge) * 0.72;
      uniforms.uBurstStrength.value = burstAge < 1 ? 1 - burstAge * burstAge : 0;

      renderer.render({ scene: mesh });
      const busy = intro < 1.15 || pointerInside || wander || presence > 0.003 || burstAge < 1;
      if (busy) frameId = requestAnimationFrame(render);
    };

    const wake = () => {
      if (frameId || !visible) return;
      lastTime = performance.now();
      frameId = requestAnimationFrame(render);
    };

    const locate = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        pointerInside = false;
        wake();
        return;
      }
      pointerInside = true;
      pointerTarget = [(event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height];
      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      locate(event);
      if (!clickBurst || (event.pointerType === 'mouse' && event.button !== 0)) return;
      burstStarted = performance.now();
      wake();
    };

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.decoding = 'async';
    image.onload = () => {
      imageWidth = image.naturalWidth;
      imageHeight = image.naturalHeight;
      imageTexture.image = image;
      imageTexture.needsUpdate = true;
      updateCover();
      wake();
    };
    image.src = src;

    const resizeObserver = new ResizeObserver(() => {
      resize();
      wake();
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else cancelAnimationFrame(frameId);
    });

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    window.addEventListener('pointermove', locate, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    resize();
    wake();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', locate);
      window.removeEventListener('pointerdown', onPointerDown);
      image.onload = null;
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
    };
  }, [brightness, clickBurst, contrast, fit, inkColor, levels, linger, palette, paperColor, pattern, pixelSize, revealRadius, reverse, rim, rimColor, softness, src, wander]);

  return <div ref={containerRef} className={`dither-veil ${className}`.trim()} style={style} aria-hidden="true" />;
};

export default DitherVeil;
