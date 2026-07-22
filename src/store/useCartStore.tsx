import type { IProducts } from '../assets/types/types';
import { create } from "zustand";

export interface ICartItem extends IProducts{
  quantity: number;
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