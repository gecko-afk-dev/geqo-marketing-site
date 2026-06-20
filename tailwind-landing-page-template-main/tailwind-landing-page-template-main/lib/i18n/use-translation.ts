"use client";

import { useI18nContext } from "./i18n-context";
import { translations, TranslationKey } from "./translations";

export function useTranslation() {
  const { locale, setLocale, dir } = useI18nContext();

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || translations.en[key] || key;
  };

  return { t, locale, setLocale, dir };
}
