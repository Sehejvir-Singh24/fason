"use client";

import React from "react";
import { Environment, ContactShadows } from "@react-three/drei";

interface SceneLightingProps {
  accentColor?: string;
  wireframe?: boolean;
}

export const SceneLighting: React.FC<SceneLightingProps> = ({
  accentColor = "#00f3ff",
  wireframe = false,
}) => {
  return (
    <>
      {/* Studio Environment map for realistic PBR reflections */}
      <Environment preset="city" />

      {/* Main Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Cool Fill Light */}
      <directionalLight position={[-5, 4, -4]} intensity={0.9} color="#94a3b8" />

      {/* Dynamic Cyber Rim Light corresponding to active colorway */}
      <pointLight position={[0, -2, -3]} intensity={wireframe ? 3 : 1.5} color={accentColor} />
      <pointLight position={[3, -1, 3]} intensity={0.8} color={accentColor} />

      {/* Subtle Top Ambient */}
      <ambientLight intensity={0.6} />

      {/* Soft Ground Contact Shadow */}
      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.65}
        scale={6}
        blur={2.4}
        far={3.5}
        color="#000000"
      />
    </>
  );
};
