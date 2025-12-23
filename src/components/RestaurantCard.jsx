import './RestaurantCard.css';

const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <div className="restaurant-card" onClick={onClick}>
      <h3>{restaurant.name}</h3>
      <p>{restaurant.city}</p>
      <span>{restaurant.isOpen ? '🟢 Open' : '🔴 Closed'}</span>
    </div>
  );
};

export default RestaurantCard;
