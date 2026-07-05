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
import { Check, ChevronDown, Eye, GripVertical, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  saveSuggestions,
  loadSuggestions,
  type LabelColor,
  type Suggestion,
} from "@/lib/suggestions-storage";

type SuggestionRow = {
  id: string;
  title: string;
  description: string;
  price: string;
  label: string;
  labelColor: LabelColor;
};

function createInitialRow(): SuggestionRow {
  return {
    id: "row-0",
    title: "",
    description: "",
    price: "",
    label: "",
    labelColor: "orange",
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
  };
}

// Crée un id uniquement au chargement si l'item n'en a pas déjà un
function storedToRow(stored: Suggestion): SuggestionRow {
  return {
    id: stored.id ?? crypto.randomUUID(),
    title: stored.title,
    description: stored.description,
    price: stored.price,
    label: stored.label,
    labelColor: stored.labelColor ?? "orange",
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
        className="flex h-10 items-center gap-1.5 rounded-r-lg border border-sky-200/70 border-l-0 bg-sky-50/80 px-3 transition-colors hover:bg-sky-100/80"
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
  "text-xs font-bold uppercase tracking-[0.14em] text-stone-900";

const inputClass =
  "h-10 border-sky-200/70 bg-sky-50/80 focus-visible:border-sky-300 focus-visible:ring-sky-200/50";

const cardHeaderClass =
  "flex w-full flex-row items-center justify-between rounded-t-2xl border-b border-sky-200 bg-sky-100/95 px-5 py-4";

type RowCardProps = {
  row: SuggestionRow;
  index: number;
  canRemove: boolean;
  onUpdate: (id: string, field: keyof SuggestionRow, value: string) => void;
  onRemove: (id: string) => void;
  dragHandle?: React.ReactNode;
};

function RowCard({
  row,
  index,
  canRemove,
  onUpdate,
  onRemove,
  dragHandle,
}: RowCardProps) {
  return (
    <Card className="gap-0 overflow-visible rounded-2xl border-stone-200/80 bg-white p-0 shadow-sm ring-1 ring-stone-900/5 transition-shadow hover:shadow-md">
      <CardHeader className={`${cardHeaderClass} overflow-hidden`}>
        <div className="flex items-center gap-2.5">
          {dragHandle ?? (
            <span className="rounded-lg border border-sky-200/70 bg-white p-1.5 text-sky-400 shadow-sm">
              <GripVertical className="size-4" />
            </span>
          )}
          <CardTitle className="text-xl font-bold tracking-tight text-stone-900">
            Suggestion {index + 1}
          </CardTitle>
        </div>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => onRemove(row.id)}
          disabled={!canRemove}
        >
          Supprimer
        </Button>
      </CardHeader>

      <CardContent className="relative space-y-4 overflow-visible px-5 py-4">
        <div className="space-y-1.5">
          <label htmlFor={`title-${index}`} className={fieldLabelClass}>
            Titre
          </label>
          <Input
            id={`title-${index}`}
            className={inputClass}
            placeholder="Ex : Risotto aux truffes"
            value={row.title}
            onChange={(e) => onUpdate(row.id, "title", e.target.value)}
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
              <span className="font-normal normal-case tracking-normal text-sky-500/80">
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
            className="cursor-grab touch-none rounded-lg border border-sky-200/70 bg-white p-1.5 text-sky-400 shadow-sm hover:border-sky-300 hover:text-sky-600 active:cursor-grabbing"
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
  onRemove: (id: string) => void;
  onDragEnd: (event: DragEndEvent) => void;
};

function SortableList({
  suggestions,
  onUpdate,
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
              onRemove={onRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default function AdminPage() {
  const [suggestions, setSuggestions] = useState<SuggestionRow[]>([
    createInitialRow(),
  ]);
  const [preview, setPreview] = useState<SuggestionRow[]>([]);
  const [savedMessage, setSavedMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  // Charge localStorage puis active le drag and drop côté client
  useEffect(() => {
    const stored = loadSuggestions();
    if (stored) {
      setSuggestions(stored.map(storedToRow));
    }
    setMounted(true);
  }, []);

  function updateRow(id: string, field: keyof SuggestionRow, value: string) {
    setSuggestions((current) =>
      current.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
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

  function handleConfirm() {
    const suggestionsToSave = suggestions
      .filter((row) => row.title.trim() !== "")
      .map(({ id, title, description, price, label, labelColor }) => ({
        id,
        title,
        description,
        price,
        label,
        labelColor,
      }));

    saveSuggestions(suggestionsToSave);
    console.log("Suggestions sauvegardées :", suggestionsToSave);
    setSavedMessage("Suggestions enregistrées");
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-stone-100 to-stone-50 px-6 py-10 font-sans tracking-tight antialiased">
      <div className="mx-auto max-w-4xl space-y-8">
        <header>
          <Link
            href="/display"
            className="text-sm text-stone-500 underline-offset-4 hover:text-stone-800 hover:underline"
          >
            Voir l&apos;affichage
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-stone-900">
            Administration
          </h1>
          <p className="mt-2 text-stone-600">
            Gérez les suggestions affichées au restaurant.
          </p>
        </header>

        {/* Formulaire */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-800">Formulaire</h2>

          {mounted ? (
            <SortableList
              suggestions={suggestions}
              onUpdate={updateRow}
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
                  onRemove={removeRow}
                />
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-sky-100 bg-sky-50/50 p-3">
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-full border-sky-200 bg-white px-5 font-semibold text-sky-900 shadow-sm hover:border-sky-300 hover:bg-sky-50"
              onClick={addRow}
            >
              <Plus className="size-4" />
              Ajouter une ligne
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="h-10 rounded-full bg-white px-5 font-semibold text-sky-800 shadow-sm ring-1 ring-sky-200 hover:bg-sky-50"
              onClick={handlePreview}
            >
              <Eye className="size-4" />
              Prévisualiser
            </Button>
            <Button
              type="button"
              className="h-10 rounded-full bg-sky-600 px-6 font-semibold text-white shadow-md hover:bg-sky-700"
              onClick={handleConfirm}
            >
              <Check className="size-4" />
              Confirmer
            </Button>
            {savedMessage && (
              <p className="text-sm font-medium text-green-700">
                {savedMessage}
              </p>
            )}
          </div>
        </section>

        {/* Aperçu */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-800">Aperçu</h2>

          {preview.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-10 text-center text-stone-500">
                Cliquez sur &quot;Prévisualiser&quot; pour voir le résultat.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {preview.map((row, index) => (
                <Card
                  key={`preview-${index}`}
                  className="flex flex-col bg-gradient-to-br from-stone-900 to-stone-800 text-white ring-white/10"
                >
                  <CardContent className="flex flex-1 flex-col pt-6">
                    {row.label.trim() && (
                      <Badge
                        className={`mb-4 w-fit ${getLabelBadgeClass(row.labelColor)}`}
                      >
                        {row.label}
                      </Badge>
                    )}

                    <h3 className="text-xl font-bold">{row.title}</h3>

                    {row.description.trim() && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-300">
                        {row.description}
                      </p>
                    )}

                    {row.price.trim() && (
                      <p className="mt-4 text-2xl font-bold text-amber-400">
                        {formatPrice(row.price)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
