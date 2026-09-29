import { writeFileSync } from "node:fs";
import { MENU_ITEMS } from "../data/felicita-menu-salle";

type Loc = "en" | "de" | "it";

const NAMES: Record<string, Record<Loc, string>> = {
  "Ricard tomate 3cl": {
    en: "Ricard with tomato 3cl",
    de: "Ricard mit Tomate 3cl",
    it: "Ricard al pomodoro 3cl",
  },
  "Ricard 3cl": { en: "Ricard 3cl", de: "Ricard 3cl", it: "Ricard 3cl" },
  "Ricard perroquet 3cl": {
    en: "Ricard perroquet 3cl",
    de: "Ricard Perroquet 3cl",
    it: "Ricard perroquet 3cl",
  },
  "Vermouth (rouge/blanc) 4cl": {
    en: "Vermouth (red/white) 4cl",
    de: "Wermut (rot/weiß) 4cl",
    it: "Vermouth (rosso/bianco) 4cl",
  },
  "Porto (rouge/blanc) 6cl": {
    en: "Port (red/white) 6cl",
    de: "Portwein (rot/weiß) 6cl",
    it: "Porto (rosso/bianco) 6cl",
  },
  "Campari 4cl": { en: "Campari 4cl", de: "Campari 4cl", it: "Campari 4cl" },
  "Blanc (cassis, pêche, mûre) 10cl": {
    en: "White wine (blackcurrant, peach, blackberry) 10cl",
    de: "Weißwein (Cassis, Pfirsich, Brombeere) 10cl",
    it: "Bianco (ribes nero, pesca, mora) 10cl",
  },
  "Prosecco (cassis, pêche, mûre) 10cl": {
    en: "Prosecco (blackcurrant, peach, blackberry) 10cl",
    de: "Prosecco (Cassis, Pfirsich, Brombeere) 10cl",
    it: "Prosecco (ribes nero, pesca, mora) 10cl",
  },
  "Apérol Spritz": { en: "Aperol Spritz", de: "Aperol Spritz", it: "Aperol Spritz" },
  "Prosecco 10cl (bio)": {
    en: "Prosecco 10cl (organic)",
    de: "Prosecco 10cl (bio)",
    it: "Prosecco 10cl (biologico)",
  },
  "Moscato 10cl": { en: "Moscato 10cl", de: "Moscato 10cl", it: "Moscato 10cl" },
  "Get 27 4cl": { en: "Get 27 4cl", de: "Get 27 4cl", it: "Get 27 4cl" },
  "Suze 4cl": { en: "Suze 4cl", de: "Suze 4cl", it: "Suze 4cl" },
  "Hugo 16cl": { en: "Hugo 16cl", de: "Hugo 16cl", it: "Hugo 16cl" },
  "Bière Blonde Licorne 25cl": {
    en: "Licorne Blonde beer 25cl",
    de: "Licorne Blondbier 25cl",
    it: "Birra bionda Licorne 25cl",
  },
  "Bière du moment 25cl": {
    en: "Beer of the moment 25cl",
    de: "Bier des Moments 25cl",
    it: "Birra del momento 25cl",
  },
  "Monaco 25cl": { en: "Monaco 25cl", de: "Monaco 25cl", it: "Monaco 25cl" },
  "Picon Bière 25cl": {
    en: "Picon beer 25cl",
    de: "Picon Bier 25cl",
    it: "Picon birra 25cl",
  },
  "Cynar 25cl": { en: "Cynar 25cl", de: "Cynar 25cl", it: "Cynar 25cl" },
  "Panaché 25cl": { en: "Shandy 25cl", de: "Radler 25cl", it: "Panaché 25cl" },
  "Façon Mojitos": { en: "Mojito-style", de: "Mojito-Art", it: "Alla Mojito" },
  Felicita: { en: "Felicita", de: "Felicita", it: "Felicita" },
  Négronis: { en: "Negroni", de: "Negroni", it: "Negroni" },
  "Limone Spritz": { en: "Limone Spritz", de: "Limone Spritz", it: "Limone Spritz" },
  "Carola Bleue, Verte 50cl": {
    en: "Carola Blue or Green 50cl",
    de: "Carola Blau oder Grün 50cl",
    it: "Carola Blu o Verde 50cl",
  },
  "Carola Bleue 100cl": {
    en: "Carola Blue 100cl",
    de: "Carola Blau 100cl",
    it: "Carola Blu 100cl",
  },
  "San Pellegrino 50cl": {
    en: "San Pellegrino 50cl",
    de: "San Pellegrino 50cl",
    it: "San Pellegrino 50cl",
  },
  "San Pellegrino 100cl": {
    en: "San Pellegrino 100cl",
    de: "San Pellegrino 100cl",
    it: "San Pellegrino 100cl",
  },
  "Jus de fruits 25cl": {
    en: "Fruit juice 25cl",
    de: "Fruchtsaft 25cl",
    it: "Succo di frutta 25cl",
  },
  "Coca 33cl": { en: "Coca-Cola 33cl", de: "Coca-Cola 33cl", it: "Coca-Cola 33cl" },
  "Coca Zero 33cl": {
    en: "Coca-Cola Zero 33cl",
    de: "Coca-Cola Zero 33cl",
    it: "Coca-Cola Zero 33cl",
  },
  Fanta: { en: "Fanta", de: "Fanta", it: "Fanta" },
  "Schweppes Tonic": {
    en: "Schweppes Tonic",
    de: "Schweppes Tonic",
    it: "Schweppes Tonic",
  },
  "Fuze Tea 25cl": { en: "Fuze Tea 25cl", de: "Fuze Tea 25cl", it: "Fuze Tea 25cl" },
  "Limonade 25cl": { en: "Lemonade 25cl", de: "Limonade 25cl", it: "Limonata 25cl" },
  "Sirop à l'eau 25cl": {
    en: "Syrup with water 25cl",
    de: "Sirup mit Wasser 25cl",
    it: "Sciroppo con acqua 25cl",
  },
  "Diabolo 25cl": { en: "Diabolo 25cl", de: "Diabolo 25cl", it: "Diabolo 25cl" },
  "Perrier 33cl": { en: "Perrier 33cl", de: "Perrier 33cl", it: "Perrier 33cl" },
  "Assiette de salaisons italiennes (2 personnes)": {
    en: "Italian cured meats platter (for 2)",
    de: "Italienische Aufschnittplatte (für 2 Personen)",
    it: "Tagliere di salumi italiani (per 2)",
  },
  "Carpaccio de bœuf": {
    en: "Beef carpaccio",
    de: "Rinds-Carpaccio",
    it: "Carpaccio di manzo",
  },
  "Pomodore e Burrata": {
    en: "Pomodore e Burrata",
    de: "Pomodore e Burrata",
    it: "Pomodori e Burrata",
  },
  "Bruchetta al pomodore (2 personnes)": {
    en: "Tomato bruschetta (for 2)",
    de: "Tomaten-Bruschetta (für 2 Personen)",
    it: "Bruschetta al pomodoro (per 2)",
  },
  "Bruchetta du moment (2 personnes)": {
    en: "Bruschetta of the moment (for 2)",
    de: "Bruschetta des Moments (für 2 Personen)",
    it: "Bruschetta del momento (per 2)",
  },
  "Pizzetta Bianca": {
    en: "Pizzetta Bianca",
    de: "Pizzetta Bianca",
    it: "Pizzetta Bianca",
  },
  "Pizzetta mozzarella": {
    en: "Mozzarella pizzetta",
    de: "Mozzarella-Pizzetta",
    it: "Pizzetta mozzarella",
  },
  "Salade César": { en: "Caesar salad", de: "Caesar-Salat", it: "Insalata Caesar" },
  "Salmone et Chèvre frit": {
    en: "Smoked salmon & fried goat cheese",
    de: "Räucherlachs & frittierter Ziegenkäse",
    it: "Salmone e caprino fritto",
  },
  "Salade tiède calamars et scampis": {
    en: "Warm squid & scampi salad",
    de: "Warmer Calamari- und Scampi-Salat",
    it: "Insalata tiepida di calamari e scampi",
  },
  "Antipasti et Burrata": {
    en: "Antipasti & Burrata",
    de: "Antipasti & Burrata",
    it: "Antipasti e Burrata",
  },
  "Faux filet de bœuf grillé — beurre maître d'hôtel": {
    en: "Grilled sirloin steak — maître d'hôtel butter",
    de: "Gegrilltes Rumpsteak — Maître-d'hôtel-Butter",
    it: "Controfiletto di manzo alla griglia — burro maître d'hôtel",
  },
  "Faux filet de bœuf grillé — sauce Gorgonzola": {
    en: "Grilled sirloin steak — Gorgonzola sauce",
    de: "Gegrilltes Rumpsteak — Gorgonzola-Sauce",
    it: "Controfiletto di manzo alla griglia — salsa Gorgonzola",
  },
  "Milanaise de bœuf fromage Taleggio et jambon St-Daniel": {
    en: "Beef Milanese with Taleggio & San Daniele ham",
    de: "Rinds-Milanesa mit Taleggio & San-Daniele-Schinken",
    it: "Cotoletta di manzo alla milanese con Taleggio e prosciutto San Daniele",
  },
  "Milanaise de veau": {
    en: "Veal Milanese",
    de: "Kalbs-Milanesa",
    it: "Cotoletta di vitello alla milanese",
  },
  "Saltimbocca alla romana": {
    en: "Saltimbocca alla romana",
    de: "Saltimbocca alla romana",
    it: "Saltimbocca alla romana",
  },
  "Supplément sauce": {
    en: "Extra sauce",
    de: "Sauce extra",
    it: "Supplemento salsa",
  },
  "Supplément accompagnement": {
    en: "Extra side",
    de: "Beilage extra",
    it: "Supplemento contorno",
  },
  "Supplément salade verte": {
    en: "Extra green salad",
    de: "Grüner Salat extra",
    it: "Supplemento insalata verde",
  },
  "Poissons du jour": {
    en: "Fish of the day",
    de: "Fisch des Tages",
    it: "Pesce del giorno",
  },
  "Linguini alla crema e pancetta": {
    en: "Linguini alla crema e pancetta",
    de: "Linguini alla crema e pancetta",
    it: "Linguine alla crema e pancetta",
  },
  "Linguini al pesto": {
    en: "Linguini al pesto",
    de: "Linguini al pesto",
    it: "Linguine al pesto",
  },
  "Linguini alle vongole": {
    en: "Linguini alle vongole",
    de: "Linguini alle vongole",
    it: "Linguine alle vongole",
  },
  "Linguini ai frutti di mare": {
    en: "Linguini ai frutti di mare",
    de: "Linguini ai frutti di mare",
    it: "Linguine ai frutti di mare",
  },
  "Linguini al salmone": {
    en: "Linguini al salmone",
    de: "Linguini al salmone",
    it: "Linguine al salmone",
  },
  "Fusilli all'arrabbiata": {
    en: "Fusilli all'arrabbiata",
    de: "Fusilli all'arrabbiata",
    it: "Fusilli all'arrabbiata",
  },
  "Fusilli al pomodoro": {
    en: "Fusilli al pomodoro",
    de: "Fusilli al pomodoro",
    it: "Fusilli al pomodoro",
  },
  "Fusilli pollo e marsala": {
    en: "Fusilli pollo e marsala",
    de: "Fusilli pollo e marsala",
    it: "Fusilli pollo e marsala",
  },
  "Rigatoni al matriciana": {
    en: "Rigatoni alla matriciana",
    de: "Rigatoni alla matriciana",
    it: "Rigatoni alla matriciana",
  },
  "Rigatoni tre fromaggi": {
    en: "Rigatoni tre formaggi",
    de: "Rigatoni tre formaggi",
    it: "Rigatoni tre formaggi",
  },
  "Rigatoni al pollo curry": {
    en: "Rigatoni al pollo curry",
    de: "Rigatoni al pollo curry",
    it: "Rigatoni al pollo curry",
  },
  "Rigatoni méditerranea": {
    en: "Rigatoni mediterranea",
    de: "Rigatoni mediterranea",
    it: "Rigatoni mediterranea",
  },
  "Ravioles ricotta spinaci et gorgonzola": {
    en: "Ricotta & spinach ravioli with Gorgonzola",
    de: "Ricotta-Spinat-Ravioli mit Gorgonzola",
    it: "Ravioli ricotta e spinaci al gorgonzola",
  },
  "Ravioles truffées": {
    en: "Truffle ravioli",
    de: "Trüffel-Ravioli",
    it: "Ravioli al tartufo",
  },
  "Tortellini zingara": {
    en: "Tortellini zingara",
    de: "Tortellini zingara",
    it: "Tortellini zingara",
  },
  "Tortellini carne e funghi": {
    en: "Tortellini carne e funghi",
    de: "Tortellini carne e funghi",
    it: "Tortellini carne e funghi",
  },
  "Menu bambino + boule de glace": {
    en: "Kids’ menu + scoop of ice cream",
    de: "Kindermenü + Kugel Eis",
    it: "Menu bambino + pallina di gelato",
  },
  Margherita: { en: "Margherita", de: "Margherita", it: "Margherita" },
  Regina: { en: "Regina", de: "Regina", it: "Regina" },
  Méditerranea: { en: "Mediterranea", de: "Mediterranea", it: "Mediterranea" },
  "Quattro fromaggi": {
    en: "Quattro formaggi",
    de: "Quattro formaggi",
    it: "Quattro formaggi",
  },
  Carbonara: { en: "Carbonara", de: "Carbonara", it: "Carbonara" },
  Napoletana: { en: "Napoletana", de: "Napoletana", it: "Napoletana" },
  Calabrese: { en: "Calabrese", de: "Calabrese", it: "Calabrese" },
  Salmone: { en: "Salmone", de: "Salmone", it: "Salmone" },
  Chorizo: { en: "Chorizo", de: "Chorizo", it: "Chorizo" },
  "Chèvre miel": {
    en: "Goat cheese & honey",
    de: "Ziegenkäse & Honig",
    it: "Caprino e miele",
  },
  "Pollo rustico": {
    en: "Pollo rustico",
    de: "Pollo rustico",
    it: "Pollo rustico",
  },
  "Frutti di mare": {
    en: "Frutti di mare",
    de: "Frutti di mare",
    it: "Frutti di mare",
  },
  "Supplément ingrédient": {
    en: "Extra topping",
    de: "Belag extra",
    it: "Supplemento ingrediente",
  },
  "Supplément ingrédient charcuterie": {
    en: "Extra cured-meat topping",
    de: "Aufschnitt-Belag extra",
    it: "Supplemento salume",
  },
  "Supplément burrata": {
    en: "Extra burrata",
    de: "Burrata extra",
    it: "Supplemento burrata",
  },
  "La Romana": { en: "La Romana", de: "La Romana", it: "La Romana" },
  Prosciutto: { en: "Prosciutto", de: "Prosciutto", it: "Prosciutto" },
  Carpaccio: { en: "Carpaccio", de: "Carpaccio", it: "Carpaccio" },
  Contadina: { en: "Contadina", de: "Contadina", it: "Contadina" },
  Tartufo: { en: "Tartufo", de: "Tartufo", it: "Tartufo" },
  "Pesto e stracciatella": {
    en: "Pesto e stracciatella",
    de: "Pesto e stracciatella",
    it: "Pesto e stracciatella",
  },
  Tiramisu: { en: "Tiramisu", de: "Tiramisu", it: "Tiramisù" },
  "Délice du moment": {
    en: "Dessert of the moment",
    de: "Dessert des Moments",
    it: "Dolce del momento",
  },
  "Crème brûlée": { en: "Crème brûlée", de: "Crème brûlée", it: "Crème brûlée" },
  Bunet: { en: "Bunet", de: "Bunet", it: "Bunet" },
  "Dame blanche": { en: "Dame blanche", de: "Dame blanche", it: "Dame blanche" },
  "Chocolat liégeois": {
    en: "Chocolate Liégeois",
    de: "Chocolat liégeois",
    it: "Cioccolato liègeois",
  },
  "Café liégeois": {
    en: "Coffee Liégeois",
    de: "Café liégeois",
    it: "Caffè liègeois",
  },
  "Coupe de glace ou sorbet 1 boule": {
    en: "Ice cream or sorbet — 1 scoop",
    de: "Eis oder Sorbet — 1 Kugel",
    it: "Gelato o sorbetto — 1 pallina",
  },
  "Coupe 2 boules": { en: "2 scoops", de: "2 Kugeln", it: "2 palline" },
  Affogato: { en: "Affogato", de: "Affogato", it: "Affogato" },
  Expresso: { en: "Espresso", de: "Espresso", it: "Espresso" },
  Décaféiné: { en: "Decaf coffee", de: "Entkoffeiniert", it: "Decaffeinato" },
  "Café allongé": {
    en: "Americano",
    de: "Verlängerter Kaffee",
    it: "Caffè lungo",
  },
  "Latte macchiato": {
    en: "Latte macchiato",
    de: "Latte macchiato",
    it: "Latte macchiato",
  },
  Cappuccino: { en: "Cappuccino", de: "Cappuccino", it: "Cappuccino" },
  "Thé ou infusion": {
    en: "Tea or herbal infusion",
    de: "Tee oder Kräutertee",
    it: "Tè o tisana",
  },
  "Irish coffee": { en: "Irish coffee", de: "Irish Coffee", it: "Irish coffee" },
  "Vodka 4cl": { en: "Vodka 4cl", de: "Wodka 4cl", it: "Vodka 4cl" },
  "Gin Bombay 4cl": {
    en: "Bombay Gin 4cl",
    de: "Bombay Gin 4cl",
    it: "Gin Bombay 4cl",
  },
  "Amaretto 4cl": { en: "Amaretto 4cl", de: "Amaretto 4cl", it: "Amaretto 4cl" },
  "Limoncello 4cl": {
    en: "Limoncello 4cl",
    de: "Limoncello 4cl",
    it: "Limoncello 4cl",
  },
  "Cognac XO 4cl": { en: "Cognac XO 4cl", de: "Cognac XO 4cl", it: "Cognac XO 4cl" },
  "Grappa Nardini 4cl": {
    en: "Grappa Nardini 4cl",
    de: "Grappa Nardini 4cl",
    it: "Grappa Nardini 4cl",
  },
  "Framboise 4cl": {
    en: "Raspberry eau-de-vie 4cl",
    de: "Himbeergeist 4cl",
    it: "Acquavite di lampone 4cl",
  },
  "Mirabelle 4cl": {
    en: "Mirabelle eau-de-vie 4cl",
    de: "Mirabellenbrand 4cl",
    it: "Acquavite di mirabella 4cl",
  },
  "Poire Williams 4cl": {
    en: "Poire Williams 4cl",
    de: "Williams-Birne 4cl",
    it: "Pere Williams 4cl",
  },
  "Marc de Gewurztraminer 4cl": {
    en: "Gewurztraminer marc 4cl",
    de: "Gewurztraminer-Tresterbrand 4cl",
    it: "Acquavite di Gewurztraminer 4cl",
  },
  "Rhum Don Papa 4cl": {
    en: "Don Papa rum 4cl",
    de: "Don Papa Rum 4cl",
    it: "Rum Don Papa 4cl",
  },
  "Ramazzotti 4cl": {
    en: "Ramazzotti 4cl",
    de: "Ramazzotti 4cl",
    it: "Ramazzotti 4cl",
  },
  "Jack Daniel's 4cl": {
    en: "Jack Daniel's 4cl",
    de: "Jack Daniel's 4cl",
    it: "Jack Daniel's 4cl",
  },
  "Montepulciano (rouge)": {
    en: "Montepulciano (red)",
    de: "Montepulciano (rot)",
    it: "Montepulciano (rosso)",
  },
  "Emozionne (rouge)": {
    en: "Emozionne (red)",
    de: "Emozionne (rot)",
    it: "Emozionne (rosso)",
  },
  "Nero d'Avola (rouge)": {
    en: "Nero d'Avola (red)",
    de: "Nero d'Avola (rot)",
    it: "Nero d'Avola (rosso)",
  },
  "Lambrusco (rouge)": {
    en: "Lambrusco (red)",
    de: "Lambrusco (rot)",
    it: "Lambrusco (rosso)",
  },
  "Primitivo Zola (rouge)": {
    en: "Primitivo Zola (red)",
    de: "Primitivo Zola (rot)",
    it: "Primitivo Zola (rosso)",
  },
  "Montesenano (rouge)": {
    en: "Montesenano (red)",
    de: "Montesenano (rot)",
    it: "Montesenano (rosso)",
  },
  "Miraggio terra siciliana (rouge)": {
    en: "Miraggio terra siciliana (red)",
    de: "Miraggio terra siciliana (rot)",
    it: "Miraggio terra siciliana (rosso)",
  },
  "Edizione (cuvée spéciale, rouge)": {
    en: "Edizione (special cuvée, red)",
    de: "Edizione (Spezialcuvée, rot)",
    it: "Edizione (cuvée speciale, rosso)",
  },
  "Pinot Grigio (blanc)": {
    en: "Pinot Grigio (white)",
    de: "Pinot Grigio (weiß)",
    it: "Pinot Grigio (bianco)",
  },
  "Frascati (blanc)": {
    en: "Frascati (white)",
    de: "Frascati (weiß)",
    it: "Frascati (bianco)",
  },
  "Cirò bio (blanc)": {
    en: "Cirò organic (white)",
    de: "Cirò bio (weiß)",
    it: "Cirò biologico (bianco)",
  },
  "Chardonnay (blanc)": {
    en: "Chardonnay (white)",
    de: "Chardonnay (weiß)",
    it: "Chardonnay (bianco)",
  },
  "Vernaccia (blanc)": {
    en: "Vernaccia (white)",
    de: "Vernaccia (weiß)",
    it: "Vernaccia (bianco)",
  },
  "Bardolino (rosé)": {
    en: "Bardolino (rosé)",
    de: "Bardolino (Rosé)",
    it: "Bardolino (rosato)",
  },
  "Negro Amaro Rosato (rosé)": {
    en: "Negro Amaro Rosato (rosé)",
    de: "Negro Amaro Rosato (Rosé)",
    it: "Negro Amaro Rosato",
  },
  "Unanotte (rosé)": {
    en: "Unanotte (rosé)",
    de: "Unanotte (Rosé)",
    it: "Unanotte (rosato)",
  },
  "Château Font du Broc bio (rosé)": {
    en: "Château Font du Broc organic (rosé)",
    de: "Château Font du Broc bio (Rosé)",
    it: "Château Font du Broc biologico (rosato)",
  },
  Champagne: { en: "Champagne", de: "Champagne", it: "Champagne" },
  Moscato: { en: "Moscato", de: "Moscato", it: "Moscato" },
  "Prosecco bio": {
    en: "Organic Prosecco",
    de: "Bio-Prosecco",
    it: "Prosecco biologico",
  },
};

