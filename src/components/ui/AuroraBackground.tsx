import { useEffect, useRef } from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";

interface AuroraBackgroundProps {
  className?: string;
  /** Três cores (hex) que formam o gradiente da aurora, da base ao topo. */
  colorStops?: [string, string, string];
  /** Intensidade/altura do movimento das faixas. Padrão: 1.0 */
  amplitude?: number;
  /** Opacidade geral do efeito (0–1). Padrão: 0.55 */
  blend?: number;
  /** Velocidade da animação. Padrão: 1.0 */
  speed?: number;
}

const VERTEX = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAmplitude;
  uniform float uBlend;
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  varying vec2 vUv;

  vec3 gradient(float t) {
    t = clamp(t, 0.0, 1.0);
    if (t < 0.5) {
      return mix(uColor0, uColor1, t * 2.0);
    }
    return mix(uColor1, uColor2, (t - 0.5) * 2.0);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;

    // Duas ondas em frequências/fases diferentes, somadas, criam o
    // movimento "orgânico" característico de uma aurora.
    float wave1 = sin(uv.x * 3.0 + t * 1.3) * 0.5 + 0.5;
    float wave2 = sin(uv.x * 5.2 - t * 0.8 + wave1 * 2.2) * 0.5 + 0.5;
    float wave3 = sin(uv.x * 1.6 + t * 0.5) * 0.5 + 0.5;
    float band = mix(mix(wave1, wave2, 0.5), wave3, 0.3) * uAmplitude;

    float center = 0.55 + (band - 0.5) * 0.7;
    float dist = abs(uv.y - center);
    float glow = smoothstep(0.55, 0.0, dist);

    vec3 color = gradient(uv.x * 0.6 + band * 0.4);
    float alpha = glow * uBlend;

    gl_FragColor = vec4(color * glow, alpha);
  }
`;

/**
 * Background de aurora animada, renderizado via shader com OGL
 * (muito mais leve que three.js). Pensado pra dar profundidade/movimento
 * real nas seções fora do Hero, sem o peso do Hyperspeed.
 *
 * Requer: npm install ogl
 *
 * Uso:
 *   <section className="relative overflow-hidden">
 *     <AuroraBackground className="absolute inset-0" colorStops={["#0a0a2a", "#3b5bdb", "#1864ab"]} />
 *     <div className="relative z-10">{conteúdo}</div>
 *   </section>
 */
export default function AuroraBackground({
  className = "w-full h-full",
  colorStops = ["#0a0a2a", "#3b5bdb", "#1864ab"],
  amplitude = 1.3,
  blend = 0.75,
  speed = 1.0,
}: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, antialias: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    const toRgb = (hex: string) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b] as [number, number, number];
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uBlend: { value: blend },
        uColor0: { value: toRgb(colorStops[0]) },
        uColor1: { value: toRgb(colorStops[1]) },
        uColor2: { value: toRgb(colorStops[2]) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    let frameId: number;
    let disposed = false;

    function resize() {
      if (!container) return;
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const start = performance.now();
    function update(now: number) {
      if (disposed) return;
      const elapsed = ((now - start) / 1000) * speed;
      program.uniforms.uTime.value = elapsed;
      renderer.render({ scene: mesh });
      frameId = requestAnimationFrame(update);
    }
    frameId = requestAnimationFrame(update);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorStops.join(","), amplitude, blend, speed]);

  return <div ref={containerRef} className={`pointer-events-none overflow-hidden ${className}`} aria-hidden />;
}