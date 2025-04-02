import React from 'react';
import NewsletterSignup from '../components/NewsletterSignup';

// TODO: FR-10 - Add detailed history of Café Fausse
// TODO: FR-11 - Include biographies of founders Chef Antonio Rossi and Maria Lopez

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      
      {/* TODO: Add restaurant history section as described in FR-10 */}
      <section className="history-section">
        <h2>Our Story</h2>
        {/* TODO: Include founding story from 2010 by Chef Antonio Rossi and Maria Lopez */}
      </section>
      
      {/* TODO: Add founder bios section as described in FR-11 */}
      <section className="founders-section">
        <h2>Meet Our Founders</h2>
        
        {/* TODO: Add Chef Antonio Rossi bio and photo */}
        <div className="founder-card">
          <h3>Chef Antonio Rossi</h3>
          {/* TODO: Add profile image and bio text */}
        </div>
        
        {/* TODO: Add Maria Lopez bio and photo */}
        <div className="founder-card">
          <h3>Maria Lopez</h3>
          {/* TODO: Add profile image and bio text */}
        </div>
      </section>
      
      {/* TODO: Add section on restaurant's commitment to quality ingredients */}
      <section className="commitment-section">
        <h2>Our Commitment</h2>
        {/* TODO: Add content about locally sourced ingredients and dining experience */}
      </section>
      
      {/* Newsletter signup component for visitor engagement */}
      <div className="newsletter-container">
        <NewsletterSignup className="about-newsletter" />
      </div>
    </div>
  );
};

export default AboutPage;