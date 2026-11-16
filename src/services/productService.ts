import type { Product, ProductDetail, ProductsResponse } from "../types/product";

const BASE_URL = "https://dummyjson.com";
const LIST_FIELDS =
  "id,title,description,price,discountPercentage,rating,stock,brand,category,thumbnail";

// Satu-satunya tempat yang memanggil API
async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (!res.ok) {
    throw new Error(
      res.status === 404 ? "Data tidak ditemukan." : `Gagal memuat data (kode ${res.status}).`,
    );
  }
  return (await res.json()) as T;
}

let allProductsCache: Promise<Product[]> | null = null;

export function fetchAllProducts(): Promise<Product[]> {
  if (!allProductsCache) {
    allProductsCache = request<ProductsResponse>(`/products?limit=0&select=${LIST_FIELDS}`)
      .then((data) => data.products)
      .catch((err: unknown) => {
        allProductsCache = null; // gagal: izinkan coba lagi
        throw err;
      });
  }
  return allProductsCache;
}

export function fetchProduct(id: string, signal?: AbortSignal): Promise<ProductDetail> {
  return request<ProductDetail>(`/products/${id}`, signal);
}