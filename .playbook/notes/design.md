# Proof of Reading: Design & Architecture Playbooks

### avoid-ai-design (verified: .playbook/resources/design/avoid-ai-design/SKILL.md)
- **Exact Rules Quoted**:
  1. "The point is not to chase novelty. It is to replace defaults with decisions. A purple gradient is not bad because purple is bad; it is bad because no one chose it."
  2. "There are two orders of default. The first is the median: purple gradient, Inter, three icon cards. The second is the tasteful escape that became the new median: cream with terracotta, near-black with one acid-green accent, all-caps mono labels, one colored word in the headline, decorative 01/02/03."
  3. "scripts/detect.mjs finds the code-certain tells (marked ⚙ in the catalog) with no model call and no dependencies."
  4. "P0, a layperson recognizes it as AI-made: The purple-to-blue gradient, Inter for everything, an untouched shadcn base theme, gradient headline text, the centered-hero-over-three-cards template."
  5. "P1, a designer or developer recognizes it: The second-order clusters (SD), rounded-2xl shadow-lg on every surface, the default page shell, icon-in-a-rounded-square, stock effects, dead hover and focus states, arrow glyphs stapled to CTAs."
- **Banned Anti-Patterns**:
  - The "dots design" (status indicator dots, glowing accent circles, bullet points, circular swatch dots).
  - Generic seasonal template text ("Koleksioni Vjeshtë / Dimër 2026", "Autumn/Winter 2026").
  - Pill badges above centered hero headers (P0 tell L1).
  - Sparkle icons (`Sparkles`) for AI or customization features (P1 tell I3).
  - Unjustified backdrop blur glassmorphism on flat surfaces (P1 tell K3).
  - Monotonous repeated card grids with no editorial hierarchy.
- **APIs / Commands**:
  - `node .playbook/resources/design/avoid-ai-design/scripts/detect.mjs src/`
  - WCAG AA contrast ratio threshold >= 4.5:1 for body and muted text.
- **Application to Task**:
  - Completely eliminate all circular dot swatches, pill badges, and status indicator dots.
  - Purge "Koleksioni Vjeshtë / Dimër 2026" across all 5 language dictionaries; replace with authentic permanent atelier curation.
  - Fix muted text contrast in `globals.css` (`#9c9488` on `#12100e` yields > 5.6:1).
  - Eliminate `Sparkles` and `Shield` worn icon tropes.

### bugatti (verified: .playbook/resources/design/awesome-design-md/design-md/bugatti/DESIGN.md)
- **Exact Rules Quoted**:
  1. "An austere luxury interface that uses near-pure black canvas, white uppercase letterspaced display, and full-bleed photography as the only voltage."
  2. "There is no accent color, no decorative element, no chrome — only photography, typography, and the brand wordmark."
  3. "display-xl: fontSize 64px, fontWeight 400, lineHeight 1.1, letterSpacing 4px."
  4. "wordmark: fontSize 14px, fontWeight 400, lineHeight 1, letterSpacing 6px."
  5. "rounded: none (zero rounded corners, sharp razor edges throughout)."
- **Banned Anti-Patterns**:
  - Rounded bubble buttons and heavy pill badges.
  - Cheap decorative chrome, gradients, and floating badges.
  - Generic stock cards with low-voltage imagery.
- **Application to Task**:
  - Razor-sharp monolithic geometry (`rounded-none` / crisp 1px hairlines).
  - High-voltage full-bleed photography highlighting leather grain, hand-stitched seams, and architectural silhouettes.
  - Strict letterspaced uppercase typography for luxury titles and wordmark.

### ferrari (verified: .playbook/resources/design/awesome-design-md/design-md/ferrari/DESIGN.md)
- **Exact Rules Quoted**:
  1. "The brand's strongest visual signature is the full-bleed cinematic hero photograph that fills the viewport top with photography, model details, or trackside livery — followed by a tighter editorial body layout below."
  2. "The base canvas is near-black holding pure white display type; generous editorial pacing throughout."
  3. "Type runs at modest weights (display 500, body 400) — never bombastic."
- **Banned Anti-Patterns**:
  - Centered generic templates with identical symmetric columns.
  - Squeezed margins and lack of cinematic negative space.
- **Application to Task**:
  - Introduce an asymmetrical, cinematic hero layout with architectural framing and real atelier coordinates.
  - Generous editorial pacing and rhythm across catalog and product presentation.

### anti-slop-design (verified: .playbook/resources/design/anti-slop-design/SKILL.md)
- **Exact Rules Quoted**:
  1. "Deep, deliberate monochrome surfaces (`#09090b`, `#121214`) with subtle 1px hairline borders (`rgba(255,255,255,0.08)`)."
  2. "Sentence-case hierarchy, subtle metadata tags, or omit entirely if the heading is self-explanatory."
  3. "Delete visual clutter before adding styling. If an element does not deliver immediate user utility, remove it."
  4. "Uniform, confident typographic weight. Let the whole statement carry authority."
- **Banned Anti-Patterns**:
  - Glow effects, fake indicator dots, pill badges, and generic template text.
- **Application to Task**:
  - Remove all unnecessary badge chrome and decorative dots. Let photographic authority and typography lead.

### emilkowalski/skills (verified on-disk: .playbook/resources/design/emilkowalski-skills/skills/emil-design-eng/SKILL.md)
- **Exact Rules Quoted**:
  1. "Specify exact properties; avoid `all` (`transition: transform 200ms ease-out` instead of `transition: all 300ms`)."
  2. "Buttons must feel responsive to press (`transform: scale(0.97)` on `:active`)."
  3. "Nothing in the real world appears from nothing (`transform: scale(0.95); opacity: 0` instead of `transform: scale(0)`)."
- **Application to Task**:
  - Tactile press interactions with `active:scale-[0.98]` and precision transitions.
