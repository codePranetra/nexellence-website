import { prisma } from "@/lib/db";
import { requireAdmin, isAdminSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api-response";
import { blogBodySchema } from "@/lib/validations";
import { createBlogFromInput, serializeBlogDetail } from "@/lib/blog-queries";

export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!isAdminSession(session)) return session;

  const { searchParams } = new URL(request.url);
  const isPublishedParam = searchParams.get("is_published");
  const categoryIdParam = searchParams.get("category_id");

  const blogs = await prisma.blog.findMany({
    where: {
      ...(isPublishedParam !== null && isPublishedParam !== ""
        ? { isPublished: isPublishedParam === "true" }
        : {}),
      ...(categoryIdParam
        ? { categoryId: Number(categoryIdParam) || undefined }
        : {}),
    },
    include: {
      category: { select: { id: true, name: true, slug: true } },
    },
    orderBy: [{ updatedAt: "desc" }],
  });

  return jsonOk(blogs.map((b) => serializeBlogDetail(b)));
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!isAdminSession(session)) return session;

  try {
    const body = await request.json();
    const parsed = blogBodySchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Invalid blog data", 400);
    }

    const category = await prisma.category.findUnique({
      where: { id: parsed.data.category_id },
    });
    if (!category) return jsonError("Category not found", 400);

    const blog = await createBlogFromInput(parsed.data, session.id);
    return jsonOk(serializeBlogDetail(blog), 201);
  } catch {
    return jsonError("Failed to create blog", 500);
  }
}
