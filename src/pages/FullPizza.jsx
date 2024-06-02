import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState(null);  // Изначальное значение - null
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://661d6b6498427bbbef01c82c.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка данных');
      }
    }

    fetchPizza();
  }, [id]); 

  if (!pizza) {
    return <div>Загрузка...</div>; 
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} /> 
      <h2>{pizza.title}</h2> 
      <h3>{pizza.price} ₽</h3> 
    </div>
  );
}

export default FullPizza;
