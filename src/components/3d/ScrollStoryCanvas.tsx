"use client";

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WebGLFallback } from "./WebGLFallback";

// Register ScrollTrigger once on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 5 Story Chapters Transform Targets
export const STORY_STAGES = [
  {
    id: "stage-silhouette",
    title: "01 // ANATOMICAL SILHOUETTE",
    subtitle: "ZERO-STRAIN CONTOUR",
    description: "Sculpted to eliminate plantar pressure points and contour seamlessly to the natural human foot arch.",
    modelPos: [1.0, -0.05, 0] as [number, number, number],
    modelPosMobile: [0, 0.45, 0] as [number, number, number],
    modelRot: [0.25, -0.75, 0.12] as [number, number, number],
    camPos: [0, 0.4, 3.8] as [number, number, number],
    camPosMobile: [0, 0.4, 4.4] as [number, number, number],
    accentColor: "#ccff00",
  },
  {
    id: "stage-upper",
    title: "02 // CRYO-WEAVE SHROUD",
    subtitle: "THERMAL RELIEF",
    description: "Laser-engineered micro-apertures dissipate foot heat and moisture, while dynamic ribs conform gently to dorsal tendons.",
    modelPos: [-0.85, -0.2, 0.4] as [number, number, number],
    modelPosMobile: [0, 0.4, 0.2] as [number, number, number],
    modelRot: [-0.85, 0.35, -0.2] as [number, number, number],
    camPos: [0, 0.6, 3.2] as [number, number, number],
    camPosMobile: [0, 0.6, 3.8] as [number, number, number],
    accentColor: "#00f3ff",
  },
  {
    id: "stage-sole",
    title: "03 // DUAL-LATTICE RELIEF SOLE",
    subtitle: "PLANTAR DECOMPRESSION",
    description: "3D printed hexagonal cells compress under heel strike to eliminate shock, redirecting energy into spring-loaded propulsion.",
    modelPos: [0.85, 0.1, 0.2] as [number, number, number],
    modelPosMobile: [0, 0.45, 0.1] as [number, number, number],
    modelRot: [1.75, 0.4, 0.85] as [number, number, number],
    camPos: [0, 0.2, 3.4] as [number, number, number],
    camPosMobile: [0, 0.3, 4.0] as [number, number, number],
    accentColor: "#e52328",
  },
  {
    id: "stage-materials",
    title: "04 // BIO-POLYMER MATRIX",
    subtitle: "CIRCULAR HEALTH & COMFORT",
    description: "100% bio-circular polyether elastomer. Skin-friendly, hypoallergenic, and ultra-durable with a 148g featherweight footprint.",
    modelPos: [-0.8, -0.1, 0.7] as [number, number, number],
    modelPosMobile: [0, 0.4, 0.3] as [number, number, number],
    modelRot: [0.35, 2.3, -0.15] as [number, number, number],
    camPos: [0, 0.3, 2.9] as [number, number, number],
    camPosMobile: [0, 0.4, 3.6] as [number, number, number],
    accentColor: "#ccff00",
  },
  {
    id: "stage-reveal",
    title: "05 // FEEL THE RELIEF®",
    subtitle: "POST-EXERTION MASTERCLASS",
    description: "Slip in and experience the ultimate biomechanical relief. Step into zero gravity after every workout and long day.",
    modelPos: [0, -0.1, 0] as [number, number, number],
    modelPosMobile: [0, 0.3, 0] as [number, number, number],
    modelRot: [0.2, 6.28, 0] as [number, number, number],
    camPos: [0, 0.4, 3.6] as [number, number, number],
    camPosMobile: [0, 0.4, 4.2] as [number, number, number],
    accentColor: "#e52328",
  },
];

interface StorySceneProps {
  scrollState: React.MutableRefObject<{
    posX: number;
    posY: number;
    posZ: number;
    rotX: number;
    rotY: number;
    rotZ: number;
    camX: number;
    camY: number;
    camZ: number;
  }>;
  wireframe: boolean;
  colorwayHex?: string;
  accentColor: string;
  isMobile: boolean;
}

