"use client";

import React from "react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";

export const ProductGrid: React.FC = () => {
  return (
    <section id="collection" className="relative w-full py-20 sm:py-28 bg-[#f2f0eb] border-t border-black/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div>
            <div className="font-mono text-[10px] sm:text-xs text-[#e52328] tracking-[0.2em] uppercase mb-1.5 sm:mb-2 font-bold">
              FASON® RECOVERY CATALOGUE // 2026
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#14161a] font-sans uppercase tracking-tight">
              Hardware Lineup
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] sm:text-xs text-neutral-500">
              SHOWING ALL {PRODUCTS.length} SYSTEMS // ALL-DAY COMFORT
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
};
