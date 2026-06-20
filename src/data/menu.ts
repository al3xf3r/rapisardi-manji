export type Lang = "it" | "en" | "pl";

export type Allergen =
  | "glutine" | "latte" | "uova" | "pesce" | "molluschi"
  | "frutta_a_guscio" | "sedano" | "soia" | "senape"
  | "sesamo" | "lupini" | "arachidi" | "anidride_solforosa";

export const ALLERGEN_LABELS: Record<Allergen, Record<Lang, string>> = {
  glutine:            { it: "Glutine",          en: "Gluten",       pl: "Gluten" },
  latte:              { it: "Latte",             en: "Milk",         pl: "Mleko" },
  uova:               { it: "Uova",              en: "Eggs",         pl: "Jaja" },
  pesce:              { it: "Pesce",             en: "Fish",         pl: "Ryby" },
  molluschi:          { it: "Molluschi",         en: "Molluscs",     pl: "Mięczaki" },
  frutta_a_guscio:    { it: "Frutta a guscio",  en: "Tree nuts",    pl: "Orzechy" },
  sedano:             { it: "Sedano",            en: "Celery",       pl: "Seler" },
  soia:               { it: "Soia",              en: "Soy",          pl: "Soja" },
  senape:             { it: "Senape",            en: "Mustard",      pl: "Gorczyca" },
  sesamo:             { it: "Sesamo",            en: "Sesame",       pl: "Sezam" },
  lupini:             { it: "Lupini",            en: "Lupin",        pl: "Łubin" },
  arachidi:           { it: "Arachidi",          en: "Peanuts",      pl: "Orzeszki ziemne" },
  anidride_solforosa: { it: "Solfiti",           en: "Sulphites",    pl: "Siarczyny" },
};

export interface MenuItem {
  name: string;
  nameEN?: string;
  namePL?: string;
  description?: string;
  descriptionEN?: string;
  descriptionPL?: string;
  price?: number | null;
  available?: boolean;
  allergens?: Allergen[];
}

export interface MenuGroup {
  name: string;
  nameEN?: string;
  namePL?: string;
  items: MenuItem[];
}

