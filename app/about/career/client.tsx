"use client";

import { motion } from "framer-motion";
import { CAREER } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";

function AvatarInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-sm font-bold text-brand-orange ring-2 ring-brand-orange/25">
      {initials}
    </div>
  );
}

export function CareerClients() {
  return (
    <section className="section-padding section-y bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Clients"
          title="Our happy clients"
          align="center"
          dark
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {CAREER.clientTestimonials.map((item, index) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#111] p-6 md:p-7"
            >
              <p className="flex-1 text-sm leading-relaxed text-white/75 md:text-[15px]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                <AvatarInitials name={item.author} />
                <div>
                  <cite className="not-italic font-semibold text-white">{item.author}</cite>
                  <p className="text-sm text-white/50">{item.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
