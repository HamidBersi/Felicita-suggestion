import { createHmac, timingSafeEqual } from "crypto";
import { secretsMatch } from "@/lib/pin";

export const ADMIN_SESSION_COOKIE = "admin-session";
const SESSION_PAYLOAD = "felicita-admin-session-v1";

export function isValidAdminPin(pin: string): boolean {
  const expected = process.env.ADMIN_PIN;
  if (!expected) return false;
  return secretsMatch(pin, expected);
}

export function createAdminSessionToken(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return createHmac("sha256", secret).update(SESSION_PAYLOAD).digest("hex");
}

export function isValidAdminSessionToken(token: string | undefined): boolean {
  if (!token || !process.env.SESSION_SECRET) return false;
  try {
    const expected = createAdminSessionToken();
    const provided = Buffer.from(token);
    const reference = Buffer.from(expected);
    if (provided.length !== reference.length) return false;
    return timingSafeEqual(provided, reference);
  } catch {
    return false;
  }
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}
