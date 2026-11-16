import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search" style={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
      <Search size={18} className="muted"/>
      <input
        id="search"
        type="search"
        placeholder="Cari produk atau merek...( tekan /)"
        aria-label="Cari produk"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}