import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product, SortKey } from "../types/product";
import { SORT_OPTIONS } from "../types/product";

const PAGE_SIZE = 8;

const comparators: Record<SortKey, (a: Product, b: Product) => number> = {
  relevan: () => 0,
  termurah: (a, b) => a.price - b.price,
  termahal: (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  nama: (a, b) => a.title.localeCompare(b.title, "id"),
};

function toSortKey(value: string | null): SortKey {
  return SORT_OPTIONS.some((o) => o.value === value) ? (value as SortKey) : "relevan";
}

interface UpdateOptions {
  keepPage?: boolean;
  replace?: boolean;
}

export function useProductList(products: Product[]) {
  const [params, setParams] = useSearchParams();

  const q = params.get("q") ?? "";
  const category = params.get("kategori") ?? "";
  const sort = toSortKey(params.get("urut"));
  const requestedPage = Math.max(1, Number(params.get("hal")) || 1);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products],
  );

  const sorted = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    const matched = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!keyword || [p.title, p.brand, p.category].some((v) => v?.toLowerCase().includes(keyword))),
    );
    return [...matched].sort(comparators[sort]);
  }, [products, q, category, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const items = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Menulis perubahan ke URL; halaman kembali ke 1 kecuali keepPage
  const update = (changes: Record<string, string>, options: UpdateOptions = {}) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    if (!options.keepPage) next.delete("hal");
    setParams(next, { replace: options.replace });
  };

  return {
    q,
    category,
    sort,
    page,
    totalPages,
    total: sorted.length,
    items,
    categories,
    hasFilters: q.trim() !== "" || category !== "" || sort !== "relevan",
    setQuery: (value: string) => update({ q: value }, { replace: true }),
    setCategory: (value: string) => update({ kategori: value }),
    setSort: (value: SortKey) => update({ urut: value === "relevan" ? "" : value }),
    setPage: (n: number) => update({ hal: n > 1 ? String(n) : "" }, { keepPage: true }),
    reset: () => setParams({}),
  };
}