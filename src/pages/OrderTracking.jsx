import { useState, useEffect } from 'react';
import { getMyOrders } from '../api/order.api';
import '../styles/global.css';

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2>My Orders</h2>
      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map(order => (
            <div key={order._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4>Order #{order._id.slice(-6)}</h4>
                <span style={{
                  background: order.status === 'DELIVERED' ? '#E3FCEF' : '#DEEBFF',
                  color: order.status === 'DELIVERED' ? '#006644' : '#0747A6',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontWeight: 'bold'
                }}>
                  {order.status}
                </span>
              </div>
              <p style={{ marginTop: '10px' }}>Total: ${order.totalAmount}</p>
              <div style={{ marginTop: '10px' }}>
                {/* Progress Bar Mockup */}
                <div style={{ background: '#eee', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{
                    background: 'var(--primary)',
                    height: '100%',
                    width:
                      order.status === 'CREATED' ? '20%' :
                        order.status === 'PREPARING' ? '50%' :
                          order.status === 'OUT_FOR_DELIVERY' ? '80%' :
                            order.status === 'DELIVERED' ? '100%' : '0%'
                  }}></div>
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && <p>No orders found.</p>}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
