"use client";

import * as React from "react";

type ScrollState = { scrollY: number; progress: number };

const serverSnapshot: ScrollState = { scrollY: 0, progress: 0 };

let snapshot: ScrollState = serverSnapshot;
const listeners = new Set<() => void>();
let attached = false;
let raf = 0;

function computeScroll(): ScrollState {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  return { scrollY, progress: scrollY / max };
}

function publish() {
  const next = computeScroll();
  if (next.scrollY === snapshot.scrollY && next.progress === snapshot.progress) return;
  snapshot = next;
  listeners.forEach((l) => l());
}

function onScroll() {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    publish();
  });
}

function ensureAttached() {
  if (attached || typeof window === "undefined") return;
  attached = true;
  snapshot = computeScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

function teardownIfIdle() {
  if (listeners.size > 0 || !attached) return;
  attached = false;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  if (raf) {
    cancelAnimationFrame(raf);
    raf = 0;
  }
}

function subscribe(onStoreChange: () => void) {
  ensureAttached();
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    teardownIfIdle();
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return serverSnapshot;
}

/** Shared native scroll position for nav chrome + progress bar. */
export function useWindowScroll() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
