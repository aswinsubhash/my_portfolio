import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { LangProvider } from "@/lib/i18n";
import { AmbientMotion } from "@/components/ambient-motion";
import { Cursor } from "@/components/cursor";
import { SceneCanvas } from "@/components/scene-canvas";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { personal, skills } from "@/lib/content";
import { Analytics } from "@vercel/analytics/next";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});


const siteUrl = "https://aswinsubhash.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personal.name} — ${personal.title}`,
    template: `%s · ${personal.name}`,
  },
  description: personal.tagline,
  keywords: [
    "Aswin Subhash",
    "Flutter Developer",
    "Mobile Application Developer",
    "Dart",
    "iOS",
    "Android",
    "Cross-Platform",
    "Dubai",
  ],
  authors: [{ name: personal.name, url: siteUrl }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: personal.name,
    title: `${personal.name} — ${personal.title}`,
    description: personal.tagline,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${personal.name} — ${personal.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.title}`,
    description: personal.tagline,
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    description: personal.tagline,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    sameAs: [personal.github, personal.linkedin],
    knowsAbout: skills.flatMap((s) => s.items),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: personal.name,
    url: siteUrl,
    inLanguage: ["en", "ar", "ja", "de"],
    author: { "@type": "Person", name: personal.name, url: siteUrl },
  };

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${syne.variable} ${dmSans.variable} ${ibmMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="grain relative min-h-screen bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:text-white"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <LangProvider>
        <ThemeProvider>
          <LenisProvider>
            <Cursor />
            <SceneCanvas />
            <AmbientMotion />
            <Nav />
            <main id="main" className="relative">
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
