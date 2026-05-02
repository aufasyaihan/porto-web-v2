"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [year, setYear] = useState(2025);
  useEffect(() => {
    const yearId = setTimeout(() => {
      const currentYear = new Date().getFullYear();
      setYear(currentYear);
      if (currentYear === new Date().getFullYear()) {
        clearTimeout(yearId);
      }
    }, 500);
    return () => clearTimeout(yearId);
  }, []);

  const socials = [
    { label: "GitHub", href: "https://github.com/yourusername" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
    { label: "Email", href: "mailto:you@example.com" },
  ];

  return (
    <footer className="border-t border-border py-12 bg-bg">
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center flex-wrap gap-4">
        <p className="font-mono text-[0.7rem] text-text-3 tracking-[0.05em]">
          © {year} Your Name. Built with Next.js &amp; Framer Motion.
        </p>

        <div className="flex gap-8">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              whileHover={{ y: -2 }}
              className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-text-3 transition-colors duration-200 hover:text-white"
            >
              {s.label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
