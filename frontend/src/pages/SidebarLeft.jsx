import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaShopify, FaShoppingCart, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

const SidebarLeft = ({ cartItems = [] }) => {
    const [user, setUser] = useState({ name: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                }
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('http://localhost:8000/api/auth/profile', config);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                navigate('/');
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        console.log('User logged out');
    };

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const styles = {
        sidebarLeft: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            backgroundColor: 'rgb(249, 247, 247)',
            borderRadius: '30px 0 0 30px',
            borderRight: '1px solid rgb(201, 201, 201)',
            height: '100%',
        },
        menuLinks: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        },
        menuLink: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            color: 'rgb(167, 163, 163)',
            width: '80px',
            height: '80px',
            margin: '15px 0',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgb(201, 201, 201)',
            position: 'relative',  // For cart badge positioning
            transition: 'background-color 0.3s ease',
        },
        menuIcon: {
            fontSize: '30px',
            marginBottom: '5px',
        },
        menuText: {
            fontSize: '14px',
            color: 'rgb(167, 163, 163)',
        },
        userInfo: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px 0',
        },
        userDetail: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
        },
        userIcon: {
            fontSize: '40px',
            color: 'rgb(51, 153, 51)',
            marginBottom: '10px',
        },
        userName: {
            color: 'rgb(1, 145, 51)',
            fontSize: '20px',
        },
        logoutBtn: {
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px',
            border: 'none',
            padding: '10px 0',
        },
        logoutIcon: {
            fontSize: '22px',
            color: 'rgb(179, 2, 2)',
            marginRight: '10px',
        },
        cartBadge: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.sidebarLeft}>
            <div style={styles.menuLinks}>
                <Link to="/dashboard" style={styles.menuLink}>
                    <FaHome style={styles.menuIcon} />
                    <span style={styles.menuText}>Home</span>
                </Link>
                <Link to="/orders" style={styles.menuLink}>
                    <FaShopify style={styles.menuIcon} />
                    <span style={styles.menuText}>Orders</span>
                </Link>
                <Link to="/checkout" style={styles.menuLink}>
                    <FaShoppingCart style={styles.menuIcon} />
                    {cartItemCount > 0 && (
                        <div style={styles.cartBadge}>{cartItemCount}</div>
                    )}
                    <span style={styles.menuText}>Cart</span>
                </Link>
            </div>

            <div style={styles.userInfo}>
                <div style={styles.userDetail}>
                    <FaUserCircle style={styles.userIcon} />
                    <span style={styles.userName}>{user.name || 'Loading...'}</span>
                </div>
                <button style={styles.logoutBtn} onClick={handleLogout}>
                    <FaSignOutAlt style={styles.logoutIcon} /> Logout
                </button>
            </div>
        </div>
    );
};

export default SidebarLeft;
