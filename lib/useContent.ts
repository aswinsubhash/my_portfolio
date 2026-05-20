"use client";

import { useLang } from "./i18n";
import { translations } from "./translations";

export function useContent() {
  const { lang } = useLang();
  return translations[lang];
}
