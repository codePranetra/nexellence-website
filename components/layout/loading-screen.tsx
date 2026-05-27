"use client";

import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/shared/brand-logo";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black transition-opacity duration-500"
      aria-hidden="true"
    >
      <BrandLogo variant="loader" priority />
      <div className="mt-8 h-0.5 w-32 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-full animate-pulse bg-brand-orange" />
      </div>
    </div>
  );
}
