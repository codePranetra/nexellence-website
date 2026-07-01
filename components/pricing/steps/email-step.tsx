"use client";

type EmailStepProps = {
  email: string;
  onChange: (email: string) => void;
  error?: string;
};

export function EmailStep({ email, onChange, error }: EmailStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Let&apos;s Begin</h2>
        <p className="mt-2 text-muted-foreground">
          Enter your email address to get started with your custom talent plan.
        </p>
      </div>
      <div>
        <label htmlFor="pricing-email" className="text-sm font-medium">
          Enter Your Email Address
        </label>
        <input
          id="pricing-email"
          type="email"
          value={email}
          onChange={(e) => onChange(e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          className="mt-2 w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none transition focus:border-brand-electric focus:shadow-[0_0_20px_rgba(0,180,255,0.2)]"
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
}
