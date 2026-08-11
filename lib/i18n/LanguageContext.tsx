"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, translations } from "./translations";

interface LanguageContextType {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>("fr"); // Default to French

  const setLang = (newLang: Locale) => {
    setLangState(newLang);
    // Optionally persist in localStorage here
    try {
      localStorage.setItem("geqo_lang", newLang);
    } catch (e) {}
  };

  useEffect(() => {
    // Check local storage on mount
    try {
      const stored = localStorage.getItem("geqo_lang") as Locale;
      if (stored && (stored === "fr" || stored === "en" || stored === "ar")) {
        setLangState(stored);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    // Dynamic RTL layout toggling
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: keyof typeof translations.en) => {
    return translations[lang][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
