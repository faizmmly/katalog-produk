import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useTheme } from "../hooks/useTheme";

const LINKS = [
  { to: "/", label: "Beranda", end: true },
  { to: "/produk", label: "Produk", end: false },
  { to: "/favorit", label: "Favorit", end: false },
  { to: "/tentang", label: "Tentang", end: false },
];

export function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false); // local state: menu mobile
  const { ids } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
          TokoKita
        </NavLink>

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
              {l.to === "/favorit" && ids.length > 0 && (
                <span className="count">{ids.length}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="theme-btn"
          aria-label={theme === "dark" ? "Pakai tema terang" : "Pakai tema gelap"}
          onClick={toggleTheme}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button
          type="button"
          className="menu-btn"
          aria-label="Buka menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      <main className="page">
        <Outlet />
      </main>

      <footer className="footer">Faiz Muhammad Ilham • 1247050032 • IF A 24</footer>
    </div>
  );
}