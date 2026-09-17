"use client";

import { ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type HScrollRowProps = {
  children: ReactNode;
  className?: string;
  /** Couleur du dégradé (doit coller au fond sticky) */
  fadeFromClass?: string;
  /** lg = défile jusqu’à tablette, wrap au desktop. never = toujours une ligne. */
  wrapAt?: "lg" | "never";
};

export function HScrollRow({
  children,
  className = "",
  fadeFromClass = "from-[#F4F1EA]",
  wrapAt = "lg",
}: HScrollRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollRight(max > 8 && el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [children, update]);

  function scrollAhead() {
    scrollerRef.current?.scrollBy({ left: 140, behavior: "smooth" });
  }

  return (
    <div className="relative min-w-0">
      <div
        ref={scrollerRef}
        className={`flex flex-nowrap overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          wrapAt === "lg" ? "lg:flex-wrap lg:overflow-visible" : ""
        } ${className}`}
      >
        {children}
      </div>
      {canScrollRight ? (
        <button
          type="button"
          aria-label="Faire défiler vers la droite"
          onClick={scrollAhead}
          className={`absolute inset-y-0 right-0 z-10 flex w-11 items-center justify-end bg-gradient-to-l ${fadeFromClass} to-transparent pr-0.5 ${
            wrapAt === "lg" ? "lg:hidden" : ""
          }`}
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-[#1B1E19]/85 text-[#FBF8F1] shadow-sm">
            <ChevronRight className="size-4" strokeWidth={2.25} />
          </span>
        </button>
      ) : null}
    </div>
  );
}
