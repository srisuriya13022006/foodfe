import useRestaurants from '../hooks/useRestaurants';
import RestaurantCard from '../components/RestaurantCard';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { restaurants, loading } = useRestaurants('Chennai');
  const navigate = useNavigate();

  if (loading) return <Loader />;

  return restaurants.map(r => (
    <RestaurantCard
      key={r._id}
      restaurant={r}
      onClick={() => navigate(`/restaurant/${r._id}`)}
    />
  ));
};

export default Home;
