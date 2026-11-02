"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { SlipperModel } from "./SlipperModel";
import { SceneLighting } from "./SceneLighting";
import { WebGLFallback } from "./WebGLFallback";
import { HotspotPin } from "./HotspotPin";
import { Hotspot } from "@/types/product";

// Detect mobile so we can aggressively reduce rendering cost
function getIsMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
}

interface ModelViewer3DProps {
  modelPath?: string;
  fallbackImage?: string;
  productName?: string;
  wireframe?: boolean;
  colorwayHex?: string;
  accentColor?: string;
  autoRotate?: boolean;
  rotateSpeed?: number;
  enableControls?: boolean;
  enableFloat?: boolean;
  floatIntensity?: number;
  rotationIntensity?: number;
  enableMouseTilt?: boolean;
  modelScale?: number;
  cameraPosition?: [number, number, number];
  hotspots?: Hotspot[];
  activeHotspotId?: string | null;
  onSelectHotspot?: (hotspot: Hotspot) => void;
  className?: string;
}

// Check WebGL availability
function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// 3D Loading Fallback with animated telemetry
function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07090e]/90 backdrop-blur-md z-20">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#ccff00] animate-spin" />
        <div className="w-8 h-8 rounded-full bg-[#ccff00]/20 animate-pulse" />
      </div>
      <p className="mt-4 text-xs font-mono tracking-widest text-[#ccff00] uppercase">
        Compiling 3D Geometry...
      </p>
      <div className="w-32 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
        <div className="h-full bg-[#ccff00] animate-[pulse_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({
  modelPath = "/models/slipper-main.glb",
  fallbackImage = "/images/slipper-fallback.jpg",
  productName = "AERIX Orbit Slide // 01",
  wireframe = false,
  colorwayHex,
  accentColor = "#ccff00",
  autoRotate = false,
  rotateSpeed = 0.8,
  enableControls = true,
  enableFloat = true,
  floatIntensity = 0.6,
  rotationIntensity = 0.3,
  enableMouseTilt = true,
  modelScale = 1.0,
  cameraPosition = [0, 0.4, 3.8],
  hotspots = [],
  activeHotspotId = null,
  onSelectHotspot,
  className = "w-full h-full min-h-[400px]",
}) => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    setMounted(true);
    setHasWebGL(isWebGLAvailable());
    setIsMobile(getIsMobile());
  }, []);

  // WebGL Fallback if not available on user hardware
  if (mounted && !hasWebGL) {
    return (
      <WebGLFallback
        imageSrc={fallbackImage}
        productName={productName}
        onRetry={() => setHasWebGL(isWebGLAvailable())}
      />
    );
  }

  return (
    <div className={`relative ${className} select-none overflow-hidden`}>
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          shadows={!isMobile}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: !isMobile,
            powerPreference: isMobile ? "default" : "high-performance",
            alpha: true,
          }}
          camera={{
            position: cameraPosition,
            fov: 45,
            near: 0.1,
            far: 50,
          }}
          className="w-full h-full touch-none"
        >
          {/* Lighting Rig */}
          <SceneLighting accentColor={accentColor} wireframe={wireframe} />

          {/* Model with optional floating levitation (reduced on mobile) */}
          {enableFloat ? (
            <Float
              speed={isMobile ? 1 : 2}
              rotationIntensity={isMobile ? 0 : rotationIntensity}
              floatIntensity={isMobile ? 0.2 : floatIntensity}
              floatingRange={isMobile ? [-0.03, 0.03] : [-0.08, 0.08]}
            >
              <SlipperModel
                modelPath={modelPath}
                wireframe={wireframe}
                colorwayHex={colorwayHex}
                autoRotate={autoRotate}
                rotateSpeed={rotateSpeed}
                enableMouseTilt={enableMouseTilt}
                modelScale={modelScale}
              />
              {/* Hotspots */}
              {hotspots.map((hs) => (
                <HotspotPin
                  key={hs.id}
                  hotspot={hs}
                  active={activeHotspotId === hs.id}
                  onClick={() => onSelectHotspot && onSelectHotspot(hs)}
                />
              ))}
            </Float>
          ) : (
            <>
              <SlipperModel
                modelPath={modelPath}
                wireframe={wireframe}
                colorwayHex={colorwayHex}
                autoRotate={autoRotate}
                rotateSpeed={rotateSpeed}
                enableMouseTilt={enableMouseTilt}
                modelScale={modelScale}
              />
              {hotspots.map((hs) => (
                <HotspotPin
                  key={hs.id}
                  hotspot={hs}
                  active={activeHotspotId === hs.id}
                  onClick={() => onSelectHotspot && onSelectHotspot(hs)}
                />
              ))}
            </>
          )}

          {/* Interactive Camera Orbit Controls */}
          {enableControls && (
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom={true}
              minDistance={2.0}
              maxDistance={6.0}
              autoRotate={autoRotate}
              autoRotateSpeed={rotateSpeed}
              maxPolarAngle={Math.PI / 1.75}
              minPolarAngle={Math.PI / 6}
              dampingFactor={0.06}
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
};
