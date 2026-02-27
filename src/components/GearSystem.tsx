/**
 * GearSystem Component — with Leva dev controls
 *
 * Receives levaStore as a prop from Home -> HeroScene.
 * This ensures the control panel (LevaPanel) can be mounted
 * in the root DOM, escaping HeroScene's blur/scale effects.
 */

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { OrbitControls } from "@react-three/drei";
import { ANIMATION_TIMELINE } from "@/lib/animationTimeline";
import { GEAR_MATERIAL, MODEL_PATHS } from "@/lib/constants";
import GearModel from "./GearModel";
import GearEnvironment from "./GearEnvironment";

// ── Types ──────────────────────────────────────────────────────────────────

interface GearProps {
  modelPath: string;
  finalPosition: [number, number, number];
  scale: number;
  entranceDelay: number;
  isSideGear?: boolean;
  rotationDirection?: 1 | -1;
  gearRatio?: number;
  rotationSpeed?: number;
  materialProps?: any;
}

// ── Animated Gear ──────────────────────────────────────────────────────────

function AnimatedGear({
  modelPath,
  finalPosition,
  scale,
  entranceDelay,
  isSideGear = false,
  rotationDirection = 1,
  gearRatio = 1.33,
  rotationSpeed = ANIMATION_TIMELINE.ROTATION_SPEED,
  materialProps,
}: GearProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const spinRef   = useRef<THREE.Group>(null!);
  const entranceDone = useRef(false);
  const currentAngle = useRef(0);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Set final position immediately — no sliding, no scaling
    group.position.set(...finalPosition);
    group.scale.setScalar(scale);

    const startTime = performance.now() + entranceDelay * 1000;
    const duration  = 1400;
    let animFrame: number;

    function animate(now: number) {
      if (now < startTime) { animFrame = requestAnimationFrame(animate); return; }
      const t      = Math.min((now - startTime) / duration, 1);
      const eased  = 1 - Math.pow(1 - t, 4);

      // Dissolve: traverse meshes and animate material opacity
      group.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          const mat = mesh.material as THREE.MeshPhysicalMaterial;
          if (mat) mat.opacity = eased;
        }
      });

      if (t < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        group.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            const mat = mesh.material as THREE.MeshPhysicalMaterial;
            if (mat) mat.opacity = 1;
          }
        });
        entranceDone.current = true;
      }
    }

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useFrame(() => {
    if (!groupRef.current || !spinRef.current) return;

    // Lock position after entrance completes
    if (entranceDone.current) {
      groupRef.current.position.set(...finalPosition);
      groupRef.current.scale.setScalar(scale);

      // Spin on own axis once entrance is done
      const speed = rotationSpeed * (isSideGear ? gearRatio : 1);
      currentAngle.current += speed * (1 / 60) * rotationDirection;
      spinRef.current.rotation.y = currentAngle.current;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={spinRef}>
        <GearModel modelPath={modelPath} materialProps={materialProps} />
      </group>
    </group>
  );
}

// ── Lights ─────────────────────────────────────────────────────────────────

function Lights({
  ambientIntensity,
  keyIntensity,
  rimIntensity,
}: {
  ambientIntensity: number;
  keyIntensity: number;
  rimIntensity: number;
}) {
  return (
    <>
      <directionalLight position={[5, 10, 7]} intensity={keyIntensity} castShadow />
      <directionalLight position={[-6, 4, -4]} intensity={rimIntensity} color="#c8d0ff" />
      <directionalLight position={[0, -5, 5]} intensity={0.3} color="#ffffff" />
      <ambientLight intensity={ambientIntensity} />
    </>
  );
}

function GearSceneFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshBasicMaterial color="#222222" />
    </mesh>
  );
}

// ── Scene inner ────────────────────────────────────────────────────────────

