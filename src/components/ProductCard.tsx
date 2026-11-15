import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { formatPrice } from "../utils/format";
import { FavoriteButton } from "./FavoriteButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const soldOut = product.stock <= 0;
  const low = !soldOut && product.stock <= 10;

  return (
    <div className="product-card">
      <Link to={`/produk/${product.id}`} className="product-link">
        <div className="product-thumb">
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
          <span className="price-tag">{formatPrice(product.price)}</span>
        </div>
        <p className={`stock ${soldOut ? "is-out" : low ? "is-low" : ""}`}>
          {soldOut ? "Stok habis" : `${product.stock} stok tersisa`}
        </p>
        <p className="rating">★ {product.rating.toFixed(1)}</p>
        <h3>{product.title}</h3>
      </Link>
      <FavoriteButton productId={product.id} title={product.title} className="fav-on-card" />
    </div>
  );
}