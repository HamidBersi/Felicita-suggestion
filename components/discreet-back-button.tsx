"use client";

type DiscreetBackButtonProps = {
  label?: string;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Petite flèche retour (PWA) — history.back().
 */
export function DiscreetBackButton({
  label = "Retour",
  tone = "light",
  className = "",
}: DiscreetBackButtonProps) {
  const toneClass =
    tone === "dark"
      ? "text-white/55 hover:text-white/90"
      : "text-[#1E3A2F]/45 hover:text-[#1E3A2F]/85";

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          window.history.back();
          return;
        }
        window.location.href = "/";
      }}
      className={`inline-flex size-8 items-center justify-center rounded-full transition active:scale-95 ${toneClass} ${className}`}
      aria-label={label}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M15 6l-6 6 6 6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/** true si l’app est ouverte en PWA (pas dans le navigateur). */
export function isPwaStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}
