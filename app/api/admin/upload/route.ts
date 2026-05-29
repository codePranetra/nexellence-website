import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { requireAdmin, isAdminSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api-response";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!isAdminSession(session)) return session;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return jsonError("No file provided", 400);
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return jsonError("Invalid file type. Use JPEG, PNG, WebP, or GIF.", 400);
    }

    if (file.size > MAX_SIZE) {
      return jsonError("File too large (max 5MB)", 400);
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
    const filename = `${randomUUID()}.${safeExt === "jpeg" ? "jpg" : safeExt}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs");
    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, filename), buffer);

    return jsonOk({ url: `/uploads/blogs/${filename}` });
  } catch {
    return jsonError("Upload failed", 500);
  }
}
