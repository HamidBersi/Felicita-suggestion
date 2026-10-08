import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  OWNER_SESSION_COOKIE,
  isOwnerPinConfigured,
  isValidOwnerSessionToken,
} from "@/lib/owner-session";

export async function GET() {
  if (!isOwnerPinConfigured()) {
    return NextResponse.json({ authenticated: false });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(OWNER_SESSION_COOKIE)?.value;

  return NextResponse.json({
    authenticated: isValidOwnerSessionToken(token),
  });
}
