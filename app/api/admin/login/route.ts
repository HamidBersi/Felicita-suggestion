import { NextResponse } from "next/server";
import { clientIp } from "@/lib/pin";
import { registerFailedAttempt } from "@/lib/rate-limit";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  isValidAdminPin,
} from "@/lib/admin-session";

export async function POST(request: Request) {
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

  if (!isValidAdminPin(pin)) {
    if (registerFailedAttempt(`admin-login:${clientIp(request)}`)) {
      return NextResponse.json(
        { error: "Trop d’essais. Réessaie plus tard." },
        { status: 429 },
      );
    }
    return NextResponse.json({ error: "Code incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    createAdminSessionToken(),
    getAdminSessionCookieOptions(),
  );
  return response;
}
