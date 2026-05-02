"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { AwardEntry } from "@/lib/content";
import SectionRevealer from "./section-revealer";

export default function Awards({ data }: { data: AwardEntry[] }) {
  return (
    <section
      id="awards"
      className="py-32 border-t border-border bg-bg"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionRevealer>
          <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-text-3 mb-16">
            05 - Awards &amp; Recognition
          </p>
        </SectionRevealer>

        <div className="flex flex-col">
          {data.map((award, i) => (
            <SectionRevealer key={i} delay={i * 0.1}>
              <motion.div
                whileHover="hover"
                initial="rest"
                className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-6 md:gap-10 py-10 border-b border-border items-start cursor-default"
                data-cursor="hover"
              >
                {/* Number */}
                <div>
                  <span className="font-mono text-4xl md:text-5xl font-light text-text-3 tracking-[-0.04em] leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <div className="flex justify-between items-start gap-4 flex-wrap mb-3">
                    <div className="flex items-center gap-4">
                      {/* Logo */}
                      {award.logo && (
                        <div className="w-9 h-9 relative shrink-0 overflow-hidden">
                          <Image
                            src={award.logo}
                            alt={award.organization}
                            fill
                            className="object-contain grayscale invert"
                            sizes="36px"
                            onError={() => {}}
                          />
                        </div>
                      )}
                      <div>
                        <motion.h3
                          variants={{
                            rest: { x: 0 },
                            hover: { x: 8 },
                          }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="text-[1.15rem] font-semibold tracking-[-0.02em]"
                        >
                          {award.title}
                        </motion.h3>
                        <p className="font-mono text-[0.75rem] text-text-2 mt-[0.2rem]">
                          {award.organization}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[0.7rem] text-text-3 tracking-[0.05em] whitespace-nowrap pt-[0.2rem]">
                      {award.year}
                    </span>
                  </div>

                  {/* Description slide-out */}
                  <motion.p
                    variants={{
                      rest: { opacity: 0, height: 0, marginTop: 0 },
                      hover: { opacity: 1, height: "auto", marginTop: "0.75rem" },
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[0.9rem] leading-[1.7] text-text-2 overflow-hidden whitespace-pre-line"
                  >
                    {award.description}
                  </motion.p>
                </div>
              </motion.div>
            </SectionRevealer>
          ))}
        </div>
      </div>
    </section>
  );
}
