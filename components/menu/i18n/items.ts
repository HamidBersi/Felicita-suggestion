import type { MenuLocale } from "@/components/menu/i18n/locale";

export type ItemTranslation = {
  name?: string;
  description?: string;
};

/** Traductions par nom FR exact (tel qu’en base). */
export const ITEM_TRANSLATIONS: Record<
  string,
  Partial<Record<Exclude<MenuLocale, "fr">, ItemTranslation>>
> = {
  "Ricard tomate 3cl": {
    en: { name: "Ricard with tomato 3cl" },
    de: { name: "Ricard mit Tomate 3cl" },
    it: { name: "Ricard al pomodoro 3cl" },
  },
  "Ricard perroquet 3cl": {
    de: { name: "Ricard Perroquet 3cl" },
  },
  "Vermouth (rouge/blanc) 4cl": {
    en: { name: "Vermouth (red/white) 4cl" },
    de: { name: "Wermut (rot/weiß) 4cl" },
    it: { name: "Vermouth (rosso/bianco) 4cl" },
  },
  "Porto (rouge/blanc) 6cl": {
    en: { name: "Port (red/white) 6cl" },
    de: { name: "Portwein (rot/weiß) 6cl" },
    it: { name: "Porto (rosso/bianco) 6cl" },
  },
  "Blanc (cassis, pêche, mûre) 10cl": {
    en: { name: "White wine (blackcurrant, peach, blackberry) 10cl" },
    de: { name: "Weißwein (Cassis, Pfirsich, Brombeere) 10cl" },
    it: { name: "Bianco (ribes nero, pesca, mora) 10cl" },
  },
  "Prosecco (cassis, pêche, mûre) 10cl": {
    en: { name: "Prosecco (blackcurrant, peach, blackberry) 10cl" },
    de: { name: "Prosecco (Cassis, Pfirsich, Brombeere) 10cl" },
    it: { name: "Prosecco (ribes nero, pesca, mora) 10cl" },
  },
  "Apérol Spritz": {
    en: { name: "Aperol Spritz" },
    de: { name: "Aperol Spritz" },
    it: { name: "Aperol Spritz" },
  },
  "Prosecco 10cl (bio)": {
    en: { name: "Prosecco 10cl (organic)" },
    it: { name: "Prosecco 10cl (biologico)" },
  },
  "Bière Blonde Licorne 25cl": {
    en: { name: "Licorne Blonde beer 25cl" },
    de: { name: "Licorne Blondbier 25cl" },
    it: { name: "Birra bionda Licorne 25cl" },
  },
  "Bière du moment 25cl": {
    en: { name: "Beer of the moment 25cl" },
    de: { name: "Bier des Moments 25cl" },
    it: { name: "Birra del momento 25cl" },
  },
  "Picon Bière 25cl": {
    en: { name: "Picon beer 25cl" },
    de: { name: "Picon Bier 25cl" },
    it: { name: "Picon birra 25cl" },
  },
  "Panaché 25cl": {
    en: { name: "Shandy 25cl" },
    de: { name: "Radler 25cl" },
  },
  "Façon Mojitos": {
    en: { name: "Mojito-style", description: "Gin, mojito syrup, fresh mint, Prosecco" },
    de: { name: "Mojito-Art", description: "Gin, Mojito-Sirup, frische Minze, Prosecco" },
    it: { name: "Alla Mojito", description: "Gin, sciroppo mojito, menta fresca, prosecco" },
  },
  "Felicita": {
    en: { description: "Strawberry, lemon, melon, gin, Prosecco" },
    de: { description: "Erdbeere, Zitrone, Melone, Gin, Prosecco" },
    it: { description: "Fragola, limone, melone, gin, prosecco" },
  },
  "Négronis": {
    en: { name: "Negroni", description: "Campari, gin, red Martini" },
    de: { name: "Negroni", description: "Campari, Gin, roter Martini" },
    it: { name: "Negroni", description: "Campari, gin, Martini rosso" },
  },
  "Limone Spritz": {
    en: { description: "Limoncello, sparkling water, Prosecco" },
    de: { description: "Limoncello, Sprudelwasser, Prosecco" },
    it: { description: "Limoncello, acqua frizzante, prosecco" },
  },
  "Carola Bleue, Verte 50cl": {
    en: { name: "Carola Blue or Green 50cl" },
    de: { name: "Carola Blau oder Grün 50cl" },
    it: { name: "Carola Blu o Verde 50cl" },
  },
  "Carola Bleue 100cl": {
    en: { name: "Carola Blue 100cl" },
    de: { name: "Carola Blau 100cl" },
    it: { name: "Carola Blu 100cl" },
  },
  "Jus de fruits 25cl": {
    en: { name: "Fruit juice 25cl", description: "Tomato, orange, strawberry, mango" },
    de: { name: "Fruchtsaft 25cl", description: "Tomate, Orange, Erdbeere, Mango" },
    it: { name: "Succo di frutta 25cl", description: "Pomodoro, arancia, fragola, mango" },
  },
  "Coca 33cl": {
    en: { name: "Coca-Cola 33cl" },
    de: { name: "Coca-Cola 33cl" },
    it: { name: "Coca-Cola 33cl" },
  },
  "Coca Zero 33cl": {
    en: { name: "Coca-Cola Zero 33cl" },
    de: { name: "Coca-Cola Zero 33cl" },
    it: { name: "Coca-Cola Zero 33cl" },
  },
  "Limonade 25cl": {
    en: { name: "Lemonade 25cl" },
    it: { name: "Limonata 25cl" },
  },
  "Sirop à l'eau 25cl": {
    en: { name: "Syrup with water 25cl" },
    de: { name: "Sirup mit Wasser 25cl" },
    it: { name: "Sciroppo con acqua 25cl" },
  },
  "Assiette de salaisons italiennes (2 personnes)": {
    en: { name: "Italian cured meats platter (for 2)", description: "Selection of Italian cured meats, cheeses and antipasti" },
    de: { name: "Italienische Aufschnittplatte (für 2 Personen)", description: "Auswahl italienischer Aufschnitte, Käse und Antipasti" },
    it: { name: "Tagliere di salumi italiani (per 2)", description: "Selezione di salumi italiani, formaggi e antipasti" },
  },
  "Carpaccio de bœuf": {
    en: { name: "Beef carpaccio", description: "Rocket, cherry tomatoes, Parmesan shavings, olive oil, served with white pizza" },
    de: { name: "Rinds-Carpaccio", description: "Rucola, Kirschtomaten, Parmesanhobel, Olivenöl, serviert mit weißer Pizza" },
    it: { name: "Carpaccio di manzo", description: "Rucola, pomodorini, scaglie di parmigiano, olio d'oliva, accompagnato dalla sua pizza bianca" },
  },
  "Pomodore e Burrata": {
    en: { description: "Cherry tomatoes, basil, fresh burrata, olive oil, oregano, balsamic vinegar" },
    de: { description: "Kirschtomaten, Basilikum, frische Burrata, Olivenöl, Oregano, Balsamico" },
    it: { name: "Pomodori e Burrata", description: "Pomodorini, basilico, burrata fresca, olio d'oliva, origano, aceto balsamico" },
  },
  "Bruchetta al pomodore (2 personnes)": {
    en: { name: "Tomato bruschetta (for 2)", description: "Diced tomatoes, garlic, basil, oregano, Parmesan shavings" },
    de: { name: "Tomaten-Bruschetta (für 2 Personen)", description: "Tomatenwürfel, Knoblauch, Basilikum, Oregano, Parmesanhobel" },
    it: { name: "Bruschetta al pomodoro (per 2)", description: "Pomodori a dadini, aglio, basilico, origano, scaglie di parmigiano" },
  },
  "Bruchetta du moment (2 personnes)": {
    en: { name: "Bruschetta of the moment (for 2)", description: "Ingredients following the chef’s inspiration" },
    de: { name: "Bruschetta des Moments (für 2 Personen)", description: "Zutaten nach Inspiration des Küchenchefs" },
    it: { name: "Bruschetta del momento (per 2)", description: "Ingredienti secondo l'ispirazione dello chef" },
  },
  "Pizzetta Bianca": {
    en: { description: "Oregano, olive oil" },
    de: { description: "Oregano, Olivenöl" },
    it: { description: "Origano, olio d'oliva" },
  },
  "Pizzetta mozzarella": {
    en: { name: "Mozzarella pizzetta" },
    de: { name: "Mozzarella-Pizzetta" },
  },
  "Salade César": {
    en: { name: "Caesar salad", description: "Chicken fillet, fresh vegetables, vinaigrette, Parmesan shavings, balsamic cream, croutons" },
    de: { name: "Caesar-Salat", description: "Hähnchenfilet, Rohkost, Vinaigrette, Parmesanhobel, Balsamicocreme, Croutons" },
    it: { name: "Insalata Caesar", description: "Petto di pollo, verdure crude, vinaigrette, scaglie di parmigiano, crema di balsamico, crostini" },
  },
  "Salmone et Chèvre frit": {
    en: { name: "Smoked salmon & fried goat cheese", description: "Smoked salmon, fried goat cheese, cherry tomatoes, fresh vegetables, red onions, vinaigrette" },
    de: { name: "Räucherlachs & frittierter Ziegenkäse", description: "Räucherlachs, frittierter Ziegenkäse, Kirschtomaten, Rohkost, rote Zwiebeln, Vinaigrette" },
    it: { name: "Salmone e caprino fritto", description: "Salmone affumicato, caprino fritto, pomodorini, verdure crude, cipolle rosse, vinaigrette" },
  },
  "Salade tiède calamars et scampis": {
    en: { name: "Warm squid & scampi salad", description: "Squid and prawns, fresh vegetables, cherry tomatoes, lemon oil, fresh herbs" },
    de: { name: "Warmer Calamari- und Scampi-Salat", description: "Calamari und Garnelen, Rohkost, Kirschtomaten, Zitronenöl, frische Kräuter" },
    it: { name: "Insalata tiepida di calamari e scampi", description: "Calamari e gamberetti, verdure crude, pomodorini, olio al limone, erbe fresche" },
  },
  "Antipasti et Burrata": {
    en: { name: "Antipasti & Burrata", description: "Sun-dried tomatoes, cherry tomatoes, baby artichokes, olives, candied aubergine strips, fresh vegetables, olive oil, balsamic vinegar, fresh burrata" },
    de: { name: "Antipasti & Burrata", description: "Getrocknete Tomaten, Kirschtomaten, Mini-Artischocken, Oliven, kandierte Auberginenstreifen, Rohkost, Olivenöl, Balsamico, frische Burrata" },
    it: { name: "Antipasti e Burrata", description: "Pomodori secchi, pomodorini, mini carciofi, olive, julienne di melanzane confit, verdure crude, olio d'oliva, aceto balsamico, burrata fresca" },
  },
  "Faux filet de bœuf grillé — beurre maître d'hôtel": {
    en: { name: "Grilled sirloin steak — maître d'hôtel butter" },
    de: { name: "Gegrilltes Rumpsteak — Maître-d'hôtel-Butter" },
    it: { name: "Controfiletto di manzo alla griglia — burro maître d'hôtel" },
  },
  "Faux filet de bœuf grillé — sauce Gorgonzola": {
    en: { name: "Grilled sirloin steak — Gorgonzola sauce" },
    de: { name: "Gegrilltes Rumpsteak — Gorgonzola-Sauce" },
    it: { name: "Controfiletto di manzo alla griglia — salsa Gorgonzola" },
  },
  "Milanaise de bœuf fromage Taleggio et jambon St-Daniel": {
    en: { name: "Beef Milanese with Taleggio & San Daniele ham", description: "Oven-gratinéed, served with a small creamy tomato sauce" },
    de: { name: "Rinds-Milanesa mit Taleggio & San-Daniele-Schinken", description: "Im Ofen überbacken, serviert mit einer kleinen cremigen Tomatensauce" },
    it: { name: "Cotoletta di manzo alla milanese con Taleggio e prosciutto San Daniele", description: "Gratinata al forno, accompagnata da una piccola salsa di pomodoro cremosa" },
  },
  "Milanaise de veau": {
    en: { name: "Veal Milanese", description: "Breaded veal escalope, crisp and golden, served with a side of your choice" },
    de: { name: "Kalbs-Milanesa", description: "Panierte Kalbsschnitzel, knusprig und goldbraun, mit Beilage nach Wahl" },
    it: { name: "Cotoletta di vitello alla milanese", description: "Scaloppina di vitello impanata, croccante e dorata, servita con contorno a scelta" },
  },
  "Saltimbocca alla romana": {
    en: { description: "Veal medallion, sage, mozzarella, San Daniele ham, lemon butter sauce" },
    de: { description: "Kalbsmedaillon, Salbei, Mozzarella, San-Daniele-Schinken, Zitronenbutter-Sauce" },
    it: { description: "Medaglione di vitello, salvia, mozzarella, prosciutto San Daniele, salsa al burro limonato" },
  },
  "Supplément sauce": {
    en: { name: "Extra sauce", description: "Mushroom cream, Gorgonzola or tomato" },
    de: { name: "Sauce extra", description: "Pilzcreme, Gorgonzola oder Tomate" },
    it: { name: "Supplemento salsa", description: "Crema di funghi, gorgonzola o pomodoro" },
  },
  "Supplément accompagnement": {
    en: { name: "Extra side", description: "Pasta, seasonal vegetables, fries or green salad" },
    de: { name: "Beilage extra", description: "Pasta, Gemüse des Moments, Pommes oder grüner Salat" },
    it: { name: "Supplemento contorno", description: "Pasta, verdure del momento, patatine o insalata verde" },
  },
  "Supplément salade verte": {
    en: { name: "Extra green salad" },
    de: { name: "Grüner Salat extra" },
    it: { name: "Supplemento insalata verde" },
  },
  "Poissons du jour": {
    en: { name: "Fish of the day", description: "Please check the specials board or ask our team. Sides: pasta, seasonal vegetables, fries, green salad" },
    de: { name: "Fisch des Tages", description: "Bitte schauen Sie auf die Empfehlungstafel oder fragen Sie unser Team. Beilagen: Pasta, Gemüse des Moments, Pommes, grüner Salat" },
    it: { name: "Pesce del giorno", description: "Consultate il tabellone dei suggerimenti o il nostro servizio in sala. Contorni: pasta, verdure del momento, patatine, insalata verde" },
  },
  "Linguini alla crema e pancetta": {
    en: { description: "Smoked bacon lardons, cream, egg yolk, Parmesan" },
    de: { description: "Geräucherter Speck, Sahne, Eigelb, Parmesan" },
    it: { name: "Linguine alla crema e pancetta", description: "Pancetta affumicata, panna, tuorlo d'uovo, parmigiano" },
  },
  "Linguini al pesto": {
    en: { description: "Fresh pesto, pine nuts, garlic" },
    de: { description: "Frisches Pesto, Pinienkerne, Knoblauch" },
    it: { name: "Linguine al pesto", description: "Pesto fresco, pinoli, aglio" },
  },
  "Linguini alle vongole": {
    en: { description: "Shellfish stock, shelled cockles, clams, fresh herbs, lemon oil" },
    de: { description: "Krustentierfond, ausgelöste Herzmuscheln, Venusmuscheln, frische Kräuter, Zitronenöl" },
    it: { name: "Linguine alle vongole", description: "Fumetto di crostacei, cannolicchi sgusciati, vongole, erbe fresche, olio al limone" },
  },
  "Linguini ai frutti di mare": {
    en: { description: "Tomatoes, shellfish stock, mussels, squid, prawns, garlic, fresh herbs, lemon oil" },
    de: { description: "Tomaten, Krustentierfond, Miesmuscheln, Calamari, Gambas, Knoblauch, frische Kräuter, Zitronenöl" },
    it: { name: "Linguine ai frutti di mare", description: "Pomodori, fumetto di crostacei, cozze, calamari, gamberi, aglio, erbe fresche, olio al limone" },
  },
  "Linguini al salmone": {
    en: { description: "Fresh salmon, courgettes, carrots, onions, cream, garlic, lemon juice" },
    de: { description: "Frischer Lachs, Zucchini, Karotten, Zwiebeln, Crème fraîche, Knoblauch, Zitronensaft" },
    it: { name: "Linguine al salmone", description: "Salmone fresco, zucchine, carote, cipolle, panna fresca, aglio, succo di limone" },
  },
  "Fusilli all'arrabbiata": {
    en: { description: "Tomato sauce, olives, chilli, mushrooms, capers, fresh herbs, garlic" },
    de: { description: "Tomatensauce, Oliven, Chili, Pilze, Kapern, frische Kräuter, Knoblauch" },
    it: { description: "Salsa di pomodoro, olive, peperoncino, funghi, capperi, erbe fresche, aglio" },
  },
  "Fusilli al pomodoro": {
    en: { description: "Tomato sauce, garlic, basil" },
    de: { description: "Tomatensauce, Knoblauch, Basilikum" },
    it: { description: "Salsa di pomodoro, aglio, basilico" },
  },
  "Fusilli pollo e marsala": {
    en: { description: "Sliced chicken, mushrooms, cream, garlic, Marsala, fresh herbs" },
    de: { description: "Hähnchenstreifen, Pilze, Sahne, Knoblauch, Marsala, frische Kräuter" },
    it: { description: "Pollo a striscioline, funghi, panna, aglio, marsala, erbe fresche" },
  },
  "Rigatoni al matriciana": {
    en: { name: "Rigatoni alla matriciana", description: "Tomato sauce, bacon, mushrooms, cream, garlic, oregano" },
    de: { name: "Rigatoni alla matriciana", description: "Tomatensauce, Speck, Pilze, Sahne, Knoblauch, Oregano" },
    it: { name: "Rigatoni alla matriciana", description: "Salsa di pomodoro, guanciale, funghi, panna, aglio, origano" },
  },
  "Rigatoni tre fromaggi": {
    en: { name: "Rigatoni tre formaggi", description: "Onions, Gorgonzola, Taleggio, Parmesan, cream, garlic, fresh herbs, pine nuts" },
    de: { name: "Rigatoni tre formaggi", description: "Zwiebeln, Gorgonzola, Taleggio, Parmesan, Sahne, Knoblauch, frische Kräuter, Pinienkerne" },
    it: { name: "Rigatoni tre formaggi", description: "Cipolle, gorgonzola, taleggio, parmigiano, panna, aglio, erbe fresche, pinoli" },
  },
  "Rigatoni al pollo curry": {
    en: { description: "Cream, chicken, mushrooms, garlic, curry, fresh herbs" },
    de: { description: "Sahne, Hähnchen, Pilze, Knoblauch, Curry, frische Kräuter" },
    it: { description: "Panna, pollo, funghi, aglio, curry, erbe fresche" },
  },
  "Rigatoni méditerranea": {
    en: { name: "Rigatoni mediterranea", description: "Tomato sauce, onions, peppers, courgettes, aubergines, black olives, garlic, fresh herbs" },
    de: { name: "Rigatoni mediterranea", description: "Tomatensauce, Zwiebeln, Paprika, Zucchini, Auberginen, schwarze Oliven, Knoblauch, frische Kräuter" },
    it: { name: "Rigatoni mediterranea", description: "Salsa di pomodoro, cipolle, peperoni, zucchine, melanzane, olive nere, aglio, erbe fresche" },
  },
  "Ravioles ricotta spinaci et gorgonzola": {
    en: { name: "Ricotta & spinach ravioli with Gorgonzola", description: "Cream, spinach, Gorgonzola, ricotta, aromatic base, walnuts" },
    de: { name: "Ricotta-Spinat-Ravioli mit Gorgonzola", description: "Crème fraîche, Spinat, Gorgonzola, Ricotta, aromatische Basis, Walnüsse" },
    it: { name: "Ravioli ricotta e spinaci al gorgonzola", description: "Panna fresca, spinaci, gorgonzola, ricotta, base aromatica, noci" },
  },
  "Ravioles truffées": {
    en: { name: "Truffle ravioli", description: "Cream, mushrooms, tartufata, truffle slices, fresh herbs, pine nuts" },
    de: { name: "Trüffel-Ravioli", description: "Crème fraîche, Pilze, Tartufata, Trüffelscheiben, frische Kräuter, Pinienkerne" },
    it: { name: "Ravioli al tartufo", description: "Panna fresca, funghi, tartufata, lamelle di tartufo, erbe fresche, pinoli" },
  },
  "Tortellini zingara": {
    en: { description: "Beef-filled tortellini, cream, tomato sauce, chorizo, mushrooms, black olives, garlic, oregano" },
    de: { description: "Mit Rindfleisch gefüllte Tortellini, Crème fraîche, Tomatensauce, Chorizo, Pilze, schwarze Oliven, Knoblauch, Oregano" },
    it: { description: "Tortellini ripieni di manzo, panna fresca, salsa di pomodoro, chorizo, funghi, olive nere, aglio, origano" },
  },
  "Tortellini carne e funghi": {
    en: { description: "Beef-filled tortellini, cream, mushrooms, garlic" },
    de: { description: "Mit Rindfleisch gefüllte Tortellini, Sahne, Pilze, Knoblauch" },
    it: { description: "Tortellini ripieni di manzo, panna, funghi, aglio" },
  },
  "Menu bambino + boule de glace": {
    en: { name: "Kids’ menu + scoop of ice cream", description: "Under 12 — penne with tomato or mushroom cream sauce, or nuggets & fries, or half pizza Margherita / Regina / Ham" },
    de: { name: "Kindermenü + Kugel Eis", description: "Unter 12 Jahren — Penne mit Tomaten- oder Pilzcremesauce, oder Nuggets/Pommes, oder halbe Pizza Margherita / Regina / Schinken" },
    it: { name: "Menu bambino + pallina di gelato", description: "Sotto i 12 anni — penne al pomodoro o crema di funghi, oppure nuggets/patatine, oppure mezza pizza Margherita / Regina / Prosciutto" },
  },
  "Margherita": {
    en: { description: "Tomato sauce, mozzarella, oregano" },
    de: { description: "Tomatensauce, Mozzarella, Oregano" },
    it: { description: "Salsa di pomodoro, mozzarella, origano" },
  },
  "Regina": {
    en: { description: "Tomato sauce, ham, mushrooms, mozzarella, oregano" },
    de: { description: "Tomatensauce, Schinken, Pilze, Mozzarella, Oregano" },
    it: { description: "Salsa di pomodoro, prosciutto, funghi, mozzarella, origano" },
  },
  "Méditerranea": {
    en: { name: "Mediterranea", description: "Tomato sauce, onions, peppers, courgettes, aubergines, black olives, fresh herbs, mozzarella" },
    de: { name: "Mediterranea", description: "Tomatensauce, Zwiebeln, Paprika, Zucchini, Auberginen, schwarze Oliven, frische Kräuter, Mozzarella" },
    it: { name: "Mediterranea", description: "Salsa di pomodoro, cipolle, peperoni, zucchine, melanzane, olive nere, erbe fresche, mozzarella" },
  },
  "Quattro fromaggi": {
    en: { name: "Quattro formaggi", description: "Tomato sauce, Gorgonzola, goat cheese, mozzarella, Parmesan, fresh herbs" },
    de: { name: "Quattro formaggi", description: "Tomatensauce, Gorgonzola, Ziegenkäse, Mozzarella, Parmesan, frische Kräuter" },
    it: { name: "Quattro formaggi", description: "Salsa di pomodoro, gorgonzola, caprino, mozzarella, parmigiano, erbe fresche" },
  },
  "Carbonara": {
    en: { description: "Cream base, guanciale, onions, egg, oregano, mozzarella" },
    de: { description: "Sahnebasis, Guanciale, Zwiebeln, Ei, Oregano, Mozzarella" },
    it: { description: "Base panna, guanciale, cipolle, uovo, origano, mozzarella" },
  },
  "Napoletana": {
    en: { description: "Tomato sauce, anchovies, capers, olives, mozzarella" },
    de: { description: "Tomatensauce, Anchovis, Kapern, Oliven, Mozzarella" },
    it: { description: "Salsa di pomodoro, acciughe, capperi, olive, mozzarella" },
  },
  "Calabrese": {
    en: { description: "Tomato sauce, spianata, peppers, onions, olives, ’nduja, mozzarella" },
    de: { description: "Tomatensauce, Spianata, Paprika, Zwiebeln, Oliven, ’Nduja, Mozzarella" },
    it: { description: "Salsa di pomodoro, spianata, peperoni, cipolle, olive, 'nduja, mozzarella" },
  },
  "Salmone": {
    en: { description: "Tomato sauce, smoked salmon, capers, onions, cream, mozzarella, fresh herbs, lemon oil" },
    de: { description: "Tomatensauce, Räucherlachs, Kapern, Zwiebeln, Sahne, Mozzarella, frische Kräuter, Zitronenöl" },
    it: { description: "Salsa di pomodoro, salmone affumicato, capperi, cipolle, panna, mozzarella, erbe fresche, olio al limone" },
  },
  "Chorizo": {
    en: { description: "Tomato sauce, black olives, onions, chorizo, mozzarella" },
    de: { description: "Tomatensauce, schwarze Oliven, Zwiebeln, Chorizo, Mozzarella" },
    it: { description: "Salsa di pomodoro, olive nere, cipolle, chorizo, mozzarella" },
  },
  "Chèvre miel": {
    en: { name: "Goat cheese & honey", description: "Tomato sauce, diced carrots and courgettes, goat cheese, honey, mozzarella, pine nuts" },
    de: { name: "Ziegenkäse & Honig", description: "Tomatensauce, Brunoise aus Karotten und Zucchini, Ziegenkäse, Honig, Mozzarella, Pinienkerne" },
    it: { name: "Caprino e miele", description: "Salsa di pomodoro, brunoise di carote e zucchine, caprino, miele, mozzarella, pinoli" },
  },
  "Pollo rustico": {
    en: { description: "Cream base, grilled chicken, peppers, onions, mushrooms, cherry tomatoes, mozzarella" },
    de: { description: "Sahnebasis, gegrilltes Hähnchen, Paprika, Zwiebeln, Pilze, Kirschtomaten, Mozzarella" },
    it: { description: "Base panna, pollo alla griglia, peperoni, cipolle, funghi, pomodorini, mozzarella" },
  },
  "Frutti di mare": {
    en: { description: "Tomato sauce, squid, prawns, mussels, mozzarella, fresh herbs, garlic, lemon oil" },
    de: { description: "Tomatensauce, Calamari, Gambas, Miesmuscheln, Mozzarella, frische Kräuter, Knoblauch, Zitronenöl" },
    it: { description: "Salsa di pomodoro, calamari, gamberi, cozze, mozzarella, erbe fresche, aglio, olio al limone" },
  },
  "Supplément ingrédient": {
    en: { name: "Extra topping" },
    de: { name: "Belag extra" },
    it: { name: "Supplemento ingrediente" },
  },
  "Supplément ingrédient charcuterie": {
    en: { name: "Extra cured-meat topping" },
    de: { name: "Aufschnitt-Belag extra" },
    it: { name: "Supplemento salume" },
  },
  "Supplément burrata": {
    en: { name: "Extra burrata" },
    de: { name: "Burrata extra" },
    it: { name: "Supplemento burrata" },
  },
  "La Romana": {
    en: { description: "Herb cream base, Gorgonzola, country ham, cherry tomatoes, rocket, mozzarella, balsamic cream" },
    de: { description: "Kräutersahne-Basis, Gorgonzola, Landschinken, Kirschtomaten, Rucola, Mozzarella, Balsamicocreme" },
    it: { description: "Base panna alle erbe, gorgonzola, prosciutto di campagna, pomodorini, rucola, mozzarella, crema di balsamico" },
  },
  "Prosciutto": {
    en: { description: "Olive oil, country ham, cherry tomatoes, rocket, mozzarella, Parmesan shavings" },
    de: { description: "Olivenöl, Landschinken, Kirschtomaten, Rucola, Mozzarella, Parmesanhobel" },
    it: { description: "Olio d'oliva, prosciutto di campagna, pomodorini, rucola, mozzarella, scaglie di parmigiano" },
  },
  "Carpaccio": {
    en: { description: "Olive oil, beef carpaccio, cherry tomatoes, rocket, mozzarella, lemon, Parmesan shavings" },
    de: { description: "Olivenöl, Rinds-Carpaccio, Kirschtomaten, Rucola, Mozzarella, Zitrone, Parmesanhobel" },
    it: { description: "Olio d'oliva, carpaccio di manzo, pomodorini, rucola, mozzarella, limone, scaglie di parmigiano" },
  },
  "Contadina": {
    en: { description: "Tomato sauce, beef carpaccio, cherry tomatoes, rocket, burrata, olive oil, mozzarella, balsamic cream" },
    de: { description: "Tomatensauce, Rinds-Carpaccio, Kirschtomaten, Rucola, Burrata, Olivenöl, Mozzarella, Balsamicocreme" },
    it: { description: "Salsa di pomodoro, carpaccio di manzo, pomodorini, rucola, burrata, olio d'oliva, mozzarella, crema di balsamico" },
  },
  "Tartufo": {
    en: { description: "Truffled cream base, mushrooms, fresh burrata, rocket, truffle oil, truffle shavings" },
    de: { description: "Trüffel-Crème-fraîche-Basis, Pilze, frische Burrata, Rucola, Trüffelöl, Trüffelhobel" },
    it: { description: "Base panna fresca tartufata, funghi, burrata fresca, rucola, olio al tartufo, scaglie di tartufo" },
  },
  "Pesto e stracciatella": {
    en: { description: "Fresh pesto, cherry tomatoes, rocket, mozzarella, stracciatella, olive oil, balsamic cream" },
    de: { description: "Frisches Pesto, Kirschtomaten, Rucola, Mozzarella, Stracciatella, Olivenöl, Balsamicocreme" },
    it: { description: "Pesto fresco, pomodorini, rucola, mozzarella, stracciatella, olio d'oliva, crema di balsamico" },
  },
  "Tiramisu": {
    it: { name: "Tiramisù" },
  },
  "Délice du moment": {
    en: { name: "Dessert of the moment" },
    de: { name: "Dessert des Moments" },
    it: { name: "Dolce del momento" },
  },
  "Bunet": {
    en: { description: "Classic Piedmontese flan with amaretti" },
    de: { description: "Typischer piemontesischer Flan mit Amaretti" },
    it: { description: "Budino tipico piemontese agli amaretti" },
  },
  "Chocolat liégeois": {
    en: { name: "Chocolate Liégeois" },
    it: { name: "Cioccolato liègeois" },
  },
  "Café liégeois": {
    en: { name: "Coffee Liégeois" },
    it: { name: "Caffè liègeois" },
  },
  "Coupe de glace ou sorbet 1 boule": {
    en: { name: "Ice cream or sorbet — 1 scoop" },
    de: { name: "Eis oder Sorbet — 1 Kugel" },
    it: { name: "Gelato o sorbetto — 1 pallina" },
  },
  "Coupe 2 boules": {
    en: { name: "2 scoops" },
    de: { name: "2 Kugeln" },
    it: { name: "2 palline" },
  },
  "Affogato": {
    en: { description: "Whipped cream extra €1" },
    de: { description: "Sahne extra 1 €" },
    it: { description: "Supplemento panna montata 1 €" },
  },
  "Expresso": {
    en: { name: "Espresso" },
    de: { name: "Espresso" },
    it: { name: "Espresso" },
  },
  "Décaféiné": {
    en: { name: "Decaf coffee" },
    de: { name: "Entkoffeiniert" },
    it: { name: "Decaffeinato" },
  },
  "Café allongé": {
    en: { name: "Americano" },
    de: { name: "Verlängerter Kaffee" },
    it: { name: "Caffè lungo" },
  },
  "Thé ou infusion": {
    en: { name: "Tea or herbal infusion" },
    de: { name: "Tee oder Kräutertee" },
    it: { name: "Tè o tisana" },
  },
  "Irish coffee": {
    en: { description: "Whisky or grappa" },
    de: { name: "Irish Coffee", description: "Whisky oder Grappa" },
    it: { description: "Whisky o grappa" },
  },
  "Vodka 4cl": {
    de: { name: "Wodka 4cl" },
  },
  "Gin Bombay 4cl": {
    en: { name: "Bombay Gin 4cl" },
    de: { name: "Bombay Gin 4cl" },
  },
  "Framboise 4cl": {
    en: { name: "Raspberry eau-de-vie 4cl" },
    de: { name: "Himbeergeist 4cl" },
    it: { name: "Acquavite di lampone 4cl" },
  },
  "Mirabelle 4cl": {
    en: { name: "Mirabelle eau-de-vie 4cl" },
    de: { name: "Mirabellenbrand 4cl" },
    it: { name: "Acquavite di mirabella 4cl" },
  },
  "Poire Williams 4cl": {
    de: { name: "Williams-Birne 4cl" },
    it: { name: "Pere Williams 4cl" },
  },
  "Marc de Gewurztraminer 4cl": {
    en: { name: "Gewurztraminer marc 4cl" },
    de: { name: "Gewurztraminer-Tresterbrand 4cl" },
    it: { name: "Acquavite di Gewurztraminer 4cl" },
  },
  "Rhum Don Papa 4cl": {
    en: { name: "Don Papa rum 4cl" },
    de: { name: "Don Papa Rum 4cl" },
    it: { name: "Rum Don Papa 4cl" },
  },
  "Montepulciano (rouge)": {
    en: { name: "Montepulciano (red)" },
    de: { name: "Montepulciano (rot)" },
    it: { name: "Montepulciano (rosso)" },
  },
  "Emozionne (rouge)": {
    en: { name: "Emozionne (red)" },
    de: { name: "Emozionne (rot)" },
    it: { name: "Emozionne (rosso)" },
  },
  "Nero d'Avola (rouge)": {
    en: { name: "Nero d'Avola (red)" },
    de: { name: "Nero d'Avola (rot)" },
    it: { name: "Nero d'Avola (rosso)" },
  },
  "Lambrusco (rouge)": {
    en: { name: "Lambrusco (red)" },
    de: { name: "Lambrusco (rot)" },
    it: { name: "Lambrusco (rosso)" },
  },
  "Primitivo Zola (rouge)": {
    en: { name: "Primitivo Zola (red)" },
    de: { name: "Primitivo Zola (rot)" },
    it: { name: "Primitivo Zola (rosso)" },
  },
  "Montesenano (rouge)": {
    en: { name: "Montesenano (red)" },
    de: { name: "Montesenano (rot)" },
    it: { name: "Montesenano (rosso)" },
  },
  "Miraggio terra siciliana (rouge)": {
    en: { name: "Miraggio terra siciliana (red)" },
    de: { name: "Miraggio terra siciliana (rot)" },
    it: { name: "Miraggio terra siciliana (rosso)" },
  },
  "Edizione (cuvée spéciale, rouge)": {
    en: { name: "Edizione (special cuvée, red)" },
    de: { name: "Edizione (Spezialcuvée, rot)" },
    it: { name: "Edizione (cuvée speciale, rosso)" },
  },
  "Pinot Grigio (blanc)": {
    en: { name: "Pinot Grigio (white)" },
    de: { name: "Pinot Grigio (weiß)" },
    it: { name: "Pinot Grigio (bianco)" },
  },
  "Frascati (blanc)": {
    en: { name: "Frascati (white)" },
    de: { name: "Frascati (weiß)" },
    it: { name: "Frascati (bianco)" },
  },
  "Cirò bio (blanc)": {
    en: { name: "Cirò organic (white)" },
    de: { name: "Cirò bio (weiß)" },
    it: { name: "Cirò biologico (bianco)" },
  },
  "Chardonnay (blanc)": {
    en: { name: "Chardonnay (white)" },
    de: { name: "Chardonnay (weiß)" },
    it: { name: "Chardonnay (bianco)" },
  },
  "Vernaccia (blanc)": {
    en: { name: "Vernaccia (white)" },
    de: { name: "Vernaccia (weiß)" },
    it: { name: "Vernaccia (bianco)" },
  },
  "Bardolino (rosé)": {
    de: { name: "Bardolino (Rosé)" },
    it: { name: "Bardolino (rosato)" },
  },
  "Negro Amaro Rosato (rosé)": {
    de: { name: "Negro Amaro Rosato (Rosé)" },
    it: { name: "Negro Amaro Rosato" },
  },
  "Unanotte (rosé)": {
    de: { name: "Unanotte (Rosé)" },
    it: { name: "Unanotte (rosato)" },
  },
  "Château Font du Broc bio (rosé)": {
    en: { name: "Château Font du Broc organic (rosé)" },
    de: { name: "Château Font du Broc bio (Rosé)" },
    it: { name: "Château Font du Broc biologico (rosato)" },
  },
  "Prosecco bio": {
    en: { name: "Organic Prosecco" },
    de: { name: "Bio-Prosecco" },
    it: { name: "Prosecco biologico" },
  }
};
