"use client";

import React from "react";
import { Environment, ContactShadows } from "@react-three/drei";

interface SceneLightingProps {
  accentColor?: string;
  wireframe?: boolean;
}

export const SceneLighting: React.FC<SceneLightingProps> = ({
  accentColor = "#8fad88",
  wireframe = false,
}) => {
  return (
    <>
      {/* Studio Environment map for realistic PBR reflections */}
      <Environment preset="city" />

      {/* Main Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Soft Studio Fill Light */}
      <directionalLight position={[-5, 4, -4]} intensity={0.9} color="#f8f7f4" />

      {/* Dynamic Pastel Rim Light corresponding to active colorway */}
      <pointLight position={[0, -2, -3]} intensity={wireframe ? 2.5 : 1.2} color={accentColor} />
      <pointLight position={[3, -1, 3]} intensity={0.7} color={accentColor} />

      {/* Crisp Ambient Light */}
      <ambientLight intensity={1.1} />

      {/* Soft Studio Ground Contact Shadow for Light Floor */}
      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.22}
        scale={6}
        blur={2.4}
        far={3.5}
        color="#2c3038"
      />
    </>
  );
};
