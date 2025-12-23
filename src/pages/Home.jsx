import { useState, useEffect } from 'react';
import { getRestaurantsByCity } from '../api/restaurant.api';
import '../styles/global.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [city, setCity] = useState('New York'); // Default city or use location
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, [city]);

  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurantsByCity(city);
      setRestaurants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem' }}>Hungry? We got you.</h1>
        <p style={{ color: 'var(--text-muted)' }}>Order from the best restaurants in town.</p>
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city..."
            style={{ padding: '10px', borderRadius: 'var(--rad-sm)', border: '1px solid #ccc', marginRight: '10px' }}
          />
          <button className="btn btn-primary" onClick={fetchRestaurants}>Search</button>
        </div>
      </header>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading deliciousness...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {restaurants.map((res) => (
            <Link to={`/restaurant/${res._id}`} key={res._id} style={{ display: 'block' }}>
              <div className="card" style={{ height: '100%', transition: 'transform 0.2s' }}>
                <div style={{ height: '150px', background: '#eee', borderRadius: 'var(--rad-sm)', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '3rem' }}>🍽️</span>
                  {/* Placeholder image logic could go here */}
                </div>
                <h3 style={{ marginBottom: '10px' }}>{res.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{res.city}</p>
                <div style={{ marginTop: '15px' }}>
                  <span style={{
                    background: res.isOpen ? '#E3FCEF' : '#FFEBE6',
                    color: res.isOpen ? '#006644' : '#BF2600',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {res.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {restaurants.length === 0 && !loading && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              <h3>No restaurants found in {city}.</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
