import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchProduct } from "../services/productService";
import { ErrorMessage, LoadingSpinner } from "../components/UIStates";
import { formatCategory, formatPrice } from "../utils/format";
import { FavoriteButton } from "../components/FavoriteButton";
import { ReviewSection } from "../components/ReviewSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useCart } from "../hooks/useCart";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { RelatedProducts } from "../components/RelatedProducts";

export function ProductDetailPage() {
  const { id = "" } = useParams();
  const fetcher = useCallback((signal: AbortSignal) => fetchProduct(id, signal), [id]);
  const { data: product, loading, error, refetch } = useFetch(fetcher);
  const [activeImage, setActiveImage] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const { addItem } = useCart();

  useDocumentTitle(product ? product.title : "Produk");

  if (loading) return <LoadingSpinner />;
  if (error || !product) {
    return (
      <div>
        <Link to="/produk" className="back" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <ArrowLeft size={18} />
          <span>Kembali ke produk</span>
        </Link>
        <ErrorMessage message={error ?? "Data tidak ditemukan."} onRetry={refetch} />
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [product.thumbnail];
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      stock: product.stock,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  return (
    <article className="detail">
      <Link to="/produk" className="back" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
        <ArrowLeft size={18} />
        <span>Kembali ke produk</span>
      </Link>

      {/* Grid Utama: Dibagi 2 Kolom Sejajar (diatur responsif lewat class .detail-grid di CSS) */}
      <div className="detail-grid">
        
        {/* ========================================================= */}
        {/* KOLOM KIRI: FOTO PRODUK DI ATAS, DESKRIPSI/INFO DI BAWAH   */}
        {/* ========================================================= */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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

            {/* Baris Tombol Aksi: Keranjang & Favorit */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "12px 0", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="btn btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: isOutOfStock ? "not-allowed" : "pointer",
                  opacity: isOutOfStock ? 0.5 : 1,
                  backgroundColor: addedFeedback ? "#16a34a" : undefined,
                  transition: "background-color 0.2s ease",
                }}
              >
                {addedFeedback ? <Check size={18} /> : <ShoppingCart size={18} />}
                <span>
                  {isOutOfStock
                    ? "Stok Habis"
                    : addedFeedback
                    ? "Masuk Keranjang!"
                    : "Tambah ke Keranjang"}
                </span>
              </button>

              <FavoriteButton productId={product.id} title={product.title} className="fav-inline" />
            </div>

            <p className="rating">★ {product.rating.toFixed(1)}</p>
            <p className="detail-price">{formatPrice(product.price)}</p>
            <p className={`stock ${isOutOfStock ? "is-out" : product.stock <= 10 ? "is-low" : ""}`}>
              {isOutOfStock ? "Stok habis" : `${product.stock} stok tersisa`}
            </p>
            <p>{product.description}</p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* KOLOM KANAN: KHUSUS FORM & DAFTAR ULASAN                  */}
        {/* ========================================================= */}
        <div>
          <ReviewSection key={product.id} productId={String(product.id)} apiReviews={product.reviews} />
        </div>

      </div>

      {/* Bagian Produk Terkait: Ditaruh di bawah grid utama agar mendapat lebar penuh */}
      <div style={{ marginTop: "48px" }}>
        <RelatedProducts productId={product.id} category={product.category} />
      </div>
    </article>
  );
}