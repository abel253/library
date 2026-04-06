import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
// Ensure you have these images in your assets or use the Unsplash links provided in CSS
import lib from '../assets/library7.avif'; 
import miss from '../assets/librarymis.png'
import visi from '../assets/libraryvisi.png'
const About = () => {
  return (
    <div className="about-page">
      {/* 1. Hero Header */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="badge">Established 2018</span>
          <h1>Excellence in <span className="gold-text">Knowledge</span></h1>
          <p>Discover the heart of Mekdela Amba University's academic research and digital innovation.</p>
        </div>
      </section>

      <div className="container">
        {/* 2. Mission & Vision Section */}
        <section className="mv-section">
          <div className="mv-grid">
            <div className="split-image">
              <div className="mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <img src={miss} alt="Library mission" />
              <p>To provide high-quality information resources, expert instructions, and innovative services that support the research and learning needs of the Mekdela Amba University community.</p>
            </div>
            <div className="mv-card glass">
              <div className="mv-icon">👁️</div>
              <h3>Our Vision</h3>
              <img src={visi} alt="Library vision" />
              <p>To be a premier digital academic library in Ethiopia, recognized globally for excellence in information delivery, research support, and preserving academic heritage.</p>
            </div>
       
          </div>
        </section>

        {/* 3. Image & Description Split Section */}
        <section className="about-split">
          <div className="split-image">
            <img src={lib} alt="Library Interior" />
          </div>
          <div className="split-text">
            <span className="section-tag">Library Impact</span>
            <h2>More Than Just <span className="green-text">Books</span></h2>
            <p>Our library serves as a dynamic hub for collaboration. With over 12,000 physical volumes and access to millions of digital journals, we empower students to transcend boundaries.</p>
            <div className="stats-mini">
              <div className="s-mini"><strong>2000</strong> <span>E-Journals</span></div>
              <div className="s-mini"><strong>24/7</strong> <span>Digital Access</span></div>
            </div>
          </div>
        </section>

        {/* 4. Core Values Section */}
        <section className="values-section">
          <h2 className="centered-h2">Our Core <span className="gold-text">Values</span></h2>
          <div className="values-grid">
            <div className="value-item">
              <h4>Integrity</h4>
              <p>Maintaining the highest standards of academic honesty and ethical resource management.</p>
            </div>
            <div className="value-item">
              <h4>Accessibility</h4>
              <p>Ensuring knowledge is available to every student, regardless of their location or department.</p>
            </div>
            <div className="value-item">
              <h4>Innovation</h4>
              <p>Continuously evolving with digital trends to provide the best research tools available.</p>
            </div>
          </div>
        </section>

        {/* 5. Call to Action */}
        <div className="about-footer-action">
          <Link to="/" className="back-btn">← Back to Home</Link>
          <Link to="/signup" className="join-btn">Join the Library Today</Link>
        </div>
      </div>
    </div>
  );
};

export default About;