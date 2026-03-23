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
        // Primary palette — cool, unisex, tech-forward
        accent: {
          DEFAULT: "#4A6FA5",
          light: "#6B8FC4",
          dark: "#2E4F7A",
        },
        canvas: {
          DEFAULT: "#F8F9FB",
          dark: "#EEF0F5",
        },
        ink: {
          DEFAULT: "#1E2028",
          light: "#3A3D4A",
          muted: "#6B6F7E",
        },
        mist: {
          DEFAULT: "#EEF0F5",
          dark: "#D8DCE8",
        },
        steel: {
          DEFAULT: "#8A9BB5",
          light: "#B0BECE",
          dark: "#5A6B85",
        },
        // Keep these for backward compat during transition
        cream: {
          DEFAULT: "#F8F9FB",
          dark: "#EEF0F5",
        },
        charcoal: {
          DEFAULT: "#1E2028",
          light: "#3A3D4A",
          dark: "#0F1015",
        },
        // Neutral scale
        neutral: {
          50: "#F8F9FB",
          100: "#EEF0F5",
          200: "#D8DCE8",
          300: "#B8BECE",
          400: "#8A9BB5",
          500: "#5A6B85",
          600: "#3A4D6A",
          700: "#2A3A55",
          800: "#1E2028",
          900: "#0F1015",
        },
      },
      fontFamily: {
        // DM Sans — geometric, tech-forward, unisex (headings)
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        // Lora — refined editorial serif (body/paragraphs)
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
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
