import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReservationsPage from './ReservationsPage';
import { useAppContext } from '../context/AppContext';
import * as api from '../utils/api';

// Mock the API functions
jest.mock('../utils/api', () => ({
  reservationApi: {
    createReservation: jest.fn()
  }
}));

// Mock the AppContext
jest.mock('../context/AppContext', () => ({
  useAppContext: jest.fn(() => ({
    showNotification: jest.fn()
  }))
}));

describe('ReservationsPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders reservation form', () => {
    render(<ReservationsPage />);
    
    expect(screen.getByText(/Make a Reservation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Guests/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Complete Reservation/i })).toBeInTheDocument();
  });

  test('validates form fields before submission', async () => {
    render(<ReservationsPage />);
    
    // Submit the form without filling any fields
    fireEvent.click(screen.getByRole('button', { name: /Reserve/i }));
    
    // Check for validation messages
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/time is required/i)).toBeInTheDocument();
    expect(screen.getByText(/number of guests is required/i)).toBeInTheDocument();
    
    // API should not be called with invalid form
    expect(api.reservationApi.createReservation).not.toHaveBeenCalled();
  });

  test('submits form with valid data', async () => {
    // Mock successful API response
    (api.reservationApi.createReservation as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Reservation confirmed',
      data: {
        table_number: 15, 
        time_slot: '2025-04-01T19:00:00'
      }
    });

    render(<ReservationsPage />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Name/i), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByLabelText(/Email/i), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), { 
      target: { value: '(202) 555-1234' } 
    });
    fireEvent.change(screen.getByLabelText(/Date/i), { 
      target: { value: '2025-04-01' } 
    });
    fireEvent.change(screen.getByLabelText(/Time/i), { 
      target: { value: '19:00' } 
    });
    fireEvent.change(screen.getByLabelText(/Number of Guests/i), { 
      target: { value: '4' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Reserve/i }));
    
    // Wait for API call to be made
    await waitFor(() => {
      expect(api.reservationApi.createReservation).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(202) 555-1234',
        date: '2025-04-01',
        time: '19:00',
        guests: 4,
        newsletter_signup: false
      });
    });
    
    // Verify success notification and confirmation was shown
    const { showNotification } = useAppContext() as any;
    expect(showNotification).toHaveBeenCalledWith(
      expect.stringMatching(/confirmed/i),
      'success'
    );
    expect(screen.getByText(/Table 15/i)).toBeInTheDocument();
  });

  test('handles unavailable time slot', async () => {
    // Mock API response for unavailable slot
    (api.reservationApi.createReservation as jest.Mock).mockRejectedValue({
      message: 'Time slot is fully booked'
    });

    render(<ReservationsPage />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Name/i), { 
      target: { value: 'Jane Smith' } 
    });
    fireEvent.change(screen.getByLabelText(/Email/i), { 
      target: { value: 'jane@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/Date/i), { 
      target: { value: '2025-04-01' } 
    });
    fireEvent.change(screen.getByLabelText(/Time/i), { 
      target: { value: '20:00' } 
    });
    fireEvent.change(screen.getByLabelText(/Number of Guests/i), { 
      target: { value: '2' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Reserve/i }));
    
    // Wait for API call to be made and error to be displayed
    await waitFor(() => {
      const { showNotification } = useAppContext() as any;
      expect(showNotification).toHaveBeenCalledWith(
        expect.stringMatching(/fully booked/i),
        'error'
      );
    });
  });
});