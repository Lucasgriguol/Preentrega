import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchItemDetails = async (itemId) => {
    const allItems = [
      { id: 1, name: 'Toyota Supra', category: '1', price: 2000, description: 'El legendario Toyota Supra, con un diseño aerodinámico y un potente motor que lo convierte en un ícono de velocidad. Un modelo altamente apreciado por los fanáticos de los autos deportivos.', image: '/images/moderno supra.webp' },
      { id: 2, name: 'Copo Camaro', category: '2', price: 3000, description: 'El Chevrolet Camaro de la vieja escuela, con una estética clásica y un motor rudo, perfecto para los amantes de los muscle cars. Este modelo celebra la herencia del Camaro.', image: '/images/clasico copo camaro.webp' },
      { id: 3, name: 'Dodge Charger Hellcat', category: '1', price: 2500, description: 'Un potente Dodge Charger Hellcat con motor V8, capaz de alcanzar altas velocidades en segundos. Su apariencia agresiva y su rendimiento lo convierten en una leyenda moderna.', image: '/images/moderno charger.webp' },
      { id: 4, name: 'Grand Cross', category: '3', price: 4000, description: 'Edición especial, un Hot Wheel único con detalles dorados y una apariencia exclusiva, ideal para coleccionistas. Este vehículo es un homenaje a la elegancia de los autos de lujo.', image: '/images/especial cross.webp' },
      { id: 5, name: 'Mclaren P1', category: '1', price: 3000, description: 'El McLaren P1, una obra maestra de ingeniería, famoso por su velocidad y diseño futurista. Este modelo híbrido combina tecnología avanzada con un rendimiento inigualable.', image: '/images/moderno mclaren p1.webp' },
      { id: 6, name: 'Dodge Viper', category: '2', price: 3500, description: 'Un automóvil estadounidense clásico con una apariencia impresionante y un motor V10 que sigue siendo admirado por su potencia. El Dodge Viper es un verdadero ícono de los deportivos americanos.', image: '/images/clasico viper.webp' },
      { id: 7, name: 'Speed Driver', category: '3', price: 5000, description: 'Edición especial con llantas mejoradas y un diseño único, ideal para quienes buscan velocidad en cada giro. Este Hot Wheel es para los amantes de la alta velocidad y el diseño innovador.', image: '/images/especial driver.webp' },
      { id: 8, name: 'El Viento', category: '3', price: 4000, description: 'Un Hot Wheel de edición especial, con un diseño aerodinámico y un aspecto futurista que captura la esencia de la velocidad. Perfecto para quienes buscan algo único y exclusivo.', image: '/images/especial el viento.webp' },
      { id: 9, name: 'Honda Civic Si', category: '1', price: 2000, description: 'El Honda Civic Si, un deportivo compacto con gran rendimiento, que combina eficiencia y estilo. Este modelo es ideal para quienes buscan un balance entre rendimiento y practicidad.', image: '/images/moderno civic.webp' },
      { id: 10, name: 'Layin Lowrider', category: '2', price: 3000, description: 'Un clásico lowrider, con detalles finos y un diseño único que representa la cultura automovilística californiana. Este vehículo es un homenaje a los autos personalizados y la cultura del bajo perfil.', image: '/images/clasico lowrider.webp' },
      { id: 11, name: 'Tesla Model V', category: '1', price: 3500, description: 'El Tesla Model V, el futuro del automóvil eléctrico, con un diseño minimalista y tecnología avanzada. Un modelo sin emisiones que representa la transición hacia el futuro de la automoción.', image: '/images/moderno tesla.webp' },
      { id: 12, name: 'Slide Kick', category: '3', price: 4000, description: 'Una edición limitada con detalles espectaculares, diseñada para los amantes de los autos personalizados y únicos. Este Hot Wheel presenta una estética innovadora para los coleccionistas más exigentes.', image: '/images/especial kick.webp' },
      { id: 13, name: 'Ford Ranger Raptor', category: '1', price: 3000, description: 'El Ford Ranger Raptor, un camión robusto para los que buscan un rendimiento todoterreno impresionante. Perfecto para aventuras fuera de carretera y condiciones extremas.', image: '/images/moderno raptor.webp' },
      { id: 14, name: 'Ford Escort R52000', category: '2', price: 3200, description: 'El clásico Ford Escort R52000, una máquina robusta con un aspecto rudo que sigue siendo un clásico de los rallys. Este modelo ofrece un rendimiento increíble en terrenos difíciles.', image: '/images/clasico escort.webp' },
      { id: 15, name: 'Brick and Motor', category: '4', price: 4500, description: 'Edición especial diseñada con detalles industriales, una combinación de arte y rendimiento. Este modelo es perfecto para quienes buscan algo diferente en el mundo de Hot Wheels.', image: '/images/especial motor.webp' },
      { id: 16, name: 'Custom Small Block', category: '4', price: 4000, description: 'Una edición muy especial con un motor pequeño pero poderoso, para los fanáticos de las personalizaciones únicas. Un modelo ideal para los amantes de los Hot Wheels con detalles exclusivos.', image: '/images/especial small.webp' },
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        const foundItem = allItems.find(item => item.id === parseInt(itemId));
        resolve(foundItem);
      }, 1000);
    });
  };

  useEffect(() => {
    const loadItemDetails = async () => {
      setLoading(true);
      const data = await fetchItemDetails(id);
      setItem(data);
      setLoading(false);
    };

    loadItemDetails();
  }, [id]);

  return (
    <div className="item-detail-container">
      {loading ? (
        <p>Cargando detalles del producto...</p>
      ) : (
        item && (
          <div className="product-detail">
            <img src={item.image} alt={item.name} className="product-detail-image"/>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <h3>Precio: ${item.price}</h3>
            <a href={`/`} className="buy-btn">Comprar</a>
          </div>
        )
      )}
    </div>
  );
};

export default ItemDetailContainer;
