import React from 'react'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { useNavigate } from 'react-router-dom'
import CardProduct from '../СardProduct'



const FavoritePage: React.FC = () => {
  const navigate = useNavigate();
  
  const { favorites } = useFavoritesStore(); 

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)}>Назад</button>
      
      <h1>Избранное</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 250px)', gap: '20px' }}>
        {favorites.length > 0 ? (
          favorites.map((item) => (
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