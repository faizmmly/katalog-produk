interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function pageWindow(page: number, total: number): number[] {
  const start = Math.max(1, Math.min(page - 2, total - 4));
  const end = Math.min(total, start + 4);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Halaman">
      <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        ‹ Sebelumnya
      </button>
      {pageWindow(page, totalPages).map((n) => (
        <button
          key={n}
          type="button"
          className={n === page ? "is-active" : ""}
          aria-current={n === page ? "page" : undefined}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
      <button type="button" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Selanjutnya ›
      </button>
    </nav>
  );
}