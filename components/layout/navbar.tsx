"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { SITE } from "@/lib/constants";
import { MAIN_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BrandLogo } from "@/components/shared/brand-logo";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { useLenisInstance } from "@/components/providers/lenis-provider";

function MobileAccordion({
  label,
  href,
  items,
  pathname,
}: {
  label: string;
  href: string;
  items: { label: string; href: string }[];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between font-sans text-2xl font-bold text-white"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown className={cn("h-5 w-5 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2 border-l-2 border-brand-orange/40 pl-4">
              <Link href={href} className="block text-lg text-white/70 hover:text-brand-orange">
                Overview
              </Link>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block text-base",
                    pathname === item.href ? "text-brand-orange" : "text-white/60 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenisInstance();
  const lastYRef = useRef(0);

  useEffect(() => {
    const update = (y: number) => {
      setScrolled(y > 40);
      setHidden(y > lastYRef.current && y > 200);
      lastYRef.current = y;
    };
    if (lenis) {
      update(lenis.scroll);
      return lenis.on("scroll", (l) => update(l.scroll));
    }
    const onScroll = () => update(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-transform duration-300",
          hidden && "-translate-y-full"
        )}
        initial={false}
      >
        <nav
          className={cn(
            "mx-auto mt-3 flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-500 section-padding sm:mt-4",
            scrolled
              ? "border border-white/10 bg-black/90 shadow-lg backdrop-blur-xl mx-3 sm:mx-4 md:mx-auto"
              : "bg-black/70 backdrop-blur-md mx-3 sm:mx-4 md:mx-auto"
          )}
        >
          <Link href="/" className="relative z-10 shrink-0" data-cursor="pointer">
            <BrandLogo variant="nav" priority />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {MAIN_NAV.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  items={item.children}
                />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-2.5 py-2 text-[13px] font-semibold tracking-wide transition-colors xl:px-3 xl:text-sm",
                      pathname === item.href
                        ? "text-brand-orange"
                        : "text-white/75 hover:text-white"
                    )}
                    data-cursor="pointer"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <MagneticButton
                href={SITE.bookingUrl}
                size="default"
                className="rounded-full bg-brand-orange px-5 font-semibold text-white shadow-[0_0_24px_rgba(255,102,0,0.35)] hover:bg-brand-orange-hover"
              >
                Start a Project
              </MagneticButton>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-black/98 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-1 flex-col items-center gap-6 p-8 pt-28">
              {MAIN_NAV.map((item) =>
                item.children ? (
                  <MobileAccordion
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    items={item.children}
                    pathname={pathname}
                  />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "font-sans text-2xl font-bold",
                      pathname === item.href ? "text-brand-orange" : "text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <MagneticButton href={SITE.bookingUrl} size="lg" className="mt-4 bg-brand-orange text-white">
                Start a Project
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
