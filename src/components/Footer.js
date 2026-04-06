// components/Footer.js
import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="global-footer">
      <div className="footer-container">
       
        {/* የዩኒቨርሲቲው መረጃ */}
        <div className="footer-brand">
          <h3>Mekdela Amba University</h3>
          <p>The official library circulation system dedicated to academic excellence and research innovation.</p>
        </div>

        {/* ፈጣን ሊንኮች */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
          </ul>
        </div>

        {/* የመገናኛ መረጃ */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>📍 Tulu Awulia , Ethiopia</p>
          <p>📧 library@mkau.edu.et</p>
          <p>📞 +251 11 XXX XXXX</p>
        </div>
      </div>

      {/* የግርጌ ማስታወሻ */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mekdela Amba University Library System | Developed by cs and SFE department students</p>
      </div>
    </footer>
  );
};

export default Footer;