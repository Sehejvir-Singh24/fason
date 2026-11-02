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
    <div id="story" ref={containerRef} className="relative w-full bg-[#07090e]">
      {/* Sticky 3D Canvas Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-0">
        <ScrollStoryCanvas
          containerRef={containerRef}
          wireframe={wireframe}
          accentColor={stage.accentColor}
          onStageChange={(idx) => setActiveStage(idx)}
        />

        {/* Ambient Stage Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-1000 opacity-20"
          style={{
            background: `radial-gradient(circle at 60% 50%, ${stage.accentColor} 0%, transparent 65%)`,
          }}
        />

        {/* Top HUD Stage Tracker */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-12 z-10 pointer-events-none max-w-[80%]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e52328] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs text-white tracking-widest uppercase">
              FASON® ORTHO-KINETIC // STORY
            </span>
          </div>
          <div className="font-mono text-base sm:text-2xl font-black text-white mt-0.5 truncate">
            {stage.title}
          </div>
        </div>

        {/* Floating Wireframe Inspector Toggle */}
        <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-12 z-20">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-mono text-[10px] sm:text-xs transition-all border ${
              wireframe
                ? "bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_20px_#ccff00]"
                : "bg-black/70 text-white border-white/20 hover:border-white/40"
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
                  ? "bg-[#ccff00] scale-150 shadow-[0_0_10px_#ccff00]"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 5 Scroll Story Chapters (Trigger Sections) */}
      <div className="relative z-10">
        {/* Stage 1: Overall Silhouette */}
        <section className="story-trigger-section min-h-screen flex items-end sm:items-center px-4 sm:px-12 pb-24 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-2xl glass-panel-glow border-white/10 pointer-events-auto mx-auto sm:mx-0">
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#ccff00] uppercase mb-1.5">
              CHAPTER 01 // ORTHO-KINETIC FORM
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white font-sans uppercase mb-2 sm:mb-3">
              Anatomical Arch
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4 sm:mb-6 font-sans">
              Sculpted to eliminate plantar pressure points. The continuous monocoque curve cradles the arch dynamically, giving tired feet instant soothing relief.
            </p>
            <div className="space-y-1.5 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                <span>Zero-strain ergonomic cradle</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                <span>Natural gait realignment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stage 2: Upper Strap Construction */}
        <section className="story-trigger-section min-h-screen flex items-end sm:items-center justify-end px-4 sm:px-12 pb-24 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-2xl glass-panel-glow border-cyan-500/20 pointer-events-auto mx-auto sm:mr-0 sm:ml-auto">
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-cyan-400 uppercase mb-1.5">
              CHAPTER 02 // THERMAL RELIEF
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white font-sans uppercase mb-2 sm:mb-3">
              Cryo-Weave Shroud
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4 sm:mb-6 font-sans">
              Laser-micro-machined venting slots allow foot humidity to escape immediately. High-tensile elastomeric ribs softly hug the foot with zero pressure hotspots.
            </p>
            <div className="p-3 rounded-xl bg-black/50 border border-white/10 font-mono text-xs">
              <div className="text-cyan-400 font-bold mb-0.5">AIRFLOW CONDUITS</div>
              <div className="text-neutral-400 text-[11px]">1,420 venting perforations across upper strap</div>
            </div>
          </div>
        </section>

        {/* Stage 3: Sole Design & Dual-Lattice */}
        <section className="story-trigger-section min-h-screen flex items-end sm:items-center px-4 sm:px-12 pb-24 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-2xl glass-panel-glow border-[#e52328]/30 pointer-events-auto mx-auto sm:mx-0">
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#e52328] uppercase mb-1.5">
              CHAPTER 03 // PLANTAR DECOMPRESSION
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white font-sans uppercase mb-2 sm:mb-3">
              Dual-Lattice Sole
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4 sm:mb-6 font-sans">
              Hexagonal shock cells compress independently on heel impact, absorbing 84% of vertical rebound stress and reducing joint wear.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                <div className="text-neutral-400 text-[10px]">RELIEF INDEX</div>
                <div className="text-[#e52328] font-bold text-sm sm:text-base">98.4%</div>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                <div className="text-neutral-400 text-[10px]">ENERGY RETURN</div>
                <div className="text-[#ccff00] font-bold text-sm sm:text-base">+32.4%</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stage 4: Material Details */}
        <section className="story-trigger-section min-h-screen flex items-end sm:items-center justify-end px-4 sm:px-12 pb-24 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-2xl glass-panel-glow border-[#ccff00]/20 pointer-events-auto mx-auto sm:mr-0 sm:ml-auto">
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#ccff00] uppercase mb-1.5">
              CHAPTER 04 // CLEAN BIO-MATERIALS
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white font-sans uppercase mb-2 sm:mb-3">
              Bio-Circular Matrix
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4 sm:mb-6 font-sans">
              Engineered with hypoallergenic bio-circular polyether elastomer. Skin-friendly, odorless, and resistant to UV, saltwater, and temperature swings.
            </p>
            <div className="space-y-1.5 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                <span>Zero petroleum chemical inputs</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                <span>100% closed-loop recyclable</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stage 5: Complete Product Reveal */}
        <section className="story-trigger-section min-h-screen flex items-end sm:items-center justify-center px-4 sm:px-6 pb-20 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-lg p-6 sm:p-10 rounded-3xl glass-panel-glow border-[#e52328]/40 text-center pointer-events-auto mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e52328]/10 border border-[#e52328]/30 font-mono text-[10px] text-white uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#e52328]" />
              <span>FEEL THE RELIEF®</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-sans uppercase tracking-tight mb-2 sm:mb-3">
              FASON® Orbit Relief // 01
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 sm:mb-8 max-w-sm mx-auto font-sans">
              Ready to decompress? Step into the 3D Studio to inspect your preferred colorway and order your pair.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                href="/product/orbit-slide-01"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#d8ff33] text-black font-mono font-bold text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(204,255,0,0.35)] min-h-[44px]"
              >
                <span>OPEN 3D STUDIO & ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#collection"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs tracking-wider transition-all min-h-[44px]"
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
