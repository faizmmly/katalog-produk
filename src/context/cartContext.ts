import { createContext } from "react";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  stock: number;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (product: Omit<CartItem, "quantity">, qty?: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextValue | null>(null);