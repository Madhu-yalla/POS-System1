import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', { name, email, password });
      if (response.data) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
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
        <h1 style={styles.title}>Register</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.formInput}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
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
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <div style={styles.home}>
          <a href="/" style={styles.homeLink}>Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
