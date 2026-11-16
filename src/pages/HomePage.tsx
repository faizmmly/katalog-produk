import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useFetch } from "../hooks/useFetch";
import { fetchAllProducts } from "../services/productService";
import { ProductCard } from "../components/ProductCard";
import { ErrorMessage, ProductGridSkeleton } from "../components/UIStates";
import { formatCategory } from "../utils/format";
import { ArrowRight } from "lucide-react";

export function HomePage() {
  useDocumentTitle("Beranda");
  const { data, loading, error, refetch } = useFetch(fetchAllProducts);

  // Nilai turunan dari data API
  const summary = useMemo(() => {
    const list = data ?? [];
    const counts = new Map<string, number>();
    for (const p of list) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);

    return {
      total: list.length,
      categoryCount: counts.size,
      topCategories: [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([category]) => category),
      maxDiscount: Math.floor(Math.max(0, ...list.map((p) => p.discountPercentage))),
      featured: [...list].sort((a, b) => b.rating - a.rating).slice(0, 4),
    };
  }, [data]);

  const ready = !loading && !error;

  return (
    <div className="home">
      <section className="hero">
        <p className="hero-tag">Katalog produk</p>
        <h1>Temukan produk favoritmu di TokoKita</h1>
        <p className="hero-text">
          {ready
            ? `${summary.total} produk dalam ${summary.categoryCount} kategori.`
            : "Memuat katalog..."}
          {ready && summary.maxDiscount > 0 && ` Diskon hingga ${summary.maxDiscount}%.`}
        </p>
        <div className="hero-actions">
          <Link to="/produk" className="btn-link">Lihat semua produk</Link>
          <Link to="/favorit" className="btn-link btn-link-ghost">Favoritku</Link>
        </div>
      </section>

      {ready && summary.topCategories.length > 0 && (
        <section>
          <div className="section-head">
            <h2>Kategori populer</h2>
          </div>
          <div className="chips">
            {summary.topCategories.map((c) => (
              <Link key={c} to={`/produk?kategori=${c}`} className="chip">
                {formatCategory(c)}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="section-head">
          <h2>Produk unggulan</h2>
          <Link 
          to="/produk?urut=rating"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none'}}
          >
            <span>Lihat semua</span>
            <ArrowRight size={16}/>
          </Link>
        </div>
        {loading && <ProductGridSkeleton count={4} />}
        {error && <ErrorMessage message={error} onRetry={refetch} />}
        {ready && (
          <div className="grid">
            {summary.featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}