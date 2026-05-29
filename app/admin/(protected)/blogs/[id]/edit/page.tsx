import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { BlogForm } from "@/components/admin/blog-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: Props) {
  const id = Number((await params).id);
  if (Number.isNaN(id)) notFound();

  const [blog, categories] = await Promise.all([
    prisma.blog.findUnique({ where: { id } }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
    }),
  ]);

  if (!blog) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit blog</h1>
      <BlogForm
        mode="edit"
        categories={categories}
        initial={{
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          short_description: blog.shortDescription ?? "",
          description: blog.description ?? "",
          content: blog.content,
          thumbnail_image: blog.thumbnailImage ?? "",
          thumbnail_alt_text: blog.thumbnailAltText ?? "",
          banner_image: blog.bannerImage ?? "",
          banner_text: blog.bannerText ?? "",
          category_id: blog.categoryId,
          is_published: blog.isPublished,
        }}
      />
    </div>
  );
}
