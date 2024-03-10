import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/Components/Navbar/Navbar';
import ProductCard from './Components/ProductCard/ProductCard';
import PageAdmin from './Components/PageAdmin/PageAdmin';
import Footer from './Components/Footer/Footer';
import Offer from './Components/Offer/Offer';


function App() {//app рендерит страницу из компонентов
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/admin" element={<PageAdmin />} />{/*страница администратора*/}
        
      </Routes>
    </Router>
  );//Routes используются вместо Switch в этой версии для настройки маршрутизации
}

function Home() {// страница пользователя
  return (
    <div>
      <div>
        <Navbar />
        <ProductCard />{/*ProductCard отображение карточки товара*/}
      </div>
        <Footer />
    </div>
  );
}

export default App;
 