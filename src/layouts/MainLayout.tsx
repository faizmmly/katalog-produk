import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Beranda", end: true },
  { to: "/produk", label: "Produk", end: false },
  { to: "/favorit", label: "Favorit", end: false },
  { to: "/tentang", label: "Tentang", end: false },
];

export function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false); // local state: menu mobile

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
          TokoKita
        </NavLink>

        <button
          type="button"
          className="menu-btn"
          aria-label="Buka menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav ${menuOpen ? "is-open" : ""}`} aria-label="Navigasi utama">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page">
        <Outlet />
      </main>

      <footer className="footer">
        Faiz Muhammad Ilham • 1247050032 • IF A 24
      </footer>
    </div>
  );
}