import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Layout from './Layout';
import Header from './Header'; // Import the Header component

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <div className="App">
        {/* Move the Header component outside of Routes */}
        {/* <Header /> */}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Wrap pages with Layout when needed */}
          <Route
            path="/dashboard"
            element={

              <Dashboard setCartItems={setCartItems} cartItems={cartItems} />

            }
          />
          <Route
            path="/checkout"
            element={
              <Layout cartItems={cartItems}>
                <Checkout cartItems={cartItems} clearCart={clearCart} />
              </Layout>
            }
          />
          <Route
            path="/orders"
            element={
              <Layout cartItems={cartItems}>
                <Orders />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
