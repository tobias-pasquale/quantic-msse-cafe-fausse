import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation component', () => {
  render(<App />);
  const navigationElement = screen.getByRole('navigation');
  expect(navigationElement).toBeInTheDocument();
});

test('renders footer with contact information', () => {
  render(<App />);
  const footerElement = screen.getByText(/1234 Culinary Ave/i);
  expect(footerElement).toBeInTheDocument();
});
