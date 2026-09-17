import { PortalCard, PortalShell } from "@/components/portal-shell";

export default function SuggestionsPortalPage() {
  return (
    <PortalShell
      eyebrow="Suggestions"
      title="Que voulez-vous faire ?"
      backHref="/"
      backLabel="← Accueil"
    >
      <nav className="mt-12 grid w-full gap-4" aria-label="Choix suggestions">
        <PortalCard
          href="/display"
          emoji="👁️"
          title="Voir les suggestions"
          description="Aperçu public — écran salle."
        />
        <PortalCard
          href="/admin"
          emoji="🔐"
          title="Espace admin"
          description="Créer et modifier le tableau du jour."
        />
      </nav>
    </PortalShell>
  );
}
