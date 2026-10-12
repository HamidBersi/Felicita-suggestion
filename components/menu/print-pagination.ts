import type {
  MenuCategoryDto,
  MenuItemDto,
  MenuNoteDto,
} from "@/components/menu/menu-types";
import { isListedOnMenu } from "@/components/menu/menu-types";

export type PrintPageSection = {
  categoryId: string;
  categoryName: string;
  continuation: boolean;
  items: MenuItemDto[];
  notes?: MenuNoteDto[];
};

export type PrintPageSlice = {
  page: number;
  isCover: boolean;
  sections: PrintPageSection[];
};

const HASH_STORAGE_KEY = "felicita-menu-print-page-hashes";

export function hashPrintSlice(slice: PrintPageSlice): string {
  if (slice.isCover) return "cover:v2-logo";
  return slice.sections
    .map((section) =>
      [
        section.categoryId,
        section.continuation ? "cont" : "start",
        ...(section.notes ?? []).map(
          (note) =>
            `note:${note.id}:${note.title ?? ""}:${note.body}:${note.color ?? ""}:${JSON.stringify(note.lines ?? [])}:${note.position}`,
        ),
        ...section.items.map((item) =>
          [
            item.id,
            item.name,
            item.price,
            item.priceVerre ?? "",
            item.priceQuart ?? "",
            item.priceDemi ?? "",
            item.priceBouteille ?? "",
            item.emoji ?? "",
            item.description ?? "",
            item.isAvailable ? "1" : "0",
            item.isHidden ? "1" : "0",
          ].join(":"),
        ),
      ].join("|"),
    )
    .join("/");
}

