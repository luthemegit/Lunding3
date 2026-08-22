// src/components/ui/SpotlightHeader.tsx
interface SpotlightHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  variant?: "twin" | "beam";
}

export const SpotlightHeader = ({ eyebrow, title, subtitle, variant = "twin" }: SpotlightHeaderProps) => {
  return (
    <div className="relative text-center mb-20 pt-4">
      <div className="absolute inset-x-0 -top-10 h-72 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,rgba(37,99,235,0.22),transparent_70%)] pointer-events-none" />

      {variant === "twin" && (
        <>
          <div className="absolute top-0 left-[12%] w-40 h-64 -rotate-[22deg] origin-top pointer-events-none hidden md:block">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-9 rounded-full bg-gradient-to-b from-blue-300 to-blue-600 shadow-[0_0_28px_10px_rgba(59,130,246,0.55)]" />
            <div
              className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-56 blur-[2px]"
              style={{
                clipPath: "polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)",
                background: "linear-gradient(to bottom, rgba(59,130,246,0.30), transparent 85%)",
              }}
            />
          </div>
          <div className="absolute top-0 right-[12%] w-40 h-64 rotate-[22deg] origin-top pointer-events-none hidden md:block">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-9 rounded-full bg-gradient-to-b from-blue-300 to-blue-600 shadow-[0_0_28px_10px_rgba(59,130,246,0.55)]" />
            <div
              className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-56 blur-[2px]"
              style={{
                clipPath: "polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)",
                background: "linear-gradient(to bottom, rgba(59,130,246,0.30), transparent 85%)",
              }}
            />
          </div>
        </>
      )}

      {variant === "beam" && (
  <>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-10 rounded-full bg-gradient-to-b from-blue-300 to-blue-600 shadow-[0_0_28px_10px_rgba(59,130,246,0.5)] pointer-events-none" />

    {/* feixe — blur bem mais forte + máscara radial pra suavizar as bordas do clip-path */}
    <div
      className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-56 blur-2xl pointer-events-none"
      style={{
        clipPath: "polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)",
        background: "linear-gradient(to bottom, rgba(59,130,246,0.28), transparent 80%)",
        maskImage: "radial-gradient(ellipse 55% 90% at 50% 0%, black 30%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(ellipse 55% 90% at 50% 0%, black 30%, transparent 90%)",
      }}
    />

    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full border border-blue-500/20 pointer-events-none" />
    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full border border-blue-500/10 pointer-events-none" />
    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full border border-blue-500/[0.06] pointer-events-none" />
  </>
)}

      <div
        className="absolute inset-x-0 top-0 h-60 opacity-70 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 75% 45%, white, transparent), radial-gradient(1px 1px at 40% 15%, white, transparent), radial-gradient(1px 1px at 60% 60%, white, transparent), radial-gradient(1.5px 1.5px at 85% 20%, white, transparent), radial-gradient(1px 1px at 10% 65%, white, transparent), radial-gradient(1px 1px at 92% 55%, white, transparent)",
          maskImage: "radial-gradient(ellipse 70% 100% at 50% 0%, black, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 100% at 50% 0%, black, transparent 90%)",
        }}
      />

      <div className="relative z-10">
        <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium mb-5">
          {eyebrow}
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};