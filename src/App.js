import logo from './logo.svg';
import React, {useState} from 'react'; 
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
// import pizzas from "./assets/pizzas.json";



function App() {

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    
    fetch('https://661d6b6498427bbbef01c82c.mockapi.io/items').then((res) => res.json())
    .then((arr) => {
      setItems(arr);
    })
  }, [])


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            {/* {Categories()} */}
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map(obj => <PizzaBlock key={obj.id} {...obj} /> )
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
