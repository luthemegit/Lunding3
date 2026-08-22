// src/components/ui/SectionHeader.tsx
interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
}

export const SectionHeader = ({ eyebrow, title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="relative pt-6 pb-20 -mx-6 px-6 overflow-hidden">
      {/* glow radial — gradient puro, sem filter:blur */}
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgba(37,99,235,0.28),transparent_70%)]" />

      {/* leque de luz — conic-gradient mascarado, estático */}
      <div
        className="absolute inset-x-0 top-0 h-[380px] opacity-50"
        style={{
          background:
            "conic-gradient(from 205deg at 50% -8%, transparent 0deg, rgba(96,165,250,0.16) 10deg, transparent 20deg, transparent 42deg, rgba(96,165,250,0.10) 50deg, transparent 58deg, transparent 122deg, rgba(96,165,250,0.10) 130deg, transparent 138deg, transparent 160deg, rgba(96,165,250,0.16) 170deg, transparent 180deg)",
          maskImage: "radial-gradient(ellipse 45% 100% at 50% 0%, black, transparent 92%)",
          WebkitMaskImage: "radial-gradient(ellipse 45% 100% at 50% 0%, black, transparent 92%)",
        }}
      />

      {/* estrelas — background estático, sem custo de repaint */}
      <div
        className="absolute inset-x-0 top-0 h-72 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 15% 35%, white, transparent), radial-gradient(1px 1px at 80% 25%, white, transparent), radial-gradient(1px 1px at 45% 15%, white, transparent), radial-gradient(1px 1px at 65% 55%, white, transparent), radial-gradient(1.5px 1.5px at 90% 45%, white, transparent), radial-gradient(1px 1px at 8% 60%, white, transparent)",
          maskImage: "radial-gradient(ellipse 70% 100% at 50% 0%, black, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 100% at 50% 0%, black, transparent 90%)",
        }}
      />

      <div className="relative z-10 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium mb-5">
          {eyebrow}
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">{subtitle}</p>
      </div>

      {/* curva separando o header do conteúdo — assinatura visual */}
      <svg
        className="absolute bottom-0 left-0 w-full text-background"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        style={{ height: "70px" }}
      >
        <path d="M0,90 C360,10 1080,10 1440,90 L1440,90 L0,90 Z" fill="currentColor" />
      </svg>
    </div>
  );
};