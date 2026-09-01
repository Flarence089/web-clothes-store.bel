import type { IProducts } from '../assets/types/types';
import { create } from "zustand";

export interface ICartItem extends IProducts{
  quantity: number;
}

interface CartStore {
 cart: Record<number, ICartItem>;
  toggleCart: (product: IProducts) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: {},

  toggleCart: (product) => set((state) => {
  const existing = state.cart[product.id];

  if (existing) {
    if (existing.quantity < product.rating.count) {
      return {
        cart: {
          ...state.cart,
          [product.id]: { ...existing, quantity: existing.quantity + 1 }
        }
      };
    }
    return state; 
  }

  return {
    cart: { ...state.cart, [product.id]: { ...product, quantity: 1 } }
  };
}),

  increaseQuantity: (id) => set((state) => {
    const newCart = { ...state.cart };
    if (newCart[id]) {
      newCart[id].quantity += 1;
    }
    return { cart: newCart };
  }),


  decreaseQuantity: (id) => set((state) => {
    const newCart = { ...state.cart };
    if (newCart[id]) {
      if (newCart[id].quantity > 1) {
        newCart[id].quantity -= 1;
      } else {
        delete newCart[id]; 
      }
    }
    return { cart: newCart };
  }),


  removeFromCart: (id) => set((state) => {
    const newCart = { ...state.cart };
    delete newCart[id];
    return { cart: newCart };
  }),
}));