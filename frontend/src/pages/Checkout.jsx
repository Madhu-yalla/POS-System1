import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = ({ cartItems = [] }) => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [showCardForm, setShowCardForm] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const styles = {
        container: {
            padding: '20px',
        },
        title: {
            fontSize: '25px',
            fontWeight: 'bold',
            color: 'rgb(80, 80, 87)',
            marginBottom: '20px',
        },
        item: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: '1px solid rgb(201, 201, 201)',
        },
        total: {
            marginTop: '20px',
            fontSize: '20px',
            color: 'rgb(80, 80, 87)',
        },
        paymentButton: {
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
        paymentOptionsContainer: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'rgb(245, 245, 245)',
            borderRadius: '10px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
        },
        paymentOption: {
            display: 'block',
            marginBottom: '10px',
            cursor: 'pointer',
        },
        modalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '400px',
            textAlign: 'center',
        },
        cardInput: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
    };

    // Calculate total price based on cartItems
    const totalPrice = cartItems.length > 0
        ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        : 0;

    const handlePayment = async () => {
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }

        if (paymentMethod === 'Credit Card' && (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv)) {
            alert('Please fill in all card details.');
            return;
        }

        try {
            const orderData = {
                customer: "CustomerName", // Replace with actual customer info
                cartItems: cartItems.map(item => ({
                    product: item._id,
                    quantity: item.quantity,
                })),
                totalAmount: totalPrice,
            };

            await axios.post('http://localhost:8000/api/orders', orderData);
            console.log('Order successfully placed');

            // Simulate payment process and navigate to dashboard
            setTimeout(() => {
                alert('Payment Successful!');
                navigate('/dashboard');
            }, 1000);
        } catch (err) {
            console.error('Error during payment:', err);
        }
    };

    const handlePaymentOptionChange = (e) => {
        const selectedMethod = e.target.value;
        setPaymentMethod(selectedMethod);
        setShowCardForm(selectedMethod === 'Credit Card');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Checkout</h2>
            {cartItems.map((item, index) => (
                <div key={index} style={styles.item}>
                    <p>{item.name}</p>
                    <p>${item.price} x {item.quantity}</p>
                </div>
            ))}
            <div style={styles.total}>
                <strong>Total: </strong> ${totalPrice.toFixed(2)}
            </div>
            <button
                style={styles.paymentButton}
                onClick={() => setShowPaymentOptions(true)}
            >
                Pay Now
            </button>

            {/* Payment options modal */}
            {showPaymentOptions && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3>Select Payment Method</h3>
                        <div style={styles.paymentOptionsContainer}>
                            <label style={styles.paymentOption}>
                                <input
                                    type="radio"
                                    value="Credit Card"
                                    checked={paymentMethod === 'Credit Card'}
                                    onChange={handlePaymentOptionChange}
                                />
                                Credit Card
                            </label>
                            <label style={styles.paymentOption}>
                                <input
                                    type="radio"
                                    value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={handlePaymentOptionChange}
                                />
                                PayPal
                            </label>
                            <label style={styles.paymentOption}>
                                <input
                                    type="radio"
                                    value="Bank Transfer"
                                    checked={paymentMethod === 'Bank Transfer'}
                                    onChange={handlePaymentOptionChange}
                                />
                                Bank Transfer
                            </label>

                            {/* Show card details form if Credit Card is selected */}
                            {showCardForm && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        value={cardDetails.cardNumber}
                                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                                        style={styles.cardInput}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Expiry Date (MM/YY)"
                                        value={cardDetails.expiryDate}
                                        onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                                        style={styles.cardInput}
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        value={cardDetails.cvv}
                                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                        style={styles.cardInput}
                                    />
                                </>
                            )}

                            <button
                                style={styles.paymentButton}
                                onClick={handlePayment}
                            >
                                Proceed with {paymentMethod}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
