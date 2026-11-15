import { Link } from 'react-router-dom';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product) => void;
}

export function ProductCard({ product, isFavorite = false, onToggleFavorite }: ProductCardProps) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }} className="product-card">
      
      {/* Tombol Wishlist */}
      {onToggleFavorite && (
        <button 
          onClick={() => onToggleFavorite(product)}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            zIndex: 2,
            fontSize: '1.1rem'
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      )}

      {/* Gambar Produk */}
      <Link to={`/produk/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ width: '100%', height: '200px', background: '#f8fafc', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
            className="product-img"
          />
        </div>
      </Link>

      {/* Konten Detail */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '6px', fontWeight: 600 }}>
          {product.category}
        </span>
        
        <Link to={`/produk/${product.id}`} style={{ textDecoration: 'none', color: '#1e293b' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '2.6em' }}>
            {product.title}
          </h3>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#064e3b' }}>
            ${product.price.toFixed(2)}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', color: '#d97706', fontWeight: 600 }}>
            ★ {product.rating}
          </div>
        </div>
      </div>
    </div>
  );
}