import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, filterProductsByCategory, sortProducts } from '../redux/ProductsSlice';
import { addProductToCart } from '../redux/CartSlice';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { categories, filteredProducts, status, error, sortBy } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = category => {
    dispatch(filterProductsByCategory(category));
  };

  const handleSortChange = sortBy => {
    dispatch(sortProducts(sortBy));
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
    <div>
      <nav>
        <ul>
          <li onClick={() => handleCategoryChange('all')}>All</li>
          {categories.map(cat => (
            <li key={cat} onClick={() => handleCategoryChange(cat)}>
              {cat}
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <label>Sort by:</label>
        <select value={sortBy} onChange={e => handleSortChange(e.target.value)}>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
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

      <footer>Footer content here</footer>
    </div>
  );
};

export default ProductList;
