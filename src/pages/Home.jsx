import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = ( {searchValue} ) => {

   
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const [categoryID, setCategoryID] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  // запрос данных с сервера
  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryID > 0 ? `category=${categoryID}` : '';
    
    fetch(
      `https://661d6b6498427bbbef01c82c.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )

    .then((res) => res.json())
    .then((arr) => {
      setItems(arr);
      setIsLoading(false);
    })
    window.scrollTo(0, 0)
  }, [categoryID, sortType])

  const pizzas = items.filter(obj => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }

    return false;
  }).map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

   return (
      <div className="container">
      <div className="content__top">
            <Categories value={categoryID} onChangeCategory={(i) => setCategoryID(i)} />
            <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoading 
              ? skeletons 
              : pizzas
            }
            {/* {
              items.map(obj => <Skeleton key={obj.id} {...obj} /> )
            } */}
            
          </div>
      </div>
   )
}
export default Home;