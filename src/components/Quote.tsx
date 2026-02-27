/**
 * Quote Component
 * Multi-line glass-letter reveal — feels like a real quote.
 * Letters dissolve in with a bloom/refraction effect.
 */

"use client";

import { useEffect, useRef } from "react";
import { CONTENT } from "@/lib/constants";

export default function Quote() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const letters = containerRef.current.querySelectorAll<HTMLElement>(".ql");

    letters.forEach((el, i) => {
      el.animate(
        [
          { opacity: 0, transform: "translateY(10px)", filter: "blur(4px) brightness(2.5)" },
          { opacity: 1, transform: "translateY(0)",    filter: "blur(0px) brightness(1)"   },
        ],
        {
          duration: 500,
          delay: 2400 + i * 30,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        }
      );
    });
  }, []);

  const chars = CONTENT.QUOTE.split("");

  return (
    <div ref={containerRef} className="quote-container">
      <p className="quote-text-glass" role="blockquote">
        {chars.map((char, i) =>
          char === " " ? (
            <span key={i} className="ql ql-space" style={{ opacity: 0 }}>&nbsp;</span>
          ) : (
            <span key={i} className="ql" style={{ opacity: 0 }}>{char}</span>
          )
        )}
      </p>
    </div>
  );
}
