"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ADMIN_AUTH_KEY, PIN_LENGTH } from "@/lib/admin-auth";
import { cn } from "@/lib/utils";

type PinScreenProps = {
  onSuccess: () => void;
  /** Défaut : login suggestions */
  loginUrl?: string;
  /** Défaut : clé localStorage suggestions */
  authStorageKey?: string;
  subtitle?: string;
};

export function PinScreen({
  onSuccess,
  loginUrl = "/api/admin/login",
  authStorageKey = ADMIN_AUTH_KEY,
  subtitle = "Accès Administration",
}: PinScreenProps) {
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
        const response = await fetch(loginUrl, {
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

        localStorage.setItem(authStorageKey, "true");
        toast.success("Connexion réussie");
        onSuccess();
      } catch {
        toast.error("Erreur de connexion");
        clearAndFocusFirst();
      } finally {
        setIsSubmitting(false);
      }
    },
    [authStorageKey, clearAndFocusFirst, isSubmitting, loginUrl, onSuccess],
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
    <div className="relative flex min-h-full flex-1 items-center justify-center overflow-hidden bg-[#F7F2E7] p-6">
      <div className="relative w-full max-w-md">
        <div className="rounded-xl border border-[#D9CFB8] bg-white p-8 shadow-none">
          <div className="mb-8 text-center">
            <Image
              src="/icons/icon-192.png"
              alt="Logo Felicita"
              width={56}
              height={56}
              className="mx-auto mb-4 size-14 rounded-xl object-cover ring-1 ring-[#D9CFB8]"
              priority
            />
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold tracking-tight text-[#1B1E19]">
              Felicita
            </h1>
            <p className="mt-2 text-sm text-[#6b6a5f]">{subtitle}</p>
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
                    "h-12 w-10 rounded-md border border-[#D9CFB8] bg-[#FBF8F1] text-center text-lg font-semibold tracking-widest outline-none sm:h-14 sm:w-12",
                    "focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/15",
                    digit && "border-[#1E3A2F]/40 bg-white",
                  )}
                />
              ))}
            </div>

            <Button
              type="button"
              className="h-11 w-full rounded-md bg-[#B68A3D] font-semibold text-[#1E3A2F] hover:bg-[#D8B871]"
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
