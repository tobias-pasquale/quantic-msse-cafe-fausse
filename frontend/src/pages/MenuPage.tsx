import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import '../css/MenuPage.css';

const MenuPage: React.FC = () => {
  const { menuItems, categories, isLoading } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  if (isLoading) {
    return <div className="loading">Loading menu...</div>;
  }

  const renderCategoryFilter = () => (
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
  );

  // When a single category is selected, display a single section.
  if (selectedCategory !== null) {
    const filteredItems = menuItems.filter(item => item.category_id === selectedCategory);
    return (
      <div className="menu-page">
        <h1>Our Menu</h1>
        {renderCategoryFilter()}
        <section className="menu-list">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-item">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <p className="price">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </section>
      </div>
    );
  }

  // When "All Items" is selected use category grouping.
  return (
    <div className="menu-page">
      <h1>Our Menu</h1>
      {renderCategoryFilter()}
      {categories.map(category => {
        // Filter items for the current category.
        const categoryItems = menuItems.filter(item => item.category_id === category.id);
        if (categoryItems.length === 0) return null;
        return (
          <section key={category.id} className="menu-category">
            <h2 className="category-header">{category.name}</h2>
            <div className="menu-list">
              {categoryItems.map(item => (
                <div key={item.id} className="menu-item">
                  <h3>{item.name}</h3>
                  <p className="description">{item.description}</p>
                  <p className="price">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default MenuPage;