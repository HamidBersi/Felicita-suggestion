import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "admin-session";

const SESSION_PAYLOAD = "felicita-admin-session-v1";

/** Jeton de session dérivé du PIN serveur (pas stocké en clair). */
export function createAdminSessionToken(): string {
  const pin = process.env.ADMIN_PIN;
  if (!pin) {
    throw new Error("ADMIN_PIN is not set");
  }

  return createHmac("sha256", pin)
    .update(SESSION_PAYLOAD)
    .digest("hex");
}

export function isValidAdminSessionToken(
  token: string | undefined
): boolean {
  if (!token) return false;

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
