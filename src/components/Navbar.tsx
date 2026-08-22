import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Sobre Nós", href: "#quem-somos" },
  { name: "Diferenciais", href: "#diferenciais" },
  { name: "Processo", href: "#processo" },
  { name: "Portfólio", href: "#portfolio" },
  { name: "Depoimentos", href: "#depoimentos" },
  { name: "FAQ", href: "#faq" },
  { name: "Contato", href: "#contato" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const isManualScroll = useRef(false);
  const manualScrollTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible.length > 0) {
          const id = `#${visible[0].target.id}`;
          const match = navLinks.find((link) => link.href === id);
          if (match) setActiveLink(match.name);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (name: string) => {
    setActiveLink(name);
    isManualScroll.current = true;

    if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);
    manualScrollTimeout.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img className="w-44 h-auto" src="/assets/img/logo.png" alt="" />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5 rounded-full border border-blue-500/20 bg-blue-950/40 backdrop-blur-xl px-1.5 py-1.5">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  onClick={() => handleNavClick(link.name)}
                  className={`relative rounded-full px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-300 ${
                    activeLink === link.name
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeLink === link.name && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-blue-500/20 border border-blue-400/30"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </motion.a>
              ))}
            </div>

            {/* Botão de contato */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:block"
            >
              <Button variant="hero" size="lg" className="rounded-full" asChild>
                <a href="https://wa.link/ve0vb2" target="_blank" rel="noopener noreferrer">
                  Falar Conosco
                </a>
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden relative z-10 p-2 text-foreground"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden overflow-y-auto"
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              aria-label="Fechar menu"
              className="absolute top-6 right-6 p-2 text-foreground z-10"
            >
              <X size={24} />
            </button>

            <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
              <div className="flex flex-col items-stretch w-full max-w-xs gap-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      handleNavClick(link.name);
                      setIsMobileOpen(false);
                    }}
                    className={`relative rounded-xl px-4 py-3.5 text-center text-lg font-display font-semibold transition-colors duration-300 ${
                      activeLink === link.name
                        ? "text-foreground bg-blue-500/10 border border-blue-500/25"
                        : "text-muted-foreground border border-transparent hover:text-foreground hover:bg-white/[0.03]"
                    }`}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.05 }}
                className="w-full max-w-xs mt-6"
              >
                <Button variant="hero" size="xl" className="rounded-full w-full" asChild>
                  
                  <a

                    href="https://wa.link/ve0vb2"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileOpen (false)}

                  >
                    Falar Conosco
                  </a>
                </Button>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};