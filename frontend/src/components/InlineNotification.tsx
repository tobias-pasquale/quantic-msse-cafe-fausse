import React, { useState, useEffect } from 'react';
import '../css/InlineNotification.css';

type NotificationType = 'success' | 'error' | 'info';

interface InlineNotificationProps {
  message: string;
  type: NotificationType;
  duration?: number; // Auto-dismiss duration in ms, 0 for no auto-dismiss
  onDismiss?: () => void;
  showSymbol?: boolean; // Whether to show the ✓ or ✗ symbol
}

const InlineNotification: React.FC<InlineNotificationProps> = ({ 
  message, 
  type, 
  duration = 5000, 
  onDismiss,
  showSymbol = false
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Reset visibility when message changes
    setVisible(true);
    
    // Auto-dismiss after specified duration
    let timeoutId: NodeJS.Timeout | undefined;
    if (duration > 0) {
      timeoutId = setTimeout(() => {
        setVisible(false);
        if (onDismiss) onDismiss();
      }, duration);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [message, duration, onDismiss]);

  if (!visible || !message) return null;

  const handleClose = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  // Add symbol based on type
  const getSymbol = () => {
    if (!showSymbol) return '';
    
    switch(type) {
      case 'success':
        return '✓ ';
      case 'error':
        return '✗ ';
      case 'info':
        return 'ℹ ';
      default:
        return '';
    }
  };

  return (
    <div className={`inline-notification ${type}`} role="alert">
      <p>{getSymbol()}{message}</p>
      <button 
        className="close-button" 
        onClick={handleClose} 
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default InlineNotification;