# Proof of Reading: Security Playbook

### owasp-cheatsheets (verified: .playbook/resources/security/owasp-cheatsheets/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.md)
- **Exact Rules Quoted**:
  1. "Insecure Direct Object Reference (IDOR) is a vulnerability that arises when attackers can access or modify objects by manipulating identifiers used in a web application's URLs or parameters."
  2. "There are three ingredients to an IDOR: An object such as an account, document, support ticket, transaction... A reference to that object in the form of an ID, UUID, account number... A missing object-level authorization check that allows a user to access or manipulate an object they should not be able to access."
  3. "If an attacker changes this number to 124 and gains access to another user's information, the application is vulnerable to Insecure Direct Object Reference."
  4. "Object references are not limited to numeric identifiers and may include filenames, account numbers, tokens, or other values."
- **Banned Anti-Patterns**:
  - Direct database lookups by raw client ID without verifying session/user ownership.
  - Exposing internal object references in hidden form fields without cryptographic signing.
  - Unsanitized HTML rendering causing Stored/Reflected Cross-Site Scripting (XSS).
- **APIs / Defensive Patterns**:
  - Scoped database access: `where: { id: resourceId, userId: session.user.id }`.
  - Non-enumerable 404 responses instead of leaking resource existence with 403.
- **Application to Task**:
  - In cart updates, order creation, and checkout Server Actions, validate session identity and ensure users can only inspect or modify their own orders.

### nodebestpractices (verified: .playbook/resources/security/nodebestpractices/sections/security/validation.md & secureheaders.md)
- **Exact Rules Quoted**:
  1. "Validation is about being very explicit on what payload our app is willing to accept and failing fast should the input deviate from the expectations."
  2. "This minimizes the attacker's surface who can no longer try out payloads with a different structure, values and length."
  3. "Ensure to run the validation as early as possible - For example, by using Express middleware that validates the request body before the request is passed to the route handler."
  4. "Secure headers prevent clickjacking, MIME sniffing, and cross-site scripting."
- **Banned Anti-Patterns**:
  - Accepting unvalidated JSON bodies directly in backend handlers.
  - Prototype pollution through unguarded recursive object merges.
  - Disabling Content-Security-Policy or running without `X-Content-Type-Options: nosniff`.
  - Storing secrets in client-accessible environment variables.
- **APIs / Defensive Tools**:
  - Strict Zod parsing `.strict()` preventing mass-assignment.
  - HTTP Security Headers (CSP, Strict-Transport-Security, X-Frame-Options: DENY, X-Content-Type-Options: nosniff).
- **Application to Task**:
  - Define strict Zod validation schemas for all bag store mutations (adding to cart, checkout submission, promo code application, contact form).
  - Configure robust HTTP security headers in `next.config.ts`.
  - Enforce zero secret exposure to client bundles.
