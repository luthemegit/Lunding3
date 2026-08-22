type Props = {
  /** Cor base dos arcos e do glow central (formato HSL sem hsl(), ex: "217 91% 60%") */
  color?: string;
  /** Quantos arcos concêntricos desenhar */
  rings?: number;
  className?: string;
};

export const RippleGlow = ({
  color = "217 91% 60%",
  rings = 7,
  className = "",
}: Props) => {
  const ringArray = Array.from({ length: rings }, (_, i) => i);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Glow central */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(${color} / 0.35) 0%, hsl(${color} / 0.12) 40%, transparent 70%)`,
        }}
      />

      {/* Arcos concêntricos */}
      {ringArray.map((i) => {
        const size = 140 + i * 90; // px — cresce a cada anel
        const opacity = 0.35 - i * 0.04; // arcos externos mais fracos
        return (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderColor: `hsl(${color} / ${Math.max(opacity, 0.03)})`,
              borderWidth: "1px",
            }}
          />
        );
      })}

      {/* Textura de pontos espalhados (usa o mesmo padrão do seu DotField/SectionsBackground) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(${color} / 0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 60% 80% at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 80% at center, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
};

export default RippleGlow;