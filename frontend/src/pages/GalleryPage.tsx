import React from 'react';

// TODO: FR-13 - Implement a lightbox feature for enlarged image viewing
// TODO: FR-14 - Display restaurant awards and customer testimonials
// TODO: FR-12 - Add high-resolution images of restaurant interior, dishes, and events

const GalleryPage: React.FC = () => {
  return (
    <div className="gallery-page">
      <h1>Gallery</h1>
      
      {/* TODO: Implement grid layout for gallery images */}
      <div className="gallery-grid">
        {/* TODO: Add image components with lightbox functionality */}
      </div>
    
      <section className="awards-section">
        <h2>Our Awards</h2>
          <ul>
            <li>Restaurant of the Year - 2023</li>
            <li>Best Fine Dining Experience - Foodie Magazine, 2023</li>
            <li>Culinary Excellence Award - 2022</li>
          </ul>
      </section>
      
      {/* TODO: Add Customer Reviews Section */}
      <section className="reviews-section">
        <h2>Customer Testimonials</h2>
          <ul>
            <li>“Exceptional ambiance and unforgettable flavors.” – Gourmet Review</li>
            <li> “A must-visit restaurant for food enthusiasts.” – The Daily Bite</li>
          </ul>
      </section>
    </div>
  );
};

export default GalleryPage;