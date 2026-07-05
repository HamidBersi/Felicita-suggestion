"use client";

import { useEffect, useState } from "react";
import {
  defaultSuggestions,
  loadSuggestions,
  type LabelColor,
  type Suggestion,
} from "@/lib/suggestions-storage";

type LayoutMode = "large" | "medium" | "compact";

const MAX_DISPLAYED = 8;

// Ajoute € automatiquement si le symbole est absent
function formatPrice(price: string): string {
  const trimmed = price.trim();
  if (!trimmed) return "";
  return trimmed.includes("€") ? trimmed : `${trimmed} €`;
}

// Choisit le mode d'affichage selon le nombre de suggestions visibles
function getLayoutMode(count: number): LayoutMode {
  if (count <= 4) return "large";
  if (count <= 6) return "medium";
  return "compact";
}

function getLabelBadgeClass(color: LabelColor = "orange"): string {
  switch (color) {
    case "red":
      return "bg-red-600 text-white";
    case "green":
      return "bg-green-600 text-white";
    default:
      return "bg-orange-500 text-stone-950";
  }
}

type SuggestionCardProps = {
  suggestion: Suggestion;
  mode: LayoutMode;
};

function SuggestionCard({ suggestion, mode }: SuggestionCardProps) {
  const price = formatPrice(suggestion.price);
  const hasLabel = suggestion.label.trim() !== "";

  const styles = {
    large: {
      article: "rounded-2xl p-4 gap-4",
      label: "px-3 py-0.5 text-[clamp(0.625rem,1.4vh,0.75rem)] mb-2",
      title: "text-[clamp(1rem,2.8vh,1.5rem)]",
      description: "text-[clamp(0.75rem,1.8vh,0.95rem)] line-clamp-3",
      price: "text-[clamp(0.95rem,2.5vh,1.45rem)]",
    },
    medium: {
      article: "rounded-xl p-3 gap-3",
      label: "px-2.5 py-0.5 text-[0.65rem] mb-1.5",
      title: "text-[clamp(0.85rem,2vh,1.15rem)]",
      description: "text-[clamp(0.7rem,1.5vh,0.85rem)] line-clamp-2",
      price: "text-[clamp(0.8rem,2vh,1.05rem)]",
    },
    compact: {
      article: "rounded-xl p-2.5 gap-2",
      label: "px-2 py-0.5 text-[0.6rem] mb-1",
      title: "text-[clamp(0.75rem,1.6vh,0.95rem)] truncate",
      description: "text-[clamp(0.625rem,1.3vh,0.75rem)] line-clamp-1",
      price: "text-[clamp(0.65rem,1.5vh,0.85rem)]",
    },
  }[mode];

  return (
    <article
      className={`flex min-h-0 flex-1 flex-row overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm ${styles.article}`}
    >
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {hasLabel && (
          <span
            className={`inline-block w-fit shrink-0 rounded-full font-semibold uppercase tracking-wide ${getLabelBadgeClass(suggestion.labelColor ?? "orange")} ${styles.label}`}
          >
            {suggestion.label}
          </span>
        )}
        <h2 className={`shrink-0 font-bold leading-tight ${styles.title}`}>
          {suggestion.title}
        </h2>
        {suggestion.description.trim() && (
          <p
            className={`mt-0.5 min-h-0 overflow-hidden leading-snug text-stone-300 ${styles.description}`}
          >
            {suggestion.description}
          </p>
        )}
      </div>
      {price && (
        <p
          className={`shrink-0 self-center text-right font-bold text-amber-400 ${styles.price}`}
        >
          {price}
        </p>
      )}
    </article>
  );
}

export default function DisplayPage() {
  const [suggestions, setSuggestions] =
    useState<Suggestion[]>(defaultSuggestions);

  useEffect(() => {
    const stored = loadSuggestions();
    if (stored) {
      setSuggestions(stored);
    }
  }, []);

  const hasOverflow = suggestions.length > MAX_DISPLAYED;
  const displayed = suggestions.slice(0, MAX_DISPLAYED);
  const layoutMode = getLayoutMode(displayed.length);

  return (
    <div className="relative flex h-dvh max-h-dvh flex-col overflow-hidden px-5 py-4 text-white">
      <div className="pointer-events-none absolute inset-0 bg-zinc-950" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-900 via-neutral-950 to-black" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_-15%,rgba(251,191,36,0.18),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_100%_100%,rgba(180,83,9,0.1),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_0%_80%,rgba(255,255,255,0.04),transparent)]" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
      <header className="shrink-0 text-center">
        <p className="bg-gradient-to-r from-white via-stone-100 to-amber-200/90 bg-clip-text font-[family-name:var(--font-cormorant)] text-[clamp(1.5rem,3.5vh,2.25rem)] font-light tracking-[0.2em] text-transparent">
          Felicita
        </p>
        <h1
          className={`mt-1 font-bold tracking-tight ${
            layoutMode === "compact"
              ? "text-[clamp(1rem,2.6vh,1.35rem)]"
              : "text-[clamp(1.3rem,3.4vh,1.9rem)]"
          }`}
        >
          Suggestions du jour
        </h1>
      </header>

      <main
        className={`flex min-h-0 flex-1 flex-col py-3 ${
          layoutMode === "large" ? "gap-3" : "gap-2"
        }`}
      >
        {displayed.map((suggestion, index) => (
          <SuggestionCard
            key={`${suggestion.title}-${index}`}
            suggestion={suggestion}
            mode={layoutMode}
          />
        ))}
      </main>

      <footer className="shrink-0 space-y-1 pt-1 text-center">
        {hasOverflow && (
          <p className="text-[clamp(0.6rem,1.2vh,0.7rem)] text-stone-500">
            Autres suggestions disponibles auprès de votre serveur
          </p>
        )}
        <p className="text-[clamp(0.625rem,1.4vh,0.75rem)] text-stone-500">
          Demandez à votre serveur pour plus de détails
        </p>
      </footer>
      </div>
    </div>
  );
}
