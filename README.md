# Aswin Subhash Portfolio

Personal portfolio website for Aswin Subhash, built as a standard root-level Next.js application.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Motion (Framer Motion)
- Lenis smooth scroll
- next-themes
- Zod
- Cloudflare Turnstile
- Vercel Analytics

## Project Structure

```text
app/                 App Router pages, layout, metadata, sitemap, robots
app/actions/         Server actions (contact form)
components/          Shared UI and page sections
components/sections/ Portfolio sections (hero, about, experience, projects, education, contact)
components/ui/       Reusable UI primitives
lib/                 Content, i18n, hooks, and utilities
public/              Static assets
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=   # Cloudflare test key for local dev
TURNSTILE_SECRET_KEY=<your-secret>
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Start local development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm run start    # Start the production server
```

## Content & i18n

All portfolio data lives in `lib/content.ts` (English source of truth). Translations for `en`, `ar`, `ja`, `de` are in `lib/translations.ts`. To update content, edit `lib/content.ts` then mirror changes across all four language blocks in `lib/translations.ts`.

Static files live in `public/`:

- `profile.png`
- `Aswin_Subhash_Resume.pdf`

## Contact Form

Flow: `components/sections/contact.tsx` → `app/actions/contact.ts` → Cloudflare Turnstile verify → Google Forms submission.

Zod schema in `lib/contact-form.ts`. Turnstile token is verified server-side before any submission reaches Google Forms.

## Canvas Animation

`components/scene-canvas.tsx` — single canvas layer combining the interactive dot grid and floating particles. One RAF loop, pauses when tab is hidden, caches theme-derived colors via `MutationObserver`.

## Deployment

Active dev branch: `feat/perf-fonts-favicon`. Production: `main` on Vercel.

For Vercel:

- Framework preset: Next.js
- Root directory: repository root
- Build command: `npm run build`
- Install command: `npm install`

Required Vercel environment variables:

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<real-site-key>
TURNSTILE_SECRET_KEY=<real-secret-key>
```
