import { prisma } from "@/lib/db";
import { CategoryManager } from "@/components/admin/category-manager";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { blogs: true } } },
  });

  const rows = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    blog_count: c._count.blogs,
  }));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Categories</h1>
      <CategoryManager initial={rows} />
    </div>
  );
}
