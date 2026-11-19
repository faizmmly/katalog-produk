import { useFetch } from "../hooks/useFetch";
import { useProductList } from "../hooks/useProductList";
import { fetchAllProducts } from "../services/productService";
import { SORT_OPTIONS } from "../types/product";
import type { SortKey } from "../types/product";
import { CategoryChips } from "../components/CategoryChips";
import { Pagination } from "../components/Pagination";
import { ProductCard } from "../components/ProductCard";
import { SearchBar } from "../components/SearchBar";
import { EmptyState, ErrorMessage, ProductGridSkeleton } from "../components/UIStates";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useSearchShortcut } from "../hooks/useSearchShortcut";
import { SearchX } from "lucide-react";

const NO_PRODUCTS: never[] = [];

export function ProductsPage() {
  useDocumentTitle("Produk");
  useSearchShortcut("search");
  const { data, loading, error, refetch } = useFetch(fetchAllProducts);
  const list = useProductList(data ?? NO_PRODUCTS);

  return (
    <section>
      <div className="page-head">
        <h1>Katalog Produk</h1>
        {!loading && !error && (
          <p className="muted">{list.total} produk ditemukan</p>
        )}
      </div>

      <div className="toolbar">
        <SearchBar value={list.q} onChange={list.setQuery} />
        <select
          className="select"
          aria-label="Urutkan produk"
          value={list.sort}
          onChange={(e) => list.setSort(e.target.value as SortKey)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {list.hasFilters && (
          <button type="button" className="btn btn-ghost" onClick={list.reset}>
            Reset
          </button>
        )}
      </div>

      <CategoryChips categories={list.categories} active={list.category} onSelect={list.setCategory} />

      {loading && <ProductGridSkeleton />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && list.items.length === 0 && (
        <EmptyState
          icon={<SearchX size={36} />}
          title="Produk tidak ditemukan"
          message="Coba kata kunci lain atau hapus filter."
          actionLabel="Reset filter"
          onAction={list.reset}
        />
      )}

      {!loading && !error && list.items.length > 0 && (
        <>
          <div className="grid">
            {list.items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Pagination 
            page={list.page} 
            totalPages={list.totalPages} 
            onChange={(n) => {
              list.setPage(n);
              window.scrollTo({ top: 0, behavior: "smooth"});
            }}
            />
        </>
      )}
    </section>
  );
}