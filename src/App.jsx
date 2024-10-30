import React, { useState } from 'react';
import ProductList from './components/Productlist.jsx';
import Cart from './components/Cart.jsx';
import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const products = [
    { id: 1, name: 'Product 1', price: 10, image: '/path-to-image-1.jpg' },
    { id: 2, name: 'Product 2', price: 20, image: '/path-to-image-2.jpg' },
  ];

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <img src="/logo.png" alt="Logo" className="header-logo" />
        <button className="header-button" onClick={() => setIsCartOpen(!isCartOpen)}>
          {isCartOpen ? 'Close Cart' : 'Open Cart'}
        </button>
      </header>
      <div className="content">
        <ProductList products={products} addToCart={addToCart} />
        {isCartOpen && <Cart cartItems={cartItems} />}
      </div>
    </div>
  );
};

export default App;
