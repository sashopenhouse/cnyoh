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
  title: "CNY's Open House | Local Experts. Modern Media.",
  description:
    "Positioning your business as the authority in Central New York since 2007. TV, video, podcasts, and digital distribution.",
  openGraph: {
    title: "CNY's Open House | Local Experts. Modern Media.",
    description: "Positioning your business as the authority since 2007.",
    siteName: "CNY's Open House",
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
