/**
 * Menu salle — extrait de « Changement Carte 2025 Novembre.pdf »
 * (data/menu-salle.pdf).
 *
 * Même forme que felicita-menu-emporter.ts pour un seed unique.
 */

export type MenuCategoryId =
  | "aperitifs"
  | "bieres"
  | "cocktails"
  | "softs"
  | "entrees"
  | "salades"
  | "viandes"
  | "poissons"
  | "pates"
  | "pates-fraiches"
  | "pizzas"
  | "pizzas-speciales"
  | "desserts"
  | "chaudes"
  | "digestifs"
  | "vins";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategoryId;
  description: string;
  price: number;
  tiers?: {
    verre?: number;
    quart?: number;
    demi?: number;
    bouteille?: number;
  };
};

export const MENU_CATEGORIES: { id: MenuCategoryId; label: string }[] = [
  { id: "aperitifs", label: "Apéritifs" },
  { id: "bieres", label: "Bières" },
  { id: "cocktails", label: "Cocktails" },
  { id: "softs", label: "Boissons sans alcool" },
  { id: "entrees", label: "Entrées" },
  { id: "salades", label: "Salades" },
  { id: "viandes", label: "Viandes" },
  { id: "poissons", label: "Nos poissons" },
  { id: "pates", label: "Pâtes" },
  { id: "pates-fraiches", label: "Pâtes fraîches" },
  { id: "pizzas", label: "Pizzas" },
  { id: "pizzas-speciales", label: "Pizzas spéciales" },
  { id: "desserts", label: "Desserts" },
  { id: "chaudes", label: "Boissons chaudes" },
  { id: "digestifs", label: "Les digestifs" },
  { id: "vins", label: "Les vins" },
];

