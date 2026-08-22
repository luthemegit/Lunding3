import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  ox: number; // posição original x
  oy: number; // posição original y
}

const DOT_SPACING = 34; // espaçamento entre pontos (maior = menos pontos = mais leve)
const DOT_RADIUS = 1.4;
const REPEL_RADIUS = 90; // raio de influência do mouse
const REPEL_STRENGTH = 20; // o quanto os pontos "fogem" do cursor
const EASE = 0.12; // suavidade do movimento (menor = mais lento/suave)

export const DotField = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const colorRef = useRef("215 20% 65%");

  useEffect(() => {
    // Em touch/mobile não existe "hover" de verdade — não vale a pena
    // gastar CPU/bateria com esse efeito nesses dispositivos.
    const supportsHover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!supportsHover) return;

    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Lê a cor do tema uma única vez, não a cada frame
    const styles = getComputedStyle(document.documentElement);
    const muted = styles.getPropertyValue("--muted-foreground").trim();
    if (muted) colorRef.current = muted;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // limita DPR pra não pesar em telas retina
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const dots: Dot[] = [];
      for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
        for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
          dots.push({ x, y, ox: x, oy: y });
        }
      }
      dotsRef.current = dots;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = null;
      }

      // Se o loop estava pausado (pontos parados), reativa
      if (visibleRef.current && rafRef.current === 0) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    // Escuta na window (ancestral comum de tudo), não no container,
    // porque elementos como os cards empilhados vivem em outra ramificação
    // da árvore DOM e o evento nunca "sobe" até um container irmão.
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Só anima quando a seção está realmente visível na tela
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (visibleRef.current && rafRef.current === 0) {
          rafRef.current = requestAnimationFrame(loop);
        }
      },
      { threshold: 0 }
    );
    io.observe(container);

    const loop = () => {
      if (!visibleRef.current) {
        rafRef.current = 0;
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const dots = dotsRef.current;

      ctx.beginPath();
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let targetX = d.ox;
        let targetY = d.oy;

        if (mouse) {
          const dx = d.ox - mouse.x;
          const dy = d.oy - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < REPEL_RADIUS * REPEL_RADIUS) {
            const dist = Math.sqrt(distSq) || 0.001;
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            targetX = d.ox + (dx / dist) * force;
            targetY = d.oy + (dy / dist) * force;
          }
        }

        d.x += (targetX - d.x) * EASE;
        d.y += (targetY - d.y) * EASE;

        ctx.moveTo(d.x + DOT_RADIUS, d.y);
        ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2);
      }
      ctx.fillStyle = `hsl(${colorRef.current} / 0.35)`;
      ctx.fill();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default DotField;