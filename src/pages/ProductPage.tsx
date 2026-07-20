
import { useParams, useNavigate } from 'react-router-dom';
import type { IProducts } from '../assets/types/types'; 
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import huiStyles from '../Button.module.css'



const ProductPage = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    const { data } = await axios.get<IProducts>(`https://fakestoreapi.com/products/${id}`);
    return data;
  };

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchProduct,
  });


  if (isLoading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Загрузка товара...</h2>;
  if (isError) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Ошибка при загрузке :(</h2>;

   
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(-1)} 
        className={huiStyles.myButton}
      >
    Назад
      </button>
      
      {product && (
        <div style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ width: '300px', objectFit: 'contain' }} 
          />
          <div>
            <h1>{product.title}</h1>
            <h2 style={{ color: 'lightgreen' }}>{product.price}$</h2>
            <p style={{ color: 'gray', textTransform: 'capitalize' }}>Категория: {product.category}</p>
            <p style={{ marginTop: '20px', lineHeight: '1.6' }}>{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};


export default ProductPage;