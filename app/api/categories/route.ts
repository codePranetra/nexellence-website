import { getAllCategories } from "@/lib/blog-queries";
import { jsonOk } from "@/lib/api-response";

export async function GET() {
  const categories = await getAllCategories();
  return jsonOk(categories);
}
