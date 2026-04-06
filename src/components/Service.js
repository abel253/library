import React from 'react';
import { Link } from 'react-router-dom';
import './Service.css';

const Service = () => {
  return (
    <div className="physical-service-page">
      {/* 1. Hero Section - Focus on Physical Building */}
      <header className="phys-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="phys-badge">On-Campus Services</span>
            <h1>Physical Library <span className="gold-text">Circulation</span></h1>
            <p>Your guide to navigating the shelves and accessing resources at the Mekdela Amba University Library building.</p>
          </div>
        </div>
      </header>

      <div className="container">
        {/* 2. The Physical Borrowing Journey (Step-by-Step) */}
        <section className="journey-section">
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
        {/* 4. Desk Services (Physical Return & Fine Payment) */}
        <section className="desk-services">
          <div className="desk-card">
            <div className="desk-icon">📥</div>
            <div className="desk-text">
              <h4>Physical Returns</h4>
              <p>All borrowed books must be returned directly to the <strong>Return Counter</strong> at the main entrance. Do not leave books on tables.</p>
            </div>
          </div>

          <div className="desk-card">
            <div className="desk-icon">💸</div>
            <div className="desk-text">
              <h4>Fine Payment at Counter</h4>
              <p>Overdue fines must be settled in person at the library finance office before you can borrow new resources.</p>
            </div>
          </div>
        </section>

        {/* 5. Back to Search */}
        <div className="phys-footer">
          <Link to="/public-search" className="btn-search-phys">Start Your Search Now</Link>
          <Link to="/" className="btn-home-phys">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Service;