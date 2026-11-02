"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import gsap from "gsap";

// Dynamically import the heavy 3D viewer — excluded from initial JS bundle
const ModelViewer3D = dynamic(
  () => import("@/components/3d/ModelViewer3D").then((m) => ({ default: m.ModelViewer3D })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border border-[#8fad88]/30 bg-[#8fad88]/10 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[#8fad88]/50 animate-pulse" />
        </div>
      </div>
    ),
  }
);

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Smooth entrance without vanishing text (immediateRender: false ensures SSR text stays visible)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 20 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", immediateRender: false }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 15 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", immediateRender: false }
      );

      gsap.fromTo(
        ctaGroupRef.current,
        { y: 10 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", immediateRender: false }
      );

      gsap.fromTo(
        metricsRef.current,
        { y: 10 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", immediateRender: false }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col justify-center bg-[#f8f7f4] overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-20"
    >
      {/* Background Cyber Grid & Soft Pastel Glows */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-80 sm:w-96 h-80 sm:h-96 bg-[#e58282]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 sm:w-96 h-80 sm:h-96 bg-[#8fad88]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 flex-grow">
        {/* Left Column: FASON Campaign Headline & CTAs (Cols 1-7) */}
        <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-1 text-center lg:text-left">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/8 w-fit mx-auto lg:mx-0 mb-5 sm:mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#e52328] animate-ping" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-neutral-800 uppercase font-bold">
              FASON® <span className="text-[#e52328]">// FEEL THE RELIEF</span>
            </span>
          </div>

          {/* Large Bold Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl xl:text-7xl font-black text-[#14161a] tracking-tight uppercase leading-[0.96] mb-4 sm:mb-6 font-sans"
          >
            FEEL THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14161a] via-[#3a404d] to-[#8fad88]">
              RELIEF.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xs sm:text-base text-neutral-600 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed mb-6 sm:mb-8 font-normal"
          >
            Engineered by FASON® Biomechanical Labs. The Orbit Relief // 01 fuses continuous additive 3D void lattices with dual-density bio-foam to eliminate foot fatigue and restore zero-gravity stride comfort.
          </p>

          {/* CTA Buttons Group (Full-width on mobile, auto on desktop) */}
          <div
            ref={ctaGroupRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            <Link
              href="/#collection"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#14161a] hover:bg-[#252830] text-white font-mono font-black text-xs sm:text-sm tracking-wider transition-all shadow-[0_8px_25px_rgba(20,22,26,0.18)] active:scale-95 min-h-[48px]"
            >
              <span>SHOP THE COLLECTION</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <button
              onClick={() => {
                if (onExploreClick) onExploreClick();
                else {
                  const el = document.getElementById("story");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/80 hover:bg-white border border-black/10 hover:border-black/20 text-[#14161a] font-mono text-xs sm:text-sm tracking-wider transition-all shadow-sm active:scale-95 min-h-[48px]"
            >
              <span>DISCOVER 3D STORY</span>
              <Zap className="w-4 h-4 text-[#8fad88]" />
            </button>
          </div>

          {/* Telemetry Metrics Bar */}
          <div
            ref={metricsRef}
            className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 sm:pt-6 border-t border-black/8 max-w-lg mx-auto lg:mx-0"
          >
            <div className="p-2 sm:p-0 rounded-xl bg-black/[0.02] sm:bg-transparent">
              <div className="font-mono text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">
                RELIEF INDEX
              </div>
              <div className="font-mono text-lg sm:text-2xl font-black text-[#e52328]">
                98.4<span className="text-[10px] sm:text-xs text-neutral-600">%</span>
              </div>
            </div>
            <div className="p-2 sm:p-0 rounded-xl bg-black/[0.02] sm:bg-transparent">
              <div className="font-mono text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">
                KINETIC RETURN
              </div>
              <div className="font-mono text-lg sm:text-2xl font-black text-[#62925b]">
                +32.4<span className="text-[10px] sm:text-xs text-neutral-600">%</span>
              </div>
            </div>
            <div className="p-2 sm:p-0 rounded-xl bg-black/[0.02] sm:bg-transparent">
              <div className="font-mono text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">
                UNIT WEIGHT
              </div>
              <div className="font-mono text-lg sm:text-2xl font-black text-[#14161a]">
                148<span className="text-[10px] sm:text-xs text-neutral-500">g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Slipper Model (Cols 8-12) */}
        <div className="lg:col-span-5 h-[340px] sm:h-[440px] lg:h-[600px] w-full relative flex items-center justify-center order-2 lg:order-2">
          {/* Soft Pastel Halo Spotlight behind model */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[260px] sm:w-[340px] h-[260px] sm:h-[340px] rounded-full bg-gradient-to-tr from-[#e58282]/15 via-[#8fad88]/20 to-transparent blur-3xl animate-pulse-glow" />
          </div>

          {/* Actual 3D Product Canvas (Calm, Stationary Architectural Spec) */}
          <div className="w-full h-full relative z-10">
            <ModelViewer3D
              modelPath="/models/slipper-main.glb"
              fallbackImage="/images/slipper-fallback.jpg"
              productName="FASON® Orbit Relief // 01"
              autoRotate={false}
              enableFloat={false}
              enableMouseTilt={false}
              enableControls={true}
              cameraPosition={isMobile ? [0, 0.25, 4.2] : [0, 0.3, 3.8]}
              modelScale={isMobile ? 0.95 : 1.05}
              className="w-full h-full"
            />
          </div>

          {/* Product Spec Badge */}
          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/85 backdrop-blur border border-black/8 shadow-sm font-mono text-[9px] sm:text-[10px] text-neutral-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8fad88]" />
            <span>FASON® KINETIC SPEC // 01</span>
          </div>
        </div>
      </div>

      {/* Small Scroll Indicator */}
      <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1.5 pointer-events-none">
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-500">
          SCROLL FOR 3D STORY
        </span>
        <div className="w-4 h-6 rounded-full border border-black/20 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-[#8fad88] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
