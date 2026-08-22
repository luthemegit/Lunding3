import { useState } from "react";
import { motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { SpotlightHeader } from "@/components/ui/SpotlightHeader";
import LazyAuroraBackground from "./ui/Lazyaurorabackground";

const confrontos = [
  {
    antes: "Aparência amadora que afasta o cliente.",
    depois: "Primeira impressão que gera confiança na hora.",
  },
  {
    antes: "Suporte que some depois da entrega.",
    depois: "Acompanhamento próximo antes, durante e depois.",
  },
  {
    antes: "Um site igual a tantos outros do mercado.",
    depois: "Uma presença digital que SÓ a sua marca tem.",
  },
  {
    antes: "Cada atualização vira um problema técnico.",
    depois: "Estrutura pensada para crescer junto com você.",
  },
];

// Card simples usado só no mobile (sem o par lado a lado)
const ConfrontoCardMobile = ({
  text,
  variant,
  index,
}: {
  text: string;
  variant: "antes" | "depois";
  index: number;
}) => {
  const isDepois = variant === "depois";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={
        isDepois
          ? "relative flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/[0.06] px-5 py-4 overflow-hidden"
          : "flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/20 px-5 py-4"
      }
    >
      {isDepois ? (
        <Sparkles className="w-4 h-4 text-primary shrink-0 relative z-10" strokeWidth={2} />
      ) : (
        <X className="w-4 h-4 text-muted-foreground/50 shrink-0" strokeWidth={2} />
      )}
      <span
        className={
          isDepois
            ? "text-sm font-medium text-foreground leading-snug relative z-10"
            : "text-sm text-muted-foreground leading-snug"
        }
      >
        {text}
      </span>
    </motion.div>
  );
};

// Par lado a lado, usado só a partir do sm
const ConfrontoRow = ({
  item,
  index,
}: {
  item: (typeof confrontos)[number];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative grid grid-cols-[1fr_auto_1fr] items-stretch"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -32 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className="flex items-center gap-3 rounded-l-xl border border-border/50 bg-secondary/20 px-5 py-5"
      >
        <X className="w-4 h-4 text-muted-foreground/50 shrink-0" strokeWidth={2} />
        <span className="text-sm text-muted-foreground leading-snug">
          {item.antes}
        </span>
      </motion.div>

      <div className="relative flex items-stretch justify-center w-10">
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px transition-all duration-500"
          style={{
            background: isHovered
              ? "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.7) 20%, hsl(var(--primary) / 0.7) 80%, transparent)"
              : "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.25) 20%, hsl(var(--primary) / 0.25) 80%, transparent)",
          }}
        />
        <motion.span
          animate={{
            scale: isHovered ? 1.4 : 1,
            boxShadow: isHovered
              ? "0 0 16px 4px hsl(var(--primary) / 0.7)"
              : "0 0 6px 1px hsl(var(--primary) / 0.4)",
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
        />
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, x: 32 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className="relative flex items-center gap-3 rounded-r-xl border border-primary/25 bg-primary/[0.06] px-5 py-5 overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background:
              "radial-gradient(120% 100% at 0% 50%, hsl(var(--primary) / 0.1), transparent 70%)",
          }}
        />
        <Sparkles className="w-4 h-4 text-primary shrink-0 relative z-10" strokeWidth={2} />
        <span className="text-sm font-medium text-foreground leading-snug relative z-10">
          {item.depois}
        </span>
      </motion.div>
    </motion.div>
  );
};

export const Diferenciais = () => {
  return (
    <section id="diferenciais" className="relative isolate overflow-hidden section-espaco">
      
      {/* Background */}
      <LazyAuroraBackground
        className="absolute inset-0"
        colorStops={["#0a0a2a", "#3b5bdb", "#1864ab"]}
        amplitude={0.8}
        blend={0.45}
      />

      <div className="container mx-auto px-6 relative z-10">
        <SpotlightHeader
          eyebrow="Diferenciais"
          variant="twin"
          title={
            <>
              Nem todo palco é construído <br></br>{" "}
              <span className="text-gradient">da mesma forma.</span>
            </>
          }
          subtitle="Não é sobre ter um site. É sobre ter o site certo, aquele que representa sua marca e trabalha a favor do seu crescimento."
        />

        <div className="max-w-3xl mx-auto">
          {/* ===== MOBILE: dois blocos separados (todos "sem", depois todos "com") ===== */}
          <div className="sm:hidden">
            <div className="mb-2 px-1 flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
              <X className="w-3 h-3" strokeWidth={2.5} />
              Sem a Lunding (Outras Opções)
            </div>
            <div className="space-y-3">
              {confrontos.map((item, index) => (
                <ConfrontoCardMobile
                  key={`antes-${index}`}
                  text={item.antes}
                  variant="antes"
                  index={index}
                />
              ))}
            </div>

            <div className="mt-6 mb-2 px-1 flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-primary uppercase">
              <Sparkles className="w-3 h-3" strokeWidth={2.5} />
              Com a Lunding
            </div>
            <div className="space-y-3">
              {confrontos.map((item, index) => (
                <ConfrontoCardMobile
                  key={`depois-${index}`}
                  text={item.depois}
                  variant="depois"
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* ===== DESKTOP/TABLET: pares lado a lado, como antes ===== */}
          <div className="hidden sm:block">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-[1fr_auto_1fr] items-center mb-4 px-1"
            >
              <span className="text-xs font-medium tracking-wide text-muted-foreground/70 uppercase">
                Sem a Lunding (Outras Opções)
              </span>
              <span className="w-10" />
              <span className="text-xs font-medium tracking-wide text-primary uppercase text-right">
                Com a Lunding
              </span>
            </motion.div>

            <div className="space-y-3">
              {confrontos.map((item, index) => (
                <ConfrontoRow key={item.depois} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Diferenciais;