import { useId } from "react";
import { normalizeDishEmoji } from "@/lib/dish-emoji";

const box =
  "inline-block size-[1.65em] shrink-0 align-[-0.28em] [print-color-adjust:exact]";

function markClass(className?: string) {
  return className ? `${box} ${className}` : box;
}

function gradientId() {
  return useId().replace(/:/g, "");
}

function ChiliMark({ className }: { className?: string }) {
  const id = gradientId();
  return (
    <svg viewBox="0 0 64 64" className={markClass(className)} aria-hidden>
      <defs>
        <linearGradient id={`${id}-body`} x1="44" y1="12" x2="12" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6A5C" />
          <stop offset="50%" stopColor="#DC2A22" />
          <stop offset="100%" stopColor="#8E120E" />
        </linearGradient>
      </defs>
      <path
        fill="#3F8A2E"
        d="M41.6 6.4c.3 3.4-.4 6-1.8 7.6.9-2.6.7-5.2 1.8-7.6Z"
      />
      <path
        fill="#2F6F24"
        d="M36.2 13.8c2.8-1 5.8-.4 8.2 1.4-1.7 1.5-4 2.2-6.4 2.1-.8-1-1.4-2.2-1.8-3.5Z"
      />
      <path
        fill="#4FA03A"
        d="M43.4 14.2c1.9.7 3.3 1.9 3.9 3.5-1.9.3-3.6 0-5-.9 0-1-.3-1.8 1.1-2.6Z"
      />
      <path
        fill="none"
        stroke={`url(#${id}-body)`}
        strokeWidth="7.2"
        strokeLinecap="round"
        d="M42.5 18.5C48 29 45.5 42 32 52.5 24 58 16.5 60.5 13.5 58"
      />
      <path
        fill="none"
        stroke="#FFD2C8"
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity=".55"
        d="M43.2 20.8C47.4 30 45.2 41 34.2 50"
      />
    </svg>
  );
}

function BioMark({ className }: { className?: string }) {
  const id = gradientId();
  return (
    <svg viewBox="0 0 64 64" className={markClass(className)} aria-hidden>
      <defs>
        <linearGradient id={`${id}-leaf`} x1="14" y1="52" x2="54" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1F6B32" />
          <stop offset="45%" stopColor="#3EAE4C" />
          <stop offset="100%" stopColor="#8FE56A" />
        </linearGradient>
      </defs>
      <path
        fill="#2C6A28"
        d="M12.5 58.5c3.2-3.6 7.4-7 12.2-9.2-.8 2.4-2.6 5-5.2 7.4-2.4 2.2-5 3.2-7 1.8Z"
      />
      <path
        fill={`url(#${id}-leaf)`}
        d="M24.2 49.6C16.8 42 15.2 28.4 22.6 17.8 30.2 7 44.2 3.6 54.4 10.4c1.6 1.1 1.2 3.4-.6 4.2-8.6 3.8-14.6 11.6-16.8 21.2-1.8 8 1.2 15.4 7.6 20.2-7.8 1.2-15.2-1.2-20.4-6.4Z"
      />
      <path
        fill="#D9FFB4"
        opacity=".42"
        d="M28.8 20.4c6.4-8.2 16.4-11.8 24.2-8.6-8.2 2.8-14.8 9.6-18.4 18.2-1.2-3.4-3.2-6.6-5.8-9.6Z"
      />
      <path
        fill="none"
        stroke="#145226"
        strokeWidth="1.35"
        strokeLinecap="round"
        d="M22.8 50.2C30 42.4 38.4 29.6 51.6 14.8"
      />
      <path
        fill="none"
        stroke="#145226"
        strokeWidth="1"
        strokeLinecap="round"
        opacity=".7"
        d="M28.6 42.2c4.8-2.6 9.2-7 12.8-12.2M32.2 35.4c4.2-1.6 8-5.2 11.2-9.6M36.4 28.2c3.4-1.4 6.4-4.2 8.8-7.8M26.8 46.6c3.8-1.4 7.4-4.4 10.4-8.2"
      />
    </svg>
  );
}

function VegMark({ className }: { className?: string }) {
  const id = gradientId();
  return (
    <svg viewBox="0 0 64 64" className={markClass(className)} aria-hidden>
      <defs>
        <linearGradient id={`${id}-carrot`} x1="24" y1="18" x2="40" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB14A" />
          <stop offset="40%" stopColor="#F07812" />
          <stop offset="100%" stopColor="#B63C00" />
        </linearGradient>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="#2F8A32" strokeWidth="1.7" d="M32 22C28 12 22 6 16 4" />
        <path stroke="#3FA246" strokeWidth="1.55" d="M32 22C30 11 28 5 26 2.4" />
        <path stroke="#2F8A32" strokeWidth="1.7" d="M32 22C34 10 38 4.2 40 2" />
        <path stroke="#4CB050" strokeWidth="1.5" d="M32 22C38 13 46 7 52 6" />
        <path stroke="#348C36" strokeWidth="1.45" d="M32 22C24 14 18 11 13 12" />
        <path stroke="#67C15A" strokeWidth="1.2" d="M22 9.5C19 7 16 6.2 13.5 7M39 8C42 5.4 46 4.4 49.5 5.2M27 7C25.2 4.4 23 3 20.4 2.8" />
      </g>
      <path
        fill={`url(#${id}-carrot)`}
        d="M27 22c-3.5.5-4.6 4-3.6 9.2 1.6 11 4.6 22.2 8.2 29.4.4 1 1.8 1.2 2.5.2 4.2-10.6 8-22.2 8.8-31.4.4-4.2-1.4-7-4.6-7.4C34.8 21.6 30.6 21.6 27 22Z"
      />
      <path
        fill="#FFE2B0"
        opacity=".5"
        d="M33.4 24.2c1.1.2 1.5 1.2 1.2 2.4-1 7.2-2.8 15.2-5 23.4-.3 1.1-1.2.4-1.3-.5-1.6-7.8-3-15.6-3.6-22.8-.2-1.2.6-2 1.7-2.1 2.4-.2 5-.4 7-.4Z"
      />
      <path
        fill="none"
        stroke="#C24A08"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity=".45"
        d="M24.8 30.6c4.6.6 9.4.4 14-.6M25.8 38.4c4 .6 8.2.4 12.2-.6M27.4 46.8c3.2.5 6.6.3 9.6-.7M29 54.4c2.2.3 4.4.2 6.4-.5"
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
    <span className="inline-flex items-center gap-[0.22em] align-middle">
      <DishMark emoji={id} />
      <span>{name}</span>
    </span>
  );
}
