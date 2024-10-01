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
        { name: 'Apple', price: 1.2, stock: 100, category: 'Fruits', image: 'https://media.istockphoto.com/id/185262648/photo/red-apple-with-leaf-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=gUTvQuVPUxUYX1CEj-N3lW5eRFLlkGrU_cwwwOWxOh8=' },
        { name: 'Banana', price: 0.8, stock: 200, category: 'Fruits', image: 'https://media.istockphoto.com/id/1400057530/photo/bananas-isolated.jpg?s=612x612&w=0&k=20&c=KLtV4quCnxwWOOx_uUJTQUTl9VVJzA72ykrQlc8P6a0=' },
        { name: 'Orange', price: 1.5, stock: 150, category: 'Fruits', image: 'https://media.istockphoto.com/id/185284489/photo/orange.jpg?s=612x612&w=0&k=20&c=m4EXknC74i2aYWCbjxbzZ6EtRaJkdSJNtekh4m1PspE=' },
        { name: 'Milk', price: 1.0, stock: 300, category: 'Dairy', image: 'https://unblast.com/wp-content/uploads/2020/06/Milk-Carton-Packaging-Mockup.jpg' },
        { name: 'Bread', price: 2.0, stock: 250, category: 'Bakery', image: 'https://yi-files.yellowimages.com/products/1576000/1576555/2532632-cover.jpg' },
        { name: 'Eggs', price: 3.5, stock: 180, category: 'Dairy', image: 'https://atlas-content-cdn.pixelsquid.com/stock-images/eggs-in-open-carton-package-egg-2JRBJ7F-600.jpg' },
        { name: 'Butter', price: 2.5, stock: 130, category: 'Dairy', image: 'https://thumbs.dreamstime.com/b/package-american-cheese-9005830.jpg' },
        { name: 'Tomatoes', price: 1.8, stock: 150, category: 'Vegetables', image: 'https://media.istockphoto.com/id/1364760973/photo/packed-and-labeled-fresh-tomatoes-on-isolated-white-background.jpg?s=612x612&w=0&k=20&c=eAuly_htm-aRha5dWiJQmYUK32KnfVeEBEKEGqtuYAM=' },
        { name: 'Potatoes', price: 0.9, stock: 300, category: 'Vegetables', image: 'https://media.istockphoto.com/id/157430678/photo/three-potatoes.jpg?s=612x612&w=0&k=20&c=qkMoEgcj8ZvYbzDYEJEhbQ57v-nmkHS7e88q8dv7TSA=' },
        { name: 'Carrots', price: 1.2, stock: 200, category: 'Vegetables', image: 'https://t4.ftcdn.net/jpg/02/06/86/67/360_F_206866740_8k84uz3nnixk6iPI5osM3qNdPDuAcNfa.jpg' },
        { name: 'Chicken Breast', price: 5.0, stock: 100, category: 'Meat', image: 'https://www.perdue.com/product-images/PK_7615_CBValue_RD_ITD0818_FV_clean_640.jpg' },
        { name: 'Ground Beef', price: 6.0, stock: 120, category: 'Meat', image: 'https://t4.ftcdn.net/jpg/04/86/35/55/360_F_486355525_SwEt8kvigjiAGocorPhmBPLHrA3hEwA5.jpg' },
        { name: 'Salmon', price: 12.0, stock: 80, category: 'Seafood', image: 'https://img.freepik.com/premium-photo/raw-fish-plastic-package-fresh-salmon-steak-black-food-container-isolated-white-background-3d-render-realistic-trout-fillet-seafood-product-hermetic-tray-top-view_645257-1234.jpg' },
        { name: 'Tuna', price: 10.0, stock: 90, category: 'Seafood', image: 'https://img.freepik.com/premium-psd/tuna-can-with-box-packaging-mockup_439185-2084.jpg' },
        { name: 'Cereal', price: 4.0, stock: 300, category: 'Grains', image: 'https://media.istockphoto.com/id/1030319626/photo/3d-rendering-of-corn-flakes-paper-packaging-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=NXnFYsWMKXznwtfO-uIXZwblZ1eEjN8gYTMFghWKQH8=' },
        { name: 'Rice', price: 3.0, stock: 400, category: 'Grains', image: 'https://as1.ftcdn.net/v2/jpg/01/82/77/02/1000_F_182770235_RsPMff8kzfHqjyVbWpn7F2K9JBGjrKr9.jpg' },
        { name: 'Pasta', price: 2.0, stock: 350, category: 'Grains', image: 'https://yi-files.yellowimages.com/content/2018/07/5b41ea555dea8.jpg' },
        { name: 'Yogurt', price: 1.5, stock: 200, category: 'Dairy', image: 'https://t3.ftcdn.net/jpg/01/93/50/82/360_F_193508283_k6NEKV1m46C3dFTcjBXMGybKs4VYlgxM.jpg' },
        { name: 'Coffee', price: 7.0, stock: 100, category: 'Beverages', image: 'https://img.freepik.com/premium-psd/foil-coffee-bag-packaging-mockup_439185-1875.jpg' },
        { name: 'Tea', price: 5.0, stock: 120, category: 'Beverages', image: 'https://www.epackprinting.com/wp-content/uploads/2023/05/tea-packaging-wholesale.jpg' },
        { name: 'Juice', price: 3.5, stock: 180, category: 'Beverages', image: 'https://media.istockphoto.com/id/1359199652/vector/carton-box-with-orange-juice-citrus-drink-icon-for-logo-menu-emblem-template-stickers-prints.jpg?s=612x612&w=0&k=20&c=rdrkCCFP9PhMQykKCwKkJBOP9lUYQJ-ec0z8ta6y6ww=' },
        { name: 'Soda', price: 10.5, stock: 220, category: 'Beverages', image: 'https://media.istockphoto.com/id/901967124/photo/soda-red-six-pack.jpg?s=612x612&w=0&k=20&c=8Kwh4rf5WTF2PF2gHnxgp1zGb-kC-ctUbfTBU2JUdpU=' },
        { name: 'Chips', price: 2.5, stock: 300, category: 'Snacks', image: 'https://img.freepik.com/free-vector/realistic-chips-package_1284-34786.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727481600&semt=ais_hybrid' },
        { name: 'Cookies', price: 3.0, stock: 150, category: 'Snacks', image: 'https://sevengramscaffe.com/cdn/shop/products/Box_6Cookie_CC_Bundle.jpg?v=1632179151' },
        { name: 'Chocolate', price: 2.0, stock: 250, category: 'Snacks', image: 'https://axiomprint.com/_next/image?url=https%3A%2F%2Fnewapi.axiomprint.com%2Fv1%2Fproduct%2Fimage%3Fwidth%3D1200%26height%3D1000%26imageName%3Dchocolate-1-930.jpg&w=3840&q=75' },
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