export interface MenuCategory {
  slug: string;
  nameIT: string;
  nameEN: string;
  namePL: string;
  image: string;
  groups: MenuGroup[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    slug: "antipasti-contorni",
    nameIT: "Antipasti e Contorni",
    nameEN: "Appetizers and Sides",
    namePL: "Przystawki i Dodatki",
    image: "/antipastirapisardi.webp",
    groups: [
      {
        name: "Antipasti e Contorni",
        nameEN: "Appetizers and Sides",
        namePL: "Przystawki i Dodatki",
        items: [
          {
            name: "Antipasto della casa",
            nameEN: "House Appetizer",
            namePL: "Przystawka Domowa",
            description: "Salame, formaggi, pomodori secchi, funghi piccanti e sottaceti.",
            descriptionEN: "Salami, cheeses, sun-dried tomatoes, spicy mushrooms and pickled vegetables.",
            descriptionPL: "Salami, sery, suszone pomidory, pikantne grzyby i marynowane warzywa.",
            price: 8,
            allergens: ["latte"],
          },
          {
            name: "Insalata verde",
            nameEN: "Green Salad",
            namePL: "Zielona Sałata",
            price: 2.5,
            allergens: [],
          },
          {
            name: "Insalata di pomodoro",
            nameEN: "Tomato Salad",
            namePL: "Sałatka Pomidorowa",
            description: "Pomodoro, cipolla e origano.",
            descriptionEN: "Tomato, onion and oregano.",
            descriptionPL: "Pomidor, cebula i oregano.",
            price: 3,
            allergens: [],
          },
          {
            name: "Insalata mista",
            nameEN: "Mixed Salad",
            namePL: "Sałatka Mieszana",
            price: 3,
            allergens: [],
          },
          {
            name: "Patatine fritte",
            nameEN: "French Fries",
            namePL: "Frytki",
            price: 4,
            allergens: [],
          },
        ],
      },
    ],
  },
  {
    slug: "primi",
    nameIT: "Primi Piatti",
    nameEN: "First Courses",
    namePL: "Pierwsze Dania",
    image: "/primirapisardi.webp",
    groups: [
      {
        name: "Classici",
        nameEN: "Classics",
        namePL: "Klasyczne",
        items: [
          {
            name: "Maccheroni di casa",
            nameEN: "Homemade Macaroni",
            namePL: "Domowy Makaron",
            price: 7,
            allergens: ["glutine"],
          },
          {
            name: "Pennette",
            nameEN: "Penne",
            namePL: "Penne",
            price: 5,
            allergens: ["glutine"],
          },
          {
            name: "Spaghetti",
            nameEN: "Spaghetti",
            namePL: "Spaghetti",
            price: 5,
            allergens: ["glutine"],
          },
          {
            name: "Pasta al forno",
            nameEN: "Oven Baked Pasta",
            namePL: "Makaron Zapiekany",
            price: 6,
            allergens: ["glutine", "latte"],
          },
        ],
      },
      {
        name: "Extra",
        nameEN: "Extras",
        namePL: "Dodatkowe",
        items: [
          {
            name: "Pasta con legumi",
            nameEN: "Pasta with Legumes",
            namePL: "Makaron z Roślinami Strączkowymi",
            price: 6,
            allergens: ["glutine"],
          },
          {
            name: "Lasagne",
            nameEN: "Lasagna",
            namePL: "Lasagne",
            price: 6,
            allergens: ["glutine", "latte"],
          },
          {
            name: "Riso al forno",
            nameEN: "Oven Baked Rice",
            namePL: "Ryż Zapiekany",
            price: 6,
            allergens: [],
          },
        ],
      },
    ],
  },
  {
    slug: "secondi",
    nameIT: "Secondi Piatti",
    nameEN: "Main Courses",
    namePL: "Dania Główne",
    image: "/secondirapisardi.webp",
    groups: [
      {
        name: "Classici",
        nameEN: "Classics",
        namePL: "Klasyczne",
        items: [
          {
            name: "Grigliata mista",
            nameEN: "Mixed Grill",
            namePL: "Grill Mieszany",
            price: 12,
            allergens: [],
          },
          {
            name: "Bistecca",
            nameEN: "Steak",
            namePL: "Stek",
            price: 9,
            allergens: [],
          },
          {
            name: "Costata di maiale",
            nameEN: "Pork Chop",
            namePL: "Kotlet Wieprzowy",
            price: 9,
            allergens: [],
          },
          {
            name: "Involtini di carne",
            nameEN: "Meat Rolls",
            namePL: "Roladki Mięsne",
            price: 10,
            allergens: [],
          },
          {
            name: "Polpette",
            nameEN: "Meatballs",
            namePL: "Pulpety",
            price: 10,
            allergens: [],
          },
          {
            name: "Salsiccia",
            nameEN: "Sausage",
            namePL: "Kiełbasa",
            price: 10,
            allergens: [],
          },
        ],
      },
      {
        name: "Extra",
        nameEN: "Extras",
        namePL: "Dodatkowe",
        items: [
          {
            name: "Agnello al forno",
            nameEN: "Oven Baked Lamb",
            namePL: "Pieczona Jagnięcina",
            price: 12,
            allergens: [],
          },
          {
            name: "Coniglio al forno",
            nameEN: "Oven Baked Rabbit",
            namePL: "Pieczony Królik",
            price: 12,
            allergens: [],
          },
          {
            name: "Pollo al forno",
            nameEN: "Oven Baked Chicken",
            namePL: "Pieczony Kurczak",
            price: 10,
            allergens: [],
          },
          {
            name: "Pesce stocco",
            nameEN: "Stockfish",
            namePL: "Suszony Dorsz",
            price: 12,
            allergens: ["pesce"],
          },
        ],
      },
    ],
  },
  {
    slug: "bevande",
    nameIT: "Bevande",
    nameEN: "Drinks",
    namePL: "Napoje",
    image: "/bevanderapisardi.webp",
    groups: [
      {
        name: "Analcoliche",
        nameEN: "Non-Alcoholic",
        namePL: "Bezalkoholowe",
        items: [
          { name: "Acqua naturale o gassata 1,5L", nameEN: "Still or Sparkling Water 1.5L", namePL: "Woda 1,5L", price: 1.5, allergens: [] },
          { name: "Acqua naturale o gassata 0,5L", nameEN: "Still or Sparkling Water 0.5L", namePL: "Woda 0,5L", price: 1.5, allergens: [] },
          { name: "Bibite 33cl", nameEN: "Soft Drinks 33cl", namePL: "Napój Gazowany 33cl", price: 2, allergens: [] },
          { name: "Bibite 1,5L", nameEN: "Soft Drinks 1.5L", namePL: "Napój Gazowany 1,5L", price: 4, allergens: [] },
        ],
      },
      {
        name: "Birre",
        nameEN: "Beers",
        namePL: "Piwa",
        items: [
          { name: "Birra 66cl", nameEN: "Beer 66cl", namePL: "Piwo 66cl", price: 4, allergens: ["glutine"] },
          { name: "Birra 33cl", nameEN: "Beer 33cl", namePL: "Piwo 33cl", price: 2, allergens: ["glutine"] },
        ],
      },
      {
        name: "Vini e Digestivi",
        nameEN: "Wines and Digestives",
        namePL: "Wina i Digestiwy",
        items: [
          { name: "Vino della casa 1L", nameEN: "House Wine 1L", namePL: "Domowe Wino 1L", price: 6, allergens: ["anidride_solforosa"] },
          { name: "Caffè", nameEN: "Coffee", namePL: "Kawa", price: 1, allergens: [] },
          { name: "Limoncello", nameEN: "Limoncello", namePL: "Limoncello", price: 2, allergens: [] },
        ],
      },
    ],
  },
];
