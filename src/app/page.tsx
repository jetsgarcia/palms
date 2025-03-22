import Header from "./_components/header";
import HeroSection from "./_components/hero-section";
import FeaturesSection from "./_components/feature-section";
import HowItWorksSection from "./_components/how-it-works-section";
import ContactSection from "./_components/contact-section";
import Footer from "./_components/footer";

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
