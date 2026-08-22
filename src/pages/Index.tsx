import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { QuemSomos } from "@/components/QuemSomos"
import { Servicos } from "@/components/Servicos";
import { Diferenciais } from "@/components/Diferenciais";
import { Portfolio } from "@/components/Portfolio";
import { Depoimentos } from "@/components/Depoimentos"
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { SectionsGlow } from "@/components/SectionsGrid";
import { Processo } from "@/components/Processo";
import { FAQ } from "@/components/FAQ";
import { ThreeSectionsBackground } from "@/components/ui/ThreeSectionsBackground";

const Index = () => {
  return (
    <>
      <SmoothScroll />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />

        <div className="relative">
          <SectionsGlow fadeBottom />
          <QuemSomos />
        </div>

        <Diferenciais />

        <div className="relative">
          <SectionsGlow fadeTop />
          <Processo />
          <Portfolio />
        </div>

        <div className="relative">
          <SectionsGlow fadeTop />
          <Depoimentos />
          <FAQ />
          <Contact />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Index;