export const MENU_ITEMS: MenuItem[] = [
  // ── Apéritifs ──
  {
    id: "ap-ricard-tomate",
    name: "Ricard tomate 3cl",
    category: "aperitifs",
    description: "",
    price: 5.7,
  },
  {
    id: "ap-ricard",
    name: "Ricard 3cl",
    category: "aperitifs",
    description: "",
    price: 5.0,
  },
  {
    id: "ap-ricard-perroquet",
    name: "Ricard perroquet 3cl",
    category: "aperitifs",
    description: "",
    price: 5.7,
  },
  {
    id: "ap-vermouth",
    name: "Vermouth (rouge/blanc) 4cl",
    category: "aperitifs",
    description: "",
    price: 5.9,
  },
  {
    id: "ap-porto",
    name: "Porto (rouge/blanc) 6cl",
    category: "aperitifs",
    description: "",
    price: 5.0,
  },
  {
    id: "ap-campari",
    name: "Campari 4cl",
    category: "aperitifs",
    description: "",
    price: 6.5,
  },
  {
    id: "ap-blanc-fruit",
    name: "Blanc (cassis, pêche, mûre) 10cl",
    category: "aperitifs",
    description: "",
    price: 5.8,
  },
  {
    id: "ap-prosecco-fruit",
    name: "Prosecco (cassis, pêche, mûre) 10cl",
    category: "aperitifs",
    description: "",
    price: 7.8,
  },
  {
    id: "ap-aperol",
    name: "Apérol Spritz",
    category: "aperitifs",
    description: "",
    price: 9.5,
  },
  {
    id: "ap-prosecco-bio",
    name: "Prosecco 10cl (bio)",
    category: "aperitifs",
    description: "",
    price: 6.5,
  },
  {
    id: "ap-moscato",
    name: "Moscato 10cl",
    category: "aperitifs",
    description: "",
    price: 6.5,
  },
  {
    id: "ap-get27",
    name: "Get 27 4cl",
    category: "aperitifs",
    description: "",
    price: 5.8,
  },
  {
    id: "ap-suze",
    name: "Suze 4cl",
    category: "aperitifs",
    description: "",
    price: 4.9,
  },
  {
    id: "ap-hugo",
    name: "Hugo 16cl",
    category: "aperitifs",
    description: "",
    price: 9.5,
  },

  // ── Bières ──
  {
    id: "bi-blonde",
    name: "Bière Blonde Licorne 25cl",
    category: "bieres",
    description: "",
    price: 4.2,
  },
  {
    id: "bi-moment",
    name: "Bière du moment 25cl",
    category: "bieres",
    description: "",
    price: 4.9,
  },
  {
    id: "bi-monaco",
    name: "Monaco 25cl",
    category: "bieres",
    description: "",
    price: 3.9,
  },
  {
    id: "bi-picon",
    name: "Picon Bière 25cl",
    category: "bieres",
    description: "",
    price: 4.8,
  },
  {
    id: "bi-cynar",
    name: "Cynar 25cl",
    category: "bieres",
    description: "",
    price: 4.7,
  },
  {
    id: "bi-panache",
    name: "Panaché 25cl",
    category: "bieres",
    description: "",
    price: 3.9,
  },

  // ── Cocktails ──
  {
    id: "ck-mojito",
    name: "Façon Mojitos",
    category: "cocktails",
    description: "Gin, sirop mojitos, menthe fraîche, prosecco",
    price: 10.5,
  },
  {
    id: "ck-felicita",
    name: "Felicita",
    category: "cocktails",
    description: "Fraise, citron, melon, gin, prosecco",
    price: 10.9,
  },
  {
    id: "ck-negroni",
    name: "Négronis",
    category: "cocktails",
    description: "Campari, gin, martini rouge",
    price: 10.8,
  },
  {
    id: "ck-limone",
    name: "Limone Spritz",
    category: "cocktails",
    description: "Limoncello, eau pétillante, prosecco",
    price: 10.5,
  },

  // ── Softs ──
  {
    id: "sf-carola-50",
    name: "Carola Bleue, Verte 50cl",
    category: "softs",
    description: "",
    price: 3.5,
  },
  {
    id: "sf-carola-100",
    name: "Carola Bleue 100cl",
    category: "softs",
    description: "",
    price: 6.5,
  },
  {
    id: "sf-sanpe-50",
    name: "San Pellegrino 50cl",
    category: "softs",
    description: "",
    price: 3.8,
  },
  {
    id: "sf-sanpe-100",
    name: "San Pellegrino 100cl",
    category: "softs",
    description: "",
    price: 7.6,
  },
  {
    id: "sf-jus",
    name: "Jus de fruits 25cl",
    category: "softs",
    description: "Tomate, orange, fraise, mangue",
    price: 3.8,
  },
  {
    id: "sf-coca",
    name: "Coca 33cl",
    category: "softs",
    description: "",
    price: 3.9,
  },
  {
    id: "sf-coca-zero",
    name: "Coca Zero 33cl",
    category: "softs",
    description: "",
    price: 3.9,
  },
  {
    id: "sf-fanta",
    name: "Fanta",
    category: "softs",
    description: "",
    price: 3.9,
  },
  {
    id: "sf-schweppes",
    name: "Schweppes Tonic",
    category: "softs",
    description: "",
    price: 3.7,
  },
  {
    id: "sf-fuze",
    name: "Fuze Tea 25cl",
    category: "softs",
    description: "",
    price: 3.6,
  },
  {
    id: "sf-limonade",
    name: "Limonade 25cl",
    category: "softs",
    description: "",
    price: 3.5,
  },
  {
    id: "sf-sirop",
    name: "Sirop à l'eau 25cl",
    category: "softs",
    description: "",
    price: 2.2,
  },
  {
    id: "sf-diabolo",
    name: "Diabolo 25cl",
    category: "softs",
    description: "",
    price: 3.6,
  },
  {
    id: "sf-perrier",
    name: "Perrier 33cl",
    category: "softs",
    description: "",
    price: 3.7,
  },

  // ── Entrées ──
  {
    id: "en-salaisons",
    name: "Assiette de salaisons italiennes (2 personnes)",
    category: "entrees",
    description:
      "Assortiment de charcuteries italiennes, fromages et antipasti",
    price: 17.5,
  },
  {
    id: "en-carpaccio",
    name: "Carpaccio de bœuf",
    category: "entrees",
    description:
      "Roquette, tomates cerises, copeaux de parmesan, huile olive, accompagné de sa pizza blanche",
    price: 15.9,
  },
  {
    id: "en-burrata",
    name: "Pomodore e Burrata",
    category: "entrees",
    description:
      "Tomates cerises, basilic, burrata fraîche, huile d'olive, origan, vinaigre balsamique",
    price: 12.5,
  },
  {
    id: "en-bruchetta-pomodore",
    name: "Bruchetta al pomodore (2 personnes)",
    category: "entrees",
    description: "Dés de tomates, ail, basilic, origan, copeaux de parmesan",
    price: 13.5,
  },
  {
    id: "en-bruchetta-moment",
    name: "Bruchetta du moment (2 personnes)",
    category: "entrees",
    description: "Ingrédients selon inspiration du chef",
    price: 13.7,
  },
  {
    id: "en-pizzetta-bianca",
    name: "Pizzetta Bianca",
    category: "entrees",
    description: "Origan, huile d'olive",
    price: 6.0,
  },
  {
    id: "en-pizzetta-mozza",
    name: "Pizzetta mozzarella",
    category: "entrees",
    description: "",
    price: 7.5,
  },

  // ── Salades ──
  {
    id: "sa-cesar",
    name: "Salade César",
    category: "salades",
    description:
      "Filet de poulet, crudités, vinaigrette, copeaux de parmesan, crème balsamique, croûtons",
    price: 16.5,
  },
  {
    id: "sa-salmone-chevre",
    name: "Salmone et Chèvre frit",
    category: "salades",
    description:
      "Saumon fumé, chèvre frit, tomates cerises, crudités, oignons rouges, vinaigrette",
    price: 17.8,
  },
  {
    id: "sa-calamars",
    name: "Salade tiède calamars et scampis",
    category: "salades",
    description:
      "Calamars et crevettes, crudités, tomates cerises, huile citronnée, herbes fraîches",
    price: 18.9,
  },
  {
    id: "sa-antipasti-burrata",
    name: "Antipasti et Burrata",
    category: "salades",
    description:
      "Tomates séchées, tomates cerises, mini artichauts, olives, julienne d'aubergines confites, crudités, huile d'olive, vinaigre balsamique, burrata fraîche",
    price: 19.5,
  },

  // ── Viandes ──
  {
    id: "vi-faux-filet-beurre",
    name: "Faux filet de bœuf grillé — beurre maître d'hôtel",
    category: "viandes",
    description: "",
    price: 23.5,
  },
  {
    id: "vi-faux-filet-gorgonzola",
    name: "Faux filet de bœuf grillé — sauce Gorgonzola",
    category: "viandes",
    description: "",
    price: 24.9,
  },
  {
    id: "vi-milanaise-boeuf",
    name: "Milanaise de bœuf fromage Taleggio et jambon St-Daniel",
    category: "viandes",
    description:
      "Gratinée au four, accompagnée d'une petite sauce tomate onctueuse",
    price: 26.5,
  },
  {
    id: "vi-milanaise-veau",
    name: "Milanaise de veau",
    category: "viandes",
    description:
      "Escalope de veau panée, croustillante et dorée, servie avec un accompagnement au choix",
    price: 22.5,
  },
  {
    id: "vi-saltimbocca",
    name: "Saltimbocca alla romana",
    category: "viandes",
    description:
      "Médaillon de veau, sauge, mozzarella, jambon St-Daniel, sauce au beurre citronnée",
    price: 25.9,
  },
  {
    id: "vi-sup-sauce",
    name: "Supplément sauce",
    category: "viandes",
    description: "Crème champignons, gorgonzola ou tomate",
    price: 2.0,
  },
  {
    id: "vi-sup-accompagnement",
    name: "Supplément accompagnement",
    category: "viandes",
    description: "Pâtes, légumes du moment, frites ou salade verte",
    price: 5.5,
  },
  {
    id: "vi-sup-salade",
    name: "Supplément salade verte",
    category: "viandes",
    description: "",
    price: 4.0,
  },

  // ── Poissons (carte dynamique) ──
  {
    id: "po-tableau",
    name: "Poissons du jour",
    category: "poissons",
    description:
      "Merci de consulter le tableau de suggestions ou notre service en salle. Accompagnements : pâtes, légumes du moment, frites, salade verte",
    price: 0,
  },

  // ── Pâtes ──
  {
    id: "pa-linguini-crema",
    name: "Linguini alla crema e pancetta",
    category: "pates",
    description: "Lardons fumés, crème, jaune d'œuf, parmesan",
    price: 17.5,
  },
  {
    id: "pa-linguini-pesto",
    name: "Linguini al pesto",
    category: "pates",
    description: "Pesto frais, pignons de pin, ail",
    price: 13.9,
  },
  {
    id: "pa-linguini-vongole",
    name: "Linguini alle vongole",
    category: "pates",
    description:
      "Fumet de crustacés, coques décoquillées, palourdes, herbes fraîches, huile citronnée",
    price: 24.0,
  },
  {
    id: "pa-linguini-frutti",
    name: "Linguini ai frutti di mare",
    category: "pates",
    description:
      "Tomates, fumet de crustacés, moules, calamars, gambas, ail, herbes fraîches, huile citronnée",
    price: 26.5,
  },
  {
    id: "pa-linguini-salmone",
    name: "Linguini al salmone",
    category: "pates",
    description:
      "Saumon frais, courgettes, carottes, oignons, crème fraîche, ail, jus de citron",
    price: 17.0,
  },
  {
    id: "pa-fusilli-arrabbiata",
    name: "Fusilli all'arrabbiata",
    category: "pates",
    description: "Sauce tomate, olive, piment, champignons, câpres, herbes fraîches, ail",
    price: 14.5,
  },
  {
    id: "pa-fusilli-pomodoro",
    name: "Fusilli al pomodoro",
    category: "pates",
    description: "Sauce tomate, ail, basilic",
    price: 11.9,
  },
  {
    id: "pa-fusilli-pollo-marsala",
    name: "Fusilli pollo e marsala",
    category: "pates",
    description: "Poulet émincé, champignons, crème, ail, marsala, herbes fraîches",
    price: 16.2,
  },
  {
    id: "pa-rigatoni-matriciana",
    name: "Rigatoni al matriciana",
    category: "pates",
    description: "Sauce tomate, lard, champignons, crème, ail, origan",
    price: 15.9,
  },
  {
    id: "pa-rigatoni-tre-fromaggi",
    name: "Rigatoni tre fromaggi",
    category: "pates",
    description:
      "Oignons, gorgonzola, taleggio, parmesan, crème, ail, herbes fraîches, pignons de pin",
    price: 14.9,
  },
  {
    id: "pa-rigatoni-pollo-curry",
    name: "Rigatoni al pollo curry",
    category: "pates",
    description: "Crème, poulet, champignons, ail, curry, herbes fraîches",
    price: 16.2,
  },
  {
    id: "pa-rigatoni-mediterranea",
    name: "Rigatoni méditerranea",
    category: "pates",
    description:
      "Sauce tomate, oignons, poivrons, courgettes, aubergines, olives noires, ail, herbes fraîches",
    price: 14.2,
  },

  // ── Pâtes fraîches ──
  {
    id: "pf-ravioles-ricotta",
    name: "Ravioles ricotta spinaci et gorgonzola",
    category: "pates-fraiches",
    description: "Crème fraîche, épinards, gorgonzola, ricotta, base aromatique, noix",
    price: 17.5,
  },
  {
    id: "pf-ravioles-truffees",
    name: "Ravioles truffées",
    category: "pates-fraiches",
    description:
      "Crème fraîche, champignons, tartufata, lamelles de truffe, herbes fraîches, pignons de pin",
    price: 25.0,
  },
  {
    id: "pf-tortellini-zingara",
    name: "Tortellini zingara",
    category: "pates-fraiches",
    description:
      "Tortellini farcis au bœuf, crème fraîche, sauce tomate, chorizo, champignons, olives noires, ail, origan",
    price: 17.2,
  },
  {
    id: "pf-tortellini-carne",
    name: "Tortellini carne e funghi",
    category: "pates-fraiches",
    description: "Tortellini farcis au bœuf, crème, champignons, ail",
    price: 16.5,
  },
  {
    id: "pf-bambino",
    name: "Menu bambino + boule de glace",
    category: "pates-fraiches",
    description:
      "-12 ans — Penne sauce tomate ou crème champignons, ou nuggets/frites, ou demi-pizza Marguerite / Reine / Jambon",
    price: 8.9,
  },

  // ── Pizzas ──
  {
    id: "pz-margherita",
    name: "Margherita",
    category: "pizzas",
    description: "Sauce tomate, mozzarella, origan",
    price: 11.9,
  },
  {
    id: "pz-regina",
    name: "Regina",
    category: "pizzas",
    description: "Sauce tomate, jambon, champignons, mozzarella, origan",
    price: 13.9,
  },
  {
    id: "pz-mediterranea",
    name: "Méditerranea",
    category: "pizzas",
    description:
      "Sauce tomate, oignons, poivrons, courgettes, aubergines, olives noires, herbes fraîches, mozzarella",
    price: 14.2,
  },
  {
    id: "pz-quattro",
    name: "Quattro fromaggi",
    category: "pizzas",
    description:
      "Sauce tomate, gorgonzola, chèvre, mozzarella, parmesan, herbes fraîches",
    price: 14.5,
  },
  {
    id: "pz-carbonara",
    name: "Carbonara",
    category: "pizzas",
    description: "Base crème, guanciale, oignons, œuf, origan, mozzarella",
    price: 13.9,
  },
  {
    id: "pz-napoletana",
    name: "Napoletana",
    category: "pizzas",
    description: "Sauce tomate, anchois, câpres, olives, mozzarella",
    price: 12.9,
  },
  {
    id: "pz-calabrese",
    name: "Calabrese",
    category: "pizzas",
    description: "Sauce tomate, spianata, poivrons, oignons, olives, 'nduja, mozzarella",
    price: 14.9,
  },
  {
    id: "pz-salmone",
    name: "Salmone",
    category: "pizzas",
    description:
      "Sauce tomate, saumon fumé, câpres, oignons, crème, mozzarella, herbes fraîches, huile citronnée",
    price: 16.5,
  },
  {
    id: "pz-chorizo",
    name: "Chorizo",
    category: "pizzas",
    description: "Sauce tomate, olives noires, oignons, chorizo, mozzarella",
    price: 14.7,
  },
  {
    id: "pz-chevre-miel",
    name: "Chèvre miel",
    category: "pizzas",
    description:
      "Sauce tomate, brunoise de carottes et courgettes, chèvre, miel, mozzarella, pignons de pin",
    price: 14.5,
  },
  {
    id: "pz-pollo-rustico",
    name: "Pollo rustico",
    category: "pizzas",
    description:
      "Base crème, poulet grillé, poivrons, oignons, champignons, tomates cerises, mozzarella",
    price: 15.5,
  },
  {
    id: "pz-frutti",
    name: "Frutti di mare",
    category: "pizzas",
    description:
      "Sauce tomate, calamars, gambas, moules, mozzarella, herbes fraîches, ail, huile citronnée",
    price: 18.9,
  },
  {
    id: "pz-sup-ingredient",
    name: "Supplément ingrédient",
    category: "pizzas",
    description: "",
    price: 1.5,
  },
  {
    id: "pz-sup-charcuterie",
    name: "Supplément ingrédient charcuterie",
    category: "pizzas",
    description: "",
    price: 3.5,
  },
  {
    id: "pz-sup-burrata",
    name: "Supplément burrata",
    category: "pizzas",
    description: "",
    price: 5.5,
  },

  // ── Pizzas spéciales ──
  {
    id: "ps-romana",
    name: "La Romana",
    category: "pizzas-speciales",
    description:
      "Base crème aux fines herbes, gorgonzola, jambon de pays, tomates cerises, roquette, mozzarella, crème balsamique",
    price: 15.9,
  },
  {
    id: "ps-prosciutto",
    name: "Prosciutto",
    category: "pizzas-speciales",
    description:
      "Huile d'olive, jambon de pays, tomates cerises, roquette, mozzarella, copeaux parmesan",
    price: 16.2,
  },
  {
    id: "ps-carpaccio",
    name: "Carpaccio",
    category: "pizzas-speciales",
    description:
      "Huile d'olive, carpaccio de bœuf, tomates cerises, roquette, mozzarella, citron, copeaux parmesan",
    price: 16.7,
  },
  {
    id: "ps-contadina",
    name: "Contadina",
    category: "pizzas-speciales",
    description:
      "Sauce tomate, carpaccio de bœuf, tomates cerises, roquette, burrata, huile d'olive, mozzarella, crème balsamique",
    price: 19.5,
  },
  {
    id: "ps-tartufo",
    name: "Tartufo",
    category: "pizzas-speciales",
    description:
      "Base crème fraîche truffée, champignons, burrata fraîche, roquette, huile de truffes, copeaux de truffes",
    price: 22.5,
  },
  {
    id: "ps-pesto-stracciatella",
    name: "Pesto e stracciatella",
    category: "pizzas-speciales",
    description:
      "Pesto frais, tomates cerises, roquette, mozzarella, stracciatella, huile d'olive, crème balsamique",
    price: 17.5,
  },

  // ── Desserts ──
  {
    id: "de-tiramisu",
    name: "Tiramisu",
    category: "desserts",
    description: "",
    price: 7.9,
  },
  {
    id: "de-delice",
    name: "Délice du moment",
    category: "desserts",
    description: "",
    price: 8.9,
  },
  {
    id: "de-creme-brulee",
    name: "Crème brûlée",
    category: "desserts",
    description: "",
    price: 7.0,
  },
  {
    id: "de-bunet",
    name: "Bunet",
    category: "desserts",
    description: "Flan typique du Piémont aux amarettis",
    price: 8.5,
  },
  {
    id: "de-dame-blanche",
    name: "Dame blanche",
    category: "desserts",
    description: "",
    price: 8.0,
  },
  {
    id: "de-chocolat-liegeois",
    name: "Chocolat liégeois",
    category: "desserts",
    description: "",
    price: 8.0,
  },
  {
    id: "de-cafe-liegeois",
    name: "Café liégeois",
    category: "desserts",
    description: "",
    price: 8.0,
  },
  {
    id: "de-glace-1",
    name: "Coupe de glace ou sorbet 1 boule",
    category: "desserts",
    description: "",
    price: 2.9,
  },
  {
    id: "de-glace-2",
    name: "Coupe 2 boules",
    category: "desserts",
    description: "",
    price: 5.8,
  },
  {
    id: "de-affogato",
    name: "Affogato",
    category: "desserts",
    description: "Supplément chantilly 1 €",
    price: 5.2,
  },

  // ── Boissons chaudes ──
  {
    id: "ch-expresso",
    name: "Expresso",
    category: "chaudes",
    description: "",
    price: 2.4,
  },
  {
    id: "ch-deca",
    name: "Décaféiné",
    category: "chaudes",
    description: "",
    price: 2.6,
  },
  {
    id: "ch-allonge",
    name: "Café allongé",
    category: "chaudes",
    description: "",
    price: 3.5,
  },
  {
    id: "ch-latte",
    name: "Latte macchiato",
    category: "chaudes",
    description: "",
    price: 4.8,
  },
  {
    id: "ch-cappuccino",
    name: "Cappuccino",
    category: "chaudes",
    description: "",
    price: 4.8,
  },
  {
    id: "ch-the",
    name: "Thé ou infusion",
    category: "chaudes",
    description: "",
    price: 3.6,
  },
  {
    id: "ch-irish",
    name: "Irish coffee",
    category: "chaudes",
    description: "Whisky ou grappa",
    price: 9.5,
  },

  // ── Digestifs ──
  {
    id: "di-vodka",
    name: "Vodka 4cl",
    category: "digestifs",
    description: "",
    price: 7.5,
  },
  {
    id: "di-gin",
    name: "Gin Bombay 4cl",
    category: "digestifs",
    description: "",
    price: 7.5,
  },
  {
    id: "di-amaretto",
    name: "Amaretto 4cl",
    category: "digestifs",
    description: "",
    price: 5.8,
  },
  {
    id: "di-limoncello",
    name: "Limoncello 4cl",
    category: "digestifs",
    description: "",
    price: 5.5,
  },
  {
    id: "di-cognac",
    name: "Cognac XO 4cl",
    category: "digestifs",
    description: "",
    price: 9.0,
  },
  {
    id: "di-grappa",
    name: "Grappa Nardini 4cl",
    category: "digestifs",
    description: "",
    price: 7.0,
  },
  {
    id: "di-framboise",
    name: "Framboise 4cl",
    category: "digestifs",
    description: "",
    price: 7.0,
  },
  {
    id: "di-mirabelle",
    name: "Mirabelle 4cl",
    category: "digestifs",
    description: "",
    price: 7.0,
  },
  {
    id: "di-poire",
    name: "Poire Williams 4cl",
    category: "digestifs",
    description: "",
    price: 7.0,
  },
  {
    id: "di-marc",
    name: "Marc de Gewurztraminer 4cl",
    category: "digestifs",
    description: "",
    price: 7.0,
  },
  {
    id: "di-rhum",
    name: "Rhum Don Papa 4cl",
    category: "digestifs",
    description: "",
    price: 9.0,
  },
  {
    id: "di-ramazzotti",
    name: "Ramazzotti 4cl",
    category: "digestifs",
    description: "",
    price: 6.0,
  },
  {
    id: "di-jack",
    name: "Jack Daniel's 4cl",
    category: "digestifs",
    description: "",
    price: 8.0,
  },

  // ── Vins (tarifs par format, plus de phrase dans description) ──
  {
    id: "vi-montepulciano",
    name: "Montepulciano (rouge)",
    category: "vins",
    description: "",
    price: 4.0,
    tiers: { verre: 4, quart: 8, demi: 16 },
  },
  {
    id: "vi-emozionne",
    name: "Emozionne (rouge)",
    category: "vins",
    description: "",
    price: 4.5,
    tiers: { verre: 4.5, quart: 9, demi: 18, bouteille: 26 },
  },
  {
    id: "vi-nero",
    name: "Nero d'Avola (rouge)",
    category: "vins",
    description: "",
    price: 4.5,
    tiers: { verre: 4.5, quart: 9, demi: 18, bouteille: 27 },
  },
  {
    id: "vi-lambrusco",
    name: "Lambrusco (rouge)",
    category: "vins",
    description: "",
    price: 4.0,
    tiers: { verre: 4, quart: 8, demi: 16, bouteille: 24 },
  },
  {
    id: "vi-primitivo",
    name: "Primitivo Zola (rouge)",
    category: "vins",
    description: "",
    price: 5.5,
    tiers: { verre: 5.5, quart: 11, demi: 22, bouteille: 33 },
  },
  {
    id: "vi-montesenano",
    name: "Montesenano (rouge)",
    category: "vins",
    description: "",
    price: 7.0,
    tiers: { verre: 7, quart: 14, demi: 28, bouteille: 40 },
  },
  {
    id: "vi-miraggio",
    name: "Miraggio terra siciliana (rouge)",
    category: "vins",
    description: "",
    price: 44.0,
    tiers: { bouteille: 44 },
  },
  {
    id: "vi-edizione",
    name: "Edizione (cuvée spéciale, rouge)",
    category: "vins",
    description: "",
    price: 82.0,
    tiers: { bouteille: 82 },
  },
  {
    id: "vi-pinot-grigio",
    name: "Pinot Grigio (blanc)",
    category: "vins",
    description: "",
    price: 3.5,
    tiers: { verre: 3.5, quart: 7, demi: 14 },
  },
  {
    id: "vi-frascati",
    name: "Frascati (blanc)",
    category: "vins",
    description: "",
    price: 4.0,
    tiers: { verre: 4, quart: 8, demi: 16, bouteille: 24 },
  },
  {
    id: "vi-ciro",
    name: "Cirò bio (blanc)",
    category: "vins",
    description: "",
    price: 6.0,
    tiers: { verre: 6, quart: 12, demi: 24, bouteille: 36 },
  },
  {
    id: "vi-chardonnay",
    name: "Chardonnay (blanc)",
    category: "vins",
    description: "",
    price: 5.5,
    tiers: { verre: 5.5, quart: 11, demi: 22, bouteille: 36 },
  },
  {
    id: "vi-vernaccia",
    name: "Vernaccia (blanc)",
    category: "vins",
    description: "",
    price: 5.0,
    tiers: { verre: 5, quart: 10, demi: 20, bouteille: 30 },
  },
  {
    id: "vi-bardolino",
    name: "Bardolino (rosé)",
    category: "vins",
    description: "",
    price: 3.5,
    tiers: { verre: 3.5, quart: 7, demi: 14 },
  },
  {
    id: "vi-negro-amaro",
    name: "Negro Amaro Rosato (rosé)",
    category: "vins",
    description: "",
    price: 4.0,
    tiers: { verre: 4, quart: 8, demi: 16, bouteille: 24 },
  },
  {
    id: "vi-unanotte",
    name: "Unanotte (rosé)",
    category: "vins",
    description: "",
    price: 5.5,
    tiers: { verre: 5.5, quart: 11, demi: 22, bouteille: 33 },
  },
  {
    id: "vi-font-du-broc",
    name: "Château Font du Broc bio (rosé)",
    category: "vins",
    description: "",
    price: 6.0,
    tiers: { verre: 6, quart: 12, demi: 24, bouteille: 36 },
  },
  {
    id: "vi-champagne",
    name: "Champagne",
    category: "vins",
    description: "",
    price: 12.0,
    tiers: { verre: 12, bouteille: 72 },
  },
  {
    id: "vi-moscato-btl",
    name: "Moscato",
    category: "vins",
    description: "",
    price: 6.5,
    tiers: { verre: 6.5, bouteille: 36 },
  },
  {
    id: "vi-prosecco-bio",
    name: "Prosecco bio",
    category: "vins",
    description: "",
    price: 6.5,
    tiers: { verre: 6.5, bouteille: 36 },
  },
];
