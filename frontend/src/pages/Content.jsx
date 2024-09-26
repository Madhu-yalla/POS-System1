import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import axios from 'axios';

const Content = ({ handleAddToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the backend API
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products');
                setProducts(response.data); // Set the products in the state
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

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
        productGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Adjust columns dynamically
            gap: '20px', // Space between items
            width: '100%',
        },
    };

    return (
        <div style={styles.productContainer}>
            <h1 style={styles.title}>Available Products</h1>
            <div style={styles.productGrid}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductItem key={product._id} product={product} addToCart={handleAddToCart} />
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
        </div>
    );
};

export default Content;
