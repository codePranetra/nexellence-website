import { z } from "zod";

export const loginSchema = z.object({
  id: z.coerce.number().int().positive(),
  password: z.string().min(1),
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
