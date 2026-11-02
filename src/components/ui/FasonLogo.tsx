"use client";

import React from "react";

interface FasonLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "mark" | "compact";
  theme?: "dark" | "light";
}

export const FasonLogo: React.FC<FasonLogoProps> = ({
  className = "",
  size = "md",
  variant = "full",
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const textColor = isDark ? "#ffffff" : "#111827";
  const redColor = "#e52328";

  // Scale settings
  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.35 : 1.0;

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* 3-Tier Aerodynamic Wing Icon */}
      <svg
        width={38 * scale}
        height={32 * scale}
        viewBox="0 0 76 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-110"
      >
        {/* Top Wing Swoosh */}
        <path
          d="M26 12C36 10 50 14 62 2C58 12 50 20 40 23C32 25 24 23 26 12Z"
          fill={isDark ? "#ffffff" : "#111827"}
        />
        {/* Middle Wing Swoosh */}
        <path
          d="M20 28C32 26 44 28 54 20C50 28 42 34 32 37C24 39 18 36 20 28Z"
          fill={isDark ? "#ffffff" : "#111827"}
        />
        {/* Bottom Wing Swoosh */}
        <path
          d="M20 44C28 42 38 43 45 38C40 44 34 49 26 51C20 52 18 49 20 44Z"
          fill={redColor}
        />
      </svg>

      {/* Wordmark & Tagline */}
      {variant !== "mark" && (
        <div className="flex flex-col items-center mt-1">
          <div className="flex items-start">
            <span
              className="font-black italic tracking-tighter uppercase font-sans leading-none"
              style={{
                color: textColor,
                fontSize: `${22 * scale}px`,
                letterSpacing: "-0.04em",
                transform: "skewX(-10deg)",
              }}
            >
              FASON
            </span>
            <span
              className="text-[9px] font-bold ml-0.5 leading-none"
              style={{ color: textColor }}
            >
              ®
            </span>
          </div>

          {variant === "full" && (
            <span
              className="font-black italic tracking-tight font-sans text-center leading-none mt-1"
              style={{
                color: redColor,
                fontSize: `${11 * scale}px`,
                transform: "skewX(-8deg)",
              }}
            >
              Feel The Relief
            </span>
          )}
        </div>
      )}
    </div>
  );
};
