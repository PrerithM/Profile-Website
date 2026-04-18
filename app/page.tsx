"use client";

import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Philosophy />
      <Skills />
      <Contact />
    </main>
  );
}
