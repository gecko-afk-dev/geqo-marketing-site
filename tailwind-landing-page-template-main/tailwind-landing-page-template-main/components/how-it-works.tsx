"use client";

import { useTranslation } from "@/lib/i18n/use-translation";

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-900 text-gray-100 py-12 md:py-20 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="pb-12 text-center md:pb-20">
          <h2 className="text-3xl font-bold md:text-4xl text-white">{t("how_it_works")}</h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 -ml-[1px] hidden h-full w-[2px] bg-gray-800 md:block" aria-hidden="true" />
          
          <div className="space-y-12 md:space-y-0">
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <h3 className="text-xl font-semibold mb-2 text-green-400">{t("step_1_title")}</h3>
                <p className="text-gray-400">{t("step_1_desc")}</p>
              </div>
              <div className="absolute left-1/2 -ml-4 hidden h-8 w-8 items-center justify-center rounded-full border-4 border-gray-900 bg-green-500 text-gray-900 font-bold md:flex">
                1
              </div>
              <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0">
                <div className="rounded-xl bg-gray-800 p-6 shadow-2xl border border-gray-700">
                  <div className="h-32 rounded bg-gray-700/50 flex items-center justify-center text-gray-500">
                    [WhatsApp Chat UI Mockup]
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row-reverse md:items-center mt-12">
              <div className="md:w-1/2 md:pl-12">
                <h3 className="text-xl font-semibold mb-2 text-green-400">{t("step_2_title")}</h3>
                <p className="text-gray-400">{t("step_2_desc")}</p>
              </div>
              <div className="absolute left-1/2 -ml-4 hidden h-8 w-8 items-center justify-center rounded-full border-4 border-gray-900 bg-green-500 text-gray-900 font-bold md:flex">
                2
              </div>
              <div className="md:w-1/2 md:pr-12 mt-4 md:mt-0">
                <div className="rounded-xl bg-gray-800 p-6 shadow-2xl border border-gray-700">
                  <div className="h-32 rounded bg-gray-700/50 flex items-center justify-center text-gray-500">
                    [KDS Dashboard UI Mockup]
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row md:items-center mt-12">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <h3 className="text-xl font-semibold mb-2 text-green-400">{t("step_3_title")}</h3>
                <p className="text-gray-400">{t("step_3_desc")}</p>
              </div>
              <div className="absolute left-1/2 -ml-4 hidden h-8 w-8 items-center justify-center rounded-full border-4 border-gray-900 bg-green-500 text-gray-900 font-bold md:flex">
                3
              </div>
              <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0">
                <div className="rounded-xl bg-gray-800 p-6 shadow-2xl border border-gray-700">
                  <div className="h-32 rounded bg-gray-700/50 flex items-center justify-center text-gray-500">
                    [Driver Dispatch UI Mockup]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
