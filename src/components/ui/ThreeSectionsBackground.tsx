export const ThreeSectionsBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

      {/* ===================================================== */}
      {/* BASE — extremamente sutil                          */}
      {/* ===================================================== */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 45% at 50% 35%, hsl(222 100% 65% / 0.025), transparent 70%)",
        }}
      />

      {/* ===================================================== */}
      {/* GLOW ATRÁS / ABAIXO DOS DEPOIMENTOS                 */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-[9%]
          -translate-x-1/2
          w-[950px]
          h-[520px]
          rounded-full
          opacity-80
          blur-[110px]
        "
        style={{
          background:
            "radial-gradient(ellipse, hsl(217 91% 60% / 0.085) 0%, hsl(224 100% 65% / 0.035) 38%, transparent 72%)",
        }}
      />

      {/* Glow horizontal diretamente atrás da base dos cards */}
      <div
        className="
          absolute
          left-1/2
          top-[25%]
          -translate-x-1/2
          w-[1100px]
          h-[280px]
          rounded-full
          blur-[90px]
        "
        style={{
          background:
            "radial-gradient(ellipse, hsl(217 91% 60% / 0.075), transparent 68%)",
        }}
      />

      {/* ===================================================== */}
      {/* GLOW CENTRAL — TRANSIÇÃO PARA O FAQ                 */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-[38%]
          -translate-x-1/2
          w-[900px]
          h-[600px]
          rounded-full
          blur-[120px]
        "
        style={{
          background:
            "radial-gradient(ellipse, hsl(221 100% 65% / 0.055), transparent 70%)",
        }}
      />

      {/* Pequeno foco central */}
      <div
        className="
          absolute
          left-1/2
          top-[47%]
          -translate-x-1/2
          w-[500px]
          h-[300px]
          rounded-full
          blur-[100px]
        "
        style={{
          background:
            "radial-gradient(ellipse, hsl(217 91% 60% / 0.045), transparent 70%)",
        }}
      />

      {/* ===================================================== */}
      {/* GLOW ATRÁS DO CTA / CONTACT                          */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          bottom-[2%]
          -translate-x-1/2
          w-[1050px]
          h-[650px]
          rounded-full
          blur-[120px]
        "
        style={{
          background:
            "radial-gradient(ellipse, hsl(217 91% 60% / 0.09) 0%, hsl(224 100% 65% / 0.045) 38%, transparent 72%)",
        }}
      />

      {/* Glow mais concentrado no CTA */}
      <div
        className="
          absolute
          left-1/2
          bottom-[7%]
          -translate-x-1/2
          w-[650px]
          h-[350px]
          rounded-full
          blur-[90px]
        "
        style={{
          background:
            "radial-gradient(ellipse, hsl(217 91% 60% / 0.08), transparent 70%)",
        }}
      />

      {/* ===================================================== */}
      {/* LINHAS DE LUZ MUITO DISCRETAS                        */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-[30%]
          -translate-x-1/2
          w-[900px]
          h-px
          opacity-20
        "
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(217 91% 60% / 0.18), transparent)",
          filter: "blur(1px)",
        }}
      />

      <div
        className="
          absolute
          left-1/2
          bottom-[18%]
          -translate-x-1/2
          w-[800px]
          h-px
          opacity-15
        "
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(217 91% 60% / 0.16), transparent)",
          filter: "blur(1px)",
        }}
      />

      {/* ===================================================== */}
      {/* PARTÍCULAS / ESTRELAS                                 */}
      {/* ===================================================== */}

      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 8% 10%, hsl(220 100% 85% / 0.7), transparent),
            radial-gradient(1px 1px at 18% 22%, hsl(220 100% 85% / 0.5), transparent),
            radial-gradient(1px 1px at 31% 8%, hsl(220 100% 85% / 0.6), transparent),
            radial-gradient(1px 1px at 47% 17%, hsl(220 100% 85% / 0.5), transparent),
            radial-gradient(1px 1px at 63% 11%, hsl(220 100% 85% / 0.7), transparent),
            radial-gradient(1px 1px at 76% 24%, hsl(220 100% 85% / 0.5), transparent),
            radial-gradient(1px 1px at 91% 14%, hsl(220 100% 85% / 0.6), transparent),

            radial-gradient(1px 1px at 12% 43%, hsl(220 100% 85% / 0.4), transparent),
            radial-gradient(1px 1px at 29% 51%, hsl(220 100% 85% / 0.5), transparent),
            radial-gradient(1px 1px at 71% 46%, hsl(220 100% 85% / 0.5), transparent),
            radial-gradient(1px 1px at 87% 57%, hsl(220 100% 85% / 0.4), transparent),

            radial-gradient(1px 1px at 21% 76%, hsl(220 100% 85% / 0.5), transparent),
            radial-gradient(1px 1px at 42% 84%, hsl(220 100% 85% / 0.4), transparent),
            radial-gradient(1px 1px at 68% 73%, hsl(220 100% 85% / 0.5), transparent),
            radial-gradient(1px 1px at 84% 88%, hsl(220 100% 85% / 0.4), transparent)
          `,
        }}
      />

      {/* ===================================================== */}
      {/* VIGNETTE — deixa as bordas mais escuras              */}
      {/* ===================================================== */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 42%, transparent 35%, hsl(230 60% 3% / 0.28) 100%)",
        }}
      />
    </div>
  );
};

export default ThreeSectionsBackground;