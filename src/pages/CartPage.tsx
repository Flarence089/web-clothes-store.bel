import React from 'react';
import { useCartStore } from '../store/useCartStore';
import CardProduct from '../СardProduct';
import styles from '../styles/CartPage.module.css'; 


const CartPage: React.FC = () => {
  const { cart } = useCartStore();
  const cartItems = Object.values(cart);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Корзина</h1>

      {cartItems.length > 0 ? (
        <>
          <div className={styles.cartGrid}>
            {cartItems.map((item) => (
              <CardProduct key={item.id} product={item} />
            ))}
          </div>
          
          <div className={styles.cartTotal}>
            Итого к оплате: ${totalPrice.toFixed(2)}
          </div>
        </>
      ) : (
        <p className={styles.cartEmpty}>Ваша корзина пуста</p>
      )}
    </div>
  );
};

export default CartPage;