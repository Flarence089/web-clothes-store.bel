import React from 'react';
import { Link } from 'react-router-dom';
import { useFavoritesStore } from './store/useFavoritesStore';
import {useCartStore} from './store/useCartStore'
import styles from './styles/App.module.css'; 


const Header: React.FC = () => {
  const { favorites } = useFavoritesStore();
  const {cart} = useCartStore();
  const favoriteItems = Object.values(favorites);
  return (
    <header className={styles.header}>
         <Link to = '/' className={styles.title}>
          <h1>белорусский ресейл</h1>
          </Link>
      <nav className={styles.nav}>
        <Link to="/favorites" className={styles.navLink}>
          Избранное 
          {favoriteItems.length > 0 && (
            <span className={styles.badge}>{favoriteItems.length}</span>
          )}
        <Link to = '/cart' className={styles.navLink}>
          Корзина
          {Object.keys(cart).length > 0 && (
           <span className={styles.badge}>{Object.keys(cart).length}</span>
           )}
          {}
        </Link>
          
        </Link>
      </nav>
    </header>
  );
};

export default Header;