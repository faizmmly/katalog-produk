import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchProduct } from "../services/productService";
import { ErrorMessage, LoadingSpinner } from "../components/UIStates";
import { formatCategory, formatPrice } from "../utils/format";
import { FavoriteButton } from "../components/FavoriteButton";
import { ReviewSection } from "../components/ReviewSection";

export function ProductDetailPage() {
  const { id = "" } = useParams();
  const fetcher = useCallback((signal: AbortSignal) => fetchProduct(id, signal), [id]);
  const { data: product, loading, error, refetch } = useFetch(fetcher);
  const [activeImage, setActiveImage] = useState(0); // local state: gambar yang tampil

  if (loading) return <LoadingSpinner />;
  if (error || !product) {
    return (
      <div>
        <Link to="/produk" className="back">← Kembali ke produk</Link>
        <ErrorMessage message={error ?? "Data tidak ditemukan."} onRetry={refetch} />
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <article className="detail">
      <Link to="/produk" className="back">← Kembali ke produk</Link>

      <div className="detail-grid">
        <div>
          <div className="detail-image">
            <img src={images[activeImage] ?? product.thumbnail} alt={product.title} />
          </div>
          {images.length > 1 && (
            <div className="thumbs">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={i === activeImage ? "is-active" : ""}
                  aria-label={`Gambar ${i + 1}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <p className="muted detail-cat">
            {formatCategory(product.category)}
            {product.brand && ` • ${product.brand}`}
          </p>
          <h1>{product.title}</h1>
          <FavoriteButton productId={product.id} title={product.title} className="fav-inline" />
          <p className="rating">★ {product.rating.toFixed(1)}</p>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className={`stock ${product.stock <= 0 ? "is-out" : product.stock <= 10 ? "is-low" : ""}`}>
            {product.stock <= 0 ? "Stok habis" : `${product.stock} stok tersisa`}
          </p>
          <p>{product.description}</p>
        </div>
      </div>

        <ReviewSection key={product.id} productId={String(product.id)} apiReviews={product.reviews} />
        <h2>Ulasan ({product.reviews.length})</h2>
        {product.reviews.length === 0 ? (
          <p className="muted">Belum ada ulasan.</p>
        ) : (
          <ul>
            {product.reviews.map((r) => (
              <li key={`${r.reviewerName}-${r.date}`}>
                <strong>{r.reviewerName}</strong> <span className="rating">★ {r.rating}</span>
                <p>{r.comment}</p>
              </li>
            ))}
          </ul>
        )}
    </article>
  );
}