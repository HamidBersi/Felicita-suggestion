import type { MenuLocale } from "@/components/menu/i18n/locale";
import type { MenuFamilyId } from "@/components/menu/menu-groups";

type UiStrings = {
  tagline: string;
  filterAll: string;
  emptyCategory: string;
  selectLanguage: string;
  wineQuart: string;
  wineDemi: string;
  wineBottle: string;
  loadError: string;
  families: Record<Exclude<MenuFamilyId, "all">, { label: string; navLabel?: string; countNoun: string }>;
};

export const UI: Record<MenuLocale, UiStrings> = {
  fr: {
    tagline: "Restaurant Italien",
    filterAll: "Tout",
    emptyCategory: "Aucun plat dans cette catégorie pour l’instant.",
    selectLanguage: "Choisir la langue",
    wineQuart: "Quart",
    wineDemi: "Demi",
    wineBottle: "Bouteille",
    loadError: "Impossible de charger le menu.",
    families: {
      aperitivo: { label: "Boissons", countNoun: "boissons" },
      antipasti: { label: "Entrées", countNoun: "plats" },
      piatti: { label: "Plats", countNoun: "plats" },
      pizzeria: { label: "Pizzas", countNoun: "pizzas" },
      dolci: { label: "Desserts", countNoun: "desserts" },
      dopo: { label: "Cafés & digestifs", navLabel: "Cafés", countNoun: "boissons" },
    },
  },
  en: {
    tagline: "Italian Restaurant",
    filterAll: "All",
    emptyCategory: "No dishes in this category yet.",
    selectLanguage: "Choose language",
    wineQuart: "Quarter",
    wineDemi: "Half",
    wineBottle: "Bottle",
    loadError: "Unable to load the menu.",
    families: {
      aperitivo: { label: "Drinks", countNoun: "drinks" },
      antipasti: { label: "Starters", countNoun: "dishes" },
      piatti: { label: "Mains", countNoun: "dishes" },
      pizzeria: { label: "Pizzas", countNoun: "pizzas" },
      dolci: { label: "Desserts", countNoun: "desserts" },
      dopo: { label: "Coffee & digestifs", navLabel: "Coffee", countNoun: "drinks" },
    },
  },
  de: {
    tagline: "Italienisches Restaurant",
    filterAll: "Alle",
    emptyCategory: "In dieser Kategorie gibt es noch keine Gerichte.",
    selectLanguage: "Sprache wählen",
    wineQuart: "Viertel",
    wineDemi: "Halbe",
    wineBottle: "Flasche",
    loadError: "Menü konnte nicht geladen werden.",
    families: {
      aperitivo: { label: "Getränke", countNoun: "Getränke" },
      antipasti: { label: "Vorspeisen", countNoun: "Gerichte" },
      piatti: { label: "Hauptgerichte", countNoun: "Gerichte" },
      pizzeria: { label: "Pizzen", countNoun: "Pizzen" },
      dolci: { label: "Desserts", countNoun: "Desserts" },
      dopo: { label: "Kaffee & Digestifs", navLabel: "Kaffee", countNoun: "Getränke" },
    },
  },
  it: {
    tagline: "Ristorante Italiano",
    filterAll: "Tutto",
    emptyCategory: "Nessun piatto in questa categoria per il momento.",
    selectLanguage: "Scegli la lingua",
    wineQuart: "Quarto",
    wineDemi: "Mezzo",
    wineBottle: "Bottiglia",
    loadError: "Impossibile caricare il menu.",
    families: {
      aperitivo: { label: "Bevande", countNoun: "bevande" },
      antipasti: { label: "Antipasti", countNoun: "piatti" },
      piatti: { label: "Secondi", countNoun: "piatti" },
      pizzeria: { label: "Pizze", countNoun: "pizze" },
      dolci: { label: "Dolci", countNoun: "dolci" },
      dopo: { label: "Caffè e digestivi", navLabel: "Caffè", countNoun: "bevande" },
    },
  },
};
