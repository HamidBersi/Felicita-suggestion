/**
 * Grouping UI seulement — pas de changement Prisma.
 * On rattache les catégories (par nom seed) à des familles de navigation.
 */
export type MenuFamilyId =
  | "all"
  | "aperitivo"
  | "antipasti"
  | "piatti"
  | "pizzeria"
  | "dolci"
  | "dopo";

export type MenuFamily = {
  id: Exclude<MenuFamilyId, "all">;
  label: string;
  /** Noms exacts de MenuCategory.name, dans l’ordre du 2e rail */
  categoryNames: string[];
  /** Libellé chip si différent du nom en base */
  chipLabelByName?: Record<string, string>;
  /** Mot à droite du titre de section (« 5 boissons ») */
  countNoun: string;
};

export const MENU_FAMILIES: MenuFamily[] = [
  {
    id: "aperitivo",
    label: "L'aperitivo",
    categoryNames: [
      "Apéritifs",
      "Cocktails",
      "Bières",
      "Boissons sans alcool",
      "Les vins",
    ],
    chipLabelByName: {
      "Boissons sans alcool": "Sans alcool",
    },
    countNoun: "boissons",
  },
  {
    id: "antipasti",
    label: "Antipasti",
    categoryNames: ["Entrées", "Salades"],
    countNoun: "plats",
  },
  {
    id: "piatti",
    label: "I piatti",
    categoryNames: ["Viandes", "Nos poissons", "Pâtes", "Pâtes fraîches"],
    countNoun: "plats",
  },
  {
    id: "pizzeria",
    label: "Pizzeria",
    categoryNames: ["Pizzas", "Pizzas spéciales"],
    countNoun: "pizzas",
  },
  {
    id: "dolci",
    label: "Dolci",
    categoryNames: ["Desserts"],
    countNoun: "desserts",
  },
  {
    id: "dopo",
    label: "Dopo",
    categoryNames: ["Boissons chaudes", "Les digestifs"],
    chipLabelByName: {
      "Boissons chaudes": "Chaudes",
      "Les digestifs": "Digestifs",
    },
    countNoun: "boissons",
  },
];

export function familyForCategoryName(name: string): MenuFamily | undefined {
  return MENU_FAMILIES.find((family) => family.categoryNames.includes(name));
}

export function chipLabel(family: MenuFamily, categoryName: string): string {
  return family.chipLabelByName?.[categoryName] ?? categoryName;
}
