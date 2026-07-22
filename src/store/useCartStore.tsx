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
    const newCart = { ...state.cart };
    
    if (newCart[product.id]) {
      if (newCart[product.id].quantity < product.rating.count) {
        newCart[product.id].quantity += 0;
      }
    } else {
      newCart[product.id] = { ...product, quantity: 1 };
    }
    
    return { cart: newCart };
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