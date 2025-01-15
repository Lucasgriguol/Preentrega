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
        <li><Link to="/category/1" className="navbar-button">Modernos</Link></li>
        <li><Link to="/category/2" className="navbar-button">Clásicos</Link></li>
        <li><Link to="/category/3" className="navbar-button">Edición Especial</Link></li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
