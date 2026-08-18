import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const beneficios = [
  "Design que guia o usuário naturalmente até a ação",
  "UX refinado para aumentar conversões",
  "Layouts pensados para todos os dispositivos",
  "Desenvolvimento limpo, rápido e profissional",
];

const SobreNos = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
                Freelancer Web Designer & Dev
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Cada grande espetáculo precisa de bastidores sólidos,{" "}
                <span className="text-gradient">e no digital não é diferente.</span>
              </h1>
              
              <div className="space-y-6 text-muted-foreground text-lg">
                <p>
                  Como freelancer especializado em sites, landing pages, páginas link-in-bio 
                  para criadores de conteúdo, lojas online e até SaaS, meu trabalho é preparar 
                  toda a estrutura que o seu negócio precisa para brilhar — com design bem pensado, 
                  navegação intuitiva e uma experiência que conduz o visitante como se fosse o 
                  público na melhor fila do teatro.
                </p>
                
                <p>
                  Aqui, nada é feito ao acaso: cada cor, cada movimento, cada clique é planejado 
                  para transformar atenção em interesse e interesse em ação.
                </p>
                
                <p>
                  <strong className="text-foreground">O resultado?</strong> Um palco digital que não 
                  apenas impressiona visualmente, mas que conduz o usuário com naturalidade até o 
                  centro da sua oferta, aumentando a confiança, o engajamento e as chances de conversão.
                </p>
              </div>
              
              {/* Benefícios */}
              <div className="mt-8 space-y-3">
                {beneficios.map((beneficio, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{beneficio}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Right content - Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="card-glass rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
                
                <h3 className="text-2xl font-display font-bold text-primary mb-4">
                  Experiência Imersiva
                </h3>
                <p className="text-muted-foreground mb-6">
                  Interações suaves, animações estratégicas e um fluxo pensado para converter.
                </p>
                
                <Button asChild variant="hero" size="lg" className="w-full group">
                  <Link to="/#contato">
                    Quero criar meu espetáculo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Link 
                  to="/#portfolio" 
                  className="flex items-center justify-center gap-2 mt-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Ver portfolio <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              {/* Decorative circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border-2 border-primary/20 rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Você tem alguma dúvida?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Quero que você se sinta seguro(a) para seguir adiante. Encontre respostas rápidas 
              sobre a metodologia, como funciona o processo de UX Design e as etapas de contratação.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/#contato">Fale Comigo</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/#faq">Ver FAQ</Link>
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-2">Contate-me</p>
              <p className="text-foreground font-medium">contato@lunding.com.br</p>
              <p className="text-foreground">+55 54 99640-9552</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SobreNos;
