import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  isAdminPinConfigured,
  isValidAdminSessionToken,
} from "@/lib/admin-session";
import { getSessionSigningKey } from "@/lib/pin";

/** Vérifie le cookie httpOnly de session admin. */
export async function requireAdmin(): Promise<NextResponse | null> {
  if (!isAdminPinConfigured() || !getSessionSigningKey("ADMIN_PIN")) {
    return NextResponse.json(
      { error: "Configuration serveur manquante." },
      { status: 500 },
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isValidAdminSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
