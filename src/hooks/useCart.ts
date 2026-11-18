import { useContext } from "react";
import { CartContext } from "../context/cartContext";

// Tipe tetap bisa diimpor dari sini seperti sebelumnya
export type { CartItem } from "../context/cartContext";

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam CartProvider");
  return ctx;
}