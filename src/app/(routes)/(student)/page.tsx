import Header from "./_components/landingPage/header";
import HeroSection from "./_components/landingPage/hero-section";
import FeaturesSection from "./_components/landingPage/feature-section";
import HowItWorksSection from "./_components/landingPage/how-it-works-section";
import ContactSection from "./_components/landingPage/contact-section";
import Footer from "./_components/landingPage/footer";
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
