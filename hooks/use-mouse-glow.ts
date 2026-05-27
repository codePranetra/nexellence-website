"use client";

import { useEffect, useRef } from "react";

export function useMouseGlow(containerRef: React.RefObject<HTMLElement | null>) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      glow.style.opacity = "1";
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef]);

  return glowRef;
}
