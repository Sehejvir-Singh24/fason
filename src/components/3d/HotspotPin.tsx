"use client";

import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { Hotspot } from "@/types/product";

interface HotspotPinProps {
  hotspot: Hotspot;
  active: boolean;
  onClick: () => void;
}

export const HotspotPin: React.FC<HotspotPinProps> = ({ hotspot, active, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={hotspot.position}>
      <Html center distanceFactor={8} zIndexRange={[100, 0]}>
        <div className="relative group select-none">
          {/* Pulsing indicator ring */}
          <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 focus:outline-none ${
              active
                ? "bg-[#ccff00] text-black scale-110 shadow-[0_0_20px_#ccff00]"
                : "bg-black/80 text-white border border-white/30 hover:border-[#ccff00] hover:text-[#ccff00]"
            }`}
          >
            <span
              className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                active ? "bg-[#ccff00]/60" : "bg-white/20"
              }`}
            />
            <span className="relative font-mono text-[11px] font-bold">
              {active ? "✕" : "+"}
            </span>
          </button>

          {/* Expanded info tooltip */}
          {(active || hovered) && (
            <div className="absolute left-10 top-1/2 -translate-y-1/2 w-64 p-3 rounded-xl bg-[#0b0f17]/95 backdrop-blur-md border border-[#ccff00]/30 shadow-2xl pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-200">
              <div className="text-[10px] font-mono tracking-widest text-[#ccff00] uppercase mb-1 flex items-center justify-between">
                <span>SPEC PIN //</span>
                <span>{hotspot.id}</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans tracking-wide mb-1">
                {hotspot.title}
              </h4>
              <p className="text-[11px] text-neutral-300 leading-snug">
                {hotspot.description}
              </p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};
