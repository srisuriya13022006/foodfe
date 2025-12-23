import { useState, useEffect } from 'react';
import { getPendingOrders } from '../api/order.api';
import { assignDelivery, getMyDeliveries } from '../api/delivery.api';
import '../styles/global.css';

const DeliveryDashboard = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [myDeliveries, setMyDeliveries] = useState([]);
  const [activeTab, setActiveTab] = useState('available');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const pending = await getPendingOrders();
      setPendingOrders(pending);
      const mine = await getMyDeliveries();
      setMyDeliveries(mine);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (orderId) => {
    try {
      await assignDelivery(orderId);
      // Refresh
      fetchData();
    } catch (err) {
      alert('Failed to accept order');
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <header style={{ marginBottom: '30px' }}>
        <h2>Delivery Zone</h2>
      </header>

      <div style={{ borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('available')}
          style={{
            padding: '10px 20px',
            background: 'none',
            borderBottom: activeTab === 'available' ? '2px solid var(--primary)' : 'none',
            color: activeTab === 'available' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 'bold'
          }}
        >
          Available Orders
        </button>
        <button
          onClick={() => setActiveTab('mine')}
          style={{
            padding: '10px 20px',
            background: 'none',
            borderBottom: activeTab === 'mine' ? '2px solid var(--primary)' : 'none',
            color: activeTab === 'mine' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 'bold'
          }}
        >
          My Deliveries
        </button>
      </div>

      {activeTab === 'available' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {pendingOrders.map(order => (
            <div key={order._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4>Order #{order._id.slice(-6)}</h4>
                <p>Status: <span style={{ color: 'orange' }}>{order.status}</span></p>
                <p>Total: ${order.totalAmount}</p>
              </div>
              <button className="btn btn-primary" onClick={() => handleAccept(order._id)}>Accept Delivery</button>
            </div>
          ))}
          {pendingOrders.length === 0 && <p>No orders currently available.</p>}
        </div>
      )}

      {activeTab === 'mine' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {myDeliveries.map(delivery => (
            <div key={delivery._id} className="card">
              <h4>Delivery #{delivery._id.slice(-6)}</h4>
              <p>Order ID: {delivery.orderId}</p>
              <p>Status: {delivery.status}</p>
              {/* Here we would add Mark Delivered button if status is OUT_FOR_DELIVERY */}
            </div>
          ))}
          {myDeliveries.length === 0 && <p>No deliveries assigned.</p>}
        </div>
      )}

    </div>
  );
};

export default DeliveryDashboard;