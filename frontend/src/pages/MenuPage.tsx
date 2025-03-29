import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const MenuPage: React.FC = () => {
  const { menuItems, categories, isLoading } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Filter menu items based on selected category
  const filteredItems = selectedCategory 
    ? menuItems.filter(item => item.category_id === selectedCategory)
    : menuItems;

  if (isLoading) {
    return <div className="loading">Loading menu...</div>;
  }

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>
      
      <div className="category-filter">
        {categories.map(category => (
          <button 
            key={category.id}
            className={selectedCategory === category.id ? 'active' : ''}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
        <button 
          className={selectedCategory === null ? 'active' : ''}
          onClick={() => setSelectedCategory(null)}
        >
          All Items
        </button>
      </div>
      
      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="menu-item">
            <h3>{item.name}</h3>
            <p className="description">{item.description}</p>
            <p className="price">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;