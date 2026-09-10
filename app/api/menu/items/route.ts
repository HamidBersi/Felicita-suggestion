import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/require-owner";

const PRICE_PATTERN = /^\d+(?:[.,]\d{1,2})?$/;

type CreateItemBody = {
  categoryId?: string;
  name?: string;
  description?: string;
  price?: string;
  imageUrl?: string;
};

export async function POST(request: Request) {
  const denied = await requireOwner();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const input = body as CreateItemBody;
  const categoryId = input.categoryId?.trim() ?? "";
  const name = input.name?.trim() ?? "";
  const description = input.description?.trim() || null;
  const priceRaw = input.price?.trim().replace(",", ".") ?? "";
  const imageUrl = input.imageUrl?.trim() || null;

  if (!categoryId || !name || !priceRaw) {
    return NextResponse.json(
      { error: "Catégorie, nom et prix sont obligatoires." },
      { status: 400 },
    );
  }

  if (!PRICE_PATTERN.test(priceRaw)) {
    return NextResponse.json({ error: "Prix invalide." }, { status: 400 });
  }

  const category = await prisma.menuCategory.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    return NextResponse.json({ error: "Catégorie introuvable." }, { status: 404 });
  }

  const last = await prisma.menuItem.findFirst({
    where: { categoryId },
    orderBy: { position: "desc" },
    select: { position: true },
  });

  const item = await prisma.menuItem.create({
    data: {
      categoryId,
      name,
      description,
      price: priceRaw,
      imageUrl,
      position: (last?.position ?? -1) + 1,
      isAvailable: true,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
