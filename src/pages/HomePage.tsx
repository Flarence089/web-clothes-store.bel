import { useProductsLogic } from '../hooks/useProductLogic'; 
import { useFavoritesStore } from '../store/useFavoritesStore'
import { useCartStore } from '../store/useCartStore'
import { useState } from 'react';

import CardProduct from '../СardProduct'; 
import SkeletonCard from '../SkeletonCard';
import styles from '../styles/App.module.css'; 
import huiStyles from '../styles/Button.module.css';

const HomePage = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    categories,
    isLoading,
    error
  } = useProductsLogic();

   const { favorites, toggleFavorite } = useFavoritesStore()
   const { toggleCart } = useCartStore()

   const [sortBy, setSortBy] = useState('');
const [isOpen, setIsOpen] = useState(false);

const sortLabels: Record<string, string> = {
  '': 'Сортировка',
  'price-asc': 'Сначала дешёвые',
  'price-desc': 'Сначала дорогие',
  'rating-desc': 'По рейтингу',
};

const sortedProducts = filteredProducts
  ? [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating.rate - a.rating.rate;
      return 0;
    })
  : [];

  if (error) return <h2 className={styles.statusMessage}>Ошибка при загрузке</h2>;

  return (  
    <div>
      <div className={styles.searchWrapper}>
        <input 
          type='text' 
          placeholder='Поиск по названию...' 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <section>
        <div>
          <h2 className={styles.sectionTitle}>Товары</h2>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
  <button className={huiStyles.myButton} onClick={() => setIsOpen(!isOpen)}>
    {sortLabels[sortBy]} {isOpen ? '▲' : '▼'}
  </button>

  {isOpen && (
    <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10 }}>
      <button className={huiStyles.myButton} onClick={() => { setSortBy('price-asc'); setIsOpen(false); }}>
        Сначала дешёвые
      </button>
      <button className={huiStyles.myButton} onClick={() => { setSortBy('price-desc'); setIsOpen(false); }}>
        Сначала дорогие
      </button>
      <button className={huiStyles.myButton} onClick={() => { setSortBy('rating-desc'); setIsOpen(false); }}>
        По рейтингу
      </button>
    </div>
  )}
</div>
          <div className={styles.categoriesWrapper}>
            {categories.map((category) => (
              <button
                className={`${huiStyles.myButton} ${selectedCategory === category ? huiStyles.activeButton : ''}`}
                key={category}
                onClick={() => setSelectedCategory(category)} 
              >
                {category === 'all' ? 'Все' : category}
              </button>
            ))}
          </div>
        </div> 

        <div className={styles.productsGrid}>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
          <CardProduct
            key={item.id}
            product={item}
            isLiked={!!favorites[item.id]}
            onToggleFavorite={toggleFavorite}
            onToggleCart={toggleCart}
          />
        ))
          ) : (
            <p className={styles.emptyState}>
              Ничего не найдено 
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;