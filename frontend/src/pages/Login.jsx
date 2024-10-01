import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To store error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);


        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(45deg, rgba(135, 129, 255), rgba(255, 110, 110))',
    },
    form: {
      background: 'rgb(255, 253, 253)',
      padding: '50px',
      borderRadius: '10px',
      width: '400px',
    },
    title: {
      textAlign: 'center',
      color: '#77A1D3',
      marginBottom: '20px',
    },
    formInput: {
      marginBottom: '20px',
    },
    label: {
      fontSize: '16px',
      color: 'darkblue',
    },
    input: {
      padding: '15px',
      margin: '10px 0',
      borderRadius: '10px',
      border: '1px solid gray',
      backgroundColor: 'rgb(246, 246, 246)',
      width: '100%',
    },
    button: {
      padding: '15px',
      width: '100%',
      backgroundImage: 'linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    error: {
      color: 'red',
      marginBottom: '15px',
      textAlign: 'center',
    },
    home: {
      marginTop: '20px',
      textAlign: 'center',
    },
    homeLink: {
      color: 'rgb(90, 124, 186)',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h1 style={styles.title}>Login</h1>

        {error && <div style={styles.error}>{error}</div>} {/* Display error message */}

        <form onSubmit={handleSubmit}>
          <div style={styles.formInput}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formInput}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>

        <div style={styles.home}>
          <a href="/register" style={styles.homeLink}>Don't have an account? Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
