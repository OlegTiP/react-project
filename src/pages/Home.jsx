import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {

   
  const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  // запрос данных с сервера
  React.useEffect(() => {
    
    fetch('https://661d6b6498427bbbef01c82c.mockapi.io/items').then((res) => res.json())
    .then((arr) => {
      setItems(arr);
      setIsLoading(false);
    })
  }, [])

   return (
      <>
      <div className="content__top">
            <Categories />
            {/* {Categories()} */}
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoading 
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) 
              : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            }
            {/* {
              items.map(obj => <Skeleton key={obj.id} {...obj} /> )
            } */}
            
          </div>
      </>
   )
}
export default Home;