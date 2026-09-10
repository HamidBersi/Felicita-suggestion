/**
 * Seed du menu Felicita.
 *
 * Idempotent : vide MenuItem + MenuCategory, puis réimporte.
 * Usage : pnpm menu:seed
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/felicita-menu";

/** Prix lisible : 17.5 → "17.50", 11.9 → "11.90" */
function priceToString(price: number): string {
  return price.toFixed(2);
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new Pool({
    connectionString,
    // Seed local → Supabase : SSL requis
    ssl: { rejectUnauthorized: false },
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    console.log("🗑️  Suppression de l'ancien menu…");
    // Ordre important : items d'abord (FK), puis catégories
    await prisma.menuItem.deleteMany();
    await prisma.menuCategory.deleteMany();

    console.log("📂 Création des catégories…");
    const categoryIdBySlug = new Map<string, string>();

    for (let index = 0; index < MENU_CATEGORIES.length; index += 1) {
      const category = MENU_CATEGORIES[index];
      const created = await prisma.menuCategory.create({
        data: {
          name: category.label,
          position: index,
        },
      });
      categoryIdBySlug.set(category.id, created.id);
    }

    console.log("🍝 Création des plats…");
    let positionByCategory = new Map<string, number>();

    for (const item of MENU_ITEMS) {
      const categoryId = categoryIdBySlug.get(item.category);
      if (!categoryId) {
        throw new Error(`Catégorie inconnue: ${item.category}`);
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
        },
      });
    }

    const categoryCount = await prisma.menuCategory.count();
    const itemCount = await prisma.menuItem.count();
    console.log(`✅ Seed OK — ${categoryCount} catégories, ${itemCount} plats.`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("❌ Seed échoué:", error);
  process.exit(1);
});
