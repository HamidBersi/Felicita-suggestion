import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/require-owner";

const MENU_TYPES = new Set(["salle", "emporter"]);

/** Carte complète pour le gérant (y compris plats cachés). */
export async function GET(request: Request) {
  const denied = await requireOwner();
  if (denied) return denied;

  const raw = new URL(request.url).searchParams.get("type") ?? "salle";
  const menuType = MENU_TYPES.has(raw) ? raw : "salle";

  const categories = await prisma.menuCategory.findMany({
    where: { menuType },
    orderBy: { position: "asc" },
    include: {
      items: {
        where: { isAvailable: true },
        orderBy: { position: "asc" },
      },
    },
  });

  return NextResponse.json(categories, {
    headers: { "Cache-Control": "no-store" },
  });
}
