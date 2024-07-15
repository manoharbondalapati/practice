import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [product, setProduct] = useState({ title: '', price: '', description: '', category: '', image: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://fakestoreapi.com/products', product);
    setProduct({ title: '', price: '', description: '', category: '', image: '' });
  };

  return (
    <div>
      <h1>Admin</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" value={product.title} onChange={handleChange} placeholder="Title" />
        <input name="price" value={product.price} onChange={handleChange} placeholder="Price" />
        <input name="description" value={product.description} onChange={handleChange} placeholder="Description" />
        <input name="category" value={product.category} onChange={handleChange} placeholder="Category" />
        <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Admin;
