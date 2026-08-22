import { useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "./ui/button";

const ContactCard = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  /* =========================================
     MOUSE / TILT
  ========================================== */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tilt extremamente leve para manter o visual premium
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [2.5, -2.5]),
    {
      stiffness: 280,
      damping: 28,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]),
    {
      stiffness: 280,
      damping: 28,
    }
  );

  // Posição do glow
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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: isHovered ? -3 : 0,
      }}
      transition={{
        y: {
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className="
        relative
        min-h-[325px]
        w-full
        overflow-hidden
        rounded-[24px]
        border
        border-white/[0.09]
        bg-[#020617]
        shadow-[0_0_0_1px_rgba(37,99,235,0.04),0_30px_80px_rgba(0,0,0,0.35)]
        transition-shadow
        duration-300
      "
    >
      {/* =========================================
          TEXTURA DIAGONAL
      ========================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.075]
          [background-image:repeating-linear-gradient(135deg,rgba(148,163,184,0.18)_0px,rgba(148,163,184,0.18)_1px,transparent_1px,transparent_4px)]
        "
      />

      {/* =========================================
          GRADIENTE CENTRAL
      ========================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.35)_0%,rgba(2,6,23,0)_62%)]
        "
      />

      {/* =========================================
          GLOW QUE SEGUE O MOUSE
      ========================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
        "
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        style={{
          background: `radial-gradient(
            420px circle at ${glowX} ${glowY},
            rgba(37, 99, 235, 0.10),
            transparent 68%
          )`,
        }}
      />

      {/* =========================================
          FEIXO AZUL — ESQUERDO
      ========================================== */}

      <div
        className="
          absolute
          pointer-events-none
          -left-[42px]
          -top-[135px]
          h-[430px]
          w-[42px]
          rotate-[27deg]
          rounded-full
          bg-gradient-to-r
          from-transparent
          via-blue-500/70
          to-blue-400/10
          blur-[0.5px]
          shadow-[0_0_18px_rgba(37,99,235,0.55)]
        "
      />

      {/* Glow esquerdo */}

      <div
        className="
          absolute
          pointer-events-none
          -left-[65px]
          -top-[125px]
          h-[430px]
          w-[85px]
          rotate-[27deg]
          bg-blue-600/[0.12]
          blur-[22px]
        "
      />

      {/* Linha interna esquerda */}

      <div
        className="
          absolute
          pointer-events-none
          -left-[28px]
          -top-[125px]
          h-[430px]
          w-[2px]
          rotate-[27deg]
          bg-blue-300/50
          blur-[0.5px]
        "
      />

      {/* =========================================
          FEIXO AZUL — DIREITO
      ========================================== */}

      <div
        className="
          absolute
          pointer-events-none
          -right-[42px]
          -top-[135px]
          h-[430px]
          w-[42px]
          -rotate-[27deg]
          rounded-full
          bg-gradient-to-l
          from-transparent
          via-blue-500/70
          to-blue-400/10
          blur-[0.5px]
          shadow-[0_0_18px_rgba(37,99,235,0.55)]
        "
      />

      {/* Glow direito */}

      <div
        className="
          absolute
          pointer-events-none
          -right-[65px]
          -top-[125px]
          h-[430px]
          w-[85px]
          -rotate-[27deg]
          bg-blue-600/[0.12]
          blur-[22px]
        "
      />

      {/* Linha interna direita */}

      <div
        className="
          absolute
          pointer-events-none
          -right-[28px]
          -top-[125px]
          h-[430px]
          w-[2px]
          -rotate-[27deg]
          bg-blue-300/50
          blur-[0.5px]
        "
      />

      {/* =========================================
          CONTEÚDO
      ========================================== */}

      <div
        style={{
          transform: "translateZ(20px)",
        }}
        className="
          relative
          z-20
          flex
          min-h-[325px]
          flex-col
          items-center
          justify-center
          px-6
          py-12
          text-center
          md:px-10
        "
      >
        {/* =========================================
            TÍTULO
        ========================================== */}

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.1,
          }}
          className="
            font-display
            text-[30px]
            font-bold
            leading-tight
            tracking-[-0.03em]
            text-white
            md:text-[34px]
          "
        >
          Inicie seu projeto conosco
        </motion.h2>

        {/* =========================================
            DESCRIÇÃO
        ========================================== */}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.18,
          }}
          className="
            mt-2
            max-w-[500px]
            text-[14px]
            leading-[1.55]
            text-slate-400
            md:text-[15px]
          "
        >
          Vamos construir algo extraordinário juntos? Fale com a gente hoje e dê o primeiro passo para ter um site sob medida para o seu negócio.
          <br className="hidden md:block" />
          website solution.
        </motion.p>

        {/* =========================================
            BENEFÍCIOS
        ========================================== */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.26,
          }}
          className="
            mt-5
            flex
            flex-wrap
            items-center
            justify-center
            gap-2
          "
        >
          {[
            "Design Customizado",
            "Suporte Contínuo",
            "Entrega Rápida",
          ].map((item) => (
            <div
              key={item}
              className="
                flex
                h-[29px]
                items-center
                gap-1.5
                rounded-full
                border
                border-blue-500/[0.18]
                bg-[#020b20]/80
                px-2.5
                text-[11px]
                font-medium
                text-slate-300
                shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]
                backdrop-blur-sm
              "
            >
              <span
                className="
                  flex
                  h-[15px]
                  w-[15px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-green-600
                  shadow-[0_0_8px_rgba(34,197,94,0.25)]
                "
              >
                <Check
                  className="
                    h-[10px]
                    w-[10px]
                    stroke-[3]
                    text-white
                  "
                />
              </span>

              {item}
            </div>
          ))}
        </motion.div>

        {/* =========================================
            BOTÃO
        ========================================== */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.34,
          }}
          className="mt-7"
        >
          <Button
            asChild
            variant="hero"
            size="lg"
            className="
              group
              h-[43px]
              rounded-full
              bg-gradient-to-r
              from-blue-600
              via-blue-500
              to-indigo-500
              px-6
              text-[13px]
              font-semibold
              text-white
              shadow-[0_8px_25px_rgba(37,99,235,0.25)]
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-[0_10px_35px_rgba(37,99,235,0.4)]
            "
          >
            <a
              href="https://wa.link/ve0vb2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Iniciar o projeto

              <ArrowRight
                className="
                  ml-1.5
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* =========================================
          BORDA / GLOW NO HOVER
      ========================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          rounded-[24px]
          ring-1
          ring-inset
        "
        animate={{
          boxShadow: isHovered
            ? `
              inset 0 0 0 1px rgba(59,130,246,0.28),
              inset 0 0 35px rgba(37,99,235,0.035)
            `
            : `
              inset 0 0 0 1px rgba(255,255,255,0.018)
            `,
        }}
        transition={{
          duration: 0.3,
        }}
      />

      {/* =========================================
          BORDA INTERNA
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[4px]
          z-30
          rounded-[20px]
          border
          border-white/[0.018]
        "
      />
    </motion.div>
  );
};

export const Contact = () => {
  return (
    <section
      id="contato"
      className="
        relative section-espaco overflow-hidden
      "
    >
      {/* =========================================
          BACKGROUND DA SECTION
      ========================================== */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#020212]" />

        {/* Glow superior esquerdo */}

        
      </div>

      {/* =========================================
          CONTAINER
      ========================================== */}

      <div className="container relative z-10 mx-auto px-5 md:px-6">
        <div className="mx-auto w-full max-w-[880px]">
          <ContactCard />
        </div>
      </div>
    </section>
  );
};

export default Contact;