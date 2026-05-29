import { prisma } from "@/lib/db";
import { requireAdmin, isAdminSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api-response";
import { categoryUpdateSchema } from "@/lib/validations";
import { uniqueCategorySlug } from "@/lib/slug";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Props) {
  const session = await requireAdmin();
  if (!isAdminSession(session)) return session;

  const id = Number((await params).id);
  if (Number.isNaN(id)) return jsonError("Invalid id", 400);

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) return jsonError("Category not found", 404);

  return jsonOk(category);
}

export async function PUT(request: Request, { params }: Props) {
  const session = await requireAdmin();
  if (!isAdminSession(session)) return session;

  const id = Number((await params).id);
  if (Number.isNaN(id)) return jsonError("Invalid id", 400);

  try {
    const body = await request.json();
    const parsed = categoryUpdateSchema.safeParse(body);
    if (!parsed.success) return jsonError("Invalid category data", 400);

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) return jsonError("Category not found", 404);

    const slug =
      parsed.data.slug !== undefined
        ? await uniqueCategorySlug(parsed.data.slug, id)
        : parsed.data.name !== undefined
          ? await uniqueCategorySlug(parsed.data.name, id)
          : existing.slug;

    const category = await prisma.category.update({
      where: { id },
      data: {
        ...(parsed.data.name !== undefined && { name: parsed.data.name }),
        slug,
      },
    });

    return jsonOk(category);
  } catch {
    return jsonError("Failed to update category", 500);
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  const session = await requireAdmin();
  if (!isAdminSession(session)) return session;

  const id = Number((await params).id);
  if (Number.isNaN(id)) return jsonError("Invalid id", 400);

  const blogCount = await prisma.blog.count({ where: { categoryId: id } });
  if (blogCount > 0) {
    return jsonError("Cannot delete category with existing blogs", 409);
  }

  try {
    await prisma.category.delete({ where: { id } });
    return jsonOk({ deleted: true });
  } catch {
    return jsonError("Category not found", 404);
  }
}
