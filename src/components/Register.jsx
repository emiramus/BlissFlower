import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (formData.fullName.length < 3) {
      setError('Full name must be at least 3 characters');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const existingUsers = localStorage.getItem('users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    if (users.find(u => u.email === formData.email)) {
      setError('Email already exists. Please login instead.');
      return;
    }
    
    const newUser = { fullName: formData.fullName, email: formData.email, password: formData.password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    localStorage.setItem('userName', formData.fullName);
    
    setSuccess('Registration successful! Redirecting...');
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      if (setIsLoggedIn) setIsLoggedIn(true);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">✨</div>
        <h2>Join BlissFlower</h2>
        <p className="auth-subtitle">Create your account and start gifting</p>
        
        <form onSubmit={handleSubmit} className="auth-form" data-testid="register-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" data-testid="fullname-input" value={formData.fullName} onChange={handleChange} placeholder="Your full name" />
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" data-testid="email-input" value={formData.email} onChange={handleChange} placeholder="Your email" />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" data-testid="password-input" value={formData.password} onChange={handleChange} placeholder="Create password (min 6 characters)" />
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" data-testid="confirm-password-input" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />
          </div>
          
          {error && <div className="error-message" data-testid="error-message">{error}</div>}
          {success && <div className="success-message" data-testid="success-message">{success}</div>}
          
          <button type="submit" data-testid="register-button" className="btn btn-primary">Register</button>
        </form>
        
        <p className="auth-footer">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}

export default Register;