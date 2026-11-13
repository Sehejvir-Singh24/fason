import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Footer } from "@/components/ui/Footer";

import { ScrollStorySection } from "@/components/ui/ScrollStorySection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#14161a] flex flex-col relative selection:bg-[#8fad88] selection:text-white">
      {/* Global Navigation */}
      <Navbar />

      {/* 1. Full-screen Hero — fast initial render, rock-solid typography */}
      <HeroSection />

      {/* 2. Scroll Story — server-rendered chapters with progressive 3D */}
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
