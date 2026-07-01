import { prisma } from "@/lib/db";
import { jsonOk, jsonError } from "@/lib/api-response";
import { pricingDraftSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = pricingDraftSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid request";
      return jsonError(message, 400);
    }

    const { email, inquiryId } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    if (inquiryId) {
      const existing = await prisma.taasInquiry.findUnique({
        where: { id: inquiryId },
      });

      if (existing && existing.status === "draft") {
        const updated = await prisma.taasInquiry.update({
          where: { id: inquiryId },
          data: { email: normalizedEmail },
        });
        return jsonOk({ inquiryId: updated.id, email: updated.email });
      }
    }

    const draftByEmail = await prisma.taasInquiry.findFirst({
      where: { email: normalizedEmail, status: "draft" },
      orderBy: { updatedAt: "desc" },
    });

    if (draftByEmail) {
      const updated = await prisma.taasInquiry.update({
        where: { id: draftByEmail.id },
        data: { email: normalizedEmail },
      });
      return jsonOk({ inquiryId: updated.id, email: updated.email });
    }

    const created = await prisma.taasInquiry.create({
      data: { email: normalizedEmail, status: "draft" },
    });

    return jsonOk({ inquiryId: created.id, email: created.email }, 201);
  } catch {
    return jsonError("Failed to save email", 500);
  }
}
