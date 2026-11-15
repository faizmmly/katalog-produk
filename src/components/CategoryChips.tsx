import { formatCategory } from "../utils/format";

interface CategoryChipsProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

export function CategoryChips({ categories, active, onSelect }: CategoryChipsProps) {
  return (
    <div className="chips" role="group" aria-label="Kategori">
      <button
        type="button"
        className={`chip ${active === "" ? "is-active" : ""}`}
        aria-pressed={active === ""}
        onClick={() => onSelect("")}
      >
        Semua
      </button>
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          className={`chip ${active === c ? "is-active" : ""}`}
          aria-pressed={active === c}
          onClick={() => onSelect(c)}
        >
          {formatCategory(c)}
        </button>
      ))}
    </div>
  );
}