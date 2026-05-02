"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTOFOLIO } from "@/lib/constant";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

function useScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(
    Array(text.length).fill(" ").join("")
  );
  const frame = useRef(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const maxIter = text.length * 4;

    const animate = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 4) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration < maxIter) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
      frame.current = iteration;
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [text, trigger]);

  return display;
}

export default function Hero({ name }: { name: string }) {
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(t);
  }, []);

  const scrambled = useScramble(name.toUpperCase(), started);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-bg"
    >
      {/* Dot grid background */}
      <DotGrid />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6"
      >
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[0.7rem] tracking-[0.3em] uppercase text-text-3 mb-6"
        >
          Portfolio — 2025
        </motion.p>

        {/* Name — scramble reveal */}
        <h1
          className="font-sans text-[clamp(3rem,12vw,7rem)] font-bold tracking-[-0.04em] leading-[0.9] text-text whitespace-pre-wrap mb-8 tabular-nums"
          aria-label={name}
        >
          {scrambled}
        </h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(1rem,2.5vw,1.3rem)] text-text-2 font-light tracking-[0.02em] mb-12"
        >
          {PORTOFOLIO.ROLE} — Building at the intersection of{" "}
          <em className="text-text not-italic">design</em> &amp;{" "}
          <em className="text-text not-italic">engineering</em>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#about"
            data-cursor="hover"
            className="inline-flex items-center gap-2 py-[0.85rem] px-8 bg-text text-bg text-[0.85rem] font-semibold tracking-[0.05em] uppercase border border-text transition-colors duration-300 hover:bg-bg hover:text-text"
          >
            View Work
          </a>
          <a
            href="#contact"
            data-cursor="hover"
            className="inline-flex items-center gap-2 py-[0.85rem] px-8 bg-transparent text-text text-[0.85rem] font-semibold tracking-[0.05em] uppercase border border-border-2 transition-colors duration-300 hover:border-text"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-text-3">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-text-2 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function DotGrid() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, color-mix(in srgb, var(--color-text) 9%, transparent) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      }}
    />
  );
}
