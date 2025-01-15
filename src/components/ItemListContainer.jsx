import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemListContainer = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const allItems = [
    { id: 1, name: 'Toyota Supra', category: '1', price: 2000, image: '/images/moderno supra.webp' },
    { id: 2, name: 'Copo Camaro', category: '2', price: 3000, image: '/images/clasico copo camaro.webp' },
    { id: 3, name: 'Dodge Charger Hellcat', category: '1', price: 2000, image: '/images/moderno charger.webp' },
    { id: 4, name: 'Grand Cross', category: '3', price: 4000, image: '/images/especial cross.webp' },
    { id: 5, name: 'McLaren P1', category: '1', price: 2000, image: '/images/moderno mclaren p1.webp' },
    { id: 6, name: 'Dodge Viper', category: '2', price: 3000, image: '/images/clasico viper.webp' },
    { id: 7, name: 'Speed Driver', category: '3', price: 4000, image: '/images/especial driver.webp' },
    { id: 8, name: 'El Viento', category: '3', price: 4000, image: '/images/especial el viento.webp' },
    { id: 9, name: 'Honda Civic Si', category: '1', price: 2000, image: '/images/moderno civic.webp' },
    { id: 10, name: 'Layin Lowrider', category: '2', price: 3000, image: '/images/clasico lowrider.webp' },
    { id: 11, name: 'Tesla Model V', category: '1', price: 2000, image: '/images/moderno tesla.webp' },
    { id: 12, name: 'Slide Kick', category: '3', price: 4000, image: '/images/especial kick.webp' },
    { id: 13, name: 'Ford Ranger Raptor', category: '1', price: 2000, image: '/images/moderno raptor.webp' },
    { id: 14, name: 'Ford Escort R52000', category: '2', price: 3000, image: '/images/clasico escort.webp' },
    { id: 15, name: 'Brick and Motor', category: '3', price: 4000, image: '/images/especial motor.webp' },
    { id: 16, name: 'Custom Small Block', category: '3', price: 4000, image: '/images/especial small.webp' },
  ];

  const fetchItems = async (categoryId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredItems = categoryId
          ? allItems.filter(item => item.category === categoryId)
          : allItems;
        resolve(filteredItems);
      }, 1000);
    });
  };

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const data = await fetchItems(id);
      setItems(data);
      setLoading(false);
    };

    loadItems();
  }, [id]);

  return (
    <div className="container">
      <div className="welcome-message-container">
        <h1 className="welcome-message">¡Bienvenido a mi tienda de Hot Wheels!</h1>
      </div>

      <div className="product-cards-container">
        <h2>
          {id === '1' ? 'Modernos' : id === '2' ? 'Clásicos' : id === '3' ? 'Edición Especial' : 'Todos los productos'}
        </h2>

        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <div className="product-cards">
            {items.length === 0 ? (
              <p>No hay productos disponibles en esta categoría.</p>
            ) : (
              items.map(item => (
                <div key={item.id} className="product-card">
                  <img src={item.image} alt={item.name} className="product-image" />
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price}</p>
                  <a href={`/item/${item.id}`} className="buy-btn">Comprar</a>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
