import React from 'react';

const ProductItem = ({ product, addToCart }) => {
    const styles = {
      container: {
        backgroundColor: 'rgb(245, 243, 243)',
        padding: '20px',
        borderRadius: '15px',
        textAlign: 'center',
        marginBottom: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      name: {
        fontSize: '20px',
        color: 'rgb(80, 80, 87)',
      },
      price: {
        fontSize: '18px',
        color: 'rgb(233, 145, 13)',
      },
      button: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: 'rgb(236, 156, 6)',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        cursor: 'pointer',
      },
    };
  
    return (
      <div style={styles.container}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.price}>${product.price}</p>
        <button style={styles.button} onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    );
  };
  
  export default ProductItem;
  