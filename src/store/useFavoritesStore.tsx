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
  favorites: IProducts[]; // 
  toggleFavorite: (product: IProducts) => void; 
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: [],
  toggleFavorite: (product) => set((state) => {
    const isExist = state.favorites.some((fav) => fav.id === product.id);
    
    if (isExist) {
      return { favorites: state.favorites.filter((fav) => fav.id !== product.id) };
    } else {
      return { favorites: [...state.favorites, product] };
    }
  })
}));