// src/components/QuemSomos.tsx

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Target, Heart, Rocket } from "lucide-react";

const pilares = [
  {
    icon: Target,
    title: "Estratégia",
    description:
      "Cada site que criamos nasce de um propósito claro: gerar oportunidades reais para o seu negócio, não só bonito de se ver.",
  },
  {
    icon: Heart,
    title: "Cuidado",
    description:
      "Tratamos cada projeto como se fosse nosso. Acompanhamos de perto, do primeiro rascunho ao lançamento, e depois dele também.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Sites rápidos, responsivos e pensados para converter. Tecnologia de ponta a serviço do seu resultado.",
  },
];

const PilarCard = ({
  pilar,
  index,
}: {
  pilar: (typeof pilares)[number];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const Icon = pilar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full rounded-3xl border border-primary/15 bg-card/60 backdrop-blur-xl p-8 overflow-hidden"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${glowX} ${glowY}, hsl(var(--primary) / 0.12), transparent 70%)`,
          }}
        />
        <div
          className={`pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset transition-all duration-300 ${
            isHovered ? "ring-primary/40" : "ring-transparent"
          }`}
        />

        <div style={{ transform: "translateZ(25px)" }} className="relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 mb-6">
            <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>

          <h3 className="text-lg font-display font-semibold mb-3 text-foreground">
            {pilar.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {pilar.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const QuemSomos = () => {
  return (
    <section id="quem-somos" className="relative isolate overflow-hidden section-espaco">
      {/* Fundo removido daqui — a seção agora usa apenas o <SectionsGlow fadeBottom />
          renderizado como irmão dela no Index.tsx, evitando duplicação de background. */}

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            <span className="text-xs font-medium tracking-wide text-primary">
              Quem somos?
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-6">
            Uma equipe com{" "}
            <span className="text-gradient">propósito claro.</span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Somos a{" "}
            <span className="text-foreground font-medium italic">Lunding</span>
            , um time apaixonado por transformar ideias em presença digital
            estratégica. Criamos sites, landing pages e soluções sob medida
            para pequenos e médios negócios (PMEs) que querem crescer com profissionalismo e sem
            complicação.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pilares.map((pilar, index) => (
            <PilarCard key={pilar.title} pilar={pilar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuemSomos;