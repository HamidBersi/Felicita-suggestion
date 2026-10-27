import {
  translateCategoryChip,
  translateCategoryName,
} from "@/components/menu/i18n/categories";
import { DESCRIPTION_TRANSLATIONS } from "@/components/menu/i18n/descriptions";
import { ITEM_TRANSLATIONS } from "@/components/menu/i18n/items";
import type { MenuLocale } from "@/components/menu/i18n/locale";
import { UI } from "@/components/menu/i18n/ui";
import type { MenuFamilyId } from "@/components/menu/menu-groups";

export type { MenuLocale } from "@/components/menu/i18n/locale";
export {
  LOCALE_LABELS,
  MENU_LOCALES,
  readStoredMenuLocale,
  storeMenuLocale,
} from "@/components/menu/i18n/locale";
export { translateCategoryChip, translateCategoryName };

const COLOR_FALLBACKS: Record<Exclude<MenuLocale, "fr">, [RegExp, string][]> = {
  en: [
    [/\(rouge\/blanc\)/gi, "(red/white)"],
    [/\(rouge\)/gi, "(red)"],
    [/\(blanc\)/gi, "(white)"],
    [/\(rosé\)/gi, "(rosé)"],
    [/\(bio\)/gi, "(organic)"],
  ],
  de: [
    [/\(rouge\/blanc\)/gi, "(rot/weiß)"],
    [/\(rouge\)/gi, "(rot)"],
    [/\(blanc\)/gi, "(weiß)"],
    [/\(rosé\)/gi, "(Rosé)"],
    [/\(bio\)/gi, "(bio)"],
  ],
  it: [
    [/\(rouge\/blanc\)/gi, "(rosso/bianco)"],
    [/\(rouge\)/gi, "(rosso)"],
    [/\(blanc\)/gi, "(bianco)"],
    [/\(rosé\)/gi, "(rosato)"],
    [/\(bio\)/gi, "(biologico)"],
  ],
};

/** Régions après « Provenance … » (vins) — couvre les ajouts admin sans entrée nom. */
const PROVENANCE_REGIONS: Record<
  string,
  Record<Exclude<MenuLocale, "fr">, string>
> = {
  abruzzes: { en: "Abruzzo", de: "Abruzzen", it: "Abruzzo" },
  "marches italie": { en: "the Marche, Italy", de: "Marken, Italien", it: "Marche, Italia" },
  marches: { en: "the Marche", de: "Marken", it: "Marche" },
  sicile: { en: "Sicily", de: "Sizilien", it: "Sicilia" },
  "emile-romagne": { en: "Emilia-Romagna", de: "Emilia-Romagna", it: "Emilia-Romagna" },
  "emilia-romagne": { en: "Emilia-Romagna", de: "Emilia-Romagna", it: "Emilia-Romagna" },
  marlenheim: { en: "Marlenheim", de: "Marlenheim", it: "Marlenheim" },
  pouilles: { en: "Puglia", de: "Apulien", it: "Puglia" },
  "pouilles/abruzzes": { en: "Puglia/Abruzzo", de: "Apulien/Abruzzen", it: "Puglia/Abruzzo" },
  latium: { en: "Lazio", de: "Latium", it: "Lazio" },
  "nord de l'italie": { en: "northern Italy", de: "Norditalien", it: "Nord Italia" },
  "nord de l’italie": { en: "northern Italy", de: "Norditalien", it: "Nord Italia" },
  calabre: { en: "Calabria", de: "Kalabrien", it: "Calabria" },
  toscane: { en: "Tuscany", de: "Toskana", it: "Toscana" },
  "vénétie": { en: "Veneto", de: "Venetien", it: "Veneto" },
  venetie: { en: "Veneto", de: "Venetien", it: "Veneto" },
  piémont: { en: "Piedmont", de: "Piemont", it: "Piemonte" },
  piemont: { en: "Piedmont", de: "Piemont", it: "Piemonte" },
};

const PROVENANCE_PREFIX: Record<Exclude<MenuLocale, "fr">, string> = {
  en: "From ",
  de: "Herkunft ",
  it: "Provenienza ",
};

function applyColorFallback(name: string, locale: Exclude<MenuLocale, "fr">): string {
  let result = name;
  for (const [pattern, replacement] of COLOR_FALLBACKS[locale]) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function normalizeDescriptionKey(description: string): string {
  return description.replace(/\s+/g, " ").trim();
}

function translateProvenance(
  description: string,
  locale: Exclude<MenuLocale, "fr">,
): string | null {
  const match = description.match(/^Provenance\s+(?:des?\s+|du\s+)?(.+)$/i);
  if (!match) return null;
  const regionKey = match[1].replace(/\s+/g, " ").trim().toLowerCase();
  const region = PROVENANCE_REGIONS[regionKey];
  if (!region) return null;
  return `${PROVENANCE_PREFIX[locale]}${region[locale]}`;
}

function translateDescription(
  locale: Exclude<MenuLocale, "fr">,
  description: string,
  fromItemEntry: string | undefined,
): string {
  if (fromItemEntry) return fromItemEntry;

  const key = normalizeDescriptionKey(description);
  const byExact =
    DESCRIPTION_TRANSLATIONS[key]?.[locale] ??
    DESCRIPTION_TRANSLATIONS[description]?.[locale];
  if (byExact) return byExact;

  const provenance = translateProvenance(key, locale);
  if (provenance) return provenance;

  return description;
}

export function tUi(locale: MenuLocale) {
  return UI[locale];
}

export function tFamily(
  locale: MenuLocale,
  familyId: Exclude<MenuFamilyId, "all">,
): { label: string; navLabel?: string; countNoun: string } {
  return UI[locale].families[familyId];
}

export function translateItem(
  locale: MenuLocale,
  name: string,
  description: string | null | undefined,
): { name: string; description: string | null } {
  const desc = description?.trim() ? description.trim() : null;
  if (locale === "fr") {
    return { name, description: desc };
  }

  const entry = ITEM_TRANSLATIONS[name]?.[locale];
  const translatedName = entry?.name ?? applyColorFallback(name, locale);
  const translatedDescription = desc
    ? translateDescription(locale, desc, entry?.description)
    : null;

  return {
    name: translatedName,
    description: translatedDescription,
  };
}
