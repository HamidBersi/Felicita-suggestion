/**
 * Seed du menu Felicita (salle + emporter).
 *
 * Idempotent : vide MenuItem + MenuCategory, puis réimporte les deux cartes.
 * L’admin / le QR / /menu consomment `menuType: "salle"` par défaut.
 * Usage : pnpm menu:seed
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import {
  MENU_CATEGORIES as EMPORTER_CATEGORIES,
  MENU_ITEMS as EMPORTER_ITEMS,
} from "../data/felicita-menu-emporter";
import {
  MENU_CATEGORIES as SALLE_CATEGORIES,
  MENU_ITEMS as SALLE_ITEMS,
} from "../data/felicita-menu-salle";

type SeedCategory = { id: string; label: string };
type SeedItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  tiers?: {
    verre?: number;
    quart?: number;
    demi?: number;
    bouteille?: number;
  };
};

/** Prix lisible : 17.5 → "17.50" ; 0 → "Sur demande" (poissons du jour) */
function priceToString(price: number): string {
  if (price === 0) return "Sur demande";
  return price.toFixed(2);
}

async function seedMenu(
  prisma: PrismaClient,
  menuType: "salle" | "emporter",
  categories: SeedCategory[],
  items: SeedItem[],
) {
  const categoryIdBySlug = new Map<string, string>();

  for (let index = 0; index < categories.length; index += 1) {
    const category = categories[index];
    const created = await prisma.menuCategory.create({
      data: {
        name: category.label,
        position: index,
        menuType,
      },
    });
    categoryIdBySlug.set(category.id, created.id);
  }

  const positionByCategory = new Map<string, number>();

  for (const item of items) {
    const categoryId = categoryIdBySlug.get(item.category);
    if (!categoryId) {
      throw new Error(`[${menuType}] Catégorie inconnue: ${item.category}`);
    }

    const position = positionByCategory.get(item.category) ?? 0;
    positionByCategory.set(item.category, position + 1);

    await prisma.menuItem.create({
      data: {
        name: item.name,
        description: item.description.trim() ? item.description.trim() : null,
        price: priceToString(item.price),
        imageUrl: null,
        isAvailable: true,
        position,
        categoryId,
        priceVerre: item.tiers?.verre != null ? priceToString(item.tiers.verre) : null,
        priceQuart: item.tiers?.quart != null ? priceToString(item.tiers.quart) : null,
        priceDemi: item.tiers?.demi != null ? priceToString(item.tiers.demi) : null,
        priceBouteille:
          item.tiers?.bouteille != null ? priceToString(item.tiers.bouteille) : null,
      },
    });
  }

  console.log(
    `  → ${menuType}: ${categories.length} catégories, ${items.length} plats`,
  );
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    console.log("🗑️  Suppression de l'ancien menu…");
    await prisma.menuItem.deleteMany();
    await prisma.menuCategory.deleteMany();

    console.log("📂 Import salle…");
    await seedMenu(prisma, "salle", SALLE_CATEGORIES, SALLE_ITEMS);

    console.log("📦 Import emporter (conservé pour plus tard)…");
    await seedMenu(prisma, "emporter", EMPORTER_CATEGORIES, EMPORTER_ITEMS);

    const byType = await prisma.menuCategory.groupBy({
      by: ["menuType"],
      _count: true,
    });
    const itemCount = await prisma.menuItem.count();
    console.log("✅ Seed OK —", byType, `· ${itemCount} plats au total`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("❌ Seed échoué:", error);
  process.exit(1);
});
