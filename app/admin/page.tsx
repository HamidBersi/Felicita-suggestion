"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Camera,
  Check,
  ChevronDown,
  Eye,
  GripVertical,
  Loader2,
  LogOut,
  Monitor,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AdminGate, useAdminLogout } from "@/components/admin/admin-gate";
import {
  TitleAutocomplete,
  type CatalogHit,
} from "@/components/admin/title-autocomplete";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { compressImageForUpload } from "@/lib/compress-image";

type LabelColor = "orange" | "red" | "green";

type ApiSuggestion = {
  id: string;
  title: string;
  description: string | null;
  price: string;
  label: string | null;
  labelColor: string;
  position: number;
  isActive: boolean;
  imageUrl?: string | null;
};

type SuggestionRow = {
  id: string;
  title: string;
  description: string;
  price: string;
  label: string;
  labelColor: LabelColor;
  /** URL en base, ou "" s’il n’y a pas / plus de photo. */
  imageUrl: string;
};

function createInitialRow(): SuggestionRow {
  return {
    id: "row-0",
    title: "",
    description: "",
    price: "",
    label: "",
    labelColor: "orange",
    imageUrl: "",
  };
}

function createEmptyRow(): SuggestionRow {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    price: "",
    label: "",
    labelColor: "orange",
    imageUrl: "",
  };
}

function isLabelColor(color: string): color is LabelColor {
  return color === "orange" || color === "red" || color === "green";
}

function apiToRow(stored: ApiSuggestion): SuggestionRow {
  return {
    id: stored.id,
    title: stored.title,
    description: stored.description ?? "",
    price: stored.price,
    label: stored.label ?? "",
    labelColor: isLabelColor(stored.labelColor) ? stored.labelColor : "orange",
    imageUrl: stored.imageUrl?.trim() ?? "",
  };
}

function formatPrice(price: string): string {
  const trimmed = price.trim();
  if (!trimmed) return "";
  return trimmed.includes("€") ? trimmed : `${trimmed} €`;
}

function getLabelBadgeClass(color: LabelColor): string {
  switch (color) {
    case "red":
      return "bg-red-600 text-white hover:bg-red-600";
    case "green":
      return "bg-green-600 text-white hover:bg-green-600";
    default:
      return "bg-orange-500 text-black hover:bg-orange-500";
  }
}

function getColorDotClass(color: LabelColor): string {
  switch (color) {
    case "red":
      return "bg-red-600";
    case "green":
      return "bg-green-600";
    default:
      return "bg-orange-500";
  }
}

const labelColorOptions: LabelColor[] = ["orange", "red", "green"];

