/**
 * GearFragment Component
 * Decorative animated gear rendered in a small canvas
 * Used in the About section right column.
 */

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { GEAR_MATERIAL, MODEL_PATHS, LIGHTING } from "@/lib/constants";
import { Environment } from "@react-three/drei";
import GearModel from "./GearModel";

function RotatingGear() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    // Slow gentle tilt oscillation
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
  });

  return (
    <group ref={groupRef} scale={1.2}>
      <GearModel modelPath={MODEL_PATHS.GEAR_CENTRAL} materialProps={GEAR_MATERIAL} />
    </group>
  );
}

export default function GearFragment() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="gear-fragment-canvas">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Environment files={LIGHTING.HDRI_PATH} background={false} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} />
          <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#c8d0ff" />
          <ambientLight intensity={0.3} />
          <RotatingGear />
        </Suspense>
      </Canvas>
    </div>
  );
}
