"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="section-padding min-h-[80vh] flex flex-col justify-center container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="max-w-4xl"
      >
        <h1 className="text-hero gradient-text mb-6">
          Crafting digital experiences with precision and taste.
        </h1>
        <p className="text-subtitle max-w-2xl">
          I am Prerith M. I build fast, intelligent, and beautifully designed web applications.
          My focus is on the intersection of design, code, and modern cloud architecture.
        </p>
      </motion.div>
    </section>
  );
}
