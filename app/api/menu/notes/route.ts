import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/require-owner";
import {
  BODY_MAX,
  TITLE_MAX,
  clampNoteBody,
  clampNoteTitle,
  isNoteColor,
  noteHasContent,
  parseNoteLines,
  DEFAULT_NOTE_COLOR,
  serializeNote,
} from "@/lib/menu-note";

type CreateNoteBody = {
  categoryId?: string;
  title?: string;
  body?: string;
  color?: string;
  lines?: unknown;
};

export async function POST(request: Request) {
  const denied = await requireOwner();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const input = body as CreateNoteBody;
  const categoryId = input.categoryId?.trim() ?? "";
  const title = clampNoteTitle(input.title ?? "");
  const text = clampNoteBody(input.body ?? "");
  const color = isNoteColor(input.color) ? input.color : DEFAULT_NOTE_COLOR;
  const lines = parseNoteLines(input.lines);

  if (!categoryId) {
    return NextResponse.json({ error: "Catégorie obligatoire." }, { status: 400 });
  }
  if ((input.title ?? "").trim().length > TITLE_MAX) {
    return NextResponse.json(
      { error: `Titre trop long (${TITLE_MAX} caractères max).` },
      { status: 400 },
    );
  }
  if ((input.body ?? "").trim().length > BODY_MAX) {
    return NextResponse.json(
      { error: `Commentaire trop long (${BODY_MAX} caractères max).` },
      { status: 400 },
    );
  }
  if (!noteHasContent({ title, body: text, lines })) {
    return NextResponse.json(
      { error: "Ajoutez un titre, un commentaire ou un supplément." },
      { status: 400 },
    );
  }

  const category = await prisma.menuCategory.findUnique({
    where: { id: categoryId },
    include: {
      items: { select: { position: true }, orderBy: { position: "desc" }, take: 1 },
      notes: { select: { position: true }, orderBy: { position: "desc" }, take: 1 },
    },
  });
  if (!category) {
    return NextResponse.json({ error: "Catégorie introuvable." }, { status: 404 });
  }

  const lastPosition = Math.max(
    category.items[0]?.position ?? -1,
    category.notes[0]?.position ?? -1,
  );

  const note = await prisma.menuNote.create({
    data: {
      categoryId,
      title,
      body: text,
      color,
      lines,
      position: lastPosition + 1,
    },
  });

  return NextResponse.json(serializeNote(note), { status: 201 });
}
