"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n/use-translation";

const steps = [
  {
    id: "step-whatsapp",
    number: "01",
    image: "/images/whatsapp_flow_mockup.png",
    alt: "Customer ordering via WhatsApp — GEQO chat interface on a smartphone",
    imagePosition: "right" as const,
  },
  {
    id: "step-kitchen",
    number: "02",
    image: "/images/Kitchen_Dash_Mockup.png",
    alt: "Kitchen Display System showing live orders sorted by status",
    imagePosition: "left" as const,
  },
  {
    id: "step-delivery",
    number: "03",
    image: "/images/Delivery_Mockup.png",
    alt: "Delivery management dashboard with live map and driver dispatch",
    imagePosition: "right" as const,
  },
];

export default function HowItWorks() {
  const { t } = useTranslation();

  const stepTitles = [
    t("step_1_title"),
    t("step_2_title"),
    t("step_3_title"),
  ];
  const stepDescs = [
    t("step_1_desc"),
    t("step_2_desc"),
    t("step_3_desc"),
  ];

  return (
    <section className="relative overflow-hidden py-20 md:py-28 text-gray-100">

      {/* ── Fixed parallax background ── */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/images/how-it-works-bg.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 -z-10 bg-slate-950/80 backdrop-blur-[2px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="mb-3 inline-block rounded-full border border-emerald-700/50 bg-emerald-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            The Flow
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {t("how_it_works")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-400">
            From first message to delivered order — fully automated, zero manual work.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-20 md:space-y-28">
          {steps.map((step, idx) => {
            const isLeft = step.imagePosition === "left";
            return (
              <div
                key={step.id}
                id={step.id}
                className={`flex flex-col items-center gap-8 md:gap-16 md:flex-row ${isLeft ? "md:flex-row-reverse" : ""}`}
                data-aos={isLeft ? "fade-right" : "fade-left"}
                data-aos-duration="700"
              >
                {/* Copy side */}
                <div className="flex-1 space-y-4">
                  {/* Step number badge */}
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-sm font-extrabold text-slate-900 shadow-lg shadow-emerald-500/30">
                    {step.number}
                  </div>

                  <h3 className="text-2xl font-bold leading-snug text-white md:text-3xl">
                    {stepTitles[idx]}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-400">
                    {stepDescs[idx]}
                  </p>

                  {/* Decorative accent line */}
                  <div className="h-px w-16 bg-gradient-to-r from-emerald-500 to-transparent" />
                </div>

                {/* Image side */}
                <div className="flex-1 w-full">
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/40 shadow-2xl shadow-slate-950/60 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/30 hover:shadow-emerald-900/30"
                  >
                    {/* Glow on hover */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-emerald-500/5 to-transparent" />

                    <Image
                      src={step.image}
                      alt={step.alt}
                      width={700}
                      height={420}
                      className="h-auto w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
