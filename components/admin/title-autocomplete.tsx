"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { SEARCH_MIN_QUERY_LENGTH } from "@/lib/suggestion-search";

export type CatalogHit = {
  id: string;
  title: string;
  description: string | null;
  price: string;
  label: string | null;
  labelColor: string;
};

type TitleAutocompleteProps = {
  id: string;
  value: string;
  className?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSelect: (hit: CatalogHit) => void;
};

export function TitleAutocomplete({
  id,
  value,
  className,
  placeholder,
  onChange,
  onSelect,
}: TitleAutocompleteProps) {
  const [hits, setHits] = useState<CatalogHit[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
      abortRef.current?.abort();
    };
  }, []);

  function search(query: string) {
    abortRef.current?.abort();

    const trimmed = query.trim();
    if (trimmed.length < SEARCH_MIN_QUERY_LENGTH) {
      setHits([]);
      setOpen(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    void fetch(
      `/api/suggestions/search?q=${encodeURIComponent(trimmed)}`,
      { signal: controller.signal }
    )
      .then(async (response) => {
        if (!response.ok) return;
        const data = (await response.json()) as CatalogHit[];
        setHits(data);
        setOpen(data.length > 0);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setHits([]);
        setOpen(false);
      });
  }

  function handleChange(nextValue: string) {
    onChange(nextValue);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(nextValue), 200);
  }

  function handleSelect(hit: CatalogHit) {
    setHits([]);
    setOpen(false);
    onSelect(hit);
  }

  return (
    <div className="relative">
      <Input
        id={id}
        className={className}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={(event) => handleChange(event.target.value)}
        onFocus={() => {
          if (hits.length > 0) setOpen(true);
        }}
        onBlur={() => {
          blurTimeoutRef.current = setTimeout(() => setOpen(false), 150);
        }}
      />

      {open && hits.length > 0 ? (
        <ul className="absolute z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-xl border border-stone-200 bg-white py-1 shadow-lg">
          {hits.map((hit) => (
            <li key={hit.id}>
              <button
                type="button"
                className="w-full px-3 py-2 text-left hover:bg-sky-50"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(hit)}
              >
                <span className="block font-medium text-stone-900">
                  {hit.title}
                </span>
                {hit.description ? (
                  <span className="mt-0.5 block truncate text-xs text-stone-500">
                    {hit.description}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
