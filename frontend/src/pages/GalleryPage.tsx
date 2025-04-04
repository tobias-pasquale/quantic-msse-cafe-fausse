import React, { useState } from 'react';
import '../css/GalleryPage.css';
import menuItemImg from '../assets/menu-item.jpg';
import specialEventImg from '../assets/gallery-special-event.jpg';
import ribeyeSteakImg from '../assets/gallery-ribeye-steak.jpg';
import cafeInteriorImg from '../assets/gallery-cafe-interior.jpg';

const GalleryPage: React.FC = () => {
  const images = [
    { src: menuItemImg, alt: 'Menu Item', id: 'img1' },
    { src: specialEventImg, alt: 'Special Event', id: 'img2' },
    { src: ribeyeSteakImg, alt: 'Ribeye Steak', id: 'img3' },
    { src: cafeInteriorImg, alt: 'Cafe Interior', id: 'img4' },
  ];
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const openLightbox = (src: string) => {
    setSelectedImage(src);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage('');
  };

  return (
    <div className="gallery-page">
      <h1>Gallery</h1>
      
      {/* Gallery Grid */}
      <div className="gallery-grid">
        {images.map((img) => (
          <div key={img.id} className="gallery-item" onClick={() => openLightbox(img.src)}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>
      
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <img src={selectedImage} alt="Expanded View" />
          </div>
        </div>
      )}

      {/* Awards Section */}
      <section className="awards-section">
        <h2>Our Awards</h2>
        <ul className="awards-list">
          <li>Culinary Excellence Award – 2022</li>
          <li>Restaurant of the Year – 2023</li>
          <li>Best Fine Dining Experience – Foodie Magazine, 2023</li>
        </ul>
      </section>
      
      {/* Customer Testimonials Section */}
      <section className="reviews-section">
        <h2>Customer Testimonials</h2>
        <div className="testimonial">
          <p>“Exceptional ambiance and unforgettable flavors.”</p>
          <span>– Gourmet Review</span>
        </div>
        <div className="testimonial">
          <p>“A must-visit restaurant for food enthusiasts.”</p>
          <span>– The Daily Bite</span>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;