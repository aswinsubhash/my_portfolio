# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
npm run start    # Serve production build
```

No test suite exists.

## Environment Variables

Required in `.env.local` for local dev:

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=""   # Cloudflare test key (always passes)
TURNSTILE_SECRET_KEY=<secret>
```

Production Vercel env vars use the real Cloudflare Turnstile site key.

## Architecture

### Content & i18n

All portfolio data (personal info, skills, experience, projects, education) lives in `lib/content.ts` — the single source of truth for English content.

`lib/translations.ts` exports a `translations` object keyed by `Lang` (`"en" | "ar" | "ja" | "de"`). Each language entry contains translated UI strings plus localized versions of content arrays.

`lib/i18n.tsx` provides `LangProvider` (persists to `localStorage`, sets `html[lang]` and `html[dir]` for RTL) and `useLang()` hook.

`lib/useContent.ts` — the primary hook used in every section component. Returns `translations[lang]`, giving access to `personal`, `skills`, `experience`, `projects`, `education`, `ui`, and `navSections`.

**To update content:** edit `lib/content.ts` for English, then mirror changes in all 4 language blocks in `lib/translations.ts`.

### Contact Form

Flow: `components/sections/contact.tsx` → `app/actions/contact.ts` (server action) → Cloudflare Turnstile verify → Google Forms submission.

Schema in `lib/contact-form.ts` (Zod). Includes `turnstileToken` field — validated client-side (disables submit until resolved) and verified server-side against Cloudflare's siteverify API. Native HTML `required` attributes are intentionally absent; Zod handles all validation.

### Canvas Animations

Two `fixed inset-0` canvas layers run on every page:
- `components/particle-grid.tsx` — interactive dot grid, reacts to mouse
- `components/floating-particles.tsx` — 55 drifting particles with O(n²) connection lines

Both: pause on `document.visibilitychange` (tab hidden), cache `getComputedStyle` results via `MutationObserver` on `<html class>` (only recompute on theme change), clean up all listeners on unmount.

### Theme & Scroll

- `next-themes` via `components/theme-provider.tsx` — dark/light toggle
- Lenis smooth scroll via `components/lenis-provider.tsx` — intercepts all native scroll. JS `scrollIntoView` / `window.scrollTo` won't work as expected; use Lenis API or nav link clicks instead.

### Styling

Tailwind CSS v4. Design tokens (colors, radius, etc.) are CSS custom properties — e.g. `var(--color-accent)`, `var(--color-accent-glow)`. The accent color drives canvas particles, borders, and glows.

### Deployment

Branch `feat/perf-fonts-favicon` is the active dev branch; `main` is production on Vercel. Push to branch → Vercel preview deploy. Merge to `main` → production deploy.
