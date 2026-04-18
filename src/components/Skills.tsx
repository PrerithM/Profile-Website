"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  MonitorSmartphone,
  Sparkles,
  Zap,
  Cloud,
  Atom,
  Layers,
  Bot
} from "lucide-react";

const skills = [
  {
    id: "js",
    title: "JavaScript",
    icon: Code2,
    description: "Deep understanding of the language core, asynchronous programming, and modern ES6+ features to build scalable logic."
  },
  {
    id: "web-dev",
    title: "Web App Development",
    icon: MonitorSmartphone,
    description: "End-to-end development of responsive, accessible, and performant web applications using modern tooling and best practices."
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: Zap,
    description: "Expertise in server-side rendering, static site generation, App Router, and API routes for lightning-fast React applications."
  },
  {
    id: "react",
    title: "React",
    icon: Atom,
    description: "Building modular, reusable, and state-driven user interfaces. Strong grasp of hooks, context, and component architecture."
  },
  {
    id: "react-expo",
    title: "React Expo",
    icon: Layers,
    description: "Creating cross-platform mobile applications with native-like performance and smooth animations using Expo and React Native."
  },
  {
    id: "cloudflare",
    title: "Cloudflare Stack",
    icon: Cloud,
    description: "Deploying globally distributed applications using Cloudflare Workers, Pages, KV, D1, and integrating AI edge computing."
  },
  {
    id: "prompt",
    title: "Prompt Engineering",
    icon: Sparkles,
    description: "Crafting precise, context-aware prompts to extract maximum value and accuracy from Large Language Models (LLMs)."
  },
  {
    id: "langchain",
    title: "Langchain",
    icon: Bot,
    description: "Orchestrating complex AI workflows, connecting LLMs to external tools, databases, and memory systems for autonomous agents."
  }
];

export default function Skills() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="section-padding container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">Expertise</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill) => {
            const Icon = skill.icon;
            const isExpanded = expandedId === skill.id;

            return (
              <motion.div
                key={skill.id}
                layout
                onClick={() => setExpandedId(isExpanded ? null : skill.id)}
                className={`glass-panel cursor-pointer overflow-hidden rounded-2xl p-6 transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${
                  isExpanded ? "col-span-1 md:col-span-2 row-span-2" : ""
                }`}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              >
                <motion.div layout className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-[var(--c-border)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <motion.h3 layout className="font-semibold text-lg">
                    {skill.title}
                  </motion.h3>
                </motion.div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[var(--c-text-muted)] text-sm leading-relaxed"
                    >
                      <p className="pt-2 border-t border-[var(--c-border)]">
                        {skill.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
