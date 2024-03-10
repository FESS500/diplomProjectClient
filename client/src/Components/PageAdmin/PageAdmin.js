import React, { useState, useEffect } from 'react';
import pageAdminStyles from './PageAdmin.module.css';
import axios from 'axios';
import { Input, Button, Table } from 'reactstrap';


const PageAdmin = () => {//страница администратора
    //хранятся состояния свойств продуктов
    const [titleProduct, setTitleProduct] = useState('');
    const [overview, setOverview] = useState('');
    const [price, setPrice] = useState('');
    const [avability, setAvability] = useState('');
    const [image, setImage] = useState(null);//начальное значение null
    const [products, setProducts] = useState([]);//массив списка продуктов


    useEffect(() => {
        fetchProducts();//выполнение при монтировании компонента как в карточках товаров
    }, [])

    const fetchProducts = async () => {// отправка get запроса для получения списка продуктов
        try {
            const response = await axios.get('http://localhost:3001/');
            setProducts(response.data);//при получении ответа данные обновляются что приводит к перерисовке компонента
        } catch (error) {
            console.error('Ошибка при получении списка продуктов:', error);
        }
    };


    const handleProductTitle = (event) => {//для обновления состояния titleProduct после введения значения в поле
        setTitleProduct(event.target.value);//событие, поле и значение ввода
    };

    const handleOverview = (event) => {
        setOverview(event.target.value);
    };
    const handlePrice = (event) => {
        setPrice(event.target.value);
    };
    const handleAvability = (event) => {
        setAvability(event.target.value);
    };
    const handleImage = (event) => {
        setImage(event.target.files[0]);//событие, поле , файлы ввода, ноль это  выбранный файл пользователем
    };



    const handleSubmit = async (event) => {//обработка отправки формы при добавлении продукта
        event.preventDefault();//чтобы не было перезагрузки страницы при отправке
        //создаем новый объект FormData который используем для отправки данных формы и изображения
        const formData = new FormData();
        //добавляем новую пару ключ (имя поля для доступа на сервере):значение (поля) - в объект с типом контента multipart/form-data
        //чтобы можно было к названиям добавить и другой тип то есть изображения    
        formData.append('titleProduct', titleProduct);
        formData.append('overview', overview);
        formData.append('price', price);
        formData.append('avability', avability);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:3001/admin', formData);//

            if (response.status !== 200) {//если ответ 200
                throw new Error('Ошибка при отправке запроса');
            }

            console.log('Успешно добавлено:', response.data);

            
            fetchProducts();// После добавления продукта обновляется обображаемый список
        } catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);
        }
    };
    const handleDelete = async (productId) => {//удаление продукта по id используется Promise
        try {
            await axios.delete(`http://localhost:3001/admin/${productId}`);//код ожидает выполение удаления 
            //ключевое слово await ожидает выполнение запроса к серверу
            alert('Продукт успешно удален');
           
            fetchProducts(); // После удаления продукта обновляется список
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
            alert('Произошла ошибка при удалении продукта');
        }
    };

    const handleReplace = async (productId, updatedFields) => {//замена продукта по id используется Promise
        try {
            const response = await axios.put(`http://localhost:3001/admin/${productId}`, updatedFields);//updatedFields - обновленные данные только измененных полей
      
            if (response.status === 200) {
                alert('Продукт успешно заменен');
                fetchProducts(); // Обновляем список продуктов после успешной замены
            } else {
                throw new Error('Ошибка при замене продукта');
            }
        } catch (error) {
            console.error('Ошибка при замене продукта:', error);
            alert('Произошла ошибка при замене продукта');
        }
    };
    
    return (
        <div>
            <div className={pageAdminStyles.container}>
                <h1>Страница администратора магазина</h1>
                <h3>Добавление товара на сервис</h3>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="file"
                            name="image"
                            onChange={handleImage}
                        />Выберите файл для добавления изображения<br/>
                        <Input
                            type="text"
                            placeholder="Введите название продукта"
                            value={titleProduct}
                            onChange={handleProductTitle}
                        /><br/>
                        <Input
                            type="text"
                            placeholder="Введите описание продукта"
                            value={overview}
                            onChange={handleOverview}
                        /><br/>
                        <Input
                            type="text"
                            placeholder="Введите цену продукта"
                            value={price}
                            onChange={handlePrice}
                        /><br/>
                        <Input
                            type="text"
                            placeholder="Введите количество"
                            value={avability}
                            onChange={handleAvability}
                        /><br/>
                        
                        <Button color="secondary" type="submit">
                            Добавить продукт
                        </Button >
                    
                    </form>
                <h3>Список продуктов</h3>
                <div>
                    <Table className={pageAdminStyles.table} bordered hover>
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Цена</th>
                                <th>Наличие</th>
                                <th>Удаление и замена</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.titleProduct}</td>
                                    <td>{product.overview}</td>
                                    <td>{product.price}</td>
                                    <td>{product.avability}</td>
                                    <td>
                                            {/* Кнопка для удаления продукта */}
                                    <Button color="secondary" onClick={() => handleDelete(product.id)}>
                                        Удалить
                                    </Button>
                                    
                                    <Button color="secondary" onClick={() => handleReplace(product.id, { 
                                        titleProduct: titleProduct, 
                                        overview: overview,
                                        price: price,
                                        avability: avability
                                        })}
                                    >
                                        Заменить продукт
                                    </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default PageAdmin;
