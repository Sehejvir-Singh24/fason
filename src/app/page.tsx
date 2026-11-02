"use client";

import React, { useRef, useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Footer } from "@/components/ui/Footer";
import dynamic from "next/dynamic";

// Dynamically import the heavy 3D scroll story — never SSR, load only when visible
const ScrollStorySection = dynamic(
  () => import("@/components/ui/ScrollStorySection").then((m) => ({ default: m.ScrollStorySection })),
  { ssr: false, loading: () => <div style={{ minHeight: "100svh", background: "#07090e" }} /> }
);

export default function HomePage() {
  const storyPlaceholderRef = useRef<HTMLDivElement>(null);
  const [showStory, setShowStory] = useState(false);

  // Only mount the Canvas when user scrolls within 200px of the story section
  useEffect(() => {
    const el = storyPlaceholderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowStory(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#07090e] text-white flex flex-col relative selection:bg-[#ccff00] selection:text-black">
      {/* Global Navigation */}
      <Navbar />

      {/* 1. Full-screen Futuristic Hero Section — loads immediately */}
      <HeroSection />

      {/* 2. Scroll-Driven 3D Storytelling — lazy-mounted on scroll */}
      <div ref={storyPlaceholderRef}>
        {showStory ? (
          <ScrollStorySection />
        ) : (
          // Placeholder keeps page height stable while Canvas hasn't loaded yet
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
