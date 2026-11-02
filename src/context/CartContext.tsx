"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Colorway } from "@/types/product";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: { id: string; name: string; slug: string; price: number; image: string }, colorway: Colorway, size: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  totalItems: number;
  subtotal: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    try {
      const saved = localStorage.getItem("aerix_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore storage error
    }
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    try {
      localStorage.setItem("aerix_cart", JSON.stringify(items));
    } catch {
      // ignore storage error
    }
  }, [items, hasMounted]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (
    product: { id: string; name: string; slug: string; price: number; image: string },
    colorway: Colorway,
    size: number
  ) => {
    setItems((prev) => {
      const existingId = `${product.id}-${colorway.id}-${size}`;
      const existing = prev.find((item) => item.id === existingId);
      if (existing) {
        return prev.map((item) =>
          item.id === existingId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: existingId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          colorway,
          size,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        subtotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};
