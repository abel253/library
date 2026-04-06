// components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import mekdela from '../assets/mau.jpg';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="global-nav">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <img src={mekdela} alt="MAU Logo" className="brand-logo" />
          <div className="brand-text">
            <span className="uni-name">Mekdela Amba University</span>
            <span className="system-name">Library Circulation System</span>
          </div>
        </Link>
<>
        <ul className="nav-links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link></li>
          <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link></li>
         <li><Link to="/public-search">Search Books</Link></li> 
        </ul>

        <div className="nav-actions">
          <Link to="/login" className="login-btn">Sign In</Link>
          <Link to="/signup" className="signup-btn">Get Started</Link>
        </div>
        </>
      </div>
    </nav>
  );
};

export default Navbar;