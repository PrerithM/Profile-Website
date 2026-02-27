/**
 * useGearPhysics Hook
 * Manages gear micro-oscillations and ripple effects
 */

import { useRef, useEffect } from "react";
import { Group } from "three";
import gsap from "gsap";

export function useGearPhysics(gearRef: React.RefObject<Group>) {
  const wobbleRange = useRef(0.03); // Small angle for wobble

  const applyWobble = () => {
    if (!gearRef.current) return;

    const mesh = gearRef.current;

    gsap.to(mesh.rotation, {
      x: Math.random() * wobbleRange.current - wobbleRange.current / 2,
      y: Math.random() * wobbleRange.current - wobbleRange.current / 2,
      z: Math.random() * wobbleRange.current - wobbleRange.current / 2,
      duration: 0.6,
      ease: "sine.inOut",
      repeat: 0,
    });
  };

  const applyRipple = (intensity = 1) => {
    if (!gearRef.current) return;

    const mesh = gearRef.current;

    // Simple scale pulse for ripple effect
    gsap.to(mesh.scale, {
      x: 1 + 0.02 * intensity,
      y: 1 + 0.02 * intensity,
      z: 1 + 0.02 * intensity,
      duration: 0.5,
      ease: "back.out",
      yoyo: true,
      repeat: 0,
    });
  };

  return { applyWobble, applyRipple };
}
