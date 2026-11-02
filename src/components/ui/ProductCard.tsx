"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { ArrowUpRight, Check, Eye, Plus, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [selectedColorway, setSelectedColorway] = useState(product.colorways[0]);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.fallbackImage,
      },
      selectedColorway,
      product.sizes[2] || 9
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group rounded-3xl bg-white border border-black/8 hover:border-[#8fad88]/60 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Top Media / Thumbnail Container */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#f8f7f4] to-[#f0eee9] flex items-center justify-center p-6 overflow-hidden">
        {/* Glow behind product image */}
        <div
          className="absolute inset-0 opacity-25 group-hover:opacity-45 transition-opacity duration-500 blur-2xl"
          style={{
            background: `radial-gradient(circle, ${selectedColorway.accentColor} 0%, transparent 70%)`,
          }}
        />

        {/* Product Image */}
        <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
          <Image
            src={product.fallbackImage}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur border border-black/8 shadow-sm text-[9px] font-mono tracking-widest text-neutral-800 uppercase font-semibold">
            {selectedColorway.badge}
          </span>
        </div>

        {/* 3D Studio Quick Link Floating Button */}
        <Link
          href={`/product/${product.slug}`}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-[#8fad88] hover:text-white border border-black/10 text-neutral-800 shadow-sm flex items-center justify-center transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
          title="Open in 3D Studio"
        >
          <Eye className="w-4 h-4" />
        </Link>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
        <div>
          {/* Rating & Code */}
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-2">
            <span>{product.code}</span>
            <div className="flex items-center gap-1 text-[#d4a373]">
              <Star className="w-3.5 h-3.5 fill-[#d4a373]" />
              <span className="font-bold text-neutral-900">{product.rating}</span>
              <span className="text-neutral-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-[#14161a] group-hover:text-[#62925b] transition-colors font-sans uppercase mb-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-neutral-500 font-sans line-clamp-2 mb-4 leading-relaxed">
            {product.tagline}
          </p>

          {/* Colorway Switcher Dots */}
          <div className="flex items-center gap-2.5 mb-5">
            <span className="text-[10px] font-mono text-neutral-500 uppercase mr-1">
              FINISH:
            </span>
            {product.colorways.map((cw) => (
              <button
                key={cw.id}
                onClick={() => setSelectedColorway(cw)}
                title={cw.name}
                className={`w-5 h-5 rounded-full border transition-all ${
                  selectedColorway.id === cw.id
                    ? "scale-125 border-[#8fad88] shadow-[0_0_8px_#8fad88]"
                    : "border-black/20 hover:scale-110"
                }`}
                style={{ backgroundColor: cw.hex }}
              />
            ))}
          </div>
        </div>

        {/* Pricing & Add to Bag */}
        <div className="pt-4 border-t border-black/8 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-neutral-400">USD</span>
            <div className="text-lg sm:text-xl font-mono font-black text-[#14161a]">
              ${product.price}
              {product.originalPrice && (
                <span className="text-xs text-neutral-400 line-through ml-2 font-normal">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/product/${product.slug}`}
              className="p-2.5 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] border border-black/8 text-neutral-800 hover:text-[#62925b] transition-colors"
              title="View 3D Model"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handleQuickAdd}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all min-h-[40px] shadow-sm ${
                added
                  ? "bg-[#8fad88] text-white"
                  : "bg-[#14161a] hover:bg-[#252830] text-white active:scale-95"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>ADDED</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
