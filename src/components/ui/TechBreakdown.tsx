"use client";

import React, { useState } from "react";
import { ModelViewer3D } from "@/components/3d/ModelViewer3D";
import { FLAGSHIP_PRODUCT } from "@/data/products";
import { Hotspot, Colorway } from "@/types/product";
import { Check, Info, Layers, RotateCcw, Sparkles } from "lucide-react";

export const TechBreakdown: React.FC = () => {
  const [selectedColorway, setSelectedColorway] = useState<Colorway>(
    FLAGSHIP_PRODUCT.colorways[0]
  );
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(
    FLAGSHIP_PRODUCT.hotspots[0]
  );
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <section id="specs" className="relative w-full py-28 bg-[#f8f7f4] border-t border-black/8">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8fad88]/15 border border-[#8fad88]/30 font-mono text-[11px] text-[#62925b] uppercase mb-3 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LABORATORY INSPECTION MODE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#14161a] font-sans uppercase tracking-tight">
              Anatomical Architecture
            </h2>
          </div>
          <p className="text-sm text-neutral-600 font-sans max-w-md">
            Click any telemetry pinpoint on the 3D model or choose a specification card below to inspect microscopic bio-engineering details.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: Interactive 3D Model with Hotspots */}
          <div className="lg:col-span-8 h-[480px] sm:h-[580px] rounded-3xl bg-white relative overflow-hidden border border-black/8 shadow-sm">
            {/* Top Bar Floating Controls */}
            <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <span className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur border border-black/10 font-mono text-[11px] text-[#14161a] shadow-sm">
                  MODEL: <span className="text-[#62925b] font-bold">FSN-OR01</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur border border-black/10 font-mono text-[11px] text-neutral-600 shadow-sm">
                  {selectedColorway.name}
                </span>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] transition-colors border shadow-sm ${
                    wireframe
                      ? "bg-[#14161a] text-white border-[#14161a]"
                      : "bg-white/90 text-[#14161a] border-black/10 hover:border-black/25"
                  }`}
                >
                  WIREFRAME
                </button>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] transition-colors border shadow-sm ${
                    autoRotate
                      ? "bg-[#14161a] text-white border-[#14161a]"
                      : "bg-white/90 text-[#14161a] border-black/10 hover:border-black/25"
                  }`}
                >
                  AUTO-SPIN
                </button>
              </div>
            </div>

            {/* The 3D Canvas */}
            <ModelViewer3D
              modelPath={FLAGSHIP_PRODUCT.modelPath}
              fallbackImage={FLAGSHIP_PRODUCT.fallbackImage}
              productName={FLAGSHIP_PRODUCT.name}
              wireframe={wireframe}
              colorwayHex={selectedColorway.modelColor}
              accentColor={selectedColorway.accentColor}
              autoRotate={false}
              enableFloat={false}
              enableControls={true}
              hotspots={FLAGSHIP_PRODUCT.hotspots}
              activeHotspotId={activeHotspot?.id}
              onSelectHotspot={(hs) => setActiveHotspot(hs)}
              className="w-full h-full"
            />

            {/* Bottom HUD Hint */}
            <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-600 bg-white/90 px-3 py-1 rounded-full border border-black/8 shadow-sm">
              <Info className="w-3 h-3 text-[#62925b]" />
              <span>ORBIT: LEFT CLICK + DRAG | ZOOM: SCROLL | PINS: CLICK TO INSPECT</span>
            </div>
          </div>

          {/* Right Column: Active Hotspot Card & Colorway Selector */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Active Hotspot Inspector Card */}
            <div className="p-6 rounded-2xl bg-white border border-black/8 shadow-sm">
              <div className="font-mono text-[10px] tracking-widest text-[#62925b] uppercase mb-1 font-bold">
                FOCUSED SUBSYSTEM //
              </div>
              <h3 className="text-xl font-bold text-[#14161a] font-sans uppercase mb-2">
                {activeHotspot ? activeHotspot.title : "Select an anatomical hotspot"}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-6">
                {activeHotspot
                  ? activeHotspot.description
                  : "Explore the internal architecture and pressure mapping of the slide."}
              </p>

              {/* Hotspot Switcher Buttons */}
              <div className="space-y-2">
                {FLAGSHIP_PRODUCT.hotspots.map((hs) => (
                  <button
                    key={hs.id}
                    onClick={() => setActiveHotspot(hs)}
                    className={`w-full text-left p-3 rounded-xl font-mono text-xs transition-all flex items-center justify-between border ${
                      activeHotspot?.id === hs.id
                        ? "bg-[#8fad88]/15 border-[#8fad88] text-[#14161a] shadow-sm font-bold"
                        : "bg-black/[0.02] border-black/8 text-neutral-600 hover:text-[#14161a] hover:border-black/20"
                    }`}
                  >
                    <span>{hs.title}</span>
                    <span className="text-[10px] text-[#62925b] font-bold">
                      {activeHotspot?.id === hs.id ? "ACTIVE" : "INSPECT"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Colorway Finishes */}
            <div className="p-6 rounded-2xl bg-white border border-black/8 shadow-sm">
              <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-3">
                SELECT FINISH MATRIX //
              </div>
              <div className="grid grid-cols-2 gap-3">
                {FLAGSHIP_PRODUCT.colorways.map((cw) => {
                  const isSelected = selectedColorway.id === cw.id;
                  return (
                    <button
                      key={cw.id}
                      onClick={() => setSelectedColorway(cw)}
                      className={`p-3 rounded-xl flex items-center gap-3 border transition-all text-left ${
                        isSelected
                          ? "bg-[#8fad88]/15 border-[#8fad88] shadow-sm"
                          : "bg-black/[0.02] border-black/8 hover:border-black/20"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/15 flex items-center justify-center shrink-0"
                        style={{ backgroundColor: cw.hex }}
                      >
                        {isSelected && <Check className="w-3 h-3 text-[#14161a]" />}
                      </span>
                      <div className="overflow-hidden">
                        <div className="text-[11px] font-bold text-[#14161a] truncate">
                          {cw.name.split("/")[0]}
                        </div>
                        <div className="text-[9px] font-mono text-neutral-500">
                          {cw.badge}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specification Matrix */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {FLAGSHIP_PRODUCT.specs.map((spec, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white border border-black/8 hover:border-[#8fad88]/40 transition-colors shadow-sm"
            >
              <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-1">
                {spec.label}
              </div>
              <div className="font-mono text-2xl font-black text-[#14161a] mb-1">
                {spec.value}
              </div>
              <div className="text-[11px] text-neutral-500 font-sans leading-tight">
                {spec.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
