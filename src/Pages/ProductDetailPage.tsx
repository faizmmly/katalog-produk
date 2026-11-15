import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/productService';
import type { Product } from '../types/product';
import { useFetch } from '../hooks/useFetch';
import { LoadingSpinner, ErrorMessage } from '../components/UIStates';

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, loading, error, refetch } = useFetch<Product>(
    () => fetchProductById(id || ''),
    [id]
  );

  const [selectedImage, setSelectedImage] = useState<string>('');
  
  // Form State untuk ulasan lokal
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState('5');
  const [formComment, setFormComment] = useState('');
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Set gambar utama ketika produk berhasil dimuat
  React.useEffect(() => {
    if (product && product.thumbnail) {
      setSelectedImage(product.thumbnail);
    }
  }, [product]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      setFormError('Nama dan komentar wajib diisi.');
      return;
    }
    if (formComment.length < 10) {
      setFormError('Komentar minimal harus 10 karakter.');
      return;
    }

    setFormError('');
    const newReview: Review = {
      name: formName,
      rating: Number(formRating),
      comment: formComment,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    setReviews([newReview, ...reviews]);
    setFormName('');
    setFormComment('');
    setSuccessMsg('Terima kasih! Ulasan Anda berhasil ditambahkan.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!product) return <ErrorMessage message="Produk tidak ditemukan." />;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px 20px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Tombol Kembali */}
      <Link to="/" style={{ textDecoration: 'none', color: '#064e3b', fontWeight: 600, display: 'inline-block', marginBottom: '20px' }}>
        ← Kembali ke Katalog
      </Link>

      {/* Grid Detail Produk */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '50px' }}>
        
        {/* Kolom Gambar */}
        <div>
          <div style={{ width: '100%', height: '350px', background: '#f8fafc', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
            <img src={selectedImage || product.thumbnail} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Galeri Gambar Kecil */}
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
            {product.images?.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedImage(img)}
                style={{ width: '70px', height: '70px', borderRadius: '8px', overflow: 'hidden', border: selectedImage === img ? '2px solid #064e3b' : '1px solid #cbd5e1', cursor: 'pointer', flexShrink: 0 }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Informasi */}
        <div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', fontWeight: 600 }}>
            {product.category} • {product.brand || 'Oakory Official'}
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', margin: '10px 0 16px 0' }}>{product.title}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 700, color: '#064e3b' }}>${product.price.toFixed(2)}</span>
            <span style={{ background: '#fef3c7', color: '#d97706', padding: '4px 10px', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem' }}>
              ★ {product.rating} / 5.0
            </span>
          </div>

          <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '24px' }}>{product.description}</p>

          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '0.9rem', color: '#334155', marginBottom: '6px' }}>📦 Stok Tersedia: <strong>{product.stock} unit</strong></p>
            <p style={{ fontSize: '0.9rem', color: '#334155' }}>🚚 Pengiriman cepat & garansi pengembalian 30 hari.</p>
          </div>
        </div>
      </div>

      {/* Bagian Ulasan & Form */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>Ulasan Pelanggan</h2>

        {/* Formulir Ulasan */}
        <form onSubmit={handleReviewSubmit} style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>Tulis Ulasan Anda</h3>

          {formError && <p style={{ color: '#dc2626', fontSize: '0.9rem', marginBottom: '12px' }}>{formError}</p>}
          {successMsg && <p style={{ color: '#059669', fontSize: '0.9rem', marginBottom: '12px' }}>{successMsg}</p>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Nama Anda</label>
              <input 
                type="text" 
                value={formName} 
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Contoh: Faiz Muhammad"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Rating</label>
              <select 
                value={formRating} 
                onChange={(e) => setFormRating(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', outline: 'none' }}
              >
                <option value="5">★★★★★ (5/5)</option>
                <option value="4">★★★★☆ (4/5)</option>
                <option value="3">★★★☆☆ (3/5)</option>
                <option value="2">★★☆☆☆ (2/5)</option>
                <option value="1">★☆☆☆☆ (1/5)</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Komentar (Min. 10 karakter)</label>
            <textarea 
              rows={3}
              value={formComment}
              onChange={(e) => setFormComment(e.target.value)}
              placeholder="Ceritakan pengalaman Anda dengan produk ini..."
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>

          <button type="submit" style={{ background: '#064e3b', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
            Kirim Ulasan
          </button>
        </form>

        {/* Daftar Ulasan */}
        {reviews.length === 0 ? (
          <p style={{ color: '#64748b', fontStyle: 'italic' }}>Belum ada ulasan untuk produk ini. Jadilah yang pertama mengulas!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reviews.map((rev, index) => (
              <div key={index} style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong>{rev.name}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{rev.date}</span>
                </div>
                <div style={{ color: '#d97706', marginBottom: '8px' }}>{'★'.repeat(rev.rating)}</div>
                <p style={{ color: '#334155', fontSize: '0.95rem' }}>{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}