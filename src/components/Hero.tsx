import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import LazyHyperspeed from "./ui/Lazyhyperspeed";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const hyperspeedColors = {
  roadColor: 0x05050f,
  islandColor: 0x0a0a1a,
  background: 0x000000,
  shoulderLines: 0x2c3e8c,
  brokenLines: 0x2c3e8c,
  leftCars: [0x3b5bdb, 0x4c6ef5, 0x5c7cfa],
  rightCars: [0x1864ab, 0x1971c2, 0x228be6],
  sticks: 0x4c6ef5,
};

export const Hero = () => {
  // memoizado fora do componente já bastaria, mas manter aqui deixa explícito
  // que o objeto não pode ser recriado a cada render (o Hyperspeed recriaria a cena WebGL inteira)
  const hyperspeedOptions = useMemo(() => ({ colors: hyperspeedColors }), []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-10 md:pt-28 md:pb-0 bg-[#05050f]"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <LazyHyperspeed
          className="w-full h-full"
          rootMargin="0px"
          effectOptions={hyperspeedOptions}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 pointer-events-none">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 md:mb-8"
          >
            A Internet é seu Palco.{" "}
            <span className="block sm:inline">
              Que espetáculo sua marca está entregando?
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-12"
          >
            Por trás de toda grande apresentação existe uma produção impecável.
            A Lunding cria experiências digitais que unem design, estratégia e
            tecnologia para transformar a presença da sua marca em
            oportunidades.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.6}
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pointer-events-auto"
          >
            <Button
              variant="hero"
              size="xl"
              className="group w-full sm:w-auto"
              asChild
            >
              <a href="https://wa.link/ve0vb2" target="_blank" rel="noopener noreferrer">
                Criar meu site
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              variant="glass"
              size="xl"
              className="w-full sm:w-auto"
              asChild
            >
              <a href="#quem-somos">Conhecer a Lunding</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};