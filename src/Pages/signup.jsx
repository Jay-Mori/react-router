// Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Signup = ({ onSignupSuccess }) => {
  const dispatch = useDispatch();

  const initialstate = {
    name: '',
    email: '',
    password: ''
  };

  const [formdata, setformdata] = useState(initialstate);

  function handelchange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }

  function handelsubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/auth', { ...formdata, role: 'user' })
      .then((res) => {
        const newUser = { ...formdata, role: 'user' };
        // Dispatch signup action that also sets currentUser & isAuthenticated
        dispatch({ type: 'signup', payload: newUser });
        // Notify parent component
        onSignupSuccess(newUser);
      })
      .catch((error) => {
        alert('Signup failed');
      });
  }

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #ffecd2, #fcb69f)',
      paddingTop: "100px"
    },
    form: {
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
      width: '320px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    input: {
      padding: '12px',
      fontSize: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      outline: 'none',
    },
    button: {
      padding: '12px',
      backgroundColor: '#ff5722',
      color: '#fff',
      border: 'none',
      fontSize: '1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: '0.3s',
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handelsubmit} style={styles.form}>
        <h2 style={{ textAlign: 'center' }}>Signup</h2>
        <input type="text" placeholder="Name" name='name' value={formdata.name} onChange={handelchange} style={styles.input} />
        <input type="email" placeholder="Email" name='email' value={formdata.email} onChange={handelchange} style={styles.input} />
        <input type="password" placeholder="Password" name='password' value={formdata.password} onChange={handelchange} style={styles.input} />
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default Signup;
