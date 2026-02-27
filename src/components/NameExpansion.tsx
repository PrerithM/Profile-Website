/**
 * NameExpansion Component
 * Shows "Prerith.M 's Profile" — simply fades in after loading screen exits.
 * No character animation here (loading screen handles that).
 */

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NameExpansion() {
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = nameRef.current;
    if (!name) return;

    // Simple fade-in after loading screen exits (~3.5s total)
    gsap.fromTo(
      name,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        delay: 3.2,
      }
    );

    // Subtle continuous shimmer
    gsap.to(name, {
      filter: "brightness(1.15) drop-shadow(0 0 10px rgba(255,255,255,0.15))",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 4.2,
    });

    return () => { gsap.killTweensOf(name); };
  }, []);

  return (
    <div className="text-center select-none pointer-events-none">
      <div ref={nameRef} className="hero-name" style={{ opacity: 0 }}>
        Prerith.M &apos;s Profile
      </div>
    </div>
  );
}
