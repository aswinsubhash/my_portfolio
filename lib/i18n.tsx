"use client";

import * as React from "react";

export type Lang = "en" | "ar" | "ja" | "de";

type LangCtx = { lang: Lang; switchTo: (l: Lang) => void };

const LangContext = React.createContext<LangCtx>({ lang: "en", switchTo: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Lang>("en");

  React.useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "ar" || saved === "en" || saved === "ja" || saved === "de") setLang(saved);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("lang", lang);
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const switchTo = React.useCallback((l: Lang) => setLang(l), []);

  return <LangContext.Provider value={{ lang, switchTo }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return React.useContext(LangContext);
}
