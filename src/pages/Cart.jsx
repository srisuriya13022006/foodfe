import { useCart } from '../context/CartContext';
import { createOrder } from '../api/order.api';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    try {
      // Group items by restaurant if needed, but for now single order per cart
      // Assuming backend handles creating simple order with items
      const startResId = cart[0].restaurantId;

      // Transform cart items to schema expected by backend { menuItemId, quantity }
      const items = cart.map(item => ({
        menuItemId: item._id,
        quantity: item.quantity
      }));

      await createOrder({
        restaurantId: startResId,
        items,
        totalAmount: total
      });

      clearCart();
      alert('Order Placed Successfully!');
      navigate('/my-orders');
    } catch (err) {
      console.error(err);
      alert('Checkout failed');
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <div>
          {cart.map(item => (
            <div key={item._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <h4>{item.name} x {item.quantity}</h4>
                <p>${item.price}</p>
              </div>
              <button className="btn" style={{ color: 'red' }} onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <h3>Total: ${total}</h3>
            <button className="btn btn-primary" onClick={handleCheckout} style={{ marginTop: '10px' }}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
