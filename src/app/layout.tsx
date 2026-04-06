import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Varaha Surya Prakash D. — Portfolio",
  description:
    "Software Engineer building distributed systems and low-level runtime components.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Varaha Surya Prakash D. — Portfolio",
    description:
      "Software Engineer building distributed systems and low-level runtime components.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Varaha Surya Prakash D. — Portfolio",
    description:
      "Software Engineer building distributed systems and low-level runtime components.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
