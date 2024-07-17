import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, filterProductsByCategory, sortProducts } from '../redux/ProductsSlice';
import { addProductToCart } from '../redux/CartSlice';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { categories, filteredProducts, status, error, sortBy } = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    dispatch(filterProductsByCategory(category));
  };

  const handleSortChange = value => {
    dispatch(sortProducts(value));
  };

  const handleAddToCart = product => {
    dispatch(addProductToCart(product));
    alert(`Added ${product.title} to cart!`);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list-container">
      <nav className="category-nav">
        <ul>
          <li
            className={selectedCategory === 'all' ? 'selected' : ''}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </li>
          {categories.map(cat => (
            <li
              key={cat}
              className={selectedCategory === cat ? 'selected' : ''}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </nav>

      <div className="product-content">
        <div className="sort-container">
          <label>Sort by:</label>
          <select value={sortBy} onChange={e => handleSortChange(e.target.value)}>
            <option value="none" disabled>Select an option</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <div className="product-buttons">
                <Link to={`/product/${product.id}`} className="btn-details">
                  Details
                </Link>
                <button className="btn-add-to-cart" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer>Footer content here</footer>
    </div>
  );
};

export default ProductList;
