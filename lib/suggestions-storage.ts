// Type partagé entre l'admin et l'écran d'affichage
export type LabelColor = "orange" | "red" | "green";

export type Suggestion = {
  id?: string;
  title: string;
  description: string;
  price: string;
  label: string;
  labelColor?: LabelColor;
};

// Clé utilisée dans localStorage
export const SUGGESTIONS_STORAGE_KEY = "felicita-suggestions";

// Suggestions fictives affichées si rien n'est sauvegardé
export const defaultSuggestions: Suggestion[] = [
  {
    title: "Risotto aux truffes",
    description:
      "Riz arborio crémeux, truffe noire et parmesan vieilli 24 mois",
    price: "24,50 €",
    label: "Du chef",
  },
  {
    title: "Filet de bar rôti",
    description:
      "Bar de ligne, légumes de saison et beurre citronné au fenouil",
    price: "22,00 €",
    label: "Nouveau",
  },
  {
    title: "Tarte tatin maison",
    description:
      "Pommes caramélisées, crème fraîche vanillée et caramel au sel",
    price: "9,50 €",
    label: "Populaire",
  },
];

// Sauvegarde les suggestions dans localStorage (navigateur uniquement)
export function saveSuggestions(suggestions: Suggestion[]) {
  localStorage.setItem(SUGGESTIONS_STORAGE_KEY, JSON.stringify(suggestions));
}

// Lit les suggestions depuis localStorage, ou null si vide / invalide
export function loadSuggestions(): Suggestion[] | null {
  const stored = localStorage.getItem(SUGGESTIONS_STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as Suggestion[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}
