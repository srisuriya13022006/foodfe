import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <button onClick={() => navigate('/admin/add-restaurant')}>
        Add Restaurant
      </button>

      <button onClick={() => navigate('/admin/add-menu')}>
        Add Menu Item
      </button>

      <button onClick={() => navigate('/admin/orders')}>
        View Orders
      </button>
    </div>
  );
};

export default AdminDashboard;
