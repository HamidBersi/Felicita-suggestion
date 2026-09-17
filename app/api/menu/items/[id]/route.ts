import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/require-owner";
import {
  headlineFromTiers,
  parseOptionalPrice,
  parseRequiredPrice,
} from "@/lib/menu-price";
import { normalizeDishEmoji } from "@/lib/dish-emoji";

type UpdateItemBody = {
  name?: string;
  description?: string | null;
  price?: string;
  imageUrl?: string | null;
  isAvailable?: boolean;
  priceVerre?: string | null;
  priceQuart?: string | null;
  priceDemi?: string | null;
  priceBouteille?: string | null;
  emoji?: string | null;
};

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await requireOwner();
  if (denied) return denied;

  const { id } = await context.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const input = body as UpdateItemBody;
  const data: {
    name?: string;
    description?: string | null;
    price?: string;
    imageUrl?: string | null;
    isAvailable?: boolean;
    priceVerre?: string | null;
    priceQuart?: string | null;
    priceDemi?: string | null;
    priceBouteille?: string | null;
    emoji?: string | null;
  } = {};

  if (typeof input.name === "string") {
    const name = input.name.trim();
    if (!name) {
      return NextResponse.json({ error: "Le nom est obligatoire." }, { status: 400 });
    }
    data.name = name;
  }

  if ("description" in input) {
    const description =
      typeof input.description === "string" ? input.description.trim() : "";
    data.description = description || null;
  }

  if (typeof input.price === "string") {
    const parsedPrice = parseRequiredPrice(input.price);
    if (!parsedPrice.ok) {
      return NextResponse.json({ error: "Prix invalide." }, { status: 400 });
    }
    data.price = parsedPrice.value;
  }

  const wineKeys = [
    "priceVerre",
    "priceQuart",
    "priceDemi",
    "priceBouteille",
  ] as const;
  const sentWine = wineKeys.filter((key) => key in input);
  if (sentWine.length > 0) {
    const verre = parseOptionalPrice(input.priceVerre);
    const quart = parseOptionalPrice(input.priceQuart);
    const demi = parseOptionalPrice(input.priceDemi);
    const bouteille = parseOptionalPrice(input.priceBouteille);
    if (!verre.ok || !quart.ok || !demi.ok || !bouteille.ok) {
      return NextResponse.json({ error: "Prix invalide." }, { status: 400 });
    }
    data.priceVerre = verre.value;
    data.priceQuart = quart.value;
    data.priceDemi = demi.value;
    data.priceBouteille = bouteille.value;
    const headline = headlineFromTiers({
      verre: verre.value,
      quart: quart.value,
      demi: demi.value,
      bouteille: bouteille.value,
    });
    if (headline) {
      data.price = headline;
    }
  }

  if ("imageUrl" in input) {
    const imageUrl =
      typeof input.imageUrl === "string" ? input.imageUrl.trim() : "";
    data.imageUrl = imageUrl || null;
  }

  if (typeof input.isAvailable === "boolean") {
    data.isAvailable = input.isAvailable;
  }

  if ("emoji" in input) {
    data.emoji = normalizeDishEmoji(input.emoji);
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Aucune modification." }, { status: 400 });
  }

  try {
    const item = await prisma.menuItem.update({
      where: { id },
      data,
    });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Plat introuvable." }, { status: 404 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireOwner();
  if (denied) return denied;

  const { id } = await context.params;

  try {
    await prisma.menuItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Plat introuvable." }, { status: 404 });
  }
}
