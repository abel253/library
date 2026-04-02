import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* 1. Navigation Bar */}
      <nav className="home-nav">
        <div className="nav-container">
          <div className="logo-section">
            <div className="mau-logo">MAU</div>
            <div className="logo-text">
              <span className="uni-title">Mekdela Amba University</span>
              <span className="lib-subtitle">Digital Library System</span>
            </div>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/search">Search Catalog</Link>
            <Link to="/login" className="login-link">Sign In</Link>
            <Link to="/signup" className="signup-btn">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="home-hero">
        <div className="hero-content">
          <h1 className="animate-fade-in">Knowledge is the Gateway to the Future</h1>
          <p>Welcome to the official library circulation system of Mekdela Amba University. Explore, borrow, and learn with ease.</p>
          <div className="hero-btns">
            <Link to="/search" className="main-btn">Search Books</Link>
            <Link to="/signup" className="secondary-btn">Create Account</Link>
          </div>
        </div>
      </header>

      {/* 3. Quick Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>4,260+</h3>
          <p>Total Books</p>
        </div>
        <div className="stat-card">
          <h3>1,500+</h3>
          <p>Active Members</p>
        </div>
        <div className="stat-card">
          <h3>24/7</h3>
          <p>Digital Access</p>
        </div>
      </section>

      {/* 4. Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="icon">📚</div>
            <h3>Book Borrowing</h3>
            <p>Easy checkout and return system for all academic books.</p>
          </div>
          <div className="service-card">
            <div className="icon">🔄</div>
            <h3>Online Renewal</h3>
            <p>Renew your borrowed items from the comfort of your home.</p>
          </div>
          <div className="service-card">
            <div className="icon">🖥️</div>
            <h3>E-Resources</h3>
            <p>Access journals, research papers, and digital archives.</p>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <p>&copy; 2024 Mekdela Amba University - Library Management System</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
            <a href="#">MAU Website</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;