"use client";

import { LogOut, Plus, Printer, QrCode } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { isWineCategoryName } from "@/lib/menu-price";
import { DigitalMenu } from "@/components/menu/digital-menu";
import { MenuSheet } from "@/components/menu/menu-sheet";
import type { MenuCategoryDto, MenuItemDto } from "@/components/menu/menu-types";
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
};

export function MenuAdminApp() {
  const logout = useOwnerLogout();
  const [view, setView] = useState<AdminView>("edit");
  const [categories, setCategories] = useState<MenuCategoryDto[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [printOpen, setPrintOpen] = useState(false);
  const [printSelection, setPrintSelection] = useState<string[]>([]);
  const [printFilter, setPrintFilter] = useState<"all" | string[] | null>(null);
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
  const isWineForm = Boolean(
    selectedCategory && isWineCategoryName(selectedCategory.name),
  );

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
          }
        : {
            name,
            description: form.description,
            price,
            imageUrl: form.imageUrl,
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
    setPrintSelection(categories.map((category) => category.id));
    setPrintOpen(true);
  }

  function togglePrintCategory(categoryId: string) {
    setPrintSelection((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId],
    );
  }

  function handlePrintSelection() {
    if (printSelection.length === 0) {
      toast.error("Sélectionnez au moins une catégorie.");
      return;
    }

    const allSelected = printSelection.length === categories.length;
    setPrintFilter(allSelected ? "all" : printSelection);
    setView("preview");
    setPrintOpen(false);

    window.setTimeout(() => {
      window.print();
    }, 200);
  }

  useEffect(() => {
    function onAfterPrint() {
      setPrintFilter(null);
    }
    window.addEventListener("afterprint", onAfterPrint);
    return () => window.removeEventListener("afterprint", onAfterPrint);
  }, []);

  const formOpen = isCreating || editingItem !== null;
  const qrSrc = `/api/menu/qr?url=${encodeURIComponent(menuPublicUrl)}`;
  const sheetFilter = printFilter ?? "all";

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
        <div className="grid min-h-0 flex-1 lg:grid-cols-[260px_1fr]">
          <aside className="menu-admin-chrome border-b border-[#D9CFB8] bg-[#FBF8F1] p-4 lg:border-b-0 lg:border-r">
            <h2 className="mb-2.5 px-1 text-[11px] font-semibold text-[#6b6a5f]">
              Catégories
            </h2>
            <div className="space-y-1">
              {categories.map((category) => {
                const active = category.id === selectedCategoryId;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`flex w-full items-center justify-between rounded-[7px] px-3 py-2.5 text-left text-[14.5px] transition ${
                      active
                        ? "bg-[#1E3A2F] text-[#FBF8F1]"
                        : "hover:bg-[#1E3A2F]/10"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span
                      className={`text-xs ${active ? "opacity-70" : "text-[#6b6a5f]"}`}
                    >
                      {category.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

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
                            {item.name}
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
                              item.priceQuart ? `1/4 ${item.priceQuart} €` : null,
                              item.priceDemi ? `1/2 ${item.priceDemi} €` : null,
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
                            className="rounded px-2 py-1 text-[12.5px] text-[#6b6a5f] hover:bg-black/5 hover:text-[#1B1E19]"
                            onClick={() => openEdit(item)}
                          >
                            Modifier
                          </button>
                          <button
                            type="button"
                            className="rounded px-2 py-1 text-[12.5px] text-[#6E2A2A] hover:bg-[#6E2A2A]/10"
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
            className={`flex-1 overflow-y-auto print:hidden ${printFilter ? "hidden" : ""}`}
          >
            <DigitalMenu categories={categories} />
          </div>
          <div className={printFilter ? "block" : "hidden print:block"}>
            <MenuSheet
              categories={categories}
              categoryFilter={sheetFilter}
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
                <Input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Ex. Filet de bar rôti"
                  className="border-[#D9CFB8] bg-[#FBF8F1]"
                />
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
                        ["priceQuart", "1/4"],
                        ["priceDemi", "1/2"],
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
          <div className="w-full max-w-[420px] rounded-xl bg-white p-6 shadow-xl">
            <h3 className="font-[family-name:var(--font-cormorant)] text-[23px]">
              Imprimer le menu
            </h3>
            <p className="mt-2 text-sm text-[#6b6a5f]">
              Choisissez les catégories à imprimer. Chaque catégorie commence
              sur une nouvelle page. Le nombre d&apos;exemplaires se règle dans
              la boîte d&apos;impression. Pour masquer la date / l&apos;URL,
              décochez « En-têtes et pieds de page » dans les options
              d&apos;impression.
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="text-xs font-semibold text-[#1E3A2F] underline"
                onClick={() =>
                  setPrintSelection(categories.map((category) => category.id))
                }
              >
                Tout sélectionner
              </button>
              <button
                type="button"
                className="text-xs font-semibold text-[#6b6a5f] underline"
                onClick={() => setPrintSelection([])}
              >
                Tout désélectionner
              </button>
            </div>

            <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto">
              {categories.map((category) => {
                const checked = printSelection.includes(category.id);
                return (
                  <li key={category.id}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#D9CFB8] bg-[#FBF8F1] px-3 py-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePrintCategory(category.id)}
                        className="size-4 accent-[#1E3A2F]"
                      />
                      <span className="flex-1 text-sm font-medium">
                        {category.name}
                      </span>
                      <span className="text-xs text-[#6b6a5f]">
                        {category.items.length} plat
                        {category.items.length > 1 ? "s" : ""}
                      </span>
                    </label>
                  </li>
                );
              })}
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
                Imprimer la sélection
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
