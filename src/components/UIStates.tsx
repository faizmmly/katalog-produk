import { Search } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="state" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>Memuat data...</p>
    </div>
  );
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="product-card skeleton" />
      ))}
    </div>
  );
}

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="state state-error" role="alert">
      <span aria-hidden="true">⚠️</span>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Coba lagi
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  message?: string;
  actionLabel?: string;
  to?: string; // tombol berupa tautan ke halaman lain
  onAction?: () => void; // tombol berupa aksi
}

export function EmptyState({
  icon = <SearchX size={36} />,
  title = "Tidak ada hasil",
  message = "Coba ubah kata kunci atau filter.",
  actionLabel,
  to,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="state">
      <span className="state-icon" aria-hidden="true">{icon}</span>
      <h2>{title}</h2>
      <p className="muted">{message}</p>
      {actionLabel && to && (
        <Link to={to} className="btn-link">{actionLabel}</Link>
      )}
      {actionLabel && !to && onAction && (
        <button type="button" className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}