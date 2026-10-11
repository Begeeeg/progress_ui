import CTASection from "@/pages/Landing/CTASection";
import Developer from "@/pages/Landing/Developer";
import Features from "@/pages/Landing/Features";
import Footer from "@/pages/Landing/Footer";
import Hero from "@/pages/Landing/Hero";
import HowItWorks from "@/pages/Landing/HowItWorks";
import Navbar from "@/shared/components/layout/Navbar";

export default function page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Developer />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
