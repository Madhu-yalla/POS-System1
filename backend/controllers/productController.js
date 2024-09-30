const Product = require('../models/productModel');

// Get all products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Add a new product (optional for future use)
exports.addProduct = async (req, res) => {
    const { name, price, stock, category } = req.body;

    try {
        const product = new Product({ name, price, stock, category });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Get all products or filter by category
exports.getProducts = async (req, res) => {
    try {
        const { categories } = req.query;
        let query = {};

        if (categories) {
            query.category = { $in: categories.split(',') };  // Split the categories query and use MongoDB's $in operator
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
