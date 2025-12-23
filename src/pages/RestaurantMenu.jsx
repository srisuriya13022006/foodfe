import { useParams, useNavigate } from 'react-router-dom';
import useMenu from '../hooks/useMenu';
import MenuItemCard from '../components/MenuItemCard';
import { useCart } from '../context/CartContext';

const RestaurantMenu = () => {
  const { id } = useParams(); // restaurantId
  const menu = useMenu(id);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Menu</h2>

      {menu.map((item) => (
        <MenuItemCard
          key={item._id}
          item={item}
          onAdd={() =>
            addToCart({
              ...item,
              restaurantId: id // ✅ CRITICAL FIX
            })
          }
        />
      ))}

      <button onClick={() => navigate('/cart')}>
        Go to Cart
      </button>
    </div>
  );
};

export default RestaurantMenu;
