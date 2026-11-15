
export function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 0' }}>
      <div className="spinner" style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e2e8f0',
        borderTop: '4px solid #064e3b',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca', margin: '20px 0' }}>
      <p style={{ color: '#991b1b', marginBottom: '16px', fontWeight: 500 }}>⚠️ {message}</p>
      {onRetry && (
        <button onClick={onRetry} style={{
          background: '#064e3b',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 600
        }}>
          Coba Lagi
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title = "Tidak ada produk ditemukan", description = "Coba gunakan kata kunci atau kategori lain." }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
      <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📦</div>
      <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '6px' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem' }}>{description}</p>
    </div>
  );
}