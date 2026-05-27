import type { Metadata } from "next";
import { PrivacyPolicyPage } from "@/components/pages/privacy-policy-page";
import { PRIVACY_POLICY } from "@/lib/legal/privacy-policy";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${PRIVACY_POLICY.company} — ${SITE.name} recruitment services, NexFlow, and NexOne Assistant.`,
};

export default function PrivacyPolicyRoute() {
  return <PrivacyPolicyPage />;
}
