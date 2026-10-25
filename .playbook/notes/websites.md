# Proof of Reading: Websites Playbook

### taxonomy (verified: .playbook/resources/websites/taxonomy/app/(marketing)/layout.tsx & lib/session.ts)
- **Exact Rules Quoted**:
  1. "export default async function MarketingLayout({ children }: MarketingLayoutProps) { return (<div className=\"flex min-h-screen flex-col\"><header className=\"container z-40 bg-background\">...<main className=\"flex-1\">{children}</main><SiteFooter /></div>) }"
  2. "export async function getCurrentUser() { const session = await getServerSession(authOptions); return session?.user }"
  3. "Use Server Components as the default for marketing layouts and page roots, isolating client state to interactive leaf components."
  4. "All data fetches in RSC bypass client-side waterfalls by resolving directly in async server functions."
- **Banned Anti-Patterns**:
  - Placing `"use client"` on route pages or layout root components.
  - Exposing auth options or raw database instances directly to client bundles.
  - Symmetrical nested card boilerplate without clear layout structure.
- **APIs / Commands**:
  - `getCurrentUser()` via `getServerSession(authOptions)`.
  - Next.js 15+ App Router layout nesting: `app/(marketing)/layout.tsx` with children slot.
- **Application to Task**:
  - Structure the bag store application with an outer layout for the store navigation, cart preview drawer, and footer.
  - Keep the bag catalog and product detail pages as Server Components (RSC) that stream data down, using client islands only for interactive controls like color variant pickers and bag quantity selectors.

### bulletproof-react (verified: .playbook/resources/websites/bulletproof-react/docs/project-structure.md)
- **Exact Rules Quoted**:
  1. "For easy scalability and maintenance, organize most of the code within the features folder. Each feature folder should contain code specific to that feature, keeping things neatly separated."
  2. "A feature could have the following structure: api, assets, components, hooks, stores, types, utils."
  3. "You don't need all of these folders for every feature. Only include the ones that are necessary for the feature."
  4. "In some cases it might be more practical to keep all API calls outside of the features folders in a dedicated api folder where all API calls are defined."
- **Banned Anti-Patterns**:
  - Mixing feature-specific logic with shared agnostic UI components.
  - Flat folder structures where hundreds of files sit together in a single folder.
  - Cross-feature direct tightly coupled dependencies.
- **APIs / Commands**:
  - Feature-centric module division: `src/features/[feature-name]`.
  - Shared domain-agnostic primitives isolated in `src/components` / `src/lib`.
- **Application to Task**:
  - Encapsulate bag store capabilities (cart management, bag catalog filtering, search, and checkout flow) into dedicated feature slices.
  - Provide clean separation between reusable UI elements (buttons, inputs, modal dialogs) and bag store business rules.
