"use client";

import { useEffect, useState } from "react";

import { MenuSheet } from "@/components/menu/menu-sheet";
import type { MenuCategoryDto } from "@/components/menu/menu-types";

export default function PublicMenuPage() {
  const [categories, setCategories] = useState<MenuCategoryDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/menu");
        if (!response.ok) {
          setError("Impossible de charger le menu.");
          return;
        }
        setCategories((await response.json()) as MenuCategoryDto[]);
      } catch {
        setError("Impossible de charger le menu.");
      }
    }
    void load();
  }, []);

  return (
    <main className="min-h-dvh bg-[#F7F2E7] text-[#1B1E19]">
      {error ? (
        <p className="p-8 text-center text-sm text-red-700">{error}</p>
      ) : (
        <MenuSheet categories={categories} />
      )}
    </main>
  );
}
