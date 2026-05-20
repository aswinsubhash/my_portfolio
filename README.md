# Aswin Subhash Portfolio

Personal portfolio website for Aswin Subhash, built as a standard root-level Next.js application.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Motion
- Lenis
- next-themes
- Zod

## Project Structure

```text
app/                 App Router pages, layout, metadata, sitemap, robots
app/actions/         Server actions
components/          Shared UI and page sections
components/ui/       Reusable UI primitives
lib/                 Content and utility helpers
public/              Static assets served from the site root
```

## Getting Started

Install dependencies:

```bash
npm install
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

## Content

Most portfolio content lives in [lib/content.ts](lib/content.ts):

- Personal details
- Skills
- Experience
- Projects
- Education
- Navigation sections

Static files live in [public](public):

- `profile.png`
- `Aswin_Subhash_Resume.pdf`

## Contact Form

The contact form posts to Google Forms from [app/actions/contact.ts](app/actions/contact.ts). Validation is handled with Zod before submission.

## Deployment

Deploy the repository root as a normal Next.js project.

For Vercel:

- Framework preset: Next.js
- Root directory: repository root
- Build command: `npm run build`
- Install command: `npm install`

No custom Flutter-style `vercel.json` rewrite is needed.

## Migration Note

This repository previously contained a Flutter Web implementation. The active project is now the root-level Next.js app.
