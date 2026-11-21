# Félicità Suggestions

**Le logiciel de gestion du menu et des suggestions du jour du restaurant La Félicità (Furdenheim, 67), utilisé en production par l'équipe et les clients.**

Avant, le menu était imprimé et les suggestions du jour étaient écrites à la main. Aujourd'hui, l'équipe modifie tout depuis un téléphone. L'écran de la salle, le menu digital consulté par QR code et la carte imprimée se mettent à jour en même temps.

> _Témoignage client : à ajouter (citation du gérant, avec son accord)._

<!-- Captures : ajouter ici 3 images (écran en salle, menu sur mobile, back-office) -->

## Fonctionnalités

| Pour qui | Fonctionnalité |
| --- | --- |
| Clients en salle | **Tableau des suggestions** affiché sur un écran : jusqu'à 8 suggestions avec étiquettes de couleur, qui alternent avec un diaporama photo des plats |
| Clients | **Menu digital** accessible par **QR code**, traduit en **4 langues** (français, anglais, allemand, italien), langue mémorisée sur l'appareil |
| Clients | Deux cartes distinctes : **sur place** et **à emporter** ; vins au verre, au quart, au demi ou à la bouteille ; pictos (piment, bio…) |
| Équipe | **Back-office des suggestions** : ajout, modification, activation, ordre d'affichage |
| Gérant | **Back-office du menu** : catégories, plats, prix, photos, encadrés (suppléments, mentions) ; réordonnancement par **glisser-déposer** |
| Gérant | Plat marqué **« En rupture »** en un clic, sans le retirer de la carte ; recherche et restauration des plats supprimés |
| Gérant | **Version imprimable** de la carte avec pagination automatique, et génération du QR code |

## Architecture

```
Téléphone / écran salle / QR code
            │
            ▼
   Next.js (App Router, React 19, TypeScript)
   ├── Pages : /display (écran salle), /menu (menu client), /portail (back-office)
   └── API REST : /api/suggestions, /api/menu, /api/menu/qr, /api/admin, /api/owner
            │  Prisma ORM
            ▼
        PostgreSQL
```

**Stack :** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Prisma 7 · PostgreSQL · dnd-kit · qrcode

## Exploitation et sécurité

- **Deux rôles séparés** : équipe (suggestions) et gérant (menu), chacun protégé par son propre code PIN.
- **Sessions** signées en HMAC-SHA256, stockées dans un cookie `httpOnly`, `secure` en production, `sameSite=lax`. Le PIN n'est jamais stocké côté navigateur.
- **Anti-force brute** : blocage après 5 essais ratés par adresse IP pendant 15 minutes.
- **Secrets** uniquement dans les variables d'environnement, jamais dans le code (voir `.env.example`).
- **Mises en production** : le build applique automatiquement les migrations de base de données (`prisma migrate deploy`) avant de compiler l'application.

## Lancer le projet en local

```bash
pnpm install
cp .env.example .env      # puis renseigner les valeurs
pnpm prisma:migrate       # crée les tables
pnpm menu:seed            # charge la carte de départ
pnpm dev                  # http://localhost:3000
```

| Variable | Rôle |
| --- | --- |
| `DATABASE_URL` | Connexion PostgreSQL |
| `ADMIN_PIN` | Code PIN de l'équipe (suggestions) |
| `OWNER_PIN` | Code PIN du gérant (menu) |
| `SESSION_SECRET` | Clé de signature des sessions (`openssl rand -hex 32`) |

## Auteur

**Hamid Bersi** – conception, développement, mise en production et maintenance.
