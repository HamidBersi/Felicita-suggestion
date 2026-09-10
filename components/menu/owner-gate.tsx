"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

import { PinScreen } from "@/components/admin/pin-screen";
import { Toaster } from "@/components/ui/sonner";
import { OWNER_AUTH_KEY } from "@/lib/owner-auth";

type OwnerAuthContextValue = {
  logout: () => void;
};

const OwnerAuthenticatedContext = createContext<OwnerAuthContextValue | null>(
  null,
);

type OwnerGateProps = {
  children: React.ReactNode;
};

export function OwnerGate({ children }: OwnerGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/owner/session", {
          credentials: "include",
        });
        const data = (await response.json()) as { authenticated?: boolean };
        const ok = data.authenticated === true;
        setIsAuthenticated(ok);
        if (ok) {
          localStorage.setItem(OWNER_AUTH_KEY, "true");
        } else {
          localStorage.removeItem(OWNER_AUTH_KEY);
        }
      } catch {
        localStorage.removeItem(OWNER_AUTH_KEY);
        setIsAuthenticated(false);
      }
    }

    void checkSession();
  }, []);

  const handleSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    void fetch("/api/owner/logout", {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      localStorage.removeItem(OWNER_AUTH_KEY);
      setIsAuthenticated(false);
      toast.success("Déconnecté");
    });
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <PinScreen
          onSuccess={handleSuccess}
          loginUrl="/api/owner/login"
          authStorageKey={OWNER_AUTH_KEY}
          subtitle="Accès Menu — Patron uniquement"
        />
        <Toaster richColors position="top-center" />
      </>
    );
  }

  return (
    <OwnerAuthenticatedContext.Provider value={{ logout: handleLogout }}>
      <div className="flex min-h-dvh flex-1 flex-col">{children}</div>
    </OwnerAuthenticatedContext.Provider>
  );
}

export function useOwnerLogout() {
  const context = useContext(OwnerAuthenticatedContext);
  if (!context) {
    throw new Error("useOwnerLogout must be used within OwnerGate");
  }
  return context.logout;
}
