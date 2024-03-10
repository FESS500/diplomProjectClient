import React from 'react';
import Navbar from '../Navbar/Navbar';
import Carusel from '../Carusel/Carusel';



function Offer() {//app рендерит страницу из компонентов
  
    return (
      <div>
        <Navbar />
        <Carusel className={"text-center"}/>
      </div>
    );//Routes используются вместо Switch в этой версии для настройки маршрутизации
  }

  export default Offer;