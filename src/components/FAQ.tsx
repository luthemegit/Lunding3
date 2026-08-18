import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Quanto tempo leva para criar um site?",
    answer:
      "O prazo varia de acordo com a complexidade do projeto. Landing pages simples podem ser entregues em 5-7 dias, enquanto sites mais complexos podem levar de 2 a 4 semanas. Sempre informo prazos precisos após análise do escopo.",
  },
  {
    question: "Qual o investimento para criar um site?",
    answer:
      "Cada projeto é único e orçado individualmente. O valor depende das funcionalidades, número de páginas e complexidade do design. Entre em contato para um orçamento personalizado sem compromisso.",
  },
  {
    question: "Você oferece manutenção após a entrega?",
    answer:
      "Sim! Ofereço pacotes de manutenção mensal que incluem atualizações de segurança, backup, pequenas alterações de conteúdo e suporte técnico. Seu site estará sempre seguro e atualizado.",
  },
  {
    question: "O site será responsivo (funciona no celular)?",
    answer:
      "Absolutamente! Todos os meus projetos são desenvolvidos com abordagem mobile-first, garantindo experiência perfeita em smartphones, tablets e desktops de qualquer tamanho.",
  },
  {
    question: "Como funciona o processo de criação?",
    answer:
      "O processo segue 5 etapas: Briefing → Pesquisa e Estratégia → Design → Desenvolvimento → Entrega e Suporte. Você participa ativamente de cada fase com feedbacks e aprovações.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Você tem alguma{" "}
            <span className="text-gradient">dúvida?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quero que você se sinta seguro(a) para seguir adiante. 
            Encontre respostas rápidas sobre a metodologia Lunding.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`card-glass rounded-xl overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "border-primary/50" : ""
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-display font-semibold text-lg pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-primary" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
