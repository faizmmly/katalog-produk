import { Suspense, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useTheme } from "../hooks/useTheme";
import { Home, ShoppingBag, Heart, Info, Moon, Sun} from "lucide-react";
import { ScrollToTop } from "../components/ScrollToTop";
import { LoadingSpinner } from "../components/UIStates";

const LINKS = [
  { to: "/", label: "Beranda", end: true, icon: <Home size={18} /> },
  { to: "/produk", label: "Produk", end: false, icon: <ShoppingBag size={18} /> },
  { to: "/favorit", label: "Favorit", end: false, icon: <Heart size={18} /> },
  { to: "/tentang", label: "Tentang", end: false, icon: <Info size={18} /> },
];

export function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { ids } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <ScrollToTop />
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
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} // 👈 Sedikit styling flex agar ikon sejajar rapi dengan teks
            >
              {l.icon}
              <span>{l.label}</span>

              {l.to === "/favorit" && ids.length > 0 && (
                <span 
                  className="count"
                  style={{ 
                  marginLeft: '2px', 
                  backgroundColor: '#ef4444', 
                  color: 'white', 
                  borderRadius: '9999px', 
                  padding: '2px 6px', 
                  fontSize: '11px', 
                  fontWeight: 'bold' 
                }}
                  >
                  {ids.length}
                </span>
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
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
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
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="footer">Faiz Muhammad Ilham Hariry • 1247050032 • IF A 24 • Pengembangan Aplikasi Web </footer>
    </div>
  );
}