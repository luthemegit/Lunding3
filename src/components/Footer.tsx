import { motion } from "framer-motion";
import { Instagram, Heart } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Portfólio", href: "#portfolio" },
  { name: "Serviços", href: "#servicos" },
  { name: "Contato", href: "#contato" },
];

export const Footer = () => {
  return (
    <footer className="py-12 relative overflow-hidden border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-display font-bold text-gradient"
          >
            Lunding
          </motion.a>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social */}
          <motion.a
            href="https://instagram.com/lunding.design"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Lunding. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1">
              Feito com <Heart className="w-4 h-4 text-destructive fill-destructive" /> por Lunding
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
