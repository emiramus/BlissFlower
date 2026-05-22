import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', formData.email);
    if (setIsLoggedIn) setIsLoggedIn(true);
    navigate('/dashboard');

    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">🌸</div>
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue your luxury gifting journey</p>
        
        <form onSubmit={handleSubmit} className="auth-form" data-testid="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" data-testid="email-input" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" data-testid="password-input" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
          </div>
          
          {error && <div className="error-message" data-testid="error-message">{error}</div>}
          
          <button type="submit" data-testid="login-button" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;