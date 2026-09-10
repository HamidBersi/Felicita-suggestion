import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Lecture publique du menu (QR / site / admin).
 * Pas d'auth : les prix sont publics. Les mutations seront protégées par requireOwner().
 */
export async function GET() {
  try {
    const categories = await prisma.menuCategory.findMany({
      orderBy: { position: "asc" },
      include: {
        items: {
          orderBy: { position: "asc" },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET /api/menu failed:", error);
    return NextResponse.json(
      { error: "Impossible de charger le menu." },
      { status: 500 },
    );
  }
}
