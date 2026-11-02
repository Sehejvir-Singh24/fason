"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface SlipperModelProps {
  modelPath?: string;
  wireframe?: boolean;
  colorwayHex?: string;
  autoRotate?: boolean;
  rotateSpeed?: number;
  enableMouseTilt?: boolean;
  modelScale?: number;
  targetRotation?: [number, number, number];
  targetPosition?: [number, number, number];
}

export const SlipperModel: React.FC<SlipperModelProps> = ({
  modelPath = "/models/slipper-main.glb",
  wireframe = false,
  colorwayHex,
  autoRotate = false,
  rotateSpeed = 0.5,
  enableMouseTilt = true,
  modelScale = 1.0,
  targetRotation,
  targetPosition,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshGroupRef = useRef<THREE.Group>(null);

  // Load the actual GLB model
  const { scene } = useGLTF(modelPath);

  // Clone scene so multiple viewers don't conflict
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    // Auto-center geometry around origin
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // Normalize scale so longest dimension is approx 2.6 units
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxDim > 0 ? 2.6 / maxDim : 1;

    clone.position.x = -center.x * scaleFactor;
    clone.position.y = -center.y * scaleFactor;
    clone.position.z = -center.z * scaleFactor;
    clone.scale.setScalar(scaleFactor);

    return clone;
  }, [scene]);

  // Handle wireframe & material color adjustments
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

  // Frame update for smooth continuous rotation & mouse parallax tilt
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // 1. Mouse movement response (subtle tilt)
    if (enableMouseTilt) {
      const mouseX = state.pointer.x * 0.35;
      const mouseY = state.pointer.y * 0.25;

      if (meshGroupRef.current) {
        meshGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          meshGroupRef.current.rotation.y,
          mouseX,
          delta * 4
        );
        meshGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          meshGroupRef.current.rotation.x,
          -mouseY,
          delta * 4
        );
      }
    }

    // 2. Slow continuous auto-rotation if enabled
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * rotateSpeed;
    }

    // 3. Smooth interpolation to target position and rotation if controlled externally
    if (targetPosition) {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetPosition[0],
        delta * 3
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetPosition[1],
        delta * 3
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        targetPosition[2],
        delta * 3
      );
    }

    if (targetRotation && !autoRotate) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation[0],
        delta * 3
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation[1],
        delta * 3
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetRotation[2],
        delta * 3
      );
    }
  });

  return (
    <group ref={groupRef} scale={modelScale}>
      <group ref={meshGroupRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
};

