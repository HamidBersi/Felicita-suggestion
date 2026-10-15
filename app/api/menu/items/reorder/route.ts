import { NextResponse } from "next/server";
import { noteHasContent, serializeNote } from "@/lib/menu-note";
import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/require-owner";

type ReorderBody = {
  categoryId?: string;
  orderedIds?: string[];
};

/**
 * Réordonne plats et encadrés d’une catégorie (position = index).
 */
export async function PATCH(request: Request) {
  const denied = await requireOwner();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const input = body as ReorderBody;
  const categoryId = input.categoryId?.trim() ?? "";
  const orderedIds = Array.isArray(input.orderedIds)
    ? input.orderedIds.filter((id): id is string => typeof id === "string" && id.length > 0)
    : [];

  if (!categoryId) {
    return NextResponse.json({ error: "categoryId obligatoire." }, { status: 400 });
  }
  if (orderedIds.length === 0) {
    return NextResponse.json({ error: "orderedIds obligatoire." }, { status: 400 });
  }

  const [items, notes] = await Promise.all([
    prisma.menuItem.findMany({
      where: { categoryId, isAvailable: true },
      select: { id: true },
    }),
    prisma.menuNote.findMany({
      where: { categoryId },
    }),
  ]);
  const itemIds = new Set(items.map((item) => item.id));
  const noteIds = new Set(
    notes
      .map(serializeNote)
      .filter((note) => noteHasContent(note))
      .map((note) => note.id),
  );
  const expected = new Set([...itemIds, ...noteIds]);

  if (orderedIds.length !== expected.size) {
    return NextResponse.json(
      { error: "La liste ne correspond pas aux plats et encadrés." },
      { status: 400 },
    );
  }
  for (const id of orderedIds) {
    if (!expected.has(id)) {
      return NextResponse.json(
        { error: "Un élément n’appartient pas à cette catégorie." },
        { status: 400 },
      );
    }
  }

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      itemIds.has(id)
        ? prisma.menuItem.update({ where: { id }, data: { position: index } })
        : prisma.menuNote.update({ where: { id }, data: { position: index } }),
    ),
  );

  return NextResponse.json({ ok: true });
}
