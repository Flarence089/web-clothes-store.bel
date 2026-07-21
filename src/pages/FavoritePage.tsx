import React from 'react'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { useNavigate } from 'react-router-dom'
import CardProduct from '../СardProduct'
import huiStyles from '../styles/Button.module.css'
import styles from '../styles/FavoritePage.module.css' 

const FavoritePage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavoritesStore(); 
  const favoriteItems = Object.values(favorites);

  return (
    <div className={styles.favoriteContainer}>
      <button className={huiStyles.myButton} onClick={() => navigate("/")}>Назад</button>
      
      <h1 className={styles.favoriteTitle}>Избранное</h1>

      <div className={styles.favoriteGrid}>
        {favoriteItems.length > 0 ? (
          favoriteItems.map((item) => (
            <CardProduct key={item.id} product={item} />
          ))
        ) : (
          <p>Пусто!</p>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;