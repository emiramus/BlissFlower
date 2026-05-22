import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import CreateBouquet from './components/CreateBouquet';
import Checkout from './components/Checkout';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
    
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    
    return true; 
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={
          <Products 
            cart={cart} 
            setCart={setCart} 
            isLoggedIn={isLoggedIn} 
            getCartTotal={getCartTotal}
          />
        } />
        <Route path="/create-bouquet" element={
          <CreateBouquet 
            isLoggedIn={isLoggedIn} 
            cart={cart}
            addToCart={addToCart}
          />
        } />
        <Route path="/checkout" element={
          <Checkout 
            cart={cart} 
            getCartTotal={getCartTotal} 
            clearCart={clearCart} 
            isLoggedIn={isLoggedIn} 
          />
        } />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={
          isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
        } />
        <Route path="/create-bouquet-demo" element={
          <CreateBouquet 
            isLoggedIn={true} 
            cart={cart}
            addToCart={addToCart}
          />
        } />
      </Routes>
      <ChatBot />
    </Router>
  );
}

export default App;