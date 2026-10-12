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
  serializeNote,
} from "@/lib/menu-note";

type UpdateNoteBody = {
  title?: string;
  body?: string;
  color?: string;
  lines?: unknown;
};

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await requireOwner();
  if (denied) return denied;

  const { id } = await context.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const input = body as UpdateNoteBody;
  const data: {
    title?: string | null;
    body?: string;
    color?: string;
    lines?: ReturnType<typeof parseNoteLines>;
  } = {};

  if (input.title !== undefined) {
    if (input.title.trim().length > TITLE_MAX) {
      return NextResponse.json(
        { error: `Titre trop long (${TITLE_MAX} caractères max).` },
        { status: 400 },
      );
    }
    data.title = clampNoteTitle(input.title);
  }
  if (input.body !== undefined) {
    if (input.body.trim().length > BODY_MAX) {
      return NextResponse.json(
        { error: `Commentaire trop long (${BODY_MAX} caractères max).` },
        { status: 400 },
      );
    }
    data.body = clampNoteBody(input.body);
  }
  if (input.color !== undefined) {
    if (!isNoteColor(input.color)) {
      return NextResponse.json({ error: "Couleur inconnue." }, { status: 400 });
    }
    data.color = input.color;
  }
  if (input.lines !== undefined) {
    data.lines = parseNoteLines(input.lines);
  }

  const current = await prisma.menuNote.findUnique({ where: { id } });
  if (!current) {
    return NextResponse.json({ error: "Encadré introuvable." }, { status: 404 });
  }

  const nextTitle = data.title !== undefined ? data.title : current.title;
  const nextBody = data.body !== undefined ? data.body : current.body;
  const nextLines = data.lines ?? parseNoteLines(current.lines);
  if (!noteHasContent({ title: nextTitle, body: nextBody, lines: nextLines })) {
    return NextResponse.json(
      { error: "Ajoutez un titre, un commentaire ou un supplément." },
      { status: 400 },
    );
  }

  const note = await prisma.menuNote.update({
    where: { id },
    data,
  });
  return NextResponse.json(serializeNote(note));
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireOwner();
  if (denied) return denied;

  const { id } = await context.params;

  try {
    await prisma.menuNote.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Encadré introuvable." }, { status: 404 });
  }
}
