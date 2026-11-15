import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section>
      <h1>Selamat datang di TokoKita</h1>
      <p className="muted">Katalog produk dengan data dari DummyJSON.</p>
      <Link to="/produk" className="btn-link">Lihat semua produk</Link>
    </section>
  );
}