import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type CreateSuggestionBody = {
  title?: string;
  description?: string;
  price?: string;
  label?: string;
  labelColor?: string;
  position?: number;
  isActive?: boolean;
};

function parseCreateSuggestionBody(body: CreateSuggestionBody) {
  const title = body.title?.trim();
  const price = body.price?.trim();

  if (!title) {
    return { error: "Le champ title est obligatoire." };
  }

  if (!price) {
    return { error: "Le champ price est obligatoire." };
  }

  if (typeof body.position !== "number" || !Number.isInteger(body.position)) {
    return { error: "Le champ position doit être un entier." };
  }

  return {
    data: {
      title,
      price,
      position: body.position,
      description: body.description?.trim() || null,
      label: body.label?.trim() || null,
      labelColor: body.labelColor?.trim() || "orange",
      isActive: body.isActive ?? true,
    },
  };
}

export async function GET() {
  const suggestions = await prisma.suggestion.findMany({
    where: { isActive: true },
    orderBy: { position: "asc" },
  });

  return NextResponse.json(suggestions);
}

export async function POST(request: Request) {
  let body: CreateSuggestionBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide." },
      { status: 400 }
    );
  }

  const parsed = parseCreateSuggestionBody(body);

  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const suggestion = await prisma.suggestion.create({
      data: parsed.data,
    });

    return NextResponse.json(suggestion, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement en base." },
      { status: 500 }
    );
  }
}
