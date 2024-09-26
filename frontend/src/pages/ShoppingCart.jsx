import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = ({ cartItems = [], updateCartItem, deleteCartItem }) => { // Pass new props to handle updates and delete
    const navigate = useNavigate();

    const styles = {
        container: {
            padding: '20px',
            backgroundColor: 'rgb(239, 239, 239)',
            borderRadius: '10px',
            height: '100%',
        },
        title: {
            fontSize: '25px',
            fontWeight: 'bold',
            color: 'rgb(80, 80, 87)',
            marginBottom: '20px',
        },
        cartItem: {
            padding: '10px 0',
            borderBottom: '1px solid rgb(201, 201, 201)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        itemDetails: {
            display: 'flex',
            flexDirection: 'column',
        },
        quantityControl: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100px',
        },
        total: {
            marginTop: '20px',
            fontSize: '20px',
            color: 'rgb(80, 80, 87)',
        },
        checkoutButton: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'rgb(236, 156, 6)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'center',
        },
        emptyMessage: {
            color: 'rgb(80, 80, 87)',
            fontSize: '18px',
        },
        deleteButton: {
            padding: '5px 10px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    const totalPrice = cartItems.length > 0
        ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        : 0;

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p style={styles.emptyMessage}>No items in the cart.</p>
            ) : (
                cartItems.map((item, index) => (
                    <div key={index} style={styles.cartItem}>
                        <div style={styles.itemDetails}>
                            <p>{item.name}</p>
                            <p>${item.price}</p>
                        </div>
                        <div style={styles.quantityControl}>
                            <button onClick={() => updateCartItem(item._id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateCartItem(item._id, item.quantity + 1)}>+</button>
                        </div>
                        <button style={styles.deleteButton} onClick={() => deleteCartItem(item._id)}>Delete</button>
                    </div>
                ))
            )}
            <div style={styles.total}>
                <strong>Total: </strong> ${totalPrice.toFixed(2)}
            </div>
            {cartItems.length > 0 && (
                <button style={styles.checkoutButton} onClick={handleCheckout}>
                    Proceed to Checkout
                </button>
            )}
        </div>
    );
};

export default ShoppingCart;
