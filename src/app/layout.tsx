import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";

// DM Sans — geometric, tech-forward, unisex. Used for all headings.
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Lora — refined serif with editorial warmth. Used for body/paragraph text.
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cnyopenhouse.com"),
  title: {
    default: "CNY's Open House | Local Experts. Modern Media.",
    template: "%s | CNY's Open House",
  },
  description:
    "CNY's Open House is Central New York's leading home improvement show and media platform. TV, video, podcasts, and digital distribution since 2007.",
  alternates: {
    canonical: "https://cnyopenhouse.com/",
  },
  keywords: [
    "CNY's Open House",
    "Central New York home improvement show",
    "home improvement TV show",
    "local TV segments",
    "CNY media platform",
    "home improvement experts",
    "Utica home show",
    "Syracuse home improvement",
    "Mohawk Valley contractors",
    "home improvement podcast",
  ],
  openGraph: {
    title: "CNY's Open House | Local Experts. Modern Media.",
    description:
      "Central New York's leading home improvement show and media platform since 2007.",
    siteName: "CNY's Open House",
    type: "website",
    locale: "en_US",
    url: "https://cnyopenhouse.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "CNY's Open House | Local Experts. Modern Media.",
    description:
      "Central New York's leading home improvement show and media platform since 2007.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${lora.variable} font-sans antialiased bg-canvas text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
