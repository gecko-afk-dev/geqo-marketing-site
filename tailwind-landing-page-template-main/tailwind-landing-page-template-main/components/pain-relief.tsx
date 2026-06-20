"use client";

import { useTranslation } from "@/lib/i18n/use-translation";

export default function PainRelief() {
  const { t } = useTranslation();

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="text-3xl font-bold md:text-4xl">{t("pain_title")}</h2>
          </div>

          {/* Items */}
          <div className="mx-auto max-w-sm items-start gap-8 sm:max-w-none md:grid md:grid-cols-3 md:gap-12 lg:gap-16">
            {/* 1st item */}
            <div className="flex flex-col rounded-2xl bg-white/50 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm transition-all hover:bg-white/80">
              <div className="mb-4">
                <span className="inline-flex rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 line-through">
                  {t("pain_1_before")}
                </span>
                <div className="mt-2">
                  <span className="inline-flex rounded-lg bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {t("pain_1_after")}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{t("pain_1_desc")}</p>
            </div>

            {/* 2nd item */}
            <div className="flex flex-col rounded-2xl bg-white/50 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm transition-all hover:bg-white/80 mt-8 md:mt-0">
              <div className="mb-4">
                <span className="inline-flex rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 line-through">
                  {t("pain_2_before")}
                </span>
                <div className="mt-2">
                  <span className="inline-flex rounded-lg bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {t("pain_2_after")}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{t("pain_2_desc")}</p>
            </div>

            {/* 3rd item */}
            <div className="flex flex-col rounded-2xl bg-white/50 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm transition-all hover:bg-white/80 mt-8 md:mt-0">
              <div className="mb-4">
                <span className="inline-flex rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 line-through">
                  {t("pain_3_before")}
                </span>
                <div className="mt-2">
                  <span className="inline-flex rounded-lg bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {t("pain_3_after")}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{t("pain_3_desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
