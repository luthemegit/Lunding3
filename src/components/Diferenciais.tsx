import { motion } from "framer-motion";
import StackedFeatureCards from "./ui/StackedFeatureCards";

export const Diferenciais = () => {
  return (
    <section
      className="
        relative
        py-32
        overflow-visible
        -mt-40
        pt-72
      "
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
      
        <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[800px]
          h-[500px]
          rounded-full
          bg-purple-300/20
          blur-[120px]
          pointer-events-none
        "
/>

      </div>    

      {/* Conteúdo */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Título */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-20"
        >
          <h2
            className="
              text-3xl
              md:text-5xl
              font-display
              font-bold
              mb-6
            "
          >
            Principais{" "}
            <span className="text-gradient">
              Diferenciais
            </span>
          </h2>

          <p
            className="
              text-lg
              text-muted-foreground
              max-w-2xl
              mx-auto
            "
          >
            Por que escolher a Lunding? Descubra o que nos
            torna únicos.
          </p>
        </motion.div>

        {/* Cards */}
        <StackedFeatureCards />
      </div>
    </section>
  );
};