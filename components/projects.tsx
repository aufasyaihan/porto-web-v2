"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import type { ProjectEntry } from "@/lib/content";
import SectionRevealer from "./section-revealer";

export default function Projects({ data }: { data: ProjectEntry[] }) {
  const [active, setActive] = useState(0);

  if (data.length === 0) return null;

  return (
    <section id="projects" className="py-32 border-t border-border bg-surface">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionRevealer>
          <div className="flex justify-between items-end mb-16 flex-wrap gap-4">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-text-3">
              03 - Projects
            </p>
            <span className="font-mono text-[0.7rem] text-text-3">
              {data.length} selected works
            </span>
          </div>
        </SectionRevealer>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div className="flex flex-col border-y border-border">
            {data.map((project, i) => (
              <SectionRevealer key={project.title} delay={i * 0.08}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  data-cursor="hover"
                  className={`w-full p-6 text-left border-b border-border transition-colors duration-300 ${
                    active === i ? "bg-card" : "bg-transparent hover:bg-card/40"
                  }`}
                >
                  <span className="font-mono text-[0.68rem] text-text-3 tracking-[0.12em] uppercase">
                    {project.period} / {project.type}
                  </span>
                  <span
                    className={`block mt-3 text-[1.25rem] font-semibold tracking-[-0.02em] transition-colors duration-200 ${
                      active === i ? "text-white" : "text-text-2"
                    }`}
                  >
                    {project.title}
                  </span>
                </button>
              </SectionRevealer>
            ))}
          </div>

          <SectionRevealer delay={0.15}>
            <div className="min-h-[420px] border border-border bg-bg p-8 md:p-10">
              <AnimatePresence mode="wait">
                <motion.article
                  key={data[active].title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full flex flex-col"
                >
                  <div className="flex justify-between items-start gap-6 flex-wrap mb-10">
                    <div>
                      <p className="font-mono text-[0.7rem] text-text-3 tracking-[0.12em] uppercase mb-3">
                        {data[active].type}
                      </p>
                      <h3 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-none">
                        {data[active].title}
                      </h3>
                    </div>
                    <span className="font-mono text-[0.75rem] text-text-3 tracking-[0.08em]">
                      {data[active].period}
                    </span>
                  </div>

                  <p className="text-[1rem] md:text-[1.08rem] leading-[1.85] text-text-2 whitespace-pre-line max-w-[680px]">
                    {data[active].description}
                  </p>

                  <div className="mt-10 flex flex-wrap gap-2">
                    {data[active].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-[0.72rem] font-mono text-text-3 border border-border tracking-[0.05em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-12 flex flex-wrap gap-4">
                    {data[active].liveUrl && (
                      <ProjectLink href={data[active].liveUrl} label="Live" icon="live" />
                    )}
                    {data[active].githubUrl && (
                      <ProjectLink
                        href={data[active].githubUrl}
                        label="Source"
                        icon="github"
                      />
                    )}
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </SectionRevealer>
        </div>
      </div>
    </section>
  );
}

function ProjectLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: "live" | "github";
}) {
  const Icon = icon === "github" ? FaGithub : FaExternalLinkAlt;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      whileHover={{ y: -2 }}
      className="inline-flex items-center gap-2 font-mono text-[0.75rem] tracking-[0.1em] uppercase text-text-2 border border-border px-4 py-2 transition-colors duration-200 hover:text-white hover:border-white"
    >
      <Icon size={14} />
      {label}
    </motion.a>
  );
}
