interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search">
      <span aria-hidden="true">🔍</span>
      <input
        type="search"
        placeholder="Cari produk atau merek..."
        aria-label="Cari produk"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}