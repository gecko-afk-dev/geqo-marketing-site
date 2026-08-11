import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import FinancialCalculator from "@/components/FinancialCalculator";
import PricingMatrix from "@/components/PricingMatrix";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-obsidian text-offwhite flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeatureGrid />
        <FinancialCalculator />
        <PricingMatrix />
      </main>
      <Footer />
    </div>
  );
}
