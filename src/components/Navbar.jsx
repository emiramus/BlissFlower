import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar" data-testid="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <span className="logo-icon">🌸</span>
            <span className="logo-text">BlissFlower</span>
            <span className="logo-tag">Luxury Gifts</span>
          </Link>
        </div>
        <ul className="nav-menu">
          <li><Link to="/" data-testid="nav-home">Home</Link></li>
          <li><Link to="/products" data-testid="nav-products">Shop</Link></li>
          <li><Link to="/contact" data-testid="nav-contact">Contact</Link></li>
          {!isLoggedIn ? (
            <>
              <li><Link to="/login" data-testid="nav-login">Login</Link></li>
              <li><Link to="/register" data-testid="nav-register">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/dashboard" data-testid="nav-dashboard">Dashboard</Link></li>
              <li><Link to="/create-bouquet" className="create-link">Create Bouquet</Link></li>
              <li><button onClick={handleLogout} className="logout-btn" data-testid="logout-btn">Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;