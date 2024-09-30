const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.createOrder = async (req, res) => {
    const { customer, cartItems, totalAmount, address } = req.body;

    try {
        const userId = req.user._id;

        // Ensure that the products are valid and calculate the total amount
        let calculatedTotal = 0;
        const updatedCartItems = [];

        for (let item of cartItems) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }

            // Add product._id to updatedCartItems and calculate the total
            calculatedTotal += product.price * item.quantity;
            updatedCartItems.push({
                product: product._id,  // Save product ID here
                quantity: item.quantity
            });
        }

        // Validate the total amount
        if (calculatedTotal !== totalAmount) {
            return res.status(400).json({ message: 'Total amount mismatch' });
        }

        // Save the order with correct cartItems
        const order = new Order({
            user: userId,
            customer,
            cartItems: updatedCartItems,  // Store updatedCartItems with correct product references
            totalAmount: calculatedTotal,
            address,
        });

        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.getOrders = async (req, res) => {
    try {
        // Populate the product field inside cartItems
        const orders = await Order.find({ user: req.user._id })
            .populate('cartItems.product');  // Make sure to populate product reference
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


