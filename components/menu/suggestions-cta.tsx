"use client";

import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

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
      className="flex items-center justify-between gap-3 rounded-2xl border border-[#D8B871] bg-[#FFFBF2] px-4 py-3 shadow-[0_6px_18px_rgba(143,106,36,0.12)] transition hover:border-[#C4921A] hover:bg-white active:scale-[0.99]"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1E3A2F] text-[#D8B871]">
          <Sparkles className="size-4" strokeWidth={2.2} aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block font-[family-name:var(--font-cormorant)] text-[18px] leading-none font-semibold text-[#1E3A2F]">
            {ui.suggestionsCardTitle}
          </span>
          <span className="mt-1.5 block text-[12.5px] leading-snug text-[#8F6A24]">
            {ui.suggestionsCardSubtitle}
          </span>
        </span>
      </span>
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D8B871] text-[#1E3A2F]"
        aria-hidden
      >
        <ChevronRight className="size-4" strokeWidth={2.5} />
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
        <ChevronRight className="size-4" strokeWidth={2.4} />
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
  if (hidden) return null;

  return (
    <StickyCtaShell>
      <Link
        href={SUGGESTIONS_DISPLAY_HREF}
        className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[#D8B871] bg-gradient-to-r from-[#1E3A2F] via-[#244A3A] to-[#8F6A24] px-4 py-3.5 shadow-[0_14px_36px_rgba(30,58,47,0.38)] transition hover:brightness-105 active:scale-[0.99]"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D8B871] text-[#1E3A2F] shadow-[0_0_0_4px_rgba(216,184,113,0.28)]">
            <Sparkles className="size-5" strokeWidth={2.2} aria-hidden />
          </span>
          <span className="min-w-0 text-left">
            <span className="block font-[family-name:var(--font-cormorant)] text-[19px] leading-none font-semibold text-[#FBF8F1]">
              {ui.suggestionsCardTitle}
            </span>
            <span className="mt-1.5 block text-[12.5px] leading-snug text-[#F4EBD8]">
              {ui.suggestionsCta}
            </span>
          </span>
        </span>
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FBF8F1] text-[#1E3A2F]"
          aria-hidden
        >
          <ChevronRight className="size-5" strokeWidth={2.5} />
        </span>
      </Link>
    </StickyCtaShell>
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
  if (hidden) return null;

  return (
    <StickyCtaShell>
      <Link
        href={href}
        className="flex items-center justify-center gap-2.5 rounded-2xl border-2 border-[#D8B871] bg-gradient-to-r from-[#1E3A2F] via-[#244A3A] to-[#8F6A24] px-5 py-3.5 text-[15px] font-semibold text-[#FBF8F1] shadow-[0_14px_36px_rgba(30,58,47,0.38)] transition hover:brightness-105 active:scale-[0.99]"
      >
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FBF8F1] text-[#1E3A2F]"
          aria-hidden
        >
          <ChevronRight className="size-4 rotate-180" strokeWidth={2.5} />
        </span>
        {ui.menuCta}
      </Link>
    </StickyCtaShell>
  );
}

function StickyCtaShell({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="bg-gradient-to-t from-[#F4F1EA] from-40% via-[#F4F1EA]/90 to-transparent pt-10">
        <div className="mx-auto flex w-full max-w-2xl justify-center px-4 pb-[max(1.6rem,calc(env(safe-area-inset-bottom)+0.95rem))]">
          <div className="pointer-events-auto w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
