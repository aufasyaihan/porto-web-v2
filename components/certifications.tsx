"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CertEntry } from "@/lib/content";
import SectionRevealer from "./section-revealer";

export default function Certifications({ data }: { data: CertEntry[] }) {
  return (
    <section
      id="certifications"
      className="py-32 border-t border-border bg-surface"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionRevealer>
          <div className="flex justify-between items-end mb-16 flex-wrap gap-4">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-text-3">
              04 - Certifications
            </p>
            <span className="font-mono text-[0.7rem] text-text-3">
              {data.length} credentials
            </span>
          </div>
        </SectionRevealer>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
          {data.map((cert, i) => (
            <SectionRevealer key={i} delay={i * 0.07}>
              <CertCard cert={cert} />
            </SectionRevealer>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert }: { cert: CertEntry }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="h-[220px]"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      data-cursor="hover"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-card border border-border p-7 flex flex-col justify-between">
          {/* Badge */}
          <div className="w-10 h-10 relative bg-border flex items-center justify-center text-[1.2rem] overflow-hidden">
            {cert.badge ? (
              <Image
                src={cert.badge}
                alt={cert.name}
                fill
                className="object-contain grayscale"
                sizes="40px"
                onError={() => {}}
              />
            ) : (
              "🏅"
            )}
          </div>

          <div>
            <p className="text-[0.95rem] font-semibold tracking-[-0.01em] mb-1.5 leading-[1.3]">
              {cert.name}
            </p>
            <p className="font-mono text-[0.72rem] text-text-3 tracking-[0.05em]">
              {cert.issuer}
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden bg-white text-black p-7 flex flex-col justify-between"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-black/40 mb-2">
              Certified
            </p>
            <p className="text-base font-bold tracking-[-0.02em] leading-[1.2] mb-2">
              {cert.name}
            </p>
            <p className="text-[0.8rem] text-black/50">
              {cert.issuer}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-mono text-[0.7rem] text-black/40">
              {cert.date}
            </span>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-black border-b border-black/30 pb-[1px]"
              >
                Verify ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
