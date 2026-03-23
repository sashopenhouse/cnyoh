import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tan: {
          DEFAULT: "#D2B48C",
          light: "#E8D5B7",
          dark: "#B8956A",
        },
        cream: {
          DEFAULT: "#FDFBF7",
          dark: "#F5F0E8",
        },
        charcoal: {
          DEFAULT: "#333333",
          light: "#555555",
          dark: "#1A1A1A",
        },
        sage: {
          DEFAULT: "#7C8C6E",
          light: "#A3B08F",
          dark: "#5A6650",
        },
        earth: {
          DEFAULT: "#8B6914",
          light: "#A67C1F",
          dark: "#6B4F0F",
        },
        warm: {
          50: "#FDFBF7",
          100: "#F5F0E8",
          200: "#EDE4D3",
          300: "#E0D0B8",
          400: "#D2B48C",
          500: "#C49A6C",
          600: "#B8956A",
          700: "#8B6914",
          800: "#6B4F0F",
          900: "#333333",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      spacing: {
        section: "7rem",
        "section-sm": "4rem",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(51, 51, 51, 0.06)",
        card: "0 4px 40px rgba(51, 51, 51, 0.08)",
        elevated: "0 8px 60px rgba(51, 51, 51, 0.12)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
