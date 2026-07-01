"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculatePricing } from "@/lib/pricing/calculate";
import {
  SESSION_STORAGE_KEY,
  WIZARD_STEPS,
  type DurationType,
  type ServiceId,
  type SkillLevel,
  type WeeklyHours,
} from "@/lib/pricing/config";
import { INITIAL_FORM_STATE, type PricingFormState } from "@/lib/pricing/types";
import { EmailStep } from "@/components/pricing/steps/email-step";
import { ServicesStep } from "@/components/pricing/steps/services-step";
import { HoursStep } from "@/components/pricing/steps/hours-step";
import { DurationStep } from "@/components/pricing/steps/duration-step";
import { SkillStep } from "@/components/pricing/steps/skill-step";
import { SummaryStep } from "@/components/pricing/steps/summary-step";
import { cn } from "@/lib/utils";

function loadFromSession(): PricingFormState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PricingFormState;
  } catch {
    return null;
  }
}

function saveToSession(state: PricingFormState) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
}

function clearSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function PricingWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<PricingFormState>(INITIAL_FORM_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = loadFromSession();
    if (saved) {
      setForm(saved);
      if (saved.wizardStep && saved.wizardStep >= 1 && saved.wizardStep <= 6) {
        setStep(saved.wizardStep);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !submitted) {
      saveToSession({ ...form, wizardStep: step });
    }
  }, [form, step, hydrated, submitted]);

  const updateForm = useCallback((patch: Partial<PricingFormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setError("");
  }, []);

  const pricingPreview = useMemo(() => {
    if (
      form.services.length === 0 ||
      !form.weeklyHours ||
      !form.durationType ||
      !form.skillLevel
    ) {
      return null;
    }
    return calculatePricing({
      services: form.services,
      weeklyHours: form.weeklyHours,
      durationType: form.durationType,
      months: form.months,
      skillLevel: form.skillLevel,
    });
  }, [form]);

  const isStepValid = useMemo(() => {
    switch (step) {
      case 1:
        return isValidEmail(form.email);
      case 2:
        return form.services.length > 0;
      case 3:
        return !!form.weeklyHours;
      case 4:
        return (
          !!form.durationType &&
          (form.durationType === "short"
            ? form.months >= 1 && form.months <= 6
            : form.months >= 7)
        );
      case 5:
        return !!form.skillLevel;
      case 6:
        return !!form.inquiryId && isValidEmail(form.email);
      default:
        return false;
    }
  }, [step, form]);

  const saveDraftEmail = async (): Promise<boolean> => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/pricing/inquiry/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          inquiryId: form.inquiryId,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.message ?? "Failed to save email");
        return false;
      }
      updateForm({
        inquiryId: json.data.inquiryId,
        email: json.data.email,
      });
      return true;
    } catch {
      setError("Failed to save email. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (!isStepValid) {
      setError("You need to select an item to continue");
      return;
    }

    if (step === 1) {
      const saved = await saveDraftEmail();
      if (!saved) return;
    }

    setStep((s) => Math.min(6, s + 1));
    setError("");
  };

  const handlePrevious = () => {
    setStep((s) => Math.max(1, s - 1));
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.inquiryId || !isStepValid) {
      setError("Please complete all steps before submitting.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/pricing/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryId: form.inquiryId,
          email: form.email.trim(),
          services: form.services,
          weeklyHours: form.weeklyHours,
          durationType: form.durationType,
          months: form.months,
          skillLevel: form.skillLevel,
          message: form.message || null,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.message ?? "Failed to submit inquiry");
        return;
      }
      clearSession();
      setSubmitted(true);
    } catch {
      setError("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg rounded-3xl glass glow-border p-12 text-center"
      >
        <p className="font-display text-4xl font-bold text-brand-electric">0$</p>
        <h2 className="mt-6 font-display text-2xl font-bold">
          Thank you, we will contact you soon!
        </h2>
        <p className="mt-3 text-muted-foreground">
          We&apos;ve received your custom pricing inquiry and will reach out at{" "}
          <span className="text-foreground">{form.email}</span>.
        </p>
      </motion.div>
    );
  }

  const currentStepMeta = WIZARD_STEPS[step - 1];

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-3 flex justify-between gap-1">
          {WIZARD_STEPS.map((s) => (
            <div
              key={s.id}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                s.id <= step ? "bg-brand-electric" : "bg-white/10"
              )}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Step {step} of {WIZARD_STEPS.length}
        </p>
      </div>

      <div className="glass glow-border rounded-3xl p-8 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 1 && (
              <EmailStep
                email={form.email}
                onChange={(email) => updateForm({ email })}
                error={step === 1 ? error : undefined}
              />
            )}
            {step === 2 && (
              <ServicesStep
                selected={form.services}
                onChange={(services) =>
                  updateForm({ services: services as ServiceId[] })
                }
              />
            )}
            {step === 3 && (
              <HoursStep
                selected={form.weeklyHours}
                onChange={(weeklyHours) =>
                  updateForm({ weeklyHours: weeklyHours as WeeklyHours })
                }
              />
            )}
            {step === 4 && (
              <DurationStep
                durationType={form.durationType}
                months={form.months}
                onDurationTypeChange={(durationType) =>
                  updateForm({ durationType: durationType as DurationType })
                }
                onMonthsChange={(months) => updateForm({ months })}
              />
            )}
            {step === 5 && (
              <SkillStep
                selected={form.skillLevel}
                onChange={(skillLevel) =>
                  updateForm({ skillLevel: skillLevel as SkillLevel })
                }
              />
            )}
            {step === 6 && (
              <SummaryStep
                email={form.email}
                message={form.message ?? ""}
                onMessageChange={(message) => updateForm({ message })}
                pricing={pricingPreview}
                error={error}
                submitting={loading}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {error && step !== 1 && step !== 6 && (
          <p className="mt-4 text-sm text-red-400">{error}</p>
        )}
        {!isStepValid && step !== 6 && !error && (
          <p className="mt-4 text-sm text-muted-foreground">
            You need to select an item to continue
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={loading}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous step
            </Button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid || loading}
            >
              {loading ? "Saving..." : "Next step"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !pricingPreview}
            >
              {loading ? "Submitting..." : "Submit inquiry"}
            </Button>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {currentStepMeta.title}
      </p>
    </div>
  );
}
