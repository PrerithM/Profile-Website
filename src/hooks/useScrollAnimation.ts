/**
 * useScrollAnimation Hook
 * Detects scroll position and triggers animations
 * Word-by-word reveal for quote, gear scale-up, blur effects
 */

import { useEffect, useState } from "react";

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      setScrollY(scrollTop);

      // Calculate scroll progress as percentage
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, scrollProgress };
}
