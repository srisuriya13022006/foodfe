import { useState, useEffect } from 'react';
import { getOrdersByRestaurant, updateOrderStatus } from '../api/order.api';
import { getMyRestaurants } from '../api/restaurant.api'; // Need to make sure this is exported or use axios
import api from '../api/axiosConfig'; // Fallback
import '../styles/global.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [activeResId, setActiveResId] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRes = async () => {
      try {
        const BASE = import.meta.env.VITE_RESTAURANT_API;
        const res = await api.get(`${BASE}/restaurants/my-restaurants`);
        setRestaurants(res.data);
        if (res.data.length > 0) setActiveResId(res.data[0]._id);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRes();
  }, []);

  useEffect(() => {
    if (activeResId) fetchOrders(activeResId);
  }, [activeResId]);

  const fetchOrders = async (resId) => {
    setLoading(true);
    try {
      const data = await getOrdersByRestaurant(resId);
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders(activeResId);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2>Manage Orders</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', overflowX: 'auto' }}>
        {restaurants.map(res => (
          <button
            key={res._id}
            onClick={() => setActiveResId(res._id)}
            className={`btn ${activeResId === res._id ? 'btn-primary' : ''}`}
            style={{ border: '1px solid #ccc' }}
          >
            {res.name}
          </button>
        ))}
      </div>

      {loading ? <p>Loading orders...</p> : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map(order => (
            <div key={order._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4>Order #{order._id.slice(-6)}</h4>
                <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{order.status}</span>
              </div>
              <p>Total: ${order.totalAmount}</p>
              <div style={{ marginTop: '15px' }}>
                {order.status === 'CREATED' && (
                  <button className="btn btn-primary" onClick={() => handleStatusUpdate(order._id, 'PREPARING')}>
                    Mark as Preparing
                  </button>
                )}
                {/* Admins usually don't mark as delivered, but if self-delivery... strict RBAC says NO */}
                {order.status === 'PREPARING' && <p style={{ color: 'var(--text-muted)' }}>Waiting for delivery agent...</p>}
              </div>
            </div>
          ))}
          {orders.length === 0 && <p>No orders found.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
