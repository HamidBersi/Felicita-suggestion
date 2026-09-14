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
  /** Libellé court dans la barre (si plus long que le bouton) */
  navLabel?: string;
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
    label: "Boissons",
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
    label: "Entrées",
    categoryNames: ["Entrées", "Salades"],
    countNoun: "plats",
  },
  {
    id: "piatti",
    label: "Plats",
    categoryNames: ["Viandes", "Nos poissons", "Pâtes", "Pâtes fraîches"],
    countNoun: "plats",
  },
  {
    id: "pizzeria",
    label: "Pizzas",
    categoryNames: ["Pizzas", "Pizzas spéciales"],
    countNoun: "pizzas",
  },
  {
    id: "dolci",
    label: "Desserts",
    categoryNames: ["Desserts"],
    countNoun: "desserts",
  },
  {
    id: "dopo",
    label: "Cafés & digestifs",
    navLabel: "Cafés",
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
