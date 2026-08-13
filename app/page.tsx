import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import FinancialCalculator from "@/components/FinancialCalculator";
import PricingMatrix from "@/components/PricingMatrix";
import ClaimDemoForm from "@/components/ClaimDemoForm";
import Footer from "@/components/Footer";

export const dynamic = 'force-static';

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
      <ClaimDemoForm />
      <Footer />
    </div>
  );
}
