import type { LucideIcon } from "lucide-react";
import { Target, Palette, Zap, Clock, Sparkle } from "lucide-react";

interface FeatureCardData {
  id: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  bg: string;
  accent: string;
  light: boolean;
  rotate: number;
}

const CARDS: FeatureCardData[] = [
  {
    id: "01",
    Icon: Target,
    title: "Foco em Resultados",
    description:
      "Cada projeto é desenvolvido com metas claras de conversão e engajamento, não apenas estética.",
    bg: "#F1F2F5",
    accent: "#2E93EA",
    light: true,
    rotate: -2,

  },
  {
    id: "02",
    Icon: Palette,
    title: "Design Único",
    description:
      "Nada de templates genéricos. Seu site será uma obra de arte exclusiva que representa sua marca.",
    bg: "#7C3AED",
    accent: "#4C1D95",
    light: false,
    rotate: 1.5,
  },
  {
    id: "03",
    Icon: Zap,
    title: "Performance Premium",
    description:
      "Sites ultra-rápidos que carregam em milissegundos e oferecem experiência impecável.",
    bg: "#FD6C5C",
    accent: "#A8281A",
    light: false,
    rotate: -1,
  },
  {
    id: "04",
    Icon: Clock,
    title: "Entrega Ágil",
    description:
      "Processos otimizados que garantem seu projeto no ar em tempo recorde, sem perder qualidade.",
    bg: "#20AFEA",
    accent: "#005D8C",
    light: false,
    rotate: 2,
  },
  {
    id: "05",
    Icon: Sparkle,
    title: "Feito para Você",
    description:
      "Entendemos sua marca, seus objetivos e seu público para criar experiências digitais que fazem sentido para o seu negócio.",
    bg: "#212121",
    accent: "#212121",
    light: false,
    rotate: 0,
  },
];

function FeatureCard({ card }: { card: FeatureCardData }) {
  const {
    Icon,
    id,
    title,
    description,
    bg,
    accent,
    light,
  } = card;

  const textColor = light ? accent : "#FFFFFF";
  const bodyColor = light
    ? accent
    : "rgba(255,255,255,0.85)";

  return (
    <div
      className="
        w-full
        rounded-[28px]
        p-8
        md:p-9
        flex
        flex-col
        justify-between
         shadow-2xl
      "
      style={{
        backgroundColor: bg,
        minHeight: 380,
      }}
    >
      <div className="flex items-start justify-between">
        <span
          className="
            text-6xl
            md:text-7xl
            font-extrabold
            tracking-tight
            leading-none
          "
          style={{ color: textColor }}
        >
          {id}
          <span className="align-top text-4xl md:text-5xl">
            +
          </span>
        </span>

        <div
          className="
            w-11
            h-11
            rounded-full
            flex
            items-center
            justify-center
            shrink-0
          "
          style={{
            backgroundColor: light ? accent : "#FFFFFF",
          }}
        >
          <Icon
            size={20}
            strokeWidth={2.2}
            color={light ? "#FFFFFF" : accent}
          />
        </div>
      </div>

      <div className="mt-10">
        <h3
          className="
            text-2xl
            md:text-[26px]
            font-bold
            mb-2
          "
          style={{ color: textColor }}
        >
          {title}
        </h3>

        <p
          className="
            text-sm
            leading-relaxed
            max-w-xs
          "
          style={{ color: bodyColor }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default function StackedFeatureCards() {
  return (
    <div
      className="
        relative
        w-full
        max-w-md
        mx-auto
        px-4
        pb-[10vh]
      "
    >
      {CARDS.map((card, i) => (
  <div
    key={card.id}
    className="sticky flex justify-center"
    style={{
      top: "calc(40vh - 190px)",
      paddingTop: 20 + i * 16,
      zIndex: i + 1,
      height: "45vh",
    }}
  >
    <div
      className="w-full"
      style={{
        transform: `rotate(${card.rotate}deg)`,
        transformOrigin: "center center",
      }}
    >
      <FeatureCard card={card} />
    </div>
  </div>
))}

      {/* Espaço extra para permitir o último card permanecer visível */}
    </div>
  );
}