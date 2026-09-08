import { createHmac, timingSafeEqual } from "crypto";

export const OWNER_SESSION_COOKIE = "owner-session";

const SESSION_PAYLOAD = "felicita-owner-session-v1";

/** Jeton de session dérivé du PIN patron (pas stocké en clair). */
export function createOwnerSessionToken(): string {
  const pin = process.env.OWNER_PIN;
  if (!pin) {
    throw new Error("OWNER_PIN is not set");
  }

  return createHmac("sha256", pin)
    .update(SESSION_PAYLOAD)
    .digest("hex");
}

export function isValidOwnerSessionToken(
  token: string | undefined
): boolean {
  if (!token) return false;

  try {
    const expected = createOwnerSessionToken();
    const provided = Buffer.from(token);
    const reference = Buffer.from(expected);

    if (provided.length !== reference.length) return false;
    return timingSafeEqual(provided, reference);
  } catch {
    return false;
  }
}

export function getOwnerSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}
