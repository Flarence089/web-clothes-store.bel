import React from 'react';
import { useCartStore } from '../store/useCartStore';
import CardProduct from '../СardProduct';


const CartPage: React.FC = () => {

  const { cart } = useCartStore();
  

  const cartItems = Object.values(cart);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}> Корзина</h1>

      {cartItems.length > 0 ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 250px)', gap: '20px', marginBottom: '40px' }}>
            {cartItems.map((item) => (
              <CardProduct key={item.id} product={item} />
            ))}
          </div>
          

          <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'right', borderTop: '2px solid #eee', paddingTop: '20px' }}>
            Итого к оплате: ${totalPrice.toFixed(2)}
          </div>
        </>
      ) : (
        <p style={{ fontSize: '18px', color: '#666' }}>Ваша корзина пуста 🛒</p>
      )}
    </div>
  );
};

export default CartPage;