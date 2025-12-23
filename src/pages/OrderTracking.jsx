import { useParams } from 'react-router-dom';
import { fetchOrder } from '../hooks/useOrder';
import { useEffect, useState } from 'react';

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchOrder(id);
      setOrder(data);
    }, 3000);

    return () => clearInterval(interval);
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Tracking</h2>
      <p>Status: {order.status}</p>
    </div>
  );
};

export default OrderTracking;
