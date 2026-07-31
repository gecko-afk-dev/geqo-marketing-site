"use client";

import { useTranslation } from "@/lib/i18n/use-translation";

// ─── WhatsApp Chat Mockup ────────────────────────────────────────────────────
function WhatsAppPanel() {
  return (
    <div className="relative w-full max-w-[220px] rounded-[2rem] border border-slate-600/60 bg-[#111b21] p-2 shadow-2xl shadow-green-900/20">
      {/* Status bar */}
      <div className="mb-1 flex items-center gap-2 rounded-t-[1.5rem] bg-[#1f2c33] px-3 py-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-white">G</div>
        <div>
          <div className="text-[10px] font-semibold text-white">GEQO Order Bot</div>
          <div className="text-[9px] text-green-400">● Online</div>
        </div>
      </div>
      {/* Chat bubbles */}
      <div className="space-y-2 px-1 py-2">
        <div className="max-w-[80%] rounded-xl rounded-tl-none bg-[#1f2c33] px-3 py-1.5 text-[9px] text-white shadow-sm">
          🌯 Marhba! Comment puis-je vous aider?
        </div>
        <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-none bg-[#005c4b] px-3 py-1.5 text-[9px] text-white shadow-sm">
          Je veux commander 2 burgers 🍔
        </div>
        <div className="max-w-[80%] rounded-xl rounded-tl-none bg-[#1f2c33] px-3 py-1.5 text-[9px] text-white shadow-sm">
          ✅ Commande confirmée! Total: 140 MAD
        </div>
        <div className="ml-auto max-w-[75%] rounded-xl rounded-tr-none bg-[#005c4b] px-3 py-1.5 text-[9px] text-white shadow-sm">
          Parfait, merci! 🙏
        </div>
      </div>
      {/* Input bar */}
      <div className="mt-1 flex items-center gap-1 rounded-b-[1.5rem] bg-[#1f2c33] px-2 py-1.5">
        <div className="h-5 flex-1 rounded-full bg-[#2a3942] text-[8px] text-slate-500 leading-5 px-2">Message…</div>
        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
          <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </div>
      </div>
    </div>
  );
}

// ─── Kitchen Display Mockup ──────────────────────────────────────────────────
function KitchenPanel() {
  const tickets = [
    { id: "#1042", item: "2x Burger Royal", time: "2m", status: "bg-amber-500" },
    { id: "#1043", item: "1x Wrap Poulet", time: "5m", status: "bg-green-500" },
    { id: "#1044", item: "3x Pizza Marg.", time: "1m", status: "bg-red-500" },
  ];
  return (
    <div className="w-full max-w-[260px] rounded-2xl border border-slate-600/50 bg-slate-900 p-3 shadow-2xl shadow-indigo-900/20">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Kitchen Display</span>
        <span className="text-[9px] text-emerald-400">● Live</span>
      </div>
      <div className="space-y-2">
        {tickets.map((t) => (
          <div key={t.id} className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-2 border border-slate-700/50">
            <div>
              <div className="text-[10px] font-bold text-white">{t.id}</div>
              <div className="text-[9px] text-slate-400">{t.item}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-slate-400">{t.time} ago</span>
              <div className={`h-2 w-2 rounded-full ${t.status}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Scrolling Marquee ───────────────────────────────────────────────────────
function TrustMarquee() {
  const cities = [
    "🚀 Trusted by fast-growing independent restaurants in Casablanca",
    "📍 Rabat",
    "🍽️ Settat",
    "⚡ Marrakech",
    "🌟 Agadir",
    "🔥 Fès",
  ];
  const repeated = [...cities, ...cities];
  return (
    <div className="relative mt-16 overflow-hidden py-4">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-gray-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-gray-50 to-transparent" />
      <div className="flex animate-[infinite-scroll_22s_linear_infinite] gap-8 whitespace-nowrap">
        {repeated.map((label, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Hero ───────────────────────────────────────────────────────────────
export default function HeroHome() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      {/* Fixed parallax background — daytime Casablanca */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/images/hero-bg-daytime.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      {/* Light overlay to keep text readable while letting the image show through */}
      <div className="absolute inset-0 -z-10 bg-white/70 backdrop-blur-[1px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">

          {/* ── Split-screen grid ── */}
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-8">

            {/* LEFT — Copy */}
            <div data-aos="fade-right" data-aos-duration="700">
              {/* Eyebrow badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  0% Commission · WhatsApp-Native
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                {t("hero_headline")}
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                {t("hero_subheadline")}
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  id="hero-claim-beta-cta"
                  href="#claim-form"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-green-500 to-green-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-green-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/40"
                >
                  {t("cta_button")}
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <span className="text-sm text-slate-500">No credit card required</span>
              </div>

              {/* Social proof stats */}
              <div className="mt-8 flex flex-wrap gap-6">
                {[
                  { value: "0%", label: "Commission fees" },
                  { value: "< 2h", label: "Setup time" },
                  { value: "3 Cities", label: "Already live" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                    <div className="text-xs text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Visual mockup */}
            <div
              className="relative flex items-end justify-center gap-4"
              data-aos="fade-left"
              data-aos-duration="700"
              data-aos-delay="150"
            >
              {/* Decorative glow backdrop */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-slate-800 to-slate-900 opacity-5 blur-2xl" />

              {/* Outer device container */}
              <div className="relative flex w-full max-w-md flex-col items-center gap-5 rounded-3xl border border-slate-700/20 bg-gradient-to-tr from-slate-800/[0.06] to-slate-900/[0.04] p-6 shadow-2xl ring-1 ring-white/60 backdrop-blur-sm">

                {/* Section label */}
                <div className="mb-2 self-start">
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Live Preview
                  </span>
                </div>

                {/* Stacked mockups */}
                <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-center">
                  <WhatsAppPanel />
                  <KitchenPanel />
                </div>

                {/* Bottom label bar */}
                <div className="mt-2 flex w-full items-center justify-between rounded-xl bg-slate-800/80 px-4 py-2.5 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-medium text-slate-300">Orders processing in real-time</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400">↑ 3 new</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Trust marquee ── */}
          <TrustMarquee />

        </div>
      </div>
    </section>
  );
}
