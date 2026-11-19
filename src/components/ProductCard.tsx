import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { formatPrice } from "../utils/format";
import { FavoriteButton } from "./FavoriteButton";
import { ProductImage } from "./ProductImage";
import { useCart } from "../hooks/useCart";
import { ShoppingCart, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const soldOut = product.stock <= 0;
  const low = !soldOut && product.stock <= 10;
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (soldOut) return;

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      stock: product.stock,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="product-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Link to={`/produk/${product.id}`} className="product-link">
        <div className="product-thumb">
          <ProductImage key={product.thumbnail} src={product.thumbnail} alt={product.title} />
          <span className="price-tag">{formatPrice(product.price)}</span>
        </div>
        <p className={`stock ${soldOut ? "is-out" : low ? "is-low" : ""}`}>
          {soldOut ? "Stok habis" : `${product.stock} stok tersisa`}
        </p>
        <p className="rating">★ {product.rating.toFixed(1)}</p>
        <h3>{product.title}</h3>
      </Link>

      <FavoriteButton productId={product.id} title={product.title} className="fav-on-card" />

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={soldOut}
        className="btn btn-primary"
        style={{
          marginTop: "10px",
          width: "100%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          padding: "8px 12px",
          fontSize: "0.85rem",
          borderRadius: "8px",
          cursor: soldOut ? "not-allowed" : "pointer",
          opacity: soldOut ? 0.5 : 1,
          backgroundColor: added ? "var(--success)" : undefined,
          transition: "background-color 0.2s ease",
        }}
      >
        {added ? <Check size={16} /> : <ShoppingCart size={16} />}
        <span>{soldOut ? "Habis" : added ? "Ditambahkan" : "+ Keranjang"}</span>
      </button>
    </div>
  );
}