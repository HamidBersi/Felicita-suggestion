import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  SEARCH_MAX_RESULTS,
  SEARCH_MIN_QUERY_LENGTH,
  matchesWordPrefix,
} from "@/lib/suggestion-search";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";

  if (query.length < SEARCH_MIN_QUERY_LENGTH) {
    return NextResponse.json([]);
  }

  // Catalogue resto = petit volume : filtre en mémoire (préfixe de mot).
  const suggestions = await prisma.suggestion.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      label: true,
      labelColor: true,
    },
    orderBy: { title: "asc" },
  });

  const results = suggestions
    .filter((suggestion) => matchesWordPrefix(suggestion.title, query))
    .slice(0, SEARCH_MAX_RESULTS);

  return NextResponse.json(results);
}
