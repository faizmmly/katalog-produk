import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useFetch } from "../hooks/useFetch";
import { fetchAllProducts } from "../services/productService";
import { ProductCard } from "../components/ProductCard";
import { EmptyState, ErrorMessage, ProductGridSkeleton } from "../components/UIStates";

export function FavoritesPage() {
  const { ids, clear } = useFavorites();
  const { data, loading, error, refetch } = useFetch(fetchAllProducts);

  const items = (data ?? []).filter((p) => ids.includes(p.id));

  return (
    <section>
      <div className="page-head">
        <h1>Favorit</h1>
        {ids.length > 0 && (
          <button type="button" className="btn btn-ghost" onClick={clear}>
            Hapus semua
          </button>
        )}
      </div>

      {ids.length === 0 ? (
        <div>
          <EmptyState
            title="Belum ada favorit"
            message="Tekan ikon hati pada produk untuk menyimpannya di sini."
          />
          <p className="center">
            <Link to="/produk" className="btn-link">Lihat produk</Link>
          </p>
        </div>
      ) : (
        <>
          {loading && <ProductGridSkeleton count={Math.min(ids.length, 4)} />}
          {error && <ErrorMessage message={error} onRetry={refetch} />}
          {!loading && !error && (
            <div className="grid">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}