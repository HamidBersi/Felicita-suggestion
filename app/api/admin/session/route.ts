import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  isValidAdminSessionToken,
} from "@/lib/admin-session";

export async function GET() {
  if (!process.env.ADMIN_PIN) {
    return NextResponse.json({ authenticated: false });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  return NextResponse.json({
    authenticated: isValidAdminSessionToken(token),
  });
}
