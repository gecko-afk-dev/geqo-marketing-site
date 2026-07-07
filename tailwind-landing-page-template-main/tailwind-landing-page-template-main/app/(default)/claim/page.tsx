import Hero from "@/components/hero-home";
import PainRelief from "@/components/pain-relief";
import HowItWorks from "@/components/how-it-works";
import SignupForm from "@/components/signup-form";

export const metadata = {
  title: "GEQO | Claim Invite",
  description: "Claim your priority beta activation code for GEQO.",
};

export default function ClaimPage() {
  return (
    <>
      <Hero />
      <PainRelief />
      <HowItWorks />
      <SignupForm />
    </>
  );
}
