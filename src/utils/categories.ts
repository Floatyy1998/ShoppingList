export const suggestCategory = (itemName: string): string | undefined => {
  const name = itemName.toLowerCase()

  const categoryKeywords: Record<string, string[]> = {
    // Obst & Gemüse
    '1': [
      // Obst
      'apfel', 'äpfel', 'banane', 'bananen', 'orange', 'orangen', 'mandarine', 'mandarinen', 'clementine', 'clementinen', 'satsuma',
      'zitrone', 'zitronen', 'limette', 'limetten', 'lime', 'grapefruit', 'pampelmuse', 'pomelo',
      'ananas', 'kokosnuss', 'kokos', 'datteln', 'dattel', 'feige', 'feigen',
      'erdbeere', 'erdbeeren', 'himbeere', 'himbeeren', 'brombeere', 'brombeeren',
      'heidelbeere', 'heidelbeeren', 'blaubeere', 'blaubeeren', 'johannisbeere', 'johannisbeeren',
      'stachelbeere', 'stachelbeeren', 'cranberry', 'cranberries', 'preiselbeere', 'preiselbeeren',
      'traube', 'trauben', 'weintraube', 'weintrauben', 'rosine', 'rosinen', 'sultanine',
      'kirsche', 'kirschen', 'sauerkirsche', 'süßkirsche',
      'pfirsich', 'pfirsiche', 'nektarine', 'nektarinen', 'aprikose', 'aprikosen', 'marille',
      'pflaume', 'pflaumen', 'zwetschge', 'zwetschgen', 'mirabelle', 'mirabellen',
      'birne', 'birnen', 'quitte', 'quitten',
      'kiwi', 'kiwis', 'mango', 'mangos', 'papaya', 'papayas', 'maracuja', 'passionsfrucht',
      'lychee', 'litschi', 'physalis', 'sternfrucht', 'kaki', 'sharon', 'persimone',
      'avocado', 'avocados', 'guave', 'granatapfel', 'granatäpfel',
      'melone', 'melonen', 'wassermelone', 'honigmelone', 'cantaloupe', 'galiamelone', 'netzmelone',
      'obst', 'früchte', 'beeren', 'beerenobst', 'steinobst', 'kernobst', 'zitrusfrüchte', 'südfrüchte', 'exotische früchte',
      // Gemüse
      'tomate', 'tomaten', 'cherrytomate', 'cherrytomaten', 'cocktailtomate', 'rispentomaten', 'fleischtomate',
      'gurke', 'gurken', 'salatgurke', 'minigurke', 'snackgurke', 'einlegegurke',
      'salat', 'salate', 'kopfsalat', 'eisberg', 'eisbergsalat', 'feldsalat', 'rapunzel', 'rucola', 'rauke',
      'lollo rosso', 'lollo bionda', 'romanasalat', 'römersalat', 'endivie', 'endiviensalat', 'chicorée',
      'paprika', 'paprikas', 'spitzpaprika', 'gemüsepaprika',
      'karotte', 'karotten', 'möhre', 'möhren', 'mohrrübe', 'gelbe rübe', 'bundkarotte',
      'kartoffel', 'kartoffeln', 'erdapfel', 'festkochend', 'mehlig', 'drillinge',
      'süßkartoffel', 'süßkartoffeln', 'batate',
      'zwiebel', 'zwiebeln', 'speisezwiebel', 'gemüsezwiebel', 'rote zwiebel', 'schalotte', 'schalotten',
      'frühlingszwiebel', 'frühlingszwiebeln', 'lauchzwiebel', 'bundzwiebel',
      'knoblauch', 'knoblauchzehe', 'knoblauchzehen',
      'lauch', 'porree', 'staudensellerie', 'sellerie', 'knollensellerie', 'bleichsellerie',
      'brokkoli', 'broccoli', 'blumenkohl', 'karfiol', 'romanesco',
      'rosenkohl', 'kohl', 'weißkohl', 'rotkohl', 'blaukraut', 'wirsing', 'wirsingkohl',
      'chinakohl', 'spitzkohl', 'grünkohl', 'kohlrabi',
      'zucchini', 'zucchinis', 'aubergine', 'auberginen', 'melanzani',
      'spinat', 'blattspinat', 'rahmspinat', 'mangold',
      'erbsen', 'erbse', 'zuckererbse', 'kaiserschote', 'schälerbse',
      'bohnen', 'bohne', 'grüne bohnen', 'wachsbohnen', 'buschbohne', 'stangenbohne', 'kidneybohne',
      'dicke bohnen', 'saubohne', 'edamame',
      'linsen', 'rote linsen', 'grüne linsen', 'belugalinsen', 'kichererbsen', 'kichererbse',
      'pilze', 'pilz', 'champignon', 'champignons', 'braune champignons', 'weiße champignons',
      'steinpilz', 'steinpilze', 'pfifferling', 'pfifferlinge', 'shiitake', 'austernpilz', 'kräuterseitling',
      'ingwer', 'ingwerwurzel', 'kurkuma', 'galgant',
      'chili', 'chilischote', 'peperoni', 'peperoncini', 'jalapeño', 'habanero', 'cayenne',
      'mais', 'zuckermais', 'maiskolben', 'babymais',
      'kürbis', 'hokkaido', 'butternut', 'muskatkürbis', 'spaghettikürbis', 'zierkürbis',
      'radieschen', 'rettich', 'meerrettich', 'kren', 'schwarzer rettich', 'daikon',
      'rote beete', 'rote bete', 'rübe', 'steckrübe', 'kohlrübe', 'mairübe', 'navette',
      'fenchel', 'knollenfenchel', 'spargel', 'grüner spargel', 'weißer spargel',
      'artischocke', 'artischocken', 'schwarzwurzel', 'schwarzwurzeln', 'topinambur', 'pastinake', 'pastinaken',
      'okra', 'okraschote', 'bambussprossen', 'sojasprossen', 'sprossen', 'keimlinge', 'alfalfa',
      'gemüse', 'biogemüse', 'frischgemüse', 'wurzelgemüse', 'kohlgemüse', 'fruchtgemüse', 'blattgemüse'
    ],
    // Fleisch & Fisch
    '2': [
      // Fleisch - Geflügel
      'hähnchen', 'hühnchen', 'huhn', 'chicken', 'geflügel', 'hähnchenbrustfilet', 'hähnchenbrust',
      'hähnchenkeule', 'hähnchenflügel', 'chicken wings', 'hähnchengeschnetzeltes',
      'pute', 'putenbrust', 'putenschnitzel', 'putengeschnetzeltes', 'truthahn',
      'ente', 'entenbrust', 'entenkeule', 'gans', 'gänsebrust', 'gänsebraten',
      'wachtel', 'fasan', 'wildgeflügel',
      // Fleisch - Rind
      'rind', 'rindfleisch', 'beef', 'rindersteak', 'steak', 'filetsteak', 'rumpsteak', 'hüftsteak',
      'roastbeef', 'entrecote', 'ribeye', 't-bone', 'porterhouse',
      'rinderhack', 'hackfleisch', 'hack', 'rinderhackfleisch', 'tatar', 'rindertatar',
      'rinderbraten', 'rinderbrust', 'rindergulasch', 'gulasch', 'rinderfilet',
      'tafelspitz', 'roastbeef', 'rinderschmorbraten', 'boeuf',
      // Fleisch - Schwein
      'schwein', 'schweinefleisch', 'pork', 'schweineschnitzel', 'schnitzel',
      'kotelett', 'schweinekotelett', 'kasseler', 'schweinebraten', 'schweinefilet',
      'schweinehack', 'schweinehackfleisch', 'schweinebauch', 'bauchfleisch', 'nacken', 'schweinenacken',
      'schweinshaxe', 'haxe', 'eisbein', 'schäufele', 'schweinerücken',
      // Fleisch - Lamm & Kalb
      'lamm', 'lammfleisch', 'lammkotelett', 'lammkeule', 'lammrücken', 'lammfilet', 'lammhack',
      'kalb', 'kalbfleisch', 'kalbsschnitzel', 'kalbsfilet', 'kalbshaxe', 'kalbsbries',
      // Fleisch - Wild
      'wild', 'wildfleisch', 'wildschein', 'wildschwein', 'hirsch', 'reh', 'rehkeule', 'rehschnitzel',
      'wildschweinkeule', 'wildgulasch', 'hirschbraten', 'rehbraten', 'wildbratwurst',
      // Wurst - Aufschnitt
      'wurst', 'aufschnitt', 'schinken', 'kochschinken', 'rohschinken', 'schwarzwälder', 'parmaschinken',
      'prosciutto', 'serrano', 'lachsschinken', 'truthahnschinken', 'hähnchenschinken',
      'salami', 'mailänder salami', 'ungarische salami', 'bauernsal ami', 'chorizo', 'salsiccia',
      'mortadella', 'lyoner', 'fleischwurst', 'extrawurst', 'bierschinken', 'jagdwurst',
      'leberkäse', 'leberkäs', 'fleischkäse', 'bierwurst',
      // Wurst - Streichwurst
      'leberwurst', 'kalbsleberwurst', 'gänseleberwurst', 'hausmacher leberwurst',
      'mettwurst', 'teewurst', 'zwiebelmettwurst', 'schmierwurst',
      'leberpastete', 'pastete', 'fleischpastete',
      // Wurst - Brühwurst
      'wiener', 'wiener würstchen', 'frankfurter', 'bockwurst', 'weißwurst', 'kalbsbratwurst',
      'geflügelwurst', 'geflügelwiener', 'käsekrainer', 'debreziner',
      // Wurst - Bratwurst
      'bratwurst', 'rostbratwurst', 'currywurst', 'thüringer', 'nürnberger', 'fränkische bratwurst',
      'merguez', 'chipolata',
      // Speck & Bacon
      'bacon', 'frühstücksspeck', 'speck', 'schinkenspeck', 'bauchspeck', 'durchwachsener speck',
      'pancetta', 'guanciale',
      // Fisch - Süßwasser
      'fisch', 'forelle', 'lachsforelle', 'regenbogenforelle', 'bachforelle',
      'karpfen', 'zander', 'hecht', 'barsch', 'saibling', 'aal', 'wels',
      // Fisch - Salzwasser
      'lachs', 'wildlachs', 'bio lachs', 'lachsfilet', 'räucherlachs', 'graved lachs',
      'thunfisch', 'thunfischsteak', 'gelbflossenthun',
      'kabeljau', 'dorsch', 'skrei', 'seelachs', 'alaska seelachs', 'pollack',
      'scholle', 'seezunge', 'steinbutt', 'heilbutt', 'flunder', 'rotbarsch',
      'hering', 'matjes', 'bismarckhering', 'rollmops',
      'makrele', 'stöcker', 'sardine', 'sardinen', 'anchovis', 'sardelle',
      'seehecht', 'seeteufel', 'wolfsbarsch', 'dorade', 'goldbrasse', 'brasse',
      'schwertfisch', 'zackenbarsch', 'schnapper',
      // Fisch - geräuchert & mariniert
      'räucherfisch', 'räucherforelle', 'räucheraal', 'räucherlachs',
      'graved lachs', 'beizlachs', 'wildlachs', 'sushi lachs',
      // Meeresfrüchte - Krustentiere
      'garnele', 'garnelen', 'shrimp', 'shrimps', 'riesengarnele', 'riesengarnelen', 'king prawns',
      'scampi', 'langustine', 'kaisergranate',
      'krabbe', 'krabben', 'nordseekrabbe', 'nordseekrabben',
      'hummer', 'langusten', 'flusskrebs', 'flusskrebse',
      // Meeresfrüchte - Weichtiere
      'muschel', 'muscheln', 'miesmuschel', 'miesmuscheln', 'jakobsmuschel', 'jakobsmuscheln',
      'venusmuschel', 'herzmuschel', 'auster', 'austern',
      'tintenfisch', 'kalmar', 'calamari', 'sepia', 'oktopus', 'pulpo', 'kraken',
      'ceviche',
      // Allgemein
      'meeresfrüchte', 'seafood', 'fischfilet', 'tiefkühlfisch', 'fischstäbchen'
    ],
    // Milchprodukte
    '3': [
      // Milch & Milchersatz
      'milch', 'vollmilch', 'fettarme milch', 'magermilch', 'h-milch', 'frischmilch', 'weidemilch',
      'biomilch', 'demeter milch', 'heumilch', 'ziegenmilch', 'schafsmilch', 'büffelmilch',
      'laktosefreie milch', 'minus l', 'a2 milch',
      'hafermilch', 'sojamilch', 'mandelmilch', 'reismilch', 'kokosmilch', 'dinkelmilch',
      'haselnussmilch', 'cashewmilch', 'lupinenmilch', 'erbsenmilch',
      'pflanzenmilch', 'milchersatz', 'barista edition',
      'kondensmilch', 'dosenmilch', 'kaffeesahne', 'kondensmilch gezuckert', 'milchmädchen',
      'buttermilch', 'ayran', 'kefir', 'molke',
      // Käse - Schnittkäse
      'käse', 'schnittkäse', 'gouda', 'jung', 'mittelalt', 'alt', 'uralt',
      'edamer', 'emmentaler', 'appenzeller', 'gruyère', 'comté',
      'tilsiter', 'butterkäse', 'leerdammer', 'maasdamer',
      'bergkäse', 'alpkäse', 'allgäuer emmentaler', 'schweizer käse',
      'cheddar', 'red cheddar', 'mild cheddar', 'mature cheddar',
      'manchego', 'mahon', 'raclette', 'raclettekäse',
      // Käse - Hartkäse
      'hartkäse', 'parmesan', 'parmigiano reggiano', 'grana padano',
      'pecorino', 'pecorino romano', 'sbrinz', 'montasio',
      // Käse - Weichkäse
      'weichkäse', 'camembert', 'brie', 'chaumes', 'géramont',
      'münster', 'limburger', 'romadur', 'handkäse',
      'taleggio', 'reblochon', 'époisses', 'pont-lévêque',
      // Käse - Frischkäse
      'frischkäse', 'doppelrahm frischkäse', 'philadelphia', 'exquisa', 'bresso',
      'kräuterfrischkäse', 'knoblauch frischkäse', 'natur frischkäse',
      'körniger frischkäse', 'hüttenkäse', 'cottage cheese',
      'ricotta', 'mascarpone', 'boursin',
      // Käse - Schmelzkäse & Streichkäse
      'schmelzkäse', 'schmelzkäseecken', 'die lachende kuh', 'le gruyère',
      'scheibletten', 'toast scheiben', 'burger cheese',
      'streichkäse', 'schmierkäse', 'kochkäse', 'kräuterkäse',
      // Käse - Sonderkäse
      'mozzarella', 'büffelmozzarella', 'burrata', 'scamorza',
      'feta', 'fetakäse', 'schafskäse', 'hirtenkäse', 'balkankäse',
      'ziegenkäse', 'ziegenfrischkäse', 'ziegenrolle', 'chèvre',
      'gorgonzola', 'blauschimmelkäse', 'roquefort', 'stilton', 'danish blue',
      'halloumi', 'paneer',
      'ofenkäse', 'backcamembert',
      'käsemischung', 'reibekäse', 'pizzakäse', 'gratinkäse',
      // Joghurt & Quark
      'joghurt', 'naturjoghurt', 'vollmilchjoghurt', 'fettarmer joghurt', 'magermilchjoghurt',
      'fruchtjoghurt', 'erdbeerjoghurt', 'vanillejoghurt', 'pfirsichjoghurt',
      'griechischer joghurt', 'türkischer joghurt', 'skyr', 'isländischer skyr',
      'soja joghurt', 'kokosjoghurt', 'hafer joghurt',
      'trinkjoghurt', 'lassi', 'smoothie joghurt',
      'quark', 'speisequark', 'magerquark', 'sahnequark', 'rahmquark',
      'quark 20%', 'quark 40%', 'topfen', 'quarkdessert', 'quarkspeise',
      // Sahne & Creme
      'sahne', 'schlagsahne', 'süße sahne', 'sprühsahne', 'sprühcreme',
      'saure sahne', 'sauerrahm', 'schmand', 'schmant', 'crème fraîche',
      'creme legere', 'kochcreme', 'cuisine', 'rama cremefine',
      'kaffeesahne', 'kondensmilch', 'kaffeemilch', 'coffee creamer',
      'soja sahne', 'hafer cuisine', 'kokos cuisine',
      // Butter & Margarine
      'butter', 'markenbutter', 'süßrahmbutter', 'sauerrahmbutter',
      'biobutter', 'irische butter', 'kerrygold', 'französische butter',
      'kräuterbutter', 'knoblauchbutter', 'salzbutter', 'gesalzene butter',
      'butterschmalz', 'ghee', 'bratbutter', 'butterreinfett',
      'margarine', 'pflanzenmargarine', 'rama', 'becel', 'lätta',
      'alsan', 'vegane margarine', 'halbfettmargarine',
      // Eier
      'ei', 'eier', 'hühnereier', 'frische eier',
      'bio eier', 'bioeier', 'freilandeier', 'bodenhaltung',
      'wachteleier', 'enteneier', 'gänseeier',
      'flüssigei', 'eiklar', 'eigelb', 'eiweiß',
      // Desserts & Pudding
      'pudding', 'vanillepudding', 'schokoladenpudding', 'karamellpudding',
      'grießpudding', 'reispudding', 'milchreis',
      'dessert', 'mousse', 'schokomousse', 'tiramisu',
      'panna cotta', 'crème brulée', 'crème caramel', 'flan',
      'götterspeise', 'wackelpudding', 'vanillecreme',
      // Allgemein
      'milchprodukte', 'molkereiprodukte', 'laktosefrei', 'vegan', 'bio'
    ],
    // Backwaren
    '4': [
      // Brot
      'brot', 'laib', 'weißbrot', 'vollkornbrot', 'mehrkornbrot', 'schwarzbrot',
      'roggenbrot', 'dinkelbrot', 'weizenbrot', 'sauerteigbrot', 'bauernbrot',
      'toast', 'toastbrot', 'vollkorntoast', 'sandwich toast', 'buttertoast',
      'mischbrot', 'graubrot', 'landbrot', 'hausbrot', 'hausmacherbrot',
      'ciabatta', 'baguette', 'fladenbrot', 'pita', 'focaccia',
      'pumpernickel', 'knäckebrot', 'zwieback', 'melba toast',
      'eiweißbrot', 'low carb brot', 'glutenfreies brot',
      'körnerbrot', 'sonnenblumenkernbrot', 'kürbiskernbrot',
      'walnussbrot', 'olivenbrot', 'tomatenbrot', 'zwiebelbrot',
      // Brötchen
      'brötchen', 'semmeln', 'schrippen', 'weck', 'weckle',
      'sonntagsbrötchen', 'kaiserbrötchen', 'hamburgerbrötchen', 'burgerbrötchen',
      'vollkornbrötchen', 'körnerbrötchen', 'mehrkornbrötchen',
      'weizenbrötchen', 'dinkelbrötchen', 'roggenbrötchen',
      'laugenbrötchen', 'laugengebäck', 'laugenstange', 'laugenbaguette',
      'brezel', 'brezeln', 'breze', 'laugenbrezel', 'butterbrezel',
      'sesambrötchen', 'mohnbrötchen', 'käsebrötchen', 'zwiebelbrötchen',
      'croissant', 'croissants', 'buttercroissant', 'schinken croissant', 'schokocroissant',
      'hörnchen', 'gipfeli', 'pain au chocolat', 'pain au raisin',
      'bagel', 'bagels', 'new york bagel', 'sesambagel', 'mohnbagel',
      // Feingebäck süß
      'kuchen', 'blechkuchen', 'rührkuchen', 'marmorkuchen', 'zitronenkuchen',
      'käsekuchen', 'cheesecake', 'apfelkuchen', 'obstkuchen', 'streuselkuchen',
      'zwetschgenkuchen', 'kirschkuchen', 'rhabarberkuchen',
      'torte', 'sahnetorte', 'obsttorte', 'schwarzwälder kirschtorte',
      'donauwelle', 'frankfurter kranz', 'bienenstich',
      'muffin', 'muffins', 'blaubeermuffin', 'schokimuffin', 'vanillemuffin',
      'cupcake', 'cupcakes',
      'donut', 'donuts', 'berliner', 'krapfen', 'pfannkuchen',
      'plunder', 'plundergebäck', 'kopenhagener', 'franzbrötchen', 'rosinenschnecke',
      'zimtschnecke', 'nussschnecke', 'hefeschnecke', 'hefezopf',
      'stollen', 'christstollen', 'mandelstollen', 'mohnstollen',
      'strudel', 'apfelstrudel', 'topfenstrudel', 'quarkstrudel',
      'gugelhupf', 'napfkuchen', 'sandkuchen', 'biskuitrolle',
      'brownies', 'blondies', 'cookies', 'american cookies',
      // Kekse & Gebäck
      'keks', 'kekse', 'butterkeks', 'doppelkeks', 'plätzchen',
      'cookies', 'chocolate chip cookies', 'haferkekse', 'vollkornkekse',
      'printen', 'lebkuchen', 'pfefferkuchen', 'spekulatius', 'dominosteine',
      'cantuccini', 'amaretti', 'makronen', 'kokosmakronen',
      'florentiner', 'spritzgebäck', 'vanillekipferl', 'zimtsterne',
      'mürbeteigkekse', 'butterplätzchen', 'ausstechplätzchen',
      'digestive', 'shortbread', 'rich tea',
      'leibniz', 'bahlsen', 'oreo', 'prinzenrolle', 'pick up',
      'knusperflocken', 'cornflakes kekse',
      // Knäckebrot & Cracker
      'knäckebrot', 'knäcke', 'ryvita', 'wasa',
      'cracker', 'salzcracker', 'wassercracker', 'vollkorncracker',
      'grissini', 'breadsticks', 'sesam stangen',
      'reiswaffel', 'reiswaffeln', 'maiswaffel', 'reiskrispies',
      'zwieback', 'russisch brot',
      // Backmischungen & Zutaten
      'mehl', 'weizenmehl', 'type 405', 'type 550', 'type 1050',
      'dinkelmehl', 'roggenmehl', 'vollkornmehl', 'graham mehl',
      'hartweizengrieß', 'weichweizengr ieß', 'grieß', 'polenta', 'maismehl',
      'reismehl', 'buchweizenmehl', 'kichererbsenmehl', 'mandelmehl',
      'speisestärke', 'maisstärke', 'kartoffelstärke', 'mondamin',
      'backpulver', 'natron', 'hefe', 'trockenhefe', 'frischhefe', 'würfelhefe',
      'vanillezucker', 'vanillinzucker', 'puderzucker', 'hagelzucker',
      'backmischung', 'kuchenmischung', 'muffinmischung', 'pfannkuchenmischung',
      'pizzateig', 'blätterteig', 'mürbeteig', 'hefeteig', 'strudelteig', 'filoteig',
      // Allgemein
      'backwaren', 'gebäck', 'feingebäck', 'dauerbackwaren', 'frischgebäck'
    ],
    // Getränke
    '5': [
      // Wasser
      'wasser', 'mineralwasser', 'sprudelwasser', 'sprudel', 'medium', 'stilles wasser',
      'tafelwasser', 'quellwasser', 'heilwasser', 'leitungswasser',
      'vittel', 'evian', 'volvic', 'gerolsteiner', 'apollinaris', 'selters',
      'san pellegrino', 'perrier', 'acqua panna',
      'infused water', 'aromawasser', 'vitamin water',
      // Saft & Nektar
      'saft', 'direktsaft', 'fruchtsaft', '100% saft',
      'orangensaft', 'o-saft', 'apfelsaft', 'apfel-saft', 'multivitaminsaft',
      'traubensaft', 'kirschsaft', 'sauerkirschsaft', 'cranberrysaft',
      'ananassaft', 'mangosaft', 'pfirsichsaft', 'maracujasaft',
      'gemüsesaft', 'tomatensaft', 'karottensaft', 'rote bete saft',
      'nektar', 'fruchtnektar', 'bananennektar', 'pfirsichnektar',
      'schorle', 'apfelschorle', 'weinschorle', 'rhabarberschorle',
      'saftschorle', 'fruchtschorle',
      // Limonade & Softdrinks
      'limo', 'limonade', 'zitronenlimonade', 'orangenlimonade',
      'cola', 'coca cola', 'coke', 'pepsi', 'cola zero', 'cola light',
      'pepsi max', 'fritz cola', 'afri cola', 'club mate', 'mate',
      'sprite', 'fanta', '7up', 'schweppes', 'bitter lemon', 'ginger ale',
      'spezi', 'mezzo mix', 'paulaner spezi',
      'bionade', 'lemonaid', 'now', 'granini',
      'almdudler', 'rivella',
      // Energy & Sport
      'energy', 'energydrink', 'energy drink', 'red bull', 'monster', 'rockstar',
      '28 black', 'effect', 'flying horse', 'booster',
      'sportgetränk', 'iso', 'isotonisch', 'gatorade', 'powerade', 'isostar',
      'proteinshake', 'protein drink', 'whey drink',
      // Eistee
      'eistee', 'ice tea', 'icetea', 'pfir sichtee', 'zitronentee', 'pfirsich eistee',
      'nestea', 'lipton ice tea', 'fuze tea',
      // Bier
      'bier', 'pils', 'pilsner', 'export', 'premium pils',
      'helles', 'helles bier', 'lagerbier',
      'weizen', 'weißbier', 'hefeweizen', 'kristallweizen', 'dunkelweizen',
      'weizenbock', 'schwarzbier', 'dunkles', 'dunkles bier',
      'altbier', 'alt', 'kölsch',
      'bockbier', 'doppelbock', 'maibock', 'starkbier',
      'radler', 'alsterwasser', 'russ', 'biermischgetränk',
      'alkoholfrei', 'alkoholfreies bier', '0,0%',
      'craft beer', 'ipa', 'pale ale', 'stout', 'porter',
      'lager', 'märzen', 'kellerbier', 'zwickl',
      // Wein & Sekt
      'wein', 'rotwein', 'weißwein', 'rosé', 'roséwein',
      'bordeaux', 'burgunder', 'spätburgunder', 'pinot noir',
      'merlot', 'cabernet sauvignon', 'shiraz', 'tempranillo',
      'riesling', 'chardonnay', 'sauvignon blanc', 'grauburgunder', 'pinot grigio',
      'prosecco', 'sekt', 'schaumwein', 'champagner', 'cava', 'crémant',
      'glühwein', 'punsch', 'feuerzangenbowle',
      'portwein', 'sherry', 'madeira', 'marsala',
      // Spirituosen
      'schnaps', 'obstschnaps', 'obstler', 'korn', 'doppelkorn',
      'vodka', 'wodka', 'absolut', 'smirnoff', 'grey goose',
      'whisky', 'whiskey', 'bourbon', 'scotch', 'single malt', 'jack daniels', 'jim beam',
      'rum', 'weißer rum', 'brauner rum', 'bacardi', 'havana club',
      'gin', 'dry gin', 'london dry', 'hendricks', 'bombay sapphire', 'gordons',
      'tequila', 'mezcal',
      'likör', 'eierlikör', 'sahnelikör', 'kaffeelikör', 'amaretto', 'bailey s',
      'limoncello', 'sambuca', 'jägermeister', 'underberg', 'fernet', 'grappa',
      'cognac', 'brandy', 'weinbrand', 'armagnac',
      'vermouth', 'wermut', 'aperitif', 'campari', 'aperol',
      'absinth', 'pernod', 'pastis', 'ouzo', 'raki',
      // Kaffee
      'kaffee', 'kaffeebohnen', 'gemahlener kaffee', 'filterkaffee',
      'espresso', 'espressobohnen', 'espressopulver',
      'cappuccino', 'latte macchiato', 'milchkaffee', 'café au lait',
      'americano', 'flat white', 'cortado', 'macchiato',
      'kaffee kapseln', 'nespresso', 'dolce gusto', 'tassimo',
      'kaffeepads', 'senseo', 'tchibo cafissimo',
      'instantkaffee', 'löslicher kaffee', 'nescafé', 'gold',
      'eiskaffee', 'cold brew', 'frappé',
      'kaffeeweißer', 'kaffeemilch', 'coffee mate',
      // Tee
      'tee', 'teebeutel', 'loser tee',
      'schwarztee', 'schwarzer tee', 'ceylon', 'assam', 'darjeeling', 'earl grey', 'english breakfast',
      'grüner tee', 'grüntee', 'matcha', 'sencha', 'gunpowder', 'jasmin tee',
      'weißer tee', 'oolong', 'pu erh', 'gelber tee',
      'kräutertee', 'kamillentee', 'pfefferminztee', 'fencheltee', 'salbeitee',
      'brennesseltee', 'ingwertee', 'melissentee',
      'früchtetee', 'hagebuttentee', 'apfeltee', 'waldfrucht', 'beerenmix',
      'rooibos', 'honeybush', 'mate tee', 'lapacho',
      'chai', 'chai latte', 'masala chai',
      'eistee pulver', 'instant tee',
      // Kakao & Schokolade
      'kakao', 'kakaopulver', 'trinkschokolade', 'heiße schokolade',
      'kakaogetränk', 'nesquik', 'kaba', 'ovomaltine',
      'schoko drink', 'schokomi lch',
      // Smoothies & Shakes
      'smoothie', 'grüner smoothie', 'fruchtsmoothie', 'beeren smoothie',
      'true fruits', 'innocent', 'rauch smoothie',
      'shake', 'milchshake', 'fruchtshake', 'bananenshake',
      'açai bowl', 'smoothie bowl',
      // Sonstiges
      'sirup', 'fruchtsirup', 'holundersirup', 'himbeersirup', 'karamellsirup',
      'tonic', 'tonic water', 'ginger beer', 'bitterlemon',
      'kokoswasser', 'kokosmilch drink', 'mandelmilch drink',
      'kombucha', 'kefir drink', 'lassi',
      'trinkjoghurt', 'actimel', 'yakult',
      // Allgemein
      'getränke', 'drinks', 'softdrinks', 'kaltgetränke', 'heißgetränke'
    ],
    // Snacks
    '6': [
      // Chips & Knabberzeug
      'chips', 'kartoffelchips', 'rifflechips', 'stapelchips', 'kesselchips',
      'pringles', 'lays', 'funny frisch', 'chio', 'lorenz',
      'paprikachips', 'salz chips', 'sourcream chips', 'essig chips',
      'doritos', 'nachos', 'tortilla chips', 'taco chips',
      'mais chips', 'chili chips', 'jalapeño chips',
      'popcorn', 'süßes popcorn', 'salziges popcorn', 'karamell popcorn',
      'butterpop corn', 'mikrowellen popcorn', 'cinema popcorn',
      'salzstangen', 'salzsticks', 'laugenstangen',
      'flips', 'erdnussflips', 'maisflips', 'erdnuss locken',
      'cracker', 'salzcracker', 'tuc', 'ritz', 'club social',
      'bretzel', 'brezeln', 'minibrezel',
      'erdnüsse geröstet', 'erdnüsse gesalzen',
      'studentenfutter', 'nussmischung', 'trail mix',
      'wasabi erbsen', 'geröstete kichererbsen',
      'reiswaffel', 'maiswaffel',
      // Schokolade & Riegel
      'schokolade', 'vollmilchschokolade', 'zartbitterschokolade', 'weiße schokolade',
      'milka', 'ritter sport', 'lindt', 'merci', 'ferrero', 'toblerone',
      'schokoriegel', 'mars', 'snickers', 'twix', 'bounty', 'kitkat',
      'lion', 'kinderriegel', 'kinder bueno', 'kinder country', 'hanuta',
      'duplo', 'knoppers', 'balisto', 'manner',
      'corny', 'müsliriegel', 'cerealienriegel', 'fruchtriegel',
      'proteinriegel', 'eiweißriegel', 'protein bar',
      'energieriegel', 'powerbar',
      'pralinen', 'trüffel', 'mon chéri', 'rocher', 'raffaello',
      'toffifee', 'celebrations', 'quality street',
      // Bonbons & Kaugummi
      'bonbon', 'bonbons', 'lutschbonbon', 'drops',
      'lutscher', 'lollipop', 'lolli', 'chupa chups',
      'kaugummi', 'kaugummis', 'orbit', 'airwaves', 'wrigleys',
      'mentos', 'fishermans friend', 'ricola', 'halls',
      'pfefferminz', 'pfefferminzbonbon', 'eukalyptus bonbon',
      'nimm2', 'center shock', 'ahoj brause',
      // Fruchtgummi & Lakritz
      'gummibärchen', 'haribo', 'goldbären', 'weingummi', 'fruchtgummi',
      'katjes', 'trolli', 'nimm2 soft', 'maoam',
      'schaumzucker', 'marshmallow', 'mäusespeck', 'schokokuss',
      'lakritz', 'lakritze', 'salzlakritz', 'lakritzschnecke',
      // Nüsse & Kerne
      'nüsse', 'nussmix', 'studentenfutter',
      'erdnüsse', 'peanuts', 'erdnusskerne',
      'mandel', 'mandeln', 'mandelkerne', 'gebrannte mandeln',
      'walnuss', 'walnüsse', 'walnusskerne',
      'haselnuss', 'haselnüsse', 'haselnusskerne',
      'cashew', 'cashewkerne', 'cashewnüsse',
      'pistazien', 'pistazienkerne',
      'paranüsse', 'paranuss', 'macadamia', 'macadamianüsse',
      'pekannüsse', 'pekannuss',
      'kürbiskerne', 'sonnenblumenkerne', 'pinienkerne',
      'chiasamen', 'leinsamen', 'sesam', 'mohn',
      // Trockenfrüchte
      'trockenfrüchte', 'dörrfrüchte', 'trockenobst',
      'rosinen', 'sultaninen', 'korinthen',
      'datteln', 'getrocknete datteln', 'medjool datteln',
      'feigen', 'getrocknete feigen', 'aprikosen getrocknet',
      'pflaumen getrocknet', 'backpflaumen', 'trockenpflaumen',
      'getrocknete mango', 'getrocknete ananas', 'bananenchips',
      'apfelringe', 'getrocknete cranberries',
      // Eis & Tiefkühlsnacks
      'eis', 'eiscreme', 'speiseeis',
      'magnum', 'ben & jerry', 'häagen dazs', 'langnese', 'schöller',
      'eis am stiel', 'wassereis', 'fruchteis', 'calippo', 'solero',
      'cornetto', 'nogger', 'flutsch finger',
      'eisbecher', 'split', 'dolomiti', 'viennetta',
      'tiefkühlpommes', 'pommes', 'fritten', 'pommes frites',
      'süßkartoffelpommes', 'wedges', 'potato wedges',
      'kroketten', 'kartoffelecken',
      'nuggets', 'chicken nuggets', 'hähnchennuggets',
      'fischstäbchen', 'backfisch',
      'chili cheese', 'mozzarella sticks', 'käsenuggets',
      'frühlingsrollen', 'samosa', 'chicken wings tiefkühl',
      'pizza', 'tiefkühlpizza', 'salamipizza', 'margherita', 'quattro formaggi',
      'steinofenpizza', 'ristorante', 'big pizza', 'wagner pizza',
      // Fertiggerichte
      'ravioli', 'tortellini', 'gnocchi',
      'lasagne', 'cannelloni',
      'burger', 'cheeseburger', 'hamburger',
      'hot dog', 'würstchen im schlafrock',
      'flammkuchen', 'quiche', 'tarte',
      // Süßwaren
      'gummibären', 'weingummi', 'fruchtgummi',
      'schokokuss', 'negerkuss', 'dickmann',
      'popcorn süß', 'zuckerwatte',
      'karamell', 'karamellbonbon', 'sahne karamell', 'toffee',
      'lolly', 'dauerlutscher',
      // Allgemein
      'snack', 'snacks', 'knabberei', 'knabberartikel',
      'süßigkeit', 'süßigkeiten', 'süßwaren', 'nascherei',
      'party snacks', 'fingerfood', 'knabbermix'
    ],
    // Haushalt
    '7': [
      // Reinigung - Geschirr
      'spülmittel', 'geschirrspülmittel', 'handspülmittel', 'fairy', 'pril',
      'spülmaschinentabs', 'spültabs', 'finish tabs', 'somat tabs',
      'spülmaschinenpulver', 'geschirrspülpulver', 'klarspüler', 'spülmaschinensalz',
      'maschinenreiniger', 'geschirrspülmaschinenpflege',
      // Reinigung - Wäsche
      'waschmittel', 'flüssigwaschmittel', 'waschpulver', 'vollwaschmittel',
      'colorwaschmittel', 'feinwaschmittel', 'wollwaschmittel', 'schwarzwaschmittel',
      'persil', 'ariel', 'lenor', 'spee', 'frosch',
      'weichspüler', 'wäscheparfüm', 'lenor weichspüler',
      'fleckentferner', 'fleckensalz', 'gallseife', 'vorwaschspray',
      'hygienespüler', 'desinfektion wäsche',
      'waschmaschinenpflege', 'entkalker waschmaschine',
      // Reinigung - Oberflächen
      'allzweckreiniger', 'universalreiniger', 'meister proper', 'ajax',
      'glasreiniger', 'fensterreiniger', 'sidolin',
      'badreiniger', 'bad entkalker', 'duschkabinenreiniger',
      'wc reiniger', 'toilettenreiniger', 'kloreiniger', 'wc stein', 'wc gel',
      'küchenreiniger', 'fettlöser', 'backofen reiniger', 'herd reiniger',
      'edelstahlreiniger', 'edelstahlpflege',
      'möbelpolitur', 'holzpflege', 'pronto',
      'bodenreiniger', 'bodenwischer', 'wischwasser',
      'teppichreiniger', 'polsterreiniger', 'vanish',
      'schimmelentferner', 'schimmelspray',
      'desinfektionsmittel', 'desinfektionsspray', 'sagrotan',
      'essigreiniger', 'essigessenz', 'zitronensäure',
      'putzstein', 'scheuermilch', 'ata', 'cif',
      // Papierprodukte
      'toilettenpapier', 'klopapier', 'wc papier', '3 lagig', '4 lagig',
      'küchenrolle', 'küchenpapier', 'zewa', 'tempo',
      'taschentücher', 'papiertaschentücher', 'tempo taschentücher',
      'servietten', 'papierservietten', 'stoffservietten',
      'pappteller', 'plastikbecher', 'einweggeschirr',
      'backpapier', 'butterbrotpapier', 'pergamentpapier',
      // Müll & Lagerung
      'müllbeutel', 'abfallbeutel', 'müllsack', 'biomüllbeutel',
      'gelber sack', 'wertstoffsack',
      'gefrierbeutel', 'tiefkühlbeutel', 'gefrierdosen',
      'frischhaltefolie', 'alufolie', 'alufolte', 'klarsichtfolie',
      'backpapier', 'butterbrotpapier',
      'brotdose', 'lunchbox', 'vorratsdose', 'tupperware',
      'ziplock', 'zip beutel', 'druckverschlussbeutel',
      // Putzutensilien
      'schwamm', 'putzschwamm', 'spülschwamm', 'topfkratzer',
      'mikrofasertuch', 'putztuch', 'putzlappen', 'geschirrtuch',
      'staubtuch', 'wischtuch', 'fensterleder',
      'besen', 'handfeger', 'kehrblech', 'kehrschaufel',
      'wischmop', 'bodenwischer', 'mopp', 'vileda',
      'eimer', 'putzeimer',
      'staubsaugerb eutel', 'staubsaugerbeutel', 'swirl',
      'gummihandschuhe', 'putzhandschuhe', 'einweghandschuhe',
      // Körperpflege - Haare
      'shampoo', 'haarshampoo', 'anti schuppen', 'volumenshampoo',
      'trockenshampoo', 'repair shampoo', 'babyshampoo',
      'conditioner', 'spülung', 'haarkur', 'haarmaske',
      'haarspray', 'haargel', 'haarwachs', 'schaumfestiger',
      'haaröl', 'arganöl', 'kokosöl haare',
      'haarfärbemittel', 'haarfarbe', 'tönung',
      'blondierung', 'strähnchen',
      // Körperpflege - Duschen & Baden
      'duschgel', 'duschbad', 'shower gel', 'body wash',
      'nivea', 'fa', 'dove', 'axe',
      'seife', 'handseife', 'flüssigseife', 'kernseife', 'aleppo seife',
      'bodylotion', 'körperlotion', 'bodymilk', 'bodyöl',
      'creme', 'hautcreme', 'körpercreme', 'handcreme',
      'gesichtscreme', 'tagescreme', 'nachtcreme', 'augencreme',
      'peeling', 'körperpeeling', 'gesichtspeeling',
      'badezusatz', 'schaumbad', 'badeöl', 'badesalz',
      'duftöl', 'ätherisches öl',
      // Körperpflege - Zähne
      'zahnpasta', 'zahncreme', 'zahnpasta sensitiv', 'zahnpasta weiß',
      'elmex', 'aronal', 'blend a med', 'odol',
      'zahnbürste', 'elektrische zahnbürste', 'zahnseide',
      'mundspülung', 'mundwasser', 'listerine',
      'zahnpflegekaugummi', 'xylit',
      'zahnspange reiniger', 'prothesen reiniger',
      // Körperpflege - Deo
      'deo', 'deodorant', 'antitranspirant', 'deo spray', 'deo roller',
      'deo stick', 'deo creme', 'naturdeo',
      // Körperpflege - Rasur
      'rasierer', 'einwegrasierer', 'rasierklingen', 'gillette',
      'rasierschaum', 'rasiergel', 'rasiercreme',
      'aftershave', 'rasierwasser', 'balsam',
      'enthaarungscreme', 'wachs', 'warmwachs', 'kaltwachsstreifen',
      // Kosmetik & Pflege
      'sonnencreme', 'sonnenschutz', 'sunblocker', 'after sun',
      'lippenpflege', 'lippenbalsam', 'labello', 'blistex',
      'make up', 'foundation', 'puder', 'concealer',
      'mascara', 'wimperntusche', 'eyeliner', 'kajal',
      'lippenstift', 'lipgloss', 'rouge',
      'nagellack', 'nagellackentferner', 'aceton',
      'parfüm', 'eau de toilette', 'eau de parfum', 'duftwasser',
      'aftershave', 'herrenduft',
      // Damenhygiene
      'binden', 'damenbinden', 'always', 'ob',
      'tampons', 'damenhygiene', 'slipeinlagen',
      'menstruationstasse', 'periodenunterwäsche',
      // Babypflege
      'windeln', 'babywindeln', 'pampers', 'höschenwindeln',
      'feuchttücher', 'babyfeuchttücher', 'baby wipes',
      'babycreme', 'wundschutzcreme', 'penaten',
      'babyöl', 'babypuder', 'babyshampoo', 'babybad',
      // Gesundheit & Erste Hilfe
      'pflaster', 'heftpflaster', 'hansaplast', 'wundpflaster',
      'verband', 'mullbinde', 'elastische binde',
      'watte', 'wattestäbchen', 'wattepads',
      'desinfektionsmittel', 'wunddesinfektion',
      'schmerztabletten', 'aspirin', 'ibuprofen', 'paracetamol',
      'nasenspray', 'hustensaft', 'halstabletten',
      'vitamine', 'vitamin c', 'vitamin d', 'multivitamin',
      'magnesium', 'zink', 'nahrungsergänzung',
      'kondome', 'präservative',
      // Sonstiges
      'batterien', 'aa batterien', 'aaa batterien', 'knopfzellen',
      'glühbirne', 'led lampe', 'leuchtmittel',
      'kerzen', 'teelichter', 'duftkerzen', 'stumpenkerzen',
      'streichhölzer', 'feuerzeug', 'gas feuerzeug',
      'insektenspray', 'mückenspray', 'anti mücken', 'autan',
      'schneckenkorn', 'mottenschutz', 'mottenkugel',
      'lufterfrischer', 'raumduft', 'duftspray', 'airwick',
      'trocknertücher', 'wäscheduft',
      // Allgemein
      'haushalt', 'haushaltswaren', 'drogerie', 'drogeriewaren',
      'reinigung', 'putzmittel', 'hygiene', 'hygieneprodukte'
    ],
  }

  for (const [categoryId, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => name.includes(keyword))) {
      return categoryId
    }
  }

  return '8' // Sonstiges
}

