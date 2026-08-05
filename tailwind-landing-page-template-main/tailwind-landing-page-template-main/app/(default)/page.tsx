export const metadata = {
  title: "GEQO | 0% Commission WhatsApp Ordering",
  description: "Automate your entire ordering workflow directly inside WhatsApp. 0% Commission.",
};

import Hero from "@/components/Hero";
import MetricsGrid from "@/components/MetricsGrid";
import RoiCalculator from "@/components/RoiCalculator";
import FeatureMatrix from "@/components/FeatureMatrix";
import BetaClaimFooter from "@/components/BetaClaimFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsGrid />
      <RoiCalculator />
      <FeatureMatrix />
      <BetaClaimFooter />
    </>
  );
}