const DESCS: Record<string, Record<Loc, string>> = {
  "Gin, sirop mojitos, menthe fraîche, prosecco": {
    en: "Gin, mojito syrup, fresh mint, Prosecco",
    de: "Gin, Mojito-Sirup, frische Minze, Prosecco",
    it: "Gin, sciroppo mojito, menta fresca, prosecco",
  },
  "Fraise, citron, melon, gin, prosecco": {
    en: "Strawberry, lemon, melon, gin, Prosecco",
    de: "Erdbeere, Zitrone, Melone, Gin, Prosecco",
    it: "Fragola, limone, melone, gin, prosecco",
  },
  "Campari, gin, martini rouge": {
    en: "Campari, gin, red Martini",
    de: "Campari, Gin, roter Martini",
    it: "Campari, gin, Martini rosso",
  },
  "Limoncello, eau pétillante, prosecco": {
    en: "Limoncello, sparkling water, Prosecco",
    de: "Limoncello, Sprudelwasser, Prosecco",
    it: "Limoncello, acqua frizzante, prosecco",
  },
  "Tomate, orange, fraise, mangue": {
    en: "Tomato, orange, strawberry, mango",
    de: "Tomate, Orange, Erdbeere, Mango",
    it: "Pomodoro, arancia, fragola, mango",
  },
  "Assortiment de charcuteries italiennes, fromages et antipasti": {
    en: "Selection of Italian cured meats, cheeses and antipasti",
    de: "Auswahl italienischer Aufschnitte, Käse und Antipasti",
    it: "Selezione di salumi italiani, formaggi e antipasti",
  },
  "Roquette, tomates cerises, copeaux de parmesan, huile olive, accompagné de sa pizza blanche":
    {
      en: "Rocket, cherry tomatoes, Parmesan shavings, olive oil, served with white pizza",
      de: "Rucola, Kirschtomaten, Parmesanhobel, Olivenöl, serviert mit weißer Pizza",
      it: "Rucola, pomodorini, scaglie di parmigiano, olio d'oliva, accompagnato dalla sua pizza bianca",
    },
  "Tomates cerises, basilic, burrata fraîche, huile d'olive, origan, vinaigre balsamique":
    {
      en: "Cherry tomatoes, basil, fresh burrata, olive oil, oregano, balsamic vinegar",
      de: "Kirschtomaten, Basilikum, frische Burrata, Olivenöl, Oregano, Balsamico",
      it: "Pomodorini, basilico, burrata fresca, olio d'oliva, origano, aceto balsamico",
    },
  "Dés de tomates, ail, basilic, origan, copeaux de parmesan": {
    en: "Diced tomatoes, garlic, basil, oregano, Parmesan shavings",
    de: "Tomatenwürfel, Knoblauch, Basilikum, Oregano, Parmesanhobel",
    it: "Pomodori a dadini, aglio, basilico, origano, scaglie di parmigiano",
  },
  "Ingrédients selon inspiration du chef": {
    en: "Ingredients following the chef’s inspiration",
    de: "Zutaten nach Inspiration des Küchenchefs",
    it: "Ingredienti secondo l'ispirazione dello chef",
  },
  "Origan, huile d'olive": {
    en: "Oregano, olive oil",
    de: "Oregano, Olivenöl",
    it: "Origano, olio d'oliva",
  },
  "Filet de poulet, crudités, vinaigrette, copeaux de parmesan, crème balsamique, croûtons":
    {
      en: "Chicken fillet, fresh vegetables, vinaigrette, Parmesan shavings, balsamic cream, croutons",
      de: "Hähnchenfilet, Rohkost, Vinaigrette, Parmesanhobel, Balsamicocreme, Croutons",
      it: "Petto di pollo, verdure crude, vinaigrette, scaglie di parmigiano, crema di balsamico, crostini",
    },
  "Saumon fumé, chèvre frit, tomates cerises, crudités, oignons rouges, vinaigrette":
    {
      en: "Smoked salmon, fried goat cheese, cherry tomatoes, fresh vegetables, red onions, vinaigrette",
      de: "Räucherlachs, frittierter Ziegenkäse, Kirschtomaten, Rohkost, rote Zwiebeln, Vinaigrette",
      it: "Salmone affumicato, caprino fritto, pomodorini, verdure crude, cipolle rosse, vinaigrette",
    },
  "Calamars et crevettes, crudités, tomates cerises, huile citronnée, herbes fraîches":
    {
      en: "Squid and prawns, fresh vegetables, cherry tomatoes, lemon oil, fresh herbs",
      de: "Calamari und Garnelen, Rohkost, Kirschtomaten, Zitronenöl, frische Kräuter",
      it: "Calamari e gamberetti, verdure crude, pomodorini, olio al limone, erbe fresche",
    },
  "Tomates séchées, tomates cerises, mini artichauts, olives, julienne d'aubergines confites, crudités, huile d'olive, vinaigre balsamique, burrata fraîche":
    {
      en: "Sun-dried tomatoes, cherry tomatoes, baby artichokes, olives, candied aubergine strips, fresh vegetables, olive oil, balsamic vinegar, fresh burrata",
      de: "Getrocknete Tomaten, Kirschtomaten, Mini-Artischocken, Oliven, kandierte Auberginenstreifen, Rohkost, Olivenöl, Balsamico, frische Burrata",
      it: "Pomodori secchi, pomodorini, mini carciofi, olive, julienne di melanzane confit, verdure crude, olio d'oliva, aceto balsamico, burrata fresca",
    },
  "Gratinée au four, accompagnée d'une petite sauce tomate onctueuse": {
    en: "Oven-gratinéed, served with a small creamy tomato sauce",
    de: "Im Ofen überbacken, serviert mit einer kleinen cremigen Tomatensauce",
    it: "Gratinata al forno, accompagnata da una piccola salsa di pomodoro cremosa",
  },
  "Escalope de veau panée, croustillante et dorée, servie avec un accompagnement au choix":
    {
      en: "Breaded veal escalope, crisp and golden, served with a side of your choice",
      de: "Panierte Kalbsschnitzel, knusprig und goldbraun, mit Beilage nach Wahl",
      it: "Scaloppina di vitello impanata, croccante e dorata, servita con contorno a scelta",
    },
  "Médaillon de veau, sauge, mozzarella, jambon St-Daniel, sauce au beurre citronnée":
    {
      en: "Veal medallion, sage, mozzarella, San Daniele ham, lemon butter sauce",
      de: "Kalbsmedaillon, Salbei, Mozzarella, San-Daniele-Schinken, Zitronenbutter-Sauce",
      it: "Medaglione di vitello, salvia, mozzarella, prosciutto San Daniele, salsa al burro limonato",
    },
  "Crème champignons, gorgonzola ou tomate": {
    en: "Mushroom cream, Gorgonzola or tomato",
    de: "Pilzcreme, Gorgonzola oder Tomate",
    it: "Crema di funghi, gorgonzola o pomodoro",
  },
  "Pâtes, légumes du moment, frites ou salade verte": {
    en: "Pasta, seasonal vegetables, fries or green salad",
    de: "Pasta, Gemüse des Moments, Pommes oder grüner Salat",
    it: "Pasta, verdure del momento, patatine o insalata verde",
  },
  "Merci de consulter le tableau de suggestions ou notre service en salle. Accompagnements : pâtes, légumes du moment, frites, salade verte":
    {
      en: "Please check the specials board or ask our team. Sides: pasta, seasonal vegetables, fries, green salad",
      de: "Bitte schauen Sie auf die Empfehlungstafel oder fragen Sie unser Team. Beilagen: Pasta, Gemüse des Moments, Pommes, grüner Salat",
      it: "Consultate il tabellone dei suggerimenti o il nostro servizio in sala. Contorni: pasta, verdure del momento, patatine, insalata verde",
    },
  "Lardons fumés, crème, jaune d'œuf, parmesan": {
    en: "Smoked bacon lardons, cream, egg yolk, Parmesan",
    de: "Geräucherter Speck, Sahne, Eigelb, Parmesan",
    it: "Pancetta affumicata, panna, tuorlo d'uovo, parmigiano",
  },
  "Pesto frais, pignons de pin, ail": {
    en: "Fresh pesto, pine nuts, garlic",
    de: "Frisches Pesto, Pinienkerne, Knoblauch",
    it: "Pesto fresco, pinoli, aglio",
  },
  "Fumet de crustacés, coques décoquillées, palourdes, herbes fraîches, huile citronnée":
    {
      en: "Shellfish stock, shelled cockles, clams, fresh herbs, lemon oil",
      de: "Krustentierfond, ausgelöste Herzmuscheln, Venusmuscheln, frische Kräuter, Zitronenöl",
      it: "Fumetto di crostacei, cannolicchi sgusciati, vongole, erbe fresche, olio al limone",
    },
  "Tomates, fumet de crustacés, moules, calamars, gambas, ail, herbes fraîches, huile citronnée":
    {
      en: "Tomatoes, shellfish stock, mussels, squid, prawns, garlic, fresh herbs, lemon oil",
      de: "Tomaten, Krustentierfond, Miesmuscheln, Calamari, Gambas, Knoblauch, frische Kräuter, Zitronenöl",
      it: "Pomodori, fumetto di crostacei, cozze, calamari, gamberi, aglio, erbe fresche, olio al limone",
    },
  "Saumon frais, courgettes, carottes, oignons, crème fraîche, ail, jus de citron":
    {
      en: "Fresh salmon, courgettes, carrots, onions, cream, garlic, lemon juice",
      de: "Frischer Lachs, Zucchini, Karotten, Zwiebeln, Crème fraîche, Knoblauch, Zitronensaft",
      it: "Salmone fresco, zucchine, carote, cipolle, panna fresca, aglio, succo di limone",
    },
  "Sauce tomate, olive, piment, champignons, câpres, herbes fraîches, ail": {
    en: "Tomato sauce, olives, chilli, mushrooms, capers, fresh herbs, garlic",
    de: "Tomatensauce, Oliven, Chili, Pilze, Kapern, frische Kräuter, Knoblauch",
    it: "Salsa di pomodoro, olive, peperoncino, funghi, capperi, erbe fresche, aglio",
  },
  "Sauce tomate, ail, basilic": {
    en: "Tomato sauce, garlic, basil",
    de: "Tomatensauce, Knoblauch, Basilikum",
    it: "Salsa di pomodoro, aglio, basilico",
  },
  "Poulet émincé, champignons, crème, ail, marsala, herbes fraîches": {
    en: "Sliced chicken, mushrooms, cream, garlic, Marsala, fresh herbs",
    de: "Hähnchenstreifen, Pilze, Sahne, Knoblauch, Marsala, frische Kräuter",
    it: "Pollo a striscioline, funghi, panna, aglio, marsala, erbe fresche",
  },
  "Sauce tomate, lard, champignons, crème, ail, origan": {
    en: "Tomato sauce, bacon, mushrooms, cream, garlic, oregano",
    de: "Tomatensauce, Speck, Pilze, Sahne, Knoblauch, Oregano",
    it: "Salsa di pomodoro, guanciale, funghi, panna, aglio, origano",
  },
  "Oignons, gorgonzola, taleggio, parmesan, crème, ail, herbes fraîches, pignons de pin":
    {
      en: "Onions, Gorgonzola, Taleggio, Parmesan, cream, garlic, fresh herbs, pine nuts",
      de: "Zwiebeln, Gorgonzola, Taleggio, Parmesan, Sahne, Knoblauch, frische Kräuter, Pinienkerne",
      it: "Cipolle, gorgonzola, taleggio, parmigiano, panna, aglio, erbe fresche, pinoli",
    },
  "Crème, poulet, champignons, ail, curry, herbes fraîches": {
    en: "Cream, chicken, mushrooms, garlic, curry, fresh herbs",
    de: "Sahne, Hähnchen, Pilze, Knoblauch, Curry, frische Kräuter",
    it: "Panna, pollo, funghi, aglio, curry, erbe fresche",
  },
  "Sauce tomate, oignons, poivrons, courgettes, aubergines, olives noires, ail, herbes fraîches":
    {
      en: "Tomato sauce, onions, peppers, courgettes, aubergines, black olives, garlic, fresh herbs",
      de: "Tomatensauce, Zwiebeln, Paprika, Zucchini, Auberginen, schwarze Oliven, Knoblauch, frische Kräuter",
      it: "Salsa di pomodoro, cipolle, peperoni, zucchine, melanzane, olive nere, aglio, erbe fresche",
    },
  "Crème fraîche, épinards, gorgonzola, ricotta, base aromatique, noix": {
    en: "Cream, spinach, Gorgonzola, ricotta, aromatic base, walnuts",
    de: "Crème fraîche, Spinat, Gorgonzola, Ricotta, aromatische Basis, Walnüsse",
    it: "Panna fresca, spinaci, gorgonzola, ricotta, base aromatica, noci",
  },
  "Crème fraîche, champignons, tartufata, lamelles de truffe, herbes fraîches, pignons de pin":
    {
      en: "Cream, mushrooms, tartufata, truffle slices, fresh herbs, pine nuts",
      de: "Crème fraîche, Pilze, Tartufata, Trüffelscheiben, frische Kräuter, Pinienkerne",
      it: "Panna fresca, funghi, tartufata, lamelle di tartufo, erbe fresche, pinoli",
    },
  "Tortellini farcis au bœuf, crème fraîche, sauce tomate, chorizo, champignons, olives noires, ail, origan":
    {
      en: "Beef-filled tortellini, cream, tomato sauce, chorizo, mushrooms, black olives, garlic, oregano",
      de: "Mit Rindfleisch gefüllte Tortellini, Crème fraîche, Tomatensauce, Chorizo, Pilze, schwarze Oliven, Knoblauch, Oregano",
      it: "Tortellini ripieni di manzo, panna fresca, salsa di pomodoro, chorizo, funghi, olive nere, aglio, origano",
    },
  "Tortellini farcis au bœuf, crème, champignons, ail": {
    en: "Beef-filled tortellini, cream, mushrooms, garlic",
    de: "Mit Rindfleisch gefüllte Tortellini, Sahne, Pilze, Knoblauch",
    it: "Tortellini ripieni di manzo, panna, funghi, aglio",
  },
  "-12 ans — Penne sauce tomate ou crème champignons, ou nuggets/frites, ou demi-pizza Marguerite / Reine / Jambon":
    {
      en: "Under 12 — penne with tomato or mushroom cream sauce, or nuggets & fries, or half pizza Margherita / Regina / Ham",
      de: "Unter 12 Jahren — Penne mit Tomaten- oder Pilzcremesauce, oder Nuggets/Pommes, oder halbe Pizza Margherita / Regina / Schinken",
      it: "Sotto i 12 anni — penne al pomodoro o crema di funghi, oppure nuggets/patatine, oppure mezza pizza Margherita / Regina / Prosciutto",
    },
  "Sauce tomate, mozzarella, origan": {
    en: "Tomato sauce, mozzarella, oregano",
    de: "Tomatensauce, Mozzarella, Oregano",
    it: "Salsa di pomodoro, mozzarella, origano",
  },
  "Sauce tomate, jambon, champignons, mozzarella, origan": {
    en: "Tomato sauce, ham, mushrooms, mozzarella, oregano",
    de: "Tomatensauce, Schinken, Pilze, Mozzarella, Oregano",
    it: "Salsa di pomodoro, prosciutto, funghi, mozzarella, origano",
  },
  "Sauce tomate, oignons, poivrons, courgettes, aubergines, olives noires, herbes fraîches, mozzarella":
    {
      en: "Tomato sauce, onions, peppers, courgettes, aubergines, black olives, fresh herbs, mozzarella",
      de: "Tomatensauce, Zwiebeln, Paprika, Zucchini, Auberginen, schwarze Oliven, frische Kräuter, Mozzarella",
      it: "Salsa di pomodoro, cipolle, peperoni, zucchine, melanzane, olive nere, erbe fresche, mozzarella",
    },
  "Sauce tomate, gorgonzola, chèvre, mozzarella, parmesan, herbes fraîches": {
    en: "Tomato sauce, Gorgonzola, goat cheese, mozzarella, Parmesan, fresh herbs",
    de: "Tomatensauce, Gorgonzola, Ziegenkäse, Mozzarella, Parmesan, frische Kräuter",
    it: "Salsa di pomodoro, gorgonzola, caprino, mozzarella, parmigiano, erbe fresche",
  },
  "Base crème, guanciale, oignons, œuf, origan, mozzarella": {
    en: "Cream base, guanciale, onions, egg, oregano, mozzarella",
    de: "Sahnebasis, Guanciale, Zwiebeln, Ei, Oregano, Mozzarella",
    it: "Base panna, guanciale, cipolle, uovo, origano, mozzarella",
  },
  "Sauce tomate, anchois, câpres, olives, mozzarella": {
    en: "Tomato sauce, anchovies, capers, olives, mozzarella",
    de: "Tomatensauce, Anchovis, Kapern, Oliven, Mozzarella",
    it: "Salsa di pomodoro, acciughe, capperi, olive, mozzarella",
  },
  "Sauce tomate, spianata, poivrons, oignons, olives, 'nduja, mozzarella": {
    en: "Tomato sauce, spianata, peppers, onions, olives, ’nduja, mozzarella",
    de: "Tomatensauce, Spianata, Paprika, Zwiebeln, Oliven, ’Nduja, Mozzarella",
    it: "Salsa di pomodoro, spianata, peperoni, cipolle, olive, 'nduja, mozzarella",
  },
  "Sauce tomate, saumon fumé, câpres, oignons, crème, mozzarella, herbes fraîches, huile citronnée":
    {
      en: "Tomato sauce, smoked salmon, capers, onions, cream, mozzarella, fresh herbs, lemon oil",
      de: "Tomatensauce, Räucherlachs, Kapern, Zwiebeln, Sahne, Mozzarella, frische Kräuter, Zitronenöl",
      it: "Salsa di pomodoro, salmone affumicato, capperi, cipolle, panna, mozzarella, erbe fresche, olio al limone",
    },
  "Sauce tomate, olives noires, oignons, chorizo, mozzarella": {
    en: "Tomato sauce, black olives, onions, chorizo, mozzarella",
    de: "Tomatensauce, schwarze Oliven, Zwiebeln, Chorizo, Mozzarella",
    it: "Salsa di pomodoro, olive nere, cipolle, chorizo, mozzarella",
  },
  "Sauce tomate, brunoise de carottes et courgettes, chèvre, miel, mozzarella, pignons de pin":
    {
      en: "Tomato sauce, diced carrots and courgettes, goat cheese, honey, mozzarella, pine nuts",
      de: "Tomatensauce, Brunoise aus Karotten und Zucchini, Ziegenkäse, Honig, Mozzarella, Pinienkerne",
      it: "Salsa di pomodoro, brunoise di carote e zucchine, caprino, miele, mozzarella, pinoli",
    },
  "Base crème, poulet grillé, poivrons, oignons, champignons, tomates cerises, mozzarella":
    {
      en: "Cream base, grilled chicken, peppers, onions, mushrooms, cherry tomatoes, mozzarella",
      de: "Sahnebasis, gegrilltes Hähnchen, Paprika, Zwiebeln, Pilze, Kirschtomaten, Mozzarella",
      it: "Base panna, pollo alla griglia, peperoni, cipolle, funghi, pomodorini, mozzarella",
    },
  "Sauce tomate, calamars, gambas, moules, mozzarella, herbes fraîches, ail, huile citronnée":
    {
      en: "Tomato sauce, squid, prawns, mussels, mozzarella, fresh herbs, garlic, lemon oil",
      de: "Tomatensauce, Calamari, Gambas, Miesmuscheln, Mozzarella, frische Kräuter, Knoblauch, Zitronenöl",
      it: "Salsa di pomodoro, calamari, gamberi, cozze, mozzarella, erbe fresche, aglio, olio al limone",
    },
  "Base crème aux fines herbes, gorgonzola, jambon de pays, tomates cerises, roquette, mozzarella, crème balsamique":
    {
      en: "Herb cream base, Gorgonzola, country ham, cherry tomatoes, rocket, mozzarella, balsamic cream",
      de: "Kräutersahne-Basis, Gorgonzola, Landschinken, Kirschtomaten, Rucola, Mozzarella, Balsamicocreme",
      it: "Base panna alle erbe, gorgonzola, prosciutto di campagna, pomodorini, rucola, mozzarella, crema di balsamico",
    },
  "Huile d'olive, jambon de pays, tomates cerises, roquette, mozzarella, copeaux parmesan":
    {
      en: "Olive oil, country ham, cherry tomatoes, rocket, mozzarella, Parmesan shavings",
      de: "Olivenöl, Landschinken, Kirschtomaten, Rucola, Mozzarella, Parmesanhobel",
      it: "Olio d'oliva, prosciutto di campagna, pomodorini, rucola, mozzarella, scaglie di parmigiano",
    },
  "Huile d'olive, carpaccio de bœuf, tomates cerises, roquette, mozzarella, citron, copeaux parmesan":
    {
      en: "Olive oil, beef carpaccio, cherry tomatoes, rocket, mozzarella, lemon, Parmesan shavings",
      de: "Olivenöl, Rinds-Carpaccio, Kirschtomaten, Rucola, Mozzarella, Zitrone, Parmesanhobel",
      it: "Olio d'oliva, carpaccio di manzo, pomodorini, rucola, mozzarella, limone, scaglie di parmigiano",
    },
  "Sauce tomate, carpaccio de bœuf, tomates cerises, roquette, burrata, huile d'olive, mozzarella, crème balsamique":
    {
      en: "Tomato sauce, beef carpaccio, cherry tomatoes, rocket, burrata, olive oil, mozzarella, balsamic cream",
      de: "Tomatensauce, Rinds-Carpaccio, Kirschtomaten, Rucola, Burrata, Olivenöl, Mozzarella, Balsamicocreme",
      it: "Salsa di pomodoro, carpaccio di manzo, pomodorini, rucola, burrata, olio d'oliva, mozzarella, crema di balsamico",
    },
  "Base crème fraîche truffée, champignons, burrata fraîche, roquette, huile de truffes, copeaux de truffes":
    {
      en: "Truffled cream base, mushrooms, fresh burrata, rocket, truffle oil, truffle shavings",
      de: "Trüffel-Crème-fraîche-Basis, Pilze, frische Burrata, Rucola, Trüffelöl, Trüffelhobel",
      it: "Base panna fresca tartufata, funghi, burrata fresca, rucola, olio al tartufo, scaglie di tartufo",
    },
  "Pesto frais, tomates cerises, roquette, mozzarella, stracciatella, huile d'olive, crème balsamique":
    {
      en: "Fresh pesto, cherry tomatoes, rocket, mozzarella, stracciatella, olive oil, balsamic cream",
      de: "Frisches Pesto, Kirschtomaten, Rucola, Mozzarella, Stracciatella, Olivenöl, Balsamicocreme",
      it: "Pesto fresco, pomodorini, rucola, mozzarella, stracciatella, olio d'oliva, crema di balsamico",
    },
  "Flan typique du Piémont aux amarettis": {
    en: "Classic Piedmontese flan with amaretti",
    de: "Typischer piemontesischer Flan mit Amaretti",
    it: "Budino tipico piemontese agli amaretti",
  },
  "Supplément chantilly 1 €": {
    en: "Whipped cream extra €1",
    de: "Sahne extra 1 €",
    it: "Supplemento panna montata 1 €",
  },
  "Whisky ou grappa": {
    en: "Whisky or grappa",
    de: "Whisky oder Grappa",
    it: "Whisky o grappa",
  },
};

