import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found. Please log in.');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,  // Pass the token in the request
                },
            };

            try {
                const response = await axios.get('http://localhost:8000/api/orders', config);
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const calculateDeliveryDate = (orderDate) => {
        const deliveryDays = 5;
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
        return deliveryDate.toDateString();
    };

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
        },
        header: {
            textAlign: 'center',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '30px',
            borderBottom: '2px solid #e5e5e5',
            paddingBottom: '10px',
        },
        noOrders: {
            textAlign: 'center',
            fontSize: '18px',
            color: '#888',
        },
        orderCard: {
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            marginBottom: '20px',
            transition: 'transform 0.2s ease-in-out',
        },
        orderCardHover: {
            transform: 'translateY(-5px)',
        },
        orderItem: {
            fontSize: '16px',
            marginBottom: '5px',
        },
        strongText: {
            fontWeight: 'bold',
        },
        orderItems: {
            marginTop: '10px',
            borderTop: '1px solid #e5e5e5',
            paddingTop: '10px',
        },
        ul: {
            listStyle: 'none',
            padding: '0',
        },
    };

    if (loading) {
        return <p>Loading your orders...</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Your Orders</h2>
            {orders.length === 0 ? (
                <p style={styles.noOrders}>No orders found.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} style={styles.orderCard}>
                        <h4>Order #{order._id}</h4>
                        <p><strong style={styles.strongText}>Total Amount:</strong> ${order.totalAmount}</p>
                        <p><strong style={styles.strongText}>Estimated Delivery:</strong> {calculateDeliveryDate(order.createdAt)}</p>
                        <div style={styles.orderItems}>
                            <h5>Items:</h5>
                            <ul style={styles.ul}>
                                {order.cartItems.map((item, idx) => (
                                    <li key={idx} style={styles.orderItem}>
                                        {item.product?.name ? item.product.name : 'Product unavailable'} - {item.quantity} pcs
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p><strong style={styles.strongText}>Shipping Address:</strong> {order.address}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;
