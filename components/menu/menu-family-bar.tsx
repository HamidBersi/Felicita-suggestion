"use client";

import {
  CakeSlice,
  Coffee,
  LayoutGrid,
  Pizza,
  Utensils,
  UtensilsCrossed,
  Wine,
} from "lucide-react";

import {
  MENU_FAMILIES,
  chipLabel,
  familyForCategoryName,
  type MenuFamily,
  type MenuFamilyId,
} from "@/components/menu/menu-groups";
import type { MenuCategoryDto } from "@/components/menu/menu-types";

const FAMILY_ICONS: Record<MenuFamily["id"], typeof Wine> = {
  aperitivo: Wine,
  antipasti: Utensils,
  piatti: UtensilsCrossed,
  pizzeria: Pizza,
  dolci: CakeSlice,
  dopo: Coffee,
};

type MenuFamilyBarProps = {
  familyId: MenuFamilyId;
  onFamilyChange: (id: MenuFamilyId) => void;
  subCategoryName: string | null;
  onSubCategoryChange: (name: string | null) => void;
  /** Noms de catégories présents dans le menu, pour n’afficher que l’existant */
  categoryNames: string[];
  /** En édition : pas de sous-onglet « Tout », une catégorie toujours choisie */
  showSubAllTab?: boolean;
};

export function categoriesForFamily(
  familyId: MenuFamilyId,
  categories: MenuCategoryDto[],
): MenuCategoryDto[] {
  const byName = new Map(categories.map((category) => [category.name, category]));
  const named = MENU_FAMILIES.flatMap((family) => family.categoryNames);

  if (familyId === "all") {
    const ordered = named
      .map((name) => byName.get(name))
      .filter((category): category is MenuCategoryDto => Boolean(category));
    const leftovers = categories.filter((category) => !named.includes(category.name));
    return [...ordered, ...leftovers];
  }

  const family = MENU_FAMILIES.find((item) => item.id === familyId);
  if (!family) return [];
  return family.categoryNames
    .map((name) => byName.get(name))
    .filter((category): category is MenuCategoryDto => Boolean(category));
}

export function familyIdForCategoryName(name: string): MenuFamilyId {
  return familyForCategoryName(name)?.id ?? "all";
}

export function MenuFamilyBar({
  familyId,
  onFamilyChange,
  subCategoryName,
  onSubCategoryChange,
  categoryNames,
  showSubAllTab = true,
}: MenuFamilyBarProps) {
  const activeFamily =
    familyId === "all"
      ? null
      : (MENU_FAMILIES.find((family) => family.id === familyId) ?? null);

  const subNames = activeFamily
    ? activeFamily.categoryNames.filter((name) => categoryNames.includes(name))
    : showSubAllTab
      ? []
      : categoryNames;

  const showSubRow = subNames.length > 0;

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        <FamilyChip
          active={familyId === "all"}
          icon={LayoutGrid}
          label="Tout"
          onClick={() => onFamilyChange("all")}
        />
        {MENU_FAMILIES.map((family) => {
          const Icon = FAMILY_ICONS[family.id];
          return (
            <FamilyChip
              key={family.id}
              active={familyId === family.id}
              icon={Icon}
              label={family.navLabel ?? family.label}
              title={family.label}
              onClick={() => onFamilyChange(family.id)}
            />
          );
        })}
      </div>

      {showSubRow ? (
        <div className="mt-3 border-t border-[#e4dfd4] pt-2.5">
          <div className="flex flex-wrap gap-x-1 gap-y-0">
            {showSubAllTab ? (
              <SubTab
                label="Tout"
                selected={subCategoryName === null}
                onClick={() => onSubCategoryChange(null)}
              />
            ) : null}
            {subNames.map((name) => (
              <SubTab
                key={name}
                label={activeFamily ? chipLabel(activeFamily, name) : name}
                selected={subCategoryName === name}
                onClick={() => onSubCategoryChange(name)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FamilyChip({
  active,
  icon: Icon,
  label,
  title,
  onClick,
}: {
  active: boolean;
  icon: typeof Wine;
  label: string;
  title?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition ${
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

function SubTab({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 border-b-2 px-2.5 py-1 text-[13px] transition ${
        selected
          ? "border-[#1E3A2F] font-semibold text-[#1E3A2F]"
          : "border-transparent text-[#6b675c] hover:text-[#1B1E19]"
      }`}
    >
      {label}
    </button>
  );
}
