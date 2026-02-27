/**
 * HeroScene Component
 * Full-screen 3D gear canvas.
 * Scroll button centered at bottom with label.
 */

"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const GearSystem = dynamic(() => import("./GearSystem"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 border border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  ),
});

export default function HeroScene({ levaStore }: { levaStore: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScrollAnimation();

  const scrollFraction = Math.min(scrollY / 600, 1);
  const heroOpacity = 1 - scrollFraction * 0.85;
  const gearScale = 1 + scrollFraction * 0.1;
  const blurPx = scrollFraction * 6;

  const handleScrollDown = () => {
    const container = document.querySelector(".snap-container");
    if (!container) return;
    container.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black overflow-hidden"
      style={{ opacity: heroOpacity }}
    >
      {/* Dark radial glow background */}
      <div className="absolute inset-0 hero-bg pointer-events-none" />

      {/* 3D canvas — shifted up 2% */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "-2%",
          bottom: "10%",
          transform: `scale(${gearScale})`,
          filter: `blur(${blurPx}px)`,
          transformOrigin: "center 45%",
        }}
      >
        <GearSystem levaStore={levaStore} />
      </div>

      {/* Gradient blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      {/* Scroll down — centered at bottom with label */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 bg-transparent border-none cursor-pointer p-2 group"
        style={{
          opacity: Math.max(0, 1 - scrollFraction * 3),
          pointerEvents: scrollFraction > 0.9 ? "none" : "auto",
        }}
        aria-label="Scroll to next section"
      >
        <span className="text-[0.65rem] tracking-[0.22em] uppercase text-white/35 font-light group-hover:text-white/60 transition-colors">
          scroll down
        </span>
        <div className="scroll-chevron-wrap">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 7L10 13L16 7"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
