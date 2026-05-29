export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function uniqueBlogSlug(
  base: string,
  excludeId?: number
): Promise<string> {
  const { prisma } = await import("@/lib/db");
  const slug = slugify(base) || "post";
  let candidate = slug;
  let n = 2;

  while (true) {
    const existing = await prisma.blog.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });
    if (!existing) return candidate;
    candidate = `${slug}-${n}`;
    n += 1;
  }
}

export async function uniqueCategorySlug(
  base: string,
  excludeId?: number
): Promise<string> {
  const { prisma } = await import("@/lib/db");
  const slug = slugify(base) || "category";
  let candidate = slug;
  let n = 2;

  while (true) {
    const existing = await prisma.category.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });
    if (!existing) return candidate;
    candidate = `${slug}-${n}`;
    n += 1;
  }
}
