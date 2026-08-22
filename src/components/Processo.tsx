// src/components/Processo.tsx

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  Wand2,
  Code2,
  TestTube,
  Rocket,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

import { SectionsGlow } from "./SectionsGrid";

const etapas = [
  {
    Icon: Search,
    title: "Descoberta",
    description:
      "Entendemos sua marca, perfil, objetivos e público-alvo para definir as metas do projeto.",
  },
  {
    Icon: Wand2,
    title: "Conceito de design",
    description:
      "Criamos os primeiros conceitos visuais com base nos insights da descoberta.",
  },
  {
    Icon: Code2,
    title: "Desenvolvimento",
    description:
      "Construímos o site com foco em funcionalidade, performance e boas práticas.",
  },
  {
    Icon: TestTube,
    title: "Testes e ajustes",
    description:
      "Testamos em diferentes dispositivos e refinamos cada detalhe da experiência.",
  },
  {
    Icon: Rocket,
    title: "Lançamento",
    description:
      "Publicamos o site com toda a estrutura pronta para performance e crescimento.",
  },
  {
    Icon: HeartHandshake,
    title: "Suporte contínuo",
    description:
      "Acompanhamos os resultados e oferecemos suporte para o sucesso a longo prazo.",
  },
];

export const Processo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  /*
   * ============================================================
   * PROGRESSO DA TIMELINE
   *
   * A barra utiliza scaleY em vez de height.
   * Isso evita alterações de layout durante o scroll.
   * ============================================================
   */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 55%"],
  });

  const scaleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  return (
    <section
      id="processo"
      className="
        relative
        isolate
        overflow-hidden

        bg-background

        section-espaco
      "
    >
      {/* ======================================================
          BACKGROUND GLOBAL
      ======================================================= */}

      <SectionsGlow />

      {/* ======================================================
          CONTEÚDO
      ======================================================= */}

      <div className="container mx-auto px-6 relative z-10">

        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="max-w-2xl mx-auto text-center mb-24">

          {/* Badge */}

          <motion.span
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-50px",
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="
              inline-flex
              items-center
              gap-2

              px-4
              py-1.5

              rounded-full

              border
              border-primary/25

              bg-primary/[0.08]

              text-accent

              text-xs
              font-medium

              mb-6
            "
          >
            <span
              className="
                w-1.5
                h-1.5

                rounded-full

                bg-accent
              "
            />

            Processo
          </motion.span>

          {/* ==================================================
              TÍTULO
          =================================================== */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-50px",
            }}
            transition={{
              duration: 0.45,
              delay: 0.04,
              ease: "easeOut",
            }}
            className="
              text-3xl
              md:text-5xl

              font-display
              font-bold

              text-foreground

              tracking-tight
            "
          >
            <span className="block">
              Do primeiro insight ao
            </span>

            {/* ==================================================
                ELEMENTO DECORATIVO
                Leve, estático e sem blur.
            =================================================== */}

            

            <span className="block text-gradient">
              projeto pronto.
            </span>
          </motion.h2>

          {/* Descrição */}

          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-50px",
            }}
            transition={{
              duration: 0.45,
              delay: 0.08,
              ease: "easeOut",
            }}
            className="
              text-muted-foreground

              max-w-xl
              mx-auto

              mt-5

              text-base

              leading-relaxed
            "
          >
            Uma abordagem simples e estratégica para transformar ideias em
            experiências digitais que realmente fazem sentido para o seu negócio.
          </motion.p>
        </div>

        {/* ====================================================
            TIMELINE
        ===================================================== */}

        <div
          ref={containerRef}
          className="
            relative
            max-w-3xl
            mx-auto

            pb-28
          "
        >

          {/* ==================================================
              LINHA BASE
              
              Completamente estática.
          =================================================== */}

          <div
            aria-hidden="true"
            className="
              absolute

              left-[19px]

              top-5
              bottom-5

              w-[2px]

              rounded-full

              bg-border/60
            "
          />

          {/* ==================================================
              LINHA DE PROGRESSO

              scaleY = muito mais leve que alterar height.
          =================================================== */}

          <motion.div
            aria-hidden="true"
            style={{
              scaleY,
            }}
            className="
              absolute

              left-[19px]

              top-5
              bottom-5

              w-[2px]

              origin-top

              rounded-full

              bg-gradient-to-b
              from-primary
              via-primary
              to-accent

              will-change-transform
            "
          />

          {/* ==================================================
              ETAPAS
          =================================================== */}

          <div className="space-y-10">

            {etapas.map((item, index) => {
              const number = String(index + 1).padStart(2, "0");

              return (
                <motion.div
                  key={item.title}

                  initial={{
                    opacity: 0,
                    y: 18,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                    margin: "-70px",
                  }}

                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}

                  className="
                    relative

                    flex
                    items-start

                    gap-7

                    group
                  "
                >

                  {/* ==================================================
                      ÍCONE
                  =================================================== */}

                  <div
                    className="
                      relative
                      z-20

                      flex-shrink-0
                    "
                  >
                    <div
                      className="
                        w-10
                        h-10

                        rounded-full

                        bg-background

                        border
                        border-border

                        flex
                        items-center
                        justify-center

                        transition-colors
                        duration-300

                        group-hover:border-primary/50
                      "
                    >
                      <item.Icon
                        className="
                          w-[17px]
                          h-[17px]

                          text-primary

                          transition-colors
                          duration-300

                          group-hover:text-accent
                        "
                        strokeWidth={1.7}
                      />
                    </div>
                  </div>

                  {/* ==================================================
                      CARD
                  =================================================== */}

                  <div
                    className="
                      relative

                      flex-1

                      rounded-2xl

                      border
                      border-border/60

                      bg-card/75

                      px-7
                      py-6

                      overflow-hidden

                      transition-colors
                      duration-300

                      group-hover:border-primary/30
                      group-hover:bg-card
                    "
                  >

                    {/* Linha superior */}

                    <div
                      aria-hidden="true"
                      className="
                        absolute

                        top-0
                        left-0
                        right-0

                        h-px

                        bg-gradient-to-r
                        from-transparent
                        via-primary/0
                        to-transparent

                        transition-opacity
                        duration-300

                        group-hover:via-primary/40
                      "
                    />

                    {/* ==================================================
                        NÚMERO
                    =================================================== */}

                    <span
                      aria-hidden="true"
                      className="
                        absolute

                        right-6
                        top-1/2

                        -translate-y-1/2

                        text-[72px]

                        leading-none

                        font-display
                        font-bold

                        tracking-tighter

                        text-primary/[0.035]

                        select-none
                        pointer-events-none
                      "
                    >
                      {number}
                    </span>

                    {/* ==================================================
                        LABEL
                    =================================================== */}

                    <div
                      className="
                        relative

                        flex
                        items-center

                        gap-3

                        mb-3
                      "
                    >
                      <span
                        className="
                          text-[11px]

                          uppercase

                          tracking-[0.18em]

                          text-primary/70

                          font-medium
                        "
                      >
                        Etapa {number}
                      </span>

                      <span
                        className="
                          h-px
                          w-8

                          bg-primary/20

                          transition-all
                          duration-300

                          group-hover:w-12
                          group-hover:bg-accent/40
                        "
                      />
                    </div>

                    {/* ==================================================
                        TÍTULO
                    =================================================== */}

                    <h3
                      className="
                        relative

                        text-foreground

                        font-display
                        font-semibold

                        text-xl

                        mb-2
                      "
                    >
                      {item.title}
                    </h3>

                    {/* ==================================================
                        DESCRIÇÃO
                    =================================================== */}

                    <p
                      className="
                        relative

                        max-w-xl

                        text-sm

                        text-muted-foreground

                        leading-relaxed
                      "
                    >
                      {item.description}
                    </p>

                    {/* ==================================================
                        SETA
                    =================================================== */}

                    
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        
      </div>

      {/* ========================================================
          FADE FINAL DA SEÇÃO
      ========================================================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[5]
          h-56
          bg-gradient-to-b
          from-transparent
          via-background/50
          to-background
        "
      />

      
    </section>
  );
};

export default Processo;