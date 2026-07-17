"use client";

import * as React from "react";

export type LenisScrollState = {
  scrollY: number;
  progress: number;
};

const defaultState: LenisScrollState = { scrollY: 0, progress: 0 };

export const LenisContext = React.createContext<LenisScrollState>(defaultState);

export function useLenisScroll() {
  return React.useContext(LenisContext);
}

export function LenisScrollProvider({
  value,
  children,
}: {
  value: LenisScrollState;
  children: React.ReactNode;
}) {
  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
