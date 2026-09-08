import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  OWNER_SESSION_COOKIE,
  isValidOwnerSessionToken,
} from "@/lib/owner-session";

/** Vérifie le cookie httpOnly de session patron (menu). */
export async function requireOwner(): Promise<NextResponse | null> {
  if (!process.env.OWNER_PIN) {
    return NextResponse.json(
      { error: "Configuration serveur manquante." },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(OWNER_SESSION_COOKIE)?.value;

  if (!isValidOwnerSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
