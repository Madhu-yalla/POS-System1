import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = ({ cartItems = [], clearCart }) => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [showCardForm, setShowCardForm] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const [address, setAddress] = useState({
        street: '',
        houseNumber: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const validateAddress = () => {
        return (
            address.street &&
            address.houseNumber &&
            address.city &&
            address.state &&
            address.zipCode
        );
    };

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
            opacity: validateAddress() ? 1 : 0.5,
            pointerEvents: validateAddress() ? 'auto' : 'none',
        },
        addressForm: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '20px',
        },
        input: {
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '100%',
        },
        addressTitle: {
            fontSize: '20px',
            marginBottom: '10px',
            color: '#333',
        },
    };

    const totalPrice = cartItems.length > 0
        ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        : 0;

    const handlePayment = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found!');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }

        try {
            const orderData = {
                customer: "CustomerName",
                cartItems: cartItems.map(item => ({
                    product: item._id,
                    quantity: item.quantity,
                })),
                totalAmount: totalPrice,
                address: `${address.houseNumber} ${address.street}, ${address.city}, ${address.state} ${address.zipCode}`,
            };

            const response = await axios.post('http://localhost:8000/api/orders', orderData, config);
            console.log('Order successfully placed:', response.data);
            clearCart();
            navigate('/orders');
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

            <div style={styles.addressForm}>
                <h3 style={styles.addressTitle}>Delivery Address</h3>
                <input
                    type="text"
                    placeholder="House Number"
                    value={address.houseNumber}
                    onChange={(e) => setAddress({ ...address, houseNumber: e.target.value })}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Street"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Zip Code"
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    style={styles.input}
                />
            </div>

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
                disabled={!validateAddress()}
            >
                Pay Now
            </button>

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
