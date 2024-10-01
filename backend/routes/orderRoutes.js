const express = require('express');
const { createOrder, getOrders, cancelOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;