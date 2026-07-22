import React from 'react';
import{ useCartStore}from './store/useCartStore'; 
import type { ICartItem } from './store/useCartStore';
import styles from './styles/CartItem.module.css';

interface ICartItemProps {
  product: ICartItem; 
}

const CartItem: React.FC<ICartItemProps> = ({ product }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();

  return (
    <div className={styles.cartItem}>
      <img src={product.image} alt={product.title} className={styles.image} />
      
      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${(product.price * product.quantity).toFixed(2)}</p>
        <p className={styles.count}>Осталось: {product.rating.count}</p>
        

        <div className={styles.actionRow}>
          <div className={styles.counter}>
            <button 
              className={styles.countBtn} 
              onClick={() => decreaseQuantity(product.id)}
            >
              -
            </button>
            
            <span className={styles.count}>{product.quantity}</span>
            
            <button 
              className={styles.countBtn}
              onClick={() => {
                if (product.quantity < product.rating.count) {
                  increaseQuantity(product.id);
                }
              }}
            >
              +
            </button>
          </div>

          <button 
            className={styles.removeBtn} 
            onClick={() => removeFromCart(product.id)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;