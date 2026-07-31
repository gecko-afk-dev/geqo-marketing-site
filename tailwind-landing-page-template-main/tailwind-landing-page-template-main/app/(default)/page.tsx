export const metadata = {
  title: "GEQO | 0% Commission WhatsApp Ordering for Moroccan Restaurants",
  description:
    "Eliminate delivery aggregator commissions with a flat 399 MAD/month. Automate your entire ordering workflow directly inside WhatsApp — no app required. Live in Casablanca, Rabat & Settat.",
};

import HeroHome from "@/components/hero-home";
import RoiCalculator from "@/components/roi-calculator";
import BentoFeatures from "@/components/bento-features";
import HowItWorks from "@/components/how-it-works";
import SignupForm from "@/components/signup-form";

export default function Home() {
  return (
    <>
      <HeroHome />
      <BentoFeatures />
      <RoiCalculator />
      <HowItWorks />
      <SignupForm />
    </>
  );
}
