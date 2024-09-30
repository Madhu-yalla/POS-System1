import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Use `useNavigate` for redirection
import { FaHome, FaShopify, FaShoppingCart, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

const SidebarLeft = () => {
    const [user, setUser] = useState({ name: '' });
    const navigate = useNavigate(); // Initialize the `useNavigate` hook

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/'); // Redirect to login if no token found
                    return;
                }
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('http://localhost:8000/api/auth/profile', config); // API call to backend
                setUser(response.data); // Set user data
            } catch (error) {
                console.error('Error fetching user profile:', error);
                navigate('/'); // Redirect to login if there is an error
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove token from localStorage
        navigate('/');  // Redirect to login page
        console.log('User logged out');
    };

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
    };

    return (
        <div style={styles.sidebarLeft}>
            <div style={styles.menuLinks}>
                <Link to="/" style={styles.menuLink}>
                    <FaHome style={styles.menuIcon} />
                    <span style={styles.menuText}>Home</span>
                </Link>
                {/* <Link to="/orders" style={styles.menuLink}>
                    <FaShopify style={styles.menuIcon} />
                    <span style={styles.menuText}>Orders</span>
                </Link> */}
                <Link to="/checkout" style={styles.menuLink}>
                    <FaShoppingCart style={styles.menuIcon} />
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
