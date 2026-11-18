import { useEffect, useState } from "react";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";
import type { ToastPayload } from "../utils/toast";

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastPayload[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastPayload>;
      const newToast = customEvent.detail;

      setToasts((prev) => [...prev.slice(-2), newToast]); // Maksimal 3 toast tampil bersamaan

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 2500);
    };

    window.addEventListener("app-toast", handleToast);
    return () => window.removeEventListener("app-toast", handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "340px",
        width: "calc(100vw - 48px)",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => {
        const bgColor =
          toast.type === "error"
            ? "#dc2626"
            : toast.type === "info"
            ? "#2563eb"
            : "#16a34a";

        return (
          <div
            key={toast.id}
            role="status"
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 16px",
              borderRadius: "12px",
              backgroundColor: bgColor,
              color: "#ffffff",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.35)",
              fontSize: "0.9rem",
              fontWeight: 500,
              animation: "fadeIn 0.2s ease-out",
            }}
          >
            {toast.type === "error" ? (
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
            ) : toast.type === "info" ? (
              <Info size={18} style={{ flexShrink: 0 }} />
            ) : (
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            )}

            <span style={{ flex: 1, lineHeight: 1.4 }}>{toast.message}</span>

            <button
              type="button"
              aria-label="Tutup notifikasi"
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.8)",
                cursor: "pointer",
                padding: "2px",
                display: "grid",
                placeItems: "center",
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}