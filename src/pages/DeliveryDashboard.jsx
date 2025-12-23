import { useEffect, useState } from 'react';
import { getOrdersByRestaurant, updateOrderStatus } from '../api/order.api';
import { assignDelivery } from '../api/delivery.api';

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const restaurantId = '694a1ff791307fe694790edb';

  const fetchOrders = () => {
    getOrdersByRestaurant(restaurantId).then(setOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const startDelivery = async (orderId) => {
    await assignDelivery(orderId);
    // Update local state to reflect the order is now moving
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, status: 'OUT_FOR_DELIVERY' } : o
      )
    );
  };

  // --- NEW FUNCTIONALITY ---
  const completeDelivery = async (orderId) => {
    try {
      // 1. Call the API to update status in the database
      await updateOrderStatus(orderId, 'DELIVERED');

      // 2. Update the UI locally
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: 'DELIVERED' } : o
        )
      );
      alert("Order marked as Delivered!");
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🚴 Delivery Dashboard</h2>

      {/* SECTION 1: ORDERS READY FOR PICKUP */}
      <h3>Ready for Pickup (Preparing)</h3>
      {orders.filter(o => o.status === 'PREPARING').map((order) => (
        <div key={order._id} style={cardStyle}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <button onClick={() => startDelivery(order._id)} style={btnStyle}>
            Assign to Me & Start Delivery
          </button>
        </div>
      ))}

      <hr />

      {/* SECTION 2: ORDERS CURRENTLY IN TRANSIT */}
      <h3>On the Way</h3>
      {orders.filter(o => o.status === 'OUT_FOR_DELIVERY').map((order) => (
        <div key={order._id} style={{ ...cardStyle, borderColor: '#2196F3' }}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p style={{ color: '#2196F3' }}>Status: In Transit</p>
          <button onClick={() => completeDelivery(order._id)} style={{ ...btnStyle, backgroundColor: '#4CAF50' }}>
            Mark as Delivered
          </button>
        </div>
      ))}
    </div>
  );
};

// Basic Styles
const cardStyle = { border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px' };
const btnStyle = { cursor: 'pointer', padding: '8px 12px', marginTop: '10px' };

export default DeliveryDashboard;