export function loadLastPrintHashes(): Record<string, string> {
  try {
    const raw = localStorage.getItem(HASH_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as Record<string, string>;
  } catch {
    return {};
  }
}

export function rememberPrintedPages(
  allSlices: PrintPageSlice[],
  printedPages: number[],
) {
  const printAll = printedPages.length === allSlices.length;
  const next: Record<string, string> = printAll ? {} : { ...loadLastPrintHashes() };
  const source = printAll
    ? allSlices
    : allSlices.filter((slice) => printedPages.includes(slice.page));
  for (const slice of source) {
    next[String(slice.page)] = hashPrintSlice(slice);
  }
  localStorage.setItem(HASH_STORAGE_KEY, JSON.stringify(next));
}

export function modifiedPrintPages(
  slices: PrintPageSlice[],
  previous: Record<string, string>,
): number[] {
  const previousPages = Object.keys(previous);
  if (previousPages.length === 0) {
    return slices.map((slice) => slice.page);
  }

  return slices
    .filter((slice) => previous[String(slice.page)] !== hashPrintSlice(slice))
    .map((slice) => slice.page);
}

export function pagePreviewLabel(slice: PrintPageSlice): string {
  if (slice.isCover) return "Page d’entrée";
  const names = slice.sections.map((section) =>
    section.continuation ? `${section.categoryName} (suite)` : section.categoryName,
  );
  return names.join(" · ");
}

/** Si la mesure DOM a loupé un plat, on le recolle sur la dernière page. */
export function appendMissingPrintItems(
  slices: PrintPageSlice[],
  categories: MenuCategoryDto[],
): PrintPageSlice[] {
  const included = new Set(
    slices.flatMap((slice) =>
      slice.sections.flatMap((section) => section.items.map((item) => item.id)),
    ),
  );

  const missingByCategory = new Map<string, PrintPageSection>();
  for (const category of categories) {
    for (const item of category.items) {
      if (!isListedOnMenu(item) || included.has(item.id)) continue;
      const current = missingByCategory.get(category.id);
      if (current) {
        current.items.push(item);
      } else {
        missingByCategory.set(category.id, {
          categoryId: category.id,
          categoryName: category.name,
          continuation: slices.some((slice) =>
            slice.sections.some((section) => section.categoryId === category.id),
          ),
          items: [item],
        });
      }
    }
  }

  if (missingByCategory.size === 0) return slices;

  const extra = [...missingByCategory.values()];
  const lastContent = [...slices].reverse().find((slice) => !slice.isCover);
  if (lastContent) {
    return slices.map((slice) =>
      slice.page === lastContent.page
        ? { ...slice, sections: [...slice.sections, ...extra] }
        : slice,
    );
  }

  const page = slices.length + 1;
  return [
    ...slices,
    { page, isCover: false, sections: extra },
  ];
}

export function slicePrintPagesFromDom(
  root: HTMLElement,
  pageHeightPx: number,
  categories: MenuCategoryDto[],
): PrintPageSlice[] {
  const itemsById = new Map<string, MenuItemDto>();
  const notesByCategory = new Map<string, MenuNoteDto[]>();
  for (const category of categories) {
    notesByCategory.set(category.id, category.notes ?? []);
    for (const item of category.items) {
      itemsById.set(item.id, item);
    }
  }

  const pages: PrintPageSlice[] = [];
  if (root.querySelector(".menu-cover")) {
    pages.push({ page: 1, isCover: true, sections: [] });
  }

  let pageNum = pages.length + 1;
  let used = 0;
  let sections: PrintPageSection[] = [];

  function flush() {
    if (sections.length === 0) return;
    pages.push({ page: pageNum, isCover: false, sections });
    pageNum += 1;
    sections = [];
    used = 0;
  }

  const categoryEls = root.querySelectorAll<HTMLElement>(".menu-cat");
  for (const categoryEl of categoryEls) {
    const categoryId = categoryEl.dataset.categoryId;
    if (!categoryId) continue;
    const categoryName =
      categoryEl.querySelector(".menu-cat-title span")?.textContent?.trim() ??
      "";
    const titleEl = categoryEl.querySelector<HTMLElement>(".menu-cat-title");
    const thead = categoryEl.querySelector<HTMLElement>(".wine-table thead");
    const titleHeight =
      (titleEl?.offsetHeight ?? 0) + (thead?.offsetHeight ?? 0) + 12;
    const categoryNotes = notesByCategory.get(categoryId) ?? [];
    const notesById = new Map(categoryNotes.map((note) => [note.id, note]));
    const blockEls = [
      ...categoryEl.querySelectorAll<HTMLElement>(
        "[data-item-id], [data-note-id]",
      ),
    ];
    const gap = 8;
    const noteTopGap = 16;
    const orphanMin = 2;

    function blockPackHeight(el: HTMLElement): number {
      const extra = el.dataset.noteId ? noteTopGap : 0;
      return el.offsetHeight + gap + extra;
    }

    function packHeight(fromIndex: number, count: number): number {
      let height = titleHeight;
      for (let offset = 0; offset < count; offset += 1) {
        const el = blockEls[fromIndex + offset];
        if (!el) break;
        height += blockPackHeight(el);
      }
      return height;
    }

    function pruneEmptySections() {
      while (sections.length > 0) {
        const last = sections[sections.length - 1];
        if (last.items.length > 0 || (last.notes?.length ?? 0) > 0) break;
        sections.pop();
      }
    }

    let startedOnThisPage = false;

    for (let index = 0; index < blockEls.length; index += 1) {
      const block = blockEls[index];
      const item = itemsById.get(block.dataset.itemId ?? "");
      const note = notesById.get(block.dataset.noteId ?? "");
      if (!item && !note) continue;
      const blockHeight = blockPackHeight(block);
      const remaining = blockEls.length - index;

      if (
        !startedOnThisPage &&
        used > 0 &&
        index === 0 &&
        remaining >= orphanMin &&
        used + packHeight(index, orphanMin) > pageHeightPx
      ) {
        flush();
      }

      const needHeading = !startedOnThisPage;
      const addHeight = (needHeading ? titleHeight : 0) + blockHeight;

      if (used > 0 && used + addHeight > pageHeightPx) {
        if (note) {
          const lastSection = [...sections]
            .reverse()
            .find((section) => section.items.length > 0);
          const lastItem = lastSection?.items[lastSection.items.length - 1];
          if (lastItem && lastSection) {
            const prevEl = categoryEl.querySelector<HTMLElement>(
              `[data-item-id="${lastItem.id}"]`,
            );
            const companionHeight = prevEl ? blockPackHeight(prevEl) : 0;
            if (titleHeight + companionHeight + blockHeight <= pageHeightPx) {
              lastSection.items.pop();
              pruneEmptySections();
              flush();
              sections.push({
                categoryId,
                categoryName,
                continuation: true,
                items: [lastItem],
                notes: [note],
              });
              used = titleHeight + companionHeight + blockHeight;
              startedOnThisPage = true;
              continue;
            }
          }
        }
        flush();
        startedOnThisPage = false;
      }

      if (!startedOnThisPage) {
        sections.push({
          categoryId,
          categoryName,
          continuation: index > 0,
          items: [],
          notes: [],
        });
        used += titleHeight;
        startedOnThisPage = true;
      }

      const current = sections[sections.length - 1];
      if (item) current?.items.push(item);
      if (note) current?.notes?.push(note);
      used += blockHeight;
    }

    used += 14;
  }

  flush();
  return pages;
}
