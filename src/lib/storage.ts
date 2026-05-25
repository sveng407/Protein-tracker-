export function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function storageSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded — silently fail
  }
}

export function storageUpdate<T>(key: string, updater: (prev: T) => T, fallback: T): T {
  const current = storageGet<T>(key, fallback);
  const next = updater(current);
  storageSet(key, next);
  return next;
}
