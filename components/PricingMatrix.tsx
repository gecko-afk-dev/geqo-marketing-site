"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PricingMatrix() {
  const { t } = useLanguage();

  const tiers = [
    {
      name: "STARTER",
      price: "0 MAD",
      period: "/ mois",
      htEquivalent: "0 MAD HT",
      features: [
        "PWA + Menu QR",
        "WhatsApp (commandes + alertes)",
        "1 écran KDS",
        "Capture CRM avec consentement",
        "Marge de confiance -75 MAD (≈ 25 commandes)",
        "1 point de vente",
      ],
      cta: t("pricing_starter_cta"),
      isPopular: false,
      isPrixFondateur: false,
      fenceCopy: "Sans livreurs, sans campagnes marketing — la porte d'entrée.",
      toll: "3,00 MAD TTC / commande (soit 2,50 MAD HT)",
      walletInfo: "Initial recharge: 149 MAD TTC (soit 124 MAD HT — ≈ 50 commandes) ; recharges suivantes dès 50 MAD ; recharge auto optionnelle (sous 30 MAD)"
    },
    {
      name: "PRO",
      price: "599 MAD",
      period: "/ mois TTC",
      htEquivalent: "soit 499 MAD HT",
      prixFondateur: "499 MAD / mois TTC",
      features: [
        "Commandes illimitées (0 MAD par commande)",
        "2 écrans KDS",
        "3 livreurs avec dispatching + Code PIN 4 chiffres",
        "Geo-fencing livraison",
        "CRM complet + statistiques avancées",
      ],
      cta: t("pricing_pro_cta"),
      isPopular: true,
      isPrixFondateur: true,
      callout: "Paiement annuel = 2 mois offerts",
      microLine: "7 commandes / jour = Pro gratuit (599 ÷ 3 MAD ≈ 200 commandes/mois)"
    },
    {
      name: "SCALE",
      price: "1 299 MAD",
      period: "/ mois TTC",
      htEquivalent: "soit 1 082 MAD HT",
      prixFondateur: "1 099 MAD / mois TTC",
      features: [
        "Commandes illimitées",
        "Écrans KDS & livreurs illimités",
        "Full CRM + Campagnes WhatsApp Boost",
        "Fidélité / Parrainage",
        "Export CRM brut",
        "Support prioritaire",
      ],
      cta: t("pricing_scale_cta"),
      isPopular: false,
      isPrixFondateur: true,
      microLine: "Scale = votre facture Mymenu… avec la cuisine et les livreurs."
    },
    {
      name: "MULTI",
      price: "2 099 MAD",
      period: "/ mois TTC",
      htEquivalent: "soit 1 749 MAD HT",
      prixFondateur: "1 799 MAD / mois TTC",
      features: [
        "Jusqu'à 5 points de vente (+349 MAD TTC / PDV supplémentaire)",
        "Tout le pack Scale",
        "Manager dédié",
      ],
      cta: t("pricing_multi_cta"),
      isPopular: false,
      isPrixFondateur: true,
      microLine: "Multi = 46 % moins cher que 3 × Scale."
    }
  ];

  return (
    <section className="py-24 bg-obsidian border-b border-grid-line">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="font-space font-bold text-4xl text-offwhite mb-4">
            {t("pricing_title")}
          </h2>
          <p className="font-plex-sans text-[#A3A3A3] text-lg max-w-2xl mx-auto">
            {t("pricing_subtitle")}
          </p>
          <p className="mt-4 text-xs text-[#737373] max-w-3xl mx-auto font-plex-mono">
            {t("pricing_disclaimer")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative border border-grid-line p-8 flex flex-col ${
                tier.isPopular ? "bg-[#1C1C1C]" : "bg-[#141414]"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-0 w-full h-1 bg-saffron" />
              )}
              {tier.isPopular && (
                <div className="absolute top-4 right-4 bg-saffron text-obsidian text-xs font-bold uppercase tracking-widest py-1 px-2">
                  {t("pricing_popular")}
                </div>
              )}
              
              <div className="mb-8 mt-2">
                <span className="font-plex-mono text-sm uppercase tracking-widest text-[#A3A3A3]">
                  {tier.name}
                </span>
                <div className="mt-4 flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-space font-bold text-4xl text-offwhite">{tier.price}</span>
                  </div>
                  <span className="font-plex-sans text-[#737373] text-sm">{tier.period} ({tier.htEquivalent})</span>
                </div>

                {tier.isPrixFondateur && (
                  <div className="mt-4 bg-[#262626] border border-[#404040] p-3 text-sm">
                    <span className="block font-plex-sans font-bold text-saffron">{t("pricing_founder_life")}</span>
                    <span className="block font-plex-mono text-offwhite">{tier.prixFondateur}</span>
                  </div>
                )}
                
                {tier.callout && (
                  <div className="mt-4 font-plex-sans font-medium text-mint text-sm">
                    {tier.callout}
                  </div>
                )}
                
                {tier.toll && (
                  <div className="mt-4 space-y-2">
                    <div className="font-plex-sans text-xs text-[#D4D4D4] border-l-2 border-mint pl-3 py-1">
                      {tier.toll}
                    </div>
                    <div className="font-plex-sans text-xs text-[#A3A3A3]">
                      {tier.walletInfo}
                    </div>
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-mint mt-1">●</span>
                    <span className="font-plex-sans text-[#D4D4D4] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {tier.fenceCopy && (
                <div className="mb-6 font-plex-sans text-xs italic text-[#737373]">
                  {tier.fenceCopy}
                </div>
              )}

              {tier.microLine && (
                <div className="mb-6 font-plex-mono text-xs text-saffron border-t border-grid-line pt-4">
                  {tier.microLine}
                </div>
              )}

              <button
                className={`w-full font-bold uppercase tracking-wide py-3 px-4 transition-colors ${
                  tier.isPopular
                    ? "bg-saffron text-obsidian hover:bg-amber-400"
                    : "border border-neutral-700 text-offwhite hover:border-neutral-500"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Prix Fondateur Banner */}
          <div className="bg-saffron text-obsidian font-bold p-4 text-center tracking-wide font-plex-mono uppercase text-sm">
            {/* [PRIX FONDATEUR LOCK] */}
            {t("pricing_founder_banner")}
            <div className="mt-2 h-2 bg-obsidian/20 max-w-md mx-auto rounded-full overflow-hidden">
              <div className="h-full bg-obsidian w-[87%]" />
            </div>
            <div className="mt-1 text-xs opacity-80">{t("pricing_founder_spots")}</div>
          </div>
          
          <p className="text-center text-sm font-plex-sans text-[#A3A3A3] italic">
            {t("pricing_quote")}
          </p>
          
          <p className="text-center text-xs font-plex-sans text-[#737373]">
            {t("pricing_marketing")}
          </p>

          <div className="bg-[#141414] border border-grid-line p-6 mt-8">
            <h4 className="font-space font-bold text-lg text-offwhite mb-4">{t("pricing_note_title")}</h4>
            <div className="space-y-4 font-plex-sans text-sm text-[#A3A3A3]">
              <p>
                <strong className="text-[#D4D4D4]">{t("pricing_note_1_title")}</strong> {t("pricing_note_1_desc")}
              </p>
              <p>
                <strong className="text-[#D4D4D4]">{t("pricing_note_2_title")}</strong> {t("pricing_note_2_desc")}
              </p>
              <p className="text-xs text-[#737373] mt-4 pt-4 border-t border-[#262626]">
                {t("pricing_note_3")}
              </p>
              <p className="text-xs text-saffron mt-2 font-medium">
                {t("pricing_note_4")}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
