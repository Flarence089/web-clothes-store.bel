import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import axios from 'axios';
import type { IProducts } from '../assets/types/types';

const fetchProducts = async () => {
  const response = await axios.get<IProducts[]>('https://fakestoreapi.com/products')
  return response.data
}

export const useProductsLogic = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const filteredProducts = products?.filter((item: any) => {
    const matchSearch = !searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const categories = products
    ? ['all', ...new Set(products.map((item: any) => item.category))]
    : ['all'];

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    categories,
    isLoading,
    error
  };
};