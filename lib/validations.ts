import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

export const categoryCreateSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().max(120).optional(),
});

export const categoryUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z.string().max(120).optional(),
});

export const blogBodySchema = z.object({
  slug: z.string().max(255).optional(),
  title: z.string().min(1).max(255),
  short_description: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  content: z.string().min(1),
  thumbnail_image: z.string().max(500).optional().nullable(),
  thumbnail_alt_text: z.string().max(255).optional().nullable(),
  banner_image: z.string().max(500).optional().nullable(),
  banner_text: z.string().max(500).optional().nullable(),
  category_id: z.coerce.number().int().positive(),
  is_published: z.boolean().optional(),
});

export type BlogBodyInput = z.infer<typeof blogBodySchema>;

const serviceIdEnum = z.enum([
  "candidate-sourcing",
  "contact-details",
  "outreach",
  "crm-ats",
  "pre-screening",
  "business-development",
]);

export const pricingDraftSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  inquiryId: z.coerce.number().int().positive().optional(),
});

export const pricingInquirySchema = z.object({
  inquiryId: z.coerce.number().int().positive(),
  email: z.string().email(),
  services: z.array(serviceIdEnum).min(1, "Select at least one service"),
  weeklyHours: z.union([z.literal(20), z.literal(30), z.literal(40)]),
  durationType: z.enum(["short", "long"]),
  months: z.coerce.number().int().min(1).max(120),
  skillLevel: z.enum(["fresher", "intermediate", "expert"]),
  message: z.string().max(5000).optional().nullable(),
});

export type PricingDraftInput = z.infer<typeof pricingDraftSchema>;
export type PricingInquiryInput = z.infer<typeof pricingInquirySchema>;
