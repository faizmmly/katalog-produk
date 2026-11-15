import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route induk: layout dipakai semua halaman */}
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />

          {/* Nested route: /produk dan /produk/:id */}
          <Route path="produk" element={<Outlet />}>
            <Route index element={<ProductsPage />} />
            <Route path=":id" element={<ProductDetailPage />} />
          </Route>

          <Route path="favorit" element={<FavoritesPage />} />
          <Route path="tentang" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;