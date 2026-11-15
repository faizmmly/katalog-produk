export const SORT_OPTIONS = [
  { value: "relevan", label: "Urutkan" },
  { value: "termurah", label: "Harga termurah" },
  { value: "termahal", label: "Harga termahal" },
  { value: "rating", label: "Rating tertinggi" },
  { value: "nama", label: "Nama (A-Z)" },
] as const;

// Union type diturunkan dari array di atas
export type SortKey = (typeof SORT_OPTIONS)[number]["value"];

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface ProductDetail extends Product {
  images: string[];
  tags: string[];
  reviews: Review[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}