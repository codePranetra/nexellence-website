import { prisma } from "@/lib/db";
import { requireAdmin, isAdminSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api-response";
import { categoryCreateSchema } from "@/lib/validations";
import { uniqueCategorySlug } from "@/lib/slug";

export async function GET() {
  const session = await requireAdmin();
  if (!isAdminSession(session)) return session;

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { blogs: true } } },
  });

  return jsonOk(
    categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      blog_count: c._count.blogs,
      created_at: c.createdAt,
      updated_at: c.updatedAt,
    }))
  );
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!isAdminSession(session)) return session;

  try {
    const body = await request.json();
    const parsed = categoryCreateSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Invalid category data", 400);
    }

    const slug = parsed.data.slug
      ? await uniqueCategorySlug(parsed.data.slug)
      : await uniqueCategorySlug(parsed.data.name);

    const category = await prisma.category.create({
      data: { name: parsed.data.name, slug },
    });

    return jsonOk(category, 201);
  } catch {
    return jsonError("Failed to create category", 500);
  }
}
