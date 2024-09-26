const Order = require('../models/orderModel');
const Product = require('../models/productModel'); // To validate product prices

// Create a new order
exports.createOrder = async (req, res) => {
    const { customer, cartItems, totalAmount } = req.body;

    try {
        // Validate cart items and calculate total amount
        let calculatedTotal = 0;
        for (let item of cartItems) {
            const product = await Product.findById(item.product); // Find the product by ID
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }

            calculatedTotal += product.price * item.quantity; // Calculate total
        }

        // Compare totalAmount with calculatedTotal for integrity check
        if (calculatedTotal !== totalAmount) {
            return res.status(400).json({ message: 'Total amount mismatch' });
        }

        // Create and save order in the database
        const order = new Order({ customer, cartItems, totalAmount: calculatedTotal });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('cartItems.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
