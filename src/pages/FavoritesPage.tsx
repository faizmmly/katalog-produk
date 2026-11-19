import { Heart } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useFavorites } from "../hooks/useFavorites";
import { useFetch } from "../hooks/useFetch";
import { fetchAllProducts } from "../services/productService";
import { ProductCard } from "../components/ProductCard";
import { EmptyState, ErrorMessage, ProductGridSkeleton } from "../components/UIStates";

export function FavoritesPage() {
  useDocumentTitle("Favorit");
  const { ids, clear } = useFavorites();
  const { data, loading, error, refetch } = useFetch(fetchAllProducts);

  if (ids.length === 0) {
    return (
      <section>
        <div className="page-head"><h1>Favorit</h1></div>
        <EmptyState
          icon={<Heart size={36} />}
          title="Belum ada favorit"
          message="Tekan ikon hati pada produk untuk menyimpannya di sini."
          actionLabel="Jelajahi produk"
          to="/produk"
        />
      </section>
    );
  }

  const items = (data ?? []).filter((p) => ids.includes(p.id));

  return (
    <section>
      <div className="page-head">
        <h1>Favorit</h1>
        <button type="button" className="btn btn-ghost" onClick={clear}>Hapus semua</button>
      </div>
      {loading && <ProductGridSkeleton count={Math.min(ids.length, 4)} />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && (
        <div className="grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}