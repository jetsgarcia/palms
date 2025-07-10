import ContactSection from "@/components/landing/contact-section";
import FeaturesSection from "@/components/landing/feature-section";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
