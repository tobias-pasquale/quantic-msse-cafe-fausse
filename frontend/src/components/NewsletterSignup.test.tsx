import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewsletterSignup from './NewsletterSignup';
import { useAppContext } from '../context/AppContext';
import * as api from '../utils/api';

// Mock the API functions
jest.mock('../utils/api', () => ({
  newsletterApi: {
    subscribe: jest.fn()
  }
}));

// Mock the AppContext
jest.mock('../context/AppContext', () => ({
  useAppContext: jest.fn(() => ({
    showNotification: jest.fn()
  }))
}));

describe('NewsletterSignup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders newsletter signup form', () => {
    render(<NewsletterSignup />);
    
    expect(screen.getByText(/Subscribe to Our Newsletter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Subscribe/i })).toBeInTheDocument();
  });

  test('submits form with valid email', async () => {
    // Mock successful API response
    (api.newsletterApi.subscribe as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Successfully subscribed to newsletter'
    });

    render(<NewsletterSignup />);
    
    // Fill in the email field
    fireEvent.change(screen.getByLabelText(/Email/i), { 
      target: { value: 'test@example.com' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
    
    // Wait for API call to be made
    await waitFor(() => {
      expect(api.newsletterApi.subscribe).toHaveBeenCalledWith('test@example.com');
    });
    
    // Verify success notification was shown
    const { showNotification } = useAppContext() as any;
    expect(showNotification).toHaveBeenCalledWith(
      expect.stringMatching(/subscribed/i),
      'success'
    );
  });

  test('displays error for invalid email format', async () => {
    render(<NewsletterSignup />);
    
    // Fill in with invalid email
    fireEvent.change(screen.getByLabelText(/Email/i), { 
      target: { value: 'notanemail' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
    
    // API should not be called
    expect(api.newsletterApi.subscribe).not.toHaveBeenCalled();
    
    // Error message should be displayed
    expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument();
  });

  test('handles API error during submission', async () => {
    // Mock API error
    (api.newsletterApi.subscribe as jest.Mock).mockRejectedValue({
      message: 'Email already subscribed'
    });

    render(<NewsletterSignup />);
    
    // Fill in the email field
    fireEvent.change(screen.getByLabelText(/Email/i), { 
      target: { value: 'existing@example.com' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
    
    // Wait for API call to be made
    await waitFor(() => {
      expect(api.newsletterApi.subscribe).toHaveBeenCalled();
    });
    
    // Verify error notification was shown
    const { showNotification } = useAppContext() as any;
    expect(showNotification).toHaveBeenCalledWith(
      expect.stringMatching(/already subscribed/i),
      'error'
    );
  });
});