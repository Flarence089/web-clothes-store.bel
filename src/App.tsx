
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import FavoritePage from './pages/FavoritePage'



const App = () => {
    return(
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path='/favorites' element = {<FavoritePage/>}/>
    </Routes>
    )
}
export default App