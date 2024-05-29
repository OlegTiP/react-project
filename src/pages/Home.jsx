import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';
import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector(state => state.filter);
  // const sortType = useSelector(state => state.filter.sort.sortProperty);

  const { searchValue } = React.useContext(SearchContext);
   
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const [currentPage, setCurrentPage] = React.useState(1);
  // const [sortType, setSortType] = React.useState({
  //   name: 'популярности',
  //   sortProperty: 'rating',
  // });

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  // запрос данных с сервера
  React.useEffect(() => {
    setIsLoading(true);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    
    fetch(
      `https://661d6b6498427bbbef01c82c.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )

    .then((res) => res.json())
    .then((arr) => {
      setItems(arr);
      setIsLoading(false);
    })
    window.scrollTo(0, 0)
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

   return (
      <div className="container">
      <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory} />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoading 
              ? skeletons 
              : pizzas
            }
          </div>
          <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
   )
}
export default Home;