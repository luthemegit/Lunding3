import AccordionGallery from "./ui/AccordionGallery";
import PortfolioBg from "./ui/PortfolioBg";
import Pousada from "/assets/img/pousadabv.png"
import AllFrames from "/assets/img/allframes.png"
import PortfolioHenrique from "/assets/img/portfoliohenrique.png"
import Jujuba from "/assets/img/jujuba.png"

const items = [
  {
    image: Pousada,
    label: "Pousada Bella Vista",
    link: "www.pousadabellavista.com.br",
  },
  {
    image: AllFrames,
    label: "All Frames Technology",
    link: "www.allframestechnology.com.br",
  },
  {
    image: PortfolioHenrique,
    label: "Portfólio Pessoal",
    link: "",
  },
  {
    image: Jujuba,
    label: "Jujuba Lanches",
    link: "",
  },
];

export const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="
        relative
        isolate
        overflow-hidden
        section-espaco
      "
    >

      {/* TRANSIÇÃO DA SEÇÃO ANTERIOR → PORTFOLIO */}
  <div
    className="
      absolute
      top-0
      left-0
      right-0
      h-48
      z-20
      pointer-events-none
      bg-gradient-to-b
      from-[#02030a]
      via-[#02030a]/70
      to-transparent
    "
  />

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 z-0 pointer-events-none">
        <PortfolioBg />
      </div>

      {/* =====================================================
          CONTEÚDO
      ====================================================== */}

      <div className="relative z-10 container mx-auto px-6">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="text-center max-w-3xl mx-auto mb-16">

          <span
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-1.5
              rounded-full
              border
              border-primary/25
              bg-primary/[0.08]
              text-accent
              text-xs
              font-medium
              mb-6
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Portfólio
          </span>

          <h2
            className="
              text-3xl
              md:text-5xl
              font-display
              font-bold
              text-foreground
              tracking-tight
              mb-5
            "
          >
            Projetos que transformam

            <span className="block text-gradient">
              ideias em experiências.
            </span>
          </h2>

          <p
            className="
              text-muted-foreground
              max-w-xl
              mx-auto
              text-base
              leading-relaxed
            "
          >
            Conheça alguns dos projetos que desenvolvemos para transformar
            ideias em experiências digitais bonitas, funcionais e
            estratégicas.
          </p>

        </div>

        {/* =====================================================
            GALERIA
        ====================================================== */}

        <div className="w-full max-w-6xl mx-auto">
          <AccordionGallery
            items={items}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#ffffff"
            overlayColor="#060010"
            textColor="#ffffff"
            grayscale
            showLabels
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={8}
            stagger={0.06}
            height={460}
            gap={10}
            radius={16}
            orientation="horizontal"
          />
        </div>

      </div>
    </section>
  );
};

export default Portfolio;