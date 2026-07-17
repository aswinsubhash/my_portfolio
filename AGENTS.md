# Repository Guide

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
npm run start    # Serve production build
```

There is no dedicated test suite.

## Environment

Local development expects `.env.local` with:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=""   # Cloudflare test key, always passes
TURNSTILE_SECRET_KEY=<secret>
```

Production Vercel env vars use the real Cloudflare Turnstile site key.

## Architecture

### Content and i18n

`lib/content.ts` is the English source of truth for personal info, skills, experience, projects, and education.

`lib/translations.ts` exports localized UI strings and localized content for:

- `en`
- `ar`
- `ja`
- `de`

`lib/i18n.tsx` provides `LangProvider` and `useLang()`. It persists the language in `localStorage` and updates `html[lang]` / `html[dir]` for RTL support.

`lib/useContent.ts` is the primary content hook used by section components. It returns the active language block from `translations[lang]`.

When updating portfolio content, update `lib/content.ts` first, then mirror the change across all language blocks in `lib/translations.ts`.

### Contact Form

Flow:

```text
components/sections/contact.tsx
app/actions/contact.ts
Cloudflare Turnstile verify
Google Forms submission
```

The Zod schema lives in `lib/contact-form.ts` and includes `turnstileToken`.

The client disables submit until Turnstile resolves, and the server action verifies the token against Cloudflare `siteverify`. Native HTML `required` attributes are intentionally absent because Zod handles validation.

### Theme and Scroll

Theme handling uses `next-themes` through `components/theme-provider.tsx`.

Scrolling is native. Nav scrolled state and the top progress bar read scroll via `lib/use-window-scroll.ts`.

### Styling

This project uses Tailwind CSS v4. Design tokens are CSS custom properties such as:

- `var(--color-accent)`
- `var(--color-accent-glow)`

The accent color drives borders and glow effects.

## Deployment

The active development branch is `feat/perf-fonts-favicon`.

`main` is production on Vercel. Pushing the feature branch creates a Vercel preview deploy; merging to `main` deploys production.
