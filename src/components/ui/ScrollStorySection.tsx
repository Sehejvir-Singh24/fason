"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ScrollStoryCanvas, STORY_STAGES } from "@/components/3d/ScrollStoryCanvas";
import { ArrowRight, CheckCircle2, Cpu, Layers, Sparkles } from "lucide-react";

export const ScrollStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [wireframe, setWireframe] = useState(false);

  const stage = STORY_STAGES[activeStage] || STORY_STAGES[0];

  return (
    <div id="story" ref={containerRef} className="relative w-full bg-[#f8f7f4]">
      {/* Sticky 3D Canvas Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-0">
        <ScrollStoryCanvas
          containerRef={containerRef}
          wireframe={wireframe}
          accentColor={stage.accentColor}
          onStageChange={(idx) => setActiveStage(idx)}
        />

        {/* Ambient Stage Glow (Pastel wash) */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-1000 opacity-25"
          style={{
            background: `radial-gradient(circle at 60% 50%, ${stage.accentColor} 0%, transparent 65%)`,
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
              {stage.title}
            </div>
          </div>
        </div>

        {/* Floating Wireframe Inspector Toggle */}
        <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-12 z-20">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-mono text-[10px] sm:text-xs transition-all border shadow-sm ${
              wireframe
                ? "bg-[#14161a] text-white border-[#14161a]"
                : "bg-white/85 text-neutral-800 border-black/10 hover:border-black/25"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>WIREFRAME {wireframe ? "ON" : "OFF"}</span>
          </button>
        </div>

        {/* Timeline Progress Beads (Desktop) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
          {STORY_STAGES.map((s, idx) => (
            <div
              key={s.id}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === activeStage
                  ? "bg-[#8fad88] scale-150 shadow-[0_0_8px_#8fad88]"
                  : "bg-black/15 hover:bg-black/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 5 Scroll Story Chapters (Trigger Sections) */}
      <div className="relative z-10">
        {/* Stage 1: Overall Silhouette */}
        <section className="story-trigger-section min-h-screen flex items-end sm:items-center px-4 sm:px-12 pb-24 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-2xl glass-panel-glow border-[#8fad88]/30 pointer-events-auto mx-auto sm:mx-0 shadow-sm">
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#62925b] uppercase mb-1.5 font-bold">
              CHAPTER 01 // ORTHO-KINETIC FORM
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-[#14161a] font-sans uppercase mb-2 sm:mb-3">
              Anatomical Arch
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 sm:mb-6 font-sans">
              Sculpted to eliminate plantar pressure points. The continuous monocoque curve cradles the arch dynamically, giving tired feet instant soothing relief.
            </p>
            <div className="space-y-1.5 text-xs font-mono text-neutral-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#62925b] shrink-0" />
                <span>Zero-strain ergonomic cradle</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#62925b] shrink-0" />
                <span>Natural gait realignment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stage 2: Upper Strap Construction */}
        <section className="story-trigger-section min-h-screen flex items-end sm:items-center justify-end px-4 sm:px-12 pb-24 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-2xl glass-panel-glow border-[#82b2d8]/35 pointer-events-auto mx-auto sm:mr-0 sm:ml-auto shadow-sm">
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#4d86b1] uppercase mb-1.5 font-bold">
              CHAPTER 02 // THERMAL RELIEF
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-[#14161a] font-sans uppercase mb-2 sm:mb-3">
              Cryo-Weave Shroud
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 sm:mb-6 font-sans">
              Laser-micro-machined venting slots allow foot humidity to escape immediately. High-tensile elastomeric ribs softly hug the foot with zero pressure hotspots.
            </p>
            <div className="p-3 rounded-xl bg-black/[0.03] border border-black/8 font-mono text-xs">
              <div className="text-[#4d86b1] font-bold mb-0.5">AIRFLOW CONDUITS</div>
              <div className="text-neutral-500 text-[11px]">1,420 venting perforations across upper strap</div>
            </div>
          </div>
        </section>

        {/* Stage 3: Sole Design & Dual-Lattice */}
        <section className="story-trigger-section min-h-screen flex items-end sm:items-center px-4 sm:px-12 pb-24 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-2xl glass-panel-glow border-[#e58282]/35 pointer-events-auto mx-auto sm:mx-0 shadow-sm">
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#d15353] uppercase mb-1.5 font-bold">
              CHAPTER 03 // PLANTAR DECOMPRESSION
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-[#14161a] font-sans uppercase mb-2 sm:mb-3">
              Dual-Lattice Sole
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 sm:mb-6 font-sans">
              Hexagonal shock cells compress independently on heel impact, absorbing 84% of vertical rebound stress and reducing joint wear.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-black/[0.03] border border-black/8">
                <div className="text-neutral-500 text-[10px]">RELIEF INDEX</div>
                <div className="text-[#d15353] font-bold text-sm sm:text-base">98.4%</div>
              </div>
              <div className="p-2.5 rounded-lg bg-black/[0.03] border border-black/8">
                <div className="text-neutral-500 text-[10px]">ENERGY RETURN</div>
                <div className="text-[#62925b] font-bold text-sm sm:text-base">+32.4%</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stage 4: Material Details */}
        <section className="story-trigger-section min-h-screen flex items-end sm:items-center justify-end px-4 sm:px-12 pb-24 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-2xl glass-panel-glow border-[#a494d4]/35 pointer-events-auto mx-auto sm:mr-0 sm:ml-auto shadow-sm">
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#7d6bb8] uppercase mb-1.5 font-bold">
              CHAPTER 04 // CLEAN BIO-MATERIALS
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-[#14161a] font-sans uppercase mb-2 sm:mb-3">
              Bio-Circular Matrix
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 sm:mb-6 font-sans">
              Engineered with hypoallergenic bio-circular polyether elastomer. Skin-friendly, odorless, and resistant to UV, saltwater, and temperature swings.
            </p>
            <div className="space-y-1.5 text-xs font-mono text-neutral-700">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#7d6bb8] shrink-0" />
                <span>Zero petroleum chemical inputs</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#7d6bb8] shrink-0" />
                <span>100% closed-loop recyclable</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stage 5: Complete Product Reveal */}
        <section className="story-trigger-section min-h-screen flex items-end sm:items-center justify-center px-4 sm:px-6 pb-20 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-lg p-6 sm:p-10 rounded-3xl glass-panel-glow border-[#d4a373]/40 text-center pointer-events-auto mx-auto shadow-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e52328]/10 border border-[#e52328]/25 font-mono text-[10px] text-neutral-800 uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#e52328]" />
              <span className="font-bold">FEEL THE RELIEF®</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#14161a] font-sans uppercase tracking-tight mb-2 sm:mb-3">
              FASON® Orbit Relief // 01
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 sm:mb-8 max-w-sm mx-auto font-sans">
              Ready to decompress? Step into the 3D Studio to inspect your preferred colorway and order your pair.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                href="/product/orbit-slide-01"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#14161a] hover:bg-[#252830] text-white font-mono font-bold text-xs tracking-wider transition-all shadow-[0_8px_20px_rgba(20,22,26,0.18)] min-h-[44px]"
              >
                <span>OPEN 3D STUDIO & ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#collection"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-black/[0.05] hover:bg-black/[0.09] border border-black/10 text-[#14161a] font-mono text-xs tracking-wider transition-all min-h-[44px]"
              >
                <span>VIEW HARDWARE LINEUP</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
