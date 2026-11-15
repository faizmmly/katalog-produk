import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductsPage } from './Pages/ProductPage';
import { ProductDetailPage } from './Pages/ProductDetailPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/produk/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;