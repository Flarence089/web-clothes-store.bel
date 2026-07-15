import React from 'react'
import type { IProducts } from './assets/types/types';
import styles from './App.module.css'
import { Link } from 'react-router-dom';
import { useFavoritesStore } from './store/useFavoritesStore';


interface ICardProducts{
  product:IProducts;
}

    

const CardProduct: React.FC<ICardProducts> = ({product}) => {

  const {favorites,toggleFavorite} = useFavoritesStore()
  
  const isLiked = favorites.some((fav) => fav.id === product.id)

console.log('Статус лайка для товара:', product.id, isLiked);
 return (
    <div className={styles.rect}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={styles.rect}>
          <img src={product.image} alt={product.title} className={styles.img} />
        </div>
        <div>
          <p className={styles.price}>{product.price}</p>
          <p className={styles.titleProduct}>{product.title}</p>
        </div>
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
       <button 
  onClick={() => toggleFavorite(product)}
  style={{ 
    cursor: 'pointer', 
    fontSize: '24px',
    display: 'block',  
    marginTop: '10px' 
  }}
>
  {isLiked ? '❤️' : '🤍'}
</button>
        <button style={{ cursor: 'pointer' }}>открыть товар</button>
      </div>
    </div>
  )
}

export default CardProduct