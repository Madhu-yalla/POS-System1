import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import axios from 'axios';

const Content = ({ handleAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [categories] = useState(['Fruits', 'Dairy', 'Vegetables', 'Meat', 'Beverages']); // List of categories
    const [selectedCategories, setSelectedCategories] = useState([]); // Array to store selected categories

    useEffect(() => {
        // Fetch products from the backend API based on the selected categories
        const fetchProducts = async () => {
            try {
                let endpoint = 'http://localhost:8000/api/products';
                if (selectedCategories.length > 0) {
                    const categoryQuery = selectedCategories.join(',');
                    endpoint += `?categories=${categoryQuery}`;
                }
                const response = await axios.get(endpoint);
                setProducts(response.data); // Set the products in the state
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [selectedCategories]);

    // Handle checkbox changes
    const handleCategoryChange = (category) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(category)) {
                return prevSelectedCategories.filter((c) => c !== category);
            } else {
                return [...prevSelectedCategories, category];
            }
        });
    };

    const styles = {
        productContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        title: {
            fontSize: '25px',
            fontWeight: 'bold',
            color: 'rgb(80, 80, 87)',
            marginBottom: '20px',
        },
        categoryFilter: {
            marginBottom: '20px',
        },
        productGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Adjust columns dynamically
            gap: '20px', // Space between items
            width: '100%',
        },
        checkbox: {
            margin: '10px',
        },
    };

    return (
        <div style={styles.productContainer}>
            <h1 style={styles.title}>Available Products</h1>

            {/* Category Filter with Checkboxes */}
            <div style={styles.categoryFilter}>
                {categories.map((category) => (
                    <label key={category} style={styles.checkbox}>
                        <input
                            type="checkbox"
                            value={category}
                            onChange={() => handleCategoryChange(category)}
                            checked={selectedCategories.includes(category)}
                        />
                        {category}
                    </label>
                ))}
            </div>

            <div style={styles.productGrid}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductItem key={product._id} product={product} addToCart={handleAddToCart} />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Content;
