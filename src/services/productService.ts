import type { Product, ProductsResponse } from '../types/product';

const BASE_URL = 'https://dummyjson.com/products';

// Mengambil semua produk dengan opsi pencarian, pagination, dan sorting
export async function fetchProducts(searchQuery = '', limit = 10, skip = 0, sortBy = '', order = 'asc'): Promise<ProductsResponse> {
  let url = `${BASE_URL}`;
  
  if (searchQuery) {
    url = `${BASE_URL}/search?q=${encodeURIComponent(searchQuery)}&limit=${limit}&skip=${skip}`;
  } else {
    url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
  }

  if (sortBy) {
    url += `&sortBy=${sortBy}&order=${order}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Gagal memuat data produk dari server.');
  }
  return response.json();
}

// Mengambil daftar kategori produk
export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Gagal memuat kategori.');
  }
  return response.json();
}

// Mengambil produk berdasarkan kategori
export async function fetchProductsByCategory(category: string): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/category/${category}`);
  if (!response.ok) {
    throw new Error('Gagal memuat produk berdasarkan kategori.');
  }
  return response.json();
}

// Mengambil detail produk berdasarkan ID
export async function fetchProductById(id: string | number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Produk tidak ditemukan.');
  }
  return response.json();
}