# 🛍️ TokoKita — Modern E-Commerce Catalog App

> Tugas Pertemuan 8 — Pengembangan Aplikasi Web Interaktif menggunakan React, TypeScript, dan Vite.

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Fast-orange?style=for-the-badge&logo=vite)
![CSS](https://img.shields.io/badge/UI-Minimalist-green?style=for-the-badge)

---

## 🚀 Gambaran Umum (Overview)

**TokoKita** adalah aplikasi web katalog produk *e-commerce* modern yang dirancang dengan gaya *minimalist clean UI*. Aplikasi ini mengambil data secara langsung dari **DummyJSON API** dan menawarkan pengalaman belanja yang interaktif, cepat, dan responsif tanpa *reload* halaman penuh.

---

## ✨ Fitur Utama

1. **Navigasi & Client-Side Routing:** Perpindahan halaman instan menggunakan `react-router-dom` dengan dukungan *nested routing*, *lazy loading*, *dynamic route* (`/produk/:id`), serta halaman *404 Not Found*.
2. **Pencarian Real-Time (Search):** Cari produk berdasarkan nama atau kata kunci tertentu yang otomatis tersinkronisasi dengan URL.
3. **Filter Kategori (Chips):** Menyaring produk berdasarkan kategori dari API secara dinamis.
4. **Pengurutan Produk (Sorting):** Urutkan produk berdasarkan harga maupun rating tertinggi.
5. **Pagination:** Navigasi halaman katalog yang bersih dan terstruktur melalui parameter URL.
6. **Halaman Detail, Ulasan & Produk Terkait:** Menampilkan informasi lengkap produk, status stok, galeri foto, rekomendasi produk terkait, serta formulir ulasan interaktif dengan validasi lokal.
7. **Keranjang Belanja (Shopping Cart):** Tambah produk langsung dari kartu maupun halaman detail, atur jumlah barang (`+` / `-`), hitung total harga otomatis, simulasi *checkout*, dan *badge* jumlah item di navbar yang tersimpan di `localStorage`.
8. **Fitur Wishlist (Favorit):** Simpan produk favorit dengan penyimpanan `localStorage` dan indikator *badge* jumlah favorit di navbar.
9. **Notifikasi Toast & Dark/Light Mode:** Umpan balik notifikasi interaktif untuk setiap aksi pengguna serta pergantian tema gelap/terang.

---

## 🏗️ Arsitektur & Penjelasan Teknis

### 1. Routing dan Navigasi
Aplikasi memanfaatkan **React Router v6+** dengan arsitektur hierarki:
* **Layout Utama (`MainLayout`):** Menggunakan `<Outlet />` sebagai *nested route parent* untuk membungkus Navbar, Footer, tombol *Back to Top*, dan kontainer *Toast* secara konsisten.
* **Dynamic & Fallback Route:** Halaman detail produk diakses melalui `/produk/:id`, dilengkapi penanganan *wildcard route* (`*`) untuk halaman tidak ditemukan serta `vercel.json` untuk mendukung *SPA routing* saat di-*deploy*.

### 2. State Management & Context API
Pengelolaan state dipecah ke dalam beberapa lapisan:
* **Local State (`useState`):** Mengatur kondisi UI lokal seperti status buka/tutup menu mobile, galeri gambar aktif, dan nilai input formulir ulasan.
* **Global State (Context API):** Menggunakan `CartContext` untuk manajemen keranjang belanja, `FavoritesContext` untuk *wishlist*, dan `ThemeContext` untuk pengaturan tema gelap/terang di seluruh komponen.
* **Server State:** Mengelola data asinkron dari REST API DummyJSON lengkap dengan dukungan `AbortController`.
* **URL State (`useSearchParams`):** Menyimpan parameter pencarian (`q`), kategori, *sorting*, dan halaman (`page`) langsung di URL agar mudah dibagikan (*shareable links*).

### 3. Data Fetching & Services
* Pengambilan data dari public API (`https://dummyjson.com/products`) dipisahkan ke dalam folder **`src/services/`** (`productService.ts`).
* Dilengkapi dengan penanganan **Loading State** (`LoadingSpinner` & `ProductGridSkeleton`), **Error Handling** (`ErrorMessage`), dan **Empty State** (`EmptyState`).

### 4. Custom Hooks & Reusable Components
* **Custom Hooks:** `useFetch`, `useCart`, `useFavorites`, `useTheme`, `useLocalStorage`, `useDocumentTitle`, dan `useSearchShortcut`.
* **Reusable Components:** Komponen modular seperti `ProductCard`, `FavoriteButton`, `ReviewSection`, `RelatedProducts`, `ToastContainer`, `BackToTop`, dan `UIStates`.

---

## 📂 Struktur Folder Proyek

```text
├── public/               # Aset publik statis
├── src/
│   ├── assets/           # Gambar, ikon, atau aset statis
│   ├── components/       # Komponen modular (ProductCard, ToastContainer, UIStates, dll.)
│   ├── context/          # Context API global (CartContext, FavoritesContext, ThemeContext)
│   ├── hooks/            # Custom hooks (useFetch, useCart, useFavorites, useTheme, dll.)
│   ├── layouts/          # Layout utama aplikasi (MainLayout.tsx)
│   ├── pages/            # Halaman utama (Home, Products, ProductDetail, Favorites, Cart, About, NotFound)
│   ├── services/         # Logika akses API (productService.ts)
│   ├── types/            # Definisi interface TypeScript (product.ts)
│   ├── utils/            # Fungsi helper, formatter harga/kategori, dan pemicu toast
│   ├── App.tsx           # Konfigurasi router utama aplikasi
│   ├── main.tsx          # Entry point React DOM
│   └── index.css         # Styling global & responsif
├── index.html            # Template HTML utama & metadata SEO
├── vercel.json           # Konfigurasi rewrite SPA untuk deployment Vercel
└── package.json          # Daftar dependensi dan skrip proyek
```

---

## 🛠️ Cara Menjalankan Proyek Secara Lokal

1. **Clone repository ini:**
   ```bash
   git clone [https://github.com/faizmmly/katalog-produk.git](https://github.com/faizmmly/katalog-produk.git)
   ```

2. **Masuk ke direktori proyek:**
   ```bash
   cd katalog-produk
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Jalankan development server:**
   ```bash
   npm run dev
   ```

5. **Build untuk produksi (opsional):**
   ```bash
   npm run build
   ```

---

## 🌐 Publikasi & Link Terkait

* **Repository GitHub:** [https://github.com/faizmmly/katalog-produk](https://github.com/faizmmly/katalog-produk)
* **Live Demo (Vercel):** *(Masukkan link deployment Vercel Anda di sini)*

---

<p align="center">
  Dibuat oleh <b>Faiz Muhammad Ilham Hariry</b> (1247050032 • IF A 24) • <b>Pengembangan Aplikasi Web</b>
</p>