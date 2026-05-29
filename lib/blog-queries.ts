import { prisma } from "@/lib/db";
import type { BlogBodyInput } from "@/lib/validations";
import { uniqueBlogSlug } from "@/lib/slug";

const categorySelect = {
  id: true,
  name: true,
  slug: true,
} as const;

export const blogListSelect = {
  id: true,
  slug: true,
  title: true,
  shortDescription: true,
  thumbnailImage: true,
  thumbnailAltText: true,
  isPublished: true,
  publishedAt: true,
  createdAt: true,
  category: { select: categorySelect },
} as const;

export function serializeBlogListItem(blog: {
  id: number;
  slug: string;
  title: string;
  shortDescription: string | null;
  thumbnailImage: string | null;
  thumbnailAltText: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  category: { id: number; name: string; slug: string };
}) {
  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    short_description: blog.shortDescription,
    thumbnail_image: blog.thumbnailImage,
    thumbnail_alt_text: blog.thumbnailAltText,
    is_published: blog.isPublished,
    published_at: blog.publishedAt,
    created_at: blog.createdAt,
    category: blog.category,
  };
}

export function serializeBlogDetail(blog: {
  id: number;
  slug: string;
  title: string;
  shortDescription: string | null;
  description: string | null;
  content: string;
  thumbnailImage: string | null;
  thumbnailAltText: string | null;
  bannerImage: string | null;
  bannerText: string | null;
  categoryId: number;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  category: { id: number; name: string; slug: string };
}) {
  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    short_description: blog.shortDescription,
    description: blog.description,
    content: blog.content,
    thumbnail_image: blog.thumbnailImage,
    thumbnail_alt_text: blog.thumbnailAltText,
    banner_image: blog.bannerImage,
    banner_text: blog.bannerText,
    category_id: blog.categoryId,
    is_published: blog.isPublished,
    published_at: blog.publishedAt,
    created_at: blog.createdAt,
    updated_at: blog.updatedAt,
    category: blog.category,
  };
}

export async function getPublishedBlogs(options?: {
  categorySlug?: string;
  page?: number;
  limit?: number;
}) {
  const page = options?.page ?? 1;
  const limit = Math.min(options?.limit ?? 50, 100);
  const skip = (page - 1) * limit;

  const blogs = await prisma.blog.findMany({
    where: {
      isPublished: true,
      ...(options?.categorySlug
        ? { category: { slug: options.categorySlug } }
        : {}),
    },
    select: blogListSelect,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    skip,
    take: limit,
  });

  return blogs.map(serializeBlogListItem);
}

export async function getPublishedBlogBySlug(slug: string) {
  const blog = await prisma.blog.findFirst({
    where: { slug, isPublished: true },
    include: { category: { select: categorySelect } },
  });
  if (!blog) return null;
  return serializeBlogDetail(blog);
}

export async function getFeaturedPublishedBlog() {
  const blog = await prisma.blog.findFirst({
    where: { isPublished: true },
    include: { category: { select: categorySelect } },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  if (!blog) return null;
  return serializeBlogDetail(blog);
}

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    select: categorySelect,
  });
}

export function resolvePublishedAt(isPublished: boolean, currentPublishedAt: Date | null) {
  if (isPublished && !currentPublishedAt) {
    return new Date();
  }
  if (!isPublished) {
    return null;
  }
  return currentPublishedAt;
}

export async function createBlogFromInput(
  input: BlogBodyInput,
  adminId: number
) {
  const slug = input.slug
    ? await uniqueBlogSlug(input.slug)
    : await uniqueBlogSlug(input.title);
  const isPublished = input.is_published ?? false;

  const blog = await prisma.blog.create({
    data: {
      slug,
      title: input.title,
      shortDescription: input.short_description ?? null,
      description: input.description ?? null,
      content: input.content,
      thumbnailImage: input.thumbnail_image ?? null,
      thumbnailAltText: input.thumbnail_alt_text ?? null,
      bannerImage: input.banner_image ?? null,
      bannerText: input.banner_text ?? null,
      categoryId: input.category_id,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
      createdById: adminId,
      updatedById: adminId,
    },
    include: { category: { select: categorySelect } },
  });

  return blog;
}

export async function updateBlogFromInput(
  id: number,
  input: Partial<BlogBodyInput>,
  adminId: number
) {
  const existing = await prisma.blog.findUnique({ where: { id } });
  if (!existing) return null;

  const isPublished =
    input.is_published !== undefined ? input.is_published : existing.isPublished;

  const slug =
    input.slug !== undefined
      ? await uniqueBlogSlug(input.slug, id)
      : input.title !== undefined
        ? await uniqueBlogSlug(input.title, id)
        : existing.slug;

  const blog = await prisma.blog.update({
    where: { id },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      slug,
      ...(input.short_description !== undefined && {
        shortDescription: input.short_description,
      }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.content !== undefined && { content: input.content }),
      ...(input.thumbnail_image !== undefined && {
        thumbnailImage: input.thumbnail_image,
      }),
      ...(input.thumbnail_alt_text !== undefined && {
        thumbnailAltText: input.thumbnail_alt_text,
      }),
      ...(input.banner_image !== undefined && { bannerImage: input.banner_image }),
      ...(input.banner_text !== undefined && { bannerText: input.banner_text }),
      ...(input.category_id !== undefined && { categoryId: input.category_id }),
      isPublished,
      publishedAt: resolvePublishedAt(isPublished, existing.publishedAt),
      updatedById: adminId,
    },
    include: { category: { select: categorySelect } },
  });

  return blog;
}
