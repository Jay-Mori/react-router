// src/Pages/AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddProduct = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: ''
  });

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.datas);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!product.title || !product.price || !product.description || !product.image) {
      toast.error("Please fill all fields");
      return;
    }

    axios.post('http://localhost:3000/products', { ...product, price: Number(product.price) })
      .then(res => {
        toast.success('Product added successfully!');

        // Update product list in Redux
        dispatch({ type: 'success', payload: [...data, res.data] });

        // Reset form
        setProduct({
          title: '',
          price: '',
          description: '',
          image: ''
        });

        if (onProductAdded) onProductAdded(); // callback to parent for navigation or other effects
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to add product');
      });
  }

  return (
    <div style={styles.container}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          style={styles.input}
          min="0"
          step="0.01"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          style={{ ...styles.input, height: '100px', resize: 'vertical' }}
        />
        <button type="submit" style={styles.button}>Add Product</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none'
  },
  button: {
    padding: '12px',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default AddProduct;
