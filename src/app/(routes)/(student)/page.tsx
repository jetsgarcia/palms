import Header from "./_components/header";
import HeroSection from "./_components/hero-section";
import FeaturesSection from "./_components/feature-section";
import HowItWorksSection from "./_components/how-it-works-section";
import ContactSection from "./_components/contact-section";
import Footer from "./_components/footer";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user)
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

  return <div></div>;
}
