// src/components/SectionsBackground.tsx

import { useEffect, useRef, useState } from "react";
import DotField from "./ui/DotField";

type Props = {
  /** ID da última section que o fundo deve cobrir. */
  endId?: string;
};

/*
 * Mantido como 1px para não criar uma grande área
 * de processamento do DotField.
 *
 * Se o seu DotField estiver preparado para receber
 * uma altura maior futuramente, isso pode ser alterado.
 */
const INTERACTIVE_MAX_HEIGHT = 1;

export const SectionsBackground = ({
  endId = "portfolio",
}: Props) => {
  const hostRef = useRef<HTMLDivElement | null>(null);

  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const host = hostRef.current?.parentElement;

    if (!host) return;

    let frame = 0;
    let retries = 0;

    const measure = () => {
      const start = host.getBoundingClientRect().top;

      const endEl = document.getElementById(endId);

      if (endEl) {
        const end = endEl.getBoundingClientRect().bottom;

        setHeight(
          Math.max(
            0,
            end - start
          )
        );

        return;
      }

      if (retries < 30) {
        retries += 1;

        frame = requestAnimationFrame(measure);
      }
    };

    const ro = new ResizeObserver(measure);

    ro.observe(host);

    const endEl = document.getElementById(endId);

    if (endEl) {
      ro.observe(endEl);
    }

    measure();

    window.addEventListener(
      "resize",
      measure
    );

    return () => {
      cancelAnimationFrame(frame);

      ro.disconnect();

      window.removeEventListener(
        "resize",
        measure
      );
    };
  }, [endId]);

  return (
    <div
      ref={hostRef}
      className="
        absolute
        left-0
        right-0
        top-0

        z-0

        pointer-events-none

        overflow-hidden
      "
      style={{
        height: height
          ? `${height}px`
          : "100%",
      }}
      aria-hidden="true"
    >
      {/* ======================================================
          BASE
      ======================================================= */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b
          from-background
          via-secondary/10
          to-background
        "
      />

      {/* ======================================================
          TEXTURA DE PONTOS
          
          Estática = barata.
      ======================================================= */}

      <div
        className="
          absolute
          inset-0
        "
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--muted-foreground) / 0.35) 1.4px, transparent 1.4px)",

          backgroundSize:
            "34px 34px",
        }}
      />

      {/* ======================================================
          DOT FIELD INTERATIVO
          
          Mantido, mas limitado.
      ======================================================= */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0

          overflow-hidden
        "
        style={{
          height: `${INTERACTIVE_MAX_HEIGHT}px`,
        }}
      >
        <DotField />
      </div>

      {/* ======================================================
          LUZ LATERAL ESQUERDA
          
          Sem filter / blur.
      ======================================================= */}

      <div
        className="
          absolute

          top-[30%]
          left-[8%]

          w-[650px]
          h-[600px]

          rounded-full
        "
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.22) 0%, hsl(var(--primary) / 0.09) 35%, transparent 70%)",
        }}
      />

      {/* ======================================================
          LUZ LATERAL DIREITA
      ======================================================= */}

      <div
        className="
          absolute

          top-[55%]
          right-[5%]

          w-[700px]
          h-[650px]

          rounded-full
        "
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.22) 0%, hsl(var(--accent) / 0.09) 35%, transparent 70%)",
        }}
      />

      {/* ======================================================
          LUZ INFERIOR ESQUERDA
      ======================================================= */}

      <div
        className="
          absolute

          top-[85%]
          left-[10%]

          w-[650px]
          h-[600px]

          rounded-full
        "
        style={{
          background:
            "radial-gradient(circle, hsl(217 91% 60% / 0.2) 0%, hsl(217 91% 60% / 0.08) 35%, transparent 70%)",
        }}
      />
    </div>
  );
};

export default SectionsBackground;