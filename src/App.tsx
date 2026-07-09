import React from 'react'
import styles from './App.module.css'
import type { IProducts } from './assets/types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const fetchProducts = async () => {
  const response = await axios.get<IProducts[]>('https://fakestoreapi.com/products')
  return response.data
}

const App = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  if (isLoading) return <h2 style={{ textAlign: 'center' }}>Загрузка товаров...</h2>
  if (error) return <h2 style={{ textAlign: 'center' }}>Ошибка при загрузке</h2>

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>вб монстр шмот.бел</h1>
        <input type='text' placeholder='Поиск...' style={{ width: '80%' }} />
      </div>

      <section>
        <div>
          <h2 style={{ marginLeft: 130 }}>Товары</h2>
        </div> 

        <div className={styles.productsGrid}>
          {products?.map((item) => (
            <div key={item.id} className={styles.rect}>
              <p className ={styles.title}>{item.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App