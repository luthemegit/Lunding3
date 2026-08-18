import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Diferenciais } from "@/components/Diferenciais";
import { Portfolio } from "@/components/Portfolio";
import { Servicos } from "@/components/Servicos";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const Index = () => {
  return (
    <>
      <SmoothScroll />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <Servicos />
        <Diferenciais />
        <Portfolio />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
