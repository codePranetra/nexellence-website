"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DOT_SIZE = 8;
const RING_SIZE = 40;
const RING_SIZE_HOVER = 56;

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor='pointer'], input, textarea, select")
      );
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [visible]);

  if (!visible) return null;

  const ringSize = hovering ? RING_SIZE_HOVER : RING_SIZE;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        animate={{
          x: pos.x - ringSize / 2,
          y: pos.y - ringSize / 2,
          width: ringSize,
          height: ringSize,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.6 }}
        style={{ borderRadius: "50%" }}
      >
        <div
          className="h-full w-full rounded-full border-[1.5px] border-brand-orange/70 transition-colors duration-200"
          style={{
            boxShadow: hovering
              ? "0 0 12px rgba(255, 102, 0, 0.35)"
              : "0 0 6px rgba(255, 102, 0, 0.15)",
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        animate={{
          x: pos.x - DOT_SIZE / 2,
          y: pos.y - DOT_SIZE / 2,
        }}
        transition={{ type: "spring", stiffness: 900, damping: 42, mass: 0.2 }}
      >
        <div
          className="rounded-full bg-brand-orange transition-transform duration-200"
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            transform: hovering ? "scale(1.15)" : "scale(1)",
            boxShadow: "0 0 8px rgba(255, 102, 0, 0.5)",
          }}
        />
      </motion.div>
    </>
  );
}
