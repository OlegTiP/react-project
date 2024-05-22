import logo from './logo.svg';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { Route } from 'react-router';
import { decrement, increment } from './redux/slices/filterSlice';

import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();


  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">

<button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>

      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          {/* <div className="container"> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={ <Cart />} />
              <Route path="*" element={ <NotFound />} />
              {/* в пути указываем адрес в урл после главной, а в element нужную страницу */}
              {/* чтобы отобразить страницу, не указанную в списке роутов, указать в пути * */}
            </Routes>
  
            {/* <Home/> */}
          {/* </div> */}
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
