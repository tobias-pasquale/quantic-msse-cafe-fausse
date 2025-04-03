import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSignup from '../components/NewsletterSignup';
import '../css/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* FR-1 - Display restaurant name prominently */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1>Café Fausse</h1>
          <p className="tagline">Fine dining with a modern twist</p>
          {/* No hero image provided, so we use a fallback background */}
        </div>
      </div>
      
      {/* FR-2 - Show contact information and hours */}
      <section className="info-section">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p className="address">1234 Culinary Ave, Suite 100, Washington, DC 20002</p>
          <p className="phone">(202) 555-4567</p>
        </div>
        <div className="hours-info">
          <h2>Hours</h2>
          <p>Monday–Saturday: 5:00PM – 11:00 PM</p>
          <p>Sunday: 5:00 PM – 9:00 PM</p>
        </div>
      </section>
      
      {/* FR-4 - Feature highlights with images */}
      <section className="highlights-section">
        <h2>Experience Café Fausse</h2>
        <div className="highlights-grid">
          <div className="highlight-item">
            <div className="highlight-image" id="menu-highlight">
              {/* TODO: Replace with featured menu item image */}
            </div>
            <div className="highlight-caption">Gourmet Menu</div>
          </div>
          <div className="highlight-item">
            <div className="highlight-image" id="ambiance-highlight">
              {/* TODO: Replace with ambiance image */}
            </div>
            <div className="highlight-caption">Elegant Ambiance</div>
          </div>
          <div className="highlight-item">
            <div className="highlight-image" id="chef-highlight">
              {/* TODO: Replace with chef spotlight image */}
            </div>
            <div className="highlight-caption">Chef’s Masterpieces</div>
          </div>
        </div>
      </section>
      
      {/* FR-4 - Provide navigation to main sections with visual elements */}
      <section className="quick-links">
        <h2>Explore Café Fausse</h2>
        <div className="links-grid">
          <Link to="/menu" className="quick-link">
            <div className="link-image menu-image">
              {/* TODO: Add menu image */}
            </div>
            <h3>Our Menu</h3>
          </Link>
          <Link to="/reservations" className="quick-link">
            <div className="link-image reservation-image">
              {/* TODO: Add reservation image */}
            </div>
            <h3>Make a Reservation</h3>
          </Link>
          <Link to="/gallery" className="quick-link">
            <div className="link-image gallery-image">
              {/* TODO: Add gallery image */}
            </div>
            <h3>Gallery</h3>
          </Link>
        </div>
      </section>
      
      {/* Newsletter signup component */}
      <section className="newsletter-section">
        <NewsletterSignup className="home-newsletter" />
      </section>
    </div>
  );
};

export default HomePage;