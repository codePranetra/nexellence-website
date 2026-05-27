"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Button } from "@/components/ui/button";

const contactCards = [
  { icon: MapPin, label: "Location", value: "Bangalore, India", href: "#map" },
];

export function ContactClient() {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="section-padding section-y">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            {contactCards.map((card) => (
              <motion.a
                key={card.label}
                href={card.href}
                className="glass glow-border flex items-center gap-4 rounded-2xl p-5 transition hover:shadow-glow"
                whileHover={{ x: 4 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-electric/10">
                  <card.icon className="h-5 w-5 text-brand-electric" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                  <p className="font-medium">{card.value}</p>
                </div>
              </motion.a>
            ))}
            <div className="glass glow-border rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-brand-electric" />
                <div>
                  <p className="font-semibold">Book a Discovery Call</p>
                  <p className="text-sm text-muted-foreground">30-min strategy session</p>
                </div>
              </div>
              <MagneticButton href="#" variant="outline" className="mt-4 w-full">
                Schedule Now
              </MagneticButton>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass glow-border rounded-3xl p-8 md:p-10"
          >
            <h2 className="font-display text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 text-muted-foreground text-sm">
              All fields marked with focus glow for premium interaction feedback.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                { id: "name", label: "Full Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
                { id: "company", label: "Company", type: "text" },
                { id: "phone", label: "Phone", type: "tel" },
              ].map((field) => (
                <div key={field.id} className={field.id === "company" || field.id === "phone" ? "" : "sm:col-span-1"}>
                  <label htmlFor={field.id} className="text-sm font-medium">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required={field.id === "name" || field.id === "email"}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused(null)}
                    className={`mt-2 w-full rounded-xl border bg-background/50 px-4 py-3 outline-none transition ${
                      focused === field.id
                        ? "border-brand-electric shadow-[0_0_20px_rgba(0,180,255,0.2)]"
                        : "border-border"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="text-sm font-medium">
                Project Details
              </label>
              <textarea
                id="message"
                rows={5}
                required
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className={`mt-2 w-full rounded-xl border bg-background/50 px-4 py-3 outline-none transition resize-none ${
                  focused === "message"
                    ? "border-brand-electric shadow-[0_0_20px_rgba(0,180,255,0.2)]"
                    : "border-border"
                }`}
                placeholder="Tell us about your project, timeline, and goals..."
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="mt-8 w-full sm:w-auto"
              disabled={submitted}
            >
              {submitted ? "Message Sent ✓" : "Send Message"}
            </Button>
          </form>
        </div>

        <div id="map" className="mt-16 overflow-hidden rounded-2xl glow-border">
          <iframe
            title="Code Pranetra Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497699.9972532574!2d77.35133445!3d12.9545176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4d70!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition duration-500"
          />
        </div>
      </div>
    </section>
  );
}
