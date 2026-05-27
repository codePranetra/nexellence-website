"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";
import { RECENT_CLIENT_FEEDBACK } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";

export function ClientFeedback() {
  return (
    <section className="section-padding section-y border-y border-white/10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Client Feedback"
          title="Recent client feedback"
          align="center"
          dark
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {RECENT_CLIENT_FEEDBACK.map((item, index) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8"
            >
              <MessageSquareQuote className="mb-4 h-8 w-8 text-brand-orange/40" />
              <p className="text-sm leading-relaxed text-white/75 md:text-base">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-white/10 pt-4">
                <cite className="not-italic font-semibold text-white">{item.author}</cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
