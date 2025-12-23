import { useEffect, useState } from 'react';
import { getMenu } from '../api/restaurant.api';

export default function useMenu(id) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu(id).then(setMenu);
  }, [id]);

  return menu;
}
