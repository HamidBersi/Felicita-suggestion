"use client";

import { LogOut } from "lucide-react";

import { OwnerGate, useOwnerLogout } from "@/components/menu/owner-gate";
import { Button } from "@/components/ui/button";

function MenuAdminContent() {
  const logout = useOwnerLogout();

  return (
    <div className="min-h-full bg-gradient-to-b from-stone-100 to-stone-50 px-6 py-10">
      <div className="mx-auto flex max-w-lg items-start justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold text-stone-900">
            Menu admin
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Connexion patron OK — interface d&apos;édition à venir.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={logout}>
          <LogOut className="size-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}

export default function MenuAdminPage() {
  return (
    <OwnerGate>
      <MenuAdminContent />
    </OwnerGate>
  );
}
