"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const dotX = useMotionValue(-40);
  const dotY = useMotionValue(-40);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(dotX, springConfig);
  const ringY = useSpring(dotY, springConfig);

  const [cursorState, setCursorState] = useState<"default" | "hover" | "text">(
    "default"
  );
  const [label, setLabel] = useState("");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        dotX.set(e.clientX);
        dotY.set(e.clientY);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]") as HTMLElement | null;
      if (el) {
        const type = el.dataset.cursor as "hover" | "text";
        setCursorState(type ?? "hover");
        setLabel(el.dataset.cursorLabel ?? "");
      } else if (
        target.closest("a, button, [role='button'], input, textarea, select")
      ) {
        setCursorState("hover");
        setLabel("");
      } else {
        setCursorState("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [dotX, dotY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[10000] will-change-transform bg-white mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[10000] will-change-transform mix-blend-difference transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          cursorState === "hover"
            ? "w-20 h-20 border border-white/80 bg-white/5"
            : cursorState === "text"
            ? "w-[72px] h-[72px] border border-transparent bg-white"
            : "w-9 h-9 border border-white/50 bg-transparent"
        }`}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {cursorState === "text" && label && (
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold tracking-[0.15em] uppercase text-black font-mono select-none">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
