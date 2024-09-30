const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware'); // Import the middleware
const router = express.Router();

router.post('/', protect, createOrder);  // Apply the protect middleware to ensure only logged-in users can create orders
router.get('/', protect, getOrders);     // Apply the protect middleware to fetch orders

module.exports = router;
