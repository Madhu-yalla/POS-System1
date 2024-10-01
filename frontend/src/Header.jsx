import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const styles = {
        header: {
            background: 'linear-gradient(45deg, rgba(135, 129, 255), rgba(255, 110, 110))',
            color: 'white',
            padding: '10px 20px',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            borderRadius: '0 0 15px 0',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
        },
        logo: {
            fontSize: '20px',
            fontWeight: 'bold',
            margin: 0,
        },
        link: {
            color: 'white',
            textDecoration: 'none',
        },
    };

    return (
        <div style={styles.header}>
            <Link to="/dashboard" style={styles.link}>
                <h1 style={styles.logo}>POS System</h1>
            </Link>
        </div>
    );
};

export default Header;
