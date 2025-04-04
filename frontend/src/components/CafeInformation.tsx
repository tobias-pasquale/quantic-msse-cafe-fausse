import React from 'react';

export const ContactInfo: React.FC = () => (
  <div className="contact-info">
    <h3>Café Fausse</h3>
    <p className="address">1234 Culinary Ave, Suite 100, Washington, DC 20002</p>
    <p className="phone">(202) 555-4567</p>
    <p className="email">info@cafefausse.com</p>
  </div>
);

export const HoursInfo: React.FC = () => (
  <div className="hours-info">
    <h3>Hours</h3>
    <p>Monday–Saturday: 5:00 PM – 11:00 PM</p>
    <p>Sunday: 5:00 PM – 9:00 PM</p>
  </div>
);

