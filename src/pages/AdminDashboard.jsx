import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [activeTab, setActiveTab] = useState('restaurants');

  useEffect(() => {
    fetchMyRestaurants();
  }, []);

  const fetchMyRestaurants = async () => {
    try {
      // Assuming RESTAURANT_API is proxied or full URL needed?
      // axiosConfig uses relative if setup, but here likely absolute from ENV
      // Let's use the full path logic from other files or just '/restaurant-service' if gateway
      // Checking restaurant.api.js, it uses process.env.VITE_RESTAURANT_API
      const BASE = import.meta.env.VITE_RESTAURANT_API;
      const res = await api.get(`${BASE}/restaurants/my-restaurants`);
      setRestaurants(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Admin Dashboard</h2>
        <Link to="/admin/add-restaurant" className="btn btn-primary">+ Add Restaurant</Link>
      </header>

      <div style={{ borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('restaurants')}
          style={{
            padding: '10px 20px',
            background: 'none',
            borderBottom: activeTab === 'restaurants' ? '2px solid var(--primary)' : 'none',
            color: activeTab === 'restaurants' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 'bold'
          }}
        >
          My Restaurants
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '10px 20px',
            background: 'none',
            borderBottom: activeTab === 'orders' ? '2px solid var(--primary)' : 'none',
            color: activeTab === 'orders' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 'bold'
          }}
        >
          Orders
        </button>
      </div>

      {activeTab === 'restaurants' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {restaurants.map(res => (
            <div key={res._id} className="card">
              <h3>{res.name}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{res.city}</p>
              <div style={{ marginTop: '10px' }}>
                <Link to={`/admin/restaurant/${res._id}`} className="btn" style={{ fontSize: '0.9rem', border: '1px solid #ccc', padding: '5px 10px' }}>Manage Menu</Link>
              </div>
            </div>
          ))}
          {restaurants.length === 0 && <p>No restaurants found.</p>}
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          {/* Placeholder for orders - functionality requires complex filtering by restaurant IDs owned by user */}
          <p>Order management for your restaurants.</p>
          <Link to="/admin/orders" className="btn btn-primary">Go to Order Manager</Link>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
