export const NOTE_COLORS = ["gold", "green", "orange"] as const;
export type NoteColor = (typeof NOTE_COLORS)[number];
export const DEFAULT_NOTE_COLOR: NoteColor = "gold";

export type MenuNoteLine = {
  name: string;
  price: string;
};

const TITLE_MAX = 40;
const BODY_MAX = 180;
const LINE_NAME_MAX = 48;
const MAX_LINES = 12;

export function isNoteColor(value: unknown): value is NoteColor {
  return value === "gold" || value === "green" || value === "orange";
}

export function parseNoteLines(raw: unknown): MenuNoteLine[] {
  if (!Array.isArray(raw)) return [];
  const lines: MenuNoteLine[] = [];
  for (const entry of raw.slice(0, MAX_LINES)) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry as { name?: unknown; price?: unknown };
    const name = typeof record.name === "string" ? record.name.trim() : "";
    const price = typeof record.price === "string" ? record.price.trim() : "";
    if (!name) continue;
    lines.push({
      name: name.slice(0, LINE_NAME_MAX),
      price: price.slice(0, 12),
    });
  }
  return lines;
}

export function noteHasContent(input: {
  title?: string | null;
  body?: string | null;
  lines?: MenuNoteLine[];
}): boolean {
  return Boolean(
    input.title?.trim() || input.body?.trim() || (input.lines?.length ?? 0) > 0,
  );
}

export function clampNoteTitle(value: string): string | null {
  const title = value.trim();
  if (!title) return null;
  return title.slice(0, TITLE_MAX);
}

export function clampNoteBody(value: string): string {
  return value.trim().slice(0, BODY_MAX);
}

export function serializeNote(note: {
  id: string;
  title: string | null;
  body: string | null;
  color?: string | null;
  lines?: unknown;
  position: number;
  categoryId: string;
}) {
  return {
    id: note.id,
    title: note.title,
    body: note.body ?? "",
    color: isNoteColor(note.color) ? note.color : DEFAULT_NOTE_COLOR,
    lines: parseNoteLines(note.lines),
    position: note.position,
    categoryId: note.categoryId,
  };
}

export { TITLE_MAX, BODY_MAX, MAX_LINES };
