import React from 'react';
import { useFavoritesStore } from '../store/useFavoritesStore';
import CardProduct from '../СardProduct';
import styles from '../styles/FavoritePage.module.css'; 

const FavoritePage: React.FC = () => {
  const { favorites } = useFavoritesStore(); 
  const favoriteItems = Object.values(favorites);

  return (
    <div className={styles.favoriteContainer}>
     
      
      <h1 className={styles.favoriteTitle}>Избранное</h1>

      <div className={styles.favoriteGrid}>
        {favoriteItems.length > 0 ? (
          favoriteItems.map((item) => (
            <CardProduct key={item.id} product={item} />
          ))
        ) : (
          <p className={styles.emptyState}>В избранном пока пусто </p>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;