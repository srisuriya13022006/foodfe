import { useState } from 'react';
import { register } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER'
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate('/login');
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />

      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="DELIVERY">Delivery</option>
      </select>

      <button>Register</button>
    </form>
  );
};

export default Register;
