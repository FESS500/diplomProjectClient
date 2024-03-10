import React, { useState, useEffect } from 'react';
import productCardStyles from './productCard.module.css';

function ProductCard() {
  const [data, setData] = useState([]);//создается состояние с именем data которое будет хранить массив данных(сначала он будет пустой)

  useEffect(() => {
    fetchData(); // Вызываем функцию fetchData при монтировании компонента
  }, []); // Пустой массив указывает что useEffect выполнится только при монтировании компонента

  const fetchData = () => {//отправляет запрос на сервер, получает ответ и устанавливает полученное в data с помощью setData
    fetch('http://localhost:3001')//get запрос 
      .then(response => response.json())//считывает содержимое ответа сервера в формате json
      .then(data => {//если выполнилась предыдущая функция то выполняется дальше
        setData(data);//принимает данные json и передает в data чтобы отобразить их на странице
      })
      .catch(error => {
        console.error('Ошибка получения данных из сервера:', error);
      });
  };
  
  return (
    <div className={productCardStyles.container}>
      {data.map((item) => (//мапинг массива полученного в data
        <div key={item.id} className={productCardStyles.wrapper}>{/*key уникальный ключ товара*/}
          <div className={productCardStyles.image}>
            {/* Картинка товара */}
            <img className={productCardStyles.imageProduct} src={`http://localhost:3001/${item.image}`} alt={item.titleProduct} />{/*значение берется из массива item*/}


          </div>
          <div className={productCardStyles.overview}>
            {/* Обертка описания товара */}
            <div className={productCardStyles.titleProduct}>{item.titleProduct}</div>
            {/* Название товара */}
            <div className={productCardStyles.description}>{item.overview}</div>
            {/* Описание товара */}
            <div className={productCardStyles.price}>₽ {item.price}</div>
            {/* Цена товара */}
            <div className={productCardStyles.divButton}>
              <button className={productCardStyles.avability}>В наличии:{item.avability} </button>
            </div>
          </div>
          
            {/* Наличие заказа */}
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
