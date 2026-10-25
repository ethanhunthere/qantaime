# Proof of Reading: Architecture Playbook

### feature-sliced-design (verified: .playbook/resources/architecture/feature-sliced-design/src/content/docs/docs/reference/layers.mdx & public-api.mdx)
- **Exact Rules Quoted**:
  1. "A module (file) in a slice can only import other slices when they are located on layers strictly below."
  2. "A public API is a contract between a group of modules, like a slice, and the code that uses it. It also acts as a gate, only allowing access to certain objects, and only through that public API."
  3. "Only the necessary parts of the slice should be exposed... It may be tempting to create wildcard re-exports of everything... This hurts the discoverability of a slice."
  4. "Cross-imports are a situation when one slice imports from another slice on the same layer. Usually that is prohibited by the import rule on layers."
  5. "Layers App and Shared are exceptions to this rule — they are both a layer and a slice at the same time. Slices partition code by business domain, and these two layers are exceptions because Shared does not have business domains, and App combines all business domains."
- **Banned Anti-Patterns**:
  - Upward imports (e.g. `entities` or `shared` importing from `features` or `views`).
  - Cross-imports between sibling slices within the same layer without compositional aggregation.
  - Wildcard re-exports (`export * from ...`) in public API barrels.
  - Direct deep imports bypassing the slice `index.ts` entry point (`@/features/cart/ui/cart-item` instead of `@/features/cart`).
  - Exceeding 250 LOC in any single source file.
- **APIs / Commands**:
  - Strict 6-layer downward hierarchy: `app` -> `views` -> `widgets` -> `features` -> `entities` -> `shared`.
  - Public API barrel pattern: `index.ts` exposing explicit contracts and typed components.
- **Application to Task**:
  - Architect the bag store strictly following FSD:
    - `src/app`: Root layout, providers, fonts, CSS tokens.
    - `src/views`: Route assemblies (`StoreView`, `ProductDetailView`, `CheckoutView`).
    - `src/widgets`: Composite UI blocks (`HeaderNav`, `BagGrid`, `CartDrawer`, `Footer`).
    - `src/features`: User actions (`cart`, `bag-filter`, `checkout-form`, `quick-view`).
    - `src/entities`: Domain models (`bag`, `order`, `material`).
    - `src/shared`: Generic primitives (`ui`, `lib`, `types`).
  - Maintain public barrels for every slice and enforce max 250 LOC per file.
