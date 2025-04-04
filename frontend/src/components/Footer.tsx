import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup';
import '../css/Footer.css';

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
        
        <div className="footer-section newsletter-section">
          <h3>Newsletter</h3>
          <p>Subscribe to receive updates on special events and promotions</p>
          <div className="newsletter-container">
            <NewsletterSignup footerMode={true} className="home-newsletter" />
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