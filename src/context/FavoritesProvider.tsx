import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { FavoritesContext } from "./favoritesContext";
import type { FavoritesContextValue } from "./favoritesContext";
import { showToast } from "../utils/toast";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useLocalStorage<number[]>("katalog-favorites", []);

  const toggle = (id: number) => {
    const exists = ids.includes(id);
    if (exists) {
      setIds(ids.filter((i) => i !== id));
      showToast("Dihapus dari daftar favorit", "info");
    } else {
      setIds([...ids, id]);
      showToast("Ditambahkan ke daftar favorit", "success");
    }
  };

  const clear = () => {
    setIds([]);
    showToast("Semua favorit berhasil dihapus", "info");
  };

  const value: FavoritesContextValue = {
    ids,
    isFavorite: (id) => ids.includes(id),
    toggle,
    clear,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}