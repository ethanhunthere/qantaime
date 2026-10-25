export function safeAssign<T extends Record<string, unknown>>(target: T, source: Record<string, unknown>): T {
  for (const key of Object.keys(source)) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue;
    }
    const val = source[key];
    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      (target as Record<string, unknown>)[key] = safeAssign(
        ((target as Record<string, unknown>)[key] || {}) as Record<string, unknown>,
        val as Record<string, unknown>
      );
    } else {
      (target as Record<string, unknown>)[key] = val;
    }
  }
  return target;
}

export function constantTimeStringCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
