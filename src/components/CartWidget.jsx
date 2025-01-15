// src/components/CartWidget.jsx
import React from 'react';

const CartWidget = () => {
  return (
    <div className="cart-widget">
      <i className="fas fa-shopping-cart"></i> {/* Ícono del carrito */}
      <div className="cart-count">5</div> {/* Número hardcodeado */}
    </div>
  );
};

export default CartWidget;
