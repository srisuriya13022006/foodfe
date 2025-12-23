import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'var(--bg-card)',
      padding: '1rem 2rem',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
        <Link to="/">FoodDelivery</Link>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/">Home</Link>

        {user?.role === 'CUSTOMER' && (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/my-orders">My Orders</Link>
          </>
        )}

        {user?.role === 'ADMIN' && (
          <Link to="/admin">Dashboard</Link>
        )}

        {user?.role === 'DELIVERY' && (
          <Link to="/delivery">Delivery Zone</Link>
        )}

        {user ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)' }}>Hello, {user.name}</span>
            <button onClick={handleLogout} className="btn" style={{ border: '1px solid var(--primary)', color: 'var(--primary)', background: 'transparent' }}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn" style={{ border: '1px solid var(--text-muted)' }}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
