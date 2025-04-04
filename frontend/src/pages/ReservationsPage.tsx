import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { reservationApi } from '../utils/api';
import '../css/ReservationsPage.css';

const ReservationsPage: React.FC = () => {
  const { showNotification } = useAppContext();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  
  // Availability check state
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [tablesRemaining, setTablesRemaining] = useState(0);
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<{
    reservation_id?: number;
    table_number?: number;
  } | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset availability check when date, time, or guests change
    if (name === 'date' || name === 'time' || name === 'guests') {
      setAvailabilityChecked(false);
      setIsAvailable(false);
    }
  };
  
  // Check availability
  const checkAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.date || !formData.time || !formData.guests) {
      showNotification('Please select a date, time, and number of guests.', 'error');
      return;
    }
    
    setIsCheckingAvailability(true);
    
    try {
      const response = await reservationApi.checkAvailability(
        formData.date, 
        formData.time, 
        parseInt(formData.guests.toString())
      );
      
      setIsAvailable(response.available);
      setTablesRemaining(response.tables_remaining || 0);
      setAvailabilityChecked(true);
      
      if (!response.available) {
        showNotification('Sorry, this time slot is fully booked. Please select another time.', 'error');
      } else {
        showNotification(`Great! We have tables available for ${formData.date} at ${formData.time}.`, 'success');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      showNotification('Error checking availability. Please try again.', 'error');
      setIsAvailable(false);
    } finally {
      setIsCheckingAvailability(false);
    }
  };
  
  // Submit reservation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.date || !formData.time || !formData.guests) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Check availability again if not already checked
    if (!availabilityChecked) {
      showNotification('Please check availability before submitting.', 'error');
      return;
    }
    
    if (!isAvailable) {
      showNotification('This time slot is not available. Please select another time.', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await reservationApi.createReservation(formData);
      
      if (response.success) {
        setSubmissionSuccess(true);
        setReservationDetails({
          reservation_id: response.reservationId,
          table_number: response.tableNumber
        });
        showNotification('Reservation confirmed! Check your email for details.', 'success');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: 2,
          specialRequests: ''
        });
        setAvailabilityChecked(false);
        setIsAvailable(false);
      } else {
        showNotification(response.message || 'Error creating reservation.', 'error');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      showNotification('Error submitting reservation. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Generate time options (5:00 PM to 10:00 PM, 30 min intervals)
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 17; hour < 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');
        const timeValue = `${hourStr}:${minuteStr}`;
        const timeLabel = `${hour > 12 ? hour - 12 : hour}:${minuteStr} ${hour >= 12 ? 'PM' : 'AM'}`;
        options.push(<option key={timeValue} value={timeValue}>{timeLabel}</option>);
      }
    }
    return options;
  };

  return (
    <div className="reservations-page">
      <h1>Make a Reservation</h1>
      
      {submissionSuccess && reservationDetails ? (
        <div className="reservation-confirmation">
          <h2>Reservation Confirmed!</h2>
          <p>Thank you for your reservation. We look forward to seeing you!</p>
          <div className="confirmation-details">
            <p><strong>Reservation ID:</strong> {reservationDetails.reservation_id}</p>
            <p><strong>Table Number:</strong> {reservationDetails.table_number}</p>
            <p><strong>Date:</strong> {formData.date}</p>
            <p><strong>Time:</strong> {formData.time}</p>
            <p><strong>Party Size:</strong> {formData.guests}</p>
          </div>
          <button 
            className="make-new-reservation"
            onClick={() => setSubmissionSuccess(false)}
          >
            Make Another Reservation
          </button>
        </div>
      ) : (
        <div className="reservation-form-container">
          <p>Please fill out the form below to make a reservation. All fields marked with * are required.</p>
          
          <form className="reservation-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="time">Time *</label>
              <select 
                id="time" 
                name="time" 
                value={formData.time} 
                onChange={handleChange}
                required
              >
                <option value="">Select a time</option>
                {generateTimeOptions()}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="guests">Number of Guests *</label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
              >
                {[...Array(20)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="check-availability">
              <button 
                type="button" 
                onClick={checkAvailability}
                disabled={!formData.date || !formData.time || !formData.guests || isCheckingAvailability}
              >
                {isCheckingAvailability ? 'Checking...' : 'Check Availability'}
              </button>
              
              {availabilityChecked && isAvailable && (
                <div className="availability-success">
                  <p>✓ Available! ({tablesRemaining} tables remaining)</p>
                </div>
              )}
              
              {availabilityChecked && !isAvailable && (
                <div className="availability-error">
                  <p>✗ Not available. Please select another time.</p>
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={!availabilityChecked || !isAvailable}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={!availabilityChecked || !isAvailable}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Optional"
                disabled={!availabilityChecked || !isAvailable}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                placeholder="Allergies, special occasions, seating preferences, etc."
                disabled={!availabilityChecked || !isAvailable}
              />
            </div>
            
            <div className="form-submit">
              <button 
                type="submit" 
                disabled={!availabilityChecked || !isAvailable || isSubmitting || !formData.name || !formData.email}
              >
                {isSubmitting ? 'Submitting...' : 'Complete Reservation'}
              </button>
            </div>
          </form>
          
          <div className="reservation-info">
            <h3>Reservation Policies</h3>
            <ul>
              <li>Reservations can be made up to 60 days in advance.</li>
              <li>For parties larger than 8, please call us directly at (202) 555-4567.</li>
              <li>We hold reservations for 15 minutes past the reservation time.</li>
              <li>To cancel or modify your reservation, please contact us at least 24 hours in advance.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;