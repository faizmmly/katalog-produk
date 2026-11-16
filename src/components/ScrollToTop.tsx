import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Kembali ke atas saat pindah halaman (perubahan filter tidak memicu ini)
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}