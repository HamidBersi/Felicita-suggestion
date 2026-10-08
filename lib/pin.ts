import { timingSafeEqual } from "crypto";

/** Compare deux secrets sans fuite par temps de réponse. */
export function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** PIN env normalisé (trim) — évite les faux « code incorrect » à cause d’espaces Vercel. */
export function readEnvSecret(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

/**
 * Clé HMAC des cookies de session.
 * Prefère SESSION_SECRET ; sinon retombe sur le PIN du rôle (compat déploiements
 * existants qui n’ont pas encore SESSION_SECRET).
 */
export function getSessionSigningKey(fallbackPinEnv: "ADMIN_PIN" | "OWNER_PIN"): string | null {
  return readEnvSecret("SESSION_SECRET") ?? readEnvSecret(fallbackPinEnv);
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
  );
}
