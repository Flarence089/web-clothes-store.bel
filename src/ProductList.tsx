import type { IProducts } from './assets/types/types';
import { useFavoritesStore } from "./store/useFavoritesStore"
import { useCartStore } from "./store/useCartStore"
import CardProduct from './СardProduct'; 
import { useState } from 'react';

interface IProductListProps {
  products: IProducts[];
}

const ProductList: React.FC<IProductListProps> = ({ products }) => {
  const { favorites, toggleFavorite } = useFavoritesStore()
  const { toggleCart } = useCartStore()
  const [sortBy,setSortBy] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const sortedProducts = [...products].sort((a, b) => {
  if (sortBy === 'price-asc') return a.price - b.price;
  if (sortBy === 'price-desc') return b.price - a.price;
  if (sortBy === 'rating-desc') return b.rating.rate - a.rating.rate;
  return 0;
});
  const sortLabels: Record<string, string> = {
  '': 'Сортировка',
  'price-asc': 'Сначала дешёвые',
  'price-desc': 'Сначала дорогие',
  'rating-desc': 'По рейтингу',
};
  return (
    <div>
         <div style={{ position: 'relative', display: 'inline-block' }}>
        <button onClick={() => setIsOpen(!isOpen)}>
          {sortLabels[sortBy]} {isOpen ? '▲' : '▼'}
        </button>

        {isOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0 }}>
            <button onClick={() => { setSortBy('price-asc'); setIsOpen(false); }}>
              Сначала дешёвые
            </button>
            <button onClick={() => { setSortBy('price-desc'); setIsOpen(false); }}>
              Сначала дорогие
            </button>
            <button onClick={() => { setSortBy('rating-desc'); setIsOpen(false); }}>
              По рейтингу
            </button>
          </div>
        )}
      </div>

      {sortedProducts.map(p => (
        <CardProduct
          key={p.id}
          product={p}
          isLiked={!!favorites[p.id]}
          onToggleFavorite={toggleFavorite}
          onToggleCart={toggleCart}
        />
      ))}
    </div>
  )
}

export default ProductList