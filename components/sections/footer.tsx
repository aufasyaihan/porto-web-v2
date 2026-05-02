"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PORTOFOLIO } from "@/lib/constant";

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
    { label: "GitHub", href: PORTOFOLIO.URL.GITHUB },
    { label: "LinkedIn", href: PORTOFOLIO.URL.LINKEDIN },
    { label: "Email", href: `mailto:${PORTOFOLIO.EMAIL}` },
  ];

  return (
    <footer className="border-t border-border py-12 bg-bg">
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center flex-wrap gap-4">
        <p className="font-mono text-[0.7rem] text-text-3 tracking-[0.05em]">
          <span>©{year} </span> Aufa. Built with Love.
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
              className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-text-3 transition-colors duration-200 hover:text-text"
            >
              {s.label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
