import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/format";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function CartPage() {
  useDocumentTitle("Keranjang Belanja");
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setCheckedOut(true);
  };

  if (checkedOut) {
    return (
      <div style={{ textAlign: "center", padding: "48px 16px" }}>
        <CheckCircle2 size={56} style={{ color: "#22c55e", margin: "0 auto 16px" }} />
        <h1>Pesanan Berhasil Dibuat!</h1>
        <p className="muted" style={{ maxWidth: "420px", margin: "8px auto 24px" }}>
          Terima kasih telah berbelanja di TokoKita. Pesanan Anda sedang diproses.
        </p>
        <Link to="/produk" className="btn btn-primary">
          Lanjut Belanja
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "48px 16px" }}>
        <ShoppingBag size={48} className="muted" style={{ margin: "0 auto 16px" }} />
        <h2>Keranjang Masih Kosong</h2>
        <p className="muted" style={{ margin: "8px 0 24px" }}>
          Yuk, temukan produk menarik dan tambahkan ke keranjangmu!
        </p>
        <Link to="/produk" className="btn btn-primary">
          Jelajahi Produk
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/produk" className="back" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <ArrowLeft size={18} />
        <span>Lanjut belanja</span>
      </Link>

      <div className="page-head" style={{ marginBottom: "24px" }}>
        <h1>Keranjang Belanja ({totalItems} item)</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        {/* Daftar Produk di Keranjang */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                flexWrap: "wrap",
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{
                  width: "72px",
                  height: "72px",
                  objectFit: "contain",
                  background: "#f1f5f9",
                  borderRadius: "8px",
                  padding: "4px",
                }}
              />

              <div style={{ flex: 1, minWidth: "160px" }}>
                <Link to={`/produk/${item.id}`} style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
                  {item.title}
                </Link>
                <p className="detail-price" style={{ fontSize: "1rem", margin: "4px 0" }}>
                  {formatPrice(item.price)}
                </p>
                <span className="muted" style={{ fontSize: "0.8rem" }}>
                  Stok tersedia: {item.stock}
                </span>
              </div>

              {/* Kontrol Jumlah (- / +) */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, -1)}
                  aria-label="Kurangi jumlah"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "transparent",
                    color: "inherit",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Minus size={14} />
                </button>

                <span style={{ fontWeight: "bold", minWidth: "24px", textAlign: "center" }}>
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, 1)}
                  disabled={item.quantity >= item.stock}
                  aria-label="Tambah jumlah"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "transparent",
                    color: "inherit",
                    display: "grid",
                    placeItems: "center",
                    cursor: item.quantity >= item.stock ? "not-allowed" : "pointer",
                    opacity: item.quantity >= item.stock ? 0.4 : 1,
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Subtotal & Hapus */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginLeft: "auto" }}>
                <strong style={{ fontSize: "1.05rem" }}>
                  {formatPrice(item.price * item.quantity)}
                </strong>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label="Hapus item"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#ef4444",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ringkasan Belanja */}
        <div
          style={{
            padding: "20px",
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="muted">Total Pembayaran ({totalItems} barang)</span>
            <strong style={{ fontSize: "1.4rem", color: "#3b82f6" }}>
              {formatPrice(totalPrice)}
            </strong>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="btn btn-primary"
            style={{ width: "100%", padding: "12px", fontWeight: "bold", marginTop: "8px", cursor: "pointer" }}
          >
            Checkout Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}