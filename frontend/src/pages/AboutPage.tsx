import React from 'react';
import NewsletterSignup from '../components/NewsletterSignup';
import '../css/AboutPage.css';

// Import images from src/assets folder
import chefRossiImg from '../assets/ChefRossi.jpg';
import mariaLopezImg from '../assets/MariaLopez.jpg';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      
      {/* FR-10: Detailed History */}
      <section className="history-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional Italian flavors with modern culinary innovation. Our mission is to provide an unforgettable dining experience that reflects both quality and creativity. Over the years, we have become synonymous with excellence, captivating the palates of food enthusiasts and critics alike.
        </p>
      </section>
      
      {/* FR-11: Founder Bios */}
      <section className="founders-section">
        <h2>Meet Our Founders</h2>
        <div className="founder-card">
          <img src={chefRossiImg} alt="Chef Antonio Rossi" className="founder-image" />
          <div className="founder-info">
            <h3>Chef Antonio Rossi</h3>
            <p>
              Chef Antonio Rossi is a visionary culinary artist who has redefined Italian cuisine by infusing time-honored recipes with modern techniques. His passion and creativity continue to inspire our menu and dining experiences.
            </p>
          </div>
        </div>
        
        <div className="founder-card">
          <img src={mariaLopezImg} alt="Maria Lopez" className="founder-image" />
          <div className="founder-info">
            <h3>Maria Lopez</h3>
            <p>
              Restaurateur Maria Lopez brings her exceptional business acumen and commitment to quality to Café Fausse. Her dedication to sourcing the freshest, locally grown ingredients ensures that every dish is served at its very best.
            </p>
          </div>
        </div>
      </section>
      
      {/* Commitment Section */}
      <section className="commitment-section">
        <h2>Our Commitment</h2>
        <p>
          At Café Fausse, we are devoted to delivering unforgettable dining experiences through excellent food, exceptional service, and a commitment to locally sourced ingredients. We take pride in every dish, ensuring each plate reflects our passion for culinary art.
        </p>
      </section>
      
      {/* Newsletter Signup */}
      <div className="newsletter-container">
        <NewsletterSignup className="about-newsletter" />
      </div>
    </div>
  );
};

export default AboutPage;