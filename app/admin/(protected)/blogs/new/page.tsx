import { prisma } from "@/lib/db";
import { BlogForm } from "@/components/admin/blog-form";

export default async function NewBlogPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  if (categories.length === 0) {
    return (
      <p className="text-white/60">
        Create a category first before adding a blog post.
      </p>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New blog</h1>
      <BlogForm
        mode="create"
        categories={categories}
        initial={{
          title: "",
          slug: "",
          short_description: "",
          description: "",
          content: "<p></p>",
          thumbnail_image: "",
          thumbnail_alt_text: "",
          banner_image: "",
          banner_text: "",
          category_id: categories[0].id,
          is_published: false,
        }}
      />
    </div>
  );
}
