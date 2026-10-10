"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { DiscreetBackButton, isPwaStandalone } from "@/components/discreet-back-button";
import {
  MENU_FROM_APP_HREF,
  MENU_HREF,
  MenuStickyCta,
} from "@/components/menu/suggestions-cta";
import { readStoredMenuLocale } from "@/components/menu/i18n";

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

type Density = "comfortable" | "compact" | "tight";

function formatPrice(price: string): string {
  const trimmed = price.trim();
  if (!trimmed) return "";
  return trimmed.includes("€") ? trimmed : `${trimmed} €`;
}

function getDensity(count: number): Density {
  if (count >= 7) return "tight";
  if (count >= 5) return "compact";
  return "comfortable";
}

function getLabelBadgeClass(color: LabelColor = "orange"): string {
  switch (color) {
    case "red":
      return "bg-[#E53935] text-white shadow-sm shadow-red-500/25";
    case "green":
      return "bg-[#1E5C45] text-white shadow-sm shadow-emerald-800/25";
    default:
      return "bg-[#E56A45] text-white shadow-sm shadow-orange-500/25";
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
      className={`rounded-2xl border border-[#E8D9B0] border-l-[3px] border-l-[#E0B84A] bg-white shadow-[0_8px_24px_rgba(30,58,47,0.07)] ${
        isTight ? "px-3.5 py-2.5" : isCompact ? "px-4 py-3" : "px-5 py-3.5"
      }`}
    >
      <div className="flex min-w-0 items-baseline gap-2">
        <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-1">
          <h2
            className={`min-w-0 font-semibold text-[#163D2E] ${
              isTight
                ? "text-[clamp(0.8rem,1.65vh,0.95rem)]"
                : isCompact
                  ? "text-[clamp(0.85rem,1.8vh,1.02rem)]"
                  : "text-[clamp(0.92rem,1.95vh,1.12rem)]"
            }`}
          >
            {suggestion.title}
          </h2>
          {hasLabel ? (
            <span
              className={`shrink-0 rounded-full font-semibold uppercase tracking-wide ${getLabelBadgeClass(suggestion.labelColor ?? "orange")} ${
                isTight
                  ? "px-1.5 py-0.5 text-[0.55rem]"
                  : isCompact
                    ? "px-2 py-0.5 text-[0.58rem]"
                    : "px-2 py-0.5 text-[0.62rem]"
              }`}
            >
              {suggestion.label}
            </span>
          ) : null}
        </div>

        {price ? (
          <>
            <span
              className="mb-1 hidden min-w-[1.25rem] flex-1 border-b border-dotted border-[#E0B84A]/55 sm:block"
              aria-hidden
            />
            <span
              className={`shrink-0 font-semibold tabular-nums text-[#1E5C45] ${
                isTight
                  ? "text-[clamp(0.68rem,1.35vh,0.78rem)]"
                  : isCompact
                    ? "text-[clamp(0.72rem,1.45vh,0.85rem)]"
                    : "text-[clamp(0.78rem,1.55vh,0.9rem)]"
              }`}
            >
              {price}
            </span>
          </>
        ) : null}
      </div>

      {suggestion.description.trim() ? (
        <p
          className={`max-w-[95%] leading-snug text-[#6F6A5C] ${
            isTight
              ? "mt-1 text-[clamp(0.72rem,1.4vh,0.84rem)]"
              : isCompact
                ? "mt-1.5 text-[clamp(0.78rem,1.55vh,0.9rem)]"
                : "mt-1.5 text-[clamp(0.85rem,1.7vh,0.98rem)]"
          }`}
        >
          {suggestion.description}
        </p>
      ) : null}
    </article>
  );
}

