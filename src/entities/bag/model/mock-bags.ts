import { Bag } from "@/shared/types";

export const MOCK_BAGS: Bag[] = [
  {
    id: "arche-briefcase",
    slug: "arche-briefcase",
    name: "L'Arche Briefcase",
    tagline: "Architectural monolithic silhouette in hand-burnished French box calfskin.",
    category: "briefcase",
    priceEur: 1450,
    capacityLiters: 10.5,
    weightGrams: 1220,
    dimensions: { widthMm: 410, heightMm: 300, depthMm: 85 },
    leatherType: "Full-Grain French Box Calfskin",
    liningMaterial: "Italian Micro-Suede & Herringbone Canvas",
    hardwareOptions: [
      { id: "palladium", name: "Matte Palladium", finish: "palladium" },
      { id: "brass", name: "Solid Jewelers Brass", finish: "brass" },
      { id: "black-pvd", name: "Black PVD Titanium", finish: "black-pvd" },
    ],
    colors: [
      { id: "obsidian", name: "Obsidian Black", hex: "#18181b", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80" },
      { id: "espresso", name: "Dark Espresso", hex: "#2b1e1a", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80" },
      { id: "cognac", name: "Cognac Patina", hex: "#854d27", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80" },
    ],
    description: "Designed for modern leaders and architects, L'Arche is sculpted from a single continuous fold of French box calfskin. Features dedicated padded compartment for 16-inch laptops, discreet MagSafe passport pocket, and hand-stitched saddle seams.",
    craftsmanshipNotes: [
      "28 hours of artisan hand-cutting, skiving, and edge-painting in our Milanese workshop.",
      "Reinforced titanium bridge handle engineered to distribute carry pressure evenly.",
      "Double-ended Swiss Riri metal zippers with custom bevel pull-tabs."
    ],
    features: [
      "Accommodates up to 16-inch MacBook Pro",
      "Pass-through rear strap for trolley luggage",
      "Concealed quick-access key leash",
      "Water-resistant microfiber base lining"
    ],
    inStock: true,
    isBestseller: true,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80"
    ],
    rating: 4.95,
    reviewsCount: 38
  },
  {
    id: "flaneur-tote",
    slug: "flaneur-tote",
    name: "Le Flâneur Structured Tote",
    tagline: "Generous everyday vessel in untreated Tuscan vegetable-tanned Vachetta.",
    category: "tote",
    priceEur: 890,
    capacityLiters: 23.0,
    weightGrams: 940,
    dimensions: { widthMm: 460, heightMm: 360, depthMm: 140 },
    leatherType: "Tuscan Vegetable-Tanned Vachetta",
    liningMaterial: "Unlined Natural Suede Flesh with Bonded Canvas Base",
    hardwareOptions: [
      { id: "brass", name: "Solid Jewelers Brass", finish: "brass" },
      { id: "palladium", name: "Matte Palladium", finish: "palladium" },
    ],
    colors: [
      { id: "cognac", name: "Natural Vachetta", hex: "#c48858", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80" },
      { id: "obsidian", name: "Pitch Black", hex: "#18181b", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80" },
      { id: "olive", name: "Forest Olive", hex: "#3b443b", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80" },
    ],
    description: "Le Flâneur is an exercise in restraint. Pure raw edges, zero redundant lining, and hand-peened solid brass rivets. The untreated Vachetta develops a golden amber patina that documents your personal journeys.",
    craftsmanshipNotes: [
      "Cut from prime shoulder sections of Italian steers tanned with chestnut extract.",
      "Handles reinforced with concealed vegetable-tanned cord to prevent stretching.",
      "Suspended internal zip compartment for tablet, wallet, and sunglasses."
    ],
    features: [
      "Open-top access with magnetic horn snap closure",
      "Flat reinforced base stands upright on flat surfaces",
      "Detachable internal organizer pouch included",
      "Drop length: 26cm designed for comfortable over-coat carry"
    ],
    inStock: true,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80"
    ],
    rating: 4.88,
    reviewsCount: 24
  },
  {
    id: "nomade-weekender",
    slug: "nomade-weekender",
    name: "Le Nomade 48H Holdall",
    tagline: "Voluminous travel duffle combining heavyweight pebble calf with Cordura 1050D.",
    category: "weekender",
    priceEur: 1820,
    capacityLiters: 44.0,
    weightGrams: 1850,
    dimensions: { widthMm: 520, heightMm: 320, depthMm: 260 },
    leatherType: "2.2mm Full-Grain Alpine Bullhide & Ballistic Canvas",
    liningMaterial: "Durable Belgian Linen Canvas",
    hardwareOptions: [
      { id: "palladium", name: "Matte Palladium", finish: "palladium" },
      { id: "black-pvd", name: "Black PVD Titanium", finish: "black-pvd" },
    ],
    colors: [
      { id: "espresso", name: "Bistre Brown", hex: "#261a15", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80" },
      { id: "obsidian", name: "Matte Black", hex: "#121214", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80" },
    ],
    description: "Built for transcontinental voyages and spontaneous weekend departures. Complies strictly with IATA international carry-on standards while maximizing packing volume.",
    craftsmanshipNotes: [
      "Reinforced double-layered bottom with five milled protective brass feet.",
      "Dual heavy-gauge lockable Swiss zippers with companion padlock sheath.",
      "Adjustable padded shoulder strap anchored with forged carabiners."
    ],
    features: [
      "Compliant with international cabin luggage regulations",
      "Waterproof lateral shoe and laundry chamber",
      "Quick-access ticket pocket on outer seam",
      "Includes protective dust bag and leather luggage tag"
    ],
    inStock: true,
    isBestseller: true,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80"
    ],
    rating: 4.98,
    reviewsCount: 52
  },
  {
    id: "messager-sling",
    slug: "messager-sling",
    name: "Le Messager Crossbody",
    tagline: "Ergonomic crossbody sling with anodized aircraft aluminum quick-release clasp.",
    category: "crossbody",
    priceEur: 680,
    capacityLiters: 4.5,
    weightGrams: 490,
    dimensions: { widthMm: 290, heightMm: 190, depthMm: 70 },
    leatherType: "Supple Italian Nappa Calfskin",
    liningMaterial: "Recycled Ripstop Technical Nylon",
    hardwareOptions: [
      { id: "black-pvd", name: "Matte Black Buckle", finish: "black-pvd" },
      { id: "palladium", name: "Brushed Aluminum", finish: "palladium" },
    ],
    colors: [
      { id: "obsidian", name: "Stealth Black", hex: "#141416", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80" },
      { id: "cognac", name: "Warm Amber", hex: "#7d4824", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80" },
    ],
    description: "Streamlined tactical elegance for hands-free city transit. Sits comfortably against the chest or back without hindering movement.",
    craftsmanshipNotes: [
      "Asymmetric gusset that expands dynamically when filled.",
      "Custom AustriAlpin Cobra aluminum buckle machined to micron precision.",
      "RFID-shielded internal card holster."
    ],
    features: [
      "Accommodates iPad Mini and Kindle Paperwhite",
      "Weather-sealed concealed external passport pocket",
      "Integrated key lanyard with quick magnetic disconnect",
      "38mm seatbelt-grade woven webbing strap"
    ],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80"
    ],
    rating: 4.91,
    reviewsCount: 19
  },
  {
    id: "monolithe-backpack",
    slug: "monolithe-backpack",
    name: "Le Monolithe Daypack",
    tagline: "Architectural silhouette with concealed perimeter zippers and water-resistant suede.",
    category: "backpack",
    priceEur: 1250,
    capacityLiters: 19.0,
    weightGrams: 1340,
    dimensions: { widthMm: 430, heightMm: 310, depthMm: 140 },
    leatherType: "Hydrophobic Waxed Nubuck Leather",
    liningMaterial: "Graphite Microfiber Velour",
    hardwareOptions: [
      { id: "palladium", name: "Matte Palladium", finish: "palladium" },
      { id: "black-pvd", name: "Black PVD", finish: "black-pvd" },
    ],
    colors: [
      { id: "obsidian", name: "Anthracite", hex: "#1e1e22", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80" },
      { id: "olive", name: "Drab Olive", hex: "#353d34", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80" },
    ],
    description: "A sculptural, clean-faced backpack created for designers and engineers who demand quiet, unadorned perfection and ergonomic comfort.",
    craftsmanshipNotes: [
      "Anatomical closed-cell EVA foam straps wrapped in perforated glove leather.",
      "Molded back channel that facilitates continuous lumbar ventilation.",
      "Internal suspension harness that isolates your laptop from ground impacts."
    ],
    features: [
      "Dedicated suspended 16-inch laptop pocket",
      "Side access vertical passport chamber",
      "Self-standing structured bottom panel",
      "Dual concealed water bottle chambers"
    ],
    inStock: true,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80"
    ],
    rating: 4.94,
    reviewsCount: 31
  }
];
