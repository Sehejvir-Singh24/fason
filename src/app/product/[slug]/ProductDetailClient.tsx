"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product, Colorway } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/ui/Navbar";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Footer } from "@/components/ui/Footer";
import { ModelViewer3D } from "@/components/3d/ModelViewer3D";
import {
  ArrowLeft,
  Check,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Zap,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const { addItem } = useCart();

  const [selectedColorway, setSelectedColorway] = useState<Colorway>(product.colorways[0]);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[2] || 9);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "shipping">("specs");
  const [added, setAdded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.fallbackImage,
      },
      selectedColorway,
      selectedSize
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#14161a] flex flex-col selection:bg-[#8fad88] selection:text-white">
      <Navbar />

      {/* Main Studio Viewport */}
      <div className="pt-20 sm:pt-24 pb-14 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 w-full flex-grow flex flex-col">
        {/* Breadcrumb & Code */}
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4 sm:mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 hover:text-[#62925b] transition-colors py-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO OVERVIEW</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e52328]" />
            <span className="font-bold">FASON® {product.code}</span>
          </div>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: 3D Interactive Studio Stage (Cols 1-7) */}
          <div
            className={`lg:col-span-7 rounded-3xl bg-white border border-black/8 shadow-sm relative overflow-hidden transition-all duration-300 ${
              isFullscreen
                ? "fixed inset-2 sm:inset-4 z-50 rounded-2xl bg-[#f8f7f4]/98"
                : "h-[360px] sm:h-[480px] lg:h-[620px]"
            }`}
          >
            {/* Top Bar Floating Controls */}
            <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/90 backdrop-blur border border-black/8 shadow-sm font-mono text-[10px] sm:text-[11px] text-[#62925b] font-bold flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-[#62925b]" />
                  <span>3D STUDIO</span>
                </span>
                <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur border border-black/8 shadow-sm font-mono text-[11px] text-neutral-700">
                  {selectedColorway.name}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  aria-label="Toggle Wireframe"
                  className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl border font-mono text-[10px] sm:text-xs transition-colors shadow-sm ${
                    wireframe
                      ? "bg-[#14161a] text-white border-[#14161a]"
                      : "bg-white/90 text-neutral-800 border-black/10 hover:border-black/25"
                  }`}
                >
                  WIREFRAME
                </button>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  className="p-2 rounded-xl bg-white/90 border border-black/10 text-neutral-800 hover:border-black/25 shadow-sm"
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* The Actual 3D Model Viewer (Stationary Calm Spec) */}
            <ModelViewer3D
              modelPath={product.modelPath}
              fallbackImage={product.fallbackImage}
              productName={product.name}
              wireframe={wireframe}
              colorwayHex={selectedColorway.modelColor}
              accentColor={selectedColorway.accentColor}
              autoRotate={false}
              enableFloat={false}
              enableMouseTilt={false}
              enableControls={true}
              cameraPosition={isMobile ? [0, 0.25, 4.2] : [0, 0.4, 3.6]}
              modelScale={isMobile ? 0.95 : 1.05}
              className="w-full h-full"
            />

            {/* Bottom HUD Hint */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 pointer-events-none flex items-center gap-2 text-[9px] sm:text-[10px] font-mono text-neutral-700 bg-white/85 backdrop-blur px-3 py-1.5 rounded-full border border-black/8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8fad88]" />
              <span>3D STUDIO // DRAG TO INSPECT // PINCH OR SCROLL TO ZOOM</span>
            </div>
          </div>

          {/* Right Column: Purchasing & Specifications Console (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Header / Pricing */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 rounded-full bg-[#e52328]/10 border border-[#e52328]/25 font-mono text-[9px] sm:text-[10px] text-neutral-800 uppercase font-bold tracking-widest">
                  {selectedColorway.badge}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#d4a373]">
                  <Star className="w-3.5 h-3.5 fill-[#d4a373]" />
                  <span className="font-bold text-neutral-900">{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-[#14161a] font-sans uppercase tracking-tight mb-1">
                {product.name}
              </h1>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed mb-5">
                {product.tagline}
              </p>

              {/* Price */}
              <div className="flex flex-wrap items-baseline gap-3 mb-5 pb-5 border-b border-black/8">
                <span className="text-2xl sm:text-3xl font-mono font-black text-[#14161a]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-neutral-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  IN STOCK ({selectedColorway.stock} UNITS)
                </span>
              </div>

              {/* Colorway Matrix */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                  <span className="text-neutral-500 uppercase">COLORWAY:</span>
                  <span className="text-[#62925b] font-bold">{selectedColorway.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {product.colorways.map((cw) => {
                    const isSelected = selectedColorway.id === cw.id;
                    return (
                      <button
                        key={cw.id}
                        onClick={() => setSelectedColorway(cw)}
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                          isSelected
                            ? "bg-[#8fad88]/15 border-[#8fad88] shadow-sm"
                            : "bg-black/[0.02] border-black/8 hover:border-black/20 active:scale-95"
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/15 shrink-0"
                          style={{ backgroundColor: cw.hex }}
                        />
                        <span className="text-[11px] font-mono font-bold text-neutral-900 truncate">
                          {cw.name.split("/")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                  <span className="text-neutral-500 uppercase">SIZE (US MEN):</span>
                  <span className="text-[10px] text-[#e52328] font-bold">FEEL THE RELIEF®</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded-xl font-mono text-xs font-bold transition-all border min-h-[44px] ${
                          isSelected
                            ? "bg-[#14161a] text-white border-[#14161a] shadow-sm"
                            : "bg-black/[0.03] border-black/8 text-neutral-800 hover:border-black/25 active:scale-95"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add to Bag CTA Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-2xl font-mono font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_8px_25px_rgba(20,22,26,0.18)] flex items-center justify-center gap-3 min-h-[48px] active:scale-95 ${
                  added
                    ? "bg-[#8fad88] text-white"
                    : "bg-[#14161a] hover:bg-[#252830] text-white"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                    <span>ACQUIRE HARDWARE // ${product.price}</span>
                  </>
                )}
              </button>
            </div>

            {/* Specifications & Biometrics Accordion */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-black/8 shadow-sm">
              {/* Tab Navigation */}
              <div className="flex border-b border-black/8 pb-3 gap-4 sm:gap-6 font-mono text-[11px] sm:text-xs overflow-x-auto">
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-1 transition-colors relative shrink-0 ${
                    activeTab === "specs" ? "text-[#14161a] font-bold" : "text-neutral-400 hover:text-black"
                  }`}
                >
                  SPECIFICATIONS
                  {activeTab === "specs" && (
                    <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#8fad88]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("features")}
                  className={`pb-1 transition-colors relative shrink-0 ${
                    activeTab === "features" ? "text-[#14161a] font-bold" : "text-neutral-400 hover:text-black"
                  }`}
                >
                  ORTHO-BIOMETRICS
                  {activeTab === "features" && (
                    <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#8fad88]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-1 transition-colors relative shrink-0 ${
                    activeTab === "shipping" ? "text-[#14161a] font-bold" : "text-neutral-400 hover:text-black"
                  }`}
                >
                  DISPATCH PROTOCOL
                  {activeTab === "shipping" && (
                    <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#8fad88]" />
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="pt-4">
                {activeTab === "specs" && (
                  <div className="space-y-2.5 font-mono text-xs">
                    {product.specs.map((s, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-black/5">
                        <span className="text-neutral-500">{s.label}</span>
                        <span className="text-[#14161a] font-bold">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "features" && (
                  <ul className="space-y-2 text-xs text-neutral-600 font-sans">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#62925b] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === "shipping" && (
                  <div className="space-y-2.5 text-xs text-neutral-600 font-sans leading-relaxed">
                    <div className="flex items-center gap-2 text-[#14161a] font-mono text-xs font-bold">
                      <Truck className="w-4 h-4 text-[#8fad88]" />
                      <span>EXPRESS ROBOTIC DISPATCH</span>
                    </div>
                    <p>
                      Orders processed within 24 hours. Free global carbon-neutral shipping on orders over $200.
                    </p>
                    <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8fad88]" />
                      <span>30-Day Zero-Friction Plantar Relief Guarantee</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CartDrawer />
      <Footer />
    </main>
  );
};
