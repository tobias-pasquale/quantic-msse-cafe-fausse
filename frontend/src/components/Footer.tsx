import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Café Fausse</h3>
          <p>123 Café Street</p>
          <p>City, State 12345</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@cafefausse.com</p>
        </div>
        
        <div className="footer-section">
          <h3>Hours</h3>
          <p>Monday - Friday: 7:00 AM - 8:00 PM</p>
          <p>Saturday - Sunday: 8:00 AM - 9:00 PM</p>
        </div>
        
        <div className="footer-section">
          <h3>Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe to receive updates on special events and promotions</p>
          <form className="footer-newsletter">
            <input type="email" placeholder="Your Email Address" required />
            <button type="submit">Subscribe</button>
          </form>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Café Fausse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;