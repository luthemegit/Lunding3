import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Quote, Star } from "lucide-react";

type Testimonial = {
  id: number;
  text: string;
  name: string;
  role: string;
  rating: number;
};

const depoimentos: Testimonial[] = [
  {
    id: 1,
    text: "Em 6 meses o site trouxe mais visibilidade e contatos diários de hóspedes que nos acharam no Google, aumentando nossas reservas.",
    name: "Natália S.",
    role: "Adm/Financeiro, Pousada Bella Vista",
    rating: 5,
  },
  {
    id: 2,
    text: "O site virou minha vitrine online. Agora o cliente já vê tudo que tenho na loja antes de vir e chega pronto pra comprar.",
    name: "João G.",
    role: "Proprietário, All Frames Technology",
    rating: 5,
  },
  {
    id: 3,
    text: "Projeto muito profissional com suporte total após a entrega, acompanhamento dos acessos e melhorias constantes nos resultados.",
    name: "Huillian R.",
    role: "Marketing, Pousada Bella Vista",
    rating: 5,
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TestimonialCard = ({
  item,
  index,
}: {
  item: Testimonial;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    {
      stiffness: 300,
      damping: 30,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    {
      stiffness: 300,
      damping: 30,
    }
  );

  const glowX = useTransform(
    mouseX,
    [-0.5, 0.5],
    ["0%", "100%"]
  );

  const glowY = useTransform(
    mouseY,
    [-0.5, 0.5],
    ["0%", "100%"]
  );

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    mouseX.set(
      (e.clientX - rect.left) / rect.width - 0.5
    );

    mouseY.set(
      (e.clientY - rect.top) / rect.height - 0.5
    );
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        perspective: 1200,
      }}
      className="relative z-10"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="
          relative
          h-full
          overflow-hidden
          rounded-3xl
          border
          border-primary/15
          bg-card/60
          p-8
          backdrop-blur-xl
          transition-shadow
          duration-300
        "
      >
        {/* Glow que acompanha o mouse */}
        <motion.div
          className="
            pointer-events-none
            absolute
            inset-0
          "
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          style={{
            background: `radial-gradient(
              500px circle at ${glowX} ${glowY},
              hsl(var(--primary) / 0.12),
              transparent 70%
            )`,
          }}
        />

        {/* Borda com glow sutil no hover */}
        <div
          className={`
            pointer-events-none
            absolute
            inset-0
            rounded-3xl
            ring-1
            ring-inset
            transition-all
            duration-300
            ${
              isHovered
                ? "ring-primary/40"
                : "ring-transparent"
            }
          `}
        />

        {/* Conteúdo */}
        <div
          style={{
            transform: "translateZ(30px)",
          }}
          className="relative z-10"
        >
          <Quote
            className="
              mb-6
              h-9
              w-9
              text-primary/25
            "
            strokeWidth={1.5}
          />

          <div className="mb-5 flex gap-1">
            {Array.from({
              length: item.rating,
            }).map((_, i) => (
              <Star
                key={i}
                className="
                  h-4
                  w-4
                  fill-primary
                  text-primary
                "
              />
            ))}
          </div>

          <p
            className="
              mb-8
              min-h-[120px]
              text-base
              leading-relaxed
              text-foreground/90
              md:text-[17px]
            "
          >
            {item.text}
          </p>

          <div
            className="
              flex
              items-center
              gap-3
              border-t
              border-primary/10
              pt-6
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-primary/20
                bg-primary/10
                text-sm
                font-semibold
                text-primary
              "
            >
              {getInitials(item.name)}
            </div>

            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-foreground
                "
              >
                {item.name}
              </p>

              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                {item.role}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Depoimentos = () => {
  return (
    <section
      id="depoimentos"
      className="
        relative
        section-espaco
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      

      {/* Glow superior extremamente sutil */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[20%]
          h-[500px]
          w-[800px]
          -translate-x-1/2
          rounded-full
          bg-blue-600/[0.025]
          blur-[140px]
        "
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* ===================================================
            HEADER
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mx-auto
            mb-16
            max-w-2xl
            text-center
            md:mb-20
          "
        >
          <div
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/20
              bg-primary/5
              px-4
              py-2
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-primary
                shadow-[0_0_10px_hsl(var(--primary))]
              "
            />

            <span
              className="
                text-xs
                font-medium
                tracking-wide
                text-primary
              "
            >
              Depoimentos
            </span>
          </div>

          <h2
            className="
              font-display
              text-4xl
              font-bold
              tracking-tight
              text-foreground
              md:text-5xl
            "
          >
            Quem já passou pelo palco digital{" "}
            <span className="text-gradient">
              aprova.
            </span>
          </h2>

          <p
            className="
              mt-5
              text-base
              leading-relaxed
              text-muted-foreground
              md:text-lg
            "
          >
            Histórias reais de marcas que transformaram presença online em resultado.
          </p>
        </motion.div>

        {/* ===================================================
            CARDS + ILUMINAÇÃO
        ==================================================== */}

        <div className="relative mx-auto max-w-6xl">

          {/* =================================================
              ILUMINAÇÃO ATRÁS DOS CARDS
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[48%]
              z-0
              h-[420px]
              w-[110%]
              -translate-x-1/2
            "
          >
            {/* ---------------------------------------------
                HALO CENTRAL
            ---------------------------------------------- */}

            <motion.div
              animate={{
                opacity: [0.45, 0.7, 0.45],
                scale: [0.96, 1.02, 0.96],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-1/2
                top-[35px]
                h-[260px]
                w-[720px]
                -translate-x-1/2
                blur-[80px]
              "
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(var(--primary) / 0.12) 0%, hsl(var(--primary) / 0.055) 30%, hsl(var(--primary) / 0.018) 52%, transparent 74%)",
              }}
            />

            {/* ---------------------------------------------
                HALO CENTRAL INTERNO
            ---------------------------------------------- */}

            <div
              className="
                absolute
                left-1/2
                top-[20px]
                h-[220px]
                w-[500px]
                -translate-x-1/2
                blur-[55px]
              "
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(var(--primary) / 0.065) 0%, transparent 68%)",
              }}
            />

            {/* ---------------------------------------------
                GLOW ESQUERDO
            ---------------------------------------------- */}

            <motion.div
              animate={{
                x: [-12, 8, -12],
                opacity: [0.22, 0.38, 0.22],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-[8%]
                top-[70px]
                h-[180px]
                w-[300px]
                blur-[85px]
              "
              style={{
                background:
                  "radial-gradient(circle, hsl(217 91% 60% / 0.075) 0%, transparent 70%)",
              }}
            />

            {/* ---------------------------------------------
                GLOW DIREITO
            ---------------------------------------------- */}

            <motion.div
              animate={{
                x: [12, -8, 12],
                opacity: [0.22, 0.38, 0.22],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="
                absolute
                right-[8%]
                top-[70px]
                h-[180px]
                w-[300px]
                blur-[85px]
              "
              style={{
                background:
                  "radial-gradient(circle, hsl(217 91% 60% / 0.075) 0%, transparent 70%)",
              }}
            />

            {/* ---------------------------------------------
                LINHA DE LUZ
            ---------------------------------------------- */}

            <motion.div
              animate={{
                opacity: [0.08, 0.22, 0.08],
                scaleX: [0.88, 1, 0.88],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-1/2
                top-[105px]
                h-px
                w-[72%]
                -translate-x-1/2
                bg-gradient-to-r
                from-transparent
                via-blue-400/50
                to-transparent
                blur-[1px]
              "
            />

            {/* ---------------------------------------------
                LUZ DIFUSA DA LINHA
            ---------------------------------------------- */}

            <div
              className="
                absolute
                left-1/2
                top-[92px]
                h-[35px]
                w-[65%]
                -translate-x-1/2
                bg-blue-500/[0.025]
                blur-[20px]
              "
            />

            {/* ---------------------------------------------
                PONTO CENTRAL
            ---------------------------------------------- */}

            <motion.div
              animate={{
                opacity: [0.15, 0.5, 0.15],
                scale: [0.8, 1.15, 0.8],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-1/2
                top-[101px]
                h-[3px]
                w-[3px]
                -translate-x-1/2
                rounded-full
                bg-blue-300
                shadow-[0_0_18px_5px_rgba(59,130,246,0.30)]
              "
            />

            {/* ---------------------------------------------
                PONTOS LATERAIS
            ---------------------------------------------- */}

            <motion.span
              animate={{
                opacity: [0.05, 0.3, 0.05],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-[22%]
                top-[118px]
                h-[2px]
                w-[2px]
                rounded-full
                bg-blue-300
                shadow-[0_0_8px_rgba(59,130,246,0.5)]
              "
            />

            <motion.span
              animate={{
                opacity: [0.05, 0.35, 0.05],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="
                absolute
                right-[22%]
                top-[115px]
                h-[2px]
                w-[2px]
                rounded-full
                bg-blue-300
                shadow-[0_0_8px_rgba(59,130,246,0.5)]
              "
            />

            {/* ---------------------------------------------
                FADE FINAL
            ---------------------------------------------- */}

            
          </div>

          {/* =================================================
              CARDS
          ================================================== */}

          <div
            className="
              relative
              z-10
              grid
              gap-6
              md:grid-cols-3
            "
          >
            {depoimentos.map((item, index) => (
              <TestimonialCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;