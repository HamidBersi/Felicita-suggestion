import { createHmac, timingSafeEqual } from "crypto";
import { getSessionSigningKey, readEnvSecret, secretsMatch } from "@/lib/pin";

export const OWNER_SESSION_COOKIE = "owner-session";
const SESSION_PAYLOAD = "felicita-owner-session-v1";

export function isOwnerPinConfigured(): boolean {
  return readEnvSecret("OWNER_PIN") !== null;
}

export function isValidOwnerPin(pin: string): boolean {
  const expected = readEnvSecret("OWNER_PIN");
  if (!expected) return false;
  return secretsMatch(pin.trim(), expected);
}

export function createOwnerSessionToken(): string {
  const secret = getSessionSigningKey("OWNER_PIN");
  if (!secret) {
    throw new Error("SESSION_SECRET or OWNER_PIN is not set");
  }
  return createHmac("sha256", secret).update(SESSION_PAYLOAD).digest("hex");
}

export function isValidOwnerSessionToken(token: string | undefined): boolean {
  if (!token || !getSessionSigningKey("OWNER_PIN")) return false;
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
