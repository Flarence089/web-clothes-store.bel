import React from 'react'
import styles from '../App.module.css'
import type { IProducts } from '../assets/types/types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import CardProduct from '../СardProduct'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const fetchProducts = async () => {
  const response = await axios.get<IProducts[]>('https://fakestoreapi.com/products')
  return response.data
}

const HomePage = () => {
  
  const [searchQuery,setSearchQuery] = useState('')
  const [selectedCategory,setSelectedCategory] = useState('all')
  const navigate = useNavigate()

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  if (isLoading) return <h2 style={{ textAlign: 'center' }}>Загрузка товаров...</h2>
  if (error) return <h2 style={{ textAlign: 'center' }}>Ошибка при загрузке</h2>

  

  const filteredProducts = products?.filter((item) => {
  const matchSearch = !searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
  const matchCategory = selectedCategory === 'all' || item.category === selectedCategory
  return matchSearch && matchCategory;
});

  const categories = products
  ? ['all',...new Set(products.map((item) => item.category))]
  : ['all']

  return (  
    <div>
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <h1>белорусский ресейл</h1>
        
        <input 
          type='text' 
          placeholder='Поиск по названию...' 
          style={{ width: '80%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

      </div>

      <section>
        <div>
          <h2 style={{ marginLeft: 130 }}>Товары</h2>
          <div style={{ display: 'flex', justifyContent: 'flex-end' ,marginRight:'130px'}}>
              <button style={{ marginBottom: '20px' }} onClick={() => navigate('/favorites')}>
                     Избранное
              </button>
          </div>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)} 
      style={{
        padding: '8px 16px',
        borderRadius: '20px',
        border: '1px solid gray',
        backgroundColor: selectedCategory === category ? 'black' : 'white',
        color: selectedCategory === category ? 'white' : 'black',
        cursor: 'pointer',
        textTransform: 'capitalize',
        transition: 'all 0.2s ease' 
      }}
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
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888' }}>
              Ничего не найдено 
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
export default HomePage