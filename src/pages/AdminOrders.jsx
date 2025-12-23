import { useEffect, useState } from 'react';
import { getOrdersByRestaurant, updateOrderStatus } from '../api/order.api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const restaurantId = '694a1ff791307fe694790edb'; // static for now

  useEffect(() => {
    console.log('Fetching orders for restaurant:', restaurantId);
    getOrdersByRestaurant(restaurantId).then(setOrders);
  }, []);

  const markPreparing = async (orderId) => {
    await updateOrderStatus(orderId, 'PREPARING');
    setOrders(prev =>
      prev.map(o =>
        o._id === orderId ? { ...o, status: 'PREPARING' } : o
      )
    );
  };

  return (
    <div>
      <h2>Incoming Orders</h2>

      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid #ccc', margin: 8 }}>
          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.totalAmount}</p>

          {order.status === 'CREATED' && (
            <button onClick={() => markPreparing(order._id)}>
              Mark PREPARING
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
