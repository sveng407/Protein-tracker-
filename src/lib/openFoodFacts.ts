import type { OFFFoodProduct } from '../types';

const BASE = 'https://world.openfoodfacts.net';

export async function fetchByBarcode(barcode: string): Promise<OFFFoodProduct | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(
      `${BASE}/api/v2/product/${barcode}?fields=product_name,nutriments,serving_size,image_url`,
      { signal: controller.signal }
    );
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 1 || !data.product) return null;
    return data.product as OFFFoodProduct;
  } catch {
    return null;
  }
}

export async function searchByName(query: string): Promise<OFFFoodProduct[]> {
  if (!query.trim()) return [];
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const params = new URLSearchParams({
      search_terms: query,
      search_simple: '1',
      action: 'process',
      json: '1',
      fields: 'product_name,nutriments,serving_size',
      page_size: '10',
    });
    const res = await fetch(`${BASE}/cgi/search.pl?${params}`, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products ?? []) as OFFFoodProduct[];
  } catch {
    return [];
  }
}

export function extractProtein(product: OFFFoodProduct): number {
  return product.nutriments?.proteins_100g ?? product.nutriments?.proteins ?? 0;
}

