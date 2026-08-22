import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, CircleHelp } from "lucide-react";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Quais serviços a Lunding oferece?",
    answer:
      "Criamos sites institucionais, landing pages, portfólios e experiências digitais personalizadas, sempre com foco em design, performance e conversão.",
  },
  {
    id: 2,
    question: "Vocês também fazem hospedagem?",
    answer:
      "Sim. Nós cuidamos da hospedagem do seu site, e o valor da hospedagem já está incluso no investimento do projeto. Assim, você não precisa se preocupar com configurações ou contratar um serviço separado.",
  },
  {
    id: 3,
    question: "Quanto tempo leva para criar um projeto?",
    answer:
      "O prazo depende da complexidade do projeto. Em geral, projetos completos são desenvolvidos em algumas semanas, sempre com um cronograma definido no início.",
  },
  {
    id: 4,
    question: "Como funcionam as alterações durante o projeto?",
    answer:
      "Durante o desenvolvimento mantemos uma comunicação próxima para que ajustes possam ser feitos conforme o projeto evolui, sem comprometer o resultado final.",
  },
  {
    id: 5,
    question: "Vocês oferecem suporte após o lançamento?",
    answer:
      "Sim. Podemos continuar acompanhando o projeto após a publicação para realizar ajustes, melhorias e suporte conforme a necessidade do seu negócio.",
  },
  {
    id: 6,
    question: "Vocês ajudam com o conteúdo do site?",
    answer:
      "Sim. Podemos auxiliar na estruturação e organização dos textos, chamadas e informações necessárias para que o site comunique sua proposta com clareza.",
  },
  {
    id: 7,
    question: "Posso ver exemplos de trabalhos anteriores?",
    answer:
      "Claro. Podemos apresentar projetos anteriores para você conhecer melhor nosso padrão visual, qualidade de execução e diferentes soluções desenvolvidas.",
  },
  {
    id: 8,
    question: "SEO está incluído nos projetos?",
    answer:
      "Os projetos são desenvolvidos com uma estrutura técnica preparada para SEO, incluindo boas práticas de performance, semântica e organização do conteúdo.",
  },
  {
    id: 9,
    question: "Como funciona o orçamento?",
    answer:
      "O valor final depende do que o seu projeto pede. Conversamos primeiro, entendemos o contexto, e só depois montamos a proposta.",
  },
  {
    id: 10,
    question: "O que diferencia a Lunding de outras agências?",
    answer:
      "Nosso foco está em criar experiências digitais personalizadas, com atenção aos detalhes, performance e uma identidade visual que realmente represente cada negócio.",
  },
];

/* =========================================================
   FAQ CARD
========================================================= */

const FAQCard = memo(
  ({
    item,
    isOpen,
    onToggle,
  }: {
    item: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
  }) => {
    return (
      <div className="relative w-full">
        {/* CARD */}

        <motion.button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className={`
            group relative w-full
            min-h-[54px]
            flex items-center justify-between
            gap-5
            rounded-xl
            border
            px-5
            py-3
            text-left
            overflow-hidden
            transition-all duration-300
            ${
              isOpen
                ? "border-primary/45 bg-primary/[0.035]"
                : "border-primary/20 bg-[#020617]/70 hover:border-primary/35 hover:bg-primary/[0.025]"
            }
          `}
          whileHover={{
            y: -1,
          }}
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Glow interno no hover */}

          <div
            className={`
              pointer-events-none
              absolute inset-0
              transition-opacity duration-300
              ${
                isOpen
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }
            `}
            style={{
              background:
                "radial-gradient(350px circle at 0% 50%, hsl(var(--primary) / 0.07), transparent 70%)",
            }}
          />

          {/* Pergunta */}

          <span
            className="
              relative z-10
              text-[13px] md:text-sm
              font-medium
              leading-tight
              text-foreground/90
            "
          >
            {item.question}
          </span>

          {/* Ícone */}

          <span
            className={`
              relative z-10
              flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-full
              border
              transition-all duration-300
              ${
                isOpen
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-primary/15 bg-primary/[0.06] text-muted-foreground group-hover:border-primary/30 group-hover:text-primary"
              }
            `}
          >
            {isOpen ? (
              <Minus
                className="h-4 w-4"
                strokeWidth={1.7}
              />
            ) : (
              <Plus
                className="h-4 w-4"
                strokeWidth={1.7}
              />
            )}
          </span>
        </motion.button>

        {/* =====================================================
            RESPOSTA OTIMIZADA

            Antes:
            AnimatePresence + height: auto

            Agora:
            grid-template-rows

            Isso evita que o Framer Motion fique medindo
            continuamente a altura do conteúdo.
        ===================================================== */}

        <div
          className={`
            grid
            transition-[grid-template-rows]
            duration-[280ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              isOpen
                ? "grid-rows-[1fr]"
                : "grid-rows-[0fr]"
            }
          `}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={`
                px-5
                pt-3
                pb-2
                transition-opacity
                duration-200
                ${
                  isOpen
                    ? "opacity-100"
                    : "opacity-0"
                }
              `}
            >
              <p
                className="
                  max-w-[95%]
                  text-[13px] md:text-sm
                  leading-relaxed
                  text-muted-foreground
                "
              >
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FAQCard.displayName = "FAQCard";

/* =========================================================
   COLUNA DE FAQ
========================================================= */

const FAQColumn = memo(
  ({
    items,
    openId,
    setOpenId,
    startIndex,
  }: {
    items: FAQItem[];
    openId: number | null;
    setOpenId: (id: number | null) => void;
    startIndex: number;
  }) => {
    /*
     * Callback estável para evitar criar uma nova função
     * desnecessariamente durante cada render.
     */

    const handleToggle = useCallback(
      (id: number) => {
        setOpenId(openId === id ? null : id);
      },
      [openId, setOpenId]
    );

    return (
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-40px",
            }}
            transition={{
              duration: 0.45,
              delay: Math.min(
                (startIndex + index) * 0.04,
                0.25
              ),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <FAQCard
              item={item}
              isOpen={openId === item.id}
              onToggle={() =>
                handleToggle(item.id)
              }
            />
          </motion.div>
        ))}
      </div>
    );
  }
);

