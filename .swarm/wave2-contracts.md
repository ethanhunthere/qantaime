# Swarm Wave 2 — Architecture & Interface Contracts

## 1. Frozen Performance & Timing Contracts
- **Theme Mutation Latency Contract**:
  - `document.documentElement.classList.toggle('dark')`: Must occur synchronously in frame-0.
  - `localStorage.setItem('atelier_theme', ...)`: Dispatched in a non-blocking queue/microtask (`queueMicrotask` / `setTimeout(..., 0)`).
- **CSS Transition Timing Budget**:
  - `body, header, footer, main, article, section`: 0ms to 75ms max. No lagging 250ms delays.
  - Radial gradient ambient blobs: **0ms transition-colors** (Instantaneous CSS variable swap). Prevents multi-stop gradient blur recalculation jank.
  - Control pills (`Sun`/`Moon` buttons): `duration-75` or `duration-100` with instant active state.
  - Logo cross-fade: `duration-100` (down from 300ms).

## 2. Frozen TypeScript Contracts
All contracts in `@/shared/types` remain frozen. No modifications to entity schemas required.
All changes are surgical optimizations to styling, GPU paint containment, and non-blocking state updates.
