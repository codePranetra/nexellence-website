"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavChild } from "@/lib/navigation";

const CLOSE_DELAY_MS = 250;

interface NavDropdownProps {
  label: string;
  href: string;
  items: NavChild[];
}

export function NavDropdown({ label, href, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isActive =
    pathname === href || pathname.startsWith(href + "/") || items.some((i) => pathname === i.href);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const handleOpen = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
      onFocus={handleOpen}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) scheduleClose();
      }}
    >
      <button
        type="button"
        className={cn(
          "flex items-center gap-1 px-2.5 py-2 text-[13px] font-semibold tracking-wide transition-colors xl:px-3 xl:text-sm",
          isActive ? "text-brand-orange" : "text-white/75 hover:text-white"
        )}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        data-cursor="pointer"
      >
        {label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 pt-2"
          onMouseEnter={handleOpen}
          onMouseLeave={scheduleClose}
        >
          {/* pt-2 bridges the gap so the pointer path from trigger → menu stays hoverable */}
          <div className="min-w-[240px] overflow-hidden rounded-xl border border-white/10 bg-[#111111] py-2 shadow-2xl">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-2.5 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-brand-orange/15 text-brand-orange"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                )}
                onClick={() => setOpen(false)}
                data-cursor="pointer"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}
