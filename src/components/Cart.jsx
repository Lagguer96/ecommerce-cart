import React from 'react';
import PropTypes from 'prop-types';

const Cart = ({ cartItems, updateCartItem }) => {
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name} x {item.quantity}</span>
            <span>${item.price * item.quantity}</span>
            <button onClick={() => updateCartItem(item.id, -1)}>Remove</button>
          </div>
        ))
      )}
      <h3>Total: ${totalAmount}</h3>
      {cartItems.length > 0 && (
        <button className="checkout-button">Proceed to Checkout</button>
      )}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  updateCartItem: PropTypes.func.isRequired,
};

export default Cart;
