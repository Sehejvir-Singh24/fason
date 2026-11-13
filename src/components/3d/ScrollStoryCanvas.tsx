"use client";

import React, { useRef, useMemo, useEffect, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { STORY_STAGES } from "@/data/story";

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
  isMobile: boolean;
  onReady?: () => void;
}

function StorySceneModel({
  scrollState,
  wireframe,
  colorwayHex,
  isMobile,
  onReady,
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

  const rendered = useRef(false);
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (rendered.current) onReady?.();
    rendered.current = true;
    delta = Math.min(delta, 0.1);
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
  isMobile: boolean;
  active: boolean;
  onReady: () => void;
  onFailure: () => void;
}

export const ScrollStoryCanvas: React.FC<ScrollStoryCanvasProps> = ({
  containerRef,
  wireframe = false,
  colorwayHex,
  accentColor = "#ccff00",
  onStageChange,
  isMobile,
  active,
  onReady,
  onFailure,
}) => {
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

  // Hook up GSAP ScrollTrigger
  useEffect(() => {
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll<HTMLElement>(".story-trigger-section");
    if (!sections.length) return;

    Object.assign(scrollState.current, {
      posX: initialPos[0], posY: initialPos[1], posZ: initialPos[2],
      rotX: firstStage.modelRot[0], rotY: firstStage.modelRot[1], rotZ: firstStage.modelRot[2],
      camX: initialCam[0], camY: initialCam[1], camZ: initialCam[2],
    });
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
      masterTl.scrollTrigger?.refresh();
      masterTl.progress(masterTl.scrollTrigger?.progress ?? 0);
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, onStageChange, isMobile, firstStage, initialPos, initialCam]);

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          frameloop={active ? "always" : "never"}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", onFailure, { once: true });
          }}
          shadows={!isMobile}
          dpr={isMobile ? [1, 1.25] : [1, 2]}
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
          {/* Studio Lighting for light neutral theme */}
          {isMobile ? (
            <>
              <ambientLight intensity={1.5} />
              <directionalLight position={[4, 6, 4]} intensity={2.2} />
              <pointLight position={[0, -2, -3]} intensity={1.0} color={accentColor} />
            </>
          ) : (
            <>
              <ambientLight intensity={1.2} />
              <directionalLight position={[6, 9, 6]} intensity={2.4} castShadow />
              <directionalLight position={[-6, 4, -4]} intensity={0.8} color="#f2f0eb" />
              <pointLight position={[0, -2, -3]} intensity={1.2} color={accentColor} />
              {/* Soft studio floor contact shadow */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
                <planeGeometry args={[14, 14]} />
                <shadowMaterial opacity={0.12} />
              </mesh>
            </>
          )}

          <StorySceneModel
            scrollState={scrollState}
            wireframe={wireframe}
            colorwayHex={colorwayHex}
            isMobile={isMobile}
            onReady={onReady}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export function clearStoryModelCache() {
  useGLTF.clear("/models/slipper-main.glb");
}
