import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "O que é UX Design?",
    answer: "UX Design cria experiências mais intuitivas e agradáveis dentro de um site ou sistema.",
  },
  {
    question: "Esse design funciona no celular?",
    answer: "Sim, todo o design é 100% responsivo para qualquer dispositivo.",
  },
  {
    question: "Como o UX melhora meus resultados?",
    answer: "Um UX bem aplicado aumenta engajamento, reduz dúvidas e melhora conversões.",
  },
  {
    question: "Vocês personalizam o FAQ?",
    answer: "Sim, todo o conteúdo pode ser totalmente adaptado ao seu negócio.",
  },
  {
    question: "O FAQ é acessível para todos?",
    answer: "Sim, seguimos boas práticas de acessibilidade e leitura.",
  },
  {
    question: "O design azul tem algum impacto emocional?",
    answer: "Sim — azul transmite confiança, segurança e profissionalismo.",
  },
  {
    question: "Esse design é seguro para dados?",
    answer: "Sim! Utilizamos boas práticas estruturais para segurança e estabilidade.",
  },
  {
    question: "Vocês oferecem suporte contínuo?",
    answer: "Sim, acompanhamos você em todas as etapas do projeto.",
  },
];

const FAQPage = () => {
  // Split FAQ items into two columns
  const leftColumn = faqItems.filter((_, index) => index % 2 === 0);
  const rightColumn = faqItems.filter((_, index) => index % 2 === 1);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
              Perguntas Frequentes
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Esclareça suas dúvidas{" "}
              <span className="text-gradient">de forma rápida.</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              Aqui estão as principais perguntas feitas por nossos clientes antes de iniciar um projeto.
              Clique para expandir e ver as respostas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Grid Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {leftColumn.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`left-${index}`}
                    className="card-glass rounded-xl border-border/50 px-6 data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-5 text-foreground font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {rightColumn.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`right-${index}`}
                    className="card-glass rounded-xl border-border/50 px-6 data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-5 text-foreground font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
            className="text-center max-w-2xl mx-auto relative"
          >
            {/* Decorative circle */}
            <div className="absolute -top-10 -right-20 w-40 h-40 border-2 border-primary/20 rounded-full hidden md:block" />

            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient">
              Ainda tem dúvidas?
            </h2>

            <p className="text-muted-foreground mb-6">
              Se algo não ficou claro ou você precisa de ajuda, envie-nos um e-mail.
              Responderemos rapidamente.
            </p>

            <a
              href="mailto:contato@lunding.com.br"
              className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              contato@lunding.com.br
            </a>

            <p className="text-sm text-muted-foreground mt-4">
              Agilize o atendimento enviando seu <strong className="text-foreground">nome e sua dúvida</strong>.
            </p>
            <p className="text-sm text-muted-foreground">
              Prazo de resposta: até 24hrs.
            </p>

            <div className="mt-8">
              <Button asChild variant="hero" size="lg">
                <Link to="/#contato">Fale Comigo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;
