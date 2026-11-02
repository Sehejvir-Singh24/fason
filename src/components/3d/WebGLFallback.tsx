"use client";

import React from "react";
import Image from "next/image";
import { AlertCircle, RefreshCw } from "lucide-react";

interface WebGLFallbackProps {
  imageSrc?: string;
  productName?: string;
  reason?: string;
  onRetry?: () => void;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  imageSrc = "/images/slipper-fallback.jpg",
  productName = "AERIX Orbit Slide // 01",
  reason = "Hardware acceleration or WebGL 2.0 unavailable on this graphics device",
  onRetry,
}) => {
  return (
    <div className="relative w-full h-full min-h-[420px] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#0b0f17] to-[#06080c] rounded-2xl border border-white/10 overflow-hidden">
      {/* Background Cyber Glow & Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Preview Image */}
      <div className="relative z-10 w-full max-w-md aspect-[4/3] flex items-center justify-center rounded-xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl group">
        <Image
          src={imageSrc}
          alt={productName}
          fill
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur border border-white/10 text-[10px] tracking-widest uppercase font-mono text-cyan-400">
          2D Telemetry Preview
        </div>
      </div>

      {/* Notice Banner */}
      <div className="relative z-10 mt-6 max-w-md w-full p-4 rounded-xl glass-panel text-center">
        <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-mono mb-1.5 uppercase tracking-wider">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          WebGL Safe Mode Engaged
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-3">
          {reason}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Re-initialize 3D Context
          </button>
        )}
      </div>
    </div>
  );
};
