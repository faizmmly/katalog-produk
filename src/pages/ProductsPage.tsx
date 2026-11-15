import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../services/productService';
import type { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/UIStates';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 8;
  const skip = (page - 1) * limit;

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]); // 👈 Perhatikan tipe data Category[]
  const [, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ambil kategori saat pertama load
  useEffect(() => {
    fetchCategories()
      .then(res => setCategories(res))
      .catch(err => console.error("Gagal ambil kategori", err));
  }, []);

  // Ambil data produk berdasarkan parameter URL
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProducts(searchQuery, limit, skip, sortBy)
      .then(res => {
        let filtered = res.products;
        if (selectedCategory) {
          filtered = filtered.filter(p => p.category === selectedCategory);
        }
        setProducts(filtered);
        setTotal(res.total);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [searchQuery, selectedCategory, sortBy, page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set('q', val);
    else newParams.delete('q');
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleCategoryClick = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug === selectedCategory) newParams.delete('category');
    else newParams.set('category', slug);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set('sortBy', val);
    else newParams.delete('sortBy');
    setSearchParams(newParams);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header & Search Bar */}
      <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>Katalog Produk</h1>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Cari produk, kategori, atau barang..." 
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              flex: 1,
              minWidth: '280px',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              fontSize: '0.95rem',
              outline: 'none',
              backgroundColor: '#ffffff',
              color: '#0f172a'
            }}
          />

          <select 
            value={sortBy} 
            onChange={handleSortChange}
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#0f172a',
              fontSize: '0.95rem',
              outline: 'none',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            <option value="" style={{ color: '#64748b' }}>Urutkan Berdasarkan</option>
            <option value="price">Harga (Termurah)</option>
            <option value="rating">Rating Tertinggi</option>
          </select>
        </div>

        {/* Kategori Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          <button 
            onClick={() => handleCategoryClick('')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              background: !selectedCategory ? '#064e3b' : '#e2e8f0',
              color: !selectedCategory ? '#fff' : '#334155',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Semua
          </button>
            {categories.map((cat) => (
                <button 
                key={cat} 
                onClick={() => handleCategoryClick(cat)}
                style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    background: selectedCategory === cat ? '#064e3b' : '#e2e8f0',
                    color: selectedCategory === cat ? '#fff' : '#334155',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    textTransform: 'capitalize'
                }}
                >
           {cat}
         </button>
       ))}
        </div>
      </div>

      {/* Main Content Area */}
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && products.length === 0 && <EmptyState />}

      {!loading && !error && products.length > 0 && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination sederhana */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '40px' }}>
            <button 
              disabled={page <= 1}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set('page', String(page - 1));
                setSearchParams(newParams);
              }}
              style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: page <= 1 ? '#f1f5f9' : '#fff', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
            >
              Sebelumnya
            </button>
            <span style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>Halaman {page}</span>
            <button 
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set('page', String(page + 1));
                setSearchParams(newParams);
              }}
              style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
            >
              Selanjutnya
            </button>
          </div>
        </>
      )}
    </div>
  );
}