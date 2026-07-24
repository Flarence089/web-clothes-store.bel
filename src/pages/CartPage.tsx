import React from 'react';
import { useCartStore } from '../store/useCartStore';
import CartItem from '../CartItem';
import styles from '../styles/CartPage.module.css'; 

const CartPage: React.FC = () => {
  const { cart } = useCartStore();
  const cartItems = Object.values(cart);
  const totalPrice = Object.values(cart).reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Корзина</h1>

      {cartItems.length > 0 ? (
        <>
          <div className={styles.cartWrapper}>
            {cartItems.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </div>
          
          <div className={styles.cartTotal}>
            Итого к оплате: ${totalPrice.toFixed(2)}
          </div>
        </>
      ) : (
        <p className={styles.emptyCart}>Ваша корзина пуста</p>
      )}
    </div>
  );
};

export default CartPage;