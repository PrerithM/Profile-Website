/**
 * LoadingScreen — clean dissolve entrance and exit.
 * "Prerith.M" and "'s Profile" are the same size.
 * Entire screen dissolves in, name slides left, suffix appears, then dissolves out.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef      = useRef<HTMLDivElement>(null);
  const nameRef      = useRef<HTMLSpanElement>(null);
  const suffixRef    = useRef<HTMLSpanElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const wrap      = wrapRef.current;
    const name      = nameRef.current;
    const suffix    = suffixRef.current;
    if (!container || !wrap || !name || !suffix) return;

    // Split suffix chars for staggered reveal
    const rawText = "'s Profile";
    suffix.innerHTML = rawText
      .split("")
      .map((ch) =>
        `<span class="ls-char" style="display:inline-block;opacity:0;transform:translateX(-10px)">${
          ch === " " ? "&nbsp;" : ch
        }</span>`
      )
      .join("");
    const chars = suffix.querySelectorAll<HTMLElement>(".ls-char");

    const tl = gsap.timeline();

    // ── 1. Whole name-row dissolves in ────────────────────────────────────
    tl.fromTo(
      wrap,
      { opacity: 0, filter: "blur(12px) brightness(3)", scale: 1.04 },
      { opacity: 1, filter: "blur(0px) brightness(1)", scale: 1,
        duration: 1.0, ease: "power3.out" },
      0.1
    );

    // ── 2. Name shifts left, suffix chars appear ──────────────────────────
    tl.to(name, { x: -8, duration: 0.55, ease: "power2.inOut" }, 1.3);
    tl.to(
      chars,
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.045, ease: "power2.out" },
      1.4
    );

    // ── 3. Glow pulse ─────────────────────────────────────────────────────
    tl.to(
      wrap,
      { filter: "brightness(1.35) drop-shadow(0 0 28px rgba(200,210,255,0.35))",
        duration: 0.4, ease: "sine.out", yoyo: true, repeat: 1 },
      2.05
    );

    // ── 4. Full screen dissolves out (matching dissolve-in reverse) ───────
    tl.to(
      container,
      { opacity: 0, filter: "blur(6px) brightness(2)", scale: 1.03,
        duration: 0.8, ease: "power3.in",
        onComplete: () => setHidden(true) },
      2.85
    );

    return () => { tl.kill(); };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      aria-hidden="true"
      style={{ willChange: "opacity, filter" }}
    >
      {/* Single row — both at equal size */}
      <div
        ref={wrapRef}
        className="loading-name-row select-none"
        style={{ opacity: 0 }}
      >
        <span ref={nameRef} className="loading-name-base">Prerith.M</span>
        <span ref={suffixRef} className="loading-name-suffix" aria-hidden="true" />
      </div>
    </div>
  );
}
