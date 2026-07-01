import { prisma } from "@/lib/db";
import { jsonOk, jsonError } from "@/lib/api-response";
import { calculatePricing } from "@/lib/pricing/calculate";
import type { DurationType, ServiceId, SkillLevel, WeeklyHours } from "@/lib/pricing/config";
import { pricingInquirySchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = pricingInquirySchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid request";
      return jsonError(message, 400);
    }

    const data = parsed.data;
    const normalizedEmail = data.email.trim().toLowerCase();

    const inquiry = await prisma.taasInquiry.findUnique({
      where: { id: data.inquiryId },
    });

    if (!inquiry) {
      return jsonError("Inquiry not found", 404);
    }

    if (inquiry.status === "submitted") {
      return jsonError("This inquiry has already been submitted", 400);
    }

    const pricing = calculatePricing({
      services: data.services as ServiceId[],
      weeklyHours: data.weeklyHours as WeeklyHours,
      durationType: data.durationType as DurationType,
      months: data.months,
      skillLevel: data.skillLevel as SkillLevel,
    });

    const updated = await prisma.taasInquiry.update({
      where: { id: data.inquiryId },
      data: {
        email: normalizedEmail,
        services: data.services,
        weeklyHours: data.weeklyHours,
        durationType: data.durationType,
        months: data.months,
        skillLevel: data.skillLevel,
        message: data.message?.trim() || null,
        lineItems: pricing.lineItems,
        discountCents: pricing.discountCents,
        totalCents: pricing.totalCents,
        status: "submitted",
      },
    });

    return jsonOk({
      inquiryId: updated.id,
      email: updated.email,
      pricing: {
        lineItems: pricing.lineItems,
        discount: pricing.discount,
        subtotal: pricing.subtotal,
        total: pricing.total,
      },
    });
  } catch {
    return jsonError("Failed to submit inquiry", 500);
  }
}
