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
import { ADMIN_AUTH_KEY } from "@/lib/admin-auth";

type AdminAuthContextValue = {
  logout: () => void;
};

const AdminAuthenticatedContext = createContext<AdminAuthContextValue | null>(
  null,
);

type AdminGateProps = {
  children: React.ReactNode;
};

export function AdminGate({ children }: AdminGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/admin/session", {
          credentials: "include",
        });
        const data = (await response.json()) as { authenticated?: boolean };
        const ok = data.authenticated === true;
        setIsAuthenticated(ok);
        if (ok) {
          localStorage.setItem(ADMIN_AUTH_KEY, "true");
        } else {
          localStorage.removeItem(ADMIN_AUTH_KEY);
        }
      } catch {
        localStorage.removeItem(ADMIN_AUTH_KEY);
        setIsAuthenticated(false);
      }
    }

    void checkSession();
  }, []);

  const handleSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    void fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      localStorage.removeItem(ADMIN_AUTH_KEY);
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
        <PinScreen onSuccess={handleSuccess} />
        <Toaster richColors position="top-center" />
      </>
    );
  }

  return (
    <AdminAuthenticatedContext.Provider value={{ logout: handleLogout }}>
      {children}
    </AdminAuthenticatedContext.Provider>
  );
}

export function useAdminLogout() {
  const context = useContext(AdminAuthenticatedContext);
  if (!context) {
    throw new Error("useAdminLogout must be used within AdminGate");
  }
  return context.logout;
}
