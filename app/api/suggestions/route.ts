import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

export async function GET() {
  const suggestions = await prisma.suggestion.findMany({
    where: { isActive: true },
    orderBy: { position: "asc" },
  });

  return NextResponse.json(suggestions);
}

export async function POST(request: Request) {
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
    await prisma.$transaction(async (tx) => {
      await tx.suggestion.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });

      if (parsed.data.length > 0) {
        await tx.suggestion.createMany({
          data: parsed.data,
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement en base." },
      { status: 500 }
    );
  }
}
