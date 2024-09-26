const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Import models and routes
const Product = require('./models/productModel');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Parse cookies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        seedProducts();  // Seed products into the database
    })
    .catch(err => console.log(err));

// Seed function to insert products into the database
const seedProducts = async () => {
    const products = [
        { name: 'Apple', price: 1.2, stock: 100, category: 'Fruits' },
        { name: 'Banana', price: 0.8, stock: 200, category: 'Fruits' },
        { name: 'Orange', price: 1.5, stock: 150, category: 'Fruits' },
        { name: 'Milk', price: 1.0, stock: 300, category: 'Dairy' },
        { name: 'Bread', price: 2.0, stock: 250, category: 'Bakery' },
        { name: 'Eggs', price: 3.5, stock: 180, category: 'Dairy' },
        { name: 'Butter', price: 2.5, stock: 130, category: 'Dairy' },
        { name: 'Cheese', price: 4.5, stock: 100, category: 'Dairy' },
        { name: 'Tomatoes', price: 1.8, stock: 150, category: 'Vegetables' },
        { name: 'Potatoes', price: 0.9, stock: 300, category: 'Vegetables' },
        { name: 'Carrots', price: 1.2, stock: 200, category: 'Vegetables' },
        { name: 'Chicken Breast', price: 5.0, stock: 100, category: 'Meat' },
        { name: 'Ground Beef', price: 6.0, stock: 120, category: 'Meat' },
        { name: 'Salmon', price: 12.0, stock: 80, category: 'Seafood' },
        { name: 'Tuna', price: 10.0, stock: 90, category: 'Seafood' },
        { name: 'Cereal', price: 4.0, stock: 300, category: 'Grains' },
        { name: 'Rice', price: 3.0, stock: 400, category: 'Grains' },
        { name: 'Pasta', price: 2.0, stock: 350, category: 'Grains' },
        { name: 'Yogurt', price: 1.5, stock: 200, category: 'Dairy' },
        { name: 'Coffee', price: 7.0, stock: 100, category: 'Beverages' },
        { name: 'Tea', price: 5.0, stock: 120, category: 'Beverages' },
        { name: 'Juice', price: 3.5, stock: 180, category: 'Beverages' },
        { name: 'Soda', price: 1.5, stock: 220, category: 'Beverages' },
        { name: 'Chips', price: 2.5, stock: 300, category: 'Snacks' },
        { name: 'Cookies', price: 3.0, stock: 150, category: 'Snacks' },
        { name: 'Chocolate', price: 2.0, stock: 250, category: 'Snacks' },
    ];

    try {
        await Product.deleteMany(); // Clear existing products
        await Product.insertMany(products); // Insert new products
        console.log('Products seeded into the database');
    } catch (err) {
        console.error('Error seeding products:', err);
    }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
