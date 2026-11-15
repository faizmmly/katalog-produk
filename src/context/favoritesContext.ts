import { createContext } from "react";

export interface FavoritesContextValue {
  ids: number[];
  isFavorite: (id: number) => boolean;
  toggle: (id: number) => void;
  clear: () => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);