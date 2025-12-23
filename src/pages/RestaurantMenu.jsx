import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMenu } from '../api/restaurant.api'; // Assume getRestaurantDetails also exists or fetch name separately
import '../styles/global.css';

// Simple Cart Logic inside or context
// We need CartContext. Let's create a minimal hook if Context isn't fully robust yet, 
// OR just direct localStorage for simplicity if Context file wasn't created. 
// Plan said create CartContext. I didn't create CartContext.jsx in EXECUTION yet!
// I listed it in task but skipped it.
// I should rely on localStorage or Context.
// Let's implement basic Context-less cart for now via localStorage to be fast, or create CartContext now.
// Better create CartContext.

import { useCart } from '../context/CartContext'; // Need to create this!

const RestaurantMenu = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Assuming I will create this

  useEffect(() => {
    fetchMenu();
  }, [id]);

  const fetchMenu = async () => {
    try {
      const data = await getMenu(id);
      setMenu(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2>Menu</h2>
      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {menu.map(item => (
            <div key={item._id} className="card">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>${item.price}</span>
                {item.isAvailable ? (
                  <button className="btn btn-primary" onClick={() => addToCart(item, id)}>+ Add</button>
                ) : (
                  <span style={{ color: 'red' }}>Sold Out</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
