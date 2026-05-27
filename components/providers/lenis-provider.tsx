"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP } from "@/animations/gsap-config";

const LenisContext = createContext<Lenis | null>(null);

export function useLenisInstance() {
  return useContext(LenisContext);
}

function setupScrollerProxy(lenis: Lenis) {
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value?: number) {
      if (value !== undefined) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    registerGSAP();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const instance = new Lenis({
      lerp: 0.14,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    setLenis(instance);
    setupScrollerProxy(instance);

    instance.on("scroll", ScrollTrigger.update);

    const onRefresh = () => instance.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const raf = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      instance.resize();
      ScrollTrigger.refresh();
    });

    const onResize = () => {
      instance.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    lenis.resize();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
