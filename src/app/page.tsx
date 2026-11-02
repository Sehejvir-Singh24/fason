"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { ScrollStorySection } from "@/components/ui/ScrollStorySection";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Footer } from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07090e] text-white flex flex-col relative selection:bg-[#ccff00] selection:text-black">
      {/* Global Navigation */}
      <Navbar />

      {/* 1. Full-screen Futuristic Hero Section */}
      <HeroSection />

      {/* 2. Scroll-Driven 3D Storytelling Experience (5 Chapters) */}
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
