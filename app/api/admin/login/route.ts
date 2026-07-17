import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  if (!process.env.ADMIN_PIN) {
    return NextResponse.json(
      { error: "Configuration serveur manquante." },
      { status: 500 }
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

  if (!pin || pin !== process.env.ADMIN_PIN) {
    return NextResponse.json({ error: "Code incorrect" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    createAdminSessionToken(),
    getAdminSessionCookieOptions()
  );
  return response;
}
