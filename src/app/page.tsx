"use client";

import React, { useRef, useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Footer } from "@/components/ui/Footer";
import dynamic from "next/dynamic";

// Dynamic import — ssr:false keeps Three.js out of SSR bundle
const ScrollStorySection = dynamic(
  () => import("@/components/ui/ScrollStorySection").then((m) => ({ default: m.ScrollStorySection })),
  { ssr: false, loading: () => <div style={{ minHeight: "100svh", background: "#07090e" }} /> }
);

export default function HomePage() {
  const storyPlaceholderRef = useRef<HTMLDivElement>(null);
  const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    // ── Phase 1: Background-warm assets 1.5s after hero renders ──────────────
    // This fires while the user is still reading the hero content.
    // By the time they scroll down, everything is already in the browser cache.
    const warmTimer = setTimeout(() => {
      // 1a. Download the Three.js / R3F / ScrollStory JS chunks silently
      import("@/components/ui/ScrollStorySection").catch(() => null);

      // 1b. Pre-fetch the 7.6 MB GLB so it's in memory before Canvas mounts
      if (typeof window !== "undefined") {
        import("@react-three/drei").then(({ useGLTF }) => {
          useGLTF.preload("/models/slipper-main.glb");
        }).catch(() => null);
      }
    }, 1500);

    // ── Phase 2: Mount Canvas one full viewport ahead of the section ──────────
    // rootMargin "100%" means the Observer fires when the placeholder is still
    // one full screen height away — Canvas is ready before user arrives.
    const el = storyPlaceholderRef.current;
    if (!el) return () => clearTimeout(warmTimer);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowStory(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100%" } // trigger one full screen early
    );
    observer.observe(el);

    return () => {
      clearTimeout(warmTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#07090e] text-white flex flex-col relative selection:bg-[#ccff00] selection:text-black">
      {/* Global Navigation */}
      <Navbar />

      {/* 1. Full-screen Hero — renders immediately, warms 3D assets in bg */}
      <HeroSection />

      {/* 2. Scroll Story — Canvas mounts 1 screen early; GLB already cached */}
      <div ref={storyPlaceholderRef}>
        {showStory ? (
          <ScrollStorySection />
        ) : (
          <div style={{ minHeight: "600svh", background: "#07090e" }} id="story" />
        )}
      </div>

      {/* 3. Hardware Lineup Collection Grid */}
      <ProductGrid />

      {/* Global Cart Slide-Over Drawer */}
      <CartDrawer />

      {/* Brand Footer */}
      <Footer />
    </main>
  );
}
