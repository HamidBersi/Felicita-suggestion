import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";


type SuggestionInput = {
  title?: string;
  description?: string;
  price?: string;
  label?: string;
  labelColor?: string;
  position?: number;
};

type SuggestionCreateData = {
  title: string;
  description: string | null;
  price: string;
  label: string | null;
  labelColor: string;
  position: number;
  isActive: true;
};



const PRICE_PATTERN = /^\d+(?:[.,]\d{1,2})?$/;

function isValidPrice(price: string): boolean {
  return PRICE_PATTERN.test(price);
}

function validateSuggestionsBody(body: unknown):
  | { error: string }
  | { data: SuggestionCreateData[] } {
  if (!Array.isArray(body)) {
    return { error: "Le body doit être un tableau." };
  }

  const data: SuggestionCreateData[] = [];

  for (let index = 0; index < body.length; index++) {
    const item = body[index] as SuggestionInput;

    if (!item || typeof item !== "object") {
      return { error: `Suggestion invalide à l'index ${index}.` };
    }

    const title = item.title?.trim();
    const price = item.price?.trim();

    if (!title) {
      return { error: `Le champ title est obligatoire à l'index ${index}.` };
    }

    if (!price) {
      return { error: `Le champ price est obligatoire à l'index ${index}.` };
    }

    if (!isValidPrice(price)) {
      return { error: `Le champ price est invalide à l'index ${index}.` };
    }

    data.push({
      title,
      price,
      description: item.description?.trim() || null,
      label: item.label?.trim() || null,
      labelColor: item.labelColor?.trim() || "orange",
      position: index,
      isActive: true,
    });
  }

  return { data };
}

type SuggestionTx = Pick<typeof prisma, "suggestion">;

/**
 * Anciens doublons (même titre) : on garde 1 ligne
 * (actif en priorité, sinon le plus récent), on delete le reste.
 */
async function dedupeSuggestionsByTitle(tx: SuggestionTx) {
  const rows = await tx.suggestion.findMany({
    select: { id: true, title: true, isActive: true, updatedAt: true },
    orderBy: [{ isActive: "desc" }, { updatedAt: "desc" }],
  });

  const keptTitles = new Set<string>();
  const duplicateIds: string[] = [];

  for (const row of rows) {
    if (keptTitles.has(row.title)) {
      duplicateIds.push(row.id);
      continue;
    }
    keptTitles.add(row.title);
  }

  if (duplicateIds.length === 0) return;

  await tx.suggestion.deleteMany({
    where: { id: { in: duplicateIds } },
  });
}

/** Une fiche par titre : update si elle existe, sinon create. */
async function upsertSuggestionByTitle(
  tx: SuggestionTx,
  item: SuggestionCreateData
) {
  const existing = await tx.suggestion.findFirst({
    where: { title: item.title },
    orderBy: { updatedAt: "desc" },
  });

  if (existing) {
    await tx.suggestion.update({
      where: { id: existing.id },
      data: {
        description: item.description,
        price: item.price,
        label: item.label,
        labelColor: item.labelColor,
        position: item.position,
        isActive: true,
      },
    });
    return;
  }

  await tx.suggestion.create({ data: item });
}

/** Menu du jour = actifs ; le reste du catalogue reste en BDD, inactif. */
async function syncSuggestionsMenu(items: SuggestionCreateData[]) {
  const titlesInMenu = items.map((item) => item.title);

  await prisma.$transaction(async (tx) => {
    await dedupeSuggestionsByTitle(tx);

    for (const item of items) {
      await upsertSuggestionByTitle(tx, item);
    }

    if (titlesInMenu.length === 0) {
      await tx.suggestion.updateMany({ data: { isActive: false } });
      return;
    }

    await tx.suggestion.updateMany({
      where: { title: { notIn: titlesInMenu } },
      data: { isActive: false },
    });
  });
}

export async function GET() {
  const suggestions = await prisma.suggestion.findMany({
    where: { isActive: true },
    orderBy: { position: "asc" },
  });

  return NextResponse.json(suggestions);
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide." },
      { status: 400 }
    );
  }

  const parsed = validateSuggestionsBody(body);

  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await syncSuggestionsMenu(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/suggestions failed:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement en base." },
      { status: 500 }
    );
  }
}
