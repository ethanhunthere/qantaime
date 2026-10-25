# Proof of Reading: Swarm Playbook

### crewAI (verified: .playbook/resources/swarm/crewAI/AGENTS.md & README.md)
- **Exact Rules Quoted**:
  1. "CrewAI is an open-source Python framework with high-level abstractions and low-level APIs for building production-ready multi-agent workflows."
  2. "CrewAI Crews: Optimize for autonomy and collaborative intelligence with role-based AI agents."
  3. "CrewAI Flows: Build event-driven automations that combine precise workflow control, single LLM calls, and native support for Crews."
  4. "Write unit tests for new functionality focusing on behavior and not implementation."
  5. "Follow software principles such as DRY and YAGNI. Keep diffs as minimal as possible."
- **Banned Anti-Patterns**:
  - Unstructured agent concurrency causing file collisions and race conditions.
  - Modifying frozen interface contracts mid-implementation without orchestrator sign-off.
  - Blind merging with git conflict overrides (`-X ours` / `-X theirs`).
  - Swallowing errors or hiding failing checks with `|| true`.
- **APIs / Orchestration Principles**:
  - 5-Wave Swarm Matrix:
    - Wave 1: Reconnaissance & Task Graph (DAG)
    - Wave 2: Architecture & Interface Contracts (Frozen schemas/types)
    - Wave 3: Mass Parallel Implementation
    - Wave 4: Topological Integration & Merge (Database -> API -> Logic -> UI -> Views)
    - Wave 5: Hardening, Adversarial QA & Release Gate
- **Application to Task**:
  - Execute the bag store build via the structured 5-wave swarm workflow:
    - Wave 1: Map requirements, dependency graph, and create `.swarm/wave1-recon.md`.
    - Wave 2: Define and freeze all TypeScript interfaces in `@/shared/types/contracts.ts` (Bag, Variant, Cart, Order, Filter).
    - Wave 3: Parallel domain implementation (Entities, Features, UI primitives, Widgets, Views).
    - Wave 4: Topological integration and contract verification.
    - Wave 5: Final adversarial QA, type check (`npx tsc --noEmit`), security scan, and build verification.
