import Header from "@/components/homepage/header";
import HeroSection from "@/components/homepage/hero-section";
import FeaturesSection from "@/components/homepage/feature-section";

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}
