import type { MenuCategoryDto, MenuItemDto } from "@/components/menu/menu-types";
import {
  formatEuro,
  hasWineTiers,
  splitWineName,
  WINE_TIER_COLUMNS,
} from "@/components/menu/wine-prices";

type MenuSheetProps = {
  categories: MenuCategoryDto[];
  /** "all" | id unique | liste d'ids (impression sélective) */
  categoryFilter?: "all" | string | string[];
  restaurantName?: string;
  subtitle?: string;
};

function categoryMatchesFilter(
  categoryId: string,
  filter: "all" | string | string[],
): boolean {
  if (filter === "all") return true;
  if (Array.isArray(filter)) return filter.includes(categoryId);
  return filter === categoryId;
}

function WineTable({ items }: { items: MenuItemDto[] }) {
  return (
    <table className="wine-table w-full border-collapse text-[13px]">
      <thead>
        <tr className="text-[11px] tracking-wide text-[#8a8578] uppercase">
          <th className="pb-2 pr-2 text-left font-medium">Vin</th>
          {WINE_TIER_COLUMNS.map((column) => (
            <th key={column.key} className="w-[4.5rem] pb-2 text-right font-medium">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const { title, style } = splitWineName(item.name);
          return (
            <tr key={item.id} className="border-t border-[#E8E1D4]">
              <td className="py-2 pr-3">
                <span className="font-[family-name:var(--font-cormorant)] text-[17px] font-semibold text-[#1B1E19]">
                  {title}
                </span>
                {style ? (
                  <span className="ml-1.5 text-[11px] text-[#8a8578]">{style}</span>
                ) : null}
                {item.description?.trim() ? (
                  <p className="mt-0.5 text-[11px] italic text-[#6b6a5f]">
                    {item.description}
                  </p>
                ) : null}
              </td>
              {WINE_TIER_COLUMNS.map((column) => (
                <td
                  key={column.key}
                  className="py-2 text-right tabular-nums text-[#1E3A2F]"
                >
                  {item[column.key] ? formatEuro(item[column.key]) : "—"}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function DishBlock({ item }: { item: MenuItemDto }) {
  return (
    <article className="menu-dish">
      <div className="flex items-baseline gap-2">
        <span className="shrink-0 font-[family-name:var(--font-cormorant)] text-[19px] font-semibold text-[#1B1E19]">
          {item.name}
        </span>
        <span
          className="mb-1 min-w-[1.5rem] flex-1 border-b border-dotted border-[#b9b19b]"
          aria-hidden
        />
        <span className="shrink-0 text-[15px] font-semibold text-[#1E3A2F]">
          {item.price} €
        </span>
      </div>
      {item.description?.trim() ? (
        <p className="mt-1 max-w-[90%] text-[13px] italic leading-snug text-[#6b6a5f]">
          {item.description}
        </p>
      ) : null}
    </article>
  );
}

export function MenuSheet({
  categories,
  categoryFilter = "all",
  restaurantName = "La Félicità",
  subtitle = "Furdenheim — Cuisine italienne",
}: MenuSheetProps) {
  const visibleCategories = categories
    .filter((category) => categoryMatchesFilter(category.id, categoryFilter))
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.isAvailable),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div className="menu-sheet mx-auto w-full max-w-[720px] px-6 py-10 sm:px-8">
      <header className="menu-sheet-header mb-9 text-center">
        <h1 className="font-[family-name:var(--font-cormorant)] text-[42px] font-semibold leading-none text-[#1E3A2F] sm:text-[44px]">
          {restaurantName}
        </h1>
        <div className="mx-auto my-3.5 h-0.5 w-[70px] bg-[#B68A3D]" />
        <p className="text-[13.5px] tracking-wide text-[#6b6a5f]">{subtitle}</p>
      </header>

      {visibleCategories.length === 0 ? (
        <p className="text-center text-sm text-[#6b6a5f]">
          Aucun plat disponible pour le moment.
        </p>
      ) : (
        visibleCategories.map((category) => {
          const wineItems = category.items.filter((item) => hasWineTiers(item));
          const otherItems = category.items.filter((item) => !hasWineTiers(item));
          const asWineTable = wineItems.length > 0 && otherItems.length === 0;

          return (
            <section key={category.id} className="menu-cat mb-8 break-inside-avoid">
              <h2 className="mb-4 flex items-center gap-3 font-[family-name:var(--font-cormorant)] text-[20px] font-medium italic text-[#B68A3D]">
                <span>{category.name}</span>
                <span className="h-px flex-1 bg-[#D9CFB8]" aria-hidden />
              </h2>

              {asWineTable ? (
                <WineTable items={wineItems} />
              ) : (
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <DishBlock key={item.id} item={item} />
                  ))}
                </div>
              )}
            </section>
          );
        })
      )}
    </div>
  );
}
