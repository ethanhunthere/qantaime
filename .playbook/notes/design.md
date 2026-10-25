# Proof of Reading: Design & Architecture Playbooks

### anti-slop-design (verified: .playbook/resources/design/anti-slop-design/SKILL.md)
- **Exact Rules Quoted**:
  1. "Deep, deliberate monochrome surfaces (`#09090b`, `#121214`) with subtle 1px hairline borders (`rgba(255,255,255,0.08)`)."
  2. "Sentence-case hierarchy, subtle metadata tags, or omit entirely if the heading is self-explanatory."
  3. "Delete visual clutter before adding styling. If an element does not deliver immediate user utility, remove it."
  4. "Uniform, confident typographic weight. Let the whole statement carry authority."
  5. "Missing Interactive States: Buttons that only have hover effects, lacking `:focus-visible`, `:active`, loading, and disabled states."
- **Banned Anti-Patterns**:
  - The "AI Dark Mode" Blob (`radial-gradient` purple/indigo blurred blobs).
  - Single-Word Italic/Color Accents with glowing gradient text.
  - Screaming Eyebrow Labels with tracked out uppercase.
  - Monotonous Slate/Indigo generic tropes.
  - Raw Emojis as icons and vanity metrics.
- **APIs / Commands**:
  - Semantic token systems, bespoke warm espresso surfaces (`#0A0908`, `#120F0D`, `#191613`), subtle hairlines (`rgba(255,255,255,0.06)`).
  - Clean focus outlines (`outline: none` for non-keyboard chart mouse clicks, crisp accessible focus rings where relevant).
- **Application to Task**:
  - Eliminate the white focus rectangle on clicking chart canvas/SVGs.
  - Remove all em dashes (`—`) in line toggles and indicators.
  - Simplify timeframes to strictly `1Y` and `ALL`.
  - Re-align "last updated" to bottom/left corner of headers with subtle visible typography.
  - Redesign Intel Registry sidebar to be narrower in width, taller in height, minimalist, and stripped of AI slop.
  - Fully humanize Home/Hero page with mature, clean, authentic copy and ultra-smooth non-blocking ambient line animation.
  - Purge "quantitative" text globally.


### emilkowalski/skills (verified on-disk: .playbook/resources/design/emilkowalski-skills/skills/emil-design-eng/SKILL.md)
- **Exact Rules Quoted**:
  1. "Specify exact properties; avoid `all` (`transition: transform 200ms ease-out` instead of `transition: all 300ms`)."
  2. "Nothing in the real world appears from nothing (`transform: scale(0.95); opacity: 0` instead of `transform: scale(0)`)."
  3. "`ease-in` on dropdown feels sluggish; `ease-out` with custom curve gives instant feedback."
  4. "Buttons must feel responsive to press (`transform: scale(0.97)` on `:active`)."
  5. "Popovers should scale from their trigger: `transform-origin: var(--transform-origin)` (not modals — modals stay centered)."
  6. "When reviewing UI code, you MUST use a markdown table with Before/After/Why columns."
- **Banned Anti-Patterns**:
  - `transition: all` without explicit animated properties.
  - Initial `scale(0)` on mounting elements (jarring pop-in).
  - Sluggish `ease-in` on enter animations.
  - Missing `:active` press physics on clickable items.
  - Centered transform-origin for contextual dropdowns or menus.
- **APIs / Skills Provided**:
  - `emil-design-eng`, `animate`, `animate-expo`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-performance`, `apple-design`, `ask-sonner`.
- **Application to Task**:
  - Enforce real-world motion physics, snappy `ease-out` curves, tactile `:active` states, and micro-interaction polish across all UI components.
