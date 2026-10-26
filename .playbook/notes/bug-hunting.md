# Playbook Notes: Bug Hunting & Deterministic Remediation

### javascript-testing-best-practices (verified: .playbook/resources/bug-hunting/javascript-testing-best-practices/readme.md)

- **Exact Rules Quoted**:
  1. *"Design for lean testing: Testing code is not production-code - Design it to be short, dead-simple, flat, and delightful to work with. One should look at a test and get the intent instantly."* (Section 0)
  2. *"Include 3 parts in each test name: (1) What is being tested? (2) Under what circumstances and scenario? (3) What is the expected result?"* (Section 1.1)
  3. *"Structure tests by the AAA pattern: Structure your tests with 3 well-separated sections Arrange, Act & Assert (AAA). Following this structure guarantees that the reader spends no brain-CPU on understanding the test plan."* (Section 1.2)
  4. *"Don't 'foo', use realistic input data: Many times production bugs are stemmed from certain and realistic input... By using realistic data, we make the tests early-detectors of bugs."* (Section 1.6)

- **Banned Anti-Patterns**:
  - Symptom patching: adding `?` or ignoring errors without fixing root cause.
  - Vague test descriptions like `it("works")` or `it("theme")`.
  - Silent error swallowing: using `catch(() => {})` or `|| true`.
  - Fragile timing: using arbitrary `setTimeout` without clearing or bounding state transitions.

- **APIs / Commands**:
  - `describe(unit, () => { it("When [scenario], then [outcome]", () => { ... }) })`
  - `expect(received).toEqual(expected)` / `expect(element).toHaveClass("dark")`
  - `npx tsc --noEmit`
  - `npm run build`

- **Application to Task**:
  - We isolate the root causes of the theme switching bugs:
    1. Single button icon swap ambiguity (displaying Sun when dark is active, Moon when light is active) vs deterministic segmented capsule control `[ ☼ Light | ☾ Dark ]`.
    2. Abrupt logo pop using `dark:hidden` / `hidden dark:block` causing image display jump vs fixed-aspect container with cross-fade opacity.
    3. Wildcard `html.theme-transitioning * !important` breaking SVG transforms and causing jumpy cutoff vs targeted surface transition properties on structural semantic elements.
    4. Unsynchronized initial hydration state in `<Header />`.
  - We formulate atomic, verified code changes and test deterministically with zero errors.
