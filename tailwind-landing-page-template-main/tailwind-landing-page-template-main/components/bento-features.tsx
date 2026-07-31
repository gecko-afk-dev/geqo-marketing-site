"use client";

import { useTranslation } from "@/lib/i18n/use-translation";
import {
  BadgeDollarSign,
  MessageCircle,
  MonitorCheck,
  Database,
} from "lucide-react";

const features = [
  {
    id: "bento-zero-commission",
    icon: BadgeDollarSign,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-950/60",
    title: "Zero Commissions.",
    subtitle: "Keep 100% of your revenue.",
    description:
      "Aggregators take 25–30% of every order. With GEQO, you pay a simple flat monthly fee and keep every single dirham. Your restaurant. Your money.",
    colSpan: "md:col-span-2",
    accent: "from-emerald-500/10 to-transparent",
    border: "border-emerald-500/20",
    badge: "Most Popular",
    badgeColor: "bg-emerald-950 text-emerald-400 border-emerald-700/50",
    visual: (
      <div className="mt-4 flex flex-wrap gap-2">
        {["Jan", "Feb", "Mar", "Apr", "May"].map((m, i) => (
          <div key={m} className="flex flex-col items-center gap-1">
            <div
              className="w-8 rounded-t bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-500"
              style={{ height: `${[28, 36, 24, 44, 56][i]}px` }}
            />
            <span className="text-[8px] text-slate-500">{m}</span>
          </div>
        ))}
        <div className="ml-2 flex flex-col justify-end">
          <span className="text-[10px] font-bold text-emerald-400">↑ Revenue kept</span>
        </div>
      </div>
    ),
  },
  {
    id: "bento-whatsapp",
    icon: MessageCircle,
    iconColor: "text-green-400",
    iconBg: "bg-green-950/60",
    title: "100% WhatsApp.",
    subtitle: "No apps to download.",
    description:
      "Your customers order directly inside WhatsApp — the app they already use every day. Zero friction, zero onboarding.",
    colSpan: "md:col-span-1",
    accent: "from-green-500/10 to-transparent",
    border: "border-green-500/20",
    badge: "2.9B+ Users",
    badgeColor: "bg-green-950 text-green-400 border-green-700/50",
    visual: null,
  },
  {
    id: "bento-kds",
    icon: MonitorCheck,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-950/60",
    title: "Smart Kitchen Display.",
    subtitle: "Replace pen & paper, forever.",
    description:
      "Orders appear instantly on your kitchen screen, sorted by priority. No lost tickets. No shouting. Your kitchen, digitized.",
    colSpan: "md:col-span-1",
    accent: "from-indigo-500/10 to-transparent",
    border: "border-indigo-500/20",
    badge: null,
    badgeColor: "",
    visual: null,
  },
  {
    id: "bento-customer-data",
    icon: Database,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-950/60",
    title: "Own Your Customer Data.",
    subtitle: "Build a loyal database for marketing.",
    description:
      "Every order builds your proprietary customer list — phone numbers, preferences, order history. Launch WhatsApp promotions directly. No more relying on aggregator algorithms to reach your regulars.",
    colSpan: "md:col-span-2",
    accent: "from-violet-500/10 to-transparent",
    border: "border-violet-500/20",
    badge: "CNDP Compliant",
    badgeColor: "bg-violet-950 text-violet-400 border-violet-700/50",
    visual: (
      <div className="mt-4 flex flex-wrap gap-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-700/60 to-slate-700/60 border border-violet-600/20 flex items-center justify-center text-[8px] font-bold text-violet-300"
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}
        <div className="h-7 w-7 rounded-full bg-violet-500/20 border border-dashed border-violet-500/40 flex items-center justify-center text-[9px] font-bold text-violet-400">
          +
        </div>
      </div>
    ),
  },
];

export default function BentoFeatures() {
  const { t } = useTranslation();

  return (
    <section id="features" className="relative overflow-hidden py-20 md:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-50 to-slate-50" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 text-center" data-aos="fade-up">
          <span className="mb-3 inline-block rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-500 shadow-sm">
            Why GEQO
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Everything your restaurant needs.
            <br />
            <span className="text-emerald-600">Nothing you don't.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={f.id}
                id={f.id}
                className={`group relative overflow-hidden rounded-2xl border bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${f.colSpan} ${f.border}`}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                {/* Gradient glow */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${f.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                {/* Badge */}
                {f.badge && (
                  <div className={`mb-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${f.badgeColor}`}>
                    {f.badge}
                  </div>
                )}

                {/* Icon */}
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.iconBg}`}>
                  <Icon className={`h-5 w-5 ${f.iconColor}`} />
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold leading-tight text-white">
                  {f.title}{" "}
                  <span className="text-slate-400">{f.subtitle}</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {f.description}
                </p>

                {/* Visual accent */}
                {f.visual}

                {/* Bottom border line on hover */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${f.iconColor.replace("text-", "from-")} to-transparent transition-all duration-500 group-hover:w-full`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
