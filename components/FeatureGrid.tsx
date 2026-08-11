"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FeatureGrid() {
  const { t } = useLanguage();

  const features = [
    {
      title: t("feat_1_title"),
      description: t("feat_1_desc"),
      meta: t("feat_1_meta"),
      highlight: t("feat_1_hl"),
    },
    {
      title: t("feat_2_title"),
      description: t("feat_2_desc"),
      meta: t("feat_2_meta"),
      highlight: t("feat_2_hl"),
    },
    {
      title: t("feat_3_title"),
      description: t("feat_3_desc"),
      meta: t("feat_3_meta"),
      highlight: t("feat_3_hl"),
    },
    {
      title: t("feat_4_title"),
      description: t("feat_4_desc"),
      meta: t("feat_4_meta"),
      highlight: t("feat_4_hl"),
    },
  ];

  return (
    <section className="py-24 border-b border-grid-line bg-[#050505]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-12 md:grid-cols-16 gap-6 mb-16">
          <div className="col-span-12 md:col-span-14 lg:col-span-10 md:col-start-2">
            <h2 className="font-space font-bold text-4xl text-offwhite mb-4">
              {t("feat_section_title")}
            </h2>
            <p className="font-plex-sans text-[#A3A3A3] text-lg max-w-2xl">
              {t("feat_section_desc")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-grid-line bg-[#0A0A0A] p-8 flex flex-col hover:border-neutral-600 transition-colors"
            >
              <div className="font-plex-mono text-xs text-saffron uppercase tracking-widest mb-6">
                [{String(index + 1).padStart(2, "0")}] {feature.highlight}
              </div>
              <h3 className="font-space font-bold text-xl text-offwhite mb-4">
                {feature.title}
              </h3>
              <p className="font-plex-sans text-[#A3A3A3] text-sm flex-grow mb-8 leading-relaxed">
                {feature.description}
              </p>
              <div className="border-t border-grid-line pt-4 mt-auto">
                <span className="font-plex-mono text-xs text-[#737373] tracking-wide">
                  {feature.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
