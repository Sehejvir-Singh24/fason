"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Footer } from "@/components/ui/Footer";
import dynamic from "next/dynamic";

// Full matching skeleton with exact 500svh height, Chapter 1 text, and HUD
// This guarantees zero layout shift, zero scroll jumping, and zero vanishing text.
function ScrollStorySkeleton() {
  return (
    <div id="story" className="relative w-full bg-[#f8f7f4]">
      {/* Sticky Viewport Shell */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-0">
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background: "radial-gradient(circle at 60% 50%, #8fad88 0%, transparent 65%)",
          }}
        />

        {/* Top HUD Stage Tracker */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-12 z-20 pointer-events-none max-w-[85%]">
          <div className="px-3 py-1.5 rounded-xl bg-white/85 backdrop-blur-md border border-black/8 w-fit shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e52328] animate-pulse" />
              <span className="font-mono text-[9px] sm:text-xs text-neutral-600 tracking-widest uppercase font-medium">
                FASON® ORTHO-KINETIC // STORY
              </span>
            </div>
            <div className="font-mono text-sm sm:text-xl font-black text-[#14161a] mt-0.5 truncate">
              01 // ANATOMICAL SILHOUETTE
            </div>
          </div>
        </div>
      </div>

      {/* 5 Trigger Sections matching exact 500svh height so scroll never shifts */}
      <div className="relative z-10">
        <section className="min-h-screen flex items-end sm:items-center px-4 sm:px-12 pb-24 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-2xl glass-panel-glow border-[#8fad88]/30 pointer-events-auto mx-auto sm:mx-0 shadow-sm">
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#62925b] uppercase mb-1.5 font-bold">
              CHAPTER 01 // ORTHO-KINETIC FORM
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-[#14161a] font-sans uppercase mb-2 sm:mb-3">
              Anatomical Arch
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              Sculpted to eliminate plantar pressure points. The continuous monocoque curve cradles the arch dynamically, giving tired feet instant soothing relief.
            </p>
          </div>
        </section>
        <section className="min-h-screen pointer-events-none" />
        <section className="min-h-screen pointer-events-none" />
        <section className="min-h-screen pointer-events-none" />
        <section className="min-h-screen pointer-events-none" />
      </div>
    </div>
  );
}

// Dynamic import keeps Three.js bundle out of initial SSR load
const ScrollStorySection = dynamic(
  () => import("@/components/ui/ScrollStorySection").then((m) => ({ default: m.ScrollStorySection })),
  {
    ssr: false,
    loading: () => <ScrollStorySkeleton />,
  }
);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#14161a] flex flex-col relative selection:bg-[#8fad88] selection:text-white">
      {/* Global Navigation */}
      <Navbar />

      {/* 1. Full-screen Hero — fast initial render, rock-solid typography */}
      <HeroSection />

      {/* 2. Scroll Story — persistent height with matching skeleton & instant swap */}
      <ScrollStorySection />

      {/* 3. Hardware Lineup Collection Grid */}
      <ProductGrid />

      {/* Global Cart Slide-Over Drawer */}
      <CartDrawer />

      {/* Brand Footer */}
      <Footer />
    </main>
  );
}
