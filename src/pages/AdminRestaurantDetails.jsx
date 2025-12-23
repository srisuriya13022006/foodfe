import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMenu, addMenuItem } from '../api/restaurant.api';
import '../styles/global.css';

const AdminRestaurantDetails = () => {
    const { id } = useParams();
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Main',
        isAvailable: true,
        restaurantId: id
    });

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

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await addMenuItem({ ...newItem, restaurantId: id });
            setShowAddForm(false);
            setNewItem({ ...newItem, name: '', description: '', price: '' });
            fetchMenu();
        } catch (err) {
            alert('Failed to add item');
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
                <h2>Manage Menu</h2>
                <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Cancel' : '+ Add Item'}
                </button>
            </header>

            {showAddForm && (
                <div className="card" style={{ marginBottom: '30px' }}>
                    <h3>Add New Dish</h3>
                    <form onSubmit={handleAddItem}>
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                placeholder="Dish Name"
                                value={newItem.name}
                                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                required
                                style={{ width: '100%', padding: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <textarea
                                placeholder="Description"
                                value={newItem.description}
                                onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                                style={{ width: '100%', padding: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type="number"
                                placeholder="Price"
                                value={newItem.price}
                                onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                required
                                style={{ width: '100%', padding: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={newItem.isAvailable}
                                    onChange={e => setNewItem({ ...newItem, isAvailable: e.target.checked })}
                                /> Available
                            </label>
                        </div>
                        <button className="btn btn-primary">Save Item</button>
                    </form>
                </div>
            )}

            {loading ? <p>Loading menu...</p> : (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {menu.map(item => (
                        <div key={item._id} className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <h4>{item.name}</h4>
                                <p style={{ color: 'var(--text-muted)' }}>{item.description}</p>
                                <p style={{ fontWeight: 'bold' }}>${item.price}</p>
                                <span style={{
                                    fontSize: '0.8rem',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    background: item.isAvailable ? '#E3FCEF' : '#FFEBE6',
                                    color: item.isAvailable ? '#006644' : '#BF2600'
                                }}>
                                    {item.isAvailable ? 'Available' : 'Sold Out'}
                                </span>
                            </div>
                            <div>
                                <button className="btn" style={{ border: '1px solid #ccc' }}>Edit</button>
                            </div>
                        </div>
                    ))}
                    {menu.length === 0 && <p>No items in menu.</p>}
                </div>
            )}
        </div>
    );
};

export default AdminRestaurantDetails;
