import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import GradientWaves from "./ui/GradientWaves";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-visible mt- "
    >
      {/* Novo background animado (React Bits) */}
      <div className="absolute inset-0 z-10 overflow-hidden ">
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#FF9FFC"
          crestColor="#FFFFFF"
          speed={1}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={0.75}
        />
      </div>

      {/* Resto do conteúdo continua igual, só ajustei z-index pra ficar por cima */}
      <div className="container mx-auto px-6 relative z-10 pointer-events-none">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mt-14 mb-8"
          >
            A Internet é o Seu{" "}
            <span className="text-gradient">Palco.</span>
            <br />
            Que Tipo de Espetáculo{" "}
            <span className="relative">
              <span className="text-gradient">Você Quer Dar?</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
          >
            Todo grande show exige uma produção impecável. Somos o{" "}
            <span className="text-foreground font-medium italic">time</span> que cuida
            dos bastidores digitais para que o seu negócio tenha uma presença profissional, marcante e sem falhas a cada clique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          >
            <Button variant="hero" size="xl" className="group" asChild>
              <Link to="/sobre-nos">
                Criar meu site
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#servicos">Saiba Mais</a>
            </Button>
          </motion.div>
        </div>
      </div>

    </section>
  );
};