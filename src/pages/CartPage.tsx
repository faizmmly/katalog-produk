import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, CreditCard, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { EmptyState } from "../components/UIStates";
import { formatPrice } from "../utils/format";
import { showToast } from "../utils/toast";

interface OrderReceipt {
  invoice: string;
  name: string;
  address: string;
  payment: string;
  totalItems: number;
  totalPrice: number;
}

export function CartPage() {
  useDocumentTitle("Keranjang");
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("QRIS");
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  const handleContinueShopping = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/produk");
    }
  };

  const handleConfirmOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) {
      showToast("Lengkapi nama dan alamat pengiriman dulu ya", "error");
      return;
    }

    const orderSummary: OrderReceipt = {
      invoice: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
      name: name.trim(),
      address: address.trim(),
      payment,
      totalItems,
      totalPrice,
    };

    clearCart();
    setIsCheckoutOpen(false);
    setReceipt(orderSummary);
    setName("");
    setAddress("");
    showToast("Pesanan berhasil dibuat!", "success");
  };

  // Tampilan akhir setelah checkout berhasil (Struk Konfirmasi)
  if (receipt) {
    return (
      <section style={{ maxWidth: "520px", margin: "16px auto" }}>
        <div
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius)",
            padding: "28px 24px",
            display: "grid",
            gap: "16px",
            textAlign: "center",
            boxShadow: "var(--shadow)",
          }}
        >
          <div
            style={{
              width: "68px",
              height: "68px",
              margin: "0 auto",
              borderRadius: "50%",
              background: "rgba(5, 150, 105, 0.14)",
              color: "var(--success)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <CheckCircle2 size={38} />
          </div>

          <div>
            <span className="small muted">No. Invoice: <strong>{receipt.invoice}</strong></span>
            <h1 style={{ marginTop: "4px" }}>Pesanan Berhasil!</h1>
            <p className="muted" style={{ marginTop: "6px" }}>
              Terima kasih, <strong>{receipt.name}</strong>. Pesananmu sedang diproses untuk dikirim.
            </p>
          </div>

          <div
            style={{
              textAlign: "left",
              background: "var(--bg)",
              padding: "14px 16px",
              borderRadius: "12px",
              display: "grid",
              gap: "8px",
              fontSize: "0.9rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="muted">Metode Pembayaran</span>
              <strong>{receipt.payment}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="muted">Jumlah Barang</span>
              <strong>{receipt.totalItems} item</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="muted">Total Dibayar</span>
              <strong style={{ color: "var(--primary-text)" }}>{formatPrice(receipt.totalPrice)}</strong>
            </div>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "8px" }}>
              <span className="muted small">Alamat Pengiriman:</span>
              <p style={{ marginTop: "2px" }}>{receipt.address}</p>
            </div>
          </div>

          <Link to="/produk" className="btn-link" style={{ marginTop: "4px" }} onClick={() => setReceipt(null)}>
            Kembali Belanja
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section>
        <div className="page-head"><h1>Keranjang</h1></div>
        <EmptyState
          icon={<ShoppingBag size={36} />}
          title="Keranjang masih kosong"
          message="Temukan produk menarik dan tambahkan ke keranjangmu."
          actionLabel="Jelajahi produk"
          to="/produk"
        />
      </section>
    );
  }

  return (
    <section>
      <div className="page-head">
        <h1>Keranjang</h1>
        <button type="button" className="btn btn-ghost" onClick={clearCart}>Kosongkan</button>
      </div>

      <div className="cart-layout">
        <ul className="cart-list">
          {items.map((item) => {
            const atMax = item.quantity >= item.stock;
            return (
              <li key={item.id} className="cart-item">
                <Link to={`/produk/${item.id}`} className="cart-thumb">
                  <img src={item.thumbnail} alt={item.title} loading="lazy" />
                </Link>

                <div className="cart-info">
                  <Link to={`/produk/${item.id}`} className="cart-title">{item.title}</Link>
                  <p className="muted">{formatPrice(item.price)}</p>
                  <div className="qty" role="group" aria-label={`Jumlah ${item.title}`}>
                    <button type="button" aria-label="Kurangi jumlah" onClick={() => updateQuantity(item.id, -1)}>
                      <Minus size={16} />
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button type="button" aria-label="Tambah jumlah" disabled={atMax} onClick={() => updateQuantity(item.id, 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                  {atMax && <p className="stock is-low">Stok maksimum tercapai</p>}
                </div>

                <div className="cart-side">
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                  <button type="button" className="icon-link" aria-label={`Hapus ${item.title}`} onClick={() => removeItem(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="summary" aria-label="Ringkasan belanja">
          <h2>Ringkasan</h2>
          <dl>
            <div><dt>Jumlah barang</dt><dd>{totalItems}</dd></div>
            <div className="total"><dt>Total</dt><dd>{formatPrice(totalPrice)}</dd></div>
          </dl>
          <button
            type="button"
            className="btn btn-primary"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            onClick={() => setIsCheckoutOpen(true)}
          >
            <CreditCard size={18} />
            <span>Checkout Sekarang</span>
          </button>
          <button type="button" className="btn btn-ghost" onClick={handleContinueShopping}>
            Lanjut belanja
          </button>
        </aside>
      </div>

      {/* Modal Form Checkout */}
      {isCheckoutOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
          onClick={() => setIsCheckoutOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(11, 17, 32, 0.75)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px",
            overflowY: "auto",
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleConfirmOrder}
            style={{
              width: "100%",
              maxWidth: "440px",
              maxHeight: "calc(100dvh - 24px)",
              overflowY: "auto",
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              padding: "clamp(16px, 4vw, 24px)",
              display: "grid",
              gap: "12px",
              boxShadow: "var(--shadow)",
              margin: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
              <h2 id="checkout-title" style={{ fontSize: "1.15rem" }}>Checkout Pesanan</h2>
              <button
                type="button"
                className="icon-link"
                aria-label="Tutup modal"
                onClick={() => setIsCheckoutOpen(false)}
                style={{ width: "36px", height: "36px", flexShrink: 0 }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="field">
              <label htmlFor="checkout-name">Nama Penerima</label>
              <input
                id="checkout-name"
                type="text"
                placeholder="Contoh: Faiz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="checkout-address">Alamat Pengiriman</label>
              <textarea
                id="checkout-address"
                rows={2}
                placeholder="Masukkan alamat lengkap pengiriman..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <span className="label">Metode Pembayaran</span>
              <div style={{ display: "grid", gap: "8px" }}>
                {[
                  { id: "QRIS", label: "QRIS (Instan)" },
                  { id: "Transfer Bank", label: "Transfer Bank (BCA / Mandiri)" },
                  { id: "COD", label: "COD (Bayar di Tempat)" },
                ].map((opt) => {
                  const active = payment === opt.label;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPayment(opt.label)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        border: active ? "1.5px solid var(--primary)" : "1.5px solid var(--line)",
                        background: active ? "var(--primary-soft)" : "var(--panel)",
                        color: active ? "var(--primary-text)" : "var(--text)",
                        font: "inherit",
                        fontSize: "0.9rem",
                        fontWeight: active ? 600 : 500,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{opt.label}</span>
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          border: active ? "5px solid var(--primary)" : "2px solid var(--muted)",
                          flexShrink: 0,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "4px 12px",
                paddingTop: "10px",
                borderTop: "1px solid var(--line)",
              }}
            >
              <span className="muted small">Total ({totalItems} item)</span>
              <strong style={{ fontSize: "1.15rem", color: "var(--primary-text)" }}>
                {formatPrice(totalPrice)}
              </strong>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "2px" }}>
              Konfirmasi & Bayar
            </button>
          </form>
        </div>
      )}
    </section>
  );
}