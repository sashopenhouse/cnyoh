import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CNY Open House | Local Experts. Modern Media.",
  description:
    "Positioning your business as the authority in Central New York since 2007. TV, video, podcasts, and digital distribution.",
  openGraph: {
    title: "CNY Open House | Local Experts. Modern Media.",
    description: "Positioning your business as the authority since 2007.",
    siteName: "CNY Open House",
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
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-cream text-charcoal`}
      >
        {children}
      </body>
    </html>
  );
}
