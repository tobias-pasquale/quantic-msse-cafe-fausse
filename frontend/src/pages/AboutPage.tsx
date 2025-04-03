import React from 'react';
import NewsletterSignup from '../components/NewsletterSignup';

// TODO: FR-10 - Add detailed history of Café Fausse
// TODO: FR-11 - Include biographies of founders Chef Antonio Rossi and Maria Lopez

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>

      <section className="history-section">
        <h2>Our Story</h2>
       
        <p>Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional Italian flavors with modern culinary innovation. Our mission is to provide an unforgettable dining experience that reflects both quality and creativity.</p>
      </section>
      
      <section className="founders-section">
        <h2>Meet Our Founders</h2>  

        <div className="founder-card">
          <h3>Chef Antonio Rossi</h3>
          
          <img src="/images/chef-antonio.jpg" alt="Chef Antonio Rossi" className="founder-image"/>

          <p>Born and raised in Florence, Italy, Chef Antonio Rossi discovered his passion for cooking in his family’s bustling kitchen, where traditional recipes were passed down through generations. After honing his skills at the prestigious Culinary Institute of Florence, he trained under renowned chefs across Italy and France, mastering both classical techniques and contemporary culinary artistry before moving to Washington, DC in 2008.</p>

          <p>His menu fuses time-honored flavors with unexpected twists, earning Café Fausse a reputation as a must-visit destination for food lovers. Dedicated to excellence, Chef Rossi continues to push boundaries, sourcing the finest ingredients and crafting dishes that surprise and delight. Whether it’s a modern take on a classic risotto or an artfully plated handmade pasta, his creations reflect his belief that great food is both an experience and an expression of passion.</p>
        </div>
        
        <div className="founder-card">
          <h3>Maria Lopez</h3>

          <img src="/images/maria-lopez.jpg" alt="Maria Lopez" className="founder-image"/>
          
          <p>A passionate entrepreneur with a deep appreciation for culinary artistry, Maria Lopez has spent her career curating dining experiences that blend tradition with innovation. Raised in a family that celebrated food as the heart of every gathering, she developed an early love for hospitality and the magic of a well-prepared meal. With a background in restaurant management and a keen eye for design, her expertise in crafting warm, inviting atmospheres and her commitment to impeccable service have made Café Fausse not just a restaurant, but a destinati</p>

          <p>Maria believes that dining is more than just eating—it’s about storytelling, connection, and creativity. From sourcing the finest ingredients to curating a menu that surprises and delights, she ensures that every guest at Café Fausse enjoys an unforgettable experience. Her dedication to hospitality and innovation continues to set the restaurant apart, making it a celebrated gem in the culinary world.</p>
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