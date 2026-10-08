import { NextResponse } from "next/server";
import { clientIp } from "@/lib/pin";
import { clearFailedAttempts, registerFailedAttempt } from "@/lib/rate-limit";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  isAdminPinConfigured,
  isValidAdminPin,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  if (!isAdminPinConfigured()) {
    return NextResponse.json(
      { error: "Configuration serveur manquante." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const pin =
    typeof body === "object" &&
    body !== null &&
    "pin" in body &&
    typeof (body as { pin: unknown }).pin === "string"
      ? (body as { pin: string }).pin.trim()
      : "";

  const attemptKey = `admin-login:${clientIp(request)}`;

  if (!isValidAdminPin(pin)) {
    if (registerFailedAttempt(attemptKey)) {
      return NextResponse.json(
        { error: "Trop d’essais. Réessaie plus tard." },
        { status: 429 },
      );
    }
    return NextResponse.json({ error: "Code incorrect." }, { status: 401 });
  }

  let token: string;
  try {
    token = createAdminSessionToken();
  } catch {
    return NextResponse.json(
      { error: "Configuration serveur manquante." },
      { status: 503 },
    );
  }

  clearFailedAttempts(attemptKey);

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    token,
    getAdminSessionCookieOptions(),
  );
  return response;
}
