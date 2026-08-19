'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Food } from '../data';

type CartItem = Food & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  addItem: (f: Food, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('hamrah_cart') : null;
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hamrah_cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (f: Food, qty = 1) => {
    setItems((cur) => {
      const found = cur.find((i) => i.id === f.id);
      if (found) {
        return cur.map((i) => (i.id === f.id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...cur, { ...f, quantity: qty }];
    });
  };

  const removeItem = (id: string) => setItems((cur) => cur.filter((i) => i.id !== id));

  const updateQty = (id: string, qty: number) =>
    setItems((cur) => cur.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));

  const clear = () => setItems([]);

  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);

  const value: CartContextValue = { items, addItem, removeItem, updateQty, clear, subtotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error('useCart must be used within CartProvider');
  return c;
}
