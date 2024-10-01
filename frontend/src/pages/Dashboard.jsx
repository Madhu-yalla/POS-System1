import React, { useState } from 'react';
import SidebarLeft from './SidebarLeft';
import ShoppingCart from './ShoppingCart';
import Content from './Content';

const Dashboard = ({ cartItems, setCartItems }) => {

    // Function to add item to cart or increase quantity
    const handleAddToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Function to update item quantity (increase or decrease)
    const updateCartItem = (productId, newQuantity) => {
        setCartItems((prevItems) => {
            return prevItems.map(item =>
                item._id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            );
        });
    };

    // Function to delete item from cart
    const deleteCartItem = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item._id !== productId));
    };

    const styles = {
        container: {
            display: 'flex',
            height: '100vh',
            width: '100%',
            padding: '10px',
        },
        sidebarLeft: {
            flexBasis: '10%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'rgb(249, 247, 247)',
            padding: '15px 0 5px 0',
            border: '1px solid rgb(201, 201, 201)',
            borderRadius: '30px 0 0 30px',
        },
        mainContent: {
            flexBasis: '70%',
            backgroundColor: 'rgb(237, 235, 235)',
            padding: '50px',
            height: '100%',
            overflowY: 'auto',
            borderTop: '1px solid rgb(216, 216, 216)',
            borderBottom: '1px solid rgb(216, 216, 216)',
            borderRight: '1px solid rgb(222, 219, 219)',
        },
        sidebarRight: {
            flexBasis: '25%',
            backgroundColor: 'rgb(249, 247, 247)',
            borderRadius: '0 30px 30px 0',
            padding: '15px',
            height: '100%',
            overflowY: 'auto',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebarLeft}>
                {/* Pass cartItems to SidebarLeft */}
                <SidebarLeft cartItems={cartItems} />
            </div>

            <div style={styles.mainContent}>
                <Content handleAddToCart={handleAddToCart} />
            </div>

            <div style={styles.sidebarRight}>
                <ShoppingCart cartItems={cartItems} updateCartItem={updateCartItem} deleteCartItem={deleteCartItem} />
            </div>
        </div>
    );
};

export default Dashboard;
