import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CartContext } from "./cartContext";
import type { CartContextValue, CartItem } from "./cartContext";
import { showToast } from "../utils/toast";

export function CartProvider({ children }: { children: ReactNode }) {
  // Satu-satunya sumber state keranjang; tersimpan otomatis ke localStorage
  const [items, setItems] = useLocalStorage<CartItem[]>("tokokita_cart", []);

  const addItem: CartContextValue["addItem"] = (product, qty = 1) => {
    if (product.stock <= 0) return;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + qty, product.stock);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item,
        );
      }
      return [...prev, { ...product, quantity: Math.min(qty, product.stock) }];
    });
    showToast(`"${product.title}" ditambahkan ke keranjang`, "success");
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const nextQty = item.quantity + delta;
          if (nextQty <= 0) return null;
          return { ...item, quantity: Math.min(nextQty, item.stock) };
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    showToast("Produk dihapus dari keranjang", "info");
  };

  const clearCart = () => setItems([]);

  // Nilai turunan: dihitung saat render, bukan disimpan di state
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value: CartContextValue = {
    items, addItem, updateQuantity, removeItem, clearCart, totalItems, totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}