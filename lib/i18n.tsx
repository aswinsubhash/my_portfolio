"use client";

import * as React from "react";

export type Lang = "en" | "ar" | "ja" | "de";

type LangCtx = { lang: Lang; switchTo: (l: Lang) => void };

const LangContext = React.createContext<LangCtx>({ lang: "en", switchTo: () => {} });

const VALID_LANGS: readonly Lang[] = ["en", "ar", "ja", "de"];

function isValidLang(v: string | null): v is Lang {
  return v !== null && (VALID_LANGS as readonly string[]).includes(v);
}

const LANG_EVENT = "lang-change";

function subscribe(cb: () => void) {
  window.addEventListener(LANG_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(LANG_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): Lang {
  const saved = localStorage.getItem("lang");
  return isValidLang(saved) ? saved : "en";
}

function getServerSnapshot(): Lang {
  return "en";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  React.useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const switchTo = React.useCallback((l: Lang) => {
    localStorage.setItem("lang", l);
    window.dispatchEvent(new Event(LANG_EVENT));
  }, []);

  return <LangContext.Provider value={{ lang, switchTo }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return React.useContext(LangContext);
}
