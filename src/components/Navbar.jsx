import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link> | 
    <Link to="/cart">Cart</Link> | 
    <Link to="/admin">Admin</Link> | 
    <Link to="/delivery">Delivery</Link>
  </nav>
);

export default Navbar;
