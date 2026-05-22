import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Products.css';

function Products({ cart, setCart, isLoggedIn, getCartTotal }) {
  const location = useLocation();
  const [filter, setFilter] = useState(location.state?.filter || 'all');
  const [cartMessage, setCartMessage] = useState('');
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const products = [
    { id: 1, name: 'Pink Rose Bouquet', price: 1499, currency: 'ден', category: 'flowers', image: '/images/Pink Rose Bouquet.png', emoji: '🌹', description: '12 fresh pink roses with eucalyptus leaves' },
    { id: 2, name: 'Luxury Peony Bouquet', price: 2499, currency: 'ден', category: 'flowers', image: '/images/Luxury Peony Bouquet.png', emoji: '🌸', description: 'Soft pink peonies - perfect for birthdays' },
    { id: 3, name: 'Sunflower Delight', price: 1199, currency: 'ден', category: 'flowers', image: '/images/Sunflower Delight.png', emoji: '🌻', description: 'Bright sunflowers that bring joy' },
    { id: 4, name: 'Elegant Orchid', price: 1999, currency: 'ден', category: 'flowers', image: '/images/Elegant Orchid.png', emoji: '🪷', description: 'White orchids in ceramic pot' },
    { id: 5, name: 'Fragrant Lily Bouquet', price: 1799, currency: 'ден', category: 'flowers', image: '/images/Fragrant Lily Bouquet.png', emoji: '🌺', description: 'Aromatic lilies - perfect gift' },
    { id: 6, name: 'Romantic Rose Mix', price: 2999, currency: 'ден', category: 'flowers', image: '/images/Romantic Rose Mix.jpeg', emoji: '💖', description: 'Luxury mix of roses and peonies' },
    { id: 7, name: 'Belgian Chocolate Box', price: 899, currency: 'ден', category: 'chocolates', image: '/images/Belgian Chocolate Box.webp', emoji: '🍫', description: 'Belgian pralines and truffles - 24 pieces' },
    { id: 8, name: 'Swiss Luxury Chocolate', price: 1499, currency: 'ден', category: 'chocolates', image: '/images/Swiss Luxury Chocolate.webp', emoji: '🍬', description: 'Swiss chocolate collection - 36 pieces' },
    { id: 9, name: 'Heart-shaped Truffles', price: 1299, currency: 'ден', category: 'chocolates', image: '/images/Heart-shaped Truffles.webp', emoji: '💝', description: 'Heart box with truffles and strawberries' },
    { id: 10, name: 'Hazelnut Chocolate', price: 599, currency: 'ден', category: 'chocolates', image: '/images/Hazelnut Chocolate.jpeg', emoji: '🌰', description: 'Hazelnut and caramel chocolate' },
    { id: 11, name: 'Ferrero Rocher Set', price: 1999, currency: 'ден', category: 'chocolates', image: '/images/Ferrero Rocher Set.jpeg', emoji: '✨', description: '16 Ferrero Rocher in premium box' },
    { id: 12, name: 'Lindt Excellence', price: 999, currency: 'ден', category: 'chocolates', image: '/images/Lindt Excellence.webp', emoji: '🍫', description: 'Lindt chocolate assortment - 20 pieces' },
    { id: 13, name: 'Artisan Chocolates', price: 799, currency: 'ден', category: 'chocolates', image: '/images/Artisan Chocolates.jpeg', emoji: '🎨', description: 'Handcrafted chocolates - 12 flavors' },
    { id: 14, name: 'Rosé Wine - Tikveš Rosé', price: 899, currency: 'ден', category: 'wines', image: '/images/Rosé Wine - Tikveš Rosé.png', emoji: '🍷', description: 'Fresh rosé wine - Tikveš Rosé 0.75L' },
    { id: 15, name: 'Red Wine - Vranec Premium', price: 1299, currency: 'ден', category: 'wines', image: '/images/Red Wine - Vranec Premium.jpg', emoji: '🍇', description: 'Vranec Premium - dry red wine 0.75L' },
    { id: 16, name: 'White Wine - Temjanika', price: 999, currency: 'ден', category: 'wines', image: '/images/White Wine - Temjanika.png', emoji: '🥂', description: 'Temjanika - aromatic white wine 0.75L' },
    { id: 17, name: 'Prosecco - Freixenet', price: 1599, currency: 'ден', category: 'wines', image: '/images/Freixenet Prosecco.webp', emoji: '🥂', description: 'Italian Prosecco - 0.75L' },
    { id: 18, name: 'Red Wine - Merlot', price: 1499, currency: 'ден', category: 'wines', image: '/images/Red Wine - Merlot.png', emoji: '🍷', description: 'Smooth Merlot - 0.75L' },
    { id: 19, name: 'White Wine - Chardonnay', price: 1199, currency: 'ден', category: 'wines', image: '/images/White Wine - Chardonnay.jpg', emoji: '🍾', description: 'Rich Chardonnay - 0.75L' },
    { id: 20, name: 'Romantic Gift Set', price: 4499, currency: 'ден', category: 'giftsets', image: '/images/Romantic Gift Set.png', emoji: '💕', description: '12 Pink Roses + Heart Truffles + Rosé Wine (0.75L)' },
    { id: 21, name: 'Luxury Love Set', price: 5999, currency: 'ден', category: 'giftsets', image: '/images/Luxury Love Set.png', emoji: '💖', description: 'Peony Bouquet + Ferrero Rocher + Prosecco' },
    { id: 22, name: 'Anniversary Set', price: 3999, currency: 'ден', category: 'giftsets', image: '/images/Anniversary Set.png', emoji: '🎊', description: 'Lilies + Swiss Chocolate + Vranec Wine' },
    { id: 23, name: 'Valentine\'s Day Set', price: 3499, currency: 'ден', category: 'giftsets', image: '/images/Valentine’s Set.png', emoji: '🥺', description: 'Sunflowers + Truffles + Merlot Wine' },
    { id: 24, name: 'International Women\'s Day', price: 5499, currency: 'ден', category: 'giftsets', image: '/images/International Women’s Day.png', emoji: '🎄', description: 'Orchids + Lindt Excellence + Temjanika' },
    { id: 25, name: 'Surprise Gift Set', price: 2999, currency: 'ден', category: 'giftsets', image: '/images/Surprise Gift Set.png', emoji: '🎁', description: 'Mixed Bouquet + Artisan Chocolates + Rosé' }
  ];

  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);

  const updateQuantity = (productId, change) => {
    setQuantities(prev => ({ ...prev, [productId]: Math.max(1, (prev[productId] || 1) + change) }));
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    
    setCartMessage(`✨ ${quantity}x ${product.name} added to cart! ✨`);
    setTimeout(() => setCartMessage(''), 2000);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Luxury Collection</h1>
        <p>Fresh flowers, artisanal chocolates & premium wines</p>
      </div>
      
      {cartMessage && <div className="cart-message">{cartMessage}</div>}
      
      {cart.length > 0 && (
        <div className="cart-sidebar">
          <h3>Your Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)</h3>
          {cart.map((item, idx) => (
            <div key={idx} className="cart-item">
              <span>{item.emoji || '🌸'} {item.name}</span>
              <div className="cart-item-details">
                <span>{item.quantity}x {item.price} den</span>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">✖</button>
              </div>
            </div>
          ))}
          <div className="cart-total">Total: {getCartTotal()} den</div>
          <button className="btn btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
          {!isLoggedIn && <p className="login-warning">Please login to checkout</p>}
        </div>
      )}
      
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={`filter-btn ${filter === 'all' ? 'active' : ''}`}>All</button>
        <button onClick={() => setFilter('flowers')} className={`filter-btn ${filter === 'flowers' ? 'active' : ''}`}>Flowers</button>
        <button onClick={() => setFilter('chocolates')} className={`filter-btn ${filter === 'chocolates' ? 'active' : ''}`}>Chocolates</button>
        <button onClick={() => setFilter('wines')} className={`filter-btn ${filter === 'wines' ? 'active' : ''}`}>Wines</button>
        <button onClick={() => setFilter('giftsets')} className={`filter-btn ${filter === 'giftsets' ? 'active' : ''}`}>Gift Sets</button>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'; }} />
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-price">{product.price} {product.currency}</div>
            
            <div className="quantity-selector">
              <button onClick={() => updateQuantity(product.id, -1)} className="qty-btn">-</button>
              <span className="qty-value">{quantities[product.id] || 1}</span>
              <button onClick={() => updateQuantity(product.id, 1)} className="qty-btn">+</button>
            </div>
            
            <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;