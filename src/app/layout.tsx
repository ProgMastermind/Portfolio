import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import { site } from "@/lib/site";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const serif = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const sans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: `${site.name}, ${site.title}`,
  description: site.metaDescription,
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: `${site.name}, ${site.title}`,
    description: site.metaDescription,
    type: "website",
    url: baseUrl,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, ${site.title}`,
    description: site.metaDescription,
    creator: site.links.x ? site.links.x.split("/").pop() : undefined,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    email: site.email,
    telephone: site.phone,
    url: baseUrl,
    sameAs: [site.links.github, site.links.linkedin, site.links.x].filter(Boolean),
    knowsAbout: [
      ...site.skills.languages,
      ...site.skills.frameworks,
      "Distributed Systems",
      "Operating Systems",
      "Backend Engineering",
    ],
    alumniOf: site.education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.school,
    })),
    worksFor: {
      "@type": "Organization",
      name: site.experience[0]?.company ?? "",
    },
  };

  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="theme-flash"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground focus:text-sm"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
