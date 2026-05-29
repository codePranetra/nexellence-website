import { getPublishedBlogBySlug } from "@/lib/blog-queries";
import { jsonError, jsonOk } from "@/lib/api-response";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (!blog) {
    return jsonError("Blog not found", 404);
  }
  return jsonOk(blog);
}
