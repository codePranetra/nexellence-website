import { getPublishedBlogs } from "@/lib/blog-queries";
import { jsonOk } from "@/lib/api-response";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category_slug") ?? undefined;
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "50");

  const blogs = await getPublishedBlogs({
    categorySlug,
    page: Number.isNaN(page) ? 1 : page,
    limit: Number.isNaN(limit) ? 50 : limit,
  });

  return jsonOk(blogs);
}
