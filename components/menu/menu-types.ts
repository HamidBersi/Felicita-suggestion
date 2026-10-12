export type MenuItemDto = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  isAvailable: boolean;
  isHidden?: boolean;
  position: number;
  categoryId: string;
  priceVerre?: string | null;
  priceQuart?: string | null;
  priceDemi?: string | null;
  priceBouteille?: string | null;
  emoji?: string | null;
};

export type MenuNoteLineDto = {
  name: string;
  price: string;
};

export type MenuNoteColor = "gold" | "green" | "orange";

export type MenuNoteDto = {
  id: string;
  title: string | null;
  body: string;
  color?: MenuNoteColor;
  lines?: MenuNoteLineDto[];
  position: number;
  categoryId: string;
};

export type CategoryEntry =
  | { kind: "item"; id: string; position: number; item: MenuItemDto }
  | { kind: "note"; id: string; position: number; note: MenuNoteDto };

export type MenuCategoryDto = {
  id: string;
  name: string;
  position: number;
  /** "salle" | "emporter" */
  menuType?: string;
  items: MenuItemDto[];
  notes?: MenuNoteDto[];
};

/** L’édition liste tout ; aperçu / print cachent seulement un `false` explicite. */
export function isListedOnMenu(item: Pick<MenuItemDto, "isAvailable">): boolean {
  return item.isAvailable !== false;
}

/** Masqué temporairement : reste sur la carte, indiqué « En rupture ». */
export function isOutOfStock(item: Pick<MenuItemDto, "isHidden">): boolean {
  return item.isHidden === true;
}

export function isVisibleNote(note: MenuNoteDto): boolean {
  return Boolean(
    note.title?.trim() ||
      note.body?.trim() ||
      (note.lines ?? []).some((line) => line.name.trim()),
  );
}

export function orderedCategoryEntries(
  category: Pick<MenuCategoryDto, "items" | "notes">,
  listedOnly = true,
): CategoryEntry[] {
  const items = (listedOnly
    ? category.items.filter((item) => isListedOnMenu(item))
    : category.items
  ).map((item) => ({
    kind: "item" as const,
    id: item.id,
    position: item.position,
    item,
  }));
  const notes = (category.notes ?? []).filter(isVisibleNote).map((note) => ({
    kind: "note" as const,
    id: note.id,
    position: note.position,
    note,
  }));
  return [...items, ...notes].sort((a, b) => {
    if (a.position !== b.position) return a.position - b.position;
    if (a.kind === b.kind) return 0;
    return a.kind === "item" ? -1 : 1;
  });
}
