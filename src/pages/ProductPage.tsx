import { useParams, useNavigate } from 'react-router-dom';
import type { IProducts } from '../assets/types/types'; 
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import styles from '../styles/ProductPage.module.css'; 

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

  if (isLoading) return <h2 className={styles.statusMessage}>Загрузка товара...</h2>;
  if (isError) return <h2 className={styles.statusMessage}>Ошибка при загрузке :(</h2>;

  return (
    <div className={styles.pageContainer}>
      <button 
        onClick={() => navigate(-1)} 
        className={styles.backBtn}
      >
        ← Назад
      </button>
      
      {product && (
        <div className={styles.productWrapper}>
          <div className={styles.imageContainer}>
            <img 
              src={product.image} 
              alt={product.title} 
              className={styles.productImage}
            />
          </div>
          <div className={styles.infoWrapper}>
            <span className={styles.productCategory}>{product.category}</span>
            <h1 className={styles.productTitle}>{product.title}</h1>
            <h2 className={styles.productPrice}>${product.price}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <button className={styles.addToCartBtn}>
              Добавить в корзину
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;