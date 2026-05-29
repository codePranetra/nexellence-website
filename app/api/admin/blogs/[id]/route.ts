import { prisma } from "@/lib/db";
import { requireAdmin, isAdminSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api-response";
import { blogBodySchema } from "@/lib/validations";
import { serializeBlogDetail, updateBlogFromInput } from "@/lib/blog-queries";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Props) {
  const session = await requireAdmin();
  if (!isAdminSession(session)) return session;

  const id = Number((await params).id);
  if (Number.isNaN(id)) return jsonError("Invalid id", 400);

  const blog = await prisma.blog.findUnique({
    where: { id },
    include: { category: { select: { id: true, name: true, slug: true } } },
  });
  if (!blog) return jsonError("Blog not found", 404);

  return jsonOk(serializeBlogDetail(blog));
}

export async function PUT(request: Request, { params }: Props) {
  const session = await requireAdmin();
  if (!isAdminSession(session)) return session;

  const id = Number((await params).id);
  if (Number.isNaN(id)) return jsonError("Invalid id", 400);

  try {
    const body = await request.json();
    const parsed = blogBodySchema.partial().safeParse(body);
    if (!parsed.success) return jsonError("Invalid blog data", 400);

    if (parsed.data.category_id) {
      const category = await prisma.category.findUnique({
        where: { id: parsed.data.category_id },
      });
      if (!category) return jsonError("Category not found", 400);
    }

    const blog = await updateBlogFromInput(id, parsed.data, session.id);
    if (!blog) return jsonError("Blog not found", 404);

    return jsonOk(serializeBlogDetail(blog));
  } catch {
    return jsonError("Failed to update blog", 500);
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  const session = await requireAdmin();
  if (!isAdminSession(session)) return session;

  const id = Number((await params).id);
  if (Number.isNaN(id)) return jsonError("Invalid id", 400);

  try {
    await prisma.blog.delete({ where: { id } });
    return jsonOk({ deleted: true });
  } catch {
    return jsonError("Blog not found", 404);
  }
}