export default function DisplayPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [showPwaBack, setShowPwaBack] = useState(false);
  const [fromMenu, setFromMenu] = useState(false);
  const [menuHref, setMenuHref] = useState(MENU_HREF);
  const [locale, setLocale] = useState(readStoredMenuLocale);

  useEffect(() => {
    const standalone = isPwaStandalone();
    const cameFromMenu =
      new URLSearchParams(window.location.search).get("from") === "menu";
    setShowPwaBack(standalone);
    setFromMenu(cameFromMenu);
    setMenuHref(standalone ? MENU_FROM_APP_HREF : MENU_HREF);
    setLocale(readStoredMenuLocale());
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

  const hasOverflow = loadState === "ready" && suggestions.length > MAX_DISPLAYED;
  const displayed = loadState === "ready" ? suggestions.slice(0, MAX_DISPLAYED) : [];
  const density = getDensity(displayed.length);
  const isTight = density === "tight";
  const isCompact = density === "compact" || isTight;
  const cardsGap = isTight ? "gap-1.5" : isCompact ? "gap-2" : "gap-2.5";

  return (
    <div className="relative h-dvh max-h-dvh overflow-hidden bg-[#F7F0E4] text-[#1B1E19]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 85% 50% at 50% -8%, rgba(224,184,74,0.36), transparent 55%), radial-gradient(ellipse 50% 35% at 0% 100%, rgba(30,92,69,0.12), transparent 45%), radial-gradient(ellipse 40% 30% at 100% 80%, rgba(229,106,69,0.1), transparent 45%)",
        }}
      />

      {showPwaBack ? (
        <div className="absolute left-2 top-2 z-20 sm:left-3 sm:top-3">
          <DiscreetBackButton tone="light" label="Retour" />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex h-full w-[90%] max-w-2xl flex-col py-2 sm:py-3">
        <header
          className={`shrink-0 text-center ${
            isTight ? "mb-1.5" : isCompact ? "mb-2" : "mb-3"
          }`}
        >
          <p
            className={`font-[family-name:var(--font-cormorant)] font-light tracking-[0.16em] text-[#0F4C3A] ${
              isTight
                ? "text-[clamp(1.6rem,3.6vh,2.3rem)]"
                : "text-[clamp(2rem,4.6vh,2.9rem)]"
            }`}
          >
            Felicita
          </p>
          <div className="mx-auto mt-1.5 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#E56A45] via-[#E0B84A] to-[#1E5C45]" />
          <h1
            className={`font-[family-name:var(--font-cormorant)] font-bold italic tracking-tight text-[#C4921A] ${
              isTight
                ? "mt-1.5 text-[clamp(1.05rem,2.5vh,1.35rem)]"
                : isCompact
                  ? "mt-2 text-[clamp(1.15rem,2.8vh,1.5rem)]"
                  : "mt-2 text-[clamp(1.3rem,3.2vh,1.75rem)]"
            }`}
          >
            Suggestions du jour
          </h1>
        </header>

        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {loadState === "loading" && (
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="relative size-9">
                <span className="absolute inset-0 rounded-full border border-[#D9CFB8]" />
                <span className="absolute inset-[3px] animate-spin rounded-full border-2 border-transparent border-t-[#E0B84A]" />
              </div>
              <p className="mt-4 text-center text-[clamp(0.75rem,1.5vh,0.85rem)] text-[#6F6A5C]">
                Chargement des suggestions...
              </p>
            </div>
          )}
          {loadState === "error" && (
            <p className="flex flex-1 items-center justify-center text-center text-[clamp(0.75rem,1.5vh,0.85rem)] text-[#6F6A5C]">
              Impossible de charger les suggestions.
            </p>
          )}
          {loadState === "ready" && displayed.length === 0 && (
            <p className="flex flex-1 items-center justify-center text-center text-[clamp(0.75rem,1.5vh,0.85rem)] text-[#6F6A5C]">
              Aucune suggestion pour le moment.
            </p>
          )}
          {loadState === "ready" && displayed.length > 0 && (
            <div className={`my-auto flex w-full flex-col ${cardsGap}`}>
              {displayed.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  density={density}
                />
              ))}
            </div>
          )}
        </main>

        {fromMenu ? <MenuStickyCta locale={locale} href={menuHref} /> : null}

        <footer className={`shrink-0 pt-2.5 pb-1 ${fromMenu ? "pb-16" : ""}`}>
          {hasOverflow ? (
            <p className="mb-1.5 text-center text-[clamp(0.65rem,1.25vh,0.75rem)] font-medium text-[#C4921A]">
              Autres suggestions disponibles auprès de votre serveur
            </p>
          ) : null}
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/icons/icon-192.png"
              alt="Logo Felicita"
              width={28}
              height={28}
              className="size-7 shrink-0 rounded-full object-cover ring-1 ring-black/25"
            />
            <p className="text-[clamp(0.68rem,1.3vh,0.78rem)] text-[#6F6A5C]">
              Demandez à votre serveur pour plus de détails
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
