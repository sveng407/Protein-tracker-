// Typed localStorage helpers. Used only for the one-time migration of legacy
// localStorage data into Firestore (see AppContext). All live data is in Firestore.

export function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
