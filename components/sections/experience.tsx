"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import SectionRevealer from "../section-revealer";
import { ExperienceEntry } from "@/types/experiance";

export default function Experience({ data }: { data: ExperienceEntry[] }) {
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const [lineHeight, setLineHeight] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setLineHeight(v * 100);
  });

  return (
    <section
      id="experience"
      className="py-32 border-t border-border bg-bg"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionRevealer>
          <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-text-3 mb-16">
            02 — Experience
          </p>
        </SectionRevealer>

        <div
          ref={containerRef}
          className="relative grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-24"
        >
          {/* Timeline spine */}
          <div className="hidden md:block relative">
            <div className="sticky top-24">
              {/* Track */}
              <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-border" />
              {/* Progress line */}
              <div
                className="absolute left-[7px] top-0 w-[1px] bg-text transition-[height] duration-75 ease-linear"
                style={{ height: `${lineHeight}%` }}
              />

              {/* Company nav */}
              <div className="flex flex-col gap-10 pl-8">
                {data.map((entry, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(active === i ? null : i)}
                    className="bg-transparent border-none cursor-none text-left p-0"
                  >
                    {/* Dot */}
                    <div
                      className={`absolute left-0 w-[15px] h-[15px] rounded-full border transition-colors duration-300 mt-[2px] ${
                        active === i
                          ? "bg-text border-text"
                          : "bg-bg border-border-2"
                      }`}
                    />
                    <motion.div whileHover={{ x: 4 }}>
                      <p className="font-mono text-[0.7rem] tracking-[0.05em] text-text-3 mb-1">
                        {entry.period}
                      </p>
                      <p
                        className={`text-[0.95rem] font-medium transition-colors duration-200 ${
                          active === i ? "text-text" : "text-text-2"
                        }`}
                      >
                        {entry.company}
                      </p>
                    </motion.div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-6">
            {data.map((entry, i) => (
              <SectionRevealer key={i} delay={i * 0.08}>
                <motion.div
                  layout
                  data-cursor="text"
                  data-cursor-label="VIEW"
                  onClick={() => setActive(active === i ? null : i)}
                  className={`p-8 cursor-none transition-colors duration-300 border hover:border-border-2 ${
                    active === i
                      ? "border-border-2 bg-card"
                      : "border-border bg-transparent"
                  }`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div>
                      <h3 className="text-[1.1rem] font-semibold tracking-[-0.02em] mb-1">
                        {entry.role}
                      </h3>
                      <p className="font-mono text-[0.8rem] text-text-2">
                        {entry.company} — {entry.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[0.7rem] text-text-3 tracking-[0.05em] whitespace-nowrap">
                        {entry.period}
                      </span>
                      <motion.span
                        animate={{ rotate: active === i ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="block text-[1.2rem] text-text-3 leading-none select-none"
                      >
                        +
                      </motion.span>
                    </div>
                  </div>

                  {/* Expandable detail */}
                  <AnimatePresence>
                    {active === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6">
                          <div className="w-full h-[1px] bg-border mb-6" />
                          <p className="text-[0.95rem] leading-[1.8] text-text-2 mb-6 whitespace-pre-line">
                            {entry.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {entry.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 text-[0.7rem] font-mono text-text-3 border border-border tracking-[0.05em]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </SectionRevealer>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
