import { useFavorites } from "../hooks/useFavorites";

interface FavoriteButtonProps {
  productId: number;
  title: string;
  className?: string;
}

export function FavoriteButton({ productId, title, className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(productId);

  return (
    <button
      type="button"
      className={`fav-btn ${active ? "is-active" : ""} ${className}`}
      aria-pressed={active}
      aria-label={active ? `Hapus ${title} dari favorit` : `Tambahkan ${title} ke favorit`}
      onClick={() => toggle(productId)}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}