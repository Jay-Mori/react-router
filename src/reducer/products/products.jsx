import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Signup from '../../Pages/signup'; // Adjust path as needed

const Products = () => {
  const { isloading, iserror, data } = useSelector((state) => state.datas);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showSignup, setShowSignup] = useState(false);

  // Fetch product data
  const fetchdata = () => {
    dispatch({ type: 'request' });
    axios.get('http://localhost:3000/products')
      .then((res) => {
        dispatch({ type: 'success', payload: res.data });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: 'rejected' });
        toast.error('Something went wrong while fetching products.');
      });
  };

  // On mount, check if user exists in redux or localStorage
  useEffect(() => {
    if (!auth.isAuthenticated || !auth.currentUser || Object.keys(auth.currentUser).length === 0) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        dispatch({ type: 'signup', payload: JSON.parse(savedUser) });
        setShowSignup(false);
        fetchdata();
      } else {
        setShowSignup(true);
      }
    } else {
      setShowSignup(false);
      fetchdata();
    }
  }, [auth.isAuthenticated, auth.currentUser, dispatch]);

  // After successful signup
  function handleSignupSuccess(newUser) {
    setShowSignup(false);
    dispatch({ type: 'signup', payload: newUser });
    localStorage.setItem('user', JSON.stringify(newUser));
    fetchdata();
  }

  // Logout handler
  function handleLogout() {
    dispatch({ type: 'signout' });
    localStorage.removeItem('user');
    setShowSignup(true);
  }

  if (showSignup) {
    return <Signup onSignupSuccess={handleSignupSuccess} />;
  }

  if (isloading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        Loading...
      </div>
    );
  }

  if (iserror) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={styles.title}>🛍️ Products Page</h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#555',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      <div style={styles.grid}>
        {data.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.title} style={styles.image} />
            <h2 style={styles.productTitle}>{item.title}</h2>
            <p style={styles.price}>Price: ₹{item.price}</p>
            <p style={styles.description}>{item.description}</p>
            <button style={styles.button}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem 2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))',
    gap: '1rem',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0px 0px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  productTitle: {
    marginTop: '0.5rem',
    fontSize: '1.2rem',
  },
  price: {
    color: '#ff5722',
    fontWeight: 'bold',
  },
  description: {
    marginTop: '0.5rem',
    color: '#555',
  },
  button: {
    marginTop: '1rem',
    backgroundColor: '#ff5722',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};

export default Products;
