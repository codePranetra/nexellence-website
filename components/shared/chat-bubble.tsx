"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { SITE } from "@/lib/constants";

export function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-dark glow-border mb-4 w-80 overflow-hidden rounded-2xl"
          >
            <div className="bg-brand-orange p-4 text-white">
              <p className="font-semibold">{SITE.name}</p>
              <p className="text-xs text-white/80">How can we help you hire?</p>
            </div>
            <div className="p-4">
              <p className="text-sm text-white/60">
                Ask about our recruitment services, industry expertise, or book a discovery call
                with our team.
              </p>
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center text-sm font-semibold text-brand-orange hover:underline"
              >
                Start a Project →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-glow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="pointer"
        aria-label="Contact"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </motion.button>
    </div>
  );
}
