import type { IProducts } from '../assets/types/types';
import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface CartStore {
  cart: Record<number, IProducts>; 
  toggleCart: (product: IProducts) => void; 
}

export const useCartStore = create<CartStore>((set) => ({
  cart: {},
  toggleCart: (product) => set((state) => {
    const isExist = !!state.cart[product.id];
    
    if (isExist) {
      const { [product.id]: removedProduct, ...restCart } = state.cart;
      return { cart: restCart };
    } else {
      return { cart: { ...state.cart, [product.id]: product } };
    }
  })
}));

export default useCartStore;