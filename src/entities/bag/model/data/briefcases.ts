import { Bag } from "@/shared/types";

export const briefcases: Bag[] = [
  {
    id: "arche-briefcase",
    slug: "arche-briefcase",
    name: "L'Arche Briefcase",
    tagline: "Çantë zyre me siluetë arkitekturore monolitike prej lëkure viçi franceze.",
    category: "briefcase",
    priceEur: 1450,
    capacityLiters: 10.5,
    weightGrams: 1220,
    dimensions: { widthMm: 410, heightMm: 300, depthMm: 85 },
    leatherType: "Lëkurë Franceze Box Calfskin Full-Grain",
    liningMaterial: "Mikro-Kamosh Italian & Pëlhurë Herringbone",
    hardwareOptions: [
      { id: "palladium", name: "Paladium Mat", finish: "palladium" },
      { id: "brass", name: "Tunxh i Pastër Bizhuterie", finish: "brass" },
      { id: "black-pvd", name: "Titan PVD i Zi", finish: "black-pvd" },
    ],
    colors: [
      { id: "obsidian", name: "E Zezë Obsidian", hex: "#18181b", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80" },
      { id: "espresso", name: "Kafe Ekspreso", hex: "#2b1e1a", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80" },
      { id: "cognac", name: "Konjak Patina", hex: "#854d27", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80" },
    ],
    description: "Krijuar për arkitektë dhe profesionistë elitarë nga një copë e vetme lëkure viçi franceze. Ka hapësirë të mbushur për laptop 16-inch dhe xhep të fshehtë MagSafe.",
    craftsmanshipNotes: [
      "Strukturë e përforcuar me prerje precize dhe lyerje elegante e skajeve.",
      "Dorezë titani e përforcuar për shpërndarje të barabartë të peshës.",
      "Zinxhirë metalikë zviceranë Riri me dy koka."
    ],
    features: [
      "Përshtatet për laptop deri në 16 inç",
      "Rrip i pasmë për valixhe udhëtimi",
      "Mbajtëse çelësash e fshehur",
      "Fund i përforcuar kundër lagështisë"
    ],
    inStock: true,
    isBestseller: true,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80"
    ],
    rating: 4.95,
    reviewsCount: 38
  },
  {
    id: "notaire-portfolio",
    slug: "notaire-portfolio",
    name: "Le Notaire Briefcase",
    tagline: "Çantë tradicionale dokumentash me mbyllje të dyfishtë prej tunxhi.",
    category: "briefcase",
    priceEur: 1320,
    capacityLiters: 11.2,
    weightGrams: 1180,
    dimensions: { widthMm: 400, heightMm: 290, depthMm: 80 },
    leatherType: "Lëkurë Viçi e Lëmuar Toskane",
    liningMaterial: "Liri Natyral Belg",
    hardwareOptions: [
      { id: "brass", name: "Tunxh i Artë Vintage", finish: "brass" },
      { id: "palladium", name: "Paladium i Lëmuar", finish: "palladium" },
    ],
    colors: [
      { id: "cognac", name: "Konjak Toskan", hex: "#7d4824", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80" },
      { id: "obsidian", name: "E Zezë Klasike", hex: "#121214", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80" },
    ],
    description: "Frymëzuar nga aktet noteriale franceze të shekullit të kaluar, Le Notaire ofron tre seksione të ndara për kontrata, laptop dhe stilolapsa luksozë.",
    craftsmanshipNotes: ["Kyç me shifër i certifikuar me saktësi zvicerane.", "Kënde të përforcuara me lëkurë të dyfishtë."],
    features: ["Tre ndarje të brendshme", "Xhep i fshehtë për pasaportë", "Mbyllje me shifër"],
    inStock: true,
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80"],
    rating: 4.91,
    reviewsCount: 22
  },
  {
    id: "bauhaus-folio",
    slug: "bauhaus-folio",
    name: "Le Bauhaus Slim Folio",
    tagline: "Çantë ultra-e hollë për takime biznesi dhe tabletë grafikë.",
    category: "briefcase",
    priceEur: 980,
    capacityLiters: 6.5,
    weightGrams: 750,
    dimensions: { widthMm: 380, heightMm: 270, depthMm: 45 },
    leatherType: "Lëkurë Box Calf e Zezë Mat",
    liningMaterial: "Kamosh Gri Alcantara",
    hardwareOptions: [
      { id: "black-pvd", name: "Titan Mat PVD", finish: "black-pvd" },
      { id: "palladium", name: "Paladium Argjend", finish: "palladium" },
    ],
    colors: [
      { id: "obsidian", name: "Obsidian Mat", hex: "#1c1c1e", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80" },
    ],
    description: "Minimalizëm i skajshëm për minimalistët funksionalë. Pranon MacBook Air 15\" dhe skica arkitekturore pa u fryrë kurrë.",
    craftsmanshipNotes: ["Trashësi uniforme prej 4.5 cm me mbyllje magnetike të padukshme."],
    features: ["Profili më i hollë në koleksion", "Xhep magnetik për telefon", "Lëkurë rezistente ndaj gërvishtjeve"],
    inStock: true,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80"],
    rating: 4.89,
    reviewsCount: 16
  },
  {
    id: "chancellerie-case",
    slug: "chancellerie-case",
    name: "La Chancellerie Executive",
    tagline: "Çantë diplomatike me strukturë të ngurtë dhe mbyllje të sofistikuar.",
    category: "briefcase",
    priceEur: 1680,
    capacityLiters: 13.0,
    weightGrams: 1450,
    dimensions: { widthMm: 430, heightMm: 320, depthMm: 100 },
    leatherType: "Lëkurë Demi e Rrallë Sadlle Bridle",
    liningMaterial: "Mëndafsh & Kamosh të Kuq Hermès",
    hardwareOptions: [
      { id: "brass", name: "Tunxh Masiv i Lustruar", finish: "brass" },
    ],
    colors: [
      { id: "espresso", name: "Ekspreso e Thellë", hex: "#221815", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80" },
    ],
    description: "Krijuar për udhëheqës korporatash dhe diplomatë. Kornizë druri ahu e lehtë e veshur me lëkurë të plotë demi.",
    craftsmanshipNotes: ["Kornizë e brendshme druri ahu francez.", "Kyçje precize me çelës metalik të sigurt."],
    features: ["Kapacitet i zgjeruar", "Kuti e integruar stilolapsi", "Baza me këmbëza mbrojtëse tunxhi"],
    inStock: true,
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80"],
    rating: 4.98,
    reviewsCount: 29
  }
];