const missingNames = MENU_ITEMS.filter((item) => !NAMES[item.name]).map(
  (item) => item.name,
);
const missingDescs = MENU_ITEMS.filter(
  (item) => item.description.trim() && !DESCS[item.description.trim()],
).map((item) => item.description);

if (missingNames.length || missingDescs.length) {
  console.error("Missing names:", missingNames);
  console.error("Missing descs:", missingDescs);
  process.exit(1);
}

const locs: Loc[] = ["en", "de", "it"];
const entries = MENU_ITEMS.map((item) => {
  const nameMap = NAMES[item.name];
  const descKey = item.description.trim();
  const descMap = descKey ? DESCS[descKey] : null;
  const block = locs
    .map((loc) => {
      const parts: string[] = [];
      if (nameMap[loc] !== item.name) {
        parts.push(`name: ${JSON.stringify(nameMap[loc])}`);
      }
      if (descMap?.[loc]) {
        parts.push(`description: ${JSON.stringify(descMap[loc])}`);
      }
      if (parts.length === 0) return null;
      return `    ${loc}: { ${parts.join(", ")} }`;
    })
    .filter(Boolean);
  if (block.length === 0) return null;
  return `  ${JSON.stringify(item.name)}: {\n${block.join(",\n")},\n  }`;
}).filter(Boolean);

const out = `import type { MenuLocale } from "@/components/menu/i18n/locale";

export type ItemTranslation = {
  name?: string;
  description?: string;
};

/** Traductions par nom FR exact (tel qu’en base). */
export const ITEM_TRANSLATIONS: Record<
  string,
  Partial<Record<Exclude<MenuLocale, "fr">, ItemTranslation>>
> = {
${entries.join(",\n")}
};
`;

writeFileSync("./components/menu/i18n/items.ts", out);
console.log("Wrote", entries.length, "entries");
