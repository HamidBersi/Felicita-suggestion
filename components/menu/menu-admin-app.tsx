"use client";

import { LogOut, Plus, Printer, QrCode } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { isWineCategoryName } from "@/lib/menu-price";
import { DishTitle } from "@/components/menu/dish-title";
import { DishEmojiSelect } from "@/components/menu/dish-emoji-select";
import { DISH_EMOJI_OPTIONS } from "@/lib/dish-emoji";
import { DigitalMenu } from "@/components/menu/digital-menu";
import {
  MenuFamilyBar,
  categoriesForFamily,
  familyIdForCategoryName,
} from "@/components/menu/menu-family-bar";
import { MenuSheet } from "@/components/menu/menu-sheet";
import type { MenuCategoryDto, MenuItemDto } from "@/components/menu/menu-types";
import type { MenuFamilyId } from "@/components/menu/menu-groups";
import {
  loadLastPrintHashes,
  modifiedPrintPages,
  pagePreviewLabel,
  rememberPrintedPages,
  slicePrintPagesFromDom,
  type PrintPageSlice,
} from "@/components/menu/print-pagination";
import { useOwnerLogout } from "@/components/menu/owner-gate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";

export type { MenuCategoryDto, MenuItemDto };

type DishFormState = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  priceVerre: string;
  priceQuart: string;
  priceDemi: string;
  priceBouteille: string;
  emoji: string;
};

type AdminView = "edit" | "preview";

const emptyForm: DishFormState = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  priceVerre: "",
  priceQuart: "",
  priceDemi: "",
  priceBouteille: "",
  emoji: "",
};

