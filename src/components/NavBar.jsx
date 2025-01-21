import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo-link">
          <span>Hot Wheels</span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/" className="navbar-button">Inicio</Link></li>
        <li><Link to="/category/4" className="navbar-button">Nuevos productos</Link></li>
        <li><Link to="/category/5" className="navbar-button">Destacados</Link></li> {}
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
