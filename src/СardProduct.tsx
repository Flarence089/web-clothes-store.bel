import React from 'react'
import type { IProducts } from './assets/types/types';
import styles from './styles/App.module.css'
import { Link } from 'react-router-dom';
import { useFavoritesStore } from './store/useFavoritesStore';
import { useCartStore } from './store/useCartStore'
import huiStyles from './styles/Button.module.css'

interface ICardProducts {
  product: IProducts;
}

const CardProduct: React.FC<ICardProducts> = ({ product }) => {
  const { favorites, toggleFavorite } = useFavoritesStore()
  const { toggleCart } = useCartStore();
  const isLiked = !!favorites[product.id];

  return (
    <div className={styles.rect}>
      <Link to={`/product/${product.id}`} className={styles.cardLink}>
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
          className={styles.favoriteBtn}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
        <button 
          className={huiStyles.myButton} 
          onClick={() => toggleCart(product)}
        >
          В корзину
        </button>
      </div>
    </div>
  )
}

export default CardProduct