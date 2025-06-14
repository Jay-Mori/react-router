import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Signin = () => {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const initialstate = {
    email: '',
    password: ''
  };

  const [formdata, setformdata] = useState(initialstate);

  function handelchange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }

  function handelsubmit(e) {
    e.preventDefault();
    axios.get('http://localhost:3000/auth')
      .then((res) => {
        const user = res.data.find((user) => user.email === formdata.email && user.password === formdata.password);
        if (user) {
          dispatch({ type: 'signin', payload: user });
          alert('Login successful');
          setformdata(initialstate);
          navigate('/products');
        } else {
          alert('Invalid credentials');
          setformdata(initialstate);
        }
      })
      .catch((error) => console.log(error));
  }

  const styles = {
    wrapper: {
      backgroundColor: '#e3f2fd',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      padding: '35px',
      borderRadius: '10px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      width: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '10px',
      border: '1px solid #90caf9',
      borderRadius: '6px',
      fontSize: '1rem',
      outline: 'none',
    },
    button: {
      padding: '10px',
      backgroundColor: '#2196f3',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: '0.3s',
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handelsubmit} style={styles.form}>
        <h2 style={{ textAlign: 'center' }}>Signin</h2>
        <input type="email" placeholder="Email" name='email' value={formdata.email} onChange={handelchange} style={styles.input} />
        <input type="password" placeholder="Password" name='password' value={formdata.password} onChange={handelchange} style={styles.input} />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Signin;
