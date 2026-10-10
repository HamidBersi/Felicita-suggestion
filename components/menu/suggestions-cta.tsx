"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { tUi, type MenuLocale } from "@/components/menu/i18n";

export const SUGGESTIONS_DISPLAY_HREF = "/display?from=menu";

const FISH_CATEGORY = "Nos poissons";
const FISH_ITEM_NAME = "Poissons du jour";

export function isFishCategory(name: string): boolean {
  return name === FISH_CATEGORY;
}

export function isFishOfTheDay(name: string): boolean {
  return name === FISH_ITEM_NAME;
}

/** Retire la phrase « consultez le tableau… », garde les accompagnements. */
export function fishDescriptionWithoutBoardHint(
  description: string | null | undefined,
): string | null {
  if (!description?.trim()) return null;
  const cleaned = description
    .replace(
      /Merci de consulter le tableau de suggestions ou notre service en salle\.\s*/i,
      "",
    )
    .replace(
      /Please check the specials board or ask our team\.\s*/i,
      "",
    )
    .replace(
      /Bitte schauen Sie auf die Empfehlungstafel oder fragen Sie unser Team\.\s*/i,
      "",
    )
    .replace(
      /Consultate il tabellone dei suggerimenti o il nostro servizio in sala\.\s*/i,
      "",
    )
    .trim();
  return cleaned || null;
}

export function SuggestionsFilterHint({ locale }: { locale: MenuLocale }) {
  const ui = tUi(locale);
  return (
    <div className="mt-2.5 flex justify-end">
      <Link
        href={SUGGESTIONS_DISPLAY_HREF}
        className="text-[12.5px] font-medium text-[#8F6A24] underline-offset-2 transition hover:text-[#1E3A2F] hover:underline"
      >
        {ui.suggestionsHint}
      </Link>
    </div>
  );
}

export function SuggestionsTopBanner({ locale }: { locale: MenuLocale }) {
  const ui = tUi(locale);
  return (
    <Link
      href={SUGGESTIONS_DISPLAY_HREF}
      className="flex items-center justify-between gap-3 rounded-xl border border-[#E4DFD4] bg-white/70 px-4 py-3 transition hover:border-[#D8B871] hover:bg-white"
    >
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-cormorant)] text-[18px] leading-none font-semibold text-[#1E3A2F]">
          {ui.suggestionsCardTitle}
        </p>
        <p className="mt-1 text-[12.5px] text-[#8a8578]">{ui.suggestionsCardSubtitle}</p>
      </div>
      <span className="shrink-0 text-[#8F6A24]" aria-hidden>
        <ChevronIcon />
      </span>
    </Link>
  );
}

export function SuggestionsFishCard({ locale }: { locale: MenuLocale }) {
  const ui = tUi(locale);
  return (
    <Link
      href={SUGGESTIONS_DISPLAY_HREF}
      className="flex items-center justify-between gap-3 rounded-xl border border-[#D8B871] bg-gradient-to-br from-[#1E3A2F] via-[#244A3A] to-[#8F6A24] px-4 py-4 shadow-[0_8px_24px_rgba(30,58,47,0.18)] transition hover:brightness-105"
    >
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-cormorant)] text-[21px] leading-none font-semibold text-[#FBF8F1]">
          {ui.suggestionsCardTitle}
        </p>
        <p className="mt-1.5 text-[13px] text-[#F4EBD8]/90">{ui.suggestionsCardSubtitle}</p>
      </div>
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D8B871] text-[#1E3A2F]"
        aria-hidden
      >
        <ChevronIcon />
      </span>
    </Link>
  );
}

export const MENU_HREF = "/menu";
export const MENU_FROM_APP_HREF = "/menu?from=app";

export function SuggestionsStickyCta({
  locale,
  hidden = false,
}: {
  locale: MenuLocale;
  hidden?: boolean;
}) {
  const ui = tUi(locale);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      const goingDown = y > lastY;
      setVisible(y < 48 || !goingDown);
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1.35rem,calc(env(safe-area-inset-bottom)+0.75rem))] transition duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"
      }`}
    >
      <div className="pointer-events-auto w-full max-w-2xl">
        <Link
          href={SUGGESTIONS_DISPLAY_HREF}
          className="mx-auto flex w-[min(100%,22rem)] items-center justify-center gap-1.5 rounded-full border border-[#D8B871]/50 bg-gradient-to-br from-[#1E3A2F] via-[#244A3A] to-[#8F6A24] px-5 py-3 text-center text-[13.5px] font-semibold text-[#FBF8F1] shadow-[0_8px_22px_rgba(30,58,47,0.22)] transition hover:brightness-105"
        >
          {ui.suggestionsCta}
          <span aria-hidden className="text-[#D8B871]">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

export function MenuStickyCta({
  locale,
  hidden = false,
  href = MENU_HREF,
}: {
  locale: MenuLocale;
  hidden?: boolean;
  href?: string;
}) {
  const ui = tUi(locale);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      const goingDown = y > lastY;
      setVisible(y < 48 || !goingDown);
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1.35rem,calc(env(safe-area-inset-bottom)+0.75rem))] transition duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"
      }`}
    >
      <div className="pointer-events-auto w-full max-w-2xl">
        <Link
          href={href}
          className="mx-auto flex w-[min(100%,22rem)] items-center justify-center gap-1.5 rounded-full border border-[#D8B871]/50 bg-gradient-to-br from-[#1E3A2F] via-[#244A3A] to-[#8F6A24] px-5 py-3 text-center text-[13.5px] font-semibold text-[#FBF8F1] shadow-[0_8px_22px_rgba(30,58,47,0.22)] transition hover:brightness-105"
        >
          <span aria-hidden className="text-[#D8B871]">
            ←
          </span>
          {ui.menuCta}
        </Link>
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
