export const PRICE_PATTERN = /^\d+(?:[.,]\d{1,2})?$/;

/** Chaîne vide → null. Sinon normalise 4,5 → 4.5 */
export function parseOptionalPrice(
  raw: unknown,
): { ok: true; value: string | null } | { ok: false } {
  if (raw === undefined || raw === null) {
    return { ok: true, value: null };
  }
  if (typeof raw !== "string") return { ok: false };
  const trimmed = raw.trim().replace(",", ".");
  if (!trimmed) return { ok: true, value: null };
  if (!PRICE_PATTERN.test(trimmed)) return { ok: false };
  return { ok: true, value: trimmed };
}

export function headlineFromTiers(tiers: {
  verre: string | null;
  quart: string | null;
  demi: string | null;
  bouteille: string | null;
}): string | null {
  return tiers.verre ?? tiers.bouteille ?? tiers.quart ?? tiers.demi;
}

export function isWineCategoryName(name: string): boolean {
  return /vin/i.test(name);
}
