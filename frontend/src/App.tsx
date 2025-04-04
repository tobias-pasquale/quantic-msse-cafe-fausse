import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Page Components
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ReservationsPage from './pages/ReservationsPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import NotFoundPage from './pages/NotFoundPage';

// Layout Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Context Provider
import { AppProvider, useAppContext } from './context/AppContext';

// Notification Component
const Notification: React.FC<{
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: (id: string) => void;
}> = ({ id, message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button className="close-button" onClick={() => onClose(id)}>×</button>
    </div>
  );
};

// App Content Component (to use context hooks)
const AppContent: React.FC = () => {
  const { notifications, dismissNotification } = useAppContext();
  
  return (
    <div className="App">
      <Navigation />
      
      {/* Notifications display */}
      <div className="notifications-container">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={dismissNotification}
          />
        ))}
      </div>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          
          {/* Redirect any other path to home */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