function LabelColorPicker({
  color,
  onColorChange,
}: {
  color: LabelColor;
  onColorChange: (color: LabelColor) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={`relative shrink-0 ${open ? "z-50" : ""}`}
    >
      <button
        type="button"
        className="flex h-10 items-center gap-1.5 rounded-r-md border border-[#D9CFB8] border-l-0 bg-[#FBF8F1] px-3 transition-colors hover:bg-[#1E3A2F]/10"
        aria-label="Choisir la couleur du badge"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span
          className={`size-3 rounded-full ${getColorDotClass(color)}`}
        />
        <ChevronDown className="size-3.5 text-stone-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 flex items-center gap-2 rounded-xl border border-stone-200 bg-white p-2 shadow-lg">
          {labelColorOptions.map((option) => (
            <button
              key={option}
              type="button"
              aria-label={`Couleur ${option}`}
              className={`rounded-full p-0.5 transition ${
                color === option ? "ring-2 ring-stone-400" : "ring-2 ring-transparent"
              }`}
              onClick={() => {
                onColorChange(option);
                setOpen(false);
              }}
            >
              <span
                className={`block size-5 rounded-full ${getColorDotClass(option)}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const fieldLabelClass =
  "mb-1.5 block text-[12.5px] font-semibold text-[#6b6a5f]";

const inputClass =
  "h-10 border-[#D9CFB8] bg-[#FBF8F1] text-[#1B1E19] focus-visible:border-[#1E3A2F]/40 focus-visible:ring-[#1E3A2F]/15";

const cardHeaderClass =
  "flex w-full flex-row items-center justify-between rounded-t-[10px] border-b border-[#D9CFB8] bg-[#FBF8F1] px-4 py-3";

function PhotoField({
  index,
  imageUrl,
  onImageUrlChange,
}: {
  index: number;
  imageUrl: string;
  onImageUrlChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const shown = localPreview || imageUrl;

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  async function handleFile(file: File | undefined) {
    if (!file || !file.type.startsWith("image/")) return;

    const preview = URL.createObjectURL(file);
    setLocalPreview((current) => {
      if (current) URL.revokeObjectURL(current);
      return preview;
    });

    setUploading(true);
    try {
      const compressed = await compressImageForUpload(file);
      const body = new FormData();
      body.append("file", compressed);

      const response = await fetch("/api/suggestions/image", {
        method: "POST",
        credentials: "include",
        body,
      });

      const payload = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !payload.url) {
        toast.error(payload.error ?? "Impossible d’envoyer la photo");
        return;
      }

      onImageUrlChange(payload.url);
      setLocalPreview((current) => {
        if (current) URL.revokeObjectURL(current);
        return null;
      });
    } catch {
      toast.error("Impossible d’envoyer la photo");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove() {
    setLocalPreview((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    if (inputRef.current) inputRef.current.value = "";
    setIsLandscape(false);
    onImageUrlChange("");
  }

  return (
    <div className="space-y-1.5">
      <p className={fieldLabelClass}>
        Photo{" "}
        <span className="font-normal text-[#8a8578]">(optionnel)</span>
      </p>
      <input
        ref={inputRef}
        id={`photo-${index}`}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <div
        className={`relative overflow-hidden rounded-2xl transition ${
          dragOver
            ? "ring-2 ring-[#B68A3D] ring-offset-2 ring-offset-white"
            : ""
        } ${
          shown
            ? "border border-[#D9CFB8] bg-[#1B1E19]"
            : "border border-dashed border-[#D9CFB8] bg-[#FBF8F1]"
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          void handleFile(event.dataTransfer.files[0]);
        }}
      >
        {shown ? (
          <img
            src={shown}
            alt=""
            className="h-44 w-full object-cover sm:h-52"
            onLoad={(event) => {
              const photo = event.currentTarget;
              setIsLandscape(photo.naturalWidth > photo.naturalHeight);
            }}
          />
        ) : (
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="flex h-40 w-full flex-col items-center justify-center gap-3 px-4 text-center sm:h-44"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(30,58,47,0.08)] ring-1 ring-[#E0B84A]/40">
              <Camera className="size-5 text-[#1E3A2F]" />
            </span>
            <span>
              <span className="block text-[14px] font-semibold text-[#1B1E19]">
                Ajouter une photo
              </span>
              <span className="mt-0.5 block text-[12px] text-[#8a8578]">
                Cadre le plat à la verticale, comme l’écran en salle.
                Appareil, galerie ou glisser-déposer.
              </span>
            </span>
          </button>
        )}

        {shown && !uploading ? (
          <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/55 via-black/10 to-transparent p-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-semibold text-[#1E3A2F] shadow-sm"
            >
              Changer
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex size-8 items-center justify-center rounded-full bg-white/95 text-[#6E2A2A] shadow-sm"
              aria-label="Retirer la photo"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : null}

        {isLandscape && shown && !uploading ? (
          <p className="border-t border-[#E8D9B0] bg-[#FBF8F1] px-3 py-2 text-[12px] leading-snug text-[#8F6A24]">
            Photo trop large : elle sera recadrée sur les côtés en salle.
          </p>
        ) : null}

        {uploading ? (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#1B1E19]/50">
            <Loader2 className="size-7 animate-spin text-white" />
            <span className="text-[12px] font-medium text-white/90">
              Envoi de la photo…
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );
}

type RowCardProps = {
  row: SuggestionRow;
  index: number;
  canRemove: boolean;
  onUpdate: (id: string, field: keyof SuggestionRow, value: string) => void;
  onApplyCatalog: (id: string, hit: CatalogHit) => void;
  onRemove: (id: string) => void;
  dragHandle?: React.ReactNode;
};

function RowCard({
  row,
  index,
  canRemove,
  onUpdate,
  onApplyCatalog,
  onRemove,
  dragHandle,
}: RowCardProps) {
  return (
    <Card className="gap-0 overflow-visible rounded-[10px] border border-[#D9CFB8] bg-white p-0 shadow-none">
      <CardHeader className={`${cardHeaderClass} overflow-hidden`}>
        <div className="flex items-center gap-2.5">
          {dragHandle ?? (
            <span className="rounded-md border border-[#D9CFB8] bg-white p-1.5 text-[#8a8578]">
              <GripVertical className="size-4" />
            </span>
          )}
          <CardTitle className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold tracking-tight text-[#1B1E19]">
            Suggestion {index + 1}
          </CardTitle>
        </div>
        <button
          type="button"
          className="rounded px-2 py-1 text-[12.5px] font-semibold text-[#6E2A2A] hover:bg-[#6E2A2A]/10 disabled:opacity-40"
          onClick={() => onRemove(row.id)}
          disabled={!canRemove}
        >
          Supprimer
        </button>
      </CardHeader>

      <CardContent className="relative space-y-4 overflow-visible px-5 py-4">
        <div className="space-y-1.5">
          <label htmlFor={`title-${index}`} className={fieldLabelClass}>
            Titre
          </label>
          <TitleAutocomplete
            id={`title-${index}`}
            className={inputClass}
            placeholder="Ex : Risotto aux truffes"
            value={row.title}
            onChange={(value) => onUpdate(row.id, "title", value)}
            onSelect={(hit) => onApplyCatalog(row.id, hit)}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor={`description-${index}`} className={fieldLabelClass}>
            Description
          </label>
          <Textarea
            id={`description-${index}`}
            className={`min-h-20 ${inputClass}`}
            placeholder="Décrivez le plat..."
            value={row.description}
            onChange={(e) => onUpdate(row.id, "description", e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor={`price-${index}`} className={fieldLabelClass}>
              Prix
            </label>
            <Input
              id={`price-${index}`}
              className={inputClass}
              placeholder="Ex : 24,50 €"
              value={row.price}
              onChange={(e) => onUpdate(row.id, "price", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor={`label-${index}`} className={fieldLabelClass}>
              Label{" "}
              <span className="font-normal text-[#8a8578]">
                (optionnel)
              </span>
            </label>
            <div className="flex">
              <Input
                id={`label-${index}`}
                className={`flex-1 rounded-r-none border-r-0 ${inputClass}`}
                placeholder="Ex : Du chef"
                value={row.label}
                onChange={(e) => onUpdate(row.id, "label", e.target.value)}
              />
              <LabelColorPicker
                color={row.labelColor}
                onColorChange={(color) =>
                  onUpdate(row.id, "labelColor", color)
                }
              />
            </div>
          </div>
        </div>

        <PhotoField
          index={index}
          imageUrl={row.imageUrl}
          onImageUrlChange={(value) => onUpdate(row.id, "imageUrl", value)}
        />
      </CardContent>
    </Card>
  );
}

function StaticRow(props: Omit<RowCardProps, "dragHandle">) {
  return (
    <div>
      <RowCard {...props} />
    </div>
  );
}

type SortableRowProps = Omit<RowCardProps, "dragHandle">;

function SortableRow(props: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <RowCard
        {...props}
        dragHandle={
          <button
            type="button"
            className="cursor-grab touch-none rounded-md border border-[#D9CFB8] bg-white p-1.5 text-[#8a8578] hover:border-[#1E3A2F]/30 hover:text-[#1E3A2F] active:cursor-grabbing"
            aria-label="Déplacer la suggestion"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="size-4" />
          </button>
        }
      />
    </div>
  );
}

type SortableListProps = {
  suggestions: SuggestionRow[];
  onUpdate: (id: string, field: keyof SuggestionRow, value: string) => void;
  onApplyCatalog: (id: string, hit: CatalogHit) => void;
  onRemove: (id: string) => void;
  onDragEnd: (event: DragEndEvent) => void;
};

function SortableList({
  suggestions,
  onUpdate,
  onApplyCatalog,
  onRemove,
  onDragEnd,
}: SortableListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={suggestions.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {suggestions.map((row, index) => (
            <SortableRow
              key={row.id}
              row={row}
              index={index}
              canRemove={suggestions.length > 1}
              onUpdate={onUpdate}
              onApplyCatalog={onApplyCatalog}
              onRemove={onRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function AdminPanel() {
  const logout = useAdminLogout();
  const [suggestions, setSuggestions] = useState<SuggestionRow[]>([
    createInitialRow(),
  ]);
  const [preview, setPreview] = useState<SuggestionRow[]>([]);
  const [hasStoredSuggestions, setHasStoredSuggestions] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Charge les suggestions actives puis active le drag and drop côté client
  useEffect(() => {
    async function loadSuggestionsFromApi() {
      try {
        const response = await fetch("/api/suggestions");

        if (!response.ok) {
          return;
        }

        const stored = (await response.json()) as ApiSuggestion[];

        if (stored.length > 0) {
          setSuggestions(stored.map(apiToRow));
          setHasStoredSuggestions(true);
        }
      } catch {
        // Conserve la ligne vide par défaut en cas d'erreur réseau
      } finally {
        setMounted(true);
      }
    }

    void loadSuggestionsFromApi();
  }, []);

  function updateRow(id: string, field: keyof SuggestionRow, value: string) {
    setSuggestions((current) =>
      current.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  }

  function applyCatalogHit(id: string, hit: CatalogHit) {
    setSuggestions((current) =>
      current.map((row) =>
        row.id === id
          ? {
              ...row,
              title: hit.title,
              description: hit.description ?? "",
              price: hit.price,
              label: hit.label ?? "",
              labelColor: isLabelColor(hit.labelColor)
                ? hit.labelColor
                : row.labelColor,
              imageUrl: hit.imageUrl?.trim() ?? "",
            }
          : row
      )
    );
  }

  function addRow() {
    setSuggestions((current) => [...current, createEmptyRow()]);
  }

  function removeRow(id: string) {
    setSuggestions((current) => {
      if (current.length === 1) return current;
      return current.filter((row) => row.id !== id);
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log("drag end", active.id, over?.id);

    if (!over || active.id === over.id) return;

    setSuggestions((current) => {
      const oldIndex = current.findIndex((row) => row.id === active.id);
      const newIndex = current.findIndex((row) => row.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return current;

      return arrayMove(current, oldIndex, newIndex);
    });
  }

  function handlePreview() {
    const filledRows = suggestions.filter((row) => row.title.trim() !== "");
    setPreview(filledRows);
  }

  async function handleConfirm() {
    const suggestionsPayload = suggestions
      .filter((row) => row.title.trim() !== "")
      .map(({ title, description, price, label, labelColor, imageUrl }) => ({
        title,
        description,
        price,
        label,
        labelColor,
        imageUrl,
      }));

    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(suggestionsPayload),
      });

      if (!response.ok) {
        toast.error("Erreur lors de l'enregistrement");
        return;
      }

      const result = (await response.json()) as { success?: boolean };

      if (result.success === true) {
        setHasStoredSuggestions(suggestionsPayload.length > 0);
        toast.success("Suggestions enregistrées avec succès");
        return;
      }

      toast.error("Erreur lors de l'enregistrement");
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[#F7F2E7] text-[#1B1E19]">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 bg-[#1E3A2F] px-5 py-3.5 text-[#FBF8F1]">
        <div className="flex items-baseline gap-2.5">
          <span className="font-[family-name:var(--font-cormorant)] text-[22px] tracking-wide">
            Suggestions
          </span>
          <span className="text-xs tracking-wide text-[#D8B871]">espace admin</span>
        </div>
        <div className="flex items-center gap-2">
          {hasStoredSuggestions ? (
            <Button
              asChild
              variant="outline"
              className="border-[#D8B871]/70 bg-transparent text-[#FBF8F1] hover:bg-white/10 hover:text-white"
            >
              <Link href="/display">
                <Monitor className="size-4" />
                Affichage
              </Link>
            </Button>
          ) : (
            <Button
              type="button"
              disabled
              variant="outline"
              className="border-white/20 bg-transparent text-white/40"
            >
              <Monitor className="size-4" />
              Affichage
            </Button>
          )}
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

      <div className="mx-auto w-full max-w-4xl flex-1 space-y-8 p-6 sm:p-8">
        <section className="space-y-4">
          {mounted ? (
            <SortableList
              suggestions={suggestions}
              onUpdate={updateRow}
              onApplyCatalog={applyCatalogHit}
              onRemove={removeRow}
              onDragEnd={handleDragEnd}
            />
          ) : (
            <div className="space-y-4">
              {suggestions.map((row, index) => (
                <StaticRow
                  key={row.id}
                  row={row}
                  index={index}
                  canRemove={suggestions.length > 1}
                  onUpdate={updateRow}
                  onApplyCatalog={applyCatalogHit}
                  onRemove={removeRow}
                />
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#D9CFB8] bg-white px-4 py-2.5 text-[13.5px] font-semibold text-[#1B1E19] transition hover:bg-[#1E3A2F]/5"
              onClick={addRow}
            >
              <Plus className="size-4" />
              Ajouter une ligne
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#D9CFB8] bg-white px-4 py-2.5 text-[13.5px] font-semibold text-[#1B1E19] transition hover:bg-[#1E3A2F]/5"
              onClick={handlePreview}
            >
              <Eye className="size-4" />
              Prévisualiser
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#B68A3D] px-4 py-2.5 text-[13.5px] font-semibold text-[#1E3A2F] transition hover:bg-[#D8B871]"
              onClick={handleConfirm}
            >
              <Check className="size-4" />
              Confirmer
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[28px] font-semibold">
            Aperçu
          </h2>

          {preview.length === 0 ? (
            <div className="rounded-[10px] border border-dashed border-[#D9CFB8] px-8 py-10 text-center text-[#6b6a5f]">
              Cliquez sur &quot;Prévisualiser&quot; pour voir le résultat.
            </div>
          ) : (
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {preview.map((row, index) => (
                <article
                  key={`preview-${index}`}
                  className="flex flex-col overflow-hidden rounded-[10px] border border-[#D9CFB8] bg-white"
                >
                  {row.imageUrl ? (
                    <img
                      src={row.imageUrl}
                      alt=""
                      className="h-32 w-full object-cover"
                    />
                  ) : null}

                  <div className="flex flex-1 flex-col px-4 py-3.5">
                  {row.label.trim() ? (
                    <Badge
                      className={`mb-3 w-fit ${getLabelBadgeClass(row.labelColor)}`}
                    >
                      {row.label}
                    </Badge>
                  ) : null}

                  <h3 className="font-[family-name:var(--font-cormorant)] text-[19px] font-semibold leading-snug text-[#1B1E19]">
                    {row.title}
                  </h3>

                  {row.description.trim() ? (
                    <p className="mt-1.5 flex-1 text-sm leading-snug text-[#6b6a5f]">
                      {row.description}
                    </p>
                  ) : null}

                  {row.price.trim() ? (
                    <p className="mt-3 font-semibold text-[#1E3A2F]">
                      {formatPrice(row.price)}
                    </p>
                  ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGate>
      <AdminPanel />
    </AdminGate>
  );
}
