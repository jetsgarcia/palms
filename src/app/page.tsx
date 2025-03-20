import Header from "@/components/homepage/header";
import HeroSection from "@/components/homepage/hero-section";
import FeaturesSection from "@/components/homepage/feature-section";
import HowItWorksSection from "@/components/homepage/how-it-works-section";
import ContactSection from "@/components/homepage/contact-section";

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
    </div>
  );
}
