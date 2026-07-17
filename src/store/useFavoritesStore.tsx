import { create } from "zustand";
import type { IProducts } from "../assets/types/types";


export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface FavoritesStore {
  favorites: Record<number,IProducts>; 
  toggleFavorite: (product: IProducts) => void; 
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: {},
  toggleFavorite: (product) => set((state) => {
    const isExist = !!state.favorites[product.id]
    if (isExist) {
     const {[product.id]: removedProduct, ...restFavorites} = state.favorites;
     return {favorites:restFavorites};
    } else {
      return { favorites:{ ...state.favorites, [product.id]: product } };
    }
  })
}));