import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { FavoritesContext } from "./favoritesContext";
import type { FavoritesContextValue } from "./favoritesContext";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useLocalStorage<number[]>("katalog-favorites", []);

  const value: FavoritesContextValue = {
    ids,
    isFavorite: (id) => ids.includes(id),
    toggle: (id) => setIds(ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]),
    clear: () => setIds([]),
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}