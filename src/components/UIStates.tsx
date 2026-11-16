import { Search } from "lucide-react";

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
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "Tidak ada hasil",
  message = "Coba ubah kata kunci atau filter.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="state">
      <div className="state-icon" style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '8px' }}>
        <Search size={36} strokeWidth={1.5} className="muted" />
      </div>
      <h2>{title}</h2>
      <p className="muted">{message}</p>
      {actionLabel && onAction && (
        <button type="button" className="btn btn-ghost" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}