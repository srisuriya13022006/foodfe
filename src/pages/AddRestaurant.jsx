import { useState } from 'react';
import { addRestaurant } from '../api/restaurant.api';
import { useNavigate } from 'react-router-dom';

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addRestaurant({
      name,
      city,
      isOpen: true
    });

    alert('Restaurant added');
    navigate('/admin');
  };

  return (
    <div>
      <h2>Add Restaurant</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
