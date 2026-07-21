
import { useProductsLogic } from '../hooks/useProductLogic'; 
import CardProduct from '../СardProduct'; 
import styles from '../styles/App.module.css'; 
import huiStyles from '../styles/Button.module.css';

const HomePage = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    categories,
    isLoading,
    error
  } = useProductsLogic();

  if (isLoading) return <h2 className={styles.statusMessage}>Загрузка товаров...</h2>;
  if (error) return <h2 className={styles.statusMessage}>Ошибка при загрузке</h2>;

  return (  
    <div>
      <div className={styles.searchWrapper}>
        <input 
          type='text' 
          placeholder='Поиск по названию...' 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <section>
        <div>
          <h2 className={styles.sectionTitle}>Товары</h2>
          <div className={styles.categoriesWrapper}>
            {categories.map((category) => (
              <button
                className={`${huiStyles.myButton} ${selectedCategory === category ? huiStyles.activeButton : ''}`}
                key={category}
                onClick={() => setSelectedCategory(category)} 
              >
                {category === 'all' ? 'Все' : category}
              </button>
            ))}
          </div>
        </div> 

        <div className={styles.productsGrid}>
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <CardProduct key={item.id} product={item} />
            ))
          ) : (
            <p className={styles.emptyState}>
              Ничего не найдено 
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;