
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import FavoritePage from './pages/FavoritePage';
import Header from './Header'; 
import CartPage from './pages/CartPage';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path='/favorites' element={<FavoritePage />} />
        <Route path = '/cart' element={<CartPage/>}/>
      </Routes>
    </>
  );
};

export default App;