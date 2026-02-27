/**
 * ContactSection Component
 * Fills its snap-section container (snap-section--last).
 * Fixed header is 64px so flex column with contact content + footer works.
 */

"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { CONTENT } from "@/lib/constants";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    gsap.set(content, { opacity: 0, y: 40 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTENT.EMAIL);
    } catch {
      const el = document.createElement("textarea");
      el.value = CONTENT.EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand?.("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    /* flex-1 so this fills all height above footer inside snap-section--last */
    <div className="contact-section">
      <div ref={contentRef} className="contact-inner">
        <div className="contact-line" />

        <p className="contact-tagline">
          If you&apos;re working on something ambitious, curious, or meaningful
          — I&apos;d love to hear about it.
        </p>

        <div className="contact-email-wrap">
          <button
            id="copy-email-btn"
            onClick={handleCopyEmail}
            className={`contact-email-btn ${copied ? "contact-email-btn--copied" : ""}`}
            aria-label="Click to copy email address"
          >
            <span className="contact-email-text">{CONTENT.EMAIL}</span>
            <span
              className={`contact-copy-hint ${copied ? "contact-copy-hint--visible" : ""}`}
            >
              {copied ? "✓ Copied!" : "Click to copy"}
            </span>
          </button>
        </div>

        <div className="contact-line" />

      </div>
    </div>
  );
}
