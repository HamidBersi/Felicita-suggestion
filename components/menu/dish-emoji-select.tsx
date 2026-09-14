"use client";

import { useEffect, useRef, useState } from "react";
import { DISH_EMOJI_OPTIONS } from "@/lib/dish-emoji";
import { DishMark } from "@/components/menu/dish-title";

type DishEmojiSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DishEmojiSelect({ value, onChange }: DishEmojiSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div ref={rootRef} className="absolute top-1/2 right-1 -translate-y-1/2">
      <button
        type="button"
        aria-label="Picto du plat"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex size-9 items-center justify-center rounded-md text-[#1B1E19] hover:bg-black/5"
      >
        {value ? (
          <DishMark emoji={value} className="!size-7" />
        ) : (
          <svg viewBox="0 0 16 16" className="size-3.5 text-[#8a8578]" aria-hidden>
            <path
              fill="currentColor"
              d="M4.2 6.2 8 10l3.8-3.8.9.8L8 11.8 3.3 7z"
            />
          </svg>
        )}
      </button>
      {open ? (
        <div className="absolute top-[calc(100%+4px)] right-0 z-20 flex gap-1 rounded-xl border border-[#D9CFB8] bg-white p-1.5 shadow-md">
          <button
            type="button"
            title="Aucun"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`flex size-12 items-center justify-center rounded-lg text-[15px] text-[#8a8578] ${
              !value ? "bg-[#1E3A2F]/10" : "hover:bg-black/5"
            }`}
          >
            —
          </button>
          {DISH_EMOJI_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              title={option.label}
              onClick={() => {
                onChange(option.id);
                setOpen(false);
              }}
              className={`flex size-12 items-center justify-center rounded-lg ${
                value === option.id ? "bg-[#1E3A2F]/10" : "hover:bg-black/5"
              }`}
            >
              <DishMark emoji={option.id} className="!size-10" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
