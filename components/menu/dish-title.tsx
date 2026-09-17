"use client";

import { normalizeDishEmoji } from "@/lib/dish-emoji";

const box =
  "dish-mark inline-block size-[1em] shrink-0 align-[-0.12em] [print-color-adjust:exact] [-webkit-print-color-adjust:exact]";

function markClass(className?: string) {
  return className ? `${box} ${className}` : box;
}

function ChiliMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={markClass(className)} aria-hidden>
      <path
        fill="#2F8A32"
        d="M20.6 1.6c.15 2.6-.4 4.8-1.6 6.2 1.2-.35 2.5-.4 3.7.15-1.15.35-2.2.95-2.95 1.8-.55-2.5-.35-5.3.85-8.15Z"
      />
      <path
        fill="#3FA046"
        d="M18.4 8.4c1.8-1.1 3.7-1.35 5.4-.55-.35 1.35-1.25 2.2-2.5 2.65-1.05.15-2.15.05-3.15-.35.05-.6.15-1.15.25-1.75Z"
      />
      <path
        fill="#24803A"
        d="M24.2 8.15c1.35.35 2.25 1.25 2.55 2.35-1.2.55-2.4.55-3.45.1.1-.9.3-1.7.9-2.45Z"
      />
      <path
        fill="#E11D2E"
        d="M20.4 10.6c4.6.35 8.1 3.9 8.05 8.35 0 3.7-2.55 7.15-7.4 9.35C15.7 31.1 9.6 31.6 5.35 29.4c-1.15-.6-1.35-1.85-.35-2.45 3.7 1.55 9.05.7 12.7-2.15 3.4-2.65 5-6.05 4.85-9.15-.1-1.85-1.05-3.55-2.15-5.05Z"
      />
      <path
        fill="#FF8A7A"
        d="M22.15 13.1c2.35 1.15 3.7 3.55 3.55 6.05-1.45-2.05-3.55-3.85-5.9-5.15.7-.4 1.5-.7 2.35-.9Z"
      />
    </svg>
  );
}

function BioMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={markClass(className)} aria-hidden>
      <circle cx="16" cy="16" r="14.2" fill="#1F6B32" />
      <circle cx="16" cy="16" r="12.4" fill="#3DAA45" />
      <path
        fill="#F4FFE4"
        d="M11.6 22.2c4.2-2.2 7.6-6.8 9.6-12.6.4 6.2-1.2 11-4.8 14.2-1.6 1.4-3.4 1.8-4.8-1.6Z"
      />
      <path
        fill="none"
        stroke="#145226"
        strokeWidth="1.35"
        strokeLinecap="round"
        d="M12.2 21.6C15.4 17.2 19 11.4 22.8 7.2"
      />
    </svg>
  );
}

function VegMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={markClass(className)} aria-hidden>
      <path fill="#2F8A32" d="M16 12.5C13.2 6.2 9.4 3.2 6.4 2.8c2.4 2.8 3.8 6 4.6 9.7Z" />
      <path fill="#4CB050" d="M16 12.5C16.4 5.6 18.2 2.4 20.6 1.6c-.2 3.4-1.6 7-4.6 10.9Z" />
      <path fill="#3FA046" d="M16 12.5C19.6 7.2 24.4 4.4 28 4.8c-2.8 2.4-5.4 5.4-7.4 8.8Z" />
      <path
        fill="#F06B00"
        d="M12.4 12.6c3.6-.8 7.6-.8 11.2 0 1 .2 1.4 1.4 1 2.4-1.6 4.2-4 10-6.4 14.4-.4.8-1.6.8-2 0-2.4-4.4-4.8-10.2-6.4-14.4-.4-1 0-2.2 1-2.4Z"
      />
      <path
        fill="#FFE0B0"
        d="M16.8 14c1.6.1 2.2 1 1.8 2.2-1 3.6-2.4 8-3.8 11.8-.2.6-.8.4-.9-.2-1.2-3.8-2.2-8-2.6-11.4-.2-1.2.8-2 2-2.2 1.2-.2 2.4-.3 3.5-.2Z"
      />
    </svg>
  );
}

function VeganMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={markClass(className)} aria-hidden>
      <path
        fill="none"
        stroke="#2F6F24"
        strokeWidth="2.1"
        strokeLinecap="round"
        d="M16 28.4V14.2"
      />
      <path
        fill="#3DAA45"
        d="M15.4 15.2C8.2 15.6 4.4 10.8 4.8 6.2 10.8 6.8 15 10.8 16.2 16.4c-.2-.4-.5-.8-.8-1.2Z"
      />
      <path
        fill="#2F8A32"
        d="M16.6 15.2C23.8 15.6 27.6 10.8 27.2 6.2 21.2 6.8 17 10.8 15.8 16.4c.2-.4.5-.8.8-1.2Z"
      />
      <path
        fill="#E8FFC8"
        d="M10.2 8.4c2.6.6 4.8 2.4 6 4.8-2.2-1.4-4.6-2.4-7.2-2.8.2-.8.6-1.4 1.2-2Z"
      />
    </svg>
  );
}

export function DishMark({
  emoji,
  className,
}: {
  emoji?: string | null;
  className?: string;
}) {
  const id = normalizeDishEmoji(emoji);
  if (id === "chili") return <ChiliMark className={className} />;
  if (id === "bio") return <BioMark className={className} />;
  if (id === "veg") return <VegMark className={className} />;
  if (id === "vegan") return <VeganMark className={className} />;
  return null;
}

export function DishTitle({
  name,
  emoji,
}: {
  name: string;
  emoji?: string | null;
}) {
  const id = normalizeDishEmoji(emoji);
  if (!id) return name;
  return (
    <>
      {name}{" "}
      <DishMark emoji={id} />
    </>
  );
}
