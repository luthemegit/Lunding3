import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { 
  Layout, 
  Smartphone, 
  Rocket, 
  Palette,
  ChevronRight 
} from "lucide-react";
import RotatingText from "@/components/ui/RotatingText";

const servicos = [
  {
    icon: Layout,
    title: "Web Design",
    description: "Criação de sites modernos, responsivos e otimizados para conversão.",
    features: ["Landing Pages", "Sites Institucionais", "Blogs"],
  },
  {
    icon: Smartphone,
    title: "UX/UI Design",
    description: "Interfaces intuitivas que encantam usuários e geram resultados.",
    features: ["Prototipação", "Pesquisa de Usuário", "Design System"],
  },
  {
    icon: Rocket,
    title: "Otimização",
    description: "Performance e SEO para seu site aparecer no topo do Google.",
    features: ["SEO Técnico", "Pesquisa de Mercado", "Análise de Dados"],
  },
  {
    icon: Palette,
    title: "Identidade Visual",
    description: "Branding completo para destacar sua marca no mercado.",
    features: ["Logo", "Paleta de Cores", "Tipografia"],
  },
];

export const Servicos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="servicos" className="py-32 relative overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
            O que{" "}
            <span className="text-gradient">
              Fazemos?
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Do visual à experiência, construímos a presença digital que faz sua marca ser percebida, lembrada e escolhida.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 mt-10">
            <h4 className="text-2xl md:text-2xl font-display font-bold">
              Criamos
            </h4>
            <RotatingText
              texts={['Web Design', 'UX/UI Design', 'Sites Otimizados', 'Identidade Digital']}
              mainClassName="inline-flex w-fit px-3 sm:px-4 md:px-5 bg-gradient-to-r from-primary to-accent text-white font-display font-bold text-3xl md:text-2xl overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "60%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-60%", opacity: 0 }}
              staggerDuration={0.02}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 22, stiffness: 170, mass: 0.6 }}
              rotationInterval={2400}
              splitBy="characters"
              auto
              loop
            />
          </div>

        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {servicos.map((servico, index) => (
            <motion.div
              key={servico.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="group relative"
            >
              <div className="card-glass p-8 rounded-2xl h-full transition-all duration-500 hover:border-primary/50 cursor-pointer overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: activeIndex === index ? 1 : 0,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0"
                    >
                      <servico.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                        {servico.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {servico.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {servico.features.map((feature) => (
                      <motion.div
                        key={feature}
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <ChevronRight className="w-4 h-4 text-primary" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};