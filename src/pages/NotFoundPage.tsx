import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section>
      <h1>Halaman tidak ditemukan</h1>
      <p className="muted">Alamat yang Anda buka tidak ada.</p>
      <Link to="/" className="btn-link">Kembali ke beranda</Link>
    </section>
  );
}