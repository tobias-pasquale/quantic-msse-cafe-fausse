import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup';
import { ContactInfo, HoursInfo } from './CafeInformation';
import '../css/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <ContactInfo />
        <HoursInfo />
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