"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale } from "./translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("geqo-locale") as Locale | null;
    if (stored && ["en", "fr", "ar"].includes(stored)) {
      setLocaleState(stored);
    } else {
      const browserLang = navigator.language.split("-")[0];
      if (["en", "fr", "ar"].includes(browserLang)) {
        setLocaleState(browserLang as Locale);
      } else {
        setLocaleState("fr");
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("geqo-locale", newLocale);
  };

  const dir = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (isMounted) {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
    }
  }, [locale, dir, isMounted]);

  // Avoid hydration mismatch by waiting for mount
  if (!isMounted) {
    return null;
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nContext() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18nContext must be used within an I18nProvider");
  }
  return context;
}
