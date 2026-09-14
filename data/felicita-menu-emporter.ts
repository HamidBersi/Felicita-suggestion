export type MenuCategoryId =
  | "entrees"
  | "salades"
  | "viandes"
  | "pates"
  | "pizzas"
  | "desserts"
  | "boissons"
  | "vins";

export type MenuBadge = "signature" | "popular";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategoryId;
  description: string;
  price: number;
  badge?: MenuBadge;
};

export const MENU_CATEGORIES: { id: MenuCategoryId; label: string }[] = [
  { id: "entrees", label: "Entrées" },
  { id: "salades", label: "Salades" },
  { id: "viandes", label: "Viandes" },
  { id: "pates", label: "Pâtes" },
  { id: "pizzas", label: "Pizzas" },
  { id: "desserts", label: "Desserts" },
  { id: "boissons", label: "Boissons" },
  { id: "vins", label: "Vins" },
];

export const MENU_ITEMS: MenuItem[] = [
  // ── Entrées ──
  {
    id: "entree-salaisons",
    name: "Assiette de salaisons italiennes",
    category: "entrees",
    description:
      "Assortiment de charcuteries italiennes , fromages et antipasti",
    price: 17.5,
    badge: "popular",
  },
  {
    id: "entree-carpaccio",
    name: "Carpaccio de bœuf",
    category: "entrees",
    description:
      "Roquette, tomates cerises, copeaux de parmesan, huile olive, accompagné de sa pizza blanche",
    price: 15.9,
    badge: "signature",
  },
  {
    id: "entree-burrata",
    name: "Pomodore e Burrata",
    category: "entrees",
    description:
      "Tomates cerises, basilic, burrata fraîche, huile d'olive, origan, vinaigre balsamique",
    price: 12.5,
  },
  {
    id: "entree-bruschette-pomodoro",
    name: "Bruschetta al pomodoro",
    category: "entrees",
    description: "Dés de tomates, ail, basilic, origan, copeaux de parmesan",
    price: 13.5,
  },
  {
    id: "entree-bruschette-moment",
    name: "Bruschetta du moment",
    category: "entrees",
    description: "Ingrédients selon inspiration du chef",
    price: 13.7,
  },
  {
    id: "entree-pizzetta-bianca",
    name: "Pizzetta bianca",
    category: "entrees",
    description: "origan, huile d'olive",
    price: 6.0,
  },
  {
    id: "entree-pizzetta-mozza",
    name: "Pizzetta mozzarella",
    category: "entrees",
    description: "",
    price: 7.5,
  },

  // ── Salades ──
  {
    id: "salade-cesar",
    name: "Salade César",
    category: "salades",
    description:
      "Salade composée de filet de poulet, crudités, vinaigrette, copeaux de parmesan, crème balsamique, croûtons",
    price: 16.5,
    badge: "popular",
  },
  {
    id: "salade-saumon-chevre",
    name: "Salmone et chèvre frit",
    category: "salades",
    description:
      "Salade composée de saumon fumé, Chèvre Frit, tomates cerises, crudités, oignons rouges, vinaigrette",
    price: 17.8,
  },
  {
    id: "salade-calamar",
    name: "Salade tiède calamars et scampis",
    category: "salades",
    description:
      "Salade composée de calamars et crevettes, crudités, tomates cerises, huile citronnée, herbes fraîche",
    price: 18.9,
  },
  {
    id: "salade-antipasti",
    name: "Antipasti et burrata",
    category: "salades",
    description:
      "Salade composée de tomates séchées, tomates cerises, mini artichauts, olives, julienne d'aubergines confites, crudités, huile d'olive, vinaigre balsamique, burrata fraîche",
    price: 19.5,
    badge: "signature",
  },

  // ── Viandes ──
  {
    id: "viande-faux-filet-beurre",
    name: "Faux filet de bœuf grillé — beurre maître d'hôtel",
    category: "viandes",
    description: "",
    price: 23.5,
    badge: "signature",
  },
  {
    id: "viande-faux-filet-gorg",
    name: "Faux filet de bœuf grillé — sauce gorgonzola",
    category: "viandes",
    description: "",
    price: 24.9,
  },
  {
    id: "viande-milanaise-boeuf",
    name: "Milanaise de bœuf — fromage Taleggio et jambon St-Daniel gratinée au four",
    category: "viandes",
    description: "Accompagnée d'une petite sauce tomate onctueuse et savoureuse",
    price: 26.5,
  },
  {
    id: "viande-milanaise-veau",
    name: "Milanaise de veau",
    category: "viandes",
    description:
      "Escalope de veau panée, croustillante et dorée, servie avec un accompagnement au choix",
    price: 22.5,
    badge: "popular",
  },
  {
    id: "viande-saltimbocca",
    name: "Saltimbocca alla romana",
    category: "viandes",
    description:
      "Médaillon de veau, sauge, mozzarella, jambon st daniel, sauce au beurre citronnée",
    price: 25.9,
    badge: "signature",
  },

  // ── Pâtes ──
  {
    id: "pates-linguini-pancetta",
    name: "Linguini alla crema e pancetta",
    category: "pates",
    description: "Lardons fumé, crème, jaune d'œuf, parmesan",
    price: 17.5,
  },
  {
    id: "pates-linguini-pesto",
    name: "Linguini al pesto",
    category: "pates",
    description: "Pesto frais, pignons de pin, ail",
    price: 13.9,
    badge: "popular",
  },
  {
    id: "pates-linguini-vongole",
    name: "Linguini alle vongole",
    category: "pates",
    description:
      "Fumet de crustacés, coques décoquillées, palourdes, herbes fraîches, huile citronnée",
    price: 24.0,
    badge: "signature",
  },
  {
    id: "pates-linguini-frutti",
    name: "Linguini ai frutti di mare",
    category: "pates",
    description:
      "Tomates, fumet de crustacés, moules, calamars, gambas, ail, herbes fraîches, huile citronnée",
    price: 26.5,
    badge: "signature",
  },
  {
    id: "pates-linguini-salmone",
    name: "Linguini al salmone",
    category: "pates",
    description:
      "Saumon frais, courgettes, carottes, oignons, crème fraîche, ail, jus de citron",
    price: 17.0,
  },
  {
    id: "pates-fusilli-arrabbiata",
    name: "Fusilli all'arrabbiata",
    category: "pates",
    description: "Sauce tomate, olive, piment, champignons, câpres, herbes,fraîche, ail",
    price: 14.5,
  },
  {
    id: "pates-fusilli-pomodoro",
    name: "Fusilli al pomodoro",
    category: "pates",
    description: "Sauce tomate, ail, basilic",
    price: 11.9,
  },
  {
    id: "pates-fusilli-marsala",
    name: "Fusilli pollo e marsala",
    category: "pates",
    description: "Poulet émincé, champignons, crème, ail, marsala, herbes fraîches",
    price: 16.2,
  },
  {
    id: "pates-rigatoni-matriciana",
    name: "Rigatoni al matriciana",
    category: "pates",
    description: "Sauce tomate, lard, champignons, crème, ail, origan",
    price: 15.9,
  },
  {
    id: "pates-rigatoni-fromaggi",
    name: "Rigatoni tre fromaggi",
    category: "pates",
    description:
      "Oignons, gorgonzola, taleggio, parmesan, crème, ail, herbes fraîches, pignons de pin",
    price: 14.9,
  },
  {
    id: "pates-rigatoni-curry",
    name: "Rigatoni al polo curry",
    category: "pates",
    description: "Crème, poulet, champignons, ail, curry, herbes fraîches",
    price: 16.2,
  },
  {
    id: "pates-rigatoni-medit",
    name: "Rigatoni mediterranea",
    category: "pates",
    description:
      "sauce tomate, oignons, poivrons, courgettes, aubergines, olives noires, ail, herbes fraîches",
    price: 14.2,
  },
  {
    id: "pates-ravioles-ricotta",
    name: "Ravioles ricotta spinaci et gorgonzola",
    category: "pates",
    description: "Crème Fraîche, épinards, gorgonzola, ricotta, base aromatique, noix",
    price: 17.5,
  },
  {
    id: "pates-ravioles-truffe",
    name: "Ravioles truffées",
    category: "pates",
    description:
      "Crème Fraîche, champignons, tartufata, lamelles de Truffe, herbes fraîches, pignons de pain",
    price: 25.0,
    badge: "signature",
  },
  {
    id: "pates-tortellini-zingara",
    name: "Tortellini zingara",
    category: "pates",
    description:
      "Tortelini farcies au boeuf, crème Fraîche, sauce tomate, chorizo, champignons, olives noires, ail, origan",
    price: 17.2,
  },
  {
    id: "pates-tortellini-funghi",
    name: "Tortellini carne e funghi",
    category: "pates",
    description: "Tortelini farcies au boeuf, crème, champignons, ail,",
    price: 16.5,
  },
  {
    id: "pates-menu-bambino",
    name: "Menu bambino + boule de glace",
    category: "pates",
    description:
      "Penne Sauce Tomate · Penne Crème Champignons · Nuggets/Frites · Demi pizza Marguerite-Reine-Jambon",
    price: 8.9,
  },

  // ── Pizzas ──
  {
    id: "pizza-margherita",
    name: "Margherita",
    category: "pizzas",
    description: "Sauce tomate, mozzarella, origan",
    price: 11.9,
    badge: "popular",
  },
  {
    id: "pizza-regina",
    name: "Regina",
    category: "pizzas",
    description: "Sauce tomate, jambon, champignons, mozzarella, origan",
    price: 13.9,
    badge: "popular",
  },
  {
    id: "pizza-mediterranea",
    name: "Méditerranea",
    category: "pizzas",
    description:
      "Sauce tomate, oignons, poivrons, courgettes, aubergines, olives noires, herbes fraîches, mozzarella",
    price: 14.2,
  },
  {
    id: "pizza-quattro",
    name: "Quattro fromaggi",
    category: "pizzas",
    description: "Sauce tomate, gorgonzola, chèvre, mozzarella, parmesan, herbes fraiches",
    price: 14.5,
  },
  {
    id: "pizza-carbonara",
    name: "Carbonara",
    category: "pizzas",
    description: "Base Créme, guanciale, oignons, oeuf, origan, mozzarella",
    price: 13.9,
  },
  {
    id: "pizza-napoletana",
    name: "Napoletana",
    category: "pizzas",
    description: "Sauce tomate, anchois, câpres, olives, mozzarella",
    price: 12.9,
  },
  {
    id: "pizza-calabrese",
    name: "Calabrese",
    category: "pizzas",
    description: "Sauce tomate, spianata, poivrons, oignons, olives,'nduja, mozzarella",
    price: 14.9,
  },
  {
    id: "pizza-salmone",
    name: "Salmone",
    category: "pizzas",
    description:
      "Sauce tomate, saumon fumé, câpres, oignons, crème, mozzarella, herbes fraîches, huile citronnée",
    price: 16.5,
  },
  {
    id: "pizza-chorizo",
    name: "Chorizo",
    category: "pizzas",
    description: "Sauce tomate, olives noires, oignons, chorizo, mozzarella",
    price: 14.7,
  },
  {
    id: "pizza-chevre-miel",
    name: "Chèvre miel",
    category: "pizzas",
    description:
      "Sauce tomate, brunoise de carottes et courgettes, chèvre, miel, mozzarella, pignons de pin",
    price: 14.5,
  },
  {
    id: "pizza-pollo-rustico",
    name: "Pollo rustico",
    category: "pizzas",
    description:
      "Base crème, poulet grillé, poivrons, oignons, champignons, tomates cerises, mozzarella",
    price: 15.5,
  },
  {
    id: "pizza-frutti",
    name: "Frutti di mare",
    category: "pizzas",
    description:
      "Sauce tomate, calamars, gambas, moules, mozzarella, herbes fraîches, ail, huile citronnée",
    price: 18.9,
    badge: "signature",
  },
  {
    id: "pizza-romana",
    name: "La Romana",
    category: "pizzas",
    description:
      "Base crème aux fines herbes, gorgonzola, jambon de pays, tomates cerises, roquette, mozzarella, crème balsamique",
    price: 15.9,
    badge: "signature",
  },
  {
    id: "pizza-prosciutto",
    name: "Prosciutto",
    category: "pizzas",
    description:
      "Huile d'olive, jambon de pays, tomates cerises, roquette, mozzarella, copeaux parmesan",
    price: 16.2,
  },
  {
    id: "pizza-carpaccio",
    name: "Carpaccio",
    category: "pizzas",
    description:
      "Huile d'olive, carpaccio de boeuf, tomates cerises, roquette, mozzarella, citron, copeaux parmesan",
    price: 16.7,
  },
  {
    id: "pizza-contadina",
    name: "Contadina",
    category: "pizzas",
    description:
      "Sauce tomate, carpaccio de boeuf, tomates cerises, roquette, burrata, huile d'olive,mozzarella, crème balsamique",
    price: 19.5,
    badge: "signature",
  },
  {
    id: "pizza-tartufo",
    name: "Tartufo",
    category: "pizzas",
    description:
      "Sur une base crème fraîche truffée, champignons, burrata fraîche, roquette, huile de truffes, copeaux de truffes",
    price: 22.5,
    badge: "signature",
  },
  {
    id: "pizza-pesto-stracciatella",
    name: "Pesto e stracciatella",
    category: "pizzas",
    description:
      "Pesto frais, tomates cerises, roquette, mozzarella, stracciatella, huile olives, crème balsamique",
    price: 17.5,
  },

  // ── Desserts ──
  {
    id: "dessert-tiramisu",
    name: "Tiramisu",
    category: "desserts",
    description: "",
    price: 7.9,
    badge: "popular",
  },
  {
    id: "dessert-delice",
    name: "Délice du moment",
    category: "desserts",
    description: "",
    price: 8.9,
    badge: "signature",
  },
  {
    id: "dessert-creme-brulee",
    name: "Crème brûlée",
    category: "desserts",
    description: "",
    price: 7.0,
  },
  {
    id: "dessert-bunet",
    name: "Bunet",
    category: "desserts",
    description: "flan typique du Piémont aux amarettis",
    price: 8.5,
  },
  {
    id: "dessert-dame-blanche",
    name: "Dame blanche",
    category: "desserts",
    description: "",
    price: 8.0,
  },
  {
    id: "dessert-chocolat-liegeois",
    name: "Chocolat liégeois",
    category: "desserts",
    description: "",
    price: 8.0,
  },
  {
    id: "dessert-cafe-liegeois",
    name: "Café liégeois",
    category: "desserts",
    description: "",
    price: 8.0,
  },
  {
    id: "dessert-glace-1",
    name: "Coupe de glace ou sorbet — 1 boule",
    category: "desserts",
    description: "",
    price: 2.9,
  },
  {
    id: "dessert-glace-2",
    name: "Coupe de glace — 2 boules",
    category: "desserts",
    description: "",
    price: 5.8,
  },
  {
    id: "dessert-affogato",
    name: "Affogato",
    category: "desserts",
    description: "",
    price: 5.2,
  },

  // ── Boissons ──
  {
    id: "boisson-aperol",
    name: "Apérol Spritz",
    category: "boissons",
    description: "",
    price: 9.5,
    badge: "popular",
  },
  {
    id: "boisson-prosecco",
    name: "Prosecco 10 cl",
    category: "boissons",
    description: "bio",
    price: 6.5,
  },
  {
    id: "boisson-hugo",
    name: "Hugo",
    category: "boissons",
    description: "",
    price: 9.5,
  },
  {
    id: "boisson-mojito-felicita",
    name: "Felicita",
    category: "boissons",
    description: "Fraise, citron, melon, gin, proscecco",
    price: 10.9,
    badge: "signature",
  },
  {
    id: "boisson-negroni",
    name: "Négroni",
    category: "boissons",
    description: "Campari, gin, martini rouge",
    price: 10.9,
  },
  {
    id: "boisson-limone-spritz",
    name: "Limone Spritz",
    category: "boissons",
    description: "Limoncello, eau pétillante, proscecco",
    price: 10.8,
  },
  {
    id: "boisson-biere-licorne",
    name: "Bière blonde Licorne 25 cl",
    category: "boissons",
    description: "",
    price: 4.2,
  },
  {
    id: "boisson-coca",
    name: "Coca-Cola 33 cl",
    category: "boissons",
    description: "",
    price: 3.9,
  },
  {
    id: "boisson-coca-zero",
    name: "Coca-Cola Zero 33 cl",
    category: "boissons",
    description: "",
    price: 3.9,
  },
  {
    id: "boisson-carola",
    name: "Carola 50 cl",
    category: "boissons",
    description: "Bleue, Verte",
    price: 3.5,
  },
  {
    id: "boisson-san-pellegrino",
    name: "San Pellegrino 50 cl",
    category: "boissons",
    description: "",
    price: 3.8,
  },
  {
    id: "boisson-jus",
    name: "Jus de fruits 25 cl",
    category: "boissons",
    description: "tomate, orange, fraise, mangue",
    price: 3.8,
  },
  {
    id: "boisson-expresso",
    name: "Expresso",
    category: "boissons",
    description: "",
    price: 2.4,
  },
  {
    id: "boisson-cappuccino",
    name: "Cappuccino",
    category: "boissons",
    description: "",
    price: 4.8,
  },
  {
    id: "boisson-limoncello",
    name: "Limoncello 4 cl",
    category: "boissons",
    description: "",
    price: 5.5,
  },
  {
    id: "boisson-grappa",
    name: "Grappa Nardini 4 cl",
    category: "boissons",
    description: "",
    price: 7.0,
  },

  // ── Vins ──
  {
    id: "vin-montepulciano",
    name: "Montepulciano",
    category: "vins",
    description: "Rouge — Verre 4,00 € · Demi 8,00 € · Bouteille 16,00 €.",
    price: 4.0,
  },
  {
    id: "vin-primitivo",
    name: "Primitivo Zola",
    category: "vins",
    description: "Rouge — Verre 5,50 € · Demi 11,00 € · Bouteille 22,00 €.",
    price: 5.5,
    badge: "popular",
  },
  {
    id: "vin-lambrusco",
    name: "Lambrusco",
    category: "vins",
    description: "Rouge — Verre 4,00 € · Demi 8,00 € · Bouteille 16,00 €.",
    price: 4.0,
  },
  {
    id: "vin-pinot-grigio",
    name: "Pinot Grigio",
    category: "vins",
    description: "Blanc — Verre 3,50 € · Demi 7,00 € · Bouteille 14,00 €.",
    price: 3.5,
  },
  {
    id: "vin-ciro",
    name: "Ciro",
    category: "vins",
    description: "Blanc (bio) — Verre 6,00 € · Demi 12,00 € · Bouteille 24,00 €.",
    price: 6.0,
    badge: "signature",
  },
  {
    id: "vin-frascati",
    name: "Frascati",
    category: "vins",
    description: "Blanc — Verre 4,00 € · Demi 8,00 € · Bouteille 16,00 €.",
    price: 4.0,
  },
  {
    id: "vin-bardolino",
    name: "Bardolino",
    category: "vins",
    description: "Rosé — Verre 3,50 € · Demi 7,00 € · Bouteille 14,00 €.",
    price: 3.5,
  },
  {
    id: "vin-prosecco-bulle",
    name: "Prosecco",
    category: "vins",
    description: "Bulles (bio) — Verre 6,50 € · Bouteille 36,00 €.",
    price: 6.5,
    badge: "popular",
  },
  {
    id: "vin-champagne",
    name: "Champagne",
    category: "vins",
    description: "Bulles — Verre 12,00 € · Bouteille 72,00 €.",
    price: 12.0,
    badge: "signature",
  },
  {
    id: "vin-moscato",
    name: "Moscato",
    category: "vins",
    description: "Bulles — Verre 6,50 € · Bouteille 36,00 €.",
    price: 6.5,
  },
];
