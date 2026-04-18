"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section className="section-padding container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="max-w-3xl"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Philosophy</h2>
        <div className="space-y-6 text-body text-[var(--c-text-muted)]">
          <p>
            I believe that great software is indistinguishable from magic. It shouldn&apos;t just work;
            it should feel intuitive, fluid, and carefully considered. Every detail, from the
            typography to the underlying cloud infrastructure, contributes to the final experience.
          </p>
          <p>
            By combining modern tools like Next.js and Cloudflare with a deep appreciation for
            design, I build systems that are as robust as they are elegant. It&apos;s not just about writing
            code—it&apos;s about building the right thing, the right way.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