FAQColumn.displayName = "FAQColumn";

/* =========================================================
   FAQ
========================================================= */

export const FAQ = () => {
  const [openId, setOpenId] =
    useState<number | null>(null);

  /*
   * Desktop:
   * duas colunas independentes.
   *
   * Mobile:
   * uma única coluna.
   *
   * Não usamos grid para evitar que uma coluna
   * compartilhe a altura das linhas com a outra.
   */

  const leftColumn = [
    faqs[0],
    faqs[2],
    faqs[4],
    faqs[6],
    faqs[8],
  ];

  const rightColumn = [
    faqs[1],
    faqs[3],
    faqs[5],
    faqs[7],
    faqs[9],
  ];

  return (
    <section
      id="faq"
      className="
        section-espaco
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      

      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div
        className="
          relative z-10
          container mx-auto
          px-4
          sm:px-6
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mx-auto
            mb-12
            max-w-2xl
            text-center
            md:mb-14
          "
        >
          {/* Eyebrow */}

          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/20
              bg-primary/[0.035]
              px-4
              py-2
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-primary
                shadow-[0_0_10px_hsl(var(--primary))]
              "
            />

            <span
              className="
                text-[11px]
                font-medium
                tracking-wide
                text-primary
              "
            >
              FAQ's
            </span>
          </div>

          {/* Título */}

          <h2
            className="
              font-display
              text-3xl
              font-bold
              tracking-tight
              text-foreground
              sm:text-4xl
              md:text-[40px]
            "
          >
            Perguntas Frequentes
          </h2>

          {/* Subtítulo */}

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-relaxed
              text-muted-foreground
              md:text-[15px]
            "
          >
            Respostas para dúvidas comuns sobre nossos serviços e processos de trabalho.
          </p>
        </motion.div>

        {/* =================================================
            FAQ
        ================================================= */}

        <div
          className="
            mx-auto
            flex
            max-w-[950px]
            flex-col
            gap-3

            md:flex-row
            md:items-start
            md:gap-4
          "
        >
          {/* COLUNA ESQUERDA */}

          <div className="w-full md:w-1/2">
            <FAQColumn
              items={leftColumn}
              openId={openId}
              setOpenId={setOpenId}
              startIndex={0}
            />
          </div>

          {/* COLUNA DIREITA */}

          <div className="w-full md:w-1/2">
            <FAQColumn
              items={rightColumn}
              openId={openId}
              setOpenId={setOpenId}
              startIndex={1}
            />
          </div>
        </div>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.25,
          }}
          className="
            mt-8
            flex
            justify-center
            md:mt-9
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/20
              bg-[#05091d]
              p-1.5
              pl-2
              shadow-[0_0_30px_hsl(var(--primary)/0.08)]
            "
          >
            {/* Texto */}

            <div
              className="
                flex
                items-center
                gap-2
                px-2.5
              "
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-primary/20
                  bg-primary/[0.06]
                "
              >
                <CircleHelp
                  className="
                    h-3.5
                    w-3.5
                    text-primary
                  "
                  strokeWidth={1.8}
                />
              </span>

              <span
                className="
                  text-xs
                  font-medium
                  text-foreground
                "
              >
                Ainda tem alguma dúvida?
              </span>
            </div>

            {/* Botão */}

            <motion.a
              href="https://wa.link/ve0vb2"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                rounded-full
                bg-gradient-to-b
                from-blue-500
                to-blue-600
                px-5
                py-2.5
                text-xs
                font-semibold
                text-white
                shadow-[0_0_20px_hsl(var(--primary)/0.35)]
                transition-shadow
                hover:shadow-[0_0_26px_hsl(var(--primary)/0.45)]
              "
            >
              Fale comigo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;