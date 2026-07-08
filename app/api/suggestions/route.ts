import { NextResponse } from "next/server";
import { defaultSuggestions } from "@/lib/suggestions-storage";

// Note: cette API n'utilise pas la BDD. L'application principale lit les suggestions
// depuis `localStorage` côté client (notamment dans `/display`).
export async function GET() {
  return NextResponse.json(defaultSuggestions);
}