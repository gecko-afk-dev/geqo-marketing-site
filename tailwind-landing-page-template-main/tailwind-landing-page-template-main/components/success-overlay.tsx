"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n/use-translation";

export default function SuccessOverlay() {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-2xl bg-gray-800 p-8 text-center shadow-2xl border border-gray-700 animate-in zoom-in-95 duration-300">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
          <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-2xl font-bold text-white">{t("success_title")}</h3>
        <p className="mb-8 text-gray-400">{t("success_message")}</p>
        <button
          onClick={() => setShow(false)}
          className="btn w-full bg-gray-700 text-white hover:bg-gray-600"
        >
          OK
        </button>
      </div>
    </div>
  );
}
