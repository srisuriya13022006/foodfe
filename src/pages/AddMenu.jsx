import { useEffect, useState } from 'react';
import { addMenuItem, getRestaurantsByCity } from '../api/restaurant.api';

const AddMenu = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    getRestaurantsByCity('Chennai').then(setRestaurants);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addMenuItem({
      restaurantId,
      name,
      price: Number(price)
    });

    alert('Menu item added');
    setName('');
    setPrice('');
  };

  return (
    <div>
      <h2>Add Menu Item</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
        >
          <option value="">Select Restaurant</option>
          {restaurants.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Add Menu</button>
      </form>
    </div>
  );
};

export default AddMenu;
