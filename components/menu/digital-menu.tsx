"use client";

import { useMemo, useState } from "react";
import {
  CakeSlice,
  Coffee,
  LayoutGrid,
  Pizza,
  Search,
  Utensils,
  UtensilsCrossed,
  Wine,
} from "lucide-react";

import {
  MENU_FAMILIES,
  chipLabel,
  type MenuFamily,
  type MenuFamilyId,
} from "@/components/menu/menu-groups";
import type { MenuCategoryDto, MenuItemDto } from "@/components/menu/menu-types";
import {
  formatEuro,
  hasWineTiers,
  WINE_TIER_COLUMNS,
} from "@/components/menu/wine-prices";

type DigitalMenuProps = {
  categories: MenuCategoryDto[];
};

const FAMILY_ICONS: Record<MenuFamily["id"], typeof Wine> = {
  aperitivo: Wine,
  antipasti: Utensils,
  piatti: UtensilsCrossed,
  pizzeria: Pizza,
  dolci: CakeSlice,
  dopo: Coffee,
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

function formatMenuPrice(price: string): string {
  return formatEuro(price);
}

/** « Ricard 3cl » → titre + volume, comme la maquette */
function splitNameAndVolume(name: string): { title: string; volume: string | null } {
  const match = name.match(/^(.*?)\s+(\d+(?:[.,]\d+)?\s*cl)\s*$/i);
  if (!match) return { title: name, volume: null };
  return { title: match[1], volume: match[2].replace(/\s+/g, "") };
}

function itemMatchesQuery(item: MenuItemDto, query: string): boolean {
  if (!query) return true;
  const haystack = normalize(`${item.name} ${item.description ?? ""}`);
  return haystack.includes(query);
}

export function DigitalMenu({ categories }: DigitalMenuProps) {
  const [familyId, setFamilyId] = useState<MenuFamilyId>("all");
  const [subCategoryName, setSubCategoryName] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const activeFamily =
    familyId === "all"
      ? null
      : (MENU_FAMILIES.find((family) => family.id === familyId) ?? null);

  const normalizedQuery = normalize(query.trim());

  const visibleSections = useMemo(() => {
    const available = categories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) => item.isAvailable && itemMatchesQuery(item, normalizedQuery),
        ),
      }))
      .filter((category) => category.items.length > 0);

    const byName = new Map(available.map((category) => [category.name, category]));

    function sectionsForFamily(family: MenuFamily) {
      return family.categoryNames
        .filter((name) => (subCategoryName ? name === subCategoryName : true))
        .map((name) => byName.get(name))
        .filter((category): category is MenuCategoryDto => Boolean(category));
    }

    if (activeFamily) {
      return sectionsForFamily(activeFamily).map((category) => ({
        category,
        family: activeFamily,
      }));
    }

    const grouped = MENU_FAMILIES.flatMap((family) =>
      sectionsForFamily(family).map((category) => ({ category, family })),
    );

    const named = new Set(MENU_FAMILIES.flatMap((family) => family.categoryNames));
    const leftovers = available
      .filter((category) => !named.has(category.name))
      .map((category) => ({
        category,
        family: {
          id: "piatti" as const,
          label: "",
          categoryNames: [],
          countNoun: "plats",
        },
      }));

    return [...grouped, ...leftovers];
  }, [activeFamily, categories, normalizedQuery, subCategoryName]);

  function selectFamily(next: MenuFamilyId) {
    setFamilyId(next);
    setSubCategoryName(null);
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-5 sm:px-6">
      <label className="relative block">
        <span className="sr-only">Chercher un plat, une boisson</span>
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#8a8578]" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Chercher un plat, une boisson..."
          className="w-full rounded-full border border-[#e4dfd4] bg-[#fbf8f1] py-2.5 pr-4 pl-10 text-sm text-[#1B1E19] outline-none placeholder:text-[#9a9588] focus:border-[#1E3A2F]/40"
        />
      </label>

      <div className="sticky top-0 z-20 -mx-4 mt-4 bg-[#F4F1EA]/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <FamilyChip
            active={familyId === "all"}
            icon={LayoutGrid}
            label="Tout"
            onClick={() => selectFamily("all")}
          />
          {MENU_FAMILIES.map((family) => {
            const Icon = FAMILY_ICONS[family.id];
            return (
              <FamilyChip
                key={family.id}
                active={familyId === family.id}
                icon={Icon}
                label={family.label}
                onClick={() => selectFamily(family.id)}
              />
            );
          })}
        </div>

        {activeFamily ? (
          <div className="mt-2.5 flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {activeFamily.categoryNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() =>
                  setSubCategoryName((current) => (current === name ? null : name))
                }
                className={`shrink-0 rounded-full border px-3 py-1 text-[13px] transition ${
                  subCategoryName === name
                    ? "border-[#1E3A2F] bg-[#1E3A2F] text-[#FBF8F1]"
                    : "border-[#ddd6c8] bg-transparent text-[#6b675c] hover:border-[#1E3A2F]/30"
                }`}
              >
                {chipLabel(activeFamily, name)}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-6 space-y-10">
        {visibleSections.length === 0 ? (
          <p className="text-center text-sm text-[#6b675c]">
            Aucun plat ne correspond à cette recherche.
          </p>
        ) : (
          visibleSections.map(({ category, family }) => (
            <section key={category.id}>
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h2 className="font-[family-name:var(--font-cormorant)] text-[28px] leading-none font-semibold text-[#1B1E19]">
                  {category.name}
                </h2>
                <span className="text-[13px] text-[#8a8578]">
                  {category.items.length} {family.countNoun}
                </span>
              </div>

              <div className="space-y-5">
                {category.items.map((item) => (
                  <DishRow key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

function FamilyChip({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: typeof Wine;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition ${
        active
          ? "border-[#1E3A2F] bg-[#1E3A2F] text-[#FBF8F1]"
          : "border-[#e4dfd4] bg-[#fbf8f1] text-[#3d3a32] hover:border-[#1E3A2F]/25"
      }`}
    >
      <Icon className="size-3.5" />
      {label}
    </button>
  );
}

function WineRow({ item }: { item: MenuItemDto }) {
  const headline = item.priceVerre || item.priceBouteille || item.price;
  const formats = WINE_TIER_COLUMNS.filter((column) => {
    if (!item[column.key]) return false;
    if (item.priceVerre && column.key === "priceVerre") return false;
    if (!item.priceVerre && column.key === "priceBouteille") return false;
    return true;
  });

  return (
    <article>
      <div className="flex items-baseline gap-2">
        <h3 className="shrink-0 text-[15.5px] font-semibold text-[#1B1E19]">{item.name}</h3>
        <span
          className="mb-1 min-w-[1.25rem] flex-1 border-b border-dotted border-[#cfc8b8]"
          aria-hidden
        />
        <span className="shrink-0 text-[15px] font-semibold tabular-nums text-[#1B1E19]">
          {formatEuro(headline)}
        </span>
      </div>
      {formats.length > 0 ? (
        <p className="mt-1.5 flex flex-wrap gap-x-8 gap-y-1 text-[13px] text-[#7a766c]">
          {formats.map((column) => (
            <span key={column.key} className="inline-flex items-baseline gap-1.5">
              {column.label}
              <span className="font-semibold tabular-nums text-[#1B1E19]">
                {formatEuro(item[column.key])}
              </span>
            </span>
          ))}
        </p>
      ) : null}
      {item.description?.trim() ? (
        <p className="mt-1 max-w-[92%] text-[13px] leading-snug text-[#7a766c]">
          {item.description}
        </p>
      ) : null}
    </article>
  );
}

function DishRow({ item }: { item: MenuItemDto }) {
  if (hasWineTiers(item)) {
    return <WineRow item={item} />;
  }

  const { title, volume } = splitNameAndVolume(item.name);

  return (
    <article>
      <div className="flex items-baseline gap-2">
        <h3 className="shrink-0 text-[15.5px] font-semibold text-[#1B1E19]">
          {title}
          {volume ? (
            <span className="ml-1.5 font-normal text-[#8a8578]">{volume}</span>
          ) : null}
        </h3>
        <span
          className="mb-1 min-w-[1.25rem] flex-1 border-b border-dotted border-[#cfc8b8]"
          aria-hidden
        />
        <span className="shrink-0 text-[15px] font-semibold tabular-nums text-[#1B1E19]">
          {formatMenuPrice(item.price)}
        </span>
      </div>
      {item.description?.trim() ? (
        <p className="mt-0.5 max-w-[92%] text-[13px] leading-snug text-[#7a766c]">
          {item.description}
        </p>
      ) : null}
    </article>
  );
}
