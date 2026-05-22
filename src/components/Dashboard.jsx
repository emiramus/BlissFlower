import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [userStats, setUserStats] = useState({
    orders: 0,
    wishlist: 5,
    reviews: 8,
    points: 450
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/login');
    } else {
      setUserEmail(email);
    }

    const savedOrders = localStorage.getItem('userOrders');
    if (savedOrders) {
      const orders = JSON.parse(savedOrders);
      setRecentOrders(orders.slice(0, 3));
      setUserStats(prev => ({ ...prev, orders: orders.length }));
    }

    const savedReviews = localStorage.getItem('userReviews');
    if (savedReviews) {
      setUserStats(prev => ({ ...prev, reviews: JSON.parse(savedReviews).length }));
    }
  }, [navigate]);

  const stats = [
    { label: 'Orders', value: userStats.orders, icon: '📦' },
    { label: 'Wishlist', value: userStats.wishlist, icon: '💝' },
    { label: 'Reviews', value: userStats.reviews, icon: '⭐' },
    { label: 'Points', value: userStats.points, icon: '🎁' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {userEmail}!</h1>
        <p>Your luxury gifting dashboard</p>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="recent-orders">
        <h2>Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <div className="no-orders">
            <p>No orders yet.</p>
            <button className="btn btn-primary" onClick={() => navigate('/products')}>Start Shopping →</button>
          </div>
        ) : (
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr key={idx}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</td>
                    <td>{order.total} den</td>
                    <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;