import React from 'react'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { useNavigate } from 'react-router-dom'
import CardProduct from '../СardProduct'
import huiStyles from '../Button.module.css'



const FavoritePage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavoritesStore(); 
  const favoriteItems = Object.values(favorites);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <button className={huiStyles.myButton} onClick={() => navigate("/")}>Назад</button>
      
      <h1>Избранное</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 250px)', gap: '20px' }}>
        {Object.keys(favorites).length > 0 ? (
          favoriteItems.map((item) => (
            <CardProduct key={item.id} product={item} />
          ))
        ) : (
          <p>Пусто!</p>
        )}
      </div>
    </div>
  );
};

export default FavoritePage