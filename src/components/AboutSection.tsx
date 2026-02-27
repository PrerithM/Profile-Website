/**
 * AboutSection Component
 * Clean single-column text layout using full space properly.
 * Two-column on desktop: heading+intro left, details+links right.
 */

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const items = content.querySelectorAll<HTMLElement>(".about-animate");
    gsap.set(items, { opacity: 0, y: 24 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(items, {
            opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: "power3.out",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="about-section">
      <div ref={contentRef} className="about-layout">

        {/* ── Top: Name + opening question ── */}
        <div className="about-top">
          <h2 className="about-heading about-animate">Hi, I&apos;m Prerith.M,</h2>
          <p className="about-intro about-animate">
            I&apos;m fascinated by one question —&nbsp;
            <em>Why do some ideas change everything while others disappear?</em>
          </p>
        </div>

        {/* ── Bottom: Two columns of detail ── */}
        <div className="about-cols">

          {/* Col 1 — Strategy */}
          <div className="about-col about-animate">
            <span className="about-col-label">My Strategy & Analysis Side</span>
            <p className="about-body">
              I analyze how great companies win with their strategy, timing,
              calculated risks, and the quiet decisions that shape outcomes.
              Mostly across technology and business.
            </p>
            <a
              href="https://medium.com/@prerithm"
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              Read my case studies on Medium →
            </a>
          </div>

          {/* Col 2 — Building */}
          <div className="about-col about-animate">
            <span className="about-col-label">My Building & Shipping Side</span>
            <p className="about-body">
              I build apps, systems, experiments.Anything that turns
              curiosity into something real. I design, code, test, and ship.
              I learn by figuring things out.
            </p>
            <a
              href="https://github.com/prerithm"
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              See my work on GitHub →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
