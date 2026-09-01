import { axiosClient } from './axiosClient'
import type { IProducts } from '../assets/types/types'

export const productsApi = {
  getAll: async (): Promise<IProducts[]> => {
    const response = await axiosClient.get<IProducts[]>('/products')
    return response.data
  },
}