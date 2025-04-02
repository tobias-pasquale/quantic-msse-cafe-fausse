import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import MenuPage from './MenuPage';
import userEvent from '@testing-library/user-event';

// Mock the AppContext values
jest.mock('../context/AppContext', () => ({
  useAppContext: () => ({
    menuItems: [
      {
        id: 1,
        name: 'Bruschetta',
        description: 'Fresh tomatoes, basil, olive oil, and toasted baguette slices',
        price: 8.50,
        category_id: 1,
        is_vegetarian: true,
        is_vegan: false,
        is_gluten_free: false,
        image_url: null
      },
      {
        id: 2,
        name: 'Grilled Salmon',
        description: 'Served with lemon butter sauce and seasonal vegetables',
        price: 22.00,
        category_id: 2,
        is_vegetarian: false,
        is_vegan: false,
        is_gluten_free: true,
        image_url: null
      }
    ],
    categories: [
      { id: 1, name: 'Starters', description: 'Perfect beginnings to your meal' },
      { id: 2, name: 'Main Courses', description: 'Our chef\'s specialties' }
    ],
    isLoading: false,
    error: null,
    notifications: [],
    showNotification: jest.fn(),
    dismissNotification: jest.fn(),
    refreshMenuData: jest.fn()
  }),
  AppProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('MenuPage Component', () => {
  test('renders menu title', () => {
    render(<MenuPage />);
    const titleElement = screen.getByText(/Our Menu/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('displays menu items', () => {
    render(<MenuPage />);
    const bruschettaItem = screen.getByText('Bruschetta');
    const salmonItem = screen.getByText('Grilled Salmon');
    
    expect(bruschettaItem).toBeInTheDocument();
    expect(salmonItem).toBeInTheDocument();
  });

  test('shows loading state when isLoading is true', () => {
    // Override the mock for this specific test
    jest.spyOn(require('../context/AppContext'), 'useAppContext')
      .mockReturnValue({ 
        menuItems: [], 
        categories: [],
        isLoading: true,
        error: null,
        notifications: [],
        showNotification: jest.fn(),
        dismissNotification: jest.fn(),
        refreshMenuData: jest.fn()
      });
      
    render(<MenuPage />);
    const loadingElement = screen.getByText(/Loading menu/i);
    expect(loadingElement).toBeInTheDocument();
    
    // Clean up the mock override
    jest.restoreAllMocks();
  });
});