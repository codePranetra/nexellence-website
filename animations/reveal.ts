"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { registerGSAP } from "./gsap-config";

registerGSAP();

export function revealOnScroll(
  selector: string,
  options?: {
    y?: number;
    stagger?: number;
    start?: string;
  }
) {
  const { y = 60, stagger = 0.08, start = "top 85%" } = options ?? {};
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elements[0],
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

export function splitTextReveal(el: HTMLElement | null) {
  if (!el) return () => {};
  try {
    const split = new SplitType(el, { types: "lines,words" });
    if (!split.words?.length) return () => split.revert();
    gsap.fromTo(
      split.words,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      }
    );
    return () => split.revert();
  } catch {
    gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });
    return () => {};
  }
}

export function pinHorizontalSection(
  pinContainer: HTMLElement | null,
  track: HTMLElement | null,
  scrollViewport?: HTMLElement | null,
  options?: { start?: string }
) {
  if (!pinContainer || !track) return () => {};
  const viewport = scrollViewport ?? pinContainer;
  const scrollWidth = track.scrollWidth - viewport.offsetWidth;
  if (scrollWidth <= 0) return () => {};
  const tween = gsap.to(track, {
    x: -scrollWidth,
    ease: "none",
    scrollTrigger: {
      trigger: pinContainer,
      pin: pinContainer,
      start: options?.start ?? "top top",
      scrub: true,
      anticipatePin: 1,
      end: () => `+=${scrollWidth}`,
      invalidateOnRefresh: true,
    },
  });
  return () => tween.scrollTrigger?.kill();
}

export function parallaxLayers(selector: string, speed = 0.3) {
  const layers = document.querySelectorAll(selector);
  layers.forEach((layer) => {
    gsap.to(layer, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: layer,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

export function animateCounter(
  el: HTMLElement | null,
  target: number,
  suffix = ""
) {
  if (!el) return;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 85%" },
    onUpdate: () => {
      el.textContent = `${Math.round(obj.val)}${suffix}`;
    },
  });
}
