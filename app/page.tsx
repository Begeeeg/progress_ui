import CTASection from "@/features/landing/components/CTASection";
import Developer from "@/features/landing/components/Purpose";
import Features from "@/features/landing/components/Features";
import Footer from "@/features/landing/components/Footer";
import Hero from "@/features/landing/components/Hero";
import HowItWorks from "@/features/landing/components/HowItWorks";
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

//test
