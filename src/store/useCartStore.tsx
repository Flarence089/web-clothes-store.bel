import React from 'react'
import {create} from "zustand"
import type { IProducts } from '../assets/types/types'

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}



const useCartStore = () => {
  return (
    <div>useCartStore</div>
  )
}

export default useCartStore