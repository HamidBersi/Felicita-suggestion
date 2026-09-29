import type { MenuLocale } from "@/components/menu/i18n/locale";

/** Libellés de catégorie (titres de section) — clé = nom FR en base */
export const CATEGORY_LABELS: Record<string, Record<Exclude<MenuLocale, "fr">, string>> = {
  Apéritifs: { en: "Aperitifs", de: "Aperitifs", it: "Aperitivi" },
  Bières: { en: "Beers", de: "Biere", it: "Birre" },
  Cocktails: { en: "Cocktails", de: "Cocktails", it: "Cocktail" },
  "Boissons sans alcool": {
    en: "Soft drinks",
    de: "Alkoholfreie Getränke",
    it: "Bevande analcoliche",
  },
  Entrées: { en: "Starters", de: "Vorspeisen", it: "Antipasti" },
  Salades: { en: "Salads", de: "Salate", it: "Insalate" },
  Viandes: { en: "Meat", de: "Fleisch", it: "Carni" },
  "Nos poissons": { en: "Fish", de: "Fisch", it: "Pesci" },
  Pâtes: { en: "Pasta", de: "Pasta", it: "Pasta" },
  "Pâtes fraîches": { en: "Fresh pasta", de: "Frische Pasta", it: "Pasta fresca" },
  Pizzas: { en: "Pizzas", de: "Pizzen", it: "Pizze" },
  "Pizzas spéciales": { en: "Special pizzas", de: "Spezialpizzen", it: "Pizze speciali" },
  Desserts: { en: "Desserts", de: "Desserts", it: "Dolci" },
  "Boissons chaudes": { en: "Hot drinks", de: "Heiße Getränke", it: "Bevande calde" },
  "Les digestifs": { en: "Digestifs", de: "Digestifs", it: "Digestivi" },
  "Les vins": { en: "Wines", de: "Weine", it: "Vini" },
};

/** Libellés courts des sous-onglets (chips) — clé = nom FR en base */
export const CATEGORY_CHIP_LABELS: Record<
  string,
  Record<Exclude<MenuLocale, "fr">, string>
> = {
  "Boissons sans alcool": { en: "Soft drinks", de: "Ohne Alkohol", it: "Analcoliche" },
  "Boissons chaudes": { en: "Hot", de: "Heiß", it: "Calde" },
  "Les digestifs": { en: "Digestifs", de: "Digestifs", it: "Digestivi" },
};

export function translateCategoryName(name: string, locale: MenuLocale): string {
  if (locale === "fr") return name;
  return CATEGORY_LABELS[name]?.[locale] ?? name;
}

export function translateCategoryChip(name: string, locale: MenuLocale): string {
  if (locale === "fr") {
    if (name === "Boissons sans alcool") return "Sans alcool";
    if (name === "Boissons chaudes") return "Chaudes";
    if (name === "Les digestifs") return "Digestifs";
    return name;
  }
  return CATEGORY_CHIP_LABELS[name]?.[locale] ?? translateCategoryName(name, locale);
}
