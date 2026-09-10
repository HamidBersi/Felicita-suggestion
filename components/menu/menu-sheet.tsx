import type { MenuCategoryDto } from "@/components/menu/menu-types";

type MenuSheetProps = {
  categories: MenuCategoryDto[];
  filterCategoryId?: string | "all";
  restaurantName?: string;
  subtitle?: string;
};

export function MenuSheet({
  categories,
  filterCategoryId = "all",
  restaurantName = "La Félicità",
  subtitle = "Furdenheim — Cuisine italienne",
}: MenuSheetProps) {
  const visibleCategories = categories
    .filter((category) =>
      filterCategoryId === "all" ? true : category.id === filterCategoryId,
    )
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
        visibleCategories.map((category) => (
          <section key={category.id} className="menu-cat mb-8 break-inside-avoid">
            <h2 className="mb-4 flex items-center gap-3 font-[family-name:var(--font-cormorant)] text-[20px] font-medium italic text-[#B68A3D]">
              <span>{category.name}</span>
              <span className="h-px flex-1 bg-[#D9CFB8]" aria-hidden />
            </h2>

            <div className="space-y-4">
              {category.items.map((item) => (
                <article key={item.id} className="menu-dish">
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
              ))}
            </div>
          </section>
        ))
      )}

      <p className="menu-foot mt-11 text-center text-xs tracking-wide text-[#6b6a5f]">
        Merci de votre visite
      </p>
    </div>
  );
}
