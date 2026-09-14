import { PortalCard, PortalShell } from "@/components/portal-shell";

export default function Home() {
  return (
    <PortalShell
      eyebrow="Felicita"
      title="Restaurant Management"
      subtitle="Menu salle et suggestions du jour"
    >
      <nav
        className="mt-12 grid w-full gap-4 sm:grid-cols-2"
        aria-label="Navigation principale"
      >
        <PortalCard
          href="/portail/menu"
          emoji="🍽️"
          title="Menu"
          description="Carte salle : voir ou gérer."
          className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-150 duration-700"
        />
        <PortalCard
          href="/portail/suggestions"
          emoji="✨"
          title="Suggestions"
          description="Tableau du jour : voir ou gérer."
          className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-300 duration-700"
        />
      </nav>
    </PortalShell>
  );
}
