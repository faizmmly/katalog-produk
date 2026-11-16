import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function AboutPage() {
  useDocumentTitle("Tentang");

  return (
    <section className="about">
      <h1>Tentang aplikasi</h1>
      <p className="muted">
        TokoKita adalah katalog produk dengan data dari API publik DummyJSON, dibuat untuk Tugas
        Pertemuan 8 Pengembangan Aplikasi Web oleh Faiz Muhammad Ilham (1247050032, IF A 24).
      </p>

      <div className="about-grid">
        <article className="about-card">
          <h2>Routing</h2>
          <p>
            React Router dengan layout bersama dan <code>Outlet</code>. Rute: <code>/</code>,{" "}
            <code>/produk</code>, <code>/produk/:id</code> (dynamic route), <code>/favorit</code>,
            dan <code>/tentang</code>. Pindah halaman memakai <code>NavLink</code> tanpa reload.
          </p>
        </article>
        <article className="about-card">
          <h2>State management</h2>
          <p>
            Local state (menu, galeri), Context API (favorit dan tema), server state
            (<code>useFetch</code>), URL state (<code>q</code>, <code>kategori</code>,{" "}
            <code>urut</code>, <code>hal</code>), dan form state (formulir ulasan).
          </p>
        </article>
        <article className="about-card">
          <h2>Data API</h2>
          <p>
            Pemanggilan <code>fetch</code> dikumpulkan di folder <code>services</code>. Tampilan
            menangani tiga keadaan: loading, error (dengan tombol coba lagi), dan data kosong.
          </p>
        </article>
        <article className="about-card">
          <h2>Custom hooks</h2>
          <p>
            <code>useFetch</code>, <code>useProductList</code>, <code>useLocalStorage</code>,{" "}
            <code>useUserReviews</code>, <code>useFavorites</code>, <code>useTheme</code>, dan{" "}
            <code>useDocumentTitle</code>.
          </p>
        </article>
        <article className="about-card">
          <h2>Struktur folder</h2>
          <p>
            <code>components</code> untuk tampilan, <code>pages</code> untuk halaman,{" "}
            <code>hooks</code> untuk logika, <code>services</code> untuk akses API,{" "}
            <code>context</code> untuk state global, dan <code>layouts</code> untuk kerangka.
          </p>
        </article>
        <article className="about-card">
          <h2>Fitur data</h2>
          <p>
            Pencarian, filter kategori, pengurutan, pagination, halaman detail berdasarkan ID di
            URL, favorit, dan formulir ulasan dengan validasi.
          </p>
        </article>
      </div>
    </section>
  );
}