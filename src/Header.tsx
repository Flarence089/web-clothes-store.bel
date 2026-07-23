import React from 'react';
import { Link } from 'react-router-dom';
import { useFavoritesStore } from './store/useFavoritesStore';
import { useCartStore } from './store/useCartStore';
import styles from './styles/App.module.css'; 
import './index.css';
import { Heart,ShoppingCart } from 'lucide-react';

const Header: React.FC = () => {
  const { favorites } = useFavoritesStore();
  const { cart } = useCartStore();
  const favoriteItems = Object.values(favorites);
  
  return (
    <header className={styles.header}>
      <Link to='/'>
        <h1 className={styles.title}>byresale</h1>
      </Link>
      
      <nav className={styles.nav}>
        <Link to="/favorites" className={styles.navLink}>
          <Heart/>
          {favoriteItems.length > 0 && (
            <span className={styles.badge}>{favoriteItems.length}</span>
          )}
        </Link> 

        <Link to='/cart' className={styles.navLink}>
          <ShoppingCart/>
          {Object.keys(cart).length > 0 && (
            <span className={styles.badge}>{Object.keys(cart).length}</span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;