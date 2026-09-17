import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MENU_TYPES = new Set(["salle", "emporter"]);

/**
 * Lecture publique du menu (QR / site / admin).
 * Pas d'auth : les prix sont publics.
 *
 * ?type=salle (défaut) | emporter — deux cartes en base, une seule exposée à la fois.
 */
export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get("type") ?? "salle";
    const menuType = MENU_TYPES.has(raw) ? raw : "salle";

    const categories = await prisma.menuCategory.findMany({
      where: { menuType },
      orderBy: { position: "asc" },
      include: {
        items: {
          orderBy: { position: "asc" },
        },
      },
    });

    return NextResponse.json(categories, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("GET /api/menu failed:", error);
    return NextResponse.json(
      { error: "Impossible de charger le menu." },
      { status: 500 },
    );
  }
}
