import { useCart } from '../context/CartContext';
import { createOrder } from '../api/order.api';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (cart.length === 0) return;

    const orderPayload = {
      userId: 'demo-user-123',
      restaurantId: cart[0].restaurantId || 'demo-restaurant',
      items: cart.map((item) => ({
        menuItemId: item._id,
        quantity: 1
      })),
      totalAmount: cart.reduce((sum, i) => sum + i.price, 0)
    };

    const order = await createOrder(orderPayload);
    clearCart();
    navigate(`/order/${order._id}`);
  };

  return (
    <div>
      <h2>Cart</h2>

      {cart.map((item) => (
        <p key={item._id}>
          {item.name} - ₹{item.price}
        </p>
      ))}

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Cart;
