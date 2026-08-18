import { motion } from "framer-motion";
import { Mail, Phone, Instagram, ArrowRight, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contato@lunding.com.br",
    href: "mailto:contato@lunding.com.br",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+55 54 99640-9552",
    href: "https://wa.me/5554996409552",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@lunding.design",
    href: "https://instagram.com/lunding.design",
  },
];

export const Contact = () => {
  return (
    <section id="contato" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-background to-background" />
      
      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -right-40 -top-40 w-80 h-80 border border-primary/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -left-20 -bottom-20 w-60 h-60 border border-accent/10 rounded-full"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - CTA */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Vamos criar algo{" "}
                <span className="text-gradient">incrível</span>{" "}
                juntos?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Estou pronto para transformar sua visão em realidade digital.
                Entre em contato e vamos começar a construir o futuro do seu negócio.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                  Fale Comigo Agora
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>

              {/* Schedule Info */}
              <div className="mt-10 flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm">Seg–Sex: 9h às 21h</p>
                    <p className="text-sm">Sáb: 9h às 13h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <p className="text-sm">Rio Grande do Sul, Brasil</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="block card-glass p-6 rounded-xl group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:shadow-[0_0_30px_hsl(217_91%_60%_/_0.4)] transition-shadow">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                    <ArrowRight className="ml-auto w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.a>
              ))}

              {/* Extra CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="card-glass p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30"
              >
                <p className="text-center text-sm text-muted-foreground mb-2">
                  🚀 Agenda para Janeiro já está aberta!
                </p>
                <p className="text-center font-display font-semibold text-primary">
                  Garanta sua vaga agora
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
