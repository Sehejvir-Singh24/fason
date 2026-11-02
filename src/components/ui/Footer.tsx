"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FasonLogo } from "./FasonLogo";

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#f0eee9] border-t border-black/8 text-neutral-600 font-mono text-xs overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 mb-14 sm:mb-16">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <FasonLogo size="md" variant="full" theme="light" />
            </div>
            <p className="text-neutral-600 font-sans text-xs sm:text-sm leading-relaxed max-w-sm">
              FASON® Biomechanical Research & Kinetic Footwear. We engineer zero-gravity void lattice footwear that decompresses the plantar fascia and delivers instant athletic relief.
            </p>
            <div className="text-[10px] text-neutral-500 font-mono">
              PATENTED ARCH CRADLE // ISO-9001 CERTIFIED 2026
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-[#14161a] font-bold uppercase tracking-widest text-[11px] mb-2">
              HARDWARE
            </div>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <Link href="/product/orbit-slide-01" className="hover:text-[#62925b] transition-colors">
                  Orbit Relief // 01
                </Link>
              </li>
              <li>
                <Link href="/#collection" className="hover:text-[#62925b] transition-colors">
                  Strata Mule // 02
                </Link>
              </li>
              <li>
                <Link href="/#collection" className="hover:text-[#62925b] transition-colors">
                  Pulse Sandal // 03
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-[#14161a] font-bold uppercase tracking-widest text-[11px] mb-2">
              BIOMECHANICS
            </div>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <span className="hover:text-[#62925b] cursor-pointer">Plantar Decompression</span>
              </li>
              <li>
                <span className="hover:text-[#62925b] cursor-pointer">Cryo-Weave Shroud</span>
              </li>
              <li>
                <span className="hover:text-[#62925b] cursor-pointer">Circular Polyurethane</span>
              </li>
              <li>
                <span className="hover:text-[#62925b] cursor-pointer">Clinical Whitepaper</span>
              </li>
            </ul>
          </div>

          {/* Dispatch Transmission Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[#14161a] font-bold uppercase tracking-widest text-[11px] mb-2">
              RELIEF DISPATCH
            </div>
            <p className="text-[11px] text-neutral-500 font-sans leading-relaxed">
              Subscribe to early prototype drops and plantar recovery research reports.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="bg-white border border-black/10 rounded-xl px-3 py-2 text-xs text-[#14161a] placeholder-neutral-400 focus:outline-none focus:border-[#8fad88] w-full shadow-sm"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-[#14161a] hover:bg-[#252830] text-white transition-colors shrink-0 shadow-sm"
                title="Subscribe"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500 text-center sm:text-left">
          <div>
            © 2026 FASON® FOOTWEAR LABS INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <span className="hover:text-neutral-800 cursor-pointer">TERMS OF SERVICE</span>
            <span className="hover:text-neutral-800 cursor-pointer">PRIVACY PROTOCOL</span>
            <span className="hover:text-neutral-800 cursor-pointer">FEEL THE RELIEF®</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
