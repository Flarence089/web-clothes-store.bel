import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { productsApi } from '../api/productsApi';
import type { IProducts } from '../assets/types/types';

export const useProductsLogic = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  const filteredProducts = products?.filter((item: IProducts) => {
    const matchSearch = !searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const categories = products
    ? ['all', ...new Set(products.map((item: IProducts) => item.category))]
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