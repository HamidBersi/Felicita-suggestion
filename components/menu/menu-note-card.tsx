import type { MenuNoteColor, MenuNoteDto } from "@/components/menu/menu-types";
import { formatEuro } from "@/components/menu/wine-prices";

type MenuNoteCardProps = {
  note: MenuNoteDto;
  compact?: boolean;
};

function noteColor(note: MenuNoteDto): MenuNoteColor {
  return note.color === "green" || note.color === "orange" ? note.color : "gold";
}

export function MenuNoteCard({ note, compact = false }: MenuNoteCardProps) {
  const title = note.title?.trim() || null;
  const comment = note.body?.trim() || null;
  const lines = (note.lines ?? []).filter((line) => line.name.trim());
  if (!title && !comment && lines.length === 0) return null;

  const commentOnly = !title && lines.length === 0 && Boolean(comment);

  return (
    <aside
      data-note-id={note.id}
      className={`menu-note menu-note--${noteColor(note)} ${
        compact ? "menu-note--print" : ""
      } ${commentOnly ? "menu-note--solo" : ""}`}
    >
      {title ? <p className="menu-note-kicker">{title}</p> : null}
      {lines.length > 0 ? (
        <ul className="menu-note-lines">
          {lines.map((line, index) => (
            <li key={`${line.name}-${index}`} className="menu-note-line">
              <span className="menu-note-line-name">{line.name}</span>
              <span className="menu-note-line-dots" aria-hidden />
              {line.price.trim() ? (
                <span className="menu-note-line-price">
                  {formatEuro(line.price)}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
      {comment ? <p className="menu-note-body">{comment}</p> : null}
    </aside>
  );
}

export function visibleNotes(notes: MenuNoteDto[] | undefined): MenuNoteDto[] {
  return [...(notes ?? [])]
    .filter(
      (note) =>
        note.title?.trim() ||
        note.body?.trim() ||
        (note.lines ?? []).some((line) => line.name.trim()),
    )
    .sort((a, b) => a.position - b.position);
}
