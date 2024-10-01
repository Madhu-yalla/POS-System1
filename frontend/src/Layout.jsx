import React from 'react';
import SidebarLeft from './pages/SidebarLeft';
import Header from './Header'; // Import the Header component

const Layout = ({ children, cartItems }) => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            height: 'calc(100vh - 80px)', // Adjust height considering the header
            width: '100%',
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
            flexBasis: '90%',
            backgroundColor: 'rgb(237, 235, 235)',
            padding: '50px',
            height: '100%',
            overflowY: 'auto',
            borderTop: '1px solid rgb(216, 216, 216)',
            borderBottom: '1px solid rgb(216, 216, 216)',
            borderRight: '1px solid rgb(222, 219, 219)',
        },
    };

    return (
        <div>
            {/* <Header />  */}
            <div style={styles.container}>
                <div style={styles.sidebarLeft}>
                    <SidebarLeft cartItems={cartItems} />
                </div>
                <div style={styles.mainContent}>
                    {children} {/* This will render the main content of each page */}
                </div>
            </div>
        </div>
    );
};

export default Layout;