function GearScene({ levaStore }: { levaStore: any }) {
  const opts = { store: levaStore };

  const { enableOrbit, autoRotate, rotateSpeed } = useControls("Cinematic", {
    enableOrbit: { value: false, label: "Enable Orbit" },
    autoRotate:  { value: false, label: "Auto Rotate", render: (get) => get("Cinematic.enableOrbit") },
    rotateSpeed: { value: 2.0,   min: 0, max: 10, step: 0.1, label: "Rotate Speed", render: (get) => get("Cinematic.enableOrbit") && get("Cinematic.autoRotate") },
  }, opts);

  const { camX, camY, camZ, camFov, lookAtX, lookAtY, lookAtZ } = useControls("Camera", {
    camX:    { value: 4.10,  min: -30, max: 30, step: 0.01, label: "Position X",  disabled: enableOrbit },
    camY:    { value: 12.51, min: -30, max: 30, step: 0.01, label: "Position Y",  disabled: enableOrbit },
    camZ:    { value: 10.35, min: 2,   max: 30, step: 0.01, label: "Position Z",  disabled: enableOrbit },
    camFov:  { value: 38,    min: 20,  max: 90, step: 1,    label: "FOV",          disabled: enableOrbit },
    lookAtX: { value: 0,     min: -20, max: 20, step: 0.01, label: "Look At X",   disabled: enableOrbit },
    lookAtY: { value: 0,     min: -20, max: 20, step: 0.01, label: "Look At Y",   disabled: enableOrbit },
    lookAtZ: { value: 0,     min: -20, max: 20, step: 0.01, label: "Look At Z",   disabled: enableOrbit },
  }, opts);

  const center = useControls("Center Gear", {
    cx:     { value: 0,    min: -5,  max: 5,  step: 0.01, label: "X" },
    cy:     { value: 0,    min: -5,  max: 5,  step: 0.01, label: "Y" },
    cz:     { value: 0,    min: -5,  max: 5,  step: 0.01, label: "Z" },
    cScale: { value: 0.1,  min: 0.01, max: 2,  step: 0.001, label: "Scale" },
  }, opts);

  const left = useControls("Left Gear", {
    lx:     { value: -5,    min: -15,  max: 0,  step: 0.1,  label: "X" },
    ly:     { value: 1,     min: -10,  max: 10, step: 0.1,  label: "Y" },
    lz:     { value: 2,     min: -10,  max: 10, step: 0.1,  label: "Z" },
    lScale: { value: 0.1,   min: 0.01, max: 2,  step: 0.001, label: "Scale" },
  }, opts);

  const right = useControls("Right Gear", {
    rx:     { value: 5,     min: 0,    max: 15, step: 0.1,  label: "X" },
    ry:     { value: 1,     min: -10,  max: 10, step: 0.1,  label: "Y" },
    rz:     { value: -2,    min: -10,  max: 10, step: 0.1,  label: "Z" },
    rScale: { value: 0.1,   min: 0.01, max: 2,  step: 0.001, label: "Scale" },
  }, opts);

  const materialSettings = useControls("Material", {
    color:              { value: "#c8c8d8", label: "Color" },
    roughness:          { value: 0.03, min: 0, max: 1, step: 0.01,   label: "Roughness" },
    transmission:       { value: 1,    min: 0, max: 1, step: 0.01,   label: "Transmission" },
    thickness:          { value: 1.5,  min: 0, max: 10, step: 0.1,   label: "Thickness" },
    ior:                { value: 1.45, min: 1, max: 2.33, step: 0.01, label: "IOR" },
    opacity:            { value: 1,    min: 0, max: 1, step: 0.01,   label: "Opacity" },
    clearcoat:          { value: 1,    min: 0, max: 1, step: 0.01,   label: "Clearcoat" },
    clearcoatRoughness: { value: 0.03, min: 0, max: 1, step: 0.01,   label: "Clearcoat Rough." },
    envMapIntensity:    { value: 1.5,  min: 0, max: 5, step: 0.1,    label: "Env Map Intensity" },
  }, opts);

  const { rotSpeed, gearRatio } = useControls("Rotation", {
    rotSpeed:  { value: ANIMATION_TIMELINE.ROTATION_SPEED, min: 0,   max: 2, step: 0.01, label: "Speed" },
    gearRatio: { value: 1.33,                              min: 0.5, max: 3, step: 0.01, label: "Side Gear Ratio" },
  }, opts);

  const { ambientIntensity, keyIntensity, rimIntensity } = useControls("Lighting", {
    ambientIntensity: { value: 1.55, min: 0, max: 5, step: 0.05, label: "Ambient" },
    keyIntensity:     { value: 1.2,  min: 0, max: 5, step: 0.1,  label: "Key Light" },
    rimIntensity:     { value: 4.6,  min: 0, max: 10, step: 0.1,  label: "Rim Light" },
  }, opts);

  // Live camera state monitor — read-only, updates every frame
  const [, setCamState] = useControls("📷 Cam State (Live)", () => ({
    posX: { value: 0, disabled: true, label: "Pos X" },
    posY: { value: 0, disabled: true, label: "Pos Y" },
    posZ: { value: 0, disabled: true, label: "Pos Z" },
  }), opts);

  // Apply camera every frame — use lookAt so it always faces the target cleanly
  useFrame(({ camera }) => {
    if (!enableOrbit) {
      camera.position.set(camX, camY, camZ);
      (camera as THREE.PerspectiveCamera).fov = camFov;
      camera.lookAt(lookAtX, lookAtY, lookAtZ);
      camera.updateProjectionMatrix();
    }
    // Always update live monitor
    setCamState({
      posX: parseFloat(camera.position.x.toFixed(3)),
      posY: parseFloat(camera.position.y.toFixed(3)),
      posZ: parseFloat(camera.position.z.toFixed(3)),
    });
  });

  return (
    <>
      <GearEnvironment />
      <Lights
        ambientIntensity={ambientIntensity}
        keyIntensity={keyIntensity}
        rimIntensity={rimIntensity}
      />

      {enableOrbit && (
        <OrbitControls 
          makeDefault 
          autoRotate={autoRotate} 
          autoRotateSpeed={rotateSpeed} 
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
        />
      )}

      {/* Center Gear */}
      <AnimatedGear
        modelPath={MODEL_PATHS.GEAR_CENTRAL}
        finalPosition={[center.cx, center.cy, center.cz]}
        scale={center.cScale}
        entranceDelay={ANIMATION_TIMELINE.GEAR_ENTRANCE_DELAY}
        isSideGear={false}
        rotationDirection={1}
        rotationSpeed={rotSpeed}
        gearRatio={gearRatio}
        materialProps={materialSettings}
      />

      {/* Left Gear */}
      <AnimatedGear
        modelPath={MODEL_PATHS.GEAR_EXTERNAL}
        finalPosition={[left.lx, left.ly, left.lz]}
        scale={left.lScale}
        entranceDelay={ANIMATION_TIMELINE.GEAR_ENTRANCE_DELAY + ANIMATION_TIMELINE.GEAR_ENTRANCE_SIDE_STAGGER}
        isSideGear={true}
        rotationDirection={-1}
        rotationSpeed={rotSpeed}
        gearRatio={gearRatio}
        materialProps={materialSettings}
      />

      {/* Right Gear */}
      <AnimatedGear
        modelPath={MODEL_PATHS.GEAR_EXTERNAL}
        finalPosition={[right.rx, right.ry, right.rz]}
        scale={right.rScale}
        entranceDelay={ANIMATION_TIMELINE.GEAR_ENTRANCE_DELAY + ANIMATION_TIMELINE.GEAR_ENTRANCE_SIDE_STAGGER}
        isSideGear={true}
        rotationDirection={-1}
        rotationSpeed={rotSpeed}
        gearRatio={gearRatio}
        materialProps={materialSettings}
      />
    </>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export default function GearSystem({ levaStore }: { levaStore: any }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);
  if (!mounted) return null;

  return (
    <div
      className="w-full h-full absolute inset-0"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 2.2s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        shadows
        dpr={[1, 2]}
      >
        <Suspense fallback={<GearSceneFallback />}>
          <GearScene levaStore={levaStore} />
        </Suspense>
      </Canvas>
    </div>
  );
}
