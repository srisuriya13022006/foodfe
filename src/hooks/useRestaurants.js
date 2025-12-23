import { useEffect, useState } from 'react';
import { getRestaurantsByCity } from '../api/restaurant.api';

export default function useRestaurants(city) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRestaurantsByCity(city)
      .then(setRestaurants)
      .finally(() => setLoading(false));
  }, [city]);

  return { restaurants, loading };
}
