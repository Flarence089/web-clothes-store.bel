import React from 'react'
import { Link } from 'react-router-dom'
import type { IProducts } from './assets/types/types';
import styles from './styles/App.module.css'
import darkStyles from './styles/CardProductDark.module.css'
import buttonStyles from './styles/Button.module.css' 

interface ICardProducts {
  product: IProducts;
  isLiked: boolean;
  onToggleFavorite: (product: IProducts) => void;
  onToggleCart: (product: IProducts) => void;
  theme?: 'light' | 'dark';
}

const CardProduct: React.FC<ICardProducts> = ({ 
  product, isLiked, onToggleFavorite, onToggleCart, theme = 'light'
}) => {
  const s = theme === 'dark' ? darkStyles : styles;

  return (
    <div className={s.rect}>
      <Link to={`/product/${product.id}`} className={s.cardLink}>
        <div className={s.imageWrapper}>
          <img src={product.image} alt={product.title} className={s.img} />
        </div>

        <div className={s['info-wrapper']}>
          <p className={s.price}>${product.price}</p>
          <p className={s.titleProduct}>{product.title}</p>
          <p className={s.ratingProduct}>{product.rating.rate}/5.0</p>
        </div>
      </Link>

      <div className={s.cardFooter}>
        <button onClick={() => onToggleFavorite(product)} className={s.favoriteBtn}>
          {isLiked ? '❤️' : '🤍'}
        </button>
        <button className={buttonStyles.myButton} onClick={() => onToggleCart(product)}>
          В корзину
        </button>
      </div>
    </div>
  )
}

export default CardProduct