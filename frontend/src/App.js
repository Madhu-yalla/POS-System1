// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import Checkout from './pages/Checkout';
// import Orders from './pages/Orders';

// function App() {
//   const [cartItems, setCartItems] = useState([]);

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard setCartItems={setCartItems} cartItems={cartItems} />} />
//           <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
//           <Route path="/orders" element={<Orders />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Layout from './Layout';  // Import the Layout component

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));  // Set cart items from localStorage
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);  // This will run whenever `cartItems` changes

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes without SidebarLeft */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes with SidebarLeft */}
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
