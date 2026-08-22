import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle, ArrowUp, ArrowRight } from "lucide-react";

const socials = [
  { icon: Instagram, href: "https://instagram.com/lunding.design", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.link/ve0vb2", label: "WhatsApp" },
  { icon: Mail, href: "mailto:contato@lunding.com.br", label: "E-mail" },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#020212]">
      {/* =========================================
          BACKGROUND — mesma linguagem visual do Contact
      ========================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute top-0 left-1/2 h-32 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.14] blur-[90px]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(135deg,rgba(148,163,184,0.18)_0px,rgba(148,163,184,0.18)_1px,transparent_1px,transparent_4px)]" />
        <div className="absolute left-1/2 bottom-[-220px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/[0.05] blur-[110px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 pt-20 pb-8">
        {/* =========================================
            BLOCO PRINCIPAL — marca à esquerda, contato à direita
        ========================================== */}
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 border-b border-white/[0.06] pb-14 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* Logo + descrição + redes */}
          <div className="flex max-w-sm flex-col items-center md:items-start">
            <motion.a
              href="#home"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="w-40"
            >
              <img src="/assets/img/logo.png" alt="Lunding" className="h-auto w-full" />
            </motion.a>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Criamos sites e experiências digitais que unem design, performance e
              estratégia — pensados para representar sua marca e fazer seu negócio
              crescer.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-muted-foreground transition-colors duration-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contato + CTA */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
              Vamos conversar
            </h4>

            <div className="mt-5 flex flex-col items-center gap-2.5 text-sm text-muted-foreground md:items-end">
              <a
                href="mailto:contato@lunding.com.br"
                className="transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
              >
                contato@lunding.com.br
              </a>
              <a
                href="https://wa.link/ve0vb2"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
              >
                Falar no WhatsApp
              </a>
              <a
                href="www.instagram.com/lunding_dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
              >
                Instagram
              </a>
            </div>

            <motion.a
              href="https://wa.link/ve0vb2"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="group mt-6 inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 px-6 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(37,99,235,0.4)]"
            >
              Iniciar um projeto
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </div>

        {/* =========================================
            BOTTOM BAR
        ========================================== */}
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-5 pt-8 text-center text-xs text-muted-foreground md:flex-row md:text-left">
          <p className="order-1">© {new Date().getFullYear()} Lunding. Todos os direitos reservados.</p>

          <p className="order-3 md:order-2">
            Site desenvolvido por{" "}
            <span className="text-foreground/70">Lunding</span> — Sites &amp; Soluções
            Digitais
          </p>

          <div className="order-2 flex items-center gap-6 md:order-3">
            <a href="#" className="transition-colors duration-300 hover:text-foreground">
              Política de Privacidade
            </a>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Voltar ao topo"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-muted-foreground transition-colors duration-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-foreground"
            >
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={2} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;