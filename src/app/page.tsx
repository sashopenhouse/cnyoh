import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Portfolio from "@/components/Portfolio";
import HowItWorks from "@/components/HowItWorks";
import Watch from "@/components/Watch";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Features />
      <Portfolio />
      <HowItWorks />
      <Watch />
      <Newsletter />
      <Footer />
    </main>
  );
}
