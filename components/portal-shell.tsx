import Link from "next/link";
import type { ReactNode } from "react";

const BACKGROUND_IMAGE =
  "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2070&q=80')";

export type PortalCardProps = {
  href: string;
  emoji: string;
  title: string;
  description: string;
  className?: string;
};

export function PortalCard({
  href,
  emoji,
  title,
  description,
  className = "",
}: PortalCardProps) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-5 rounded-3xl border border-white/15 bg-neutral-950/65 p-6 shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-200/25 hover:bg-neutral-950/80 hover:shadow-2xl hover:shadow-black/40 ${className}`}
    >
      <span
        className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl transition-colors duration-300 group-hover:border-amber-200/20 group-hover:bg-white/10"
        aria-hidden
      >
        {emoji}
      </span>

      <div className="min-w-0 flex-1 text-left">
        <p className="text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-50">
          {title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-stone-400 transition-colors duration-300 group-hover:text-stone-300">
          {description}
        </p>
      </div>

      <span
        className="shrink-0 text-xl text-stone-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-200/80"
        aria-hidden
      >
        →
      </span>
    </Link>
  );
}

type PortalShellProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
};

export function PortalShell({
  eyebrow,
  title,
  subtitle,
  children,
  backHref,
  backLabel = "Retour",
}: PortalShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: BACKGROUND_IMAGE }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
        <div className="flex flex-1 flex-col items-center justify-center">
          <header className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both text-center duration-700">
            <p className="font-[family-name:var(--font-cormorant)] text-[clamp(3rem,10vw,4.5rem)] font-light leading-none tracking-[0.18em] text-amber-100">
              {eyebrow}
            </p>
            <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />
            <p className="mt-5 font-[family-name:var(--font-cormorant)] text-xl font-normal tracking-[0.28em] text-amber-50/90 uppercase">
              {title}
            </p>
            {subtitle ? (
              <p className="mt-3 text-sm tracking-wide text-stone-400">{subtitle}</p>
            ) : null}
          </header>

          {children}
        </div>

        <footer className="animate-in fade-in fill-mode-both pt-8 text-center delay-500 duration-1000">
          {backHref ? (
            <Link
              href={backHref}
              className="text-xs tracking-[0.2em] text-stone-500 uppercase transition hover:text-amber-200/70"
            >
              {backLabel}
            </Link>
          ) : (
            <p className="text-xs tracking-[0.2em] text-stone-500 uppercase">
              La Felicita
            </p>
          )}
        </footer>
      </div>
    </main>
  );
}
