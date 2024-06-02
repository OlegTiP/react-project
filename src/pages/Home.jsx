import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { SearchContext } from '../App';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const { items, status } = useSelector(state => state.pizza);
  const { searchValue } = React.useContext(SearchContext);
   

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  // запрос данных с сервера c помощью axiox
  const getPizzas = async () => {

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({
      sortBy,
      order, 
      category,
      search,
      currentPage,
    }))
  };

  useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status == 'error' ? (<div className="container"> 
          <h2>Произошла ошабка загрузки</h2>
          <p>Попробуйте сделать заказ позже</p>
        </div>) : (<div className="content__items"> {status == 'loading' ? skeletons : pizzas} </div>)
      }
      
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
