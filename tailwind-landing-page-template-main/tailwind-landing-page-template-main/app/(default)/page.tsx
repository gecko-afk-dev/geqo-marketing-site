export const metadata = {
  title: "GEQO | Home",
  description: "0% Commission WhatsApp Ordering System",
};

import Hero from "@/components/hero-home";
import PainRelief from "@/components/pain-relief";
import HowItWorks from "@/components/how-it-works";
import SignupForm from "@/components/signup-form";

export default function Home() {
  return (
    <>
      <Hero />
      <PainRelief />
      <HowItWorks />
      <SignupForm />
    </>
  );
}
