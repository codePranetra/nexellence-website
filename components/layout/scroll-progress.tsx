"use client";

import { useEffect, useState } from "react";
import type Lenis from "lenis";
import { motion, useSpring } from "framer-motion";
import { useLenisInstance } from "@/components/providers/lenis-provider";

export function ScrollProgress() {
  const lenis = useLenisInstance();
  const [progress, setProgress] = useState(0);
  const scaleX = useSpring(progress, { stiffness: 400, damping: 40 });

  useEffect(() => {
    if (!lenis) {
      const onScroll = () => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const onLenisScroll = (l: Lenis) => setProgress(l.progress);
    setProgress(lenis.progress);
    return lenis.on("scroll", onLenisScroll);
  }, [lenis]);

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[9990] h-[2px] origin-left bg-gradient-to-r from-brand-orange via-brand-orange-light to-brand-orange"
      style={{ scaleX }}
    />
  );
}
