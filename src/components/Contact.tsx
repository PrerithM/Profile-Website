"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <section className="section-padding container mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="glass-panel rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Let&apos;s build something exceptional.</h2>
          <p className="text-[var(--c-text-muted)]">
            I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <a
            href="mailto:prerith.m@example.com"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--c-text)] text-[var(--c-bg)] font-medium transition-transform hover:scale-105 active:scale-95"
          >
            <Mail className="w-4 h-4" />
            Get in touch
          </a>
          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com/prerithm"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[var(--c-border)] transition-transform hover:scale-110 active:scale-95"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-[var(--c-border)] transition-transform hover:scale-110 active:scale-95"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
