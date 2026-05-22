import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout({ cart, getCartTotal, clearCart, isLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Skopje',
    deliveryTime: '13:00',
    paymentMethod: 'cash',
    giftMessage: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
    if (cart.length === 0 && !orderPlaced) {
      navigate('/products');
    }
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    if (userEmail) {
      setFormData(prev => ({ ...prev, email: userEmail }));
    }
    if (userName) {
      setFormData(prev => ({ ...prev, fullName: userName }));
    }
  }, [isLoggedIn, navigate, cart.length, orderPlaced]);

  const saveOrder = () => {
    const existingOrders = localStorage.getItem('userOrders');
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    const newOrder = {
      id: '#' + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString(),
      items: cart.map(item => ({ 
        name: item.name, 
        quantity: item.quantity, 
        price: item.price,
        isCustomBouquet: item.isCustomBouquet || false,
        bouquetDetails: item.bouquetDetails || null
      })),
      total: getCartTotal(),
      status: 'Processing',
      deliveryAddress: `${formData.address}, ${formData.city}`,
      deliveryTime: formData.deliveryTime,
      paymentMethod: formData.paymentMethod,
      giftMessage: formData.giftMessage
    };
    orders.unshift(newOrder);
    localStorage.setItem('userOrders', JSON.stringify(orders));
  };

  if (!isLoggedIn) {
    return null;
  }

  if (cart.length === 0 && !orderPlaced) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (formData.fullName.trim().length < 3) newErrors.fullName = 'Name must be at least 3 characters';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.phone.trim().length < 8) newErrors.phone = 'Phone must be at least 8 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (formData.address.trim().length < 5) newErrors.address = 'Enter full address';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      saveOrder();
      setOrderPlaced(true);
      clearCart();
      setIsSubmitting(false);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✅</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping at BlissFlower, {formData.fullName}!</p>
        <div className="order-details">
          <h3>Order Summary</h3>
          <p>Will be delivered to: {formData.address}, {formData.city}</p>
          <p>Contact: {formData.phone}</p>
          <p>Delivery time: {formData.deliveryTime}</p>
          <p>Total paid: {getCartTotal()} den</p>
          <p>Payment: {formData.paymentMethod === 'cash' ? 'Cash on delivery' : 'Credit card'}</p>
          {formData.giftMessage && <p>Gift message: "{formData.giftMessage}"</p>}
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Continue Shopping →
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order to receive your beautiful gifts</p>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Name Surname" />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+389 70 123 456" />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label>City</label>
                  <select name="city" value={formData.city} onChange={handleChange}>
                    <option value="Skopje">Skopje</option>
                    <option value="Bitola">Bitola</option>
                    <option value="Tetovo">Tetovo</option>
                    <option value="Kumanovo">Kumanovo</option>
                    <option value="Ohrid">Ohrid</option>
                    <option value="Prilep">Prilep</option>
                    <option value="Stip">Stip</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Delivery Address</h3>
              <div className="form-group">
                <label>Street Address *</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street name and number" />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </div>
            </div>

            <div className="form-section">
              <h3>Delivery Options</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Delivery Time</label>
                  <select name="deliveryTime" value={formData.deliveryTime} onChange={handleChange}>
                    <option value="09:00">09:00 AM - Morning (200 den extra)</option>
                    <option value="13:00">13:00 PM - Afternoon (Free)</option>
                    <option value="15:00">15:00 PM - Late Afternoon (Free)</option>
                    <option value="17:00">17:00 PM - Evening (200 den extra)</option>
                    <option value="19:00">19:00 PM - Night (300 den extra)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                    <option value="cash">Cash on delivery</option>
                    <option value="card">Credit/Debit card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Additional Information</h3>
              <div className="form-group">
                <label>Gift Message (Optional)</label>
                <textarea name="giftMessage" rows="3" placeholder="Write a special message for the recipient..." value={formData.giftMessage || ''} onChange={handleChange}></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-primary checkout-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : `Confirm Order • ${getCartTotal()} den`}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h3>Your Order</h3>
          {cart.map((item, idx) => (
            <div key={idx} className="order-item">
              <div className="order-item-info">
                <span className="order-item-name">
                  {item.isCustomBouquet ? '🌸 Custom: ' : (item.emoji || '🌸')} {item.name}
                </span>
                <span className="order-item-qty">x{item.quantity}</span>
              </div>
              <span className="order-item-price">{item.price * item.quantity} den</span>
            </div>
          ))}
          <div className="order-total">
            <span>Subtotal</span>
            <span>{getCartTotal()} den</span>
          </div>
          <div className="order-total">
            <span>Delivery Fee</span>
            <span>Free</span>
          </div>
          <div className="order-grand-total">
            <span>Total</span>
            <span>{getCartTotal()} den</span>
          </div>
          <p className="delivery-note">Free delivery on orders over 1000 den!</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;