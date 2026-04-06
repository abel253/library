import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
   const [stats, setStats] = useState({ students: 0, books: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost/library/get_stats.php');
        const data = await response.json();
        
        setStats({
          students: data.studentCount,
          books: data.bookCount
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div >
      {/* 1. MODERN HERO SECTION */}
      <header className="home-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="animate-reveal">
            Knowledge is the <br/> 
            <span className="gold-text">Gateway to the Future</span>
          </h1>
          <p className="animate-fade-in">
            The official heart of academic excellence at Mekdela Amba University. 
            Explore thousands of resources with ease, precision, and global access.
          </p>
          <div className="hero-btns animate-fade-in">
        <Link to="/public-search" className="main-btn">Explore Books Now</Link>
            
            <Link to="/services" className="secondary-btn">Explore Services</Link>
          </div>
        </div>
      </header>

      {/* 2. FLOATING STATS SECTION */}
      <section className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{stats.books}+</h3>
            <p>Academic Books</p>
          </div>
        </div>
        <div className="stat-card gold-accent">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <h3><h3>{stats.students}+</h3> </h3>
            <p>Active Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌐</div>
          <div className="stat-info">
            <h3>24/7</h3>
            <p>Digital Access</p>
          </div>
        </div>
      </section>

      {/* 3. PREMIUM SERVICES SECTION */}
      <section className="services-section">
        <div className="section-header">
            <span className="badge">Our Services</span>
            <h2>Digital & Physical Support</h2>
            <div className="underline"></div>
        </div>
          <div className="phys-section-title">
            <h2>The Borrowing Journey</h2>
            <p>From finding the shelf to the circulation desk.</p>
          </div>
          
          <div className="journey-grid">
            <div className="journey-card">
              <div className="j-number">01</div>
              <div className="j-icon">📍</div>
              <h4>Locate on Shelf</h4>
              <p>Find the book's <strong>Shelf Number</strong> from our search terminals. Use the floor guide below to find the exact row.</p>
            </div>

            <div className="journey-card">
              <div className="j-number">02</div>
              <div className="j-icon">🎟️</div>
              <h4>Present MAU ID</h4>
              <p>Take the book to the <strong>Circulation Desk</strong>. You must present your valid University Student/Staff ID card.</p>
            </div>

            <div className="journey-card">
              <div className="j-number">03</div>
              <div className="j-icon">✍️</div>
              <h4>Physical Signature</h4>
              <p>The librarian will scan the book and may require a physical signature in the circulation register for verification.</p>
            </div>
          </div>
         
        </section>
       
    </div>
  );
};

export default Home;