import { lazy } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";

const HomePage = lazy(() => import("./pages/HomePage").then((m) => ({ default: m.HomePage })));
const ProductsPage = lazy(() => import("./pages/ProductsPage").then((m) => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage").then((m) => ({ default: m.ProductDetailPage })));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage").then((m) => ({ default: m.FavoritesPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
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