function StorySceneModel({
  scrollState,
  wireframe,
  colorwayHex,
  accentColor,
  isMobile,
}: StorySceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/slipper-main.glb");

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxDim > 0 ? 2.6 / maxDim : 1;

    clone.position.x = -center.x * scaleFactor;
    clone.position.y = -center.y * scaleFactor;
    clone.position.z = -center.z * scaleFactor;
    clone.scale.setScalar(scaleFactor);

    return clone;
  }, [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.wireframe = wireframe;
          if (colorwayHex) {
            mat.color = new THREE.Color(colorwayHex);
          }
          mesh.material = mat;
        }
      }
    });
  }, [clonedScene, wireframe, colorwayHex]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const s = scrollState.current;

    // Smooth position interpolation
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      s.posX,
      delta * 5
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      s.posY,
      delta * 5
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      s.posZ,
      delta * 5
    );

    // Subtle pointer parallax on desktop only
    const mouseX = isMobile ? 0 : state.pointer.x * 0.18;
    const mouseY = isMobile ? 0 : state.pointer.y * 0.12;

    // Smooth rotation interpolation
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      s.rotX - mouseY,
      delta * 5
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      s.rotY + mouseX,
      delta * 5
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      s.rotZ,
      delta * 5
    );

    // Camera position smoothing
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      s.camX,
      delta * 4
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      s.camY,
      delta * 4
    );
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      s.camZ,
      delta * 4
    );
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.88 : 1.0}>
      {isMobile ? (
        // On mobile skip Float to save GPU cycles
        <primitive object={clonedScene} />
      ) : (
        <Float
          speed={1.6}
          rotationIntensity={0.25}
          floatIntensity={0.5}
          floatingRange={[-0.04, 0.04]}
        >
          <primitive object={clonedScene} />
        </Float>
      )}
    </group>
  );
}

interface ScrollStoryCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  wireframe?: boolean;
  colorwayHex?: string;
  accentColor?: string;
  onStageChange?: (stageIndex: number) => void;
}

export const ScrollStoryCanvas: React.FC<ScrollStoryCanvasProps> = ({
  containerRef,
  wireframe = false,
  colorwayHex,
  accentColor = "#ccff00",
  onStageChange,
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const firstStage = STORY_STAGES[0];
  const initialPos = isMobile ? firstStage.modelPosMobile : firstStage.modelPos;
  const initialCam = isMobile ? firstStage.camPosMobile : firstStage.camPos;

  const scrollState = useRef({
    posX: initialPos[0],
    posY: initialPos[1],
    posZ: initialPos[2],
    rotX: firstStage.modelRot[0],
    rotY: firstStage.modelRot[1],
    rotZ: firstStage.modelRot[2],
    camX: initialCam[0],
    camY: initialCam[1],
    camZ: initialCam[2],
  });

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const ok = Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setHasWebGL(ok);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Hook up GSAP ScrollTrigger
  useEffect(() => {
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll<HTMLElement>(".story-trigger-section");
    if (!sections.length) return;

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          onUpdate: (self) => {
            const rawProgress = self.progress * (STORY_STAGES.length - 1);
            const activeIndex = Math.min(
              Math.floor(rawProgress + 0.35),
              STORY_STAGES.length - 1
            );
            if (onStageChange) {
              onStageChange(activeIndex);
            }
          },
        },
      });

      for (let i = 0; i < STORY_STAGES.length - 1; i++) {
        const next = STORY_STAGES[i + 1];
        const nextPos = isMobile ? next.modelPosMobile : next.modelPos;
        const nextCam = isMobile ? next.camPosMobile : next.camPos;

        masterTl.to(
          scrollState.current,
          {
            posX: nextPos[0],
            posY: nextPos[1],
            posZ: nextPos[2],
            rotX: next.modelRot[0],
            rotY: next.modelRot[1],
            rotZ: next.modelRot[2],
            camX: nextCam[0],
            camY: nextCam[1],
            camZ: nextCam[2],
            ease: "power2.inOut",
            duration: 1,
          },
          i
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, onStageChange, isMobile]);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <WebGLFallback />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          shadows={!isMobile}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: !isMobile,
            powerPreference: isMobile ? "default" : "high-performance",
            alpha: true,
          }}
          camera={{
            position: initialCam,
            fov: isMobile ? 48 : 45,
            near: 0.1,
            far: 50,
          }}
          className="w-full h-full"
        >
          {/* Lighting — lighter on mobile */}
          {isMobile ? (
            <>
              <ambientLight intensity={1.2} />
              <directionalLight position={[4, 6, 4]} intensity={2.0} />
              <pointLight position={[0, -2, -3]} intensity={1.5} color={accentColor} />
            </>
          ) : (
            <>
              <ambientLight intensity={0.7} />
              <directionalLight position={[6, 9, 6]} intensity={2.2} castShadow />
              <directionalLight position={[-6, 4, -4]} intensity={0.9} color="#94a3b8" />
              <pointLight position={[0, -2, -3]} intensity={2} color={accentColor} />
              {/* Cheap fake shadow plane (desktop only) */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
                <planeGeometry args={[14, 14]} />
                <shadowMaterial opacity={0.35} />
              </mesh>
            </>
          )}

          <StorySceneModel
            scrollState={scrollState}
            wireframe={wireframe}
            colorwayHex={colorwayHex}
            accentColor={accentColor}
            isMobile={isMobile}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};
