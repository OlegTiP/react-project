import React from "react";
import { Link } from 'react-router-dom';
import cartEmptyImg from '../../public/img/empty-cart.png'

const CartEmpty:React.FC = () => {
   return (
      <div className="content">
        <div className="container container--cart">
          <div className="cart cart--empty">
            <h2>Корзина пустая <span>😕</span></h2>
            <p>
              Вероятней всего, вы ещё не заказывали пиццу<br />
              Для того, чтобы заказать пиццу, перейди на главную страницу
            </p>
            <img src="/img/empty-cart.png" />
            <Link to="/" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </div>
      </div>
   </div>
   )
}

export default CartEmpty;