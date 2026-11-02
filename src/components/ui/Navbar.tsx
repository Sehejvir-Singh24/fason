"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Compass, Menu, X, Volume2, VolumeX } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { FasonLogo } from "./FasonLogo";

export const Navbar: React.FC = () => {
  const { totalItems, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext not allowed before user gesture
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10 py-2.5 sm:py-3 shadow-lg shadow-black/40"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* FASON Brand Logo */}
        <Link
          href="/"
          onClick={playClickSound}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <FasonLogo size="sm" variant="full" />
          </div>
        </Link>

        {/* Minimal Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider text-neutral-300">
          <Link
            href="/#hero"
            onClick={playClickSound}
            className="hover:text-[#ccff00] transition-colors"
          >
            // OVERVIEW
          </Link>
          <Link
            href="/#story"
            onClick={playClickSound}
            className="hover:text-[#ccff00] transition-colors"
          >
            // 3D STORY
          </Link>
          <Link
            href="/#collection"
            onClick={playClickSound}
            className="hover:text-[#ccff00] transition-colors"
          >
            // COLLECTION
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound / Haptic Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playClickSound();
            }}
            aria-label="Toggle UI Audio"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#ccff00]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Quick 3D Studio Link */}
          <Link
            href="/product/orbit-slide-01"
            onClick={playClickSound}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-[11px] font-mono text-neutral-200 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>3D STUDIO</span>
          </Link>

          {/* Shopping Bag Trigger Button */}
          <button
            onClick={() => {
              toggleCart();
              playClickSound();
            }}
            aria-label="Open Shopping Bag"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-[#ccff00] hover:text-black border border-white/20 text-white transition-all font-mono text-xs font-bold active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">BAG</span>
            {totalItems > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#ccff00] text-black text-[10px] font-black shadow-[0_0_10px_#ccff00]">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white active:scale-95 transition-transform"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 px-6 py-6 mt-2 flex flex-col gap-4 font-mono text-xs animate-in slide-in-from-top-4 duration-200">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-neutral-400">NAVIGATION MENU</span>
            <span className="text-[10px] text-[#e52328] font-bold">FEEL THE RELIEF®</span>
          </div>
          <Link
            href="/#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-200 hover:text-[#ccff00] py-2 text-sm"
          >
            // OVERVIEW
          </Link>
          <Link
            href="/#story"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-200 hover:text-[#ccff00] py-2 text-sm"
          >
            // 3D STORY
          </Link>
          <Link
            href="/#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-200 hover:text-[#ccff00] py-2 text-sm"
          >
            // HARDWARE COLLECTION
          </Link>
          <Link
            href="/product/orbit-slide-01"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#ccff00] py-3 mt-2 font-bold bg-white/5 px-4 rounded-xl border border-[#ccff00]/30 flex items-center justify-between"
          >
            <span>LAUNCH 3D STUDIO</span>
            <Compass className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
};
