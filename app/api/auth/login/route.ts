import { authenticateAdmin, createSessionToken, setSessionCookie } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api-response";
import { loginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Invalid id or password", 400);
    }

    const admin = await authenticateAdmin(parsed.data.id, parsed.data.password);
    if (!admin) {
      return jsonError("Invalid credentials", 401);
    }

    const token = await createSessionToken(admin);
    await setSessionCookie(token);

    return jsonOk({ admin });
  } catch {
    return jsonError("Login failed", 500);
  }
}
