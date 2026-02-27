/**
 * Header Component
 * Premium fixed navigation bar.
 *
 * Layout: [ Skills | Prerith.M's Profile | Contact ]
 * - Each element: rounded rectangle pill with glass morphism
 * - Skills/Contact: gradient icon + label (icon-only on mobile)
 * - Skills → scrolls to #about, Contact → scrolls to #contact
 */

"use client";

import { useState, useEffect } from "react";

function scrollToSection(id: string) {
  const container = document.getElementById("scroll-container");
  const section = document.getElementById(id);
  if (!container || !section) return;
  container.scrollTo({ top: section.offsetTop, behavior: "smooth" });
}

// ── Gradient SVG Icons ──────────────────────────────────────────────────────

function SkillsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="skills-grad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      {/* Gear icon */}
      <circle cx="10" cy="10" r="3" stroke="url(#skills-grad)" strokeWidth="1.5" fill="none" />
      <path
        d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"
        stroke="url(#skills-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="contact-grad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f472b6" />
          <stop offset="1" stopColor="#fb923c" />
        </linearGradient>
      </defs>
      {/* Envelope icon */}
      <rect x="2" y="5" width="16" height="11" rx="2" stroke="url(#contact-grad)" strokeWidth="1.5" fill="none" />
      <path d="M2 7l8 5 8-5" stroke="url(#contact-grad)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Main Header ──────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Lighten header background slightly once user scrolls
  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;
    const handleScroll = () => setScrolled(container.scrollTop > 40);
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <nav className="header-nav" aria-label="Main navigation">

        {/* ── Left: Skills ── */}
        <button
          id="nav-skills"
          className="header-pill header-pill--left"
          onClick={() => scrollToSection("about")}
          aria-label="Go to About / Skills section"
        >
          <span className="header-pill-icon"><SkillsIcon /></span>
          <span className="header-pill-label">Skills</span>
        </button>

        {/* ── Center: Logo / Name ── */}
        <div className="header-logo">
          <span className="header-logo-text">Prerith.M&apos;s Profile</span>
        </div>

        {/* ── Right: Contact ── */}
        <button
          id="nav-contact"
          className="header-pill header-pill--right"
          onClick={() => scrollToSection("contact")}
          aria-label="Go to Contact section"
        >
          <span className="header-pill-icon"><ContactIcon /></span>
          <span className="header-pill-label">Contact</span>
        </button>

      </nav>
    </header>
  );
}
