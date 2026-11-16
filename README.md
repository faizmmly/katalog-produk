# 🛍️ TokoKita — Modern E-Commerce Catalog App

> Tugas Pertemuan 8 - Pengembangan Aplikasi Web - Interaktif menggunakan React, TypeScript, dan Vite.

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Fast-orange?style=for-the-badge&logo=vite)
![Tailwind/CSS](https://img.shields.io/badge/UI-Minimalist-green?style=for-the-badge)

---

## 🚀 Gambaran Umum (Overview)
**TokoKita** adalah aplikasi web katalog produk e-commerce modern yang dirancang dengan gaya *minimalist clean UI* (terinspirasi dari desain Oakory). Aplikasi ini mengambil data secara langsung dari **DummyJSON API** dan menawarkan pengalaman belanja yang interaktif, cepat, dan responsif tanpa *reload* halaman penuh.

---

## ✨ Fitur Utama
1. **Navigasi & Client-Side Routing:** Berpindah halaman instan menggunakan `react-router-dom` dengan dukungan *nested routing* dan *dynamic route* (`/produk/:id`)[cite: 7, 8].
2. **Pencarian Real-Time (Search):** Cari produk berdasarkan nama atau keyword tertentu yang otomatis tersinkronisasi dengan URL[cite: 8].
3. **Filter Kategori (Chips):** Menyaring produk berdasarkan kategori dari API secara dinamis[cite: 8].
4. **Pengurutan Produk (Sorting):** Urutkan produk berdasarkan harga termurah atau rating tertinggi[cite: 8].
5. **Pagination:** Navigasi halaman produk yang bersih dan terstruktur melalui parameter URL[cite: 8].
6. **Halaman Detail & Ulasan (Review):** Menampilkan informasi lengkap produk, stok, galeri foto, serta formulir ulasan interaktif dengan validasi input lokal[cite: 7, 8].
7. **Fitur Wishlist (Favorit):** Simpan produk favorit Anda dengan penyimpanan lokal (*LocalStorage*) dan indikator *badge* jumlah favorit di navbar.
8. **Dark / Light Theme Mode:** Fitur pergantian tema tampilan sesuai kenyamanan pengguna.

---

## 🏗️ Arsitektur & Penjelasan Teknis

### 1. Routing dan Navigasi
Aplikasi ini memanfaatkan **React Router v6** dengan arsitektur hierarki:
* **Layout Utama (`MainLayout`):** Menggunakan `<Outlet />` sebagai *nested route parent* untuk membungkus Navbar dan Footer secara konsisten di setiap halaman.
* **Dynamic Route:** Halaman detail produk diakses melalui rute dinamis `/produk/:id`.

### 2. State Management & Context API
Pengelolaan state dipecah ke dalam beberapa lapisan:
* **Local State (`useState`):** Mengatur kondisi UI lokal seperti status buka/tutup menu mobile, indikator loading, dan nilai input formulir ulasan.
* **Global State (Context API):** Menggunakan `FavoritesContext` untuk manajemen *wishlist* dan `ThemeContext` untuk pengaturan tema gelap/terang di seluruh komponen.
* **Server State:** Mengelola data asinkron dari REST API DummyJSON.
* **URL State (`useSearchParams`):** Menyimpan status parameter pencarian (`q`), kategori, *sorting*, dan nomor halaman (`page`) langsung di URL agar mudah dibagikan (*shareable links*)[cite: 8].

### 3. Data Fetching & Services
* Pengambilan data dari public API (`https://dummyjson.com/products`) dipisahkan secara profesional ke dalam folder **`src/services/`** (`productService.ts`)[cite: 7, 8].
* Dilengkapi dengan penanganan **Loading State** (`LoadingSpinner`), **Error Handling** (`ErrorMessage`), dan **Empty State** (`EmptyState`)[cite: 8].

### 4. Custom Hooks & Reusable Components
* **Custom Hooks:** 
  * `useFetch`: Menangani logika pengambilan data asinkron.
  * `useFavorites`: Mengelola state dan penyimpanan *wishlist* ke *localStorage*.
  * `useTheme`: Mengelola preferensi tema aplikasi.
* **Reusable Components:** Komponen modular seperti `ProductCard`, `UIStates` (Spinner, Error, Empty), dan elemen form yang dapat digunakan kembali.

---

## 📂 Struktur Folder Proyek
```text
src/
├── assets/          # Gambar, ikon, atau aset statis
├── components/      # Komponen modular yang dapat digunakan kembali (ProductCard, UIStates, dll)
├── context/         # Context API global (FavoritesContext, ThemeContext)
├── hooks/           # Custom hooks (useFetch, useFavorites, useTheme)
├── layouts/         # Layout utama aplikasi (MainLayout.tsx)
├── pages/           # Halaman utama (HomePage, ProductsPage, ProductDetailPage, FavoritesPage, AboutPage, NotFoundPage)
├── services/        # Logika akses API (productService.ts)
├── types/           # Definisi interface TypeScript (product.ts)
├── utils/           # Fungsi helper / formatter (formatters)
├── App.tsx          # Konfigurasi router utama aplikasi
├── main.tsx         # Entry point React DOM
└── index.css        # Styling global


🛠️ Cara Menjalankan Proyek Secara Lokal

Clone repository ini:

git clone https://github.com/faizmmly/katalog-produk.git

Masuk ke direktori proyek:

**cd katalog-produk**

Install dependencies:

**npm install**

Jalankan development server:

**npm run dev**


## 🌐 Publikasi & Link Terkait ##
* **Link Repository GitHub:** https://github.com/faizmmly/katalog-produk
* **Link Website (Vercel):** *(Masukkan link deployment Vercel Anda di sini)*

---
<p align="center">
  Dibuat oleh <b>Faiz Muhammad Ilham Hariry</b> (1247050032 • IF A 24) <b> Pengembangan Aplikasi Web</b>
</p>
```eof