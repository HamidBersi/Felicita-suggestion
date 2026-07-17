"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ADMIN_AUTH_KEY, PIN_LENGTH } from "@/lib/admin-auth";
import { cn } from "@/lib/utils";

type PinScreenProps = {
  onSuccess: () => void;
};

export function PinScreen({ onSuccess }: PinScreenProps) {
  const [digits, setDigits] = useState<string[]>(
    () => Array(PIN_LENGTH).fill(""),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  const clearAndFocusFirst = useCallback(() => {
    setDigits(Array(PIN_LENGTH).fill(""));
    requestAnimationFrame(() => focusInput(0));
  }, [focusInput]);

  const validate = useCallback(
    async (code: string) => {
      if (code.length !== PIN_LENGTH || !/^\d{6}$/.test(code) || isSubmitting) {
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ pin: code }),
        });

        if (!response.ok) {
          toast.error("Code incorrect");
          clearAndFocusFirst();
          return;
        }

        localStorage.setItem(ADMIN_AUTH_KEY, "true");
        toast.success("Connexion réussie");
        onSuccess();
      } catch {
        toast.error("Erreur de connexion");
        clearAndFocusFirst();
      } finally {
        setIsSubmitting(false);
      }
    },
    [clearAndFocusFirst, isSubmitting, onSuccess],
  );

  useEffect(() => {
    focusInput(0);
  }, [focusInput]);

  useEffect(() => {
    const code = digits.join("");
    if (code.length === PIN_LENGTH && digits.every((digit) => digit !== "")) {
      void validate(code);
    }
  }, [digits, validate]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    setDigits(nextDigits);

    if (digit && index < PIN_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      event.preventDefault();

      if (digits[index]) {
        const nextDigits = [...digits];
        nextDigits[index] = "";
        setDigits(nextDigits);
        return;
      }

      if (index > 0) {
        const nextDigits = [...digits];
        nextDigits[index - 1] = "";
        setDigits(nextDigits);
        focusInput(index - 1);
      }
    }

    if (event.key === "Enter") {
      event.preventDefault();
      validate(digits.join(""));
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, PIN_LENGTH);

    if (!pasted) return;

    const nextDigits = Array(PIN_LENGTH).fill("");
    pasted.split("").forEach((digit, index) => {
      nextDigits[index] = digit;
    });
    setDigits(nextDigits);
    focusInput(Math.min(pasted.length, PIN_LENGTH - 1));
  };

  return (
    <div className="relative flex min-h-full flex-1 items-center justify-center overflow-hidden bg-gradient-to-b from-stone-100 to-stone-50 p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/80 via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl shadow-sky-900/10 backdrop-blur-xl">
          <div className="mb-8 text-center">
            <Image
              src="/images/logo.webp"
              alt="Logo Felicita"
              width={56}
              height={56}
              className="mx-auto mb-4 size-14 rounded-2xl object-cover shadow-lg shadow-sky-500/25 ring-2 ring-sky-100"
              priority
            />
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold tracking-tight text-stone-900">
              Felicita
            </h1>
            <p className="mt-2 text-sm text-stone-500">Accès Administration</p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center gap-2.5 sm:gap-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  onChange={(event) => handleChange(index, event.target.value)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onPaste={handlePaste}
                  aria-label={`Chiffre ${index + 1}`}
                  className={cn(
                    "h-12 w-10 rounded-xl border border-stone-200 bg-white text-center text-lg font-semibold tracking-widest shadow-sm transition-all outline-none sm:h-14 sm:w-12",
                    "focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20",
                    digit && "border-sky-500/50 bg-sky-50/80",
                  )}
                />
              ))}
            </div>

            <Button
              type="button"
              className="h-11 w-full rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/25 hover:from-sky-600 hover:to-sky-700"
              onClick={() => void validate(digits.join(""))}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Vérification…" : "Entrer"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
