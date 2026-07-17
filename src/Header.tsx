import React from 'react';
import { Link } from 'react-router-dom';
import { useFavoritesStore } from './store/useFavoritesStore';
import styles from './App.module.css'; 
import'./App.css'

const Header: React.FC = () => {
  const { favorites } = useFavoritesStore();
  const favoriteItems = Object.values(favorites);
  return (
    <header className={styles.header}>
         <Link to = '/' className={styles.title}>
          <h1>белорусский ресейл</h1>
          </Link>
      <nav className={styles.nav}>
        <Link to="/favorites" className={styles.navLink}>
          Избранное 
        <Link to = '/cart' className={styles.navLink}>
          Корзина
        </Link>
          {favoriteItems.length > 0 && (
            <span className={styles.badge}>{favoriteItems.length}</span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;