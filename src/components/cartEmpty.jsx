import React from "react";
import { Link, link } from 'react-router-dom';
// import cartEmptyImg from '../../public/img/empty-cart.png'

const CartEmpty = () => {
   return (
      <div class="content">
        <div class="container container--cart">
          <div class="cart cart--empty">
            <h2>Корзина пустая <icon>😕</icon></h2>
            <p>
              Вероятней всего, вы ещё не заказывали пиццу<br />
              Для того, чтобы заказать пиццу, перейди на главную страницу
            </p>
            <img src="/img/empty-cart.png" />
            <Link to="/" class="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </div>
      </div>
   </div>
   )
}

export default CartEmpty;