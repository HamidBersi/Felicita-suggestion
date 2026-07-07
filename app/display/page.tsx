"use client";

import Image from "next/image";
import { Wheat } from "lucide-react";
import { useEffect, useState } from "react";
import {
  defaultSuggestions,
  loadSuggestions,
  type LabelColor,
  type Suggestion,
} from "@/lib/suggestions-storage";

const MAX_DISPLAYED = 8;

// Image de fond restaurant (cover, center)
const BACKGROUND_IMAGE =
  "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2070&q=80')";

type Density = "comfortable" | "compact" | "tight";

// Ajoute € automatiquement si le symbole est absent
function formatPrice(price: string): string {
  const trimmed = price.trim();
  if (!trimmed) return "";
  return trimmed.includes("€") ? trimmed : `${trimmed} €`;
}

// Compresse l'affichage selon le nombre de suggestions
function getDensity(count: number): Density {
  if (count >= 7) return "tight";
  if (count >= 5) return "compact";
  return "comfortable";
}

function getLabelBadgeClass(color: LabelColor = "orange"): string {
  switch (color) {
    case "red":
      return "bg-red-600 text-white";
    case "green":
      return "bg-green-600 text-white";
    default:
      return "bg-orange-500 text-black";
  }
}

type SuggestionCardProps = {
  suggestion: Suggestion;
  density: Density;
};

function SuggestionCard({ suggestion, density }: SuggestionCardProps) {
  const price = formatPrice(suggestion.price);
  const hasLabel = suggestion.label.trim() !== "";
  const isTight = density === "tight";
  const isCompact = density === "compact" || isTight;

  return (
    <article
      className={`flex min-h-0 flex-1 flex-row items-center overflow-hidden rounded-3xl border border-white/15 bg-neutral-950/65 shadow-lg backdrop-blur-md ${
        isTight ? "gap-2 p-2.5" : isCompact ? "gap-2.5 p-3" : "gap-3 p-4"
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {hasLabel && (
          <span
            className={`inline-block w-fit shrink-0 rounded-full font-semibold uppercase tracking-wide ${getLabelBadgeClass(suggestion.labelColor ?? "orange")} ${
              isTight
                ? "mb-1 px-1.5 py-0.5 text-[0.55rem]"
                : isCompact
                  ? "mb-1 px-2 py-0.5 text-[0.6rem]"
                  : "mb-1.5 px-2.5 py-0.5 text-[0.65rem]"
            }`}
          >
            {suggestion.label}
          </span>
        )}
        <h2
          className={`shrink-0 font-bold leading-tight text-white ${
            isTight
              ? "text-[clamp(0.72rem,1.5vh,0.85rem)]"
              : isCompact
                ? "text-[clamp(0.78rem,1.65vh,0.9rem)]"
                : "text-[clamp(0.9rem,2vh,1.1rem)]"
          }`}
        >
          {suggestion.title}
        </h2>
        {suggestion.description.trim() && (
          <p
            className={`overflow-hidden leading-snug text-stone-300 line-clamp-2 ${
              isTight
                ? "mt-0 text-[clamp(0.6rem,1.2vh,0.7rem)]"
                : isCompact
                  ? "mt-0.5 text-[clamp(0.65rem,1.35vh,0.75rem)]"
                  : "mt-0.5 text-[clamp(0.72rem,1.6vh,0.85rem)]"
            }`}
          >
            {suggestion.description}
          </p>
        )}
      </div>
      {price && (
        <p
          className={`shrink-0 self-center text-right font-bold text-amber-400 ${
            isTight
              ? "text-[clamp(0.7rem,1.6vh,0.88rem)]"
              : isCompact
                ? "text-[clamp(0.75rem,1.75vh,0.95rem)]"
                : "text-[clamp(0.9rem,2.1vh,1.15rem)]"
          }`}
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
  const density = getDensity(displayed.length);
  const isTight = density === "tight";
  const isCompact = density === "compact" || isTight;

  return (
    <div className="relative h-dvh max-h-dvh overflow-hidden text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: BACKGROUND_IMAGE }}
      />
      {/* Overlay sombre pour la lisibilité */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto flex h-full max-w-md flex-col px-6 py-4">
        {/* Header */}
        <header
          className={`shrink-0 text-center ${
            isTight ? "mb-3" : isCompact ? "mb-4" : "mb-5"
          }`}
        >
          <p
            className={`bg-gradient-to-r from-green-500 via-white to-red-600 bg-clip-text font-[family-name:var(--font-cormorant)] font-light tracking-[0.22em] text-transparent ${
              isTight
                ? "text-[clamp(1.3rem,3vh,1.9rem)]"
                : "text-[clamp(1.6rem,3.8vh,2.4rem)]"
            }`}
          >
            Felicita
          </p>
          {/* Ligne décorative tricolore */}
          <div className="mx-auto mt-1.5 h-0.5 w-20 bg-gradient-to-r from-green-600 via-white to-red-600" />
          <h1
            className={`font-bold tracking-tight text-white ${
              isTight
                ? "mt-2 text-[clamp(1rem,2.4vh,1.25rem)]"
                : isCompact
                  ? "mt-2.5 text-[clamp(1.1rem,2.8vh,1.4rem)]"
                  : "mt-3 text-[clamp(1.35rem,3.2vh,1.75rem)]"
            }`}
          >
            Suggestions du jour
          </h1>
          <Wheat
            className={`mx-auto text-amber-400/50 ${
              isTight ? "mt-1 size-3.5" : isCompact ? "mt-1.5 size-4" : "mt-2 size-5"
            }`}
            aria-hidden
          />
        </header>

        {/* Cards */}
        <main
          className={`flex min-h-0 flex-1 flex-col ${
            isTight ? "gap-1.5" : isCompact ? "gap-2" : "gap-3"
          }`}
        >
          {displayed.map((suggestion, index) => (
            <SuggestionCard
              key={`${suggestion.title}-${index}`}
              suggestion={suggestion}
              density={density}
            />
          ))}
        </main>

        {/* Footer */}
        <footer className="shrink-0 pt-2">
          {hasOverflow && (
            <p className="mb-1 text-center text-[clamp(0.6rem,1.2vh,0.7rem)] text-amber-200/50">
              Autres suggestions disponibles auprès de votre serveur
            </p>
          )}
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/images/logo.webp"
              alt="Logo Felicita"
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-full object-cover"
            />
            <p className="text-[clamp(0.65rem,1.3vh,0.75rem)] text-amber-200/70">
              Demandez à votre serveur pour plus de détails
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
