# Atelier Véloce — Design System & Craftsmanship Brief

## 1. Design Brief
- **Brand Identity**: **Atelier Véloce** — Architectural Leather & Modular Carry Goods (est. Paris & Milan). Handcrafted full-grain Vachetta, architectural box calfskin, water-repellent ballistic twill, and bespoke palladium/brass hardware.
- **Audience**: Connoisseurs of industrial design, architects, creative directors, and discerning urban commuters seeking timeless, functional luxury bags without vulgar logos or ostentatious branding.
- **Primary Action**: Discover meticulously curated modular bag silhouettes, interact with the physical material & hardware customizer, inspect tactile grain details, and execute instant friction-free checkout.
- **Tone Adjectives**: *Monastic*, *Architectural*, *Tactile* (deliberately NOT "clean, modern, sleek").
- **Anti-References**:
  1. *Fast-fashion discount sprawl* (flashing coupon countdown banners, noisy badges, pop-up spin wheels).
  2. *AI VibeCode Slop* (neon purple gradient blobs, single-word glowing italics, generic 3-column feature cards with emojis).
- **Constraints**:
  - WCAG AA contrast compliance across both light and dark stone modes.
  - Zero horizontal overflow across 320px, 375px, 414px, 768px, and 1440px viewports.
  - Core Web Vitals target: LCP < 1.8s, CLS < 0.02, INP < 120ms.

---

## 2. Surface Mode & Design Archetype
- **Surface Mode**: **Persuade** for storefront discovery, editorial lookbook, and product inspection; **Operate** for the modular customizer, cart drawer, and checkout pipeline (0ms latency, high-density tabular layout).
- **Design Archetype**: **Archetype B — Editorial & Refined** fused with **Archetype A — Quiet Precision**:
  - Warm alabaster/mineral paper canvas (`oklch(0.985 0.006 75)`).
  - Razor-sharp 1px hairline borders (`oklch(0.90 0.008 75)`).
  - Editorial display typography with balanced headline rhythm.
  - High-density tabular pricing (`tabular-nums`) and precise technical specifications (dimensions, volumetric capacity in liters, weight in grams).
  - Warm cognac, rich espresso, and obsidian accents.

---

## 3. Color & Token Governance (globals.css)
- **Surfaces**:
  - Canvas: `--bg-canvas` (`oklch(0.985 0.005 75)`) | Dark: `oklch(0.12 0.01 60)`
  - Surface: `--bg-surface` (`oklch(1.0 0 0)`) | Dark: `oklch(0.16 0.012 60)`
  - Raised Surface: `--bg-surface-raised` (`oklch(0.965 0.006 75)`) | Dark: `oklch(0.20 0.015 60)`
  - Active Press: `--bg-surface-active` (`oklch(0.93 0.01 75)`) | Dark: `oklch(0.24 0.02 60)`
- **Borders**:
  - Subtle Hairline: `--border-subtle` (`oklch(0.90 0.008 75)`) | Dark: `oklch(0.25 0.015 60)`
  - Strong Border: `--border-strong` (`oklch(0.80 0.012 75)`) | Dark: `oklch(0.35 0.02 60)`
- **Typography & Roles**:
  - Primary Text: `--text-primary` (`oklch(0.14 0.015 50)`) | Dark: `oklch(0.96 0.005 60)`
  - Secondary Text: `--text-secondary` (`oklch(0.42 0.02 50)`) | Dark: `oklch(0.72 0.01 60)`
  - Muted Text: `--text-muted` (`oklch(0.58 0.015 50)`) | Dark: `oklch(0.50 0.015 60)`
- **Craft Accents**:
  - Cognac Patina: `--accent-cognac` (`oklch(0.52 0.12 45)`)
  - Deep Espresso: `--accent-espresso` (`oklch(0.28 0.04 40)`)
  - Florentine Ochre: `--accent-ochre` (`oklch(0.68 0.14 70)`)

---

## 4. Typography Scale & Settings
- **Display**: High-contrast architectural editorial display serif (`font-serif`, tracking `-0.025em`, `text-wrap: balance`).
- **Body & Interface**: Precision grotesk sans (`font-sans`, clean letterforms, relaxed 1.6 measure, `max-w-prose`).
- **Data & Pricing**: Monospaced tabular numerals (`font-mono`, `tabular-nums`) for prices, dimensions, capacity, and serial IDs.

---

## 5. Motion Physics & 8-State Control Contract
- **Curves**: High-tension ease-out curve `cubic-bezier(0.23, 1, 0.32, 1)` via `motion/react`.
- **0ms Timing**: Filter toggles, currency swaps, tab switches, and variant selections execute at 0ms (instant tactile feedback).
- **Overlays**: Modals and cart drawers cap at 220ms with transform-origin matching the trigger vector.
- **8 States**: All interactive controls implement `default`, `hover`, `:focus-visible` (2px offset ring), `:active` (`scale-[0.98]`), `loading`, `disabled`, `error`, and `success`.
