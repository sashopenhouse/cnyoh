import React from "react";

interface LogoProps {
  /** "dark" = ink text (for light backgrounds), "light" = canvas text (for dark backgrounds) */
  variant?: "dark" | "light";
  className?: string;
  /** Height in px — width scales proportionally */
  height?: number;
}

/**
 * CNY's Open House wordmark logo.
 *
 * Two-weight typographic treatment:
 *   - "CNY's" — bold, tight tracking
 *   - "Open House" — light weight, wider tracking
 *
 * Usage:
 *   <Logo />                        dark variant (default)
 *   <Logo variant="light" />        for dark backgrounds
 *   <Logo height={32} />            custom size
 */
export default function Logo({
  variant = "dark",
  className = "",
  height = 36,
}: LogoProps) {
  const inkColor = variant === "dark" ? "#1E2028" : "#F8F9FB";
  const accentColor = "#4A6FA5";

  // Viewbox is fixed; height prop scales the whole thing
  const viewW = 260;
  const viewH = 44;

  return (
    <svg
      width={(viewW / viewH) * height}
      height={height}
      viewBox={`0 0 ${viewW} ${viewH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CNY's Open House"
      role="img"
    >
      {/* "CNY's" — bold, accent color */}
      <text
        x="0"
        y="28"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontWeight="700"
        fontSize="26"
        letterSpacing="-0.5"
        fill={accentColor}
      >
        CNY&apos;s
      </text>

      {/* Thin vertical divider */}
      <rect x="74" y="6" width="1" height="28" fill={inkColor} opacity="0.15" />

      {/* "Open House" — light weight, ink color */}
      <text
        x="82"
        y="22"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontWeight="300"
        fontSize="13"
        letterSpacing="2"
        fill={inkColor}
        opacity="0.9"
      >
        OPEN
      </text>
      <text
        x="82"
        y="38"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontWeight="600"
        fontSize="13"
        letterSpacing="2"
        fill={inkColor}
      >
        HOUSE
      </text>
    </svg>
  );
}
