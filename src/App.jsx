import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

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

  const updateCartItem = (productId, amount) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + amount } : item
    ).filter(item => item.quantity > 0));
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
        {isCartOpen && <Cart cartItems={cartItems} updateCartItem={updateCartItem} />}
      </div>
    </div>
  );
};

export default App;

