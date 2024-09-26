const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/', createOrder);  // For creating an order
router.get('/', getOrders);     // For fetching all orders

module.exports = router;
