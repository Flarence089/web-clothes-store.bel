import React from 'react'
import type { IProducts } from './assets/types/types';
import styles from './App.module.css'
import { Link } from 'react-router-dom';
import { useFavoritesStore } from './store/useFavoritesStore';

interface ICardProducts {
  product: IProducts;
}

const CardProduct: React.FC<ICardProducts> = ({ product }) => {
  const { favorites, toggleFavorite } = useFavoritesStore()
  const favoriteItems = Object.values(favorites);
  
  const isLiked = favoriteItems.some((fav) => fav.id === product.id)

  return (
    <div className={styles.rect}>
      <Link 
        to={`/product/${product.id}`} 
        style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
      >
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.title} className={styles.img} />
        </div>
        
        <div className={styles['info-wrapper']}>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.titleProduct}>{product.title}</p>
          <p className={styles.ratingProduct}>{product.rating.rate}/5.0</p>
        </div>
      </Link>

      <div className={styles.cardFooter}>
        <button 
          onClick={() => toggleFavorite(product)}
          style={{ 
            cursor: 'pointer', 
            fontSize: '24px',
            display: 'block'
          }}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  )
}

export default CardProduct