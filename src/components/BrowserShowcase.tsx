"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Star,
  Puzzle,
  MoreVertical,
} from "lucide-react";

interface Project {
  name: string;
  url: string;
  image: string;
  favicon: string;
}

const projects: Project[] = [
  {
    name: "Cardápio Online",
    url: "jujubalanches.com.br",
    image: "/projects/full-screen.png",
    favicon: "from-blue-400 to-blue-600",
  },
  {
    name: "Pousada Bella Vista",
    url: "pousadabellavista.com.br",
    image: "/projects/pousadabellavista-fs.png",
    favicon: "from-pink-400 to-fuchsia-600",
  },
  {
    name: "Clínica Odontológica",
    url: "francielleallgaier.com.br",
    image: "/projects/full-screen.png",
    favicon: "from-emerald-400 to-teal-600",
  },
  {
    name: "Clínica Doutor Sofá",
    url: "doutorsofa.com.br                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ",
    image: "/projects/full-screen.png",
    favicon: "from-emerald-400 to-teal-600",
  },
];

/* ============================================================
   INDICADOR DE SCROLL
============================================================ */

const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1,
        duration: 0.5,
      }}
      className="
        absolute
        bottom-5
        left-1/2
        -translate-x-1/2
        z-30
        pointer-events-none
      "
    >
      <svg
        width="28"
        height="42"
        viewBox="0 0 28 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
          text-white/80
          drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]
        "
      >
        {/* Corpo do mouse */}
        <rect
          x="1"
          y="1"
          width="26"
          height="40"
          rx="13"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        {/* Scroll animado */}
        <motion.circle
          cx="14"
          cy="9"
          r="2"
          fill="currentColor"
          animate={{
            cy: [9, 16, 9],
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
};

/* ============================================================
   BROWSER SHOWCASE
============================================================ */

export const BrowserShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReloading, setIsReloading] = useState(false);
  

  const active = projects[activeIndex];

  /* ==========================================================
     NAVEGAÇÃO
  ========================================================== */

  const goTo = (index: number) => {
    const normalizedIndex =
      ((index % projects.length) + projects.length) %
      projects.length;

    setActiveIndex(normalizedIndex);
  };

  const goNext = () => {
    goTo(activeIndex + 1);
  };

  const goPrevious = () => {
    goTo(activeIndex - 1);
  };

  /* ==========================================================
     RELOAD
  ========================================================== */

  const handleReload = () => {
    if (isReloading) return;

    setIsReloading(true);

    setTimeout(() => {
      setIsReloading(false);
    }, 600);
  };

  return (
    <div className="relative max-w-4xl mx-auto select-none">

      {/* ======================================================
          GLOW
      ======================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-primary/20
          to-transparent
          blur-3xl
          rounded-3xl
          pointer-events-none
        "
      />

      <div className="relative">

        {/* ====================================================
            NOTEBOOK / NAVEGADOR
        ===================================================== */}

        <div
          className="
            relative
            bg-card
            border
            border-border/50
            rounded-t-2xl
            shadow-2xl
            overflow-hidden
            glow-effect
          "
        >

          {/* ==================================================
              ABAS
          =================================================== */}

          <div
            className="
              flex
              items-end
              gap-1
              bg-secondary/60
              pt-2.5
              px-2
            "
          >

            {projects.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={project.name}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Ver projeto ${project.name}`}
                  aria-selected={isActive}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-2
                    pl-3
                    pr-1.5
                    py-2
                    rounded-t-lg
                    text-xs
                    font-medium
                    max-w-[170px]
                    shrink-0
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "bg-card text-foreground"
                        : "text-muted-foreground hover:bg-card/40 hover:text-foreground"
                    }
                  `}
                >

                  {/* Favicon */}

                  <span
                    className={`
                      w-2
                      h-2
                      rounded-full
                      shrink-0
                      bg-gradient-to-br
                      ${project.favicon}
                    `}
                  />

                  {/* Nome */}

                  <span className="truncate">
                    {project.name}
                  </span>

                  {/* Fechar aba */}

                  <span
                    className={`
                      ml-1
                      flex
                      items-center
                      justify-center
                      w-4
                      h-4
                      rounded-full
                      transition-all

                      ${
                        isActive
                          ? "opacity-60 hover:opacity-100 hover:bg-secondary"
                          : "opacity-0 group-hover:opacity-60"
                      }
                    `}
                  >
                    <X size={10} />
                  </span>

                </button>
              );
            })}

            {/* Nova aba */}

            <button
              type="button"
              aria-label="Nova aba"
              className="
                flex
                items-center
                justify-center
                w-7
                h-7
                mb-1
                rounded-full
                text-muted-foreground
                shrink-0
                hover:bg-card/40
                hover:text-foreground
                transition-colors
              "
            >
              <Plus size={14} />
            </button>

            <div className="flex-1" />

            {/* Controles da janela */}

            <div
              className="
                hidden
                sm:flex
                items-center
                gap-4
                pb-2.5
                pr-3
                shrink-0
                text-muted-foreground/50
              "
            >
              <div className="w-3 h-[2px] bg-current rounded-full" />

              <div className="w-2.5 h-2.5 border border-current rounded-[2px]" />

              <X size={12} />
            </div>

          </div>

          {/* ==================================================
              BARRA DE ENDEREÇO
          =================================================== */}

          <div
            className="
              flex
              items-center
              gap-2.5
              px-3
              py-2
              bg-card
              border-b
              border-border/50
            "
          >

            {/* Navegação */}

            <div
              className="
                flex
                items-center
                gap-2.5
                text-muted-foreground
                shrink-0
              "
            >

              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={goPrevious}
                aria-label="Projeto anterior"
                className="
                  hover:text-foreground
                  transition-colors
                  cursor-pointer
                "
              >
                <ChevronLeft size={16} />
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={goNext}
                aria-label="Próximo projeto"
                className="
                  hover:text-foreground
                  transition-colors
                  cursor-pointer
                "
              >
                <ChevronRight size={16} />
              </motion.button>

              {/* Reload */}

              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={handleReload}
                aria-label="Atualizar projeto"
                className="
                  hover:text-foreground
                  transition-colors
                  cursor-pointer
                "
              >
                <motion.div
                  animate={{
                    rotate: isReloading ? 360 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "linear",
                  }}
                >
                  <RotateCw size={13} />
                </motion.div>
              </motion.button>

            </div>

            {/* ==================================================
                URL
            =================================================== */}

            <motion.div
              layout
              className="
                flex
                flex-1
                items-center
                gap-2
                bg-secondary/50
                rounded-full
                pl-3
                pr-2.5
                py-1.5
                min-w-0
                border
                border-transparent
                hover:border-border/50
                transition-colors
              "
            >

              <Lock
                size={11}
                className="text-muted-foreground shrink-0"
              />

              <AnimatePresence mode="wait">

                <motion.span
                  key={active.url}
                  initial={{
                    opacity: 0,
                    x: 8,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -8,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    flex-1
                    text-xs
                    text-muted-foreground
                    truncate
                  "
                >
                  {active.url}
                </motion.span>

              </AnimatePresence>

              {/* Favorito */}

              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                aria-label="Favoritar"
                className="shrink-0"
              >
                <Star
                  size={12}
                  className="
                    text-muted-foreground/50
                    hover:text-yellow-400
                    transition-colors
                  "
                />
              </motion.button>

            </motion.div>

            {/* ==================================================
                ÍCONES DIREITA
            =================================================== */}

            <div
              className="
                hidden
                sm:flex
                items-center
                gap-3
                text-muted-foreground
                shrink-0
              "
            >

              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Extensões"
              >
                <Puzzle
                  size={15}
                  className="
                    hover:text-foreground
                    transition-colors
                  "
                />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Perfil"
                className="
                  w-5
                  h-5
                  rounded-full
                  bg-gradient-to-br
                  from-primary
                  to-accent
                "
              />

              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Menu"
              >
                <MoreVertical
                  size={15}
                  className="
                    hover:text-foreground
                    transition-colors
                  "
                />
              </motion.button>

            </div>

          </div>

          {/* ==================================================
              ÁREA DO SITE / SCROLL MANUAL
          =================================================== */}

          {/* ==================================================
    ÁREA DO SITE / SCROLL MANUAL
================================================== */}

<div
  className="
    relative
    w-full
    overflow-hidden
    bg-background
  "
  style={{
    aspectRatio: "16 / 9",
  }}
>
  {/* Área que realmente possui o scroll */}
  <motion.div
    key={active.image}
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    transition={{
      duration: 0.35,
    }}
    className="
      absolute
      inset-0
      overflow-y-auto
      [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden
    "
  >
    <img
      src={active.image}
      alt={`Preview do projeto ${active.name}`}
      className="
        w-full
        h-auto
        block
      "
      draggable={false}
    />
  </motion.div>

  {/* ==================================================
      FADE INFERIOR
      Fica SOBRE a imagem e não rola com ela
  ================================================== */}

  <div
    className="
      absolute
      bottom-0
      left-0
      right-0
      h-28
      bg-gradient-to-t
      from-black/50
      via-black/10
      to-transparent
      pointer-events-none
      z-20
    "
  />

  {/* ==================================================
      INDICADOR DE SCROLL
      Fica FIXO SOBRE a área da imagem
  ================================================== */}

  <ScrollIndicator />
</div>

        </div>

        {/* ====================================================
            BASE DO NOTEBOOK
        ===================================================== */}

        <div
          className="
            relative
            mx-auto
          "
          style={{
            width: "104%",
            left: "-2%",
          }}
        >

          <div
            className="
              h-3
              bg-gradient-to-b
              from-card
              to-secondary/80
              border-x
              border-b
              border-border/50
              rounded-b-2xl
              shadow-2xl
            "
          />

          <div
            className="
              h-1.5
              w-1/4
              bg-border/60
              rounded-b-full
              mx-auto
              -mt-px
            "
          />

        </div>

      </div>

      {/* ======================================================
          INDICADORES DOS PROJETOS
      ======================================================= */}

      <div className="flex justify-center gap-2 mt-8">

        {projects.map((project, index) => (

          <motion.button
            key={project.name}
            type="button"
            onClick={() => goTo(index)}
            whileHover={{
              scale: 1.15,
            }}
            whileTap={{
              scale: 0.85,
            }}
            aria-label={`Ir para ${project.name}`}
            className={`
              h-1.5
              rounded-full
              transition-all
              duration-300

              ${
                index === activeIndex
                  ? "w-8 bg-primary"
                  : "w-1.5 bg-border hover:bg-muted-foreground"
              }
            `}
          />

        ))}

      </div>

    </div>
  );
};