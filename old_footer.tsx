"use client";

import { useTranslation } from "@/lib/i18n/use-translation";
import Logo from "./logo";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div className="grid gap-10 py-8 sm:grid-cols-12 md:py-12 border-t border-gray-200">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-4">
            <div className="mb-2">
              <Logo />
            </div>
            <div className="text-sm text-gray-600 mb-4">
              {t("footer_location")}
            </div>
            <div className="text-sm text-gray-500">
              {t("footer_powered")}
            </div>
          </div>
        </div>

        {/* Bottom area */}
        <div className="flex flex-col md:flex-row items-center justify-between py-4 md:py-8 border-t border-gray-200 text-sm">
          {/* Copyrights note */}
          <div className="text-gray-600 mr-4">
            {t("footer_copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
}
