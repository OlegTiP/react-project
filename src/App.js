import logo from './logo.svg';
import React, { useState } from 'react';

import { Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';
import { Route } from 'react-router';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
          {/* в пути указываем адрес в урл после главной, а в element нужную страницу */}
          {/* чтобы отобразить страницу, не указанную в списке роутов, указать в пути * */}
        </Routes>

        {/* <Home/> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