export const getEmojiForItem = (itemName: string): string => {
  const name = itemName.toLowerCase()

  const emojiMap: Record<string, string> = {
    // Obst
    'apfel': '🍎', 'äpfel': '🍎',
    'banane': '🍌', 'bananen': '🍌',
    'orange': '🍊', 'orangen': '🍊',
    'erdbeere': '🍓', 'erdbeeren': '🍓',
    'kirsche': '🍒', 'kirschen': '🍒',
    'traube': '🍇', 'trauben': '🍇',
    'wassermelone': '🍉',
    'ananas': '🍍',
    'pfirsich': '🍑',

    // Gemüse
    'tomate': '🍅', 'tomaten': '🍅',
    'gurke': '🥒', 'gurken': '🥒',
    'karotte': '🥕', 'karotten': '🥕', 'möhre': '🥕',
    'paprika': '🫑',
    'brokkoli': '🥦',
    'salat': '🥬',
    'zwiebel': '🧅', 'zwiebeln': '🧅',
    'knoblauch': '🧄',
    'kartoffel': '🥔', 'kartoffeln': '🥔',

    // Fleisch & Fisch
    'fleisch': '🥩',
    'hähnchen': '🍗', 'huhn': '🍗',
    'fisch': '🐟',
    'garnele': '🦐', 'garnelen': '🦐',
    'bacon': '🥓', 'speck': '🥓',

    // Milchprodukte
    'milch': '🥛',
    'käse': '🧀',
    'ei': '🥚', 'eier': '🥚',
    'butter': '🧈',

    // Backwaren
    'brot': '🍞',
    'croissant': '🥐',
    'bagel': '🥯',
    'kuchen': '🍰',

    // Getränke
    'wasser': '💧',
    'kaffee': '☕',
    'tee': '🍵',
    'bier': '🍺',
    'wein': '🍷',
    'saft': '🧃',

    // Snacks
    'pizza': '🍕',
    'burger': '🍔',
    'pommes': '🍟',
    'popcorn': '🍿',
    'schokolade': '🍫',
    'eis': '🍦',
    'donut': '🍩',
    'cookie': '🍪', 'keks': '🍪',
    'chips': '🥔',
  }

  for (const [keyword, emoji] of Object.entries(emojiMap)) {
    if (name.includes(keyword)) {
      return emoji
    }
  }

  return ''
}
