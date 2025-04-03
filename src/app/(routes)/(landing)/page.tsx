import ContactSection from "./_components/contact-section";
import FeaturesSection from "./_components/feature-section";
import Footer from "./_components/footer";
import Header from "./_components/header";
import HeroSection from "./_components/hero-section";
import HowItWorksSection from "./_components/how-it-works-section";

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
