interface SectionsGlowProps {
  fadeTop?: boolean;
  fadeBottom?: boolean;
}

export const SectionsGlow = ({ fadeTop = false, fadeBottom = false }: SectionsGlowProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#040814]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060a1a] via-[#040814] to-[#050912]" />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,160,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 140% 130% at 50% 40%, black 40%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 140% 130% at 50% 40%, black 40%, transparent 95%)",
        }}
      />

      <div className="absolute top-[-10%] left-[-10%] w-[36rem] h-[36rem] bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute top-[15%] right-[-15%] w-[32rem] h-[32rem] bg-blue-900/25 rounded-full blur-3xl" />
      <div className="absolute top-[45%] left-[10%] w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-[65%] right-[5%] w-[30rem] h-[30rem] bg-blue-800/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-15%] left-[30%] w-[34rem] h-[34rem] bg-accent/10 rounded-full blur-3xl" />

      {/* fade de entrada — nasce da cor de fundo da seção anterior */}
      {fadeTop && (
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background to-transparent z-20" />
      )}

      {/* fade de saída — dissolve na cor de fundo da próxima seção */}
      {fadeBottom && (
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-background z-20" />
      )}
    </div>
  );
};