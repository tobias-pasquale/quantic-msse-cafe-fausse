import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSignup from '../components/NewsletterSignup';

// TODO: FR-3 - Include high-quality images and maintain a consistent theme

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* TODO: FR-1 - Display restaurant name prominently with hero image */}
      <div className="hero-section">
        <h1>Café Fausse</h1>
        <p className="tagline">Fine dining with a modern twist</p>
        {/* TODO: Add high-resolution hero image */}
      </div>
      
      {/* TODO: FR-2 - Show contact information and hours */}
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
      
      {/* TODO: FR-4 - Feature highlights with images */}
      <section className="highlights-section">
        <h2>Experience Café Fausse</h2>
        <div className="highlights-grid">
          {/* TODO: Add featured menu items with images */}
          {/* TODO: Add restaurant ambiance image */}
          {/* TODO: Add chef spotlight image */}
        </div>
      </section>
      
      {/* TODO: FR-4 - Provide navigation to main sections with visual elements */}
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