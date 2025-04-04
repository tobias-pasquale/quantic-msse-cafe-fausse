import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NotFoundPage.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="home-link">Return to Home</Link>
    </div>
  );
};

export default NotFoundPage;