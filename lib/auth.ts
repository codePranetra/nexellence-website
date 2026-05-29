import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { jsonError } from "@/lib/api-response";

const COOKIE_NAME = "admin_token";
const TOKEN_TTL = "8h";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export type AdminSession = {
  id: number;
  name: string;
  email: string;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(admin: AdminSession) {
  return new SignJWT({ sub: String(admin.id), name: admin.name, email: admin.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(getJwtSecret());
}

export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const id = Number(payload.sub);
    if (!id || Number.isNaN(id)) return null;
    return {
      id,
      name: String(payload.name ?? ""),
      email: String(payload.email ?? ""),
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function authenticateAdmin(id: number, password: string) {
  const admin = await prisma.login.findUnique({ where: { id } });
  if (!admin) return null;
  const valid = await verifyPassword(password, admin.hashPassword);
  if (!valid) return null;
  return { id: admin.id, name: admin.name, email: admin.email };
}

export async function requireAdmin(): Promise<AdminSession | Response> {
  const session = await getSession();
  if (!session) {
    return jsonError("Unauthorized", 401);
  }
  return session;
}

export function isAdminSession(value: AdminSession | Response): value is AdminSession {
  return !(value instanceof Response);
}
