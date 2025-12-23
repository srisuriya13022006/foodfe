import { useState } from 'react';
import { addRestaurant } from '../api/restaurant.api';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addRestaurant({
        name,
        city,
        isOpen: true
      });
      alert('Restaurant added successfully!');
      navigate('/admin');
    } catch (err) {
      alert('Failed to add restaurant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ width: '500px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Restaurant</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Restaurant Name</label>
            <input
              placeholder="e.g. Italian Bistro"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>City</label>
            <input
              placeholder="e.g. New York"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Adding...' : 'Create Restaurant'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
