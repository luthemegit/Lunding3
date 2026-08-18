import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import SoftAurora from "./ui/SoftAurora";
import pousadaImg from "../../assets/img/pousadabellavista.png";
import lundingantigoImg from "../../assets/img/lundingantigo.png";
import allframesImg from "../../assets/img/allframes.png";

const projects = [
  {
    id: 1,
    title: "Pousada Bella Vista",
    category: "Landing Page",
    description: "Mini-Site focado em apresentar uma Pousada",
    color: "from-primary to-blue-600",
    image: pousadaImg,
    link: "https://pousadabellavista.com.br", 
  },
  {
    id: 2,
    title: "AllFrames Technology",
    category: "E-Commerce",
    description: "E-Commerce focado em vendas online",
    image: allframesImg,
    link: "https://allframestechnology.com.br",
  },
  {
    id: 3,
    title: "Site atual da Lunding",
    category: "Landing Page",
    description: "Página atual da Lunding, será substituída por este site que você está vendo agora.",
    color: "from-emerald-500 to-teal-600",
    image: lundingantigoImg,
    link: "https://lunding.com.br",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      {/* Background Aurora */}
      <div className="absolute inset-0 -translate-y-96 z-0 pointer-events-none pt-24">
        <SoftAurora
          speed={0.35}
          scale={1.5}
          brightness={0.7}
          color1="#F1EDFF"
          color2="#7C3AED"
          noiseFrequency={2}
          noiseAmplitude={0.8}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={0.5}
          enableMouseInteraction={false}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Meu <span className="text-gradient">Portfólio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resultados que falam por si. Cada case demonstra meu compromisso em
            resolver desafios reais com soluções de UX Design inteligentes.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden card-glass">
                {/* Project Preview */}
                <div className="aspect-[4/3] p-6 flex items-end relative overflow-hidden">
                  {/* Imagem do projeto */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlay escuro pra manter o texto legível */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ExternalLink className="w-12 h-12 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Category Badge */}
                  <span className="relative z-10 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Link do site - aparece abaixo do card no hover */}
              <div className="overflow-hidden max-h-0 group-hover:max-h-10 transition-all duration-300 ease-out">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-1.5 pt-3 text-sm text-primary hover:underline"
                >
                  {project.link.replace(/^https?:\/\//, "")}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button variant="hero" size="xl" className="group">
            Acessar Portfólio Completo
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};