export function MenuAdminApp() {
  void DISH_EMOJI_OPTIONS;
  const logout = useOwnerLogout();
  const [view, setView] = useState<AdminView>("edit");
  const [categories, setCategories] = useState<MenuCategoryDto[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [familyId, setFamilyId] = useState<MenuFamilyId>("all");
  const [printOpen, setPrintOpen] = useState(false);
  const [printSelection, setPrintSelection] = useState<number[]>([]);
  const [printSlices, setPrintSlices] = useState<PrintPageSlice[] | null>(null);
  const [estimatedPages, setEstimatedPages] = useState<PrintPageSlice[]>([]);
  const [modifiedPages, setModifiedPages] = useState<number[]>([]);
  const measureRef = useRef<HTMLDivElement>(null);
  const pageHeightRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItemDto | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<DishFormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [menuPublicUrl, setMenuPublicUrl] = useState("/menu");

  const loadMenu = useCallback(async () => {
    try {
      const response = await fetch("/api/menu");
      if (!response.ok) {
        toast.error("Impossible de charger le menu.");
        return;
      }
      const data = (await response.json()) as MenuCategoryDto[];
      setCategories(data);
      setSelectedCategoryId((current) => {
        if (current && data.some((category) => category.id === current)) {
          return current;
        }
        return data[0]?.id ?? null;
      });
    } catch {
      toast.error("Impossible de charger le menu.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMenu();
  }, [loadMenu]);

  useEffect(() => {
    setMenuPublicUrl(`${window.location.origin}/menu`);
  }, []);

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === selectedCategoryId) ?? null,
    [categories, selectedCategoryId],
  );
  const familyReadyRef = useRef(false);

  useEffect(() => {
    if (familyReadyRef.current || !selectedCategory) return;
    familyReadyRef.current = true;
    setFamilyId(familyIdForCategoryName(selectedCategory.name));
  }, [selectedCategory]);
  const isWineForm = Boolean(
    selectedCategory && isWineCategoryName(selectedCategory.name),
  );

  function selectFamily(next: MenuFamilyId) {
    setFamilyId(next);
    const inFamily = categoriesForFamily(next, categories);
    const keep = inFamily.find((category) => category.id === selectedCategoryId);
    setSelectedCategoryId((keep ?? inFamily[0])?.id ?? null);
  }

  function selectSubCategory(name: string | null) {
    if (!name) return;
    const found = categories.find((category) => category.name === name);
    if (found) setSelectedCategoryId(found.id);
  }

  function openCreate() {
    if (!selectedCategoryId) {
      toast.error("Choisissez une catégorie.");
      return;
    }
    setEditingItem(null);
    setIsCreating(true);
    setForm(emptyForm);
  }

  function openEdit(item: MenuItemDto) {
    setIsCreating(false);
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description ?? "",
      price: item.price,
      imageUrl: item.imageUrl ?? "",
      priceVerre: item.priceVerre ?? "",
      priceQuart: item.priceQuart ?? "",
      priceDemi: item.priceDemi ?? "",
      priceBouteille: item.priceBouteille ?? "",
      emoji: item.emoji ?? "",
    });
  }

  function closeForm() {
    setIsCreating(false);
    setEditingItem(null);
    setForm(emptyForm);
  }

  async function saveDish() {
    const name = form.name.trim();
    const wineTiers = {
      priceVerre: form.priceVerre.trim(),
      priceQuart: form.priceQuart.trim(),
      priceDemi: form.priceDemi.trim(),
      priceBouteille: form.priceBouteille.trim(),
    };
    const price = isWineForm
      ? wineTiers.priceVerre ||
        wineTiers.priceBouteille ||
        wineTiers.priceQuart ||
        wineTiers.priceDemi
      : form.price.trim();

    if (!name || !price) {
      toast.error(
        isWineForm
          ? "Le nom et au moins un tarif (verre ou bouteille) sont obligatoires."
          : "Le nom et le prix sont obligatoires.",
      );
      return;
    }

    setSaving(true);
    try {
      const payload = isWineForm
        ? {
            name,
            description: form.description,
            imageUrl: form.imageUrl,
            price,
            ...wineTiers,
            emoji: form.emoji,
          }
        : {
            name,
            description: form.description,
            price,
            imageUrl: form.imageUrl,
            emoji: form.emoji,
          };
      if (editingItem) {
        const response = await fetch(`/api/menu/items/${editingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          toast.error(data?.error ?? "Modification impossible.");
          return;
        }
        toast.success("Plat mis à jour");
      } else {
        const response = await fetch("/api/menu/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            categoryId: selectedCategoryId,
            ...payload,
          }),
        });
        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          toast.error(data?.error ?? "Création impossible.");
          return;
        }
        toast.success("Plat ajouté");
      }

      closeForm();
      await loadMenu();
    } catch {
      toast.error("Erreur réseau.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteDish(item: MenuItemDto) {
    if (!confirm(`Supprimer « ${item.name} » ?`)) return;

    try {
      const response = await fetch(`/api/menu/items/${item.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        toast.error("Suppression impossible.");
        return;
      }
      toast.success("Plat supprimé");
      await loadMenu();
    } catch {
      toast.error("Erreur réseau.");
    }
  }

  function openPrintModal() {
    setEstimatedPages([]);
    setPrintSelection([]);
    setModifiedPages([]);
    setPrintOpen(true);
  }

  useEffect(() => {
    if (!printOpen) return;

    let cancelled = false;

    async function measurePages() {
      await document.fonts.ready;
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      if (cancelled) return;
      const root = measureRef.current;
      const probe = pageHeightRef.current;
      if (!root || !probe) return;
      const slices = slicePrintPagesFromDom(
        root,
        Math.max(probe.offsetHeight, 1),
        categories,
      );
      const modified = modifiedPrintPages(slices, loadLastPrintHashes());
      setEstimatedPages(slices);
      setModifiedPages(modified);
      setPrintSelection(slices.map((slice) => slice.page));
    }

    void measurePages();
    return () => {
      cancelled = true;
    };
  }, [printOpen, categories]);

  function togglePrintPage(page: number) {
    setPrintSelection((current) =>
      current.includes(page)
        ? current.filter((value) => value !== page)
        : [...current, page].sort((a, b) => a - b),
    );
  }

  function selectAllPrintPages() {
    setPrintSelection(estimatedPages.map((slice) => slice.page));
  }

  function selectModifiedPrintPages() {
    setPrintSelection(modifiedPages);
  }

  function handlePrintSelection() {
    if (printSelection.length === 0) {
      toast.error("Sélectionnez au moins une page.");
      return;
    }

    const selected = estimatedPages.filter((slice) =>
      printSelection.includes(slice.page),
    );
    setPrintSlices(selected);
    setView("preview");
    setPrintOpen(false);

    window.setTimeout(() => {
      window.print();
    }, 200);
  }

  useEffect(() => {
    function onAfterPrint() {
      if (printSlices && estimatedPages.length > 0) {
        rememberPrintedPages(
          estimatedPages,
          printSlices.map((slice) => slice.page),
        );
      }
      setPrintSlices(null);
    }
    window.addEventListener("afterprint", onAfterPrint);
    return () => window.removeEventListener("afterprint", onAfterPrint);
  }, [printSlices, estimatedPages]);

  const formOpen = isCreating || editingItem !== null;
  const qrSrc = `/api/menu/qr?url=${encodeURIComponent(menuPublicUrl)}`;
  const allPagesSelected =
    estimatedPages.length > 0 &&
    printSelection.length === estimatedPages.length;
  const modifiedPagesSelected =
    modifiedPages.length > 0 &&
    printSelection.length === modifiedPages.length &&
    modifiedPages.every((page) => printSelection.includes(page));

  return (
    <div className="menu-admin-root flex min-h-dvh flex-1 flex-col bg-[#F7F2E7] text-[#1B1E19]">
      <header className="menu-admin-chrome flex shrink-0 flex-wrap items-center justify-between gap-3 bg-[#1E3A2F] px-5 py-3.5 text-[#FBF8F1]">
        <div className="flex items-baseline gap-2.5">
          <span className="font-[family-name:var(--font-cormorant)] text-[22px] tracking-wide">
            Le Menu
          </span>
          <span className="text-xs tracking-wide text-[#D8B871]">espace admin</span>
        </div>

        <div className="flex rounded-lg bg-black/20 p-1">
          <button
            type="button"
            onClick={() => setView("edit")}
            className={`rounded-md px-3.5 py-2 text-sm transition ${
              view === "edit"
                ? "bg-[#B68A3D] font-semibold text-[#1E3A2F]"
                : "text-[#FBF8F1] hover:bg-white/10"
            }`}
          >
            Éditer le menu
          </button>
          <button
            type="button"
            onClick={() => setView("preview")}
            className={`rounded-md px-3.5 py-2 text-sm transition ${
              view === "preview"
                ? "bg-[#B68A3D] font-semibold text-[#1E3A2F]"
                : "text-[#FBF8F1] hover:bg-white/10"
            }`}
          >
            Aperçu / menu digital
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md border border-[#D8B871]/70 px-3 py-2 text-[13px] text-[#FBF8F1] transition hover:bg-white/10"
            onClick={openPrintModal}
          >
            <Printer className="size-3.5" />
            Imprimer
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md bg-[#B68A3D] px-3 py-2 text-[13px] font-semibold text-[#1E3A2F] transition hover:bg-[#D8B871]"
            onClick={() => setQrOpen(true)}
          >
            <QrCode className="size-3.5" />
            QR code
          </button>
          <Button
            type="button"
            variant="outline"
            className="border-[#D8B871]/50 bg-transparent text-[#FBF8F1] hover:bg-white/10 hover:text-white"
            onClick={logout}
          >
            <LogOut className="size-4" />
            Quitter
          </Button>
        </div>
      </header>

      {view === "edit" ? (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="menu-admin-chrome shrink-0 border-b border-[#D9CFB8] bg-[#FBF8F1]/95 px-4 py-3 backdrop-blur-sm sm:px-6">
            <MenuFamilyBar
              familyId={familyId}
              onFamilyChange={selectFamily}
              subCategoryName={selectedCategory?.name ?? null}
              onSubCategoryChange={selectSubCategory}
              categoryNames={categoriesForFamily("all", categories).map(
                (category) => category.name,
              )}
              showSubAllTab={false}
            />
          </div>

          <section className="overflow-y-auto p-6 sm:p-8">
            {loading ? (
              <p className="text-sm text-[#6b6a5f]">Chargement…</p>
            ) : (
              <>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-[family-name:var(--font-cormorant)] text-[28px] font-semibold">
                    {selectedCategory?.name ?? "Aucune catégorie"}
                  </h2>
                  <button
                    type="button"
                    onClick={openCreate}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#B68A3D] px-4 py-2.5 text-[13.5px] font-semibold text-[#1E3A2F] transition hover:bg-[#D8B871]"
                  >
                    <Plus className="size-4" />
                    Ajouter un plat
                  </button>
                </div>

                {!selectedCategory || selectedCategory.items.length === 0 ? (
                  <div className="rounded-[10px] border border-dashed border-[#D9CFB8] px-8 py-10 text-center text-[#6b6a5f]">
                    Aucun plat dans cette catégorie pour l&apos;instant.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
                    {selectedCategory.items.map((item) => (
                      <article
                        key={item.id}
                        className="flex min-w-0 flex-col gap-1.5 rounded-[10px] border border-[#D9CFB8] bg-white px-4 py-3.5"
                      >
                        <div className="flex min-w-0 items-start justify-between gap-2">
                          <h3 className="min-w-0 flex-1 break-words font-[family-name:var(--font-cormorant)] text-[19px] font-semibold leading-snug">
                            <DishTitle name={item.name} emoji={item.emoji} />
                          </h3>
                          <span className="shrink-0 font-semibold text-[#1E3A2F]">
                            {item.price} €
                          </span>
                        </div>
                        {item.priceVerre ||
                        item.priceQuart ||
                        item.priceDemi ||
                        item.priceBouteille ? (
                          <p className="text-[12px] text-[#6b6a5f]">
                            {[
                              item.priceQuart ? `Quart ${item.priceQuart} €` : null,
                              item.priceDemi ? `Demi ${item.priceDemi} €` : null,
                              item.priceBouteille
                                ? `Btl ${item.priceBouteille} €`
                                : null,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        ) : null}
                        {item.description?.trim() ? (
                          <p className="w-full break-words text-sm leading-snug text-[#6b6a5f]">
                            {item.description}
                          </p>
                        ) : null}
                        <div className="mt-1.5 flex justify-end gap-1">
                          <button
                            type="button"
                            className="rounded px-2 py-1 text-[12.5px] font-semibold text-[#6b6a5f] hover:bg-black/5 hover:text-[#1B1E19]"
                            onClick={() => openEdit(item)}
                          >
                            Modifier
                          </button>
                          <button
                            type="button"
                            className="rounded px-2 py-1 text-[12.5px] font-semibold text-[#6E2A2A] hover:bg-[#6E2A2A]/10"
                            onClick={() => void deleteDish(item)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col bg-[#F4F1EA]">
          <div
            className={`flex-1 overflow-y-auto print:hidden ${printSlices ? "hidden" : ""}`}
          >
            <DigitalMenu categories={categories} />
          </div>
          <div className={printSlices ? "block" : "hidden print:block"}>
            <MenuSheet
              categories={categories}
              printSlices={printSlices}
            />
          </div>
        </div>
      )}

      {formOpen ? (
        <div className="menu-admin-chrome fixed inset-0 z-50 flex items-center justify-center bg-[#1B1E19]/55 p-5">
          <div className="max-h-[90vh] w-full max-w-[460px] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 font-[family-name:var(--font-cormorant)] text-[23px]">
              {editingItem ? "Modifier le plat" : "Ajouter un plat"}
            </h3>

            <div className="space-y-3.5">
              <label className="block">
                <span className="mb-1.5 block text-[12.5px] font-semibold text-[#6b6a5f]">
                  {isWineForm ? "Nom du vin" : "Nom du plat"}
                </span>
                <div className="relative">
                  <Input
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                    placeholder="Ex. Filet de bar rôti"
                    className="border-[#D9CFB8] bg-[#FBF8F1] pr-12"
                  />
                  <DishEmojiSelect
                    value={form.emoji}
                    onChange={(emoji) =>
                      setForm((current) => ({ ...current, emoji }))
                    }
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[12.5px] font-semibold text-[#6b6a5f]">
                  Ingrédients / description
                </span>
                <Textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Ex. Bar de ligne, beurre blanc…"
                  className="min-h-[60px] border-[#D9CFB8] bg-[#FBF8F1]"
                />
              </label>

              {isWineForm ? (
                <div>
                  <p className="mb-1.5 text-[12.5px] font-semibold text-[#6b6a5f]">
                    Tarifs (€) — laisse vide un format non proposé
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(
                      [
                        ["priceVerre", "Verre"],
                        ["priceQuart", "Quart"],
                        ["priceDemi", "Demi"],
                        ["priceBouteille", "Bouteille"],
                      ] as const
                    ).map(([key, label]) => (
                      <label key={key} className="block">
                        <span className="mb-1 block text-[11px] text-[#8a8578]">
                          {label}
                        </span>
                        <Input
                          value={form[key]}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              [key]: event.target.value,
                            }))
                          }
                          placeholder="—"
                          inputMode="decimal"
                          className="border-[#D9CFB8] bg-[#FBF8F1]"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <label className="block">
                  <span className="mb-1.5 block text-[12.5px] font-semibold text-[#6b6a5f]">
                    Prix (€)
                  </span>
                  <Input
                    value={form.price}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, price: event.target.value }))
                    }
                    placeholder="Ex. 24"
                    className="border-[#D9CFB8] bg-[#FBF8F1]"
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-1.5 block text-[12.5px] font-semibold text-[#6b6a5f]">
                  Image (lien URL, optionnel)
                </span>
                <Input
                  value={form.imageUrl}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      imageUrl: event.target.value,
                    }))
                  }
                  placeholder="https://..."
                  className="border-[#D9CFB8] bg-[#FBF8F1]"
                />
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-[#D9CFB8] px-4 py-2 text-[13.5px]"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => void saveDish()}
                className="rounded-md bg-[#1E3A2F] px-4 py-2 text-[13.5px] font-semibold text-[#FBF8F1] hover:bg-[#2C5142] disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {printOpen ? (
        <div className="menu-admin-chrome fixed inset-0 z-50 flex items-center justify-center bg-[#1B1E19]/55 p-5">
          <div className="pointer-events-none fixed top-0 -left-[240vw] -z-10">
            <div ref={pageHeightRef} className="h-[269mm] w-[166mm]" />
            <div ref={measureRef} className="w-[166mm]">
              <MenuSheet categories={categories} measure />
            </div>
          </div>

          <div className="w-full max-w-[420px] rounded-xl bg-white p-6 shadow-xl">
            <h3 className="font-[family-name:var(--font-cormorant)] text-[23px]">
              Imprimer le menu
            </h3>

            <div className="mt-4 space-y-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#D9CFB8] bg-[#FBF8F1] px-3 py-2.5">
                <input
                  type="checkbox"
                  checked={allPagesSelected}
                  onChange={() => {
                    if (allPagesSelected) {
                      setPrintSelection([]);
                    } else {
                      selectAllPrintPages();
                    }
                  }}
                  className="size-4 accent-[#1E3A2F]"
                />
                <span className="text-sm font-medium">Tout</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#D9CFB8] bg-[#FBF8F1] px-3 py-2.5">
                <input
                  type="checkbox"
                  checked={modifiedPagesSelected}
                  disabled={modifiedPages.length === 0}
                  onChange={() => {
                    if (modifiedPagesSelected) {
                      setPrintSelection([]);
                    } else {
                      selectModifiedPrintPages();
                    }
                  }}
                  className="size-4 accent-[#1E3A2F]"
                />
                <span className="text-sm font-medium">
                  Imprimer les pages modifiées
                </span>
                <span className="ml-auto text-xs text-[#6b6a5f]">
                  {modifiedPages.length}
                </span>
              </label>
            </div>

            <ul className="mt-4 max-h-64 space-y-2 overflow-y-auto">
              {estimatedPages.length === 0 ? (
                <li className="px-1 py-6 text-center text-sm text-[#6b6a5f]">
                  Calcul des pages…
                </li>
              ) : (
                estimatedPages.map((slice) => {
                  const checked = printSelection.includes(slice.page);
                  const changed = modifiedPages.includes(slice.page);
                  return (
                    <li key={slice.page}>
                      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#D9CFB8] bg-[#FBF8F1] px-3 py-2.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => togglePrintPage(slice.page)}
                          className="size-4 accent-[#1E3A2F]"
                        />
                        <span className="flex-1 text-sm font-medium">
                          Page {slice.page}
                        </span>
                        <span className="max-w-[58%] truncate text-right text-xs text-[#6b6a5f]">
                          {changed ? "modifiée · " : ""}
                          {pagePreviewLabel(slice)}
                        </span>
                      </label>
                    </li>
                  );
                })
              )}
            </ul>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPrintOpen(false)}
                className="rounded-md border border-[#D9CFB8] px-4 py-2 text-[13.5px]"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handlePrintSelection}
                className="rounded-md bg-[#1E3A2F] px-4 py-2 text-[13.5px] font-semibold text-[#FBF8F1]"
              >
                Imprimer
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {qrOpen ? (
        <div className="menu-admin-chrome fixed inset-0 z-50 flex items-center justify-center bg-[#1B1E19]/55 p-5">
          <div className="w-full max-w-[360px] rounded-xl bg-white p-6 text-center shadow-xl">
            <h3 className="font-[family-name:var(--font-cormorant)] text-[23px]">
              QR code du menu
            </h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrSrc}
              alt="QR code menu"
              className="mx-auto mt-4 h-[220px] w-[220px] rounded-lg border border-[#D9CFB8]"
            />
            <p className="mt-3 break-all text-xs text-[#6b6a5f]">{menuPublicUrl}</p>
            <p className="mt-2 text-xs text-[#6b6a5f]">
              Ce lien reste fixe. Modifier les plats ne change pas le QR.
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <a
                href={qrSrc}
                download="felicita-menu-qr.png"
                className="rounded-md border border-[#D9CFB8] px-4 py-2 text-[13.5px]"
              >
                Télécharger
              </a>
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                className="rounded-md bg-[#1E3A2F] px-4 py-2 text-[13.5px] font-semibold text-[#FBF8F1]"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Toaster richColors position="top-center" />
    </div>
  );
}
