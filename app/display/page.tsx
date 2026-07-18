"use client";

import Image from "next/image";
import { Wheat } from "lucide-react";
import { useEffect, useState } from "react";

const MAX_DISPLAYED = 8;

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
};

type Suggestion = {
  id: string;
  title: string;
  description: string;
  price: string;
  label: string;
  labelColor?: LabelColor;
};

type LoadState = "loading" | "error" | "ready";

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

function isLabelColor(color: string): color is LabelColor {
  return color === "orange" || color === "red" || color === "green";
}

function apiToSuggestion(stored: ApiSuggestion): Suggestion {
  return {
    id: stored.id,
    title: stored.title,
    description: stored.description ?? "",
    price: stored.price,
    label: stored.label ?? "",
    labelColor: isLabelColor(stored.labelColor) ? stored.labelColor : "orange",
  };
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
      className={`relative shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/65 shadow-lg backdrop-blur-md ${
        isTight ? "px-2.5 py-2" : isCompact ? "px-2.5 py-2.5" : "px-3 py-2.5"
      }`}
    >
      {hasLabel ? (
        <span
          className={`absolute right-3 top-2.5 z-10 rounded-full font-semibold uppercase tracking-wide ${getLabelBadgeClass(suggestion.labelColor ?? "orange")} ${
            isTight
              ? "px-2 py-0.5 text-[0.58rem]"
              : isCompact
                ? "px-2 py-0.5 text-[0.62rem]"
                : "px-2.5 py-0.5 text-[0.68rem]"
          }`}
        >
          {suggestion.label}
        </span>
      ) : null}

      {price ? (
        <p
          className={`absolute bottom-2.5 right-3 z-10 text-right font-medium text-amber-400/90 ${
            isTight
              ? "text-[clamp(0.65rem,1.3vh,0.75rem)]"
              : isCompact
                ? "text-[clamp(0.7rem,1.4vh,0.8rem)]"
                : "text-[clamp(0.75rem,1.55vh,0.88rem)]"
          }`}
        >
          {price}
        </p>
      ) : null}

      <div
        className={`min-w-0 ${hasLabel || price ? "pr-[4.5rem]" : ""} ${
          price ? "pb-5" : ""
        }`}
      >
        <h2
          className={`shrink-0 font-bold leading-tight text-stone-50 ${
            isTight
              ? "text-[clamp(0.8rem,1.7vh,0.95rem)]"
              : isCompact
                ? "text-[clamp(0.88rem,1.85vh,1.05rem)]"
                : "text-[clamp(1rem,2.2vh,1.2rem)]"
          }`}
        >
          {suggestion.title}
        </h2>
        {suggestion.description.trim() && (
          <p
            className={`mb-1 leading-snug text-stone-300 ${
              isTight
                ? "mt-1 text-[clamp(0.68rem,1.35vh,0.78rem)]"
                : isCompact
                  ? "mt-1.5 text-[clamp(0.72rem,1.5vh,0.84rem)]"
                  : "mt-1.5 text-[clamp(0.8rem,1.75vh,0.95rem)]"
            }`}
          >
            {suggestion.description}
          </p>
        )}
      </div>
    </article>
  );
}

export default function DisplayPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [showVitrineBack, setShowVitrineBack] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromVitrine = params.get("from") === "vitrine";
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as Navigator & { standalone?: boolean }).standalone === true);

    // Bouton Retour : lien vitrine uniquement (pas en mode PWA tablette)
    setShowVitrineBack(fromVitrine && !isStandalone);
  }, []);

  useEffect(() => {
    async function loadSuggestionsFromApi() {
      try {
        const response = await fetch("/api/suggestions");

        if (!response.ok) {
          setLoadState("error");
          return;
        }

        const data = (await response.json()) as ApiSuggestion[];
        setSuggestions(data.map(apiToSuggestion));
        setLoadState("ready");
      } catch {
        setLoadState("error");
      }
    }

    void loadSuggestionsFromApi();
  }, []);

  function handleVitrineBack() {
    const vitrineUrl = process.env.NEXT_PUBLIC_VITRINE_URL?.trim();
    if (vitrineUrl) {
      window.location.href = vitrineUrl;
      return;
    }
    window.history.back();
  }

  const hasOverflow = loadState === "ready" && suggestions.length > MAX_DISPLAYED;
  const displayed = loadState === "ready" ? suggestions.slice(0, MAX_DISPLAYED) : [];
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

      {showVitrineBack ? (
        <button
          type="button"
          onClick={handleVitrineBack}
          className="absolute left-4 top-4 z-20 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-black/70"
        >
          ← Retour
        </button>
      ) : null}

      <div className="relative z-10 mx-auto flex h-full w-[88%] max-w-2xl flex-col py-1">
        {/* Header */}
        <header
          className={`shrink-0 text-center ${
            isTight ? "mb-1" : isCompact ? "mb-1.5" : "mb-2"
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
          <div className="mx-auto mt-0.5 h-0.5 w-16 bg-gradient-to-r from-green-600 via-white to-red-600" />
          <h1
            className={`font-bold tracking-tight text-white ${
              isTight
                ? "mt-1 text-[clamp(1rem,2.4vh,1.25rem)]"
                : isCompact
                  ? "mt-1 text-[clamp(1.1rem,2.8vh,1.4rem)]"
                  : "mt-1.5 text-[clamp(1.35rem,3.2vh,1.75rem)]"
            }`}
          >
            Suggestions du jour
          </h1>
          <Wheat
            className={`mx-auto text-amber-400/50 ${
              isTight ? "mt-0.5 size-3" : isCompact ? "mt-1 size-3.5" : "mt-1 size-4"
            }`}
            aria-hidden
          />
        </header>

        {/* Cards */}
        <main
          className={`flex min-h-0 flex-1 flex-col overflow-y-auto ${
            isTight ? "gap-1" : isCompact ? "gap-1" : "gap-1.5"
          }`}
        >
          {loadState === "loading" && (
            <p className="flex flex-1 items-center justify-center text-center text-[clamp(0.75rem,1.5vh,0.85rem)] text-stone-400">
              Chargement des suggestions...
            </p>
          )}
          {loadState === "error" && (
            <p className="flex flex-1 items-center justify-center text-center text-[clamp(0.75rem,1.5vh,0.85rem)] text-stone-400">
              Impossible de charger les suggestions.
            </p>
          )}
          {loadState === "ready" && displayed.length === 0 && (
            <p className="flex flex-1 items-center justify-center text-center text-[clamp(0.75rem,1.5vh,0.85rem)] text-stone-400">
              Aucune suggestion pour le moment.
            </p>
          )}
          {loadState === "ready" &&
            displayed.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
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
