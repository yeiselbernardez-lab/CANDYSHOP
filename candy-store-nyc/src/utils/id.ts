let seq = 0;

/**
 * Small local ID helper; good enough for UI keys.
 * (No backend, so we just need stable uniqueness within a session.)
 */
export function nextId(prefix: string) {
  seq += 1;
  return `${prefix}-${Date.now()}-${seq}`;
}
