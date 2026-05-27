"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useLenisInstance } from "@/components/providers/lenis-provider";

export function BlogArticleClient({ title }: { title: string }) {
  const lenis = useLenisInstance();
  const [progress, setProgress] = useState(0);
  const scaleX = useSpring(progress, { stiffness: 400, damping: 40 });

  useEffect(() => {
    document.title = `${title} | Code Pranetra`;
  }, [title]);

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
    setProgress(lenis.progress);
    return lenis.on("scroll", (l) => setProgress(l.progress));
  }, [lenis]);

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[9991] h-1 origin-left bg-brand-electric"
      style={{ scaleX }}
    />
  );
}
