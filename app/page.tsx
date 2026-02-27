"use client";

import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import HeroScene from "@/components/HeroScene";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useCreateStore, LevaPanel } from "leva";
import { useEffect, useState } from "react";

export default function Home() {
  const store = useCreateStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <>
      {mounted && isDev && (
        <div
          style={{
            position: "fixed",
            top: "80vh",
            right: "1rem",
            zIndex: 99999,
          }}
        >
          <LevaPanel
            store={store}
            titleBar={{ title: "⚙ Gear Controls", drag: true, filter: false }}
            theme={{
              sizes: { rootWidth: "300px" },
              colors: {
                elevation1: "#111",
                elevation2: "#1a1a1a",
                elevation3: "#222",
                accent1: "#7c3aed",
                accent2: "#a78bfa",
                accent3: "#c4b5fd",
                highlight1: "#fff",
                highlight2: "#ddd",
                highlight3: "#aaa",
              },
            }}
          />
        </div>
      )}

      {/* Loading screen — fixed, unmounts itself */}
      <LoadingScreen />

      {/* Fixed header — sits above scroll container */}
      <Header />

      {/* Full-page snap scroll container */}
      <main id="scroll-container" className="snap-container">

        {/* Page 1: Hero */}
        <section id="hero" className="snap-section">
          <HeroScene levaStore={store} />
        </section>

        {/* Page 2: About */}
        <section id="about" className="snap-section">
          <AboutSection />
        </section>

        {/* Page 3: Contact + Footer */}
        <section id="contact" className="snap-section snap-section--last">
          <ContactSection />
          <Footer />
        </section>

      </main>
    </>
  );
}
